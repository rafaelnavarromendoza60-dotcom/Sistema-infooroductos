#!/usr/bin/env python3
"""Renderiza un HTML (portada, mockup, banner, creativo) a PNG con el tamaño exacto indicado.

Uso:
    python scripts/renderizar.py assets/portada-ebook.html portada.png --ancho 1600 --alto 2560
    python scripts/renderizar.py assets/mockup-libro.html mockup.png --ancho 1600 --alto 1200

Usa Playwright si está instalado; si no, Chromium o Chrome del sistema (recorta con Pillow).
"""
import argparse
import glob
import os
import shutil
import subprocess
import sys
from pathlib import Path

# Chromium sin interfaz resta ~87 px de alto a la ventana (barra simulada): se captura con
# este margen y se recorta al tamaño pedido.
MARGEN_VENTANA = 300


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


def con_playwright(entrada, salida, w, h):
    try:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as p:
            nav = p.chromium.launch()
            pag = nav.new_page(viewport={"width": w, "height": h})
            pag.goto(entrada.resolve().as_uri(), wait_until="networkidle")
            pag.screenshot(path=str(salida))
            nav.close()
        return True
    except Exception:
        return False


def con_chromium(entrada, salida, w, h):
    binario = buscar_chromium()
    if not binario:
        return False, "no se encontró Chromium ni Chrome"
    subprocess.run([binario, "--headless", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
                    "--virtual-time-budget=8000", f"--window-size={w},{h + MARGEN_VENTANA}",
                    f"--screenshot={salida.resolve()}", entrada.resolve().as_uri()],
                   capture_output=True, timeout=120)
    if not salida.exists():
        return False, "Chromium no generó la imagen"
    try:
        from PIL import Image
        with Image.open(salida) as im:
            im.crop((0, 0, w, h)).save(salida)
    except ImportError:
        return True, f"sin recortar (instala Pillow): la imagen mide {w}×{h + MARGEN_VENTANA}"
    return True, "Chromium"


def main():
    ap = argparse.ArgumentParser(description="HTML a PNG")
    ap.add_argument("html")
    ap.add_argument("png")
    ap.add_argument("--ancho", type=int, required=True)
    ap.add_argument("--alto", type=int, required=True)
    a = ap.parse_args()
    entrada, salida = Path(a.html), Path(a.png)
    if not entrada.exists():
        sys.exit(f"No existe {entrada}")
    salida.parent.mkdir(parents=True, exist_ok=True)
    if salida.exists():
        salida.unlink()
    if con_playwright(entrada, salida, a.ancho, a.alto):
        print(f"PNG generado con Playwright: {salida}")
        return
    ok, detalle = con_chromium(entrada, salida, a.ancho, a.alto)
    if not ok:
        sys.exit(f"No se pudo renderizar: {detalle}. Instala Playwright (pip install playwright && "
                 "python -m playwright install chromium) o usa Canva u otra herramienta de diseño.")
    print(f"PNG generado ({detalle}): {salida}")


if __name__ == "__main__":
    main()
