#!/usr/bin/env python3
"""Calcula la viabilidad económica de un infoproducto.

Distingue facturación, impuestos, ingresos netos, margen de contribución y beneficio, y calcula
CPA y ROAS de equilibrio, conversión necesaria, ventas para cubrir costes fijos y escenarios.

Uso:
    python scripts/calcular_rentabilidad.py --plantilla > supuestos.json   # editar los valores
    python scripts/calcular_rentabilidad.py supuestos.json

Todas las tasas se expresan en tanto por uno (0.05 = 5 %). Solo biblioteca estándar.
"""
import argparse
import copy
import json
import sys

PLANTILLA = {
    "_nota": "Sustituye cada valor por datos reales o marca en 'supuestos' cuáles son hipótesis.",
    "moneda": "EUR",
    "precio": 27.0,
    "precio_incluye_impuestos": True,
    "tipo_impuesto": 0.21,
    "comision_plataforma_pct": 0.0,
    "comision_plataforma_fija": 0.0,
    "comision_pago_pct": 0.029,
    "comision_pago_fija": 0.30,
    "proporcion_ventas_afiliados": 0.0,
    "comision_afiliado_pct": 0.0,
    "tasa_reembolso": 0.05,
    "tasa_contracargo": 0.005,
    "coste_contracargo": 15.0,
    "coste_variable_por_cliente": 0.0,
    "order_bump": {"precio": 9.0, "tasa_aceptacion": 0.25},
    "upsell": {"precio": 47.0, "tasa_aceptacion": 0.06},
    "costes_fijos": {"produccion": 600.0, "herramientas_mensuales": 40.0, "diseno": 150.0},
    "periodo_meses": 3,
    "publicidad": {"cpc": 0.60, "tasa_conversion": 0.02, "presupuesto": 1500.0},
    "supuestos": ["cpc y tasa_conversion son hipótesis hasta tener datos de campaña"],
    "escenarios": {},
}

# Multiplicadores por defecto cuando el usuario no define escenarios: suficientemente amplios
# para mostrar la sensibilidad del negocio, pero son HIPÓTESIS y el informe lo indica.
ESCENARIOS_POR_DEFECTO = {
    "conservador": {"tasa_conversion": 0.7, "cpc": 1.2, "tasa_reembolso": 1.5, "aceptacion": 0.7},
    "base": {},
    "optimista": {"tasa_conversion": 1.3, "cpc": 0.85, "tasa_reembolso": 0.8, "aceptacion": 1.2},
}

CAMPOS_OBLIGATORIOS = ["precio", "tipo_impuesto", "comision_pago_pct", "tasa_reembolso"]


def num(cfg, clave, defecto=0.0):
    valor = cfg.get(clave, defecto)
    if valor is None:
        return defecto
    if not isinstance(valor, (int, float)):
        sys.exit(f"'{clave}' debe ser un número y es {valor!r}.")
    return float(valor)


def item(precio, aceptacion, cfg, transaccion_propia):
    """Economía esperada de un artículo por cliente, ponderada por su tasa de aceptación."""
    t = num(cfg, "tipo_impuesto")
    if cfg.get("precio_incluye_impuestos", True):
        cobrado = precio
        neto = precio / (1 + t)
    else:
        neto = precio
        cobrado = precio * (1 + t)
    impuesto = cobrado - neto
    r = num(cfg, "tasa_reembolso")
    fijo = (num(cfg, "comision_pago_fija") + num(cfg, "comision_plataforma_fija")) if transaccion_propia else 0.0
    comisiones = cobrado * (num(cfg, "comision_pago_pct") + num(cfg, "comision_plataforma_pct")) + fijo
    # Las comisiones de afiliado suelen anularse si hay reembolso; las de pago normalmente no se devuelven.
    afiliados = (1 - r) * num(cfg, "proporcion_ventas_afiliados") * num(cfg, "comision_afiliado_pct") * neto
    contracargos = num(cfg, "tasa_contracargo") * (neto + num(cfg, "coste_contracargo"))
    return {
        "facturacion": aceptacion * cobrado,
        "impuestos": aceptacion * impuesto,
        "ingresos_netos": aceptacion * neto,
        "reembolsos": aceptacion * r * neto,
        "comisiones": aceptacion * comisiones,
        "afiliados": aceptacion * afiliados,
        "contracargos": aceptacion * contracargos,
    }


def calcular(cfg):
    for c in CAMPOS_OBLIGATORIOS:
        if c not in cfg:
            sys.exit(f"Falta el campo obligatorio '{c}'. Genera una plantilla con --plantilla.")
    precio = num(cfg, "precio")
    if precio <= 0:
        sys.exit("El precio debe ser mayor que 0.")
    for c in ["tipo_impuesto", "comision_pago_pct", "comision_plataforma_pct", "tasa_reembolso",
              "tasa_contracargo", "proporcion_ventas_afiliados", "comision_afiliado_pct"]:
        if not 0 <= num(cfg, c) < 1:
            sys.exit(f"'{c}' debe estar entre 0 y 1 (tanto por uno). Valor: {num(cfg, c)}")

    partes = [item(precio, 1.0, cfg, True)]
    bump = cfg.get("order_bump") or {}
    if bump.get("precio"):
        partes.append(item(float(bump["precio"]), float(bump.get("tasa_aceptacion", 0)), cfg, False))
    upsell = cfg.get("upsell") or {}
    if upsell.get("precio"):
        partes.append(item(float(upsell["precio"]), float(upsell.get("tasa_aceptacion", 0)), cfg, True))

    t = {k: sum(p[k] for p in partes) for k in partes[0]}
    t["variables"] = num(cfg, "coste_variable_por_cliente")
    t["ingresos_tras_reembolsos"] = t["ingresos_netos"] - t["reembolsos"]
    t["margen_contribucion"] = (t["ingresos_tras_reembolsos"] - t["comisiones"] - t["afiliados"]
                                - t["contracargos"] - t["variables"])
    t["cpa_equilibrio"] = t["margen_contribucion"]

    pub = cfg.get("publicidad") or {}
    cpc = float(pub.get("cpc") or 0)
    conv = float(pub.get("tasa_conversion") or 0)
    presupuesto = float(pub.get("presupuesto") or 0)
    t["cpc"], t["tasa_conversion"], t["presupuesto"] = cpc, conv, presupuesto
    t["cpa_estimado"] = cpc / conv if cpc and conv else None
    t["conversion_necesaria"] = cpc / t["cpa_equilibrio"] if cpc and t["cpa_equilibrio"] > 0 else None

    meses = num(cfg, "periodo_meses", 1) or 1
    fijos = cfg.get("costes_fijos") or {}
    total_fijos = 0.0
    for clave, valor in fijos.items():
        total_fijos += float(valor) * (meses if "mensual" in clave else 1)
    t["costes_fijos"] = total_fijos
    t["meses"] = meses

    if t["cpa_estimado"] is not None:
        t["beneficio_por_cliente"] = t["margen_contribucion"] - t["cpa_estimado"]
        t["clientes_con_presupuesto"] = presupuesto / t["cpa_estimado"] if presupuesto else 0
    else:
        t["beneficio_por_cliente"] = t["margen_contribucion"]
        t["clientes_con_presupuesto"] = 0
    t["ventas_para_cubrir_fijos"] = (total_fijos / t["beneficio_por_cliente"]
                                     if t["beneficio_por_cliente"] > 0 else None)
    n = t["clientes_con_presupuesto"]
    t["resultado_presupuesto"] = {
        "clientes": n,
        "facturacion": n * t["facturacion"],
        "margen_contribucion_total": n * t["margen_contribucion"] - presupuesto,
        "beneficio_antes_impuesto_sociedades": n * t["margen_contribucion"] - presupuesto - total_fijos,
    }
    return t


def aplicar_escenario(cfg, cambios, multiplicadores):
    c = copy.deepcopy(cfg)
    if multiplicadores:
        pub = c.setdefault("publicidad", {})
        for clave in ("tasa_conversion", "cpc"):
            if clave in cambios and pub.get(clave):
                pub[clave] = pub[clave] * cambios[clave]
        if "tasa_reembolso" in cambios:
            c["tasa_reembolso"] = min(0.99, c["tasa_reembolso"] * cambios["tasa_reembolso"])
        if "aceptacion" in cambios:
            for k in ("order_bump", "upsell"):
                if c.get(k):
                    c[k]["tasa_aceptacion"] = min(1.0, c[k].get("tasa_aceptacion", 0) * cambios["aceptacion"])
    else:
        for clave, valor in cambios.items():
            if isinstance(valor, dict) and isinstance(c.get(clave), dict):
                c[clave].update(valor)
            else:
                c[clave] = valor
    return c


def fmt(x, moneda):
    if x is None:
        return "n/d"
    return f"{x:,.2f} {moneda}".replace(",", "X").replace(".", ",").replace("X", ".")


def pct(x):
    return "n/d" if x is None else f"{x * 100:.2f} %".replace(".", ",")


def informe(cfg, t):
    m = cfg.get("moneda", "")
    print("# Rentabilidad del infoproducto\n")
    print("## Por cliente (incluye order bump y upsell ponderados por su tasa de aceptación)\n")
    filas = [
        ("Facturación (lo que paga el cliente)", t["facturacion"]),
        ("− Impuestos indirectos (IVA, etc.)", t["impuestos"]),
        ("= Ingresos netos de impuestos", t["ingresos_netos"]),
        ("− Reembolsos", t["reembolsos"]),
        ("= Ingresos tras reembolsos", t["ingresos_tras_reembolsos"]),
        ("− Comisiones de plataforma y pago", t["comisiones"]),
        ("− Comisiones de afiliados", t["afiliados"]),
        ("− Contracargos", t["contracargos"]),
        ("− Costes variables por cliente", t["variables"]),
        ("= **Margen de contribución (antes de publicidad)**", t["margen_contribucion"]),
    ]
    print("| Concepto | Importe |\n|---|---|")
    for nombre, valor in filas:
        print(f"| {nombre} | {fmt(valor, m)} |")

    print("\n## Umbrales de equilibrio\n")
    print(f"- **CPA máximo de equilibrio:** {fmt(t['cpa_equilibrio'], m)} por cliente")
    if t["cpa_equilibrio"] > 0:
        print(f"- **ROAS de equilibrio sobre facturación:** {t['facturacion'] / t['cpa_equilibrio']:.2f}".replace(".", ","))
        print(f"- **ROAS de equilibrio sobre ingresos netos de impuestos:** {t['ingresos_netos'] / t['cpa_equilibrio']:.2f}".replace(".", ","))
        print("  (Compara con el ROAS de la plataforma usando la misma base de valor que envía el píxel.)")
    else:
        print("- **El margen de contribución es negativo o nulo: ninguna inversión publicitaria puede ser rentable con esta oferta.**")
    if t["conversion_necesaria"] is not None:
        print(f"- **Conversión mínima de la landing** con CPC {fmt(t['cpc'], m)}: {pct(t['conversion_necesaria'])}")

    if t["cpa_estimado"] is not None:
        print("\n## Con los supuestos de publicidad\n")
        print(f"- CPA estimado (CPC / conversión): {fmt(t['cpa_estimado'], m)}")
        print(f"- Beneficio de contribución por cliente tras publicidad: {fmt(t['beneficio_por_cliente'], m)}")
        r = t["resultado_presupuesto"]
        print(f"- Con un presupuesto de {fmt(t['presupuesto'], m)}: ≈ {r['clientes']:.0f} clientes, "
              f"facturación {fmt(r['facturacion'], m)}, margen tras publicidad {fmt(r['margen_contribucion_total'], m)}")

    print("\n## Costes fijos y punto de equilibrio\n")
    print(f"- Costes fijos del periodo ({t['meses']:g} meses): {fmt(t['costes_fijos'], m)}")
    if t["ventas_para_cubrir_fijos"] is not None:
        print(f"- Ventas necesarias para cubrir los costes fijos: {t['ventas_para_cubrir_fijos']:.0f}")
    else:
        print("- No se alcanza el punto de equilibrio: el beneficio por cliente tras publicidad no es positivo.")
    r = t["resultado_presupuesto"]
    if t["cpa_estimado"] is not None:
        print(f"- Beneficio del periodo antes del impuesto sobre beneficios: {fmt(r['beneficio_antes_impuesto_sociedades'], m)}")
    print("\n> Facturación ≠ dinero disponible ≠ beneficio. El beneficio mostrado no descuenta el impuesto sobre la renta o de sociedades ni el tiempo del creador.")


def tabla_escenarios(cfg):
    definidos = cfg.get("escenarios") or {}
    multiplicadores = not definidos
    escenarios = ESCENARIOS_POR_DEFECTO if multiplicadores else definidos
    m = cfg.get("moneda", "")
    print("\n## Escenarios\n")
    if multiplicadores:
        print("Escenarios generados con multiplicadores por defecto (HIPÓTESIS): conservador = conversión ×0,7, CPC ×1,2, "
              "reembolsos ×1,5, aceptación de bump/upsell ×0,7; optimista = conversión ×1,3, CPC ×0,85, reembolsos ×0,8, aceptación ×1,2.\n")
    print("| Escenario | Margen/cliente | CPA estimado | Beneficio/cliente | Clientes | Beneficio del periodo |")
    print("|---|---|---|---|---|---|")
    for nombre, cambios in escenarios.items():
        t = calcular(aplicar_escenario(cfg, cambios, multiplicadores))
        r = t["resultado_presupuesto"]
        print(f"| {nombre} | {fmt(t['margen_contribucion'], m)} | {fmt(t['cpa_estimado'], m)} | "
              f"{fmt(t['beneficio_por_cliente'], m)} | {r['clientes']:.0f} | {fmt(r['beneficio_antes_impuesto_sociedades'], m)} |")


def main():
    ap = argparse.ArgumentParser(description="Rentabilidad de un infoproducto")
    ap.add_argument("json", nargs="?", help="Archivo JSON de supuestos")
    ap.add_argument("--plantilla", action="store_true", help="Imprime una plantilla JSON")
    a = ap.parse_args()
    if a.plantilla:
        print(json.dumps(PLANTILLA, ensure_ascii=False, indent=2))
        return
    if not a.json:
        ap.error("indica el archivo JSON o usa --plantilla")
    try:
        with open(a.json, encoding="utf-8") as f:
            cfg = json.load(f)
    except FileNotFoundError:
        sys.exit(f"No existe '{a.json}'. Crea uno con --plantilla.")
    except json.JSONDecodeError as e:
        sys.exit(f"JSON no válido en '{a.json}': {e}")
    informe(cfg, calcular(cfg))
    tabla_escenarios(cfg)
    if cfg.get("supuestos"):
        print("\n## Supuestos declarados\n")
        for s in cfg["supuestos"]:
            print(f"- {s}")


if __name__ == "__main__":
    main()
