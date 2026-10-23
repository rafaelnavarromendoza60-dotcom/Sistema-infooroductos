#!/usr/bin/env python3
"""Convierte un HTML (p. ej. assets/plantilla-ebook.html rellenado) en PDF.

Uso:
    python scripts/html_a_pdf.py ebook.html ebook.pdf

Prueba, por orden: WeasyPrint (respeta mejor @page y genera marcadores), Playwright y
Chromium/Chrome por línea de comandos. Si ninguno está disponible, explica cómo instalar uno.
"""
import glob
import os
import shutil
import subprocess
import sys
from pathlib import Path

# Tiempo máximo para que Chromium renderice: un ebook largo con fuentes web puede tardar.
TIMEOUT_SEGUNDOS = 180


def con_weasyprint(entrada, salida):
    try:
        from weasyprint import HTML
    except ImportError:
        return False, "WeasyPrint no instalado"
    HTML(filename=str(entrada)).write_pdf(str(salida))
    return True, "WeasyPrint"


def con_playwright(entrada, salida):
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        return False, "Playwright no instalado"
    try:
        with sync_playwright() as p:
            navegador = p.chromium.launch()
            pagina = navegador.new_page()
            pagina.goto(entrada.resolve().as_uri(), wait_until="networkidle")
            pagina.pdf(path=str(salida), prefer_css_page_size=True, print_background=True)
            navegador.close()
        return True, "Playwright"
    except Exception as e:  # navegador no descargado u otro fallo de arranque
        return False, f"Playwright falló: {e}"


def buscar_chromium():
    for nombre in ("chromium", "chromium-browser", "google-chrome", "google-chrome-stable", "chrome"):
        ruta = shutil.which(nombre)
        if ruta:
            return ruta
    base = os.environ.get("PLAYWRIGHT_BROWSERS_PATH", os.path.expanduser("~/.cache/ms-playwright"))
    candidatos = sorted(glob.glob(os.path.join(base, "chromium-*", "chrome-linux*", "chrome")), reverse=True)
    mac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    if os.path.exists(mac):
        candidatos.append(mac)
    return candidatos[0] if candidatos else None


def con_chromium(entrada, salida):
    binario = buscar_chromium()
    if not binario:
        return False, "Chromium/Chrome no encontrado"
    cmd = [binario, "--headless", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
           "--generate-pdf-document-outline", f"--print-to-pdf={salida.resolve()}", entrada.resolve().as_uri()]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=TIMEOUT_SEGUNDOS)
    except subprocess.TimeoutExpired:
        return False, f"Chromium superó {TIMEOUT_SEGUNDOS} s"
    if salida.exists() and salida.stat().st_size > 0:
        return True, f"Chromium ({binario})"
    return False, f"Chromium falló: {r.stderr.strip()[:300]}"


def main():
    if len(sys.argv) != 3:
        sys.exit("Uso: python scripts/html_a_pdf.py entrada.html salida.pdf")
    entrada, salida = Path(sys.argv[1]), Path(sys.argv[2])
    if not entrada.exists():
        sys.exit(f"No existe el archivo de entrada: {entrada}")
    salida.parent.mkdir(parents=True, exist_ok=True)
    if salida.exists():
        salida.unlink()

    intentos = []
    for metodo in (con_weasyprint, con_playwright, con_chromium):
        ok, detalle = metodo(entrada, salida)
        if ok:
            print(f"PDF generado con {detalle}: {salida} ({salida.stat().st_size / 1024:.0f} KB)")
            return
        intentos.append(detalle)

    print("No se pudo generar el PDF. Intentos: " + "; ".join(intentos), file=sys.stderr)
    print("Instala una opción y repite:\n"
          "  pip install weasyprint            (recomendado; en Linux puede requerir pango)\n"
          "  pip install playwright && python -m playwright install chromium", file=sys.stderr)
    sys.exit(1)


if __name__ == "__main__":
    main()
