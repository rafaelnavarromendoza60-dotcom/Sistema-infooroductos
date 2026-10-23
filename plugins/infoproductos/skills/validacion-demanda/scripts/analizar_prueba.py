#!/usr/bin/env python3
"""Analiza una prueba de validación con criterios fijados de antemano.

Calcula la tasa de conversión con su intervalo de confianza de Wilson al 95 % y decide
si el resultado supera, no alcanza o no permite concluir frente a los umbrales definidos
ANTES de la prueba.

Uso:
    # Una prueba: 420 visitas a la landing, 19 registros, éxito >= 5 %, fracaso < 2 %
    python scripts/analizar_prueba.py --exposiciones 420 --conversiones 19 --exito 0.05 --fracaso 0.02

    # Con mínimo absoluto (p. ej., preventas necesarias para cubrir la producción)
    python scripts/analizar_prueba.py --exposiciones 900 --conversiones 12 --exito 0.01 --fracaso 0.004 --minimo 10

    # Comparar mensajes: nombre:exposiciones:conversiones
    python scripts/analizar_prueba.py --variantes "Dolor:500:21,Deseo:510:34"

    # Muestra necesaria para estimar una tasa esperada del 4 % con margen de ±1,5 puntos
    python scripts/analizar_prueba.py --tamano-muestra 0.04 --margen 0.015

Solo depende de la biblioteca estándar.
"""
import argparse
import math
import sys

# z para un 95 % de confianza bilateral: estándar habitual para decisiones de negocio.
Z_95 = 1.959964


def wilson(conversiones, exposiciones, z=Z_95):
    """Intervalo de Wilson: se comporta bien con tasas bajas y muestras pequeñas, a diferencia del intervalo normal."""
    if exposiciones <= 0:
        return 0.0, 0.0, 0.0
    p = conversiones / exposiciones
    denom = 1 + z**2 / exposiciones
    centro = (p + z**2 / (2 * exposiciones)) / denom
    radio = z * math.sqrt(p * (1 - p) / exposiciones + z**2 / (4 * exposiciones**2)) / denom
    return p, max(0.0, centro - radio), min(1.0, centro + radio)


def pct(x):
    return f"{x * 100:.2f} %".replace(".", ",")


def validar_enteros(exposiciones, conversiones):
    if exposiciones <= 0:
        sys.exit("Las exposiciones deben ser mayores que 0.")
    if conversiones < 0 or conversiones > exposiciones:
        sys.exit(f"Las conversiones ({conversiones}) deben estar entre 0 y las exposiciones ({exposiciones}).")


def una_prueba(a):
    validar_enteros(a.exposiciones, a.conversiones)
    if a.exito is None or a.fracaso is None:
        sys.exit("Indica --exito y --fracaso: los umbrales deben fijarse antes de ver los datos.")
    if a.fracaso > a.exito:
        sys.exit("El umbral de fracaso no puede ser mayor que el de éxito.")
    p, lo, hi = wilson(a.conversiones, a.exposiciones)
    print("## Resultado de la prueba\n")
    print(f"- Exposiciones: {a.exposiciones} · Conversiones: {a.conversiones}")
    print(f"- Tasa observada: {pct(p)} (IC 95 %: {pct(lo)} – {pct(hi)})")
    print(f"- Umbral de éxito: {pct(a.exito)} · Umbral de fracaso: {pct(a.fracaso)}")
    if a.minimo:
        print(f"- Mínimo absoluto de conversiones: {a.minimo}")

    if lo >= a.exito and (not a.minimo or a.conversiones >= a.minimo):
        decision = "ÉXITO: incluso el extremo bajo del intervalo supera el umbral. Avanzar."
    elif hi < a.fracaso:
        decision = "FRACASO: incluso el extremo alto del intervalo queda por debajo del umbral de fracaso. Modificar la propuesta o descartar."
    elif p >= a.exito:
        decision = "PROMETEDOR PERO NO CONCLUYENTE: la tasa observada supera el umbral, pero la muestra no basta para descartar el azar. Ampliar la prueba."
    elif p < a.fracaso:
        decision = "PROBABLE FRACASO, NO CONCLUYENTE: ampliar la muestra solo si el coste es bajo; si no, iterar el mensaje u oferta."
    else:
        decision = "ZONA GRIS: entre ambos umbrales. Iterar una variable (mensaje, precio o público) y volver a medir."
    if a.minimo and a.conversiones < a.minimo:
        decision += f" Además, no se alcanza el mínimo absoluto ({a.conversiones} de {a.minimo})."
    print(f"\n**Decisión:** {decision}")

    margen_actual = (hi - lo) / 2
    print(f"\nPrecisión actual: ±{margen_actual * 100:.2f} puntos.")
    print("Recuerda: esta prueba mide la acción concreta registrada (p. ej., registro o pago), no el interés general.")


def variantes(texto):
    filas = []
    for parte in texto.split(","):
        trozos = parte.split(":")
        if len(trozos) != 3:
            sys.exit(f"Formato de variante incorrecto: '{parte}'. Usa nombre:exposiciones:conversiones")
        nombre, e, c = trozos
        try:
            e, c = int(e), int(c)
        except ValueError:
            sys.exit(f"Exposiciones y conversiones deben ser enteros en '{parte}'.")
        validar_enteros(e, c)
        filas.append((nombre.strip(), e, c))
    if len(filas) < 2:
        sys.exit("Indica al menos dos variantes.")
    print("## Comparación de variantes\n")
    print("| Variante | Exposiciones | Conversiones | Tasa | IC 95 % |")
    print("|---|---|---|---|---|")
    for nombre, e, c in filas:
        p, lo, hi = wilson(c, e)
        print(f"| {nombre} | {e} | {c} | {pct(p)} | {pct(lo)} – {pct(hi)} |")
    filas.sort(key=lambda f: f[2] / f[1], reverse=True)
    (n1, e1, c1), (n2, e2, c2) = filas[0], filas[1]
    p1, p2 = c1 / e1, c2 / e2
    pool = (c1 + c2) / (e1 + e2)
    se = math.sqrt(pool * (1 - pool) * (1 / e1 + 1 / e2))
    z = (p1 - p2) / se if se > 0 else 0.0
    p_valor = math.erfc(abs(z) / math.sqrt(2))
    print(f"\nMejor: {n1} frente a {n2}: diferencia de {(p1 - p2) * 100:.2f} puntos, z = {z:.2f}, p = {p_valor:.3f}.")
    if p_valor < 0.05:
        print(f"**Conclusión:** la diferencia es estadísticamente significativa al 95 %. {n1} es la mejor variante para esta métrica.")
    else:
        print("**Conclusión:** no hay evidencia suficiente de que una variante sea mejor. No declares ganadora; amplía la muestra o prueba un cambio mayor.")


def tamano_muestra(p, margen):
    if not 0 < p < 1 or not 0 < margen < 1:
        sys.exit("La tasa esperada y el margen deben estar entre 0 y 1 (p. ej., 0.04 y 0.015).")
    n = math.ceil(Z_95**2 * p * (1 - p) / margen**2)
    print(f"Para estimar una tasa cercana a {pct(p)} con un margen de ±{margen * 100:.2f} puntos (95 %) "
          f"necesitas unas {n} exposiciones (≈ {math.ceil(n * p)} conversiones esperadas).")


def main():
    ap = argparse.ArgumentParser(description="Analiza pruebas de validación de demanda.")
    ap.add_argument("--exposiciones", type=int, help="Personas expuestas (visitas, alcance de la publicación, etc.)")
    ap.add_argument("--conversiones", type=int, help="Personas que realizaron la acción medida")
    ap.add_argument("--exito", type=float, help="Tasa mínima de éxito definida antes (0-1)")
    ap.add_argument("--fracaso", type=float, help="Tasa por debajo de la cual se considera fracaso (0-1)")
    ap.add_argument("--minimo", type=int, help="Mínimo absoluto de conversiones exigido")
    ap.add_argument("--variantes", help="Comparar variantes: 'A:500:20,B:500:31'")
    ap.add_argument("--tamano-muestra", type=float, help="Tasa esperada para calcular la muestra necesaria (0-1)")
    ap.add_argument("--margen", type=float, default=0.01, help="Margen de error deseado (0-1); por defecto 0.01")
    a = ap.parse_args()

    if a.variantes:
        variantes(a.variantes)
    elif a.tamano_muestra is not None:
        tamano_muestra(a.tamano_muestra, a.margen)
    elif a.exposiciones is not None and a.conversiones is not None:
        una_prueba(a)
    else:
        ap.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
