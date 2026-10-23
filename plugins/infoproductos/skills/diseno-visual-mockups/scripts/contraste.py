#!/usr/bin/env python3
"""Comprueba el contraste entre pares de colores según WCAG 2.x.

Uso:
    python scripts/contraste.py "#FFFFFF" "#FF5E62"
    python scripts/contraste.py --paleta "#2A1033,#FF5E62,#FFF8F3,#1B7F6B"   # todas las combinaciones

Umbrales WCAG: texto normal AA 4,5:1 y AAA 7:1; texto grande (≥ 24 px, o ≥ 18,7 px en negrita) AA 3:1.
"""
import argparse
import itertools
import sys


def a_rgb(hexa):
    h = hexa.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) != 6:
        sys.exit(f"Color no válido: {hexa} (usa #RRGGBB)")
    try:
        return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    except ValueError:
        sys.exit(f"Color no válido: {hexa}")


def luminancia(rgb):
    def canal(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (canal(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(c1, c2):
    l1, l2 = sorted((luminancia(a_rgb(c1)), luminancia(a_rgb(c2))), reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)


def veredicto(r):
    if r >= 7:
        return "AAA: apto para cualquier texto"
    if r >= 4.5:
        return "AA: apto para texto normal"
    if r >= 3:
        return "Solo texto grande o elementos gráficos"
    return "NO apto para texto"


def main():
    ap = argparse.ArgumentParser(description="Contraste WCAG")
    ap.add_argument("colores", nargs="*")
    ap.add_argument("--paleta", help="Lista de colores separados por comas")
    a = ap.parse_args()
    if a.paleta:
        cols = [c.strip() for c in a.paleta.split(",") if c.strip()]
        pares = list(itertools.combinations(cols, 2))
    elif len(a.colores) == 2:
        pares = [tuple(a.colores)]
    else:
        ap.error("indica dos colores o --paleta")
    print("| Color A | Color B | Contraste | Uso |\n|---|---|---|---|")
    for c1, c2 in sorted(pares, key=lambda p: ratio(*p), reverse=True):
        r = ratio(c1, c2)
        print(f"| {c1} | {c2} | {r:.2f}:1 | {veredicto(r)} |".replace(".", ",", 1))


if __name__ == "__main__":
    main()
