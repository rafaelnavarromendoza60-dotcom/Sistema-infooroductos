#!/usr/bin/env python3
"""Analiza un embudo paso a paso y localiza dónde se pierden más clientes potenciales.

Uso:
    python scripts/embudo.py embudo.csv
    python scripts/embudo.py --plantilla > embudo.csv

CSV: paso, actual[, anterior]
  - paso: nombre de la etapa, en orden (impresiones, clics, visitas landing, checkout, compras...)
  - actual: personas o eventos en el periodo analizado
  - anterior: (opcional) mismo paso en el periodo de comparación
Solo biblioteca estándar.
"""
import csv
import math
import sys

PLANTILLA = """paso,actual,anterior
Impresiones,120000,110000
Clics en el anuncio,1500,1650
Visitas a la landing,1300,1420
Inicio de checkout,140,118
Compras,52,49
Compras no reembolsadas,47,46
"""

# Caída relativa frente al periodo anterior a partir de la cual se marca un paso para investigar.
UMBRAL_CAIDA_RELATIVA = 0.15
Z_95 = 1.959964


def tasa(a, b):
    return a / b if b else None


def p(x):
    return "n/d" if x is None else f"{x * 100:.2f} %".replace(".", ",")


def diferencia_significativa(k1, n1, k2, n2):
    """Prueba z de dos proporciones; devuelve True si la diferencia es significativa al 95 %."""
    if min(n1, n2) == 0:
        return False
    pool = (k1 + k2) / (n1 + n2)
    se = math.sqrt(pool * (1 - pool) * (1 / n1 + 1 / n2))
    if se == 0:
        return False
    return abs(k1 / n1 - k2 / n2) / se > Z_95


def main():
    if len(sys.argv) == 2 and sys.argv[1] == "--plantilla":
        print(PLANTILLA, end="")
        return
    if len(sys.argv) != 2:
        sys.exit("Uso: python scripts/embudo.py embudo.csv  (o --plantilla)")
    try:
        with open(sys.argv[1], encoding="utf-8-sig", newline="") as f:
            filas = list(csv.DictReader(f))
    except FileNotFoundError:
        sys.exit(f"No existe '{sys.argv[1]}'.")
    pasos = []
    for i, fila in enumerate(filas, start=2):
        fila = {(k or "").strip().lower(): (v or "").strip() for k, v in fila.items()}
        try:
            actual = float(fila["actual"])
            anterior = float(fila["anterior"]) if fila.get("anterior") else None
        except (KeyError, ValueError):
            sys.exit(f"Fila {i}: 'actual' (y 'anterior' si existe) deben ser números.")
        pasos.append((fila.get("paso") or f"paso {i}", actual, anterior))
    if len(pasos) < 2:
        sys.exit("Se necesitan al menos dos pasos.")
    for (n1, a1, _), (n2, a2, _) in zip(pasos, pasos[1:]):
        if a2 > a1:
            print(f"Aviso: '{n2}' ({a2:g}) supera a '{n1}' ({a1:g}). Revisa si miden lo mismo (personas frente a eventos).",
                  file=sys.stderr)

    hay_anterior = all(x[2] is not None for x in pasos)
    print("# Análisis del embudo\n")
    cab = "| Paso | Actual | Conversión desde el paso previo |"
    sep = "|---|---|---|"
    if hay_anterior:
        cab += " Anterior | Conversión anterior | Cambio relativo | ¿Significativo? |"
        sep += "---|---|---|---|"
    print(cab + "\n" + sep)
    peores = []
    for i, (nombre, act, ant) in enumerate(pasos):
        if i == 0:
            fila = f"| {nombre} | {act:g} | — |"
            if hay_anterior:
                fila += f" {ant:g} | — | — | — |"
            print(fila)
            continue
        prev_act, prev_ant = pasos[i - 1][1], pasos[i - 1][2]
        c_act = tasa(act, prev_act)
        fila = f"| {nombre} | {act:g} | {p(c_act)} |"
        if hay_anterior:
            c_ant = tasa(ant, prev_ant)
            cambio = (c_act / c_ant - 1) if c_act is not None and c_ant else None
            sig = diferencia_significativa(act, prev_act, ant, prev_ant)
            fila += f" {ant:g} | {p(c_ant)} | {p(cambio)} | {'sí' if sig else 'no'} |"
            if cambio is not None and cambio <= -UMBRAL_CAIDA_RELATIVA:
                peores.append((cambio, nombre, sig))
        print(fila)

    total = tasa(pasos[-1][1], pasos[0][1])
    print(f"\nConversión total ({pasos[0][0]} → {pasos[-1][0]}): {p(total)}")
    if hay_anterior:
        if peores:
            print("\n**Pasos a investigar** (caída relativa ≥ "
                  f"{int(UMBRAL_CAIDA_RELATIVA * 100)} % frente al periodo anterior):")
            for cambio, nombre, sig in sorted(peores):
                nota = "diferencia estadísticamente significativa" if sig else "puede deberse al azar: confirma con más datos"
                print(f"- {nombre}: {p(cambio)} ({nota})")
        else:
            print("\nNingún paso empeora más de un "
                  f"{int(UMBRAL_CAIDA_RELATIVA * 100)} % frente al periodo anterior.")
    else:
        conv = [(tasa(pasos[i][1], pasos[i - 1][1]), pasos[i][0]) for i in range(1, len(pasos))]
        menor = min(c for c in conv if c[0] is not None)
        print(f"\nPaso con menor conversión: {menor[1]} ({p(menor[0])}). Sin periodo de comparación no se puede saber si es "
              "un problema o la conversión normal de esa etapa: añade la columna 'anterior' o compara entre anuncios o mercados.")
    print("\nRecuerda: el embudo muestra DÓNDE se pierde gente, no POR QUÉ. Las causas son hipótesis que hay que probar.")


if __name__ == "__main__":
    main()
