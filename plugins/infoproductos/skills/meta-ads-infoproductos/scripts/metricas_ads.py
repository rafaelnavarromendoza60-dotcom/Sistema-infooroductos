#!/usr/bin/env python3
"""Calcula métricas de anuncios y las compara con la economía real del producto.

Uso:
    python scripts/metricas_ads.py anuncios.csv --margen 23.70
    python scripts/metricas_ads.py anuncios.csv --margen 23.70 --objetivo 18 --min-compras 10
    python scripts/metricas_ads.py --plantilla > anuncios.csv

--margen: margen de contribución por cliente ANTES de publicidad (= CPA de equilibrio),
          calculado con la skill precios-rentabilidad.
--objetivo: CPA objetivo (por defecto, 75 % del margen como colchón de seguridad).
--min-compras: compras mínimas para juzgar un anuncio (por defecto 10).

Columnas del CSV: nombre, gasto, impresiones, clics, compras, valor
Opcionales: leads, reembolsos (nº de compras reembolsadas), frecuencia
"""
import argparse
import csv
import statistics
import sys

PLANTILLA = """nombre,gasto,impresiones,clics,compras,valor,leads,reembolsos,frecuencia
UGC dolor - v1,180,24000,410,9,207,0,1,1.6
Carrusel método - v1,150,21000,260,4,92,0,0,1.5
Estático mockup - v1,120,19000,190,7,161,0,0,1.4
"""

# Por debajo de este número de compras el CPA de un anuncio fluctúa demasiado para decidir.
MIN_COMPRAS_POR_DEFECTO = 10
# CPA objetivo por defecto: 75 % del CPA de equilibrio (colchón del 25 % frente a variaciones).
FACTOR_OBJETIVO = 0.75
# Frecuencia a partir de la cual conviene vigilar la fatiga creativa (heurística, no regla de Meta).
FRECUENCIA_ALERTA = 3.0


def f(fila, clave, obligatorio=True):
    valor = (fila.get(clave) or "").strip().replace(",", ".")
    if not valor:
        if obligatorio:
            raise ValueError(f"falta '{clave}'")
        return 0.0
    return float(valor)


def div(a, b):
    return a / b if b else None


def fmt(x, dec=2, suf=""):
    return "n/d" if x is None else f"{x:.{dec}f}{suf}".replace(".", ",")


def main():
    ap = argparse.ArgumentParser(description="Métricas de Meta Ads frente a la economía del producto")
    ap.add_argument("csv", nargs="?")
    ap.add_argument("--margen", type=float, help="Margen de contribución por cliente (CPA de equilibrio)")
    ap.add_argument("--objetivo", type=float, help="CPA objetivo")
    ap.add_argument("--min-compras", type=int, default=MIN_COMPRAS_POR_DEFECTO)
    ap.add_argument("--plantilla", action="store_true")
    a = ap.parse_args()
    if a.plantilla:
        print(PLANTILLA, end="")
        return
    if not a.csv or a.margen is None:
        ap.error("indica el CSV y --margen (calcúlalo con precios-rentabilidad)")
    objetivo = a.objetivo if a.objetivo is not None else a.margen * FACTOR_OBJETIVO

    try:
        with open(a.csv, encoding="utf-8-sig", newline="") as fh:
            filas = list(csv.DictReader(fh))
    except FileNotFoundError:
        sys.exit(f"No existe '{a.csv}'. Genera uno con --plantilla.")

    datos = []
    for n, fila in enumerate(filas, start=2):
        fila = {(k or "").strip().lower(): v for k, v in fila.items()}
        try:
            d = {k: f(fila, k) for k in ("gasto", "impresiones", "clics", "compras", "valor")}
            d.update({k: f(fila, k, False) for k in ("leads", "reembolsos", "frecuencia")})
        except ValueError as e:
            print(f"Fila {n}: {e}; se omite.", file=sys.stderr)
            continue
        d["nombre"] = fila.get("nombre") or f"fila {n}"
        d["cpm"] = div(d["gasto"] * 1000, d["impresiones"])
        d["ctr"] = div(d["clics"] * 100, d["impresiones"])
        d["cpc"] = div(d["gasto"], d["clics"])
        d["cvr"] = div(d["compras"] * 100, d["clics"])
        d["cpa"] = div(d["gasto"], d["compras"])
        d["cpl"] = div(d["gasto"], d["leads"]) if d["leads"] else None
        d["roas"] = div(d["valor"], d["gasto"])
        netas = d["compras"] - d["reembolsos"]
        d["beneficio"] = netas * a.margen - d["gasto"]
        datos.append(d)
    if not datos:
        sys.exit("No hay filas válidas.")

    ctr_mediana = statistics.median([d["ctr"] for d in datos if d["ctr"] is not None])
    print(f"# Análisis de anuncios\n\nCPA de equilibrio: {fmt(a.margen)} · CPA objetivo: {fmt(objetivo)} · "
          f"Mínimo de compras para decidir: {a.min_compras}\n")
    print("| Anuncio | Gasto | CPM | CTR % | CPC | Conv. % | CPA | ROAS | Benef. contrib.* | Diagnóstico |")
    print("|---|---|---|---|---|---|---|---|---|---|")
    for d in sorted(datos, key=lambda x: x["beneficio"], reverse=True):
        notas = []
        if d["compras"] < a.min_compras:
            notas.append(f"datos insuficientes ({d['compras']:.0f} compras)")
        if d["cpa"] is not None and d["compras"] >= a.min_compras:
            if d["cpa"] <= objetivo:
                notas.append("CPA bajo objetivo: candidato a escalar")
            elif d["cpa"] <= a.margen:
                notas.append("rentable sin colchón: optimizar antes de escalar")
            else:
                notas.append("CPA sobre equilibrio: pierde dinero")
        if d["compras"] == 0 and d["gasto"] > a.margen * 2:
            notas.append("gasto > 2× CPA de equilibrio sin compras: pausar o revisar")
        if d["roas"] and d["roas"] > 1 and d["beneficio"] < 0:
            notas.append("ROAS > 1 pero pierde dinero")
        if d["ctr"] is not None and d["ctr"] < ctr_mediana * 0.7:
            notas.append("CTR muy por debajo de la mediana de la cuenta: gancho débil")
        if d["frecuencia"] >= FRECUENCIA_ALERTA:
            notas.append("frecuencia alta: vigilar fatiga")
        print(f"| {d['nombre']} | {fmt(d['gasto'])} | {fmt(d['cpm'])} | {fmt(d['ctr'])} | {fmt(d['cpc'])} | "
              f"{fmt(d['cvr'])} | {fmt(d['cpa'])} | {fmt(d['roas'])} | {fmt(d['beneficio'])} | {'; '.join(notas) or 'ok'} |")

    tot = {k: sum(d[k] for d in datos) for k in ("gasto", "impresiones", "clics", "compras", "valor", "reembolsos")}
    benef = (tot["compras"] - tot["reembolsos"]) * a.margen - tot["gasto"]
    print(f"\n**Total:** gasto {fmt(tot['gasto'])}, compras {tot['compras']:.0f} (reembolsadas {tot['reembolsos']:.0f}), "
          f"CPA {fmt(div(tot['gasto'], tot['compras']))}, ROAS {fmt(div(tot['valor'], tot['gasto']))}, "
          f"beneficio de contribución {fmt(benef)}.")
    print("\n\\* Beneficio de contribución = (compras − reembolsos) × margen − gasto. No incluye costes fijos ni impuesto sobre beneficios. "
          "Las compras atribuidas por la plataforma pueden diferir de las reales: contrasta con las ventas de la tienda.")


if __name__ == "__main__":
    main()
