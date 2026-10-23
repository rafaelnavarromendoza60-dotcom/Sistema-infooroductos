#!/usr/bin/env python3
"""Puntúa y clasifica ideas de infoproductos con criterios ponderados.

Uso:
    python scripts/puntuar_ideas.py ideas.csv
    python scripts/puntuar_ideas.py ideas.csv --pesos demanda=30,diferenciacion=20,facilidad=10,margen=15,captacion=15,competencia=10
    python scripts/puntuar_ideas.py --plantilla > ideas.csv

CSV (separador coma o punto y coma, UTF-8). Columnas obligatorias:
    idea, demanda, diferenciacion, facilidad, margen, captacion, competencia
Columnas opcionales:
    formato, evidencia (texto con la fuente de demanda), validado (si/no)

Notas 1-5 en cada criterio. En "competencia", 5 significa competencia débil o fácil de superar.
Solo depende de la biblioteca estándar de Python.
"""
import argparse
import csv
import io
import sys

CRITERIOS = ["demanda", "diferenciacion", "facilidad", "margen", "captacion", "competencia"]

# La demanda pesa más porque sin ella nada de lo demás importa; la competencia pesa menos
# porque un mercado con competidores suele indicar que hay compradores.
PESOS_POR_DEFECTO = {
    "demanda": 25,
    "diferenciacion": 20,
    "facilidad": 15,
    "margen": 15,
    "captacion": 15,
    "competencia": 10,
}

# Umbrales de clasificación sobre la nota ponderada (escala 1-5).
UMBRAL_PROMETEDORA = 3.5
UMBRAL_DEBIL = 2.5

PLANTILLA = (
    "idea,formato,demanda,diferenciacion,facilidad,margen,captacion,competencia,evidencia,validado\n"
    "Plan de comidas para llevar al trabajo,recetario + planificador,4,3,5,4,4,3,"
    "\"4 recetarios con reseñas en marketplace (enlaces, fecha)\",no\n"
)


def parsear_pesos(texto):
    pesos = dict(PESOS_POR_DEFECTO)
    if not texto:
        return pesos
    for parte in texto.split(","):
        if "=" not in parte:
            sys.exit(f"Error en --pesos: '{parte}' debe tener el formato criterio=valor.")
        clave, valor = (p.strip() for p in parte.split("=", 1))
        if clave not in PESOS_POR_DEFECTO:
            sys.exit(f"Error en --pesos: criterio '{clave}' desconocido. Válidos: {', '.join(CRITERIOS)}")
        try:
            pesos[clave] = float(valor)
        except ValueError:
            sys.exit(f"Error en --pesos: el valor de '{clave}' no es un número ('{valor}').")
    total = sum(pesos.values())
    if abs(total - 100) > 0.01:
        sys.exit(f"Error en --pesos: los pesos deben sumar 100 y suman {total:g}.")
    return pesos


def leer_csv(ruta):
    try:
        with open(ruta, encoding="utf-8-sig", newline="") as f:
            contenido = f.read()
    except FileNotFoundError:
        sys.exit(f"No se encuentra el archivo '{ruta}'. Genera uno con: python scripts/puntuar_ideas.py --plantilla > ideas.csv")
    if not contenido.strip():
        sys.exit(f"El archivo '{ruta}' está vacío.")
    separador = ";" if contenido.splitlines()[0].count(";") > contenido.splitlines()[0].count(",") else ","
    lector = csv.DictReader(io.StringIO(contenido), delimiter=separador)
    columnas = [c.strip().lower() for c in (lector.fieldnames or [])]
    faltan = [c for c in ["idea"] + CRITERIOS if c not in columnas]
    if faltan:
        sys.exit(f"Faltan columnas: {', '.join(faltan)}. Columnas encontradas: {', '.join(columnas)}")
    filas = []
    for fila in lector:
        filas.append({(k or "").strip().lower(): (v or "").strip() for k, v in fila.items()})
    return filas


def clasificar(nota, tiene_evidencia, validado):
    if validado:
        return "Validada comercialmente"
    if nota >= UMBRAL_PROMETEDORA:
        return "Prometedora con evidencia: validar" if tiene_evidencia else "Prometedora SIN evidencia: investigar antes"
    if nota >= UMBRAL_DEBIL:
        return "Revisar: mejorar diferenciación o acotar público"
    return "Débil: descartar o replantear"


def main():
    parser = argparse.ArgumentParser(description="Puntúa ideas de infoproductos.")
    parser.add_argument("csv", nargs="?", help="Ruta al CSV de ideas")
    parser.add_argument("--pesos", help="Pesos personalizados, p. ej. demanda=30,diferenciacion=20,...")
    parser.add_argument("--plantilla", action="store_true", help="Imprime un CSV de ejemplo")
    args = parser.parse_args()

    if args.plantilla:
        print(PLANTILLA, end="")
        return
    if not args.csv:
        parser.error("indica el CSV de ideas o usa --plantilla")

    pesos = parsear_pesos(args.pesos)
    resultados, errores = [], []
    for n, fila in enumerate(leer_csv(args.csv), start=2):
        nombre = fila.get("idea") or f"(fila {n} sin nombre)"
        notas = {}
        for c in CRITERIOS:
            try:
                valor = float(fila.get(c, "").replace(",", "."))
            except ValueError:
                errores.append(f"Fila {n} ({nombre}): '{c}' no es un número ('{fila.get(c, '')}').")
                continue
            if not 1 <= valor <= 5:
                errores.append(f"Fila {n} ({nombre}): '{c}' = {valor:g} fuera del rango 1-5.")
                continue
            notas[c] = valor
        if len(notas) != len(CRITERIOS):
            continue
        nota = sum(notas[c] * pesos[c] for c in CRITERIOS) / 100
        evidencia = fila.get("evidencia", "")
        validado = fila.get("validado", "").lower() in {"si", "sí", "yes", "true", "1"}
        resultados.append({
            "idea": nombre,
            "formato": fila.get("formato", ""),
            "nota": nota,
            "notas": notas,
            "evidencia": evidencia,
            "clasificacion": clasificar(nota, bool(evidencia), validado),
        })

    if errores:
        print("## Filas con errores (no puntuadas)\n")
        for e in errores:
            print(f"- {e}")
        print()
    if not resultados:
        sys.exit("No hay ideas válidas que puntuar.")

    resultados.sort(key=lambda r: r["nota"], reverse=True)
    print("## Ranking de ideas\n")
    print("Pesos: " + ", ".join(f"{c} {pesos[c]:g} %" for c in CRITERIOS) + "\n")
    cabecera = "| # | Idea | Formato | " + " | ".join(c[:5] for c in CRITERIOS) + " | Nota | Clasificación |"
    print(cabecera)
    print("|" + "---|" * (len(CRITERIOS) + 5))
    for i, r in enumerate(resultados, start=1):
        celdas = " | ".join(f"{r['notas'][c]:g}" for c in CRITERIOS)
        print(f"| {i} | {r['idea']} | {r['formato']} | {celdas} | {format(r['nota'], '.2f').replace('.', ',')} | {r['clasificacion']} |")

    sin_evidencia = [r["idea"] for r in resultados if not r["evidencia"]]
    if sin_evidencia:
        print("\n**Atención:** estas ideas no tienen evidencia de demanda registrada y no pueden presentarse "
              "como ganadoras: " + "; ".join(sin_evidencia) + ".")
    print("\nRecuerda: la nota ordena hipótesis. Solo la validación con señales de compra convierte una idea en producto validado.")


if __name__ == "__main__":
    main()
