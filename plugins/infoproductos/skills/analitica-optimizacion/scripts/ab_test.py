#!/usr/bin/env python3
"""Tamaño de muestra y análisis de tests A/B de conversión.

Uso:
    # ¿Cuántas visitas por variante necesito para detectar una mejora relativa del 20 % sobre una conversión del 3 %?
    python scripts/ab_test.py muestra --base 0.03 --mejora 0.20

    # Resultado de un test: A con 2400 visitas y 72 compras; B con 2380 visitas y 95 compras
    python scripts/ab_test.py analizar --a 2400 72 --b 2380 95

Confianza del 95 % y potencia del 80 %: convención habitual que equilibra falsos positivos y tamaño de muestra.
Solo biblioteca estándar.
"""
import argparse
import math
import sys

Z_ALFA = 1.959964   # 95 % bilateral
Z_BETA = 0.841621   # 80 % de potencia


def muestra(base, mejora):
    if not 0 < base < 1:
        sys.exit("--base debe estar entre 0 y 1 (p. ej., 0.03).")
    if mejora <= 0:
        sys.exit("--mejora debe ser positiva (p. ej., 0.20 para +20 % relativo).")
    p1, p2 = base, base * (1 + mejora)
    if p2 >= 1:
        sys.exit("La mejora lleva la conversión por encima del 100 %.")
    pm = (p1 + p2) / 2
    n = ((Z_ALFA * math.sqrt(2 * pm * (1 - pm)) + Z_BETA * math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2) / (p2 - p1) ** 2
    n = math.ceil(n)
    print(f"Conversión base {base * 100:.2f} % → objetivo {p2 * 100:.2f} % (+{mejora * 100:.0f} % relativo)".replace(".", ","))
    print(f"Necesitas ≈ {n} visitas POR VARIANTE ({2 * n} en total), ≈ {math.ceil(n * p1)} conversiones en A.")
    print("Si no puedes alcanzar ese tráfico en un plazo razonable, prueba cambios más grandes (que produzcan mejoras mayores) "
          "en lugar de detalles.")


def analizar(a, b):
    (na, ka), (nb, kb) = a, b
    for n, k in (a, b):
        if n <= 0 or k < 0 or k > n:
            sys.exit("Cada variante necesita visitas > 0 y conversiones entre 0 y las visitas.")
    pa, pb = ka / na, kb / nb
    pool = (ka + kb) / (na + nb)
    se = math.sqrt(pool * (1 - pool) * (1 / na + 1 / nb))
    z = (pb - pa) / se if se else 0.0
    p_valor = math.erfc(abs(z) / math.sqrt(2))
    se_dif = math.sqrt(pa * (1 - pa) / na + pb * (1 - pb) / nb)
    lo, hi = (pb - pa) - Z_ALFA * se_dif, (pb - pa) + Z_ALFA * se_dif

    def pc(x):
        return f"{x * 100:.2f}".replace(".", ",")

    print("| Variante | Visitas | Conversiones | Conversión |\n|---|---|---|---|")
    print(f"| A | {na} | {ka} | {pc(pa)} % |\n| B | {nb} | {kb} | {pc(pb)} % |")
    rel = (pb / pa - 1) * 100 if pa else float("inf")
    rel_txt = f"{rel:+.1f}".replace(".", ",")
    p_txt = f"{p_valor:.3f}".replace(".", ",")
    print(f"\nDiferencia B − A: {pc(pb - pa)} puntos ({rel_txt} % relativo), IC 95 %: [{pc(lo)}, {pc(hi)}] puntos; "
          f"p = {p_txt}.")
    if p_valor < 0.05:
        ganador = "B" if pb > pa else "A"
        print(f"**Conclusión:** diferencia significativa al 95 %. {ganador} convierte mejor en esta métrica.")
    else:
        print("**Conclusión:** sin diferencia significativa. No declares ganadora; el intervalo indica el rango de efectos "
              "compatibles con los datos.")
    print("Antes de aplicar: comprueba que el test duró al menos un ciclo semanal completo, que no cambió nada más durante "
          "la prueba y que la métrica de negocio (ingresos, reembolsos) no empeora.")


def main():
    ap = argparse.ArgumentParser(description="Tests A/B de conversión")
    sub = ap.add_subparsers(dest="cmd", required=True)
    m = sub.add_parser("muestra")
    m.add_argument("--base", type=float, required=True)
    m.add_argument("--mejora", type=float, required=True)
    an = sub.add_parser("analizar")
    an.add_argument("--a", type=int, nargs=2, metavar=("VISITAS", "CONVERSIONES"), required=True)
    an.add_argument("--b", type=int, nargs=2, metavar=("VISITAS", "CONVERSIONES"), required=True)
    args = ap.parse_args()
    if args.cmd == "muestra":
        muestra(args.base, args.mejora)
    else:
        analizar(args.a, args.b)


if __name__ == "__main__":
    main()
