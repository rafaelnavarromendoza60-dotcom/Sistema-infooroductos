#!/usr/bin/env python3
"""Genera un carrusel (HTML y, si hay navegador, PNG por diapositiva) a partir de un JSON.

Uso:
    python scripts/generar_carrusel.py --ejemplo > carrusel.json   # especificación de ejemplo
    python scripts/generar_carrusel.py carrusel.json salida/          # HTML de cada diapositiva
    python scripts/generar_carrusel.py carrusel.json salida/ --png    # además, PNG listos para publicar

Tipos de diapositiva: portada, texto, lista, cita, cta. Estilos: claro, oscuro, acento.
Campo opcional "imagen" (ruta local o URL) como fondo con velo para legibilidad.
"""
import argparse
import glob
import html
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

FORMATOS = {"4:5": (1080, 1350), "1:1": (1080, 1080), "9:16": (1080, 1920)}

EJEMPLO = {
    "marca": {
        "primario": "#2A1033", "acento": "#E8434F", "fondo": "#FFF8F3", "texto": "#2A1033",
        "fuente_titulos": "Fraunces", "fuente_texto": "Inter", "usuario": "@tumarca",
    },
    "formato": "4:5",
    "diapositivas": [
        {"tipo": "portada", "estilo": "oscuro", "titulo": "Por qué lo dejas cada jueves", "subtitulo": "(y no es fuerza de voluntad)"},
        {"tipo": "texto", "estilo": "claro", "titulo": "Te suena:", "cuerpo": "Lunes con ganas. Martes, bien. Miércoles, cansada. Jueves… mañana sigo."},
        {"tipo": "lista", "estilo": "claro", "titulo": "El error habitual", "items": ["Rutinas de 1 hora", "Cambiar todo a la vez", "Sin plan B para los días malos"]},
        {"tipo": "cita", "estilo": "acento", "titulo": "Constancia > intensidad", "cuerpo": "20 minutos que haces valen más que 60 que nunca empiezas."},
        {"tipo": "cta", "estilo": "oscuro", "titulo": "¿Quieres el plan de 10 minutos?", "cuerpo": "Comenta PLAN y te lo envío", "boton": "Comenta PLAN"},
    ],
}

PLANTILLA = """<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family={ftu}:wght@400;700;900&family={fxu}:wght@400;600;700&display=swap">
<style>
*{{box-sizing:border-box;margin:0}}
html,body{{width:{w}px;height:{h}px;overflow:hidden}}
body{{font-family:'{fx}',system-ui,sans-serif;display:flex;flex-direction:column;justify-content:center;padding:{pad}px;position:relative;background:{bg};color:{fg}}}
.bgimg{{position:absolute;inset:0;background-position:center;background-size:cover;z-index:0}}
.velo{{position:absolute;inset:0;background:{velo};z-index:0}}
.c{{position:relative;z-index:1}}
h1{{font-family:'{ft}',Georgia,serif;font-weight:900;line-height:1.02;letter-spacing:-.02em;font-size:{h1}px}}
h2{{font-family:'{ft}',Georgia,serif;font-weight:900;line-height:1.05;font-size:{h2}px;margin-bottom:36px}}
p{{font-size:{p}px;line-height:1.35}}
.sub{{margin-top:28px;font-size:{p}px;opacity:.85}}
ul{{list-style:none;padding:0}}
li{{font-size:{p}px;line-height:1.3;padding:22px 0 22px 70px;position:relative;border-bottom:2px solid {linea}}}
li::before{{content:"✕";position:absolute;left:0;top:20px;width:48px;height:48px;border-radius:50%;background:{ac};color:#fff;font-size:26px;display:grid;place-items:center}}
.cita{{font-family:'{ft}',Georgia,serif;font-style:italic;font-size:{p2}px;line-height:1.25}}
.boton{{display:inline-block;margin-top:44px;padding:26px 48px;border-radius:999px;background:{ac};color:#fff;font-weight:700;font-size:{p}px}}
.pie{{position:absolute;left:{pad}px;right:{pad}px;bottom:48px;display:flex;justify-content:space-between;font-size:28px;opacity:.7;z-index:1}}
.barra{{position:absolute;left:0;top:0;height:10px;background:{ac};width:{prog}%;z-index:1}}
</style></head><body>{fondo}<div class="barra"></div><div class="c">{contenido}</div>
<div class="pie"><span>{usuario}</span><span>{n}/{total}{flecha}</span></div></body></html>"""


def e(texto):
    return html.escape(str(texto or ""))


def colores(estilo, m):
    if estilo == "oscuro":
        return m["primario"], "#FFFFFF", "rgba(255,255,255,.18)"
    if estilo == "acento":
        return m["acento"], "#FFFFFF", "rgba(255,255,255,.3)"
    return m["fondo"], m["texto"], "rgba(0,0,0,.1)"


def contenido(d):
    t = d.get("tipo", "texto")
    if t == "portada":
        return f"<h1>{e(d.get('titulo'))}</h1>" + (f"<p class='sub'>{e(d.get('subtitulo'))}</p>" if d.get("subtitulo") else "")
    if t == "lista":
        items = "".join(f"<li>{e(i)}</li>" for i in d.get("items", []))
        return f"<h2>{e(d.get('titulo'))}</h2><ul>{items}</ul>"
    if t == "cita":
        return f"<h2>{e(d.get('titulo'))}</h2><p class='cita'>“{e(d.get('cuerpo'))}”</p>"
    if t == "cta":
        boton = f"<span class='boton'>{e(d.get('boton'))}</span>" if d.get("boton") else ""
        return f"<h2>{e(d.get('titulo'))}</h2><p>{e(d.get('cuerpo'))}</p>{boton}"
    return f"<h2>{e(d.get('titulo'))}</h2><p>{e(d.get('cuerpo'))}</p>"


def construir(spec, destino):
    marca = {**EJEMPLO["marca"], **spec.get("marca", {})}
    formato = spec.get("formato", "4:5")
    if formato not in FORMATOS:
        sys.exit(f"Formato '{formato}' no válido. Usa: {', '.join(FORMATOS)}")
    w, h = FORMATOS[formato]
    diapos = spec.get("diapositivas") or []
    if not diapos:
        sys.exit("El JSON no tiene 'diapositivas'.")
    if len(diapos) > 20:
        sys.exit("Instagram admite un máximo de 20 imágenes por carrusel; reduce las diapositivas.")
    destino.mkdir(parents=True, exist_ok=True)
    archivos = []
    escala = h / 1350
    for i, d in enumerate(diapos, start=1):
        bg, fg, linea = colores(d.get("estilo", "claro"), marca)
        img = d.get("imagen")
        fondo = ""
        if img:
            ruta_img = img if img.startswith(("http://", "https://")) else Path(img).resolve().as_uri()
            fondo = f"<div class='bgimg' style=\"background-image:url('{e(ruta_img)}')\"></div><div class='velo'></div>"
            fg = "#FFFFFF"
        pagina = PLANTILLA.format(
            w=w, h=h, pad=90, bg=bg, fg=fg, ac=marca["acento"], linea=linea,
            ft=marca["fuente_titulos"], fx=marca["fuente_texto"], velo="rgba(0,0,0,.55)",
            ftu=marca["fuente_titulos"].replace(" ", "+"), fxu=marca["fuente_texto"].replace(" ", "+"),
            h1=int(118 * escala), h2=int(84 * escala), p=int(46 * escala), p2=int(64 * escala),
            fondo=fondo, contenido=contenido(d), usuario=e(marca.get("usuario", "")),
            n=i, total=len(diapos), flecha="  →" if i < len(diapos) else "", prog=round(i / len(diapos) * 100),
        )
        archivo = destino / f"diapositiva-{i:02d}.html"
        archivo.write_text(pagina, encoding="utf-8")
        archivos.append(archivo)
    return archivos, (w, h)


def buscar_chromium():
    for nombre in ("chromium", "chromium-browser", "google-chrome", "google-chrome-stable", "chrome"):
        ruta = shutil.which(nombre)
        if ruta:
            return ruta
    base = os.environ.get("PLAYWRIGHT_BROWSERS_PATH", os.path.expanduser("~/.cache/ms-playwright"))
    candidatos = sorted(glob.glob(os.path.join(base, "chromium-*", "chrome-linux*", "chrome")), reverse=True)
    return candidatos[0] if candidatos else None


def a_png(archivos, tam):
    w, h = tam
    try:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as p:
            nav = p.chromium.launch()
            pag = nav.new_page(viewport={"width": w, "height": h})
            for a in archivos:
                pag.goto(a.resolve().as_uri(), wait_until="networkidle")
                pag.screenshot(path=str(a.with_suffix(".png")))
            nav.close()
        return "Playwright"
    except Exception:
        pass
    binario = buscar_chromium()
    if not binario:
        sys.exit("No hay navegador para generar PNG. Instala Playwright (pip install playwright && "
                 "python -m playwright install chromium) o abre los HTML y expórtalos/diseña en Canva.")
    # Chromium sin interfaz resta a la ventana el alto de una barra de navegador simulada (~87 px),
    # así que se captura con margen y se recorta al tamaño exacto. El presupuesto de tiempo virtual
    # deja cargar las fuentes web antes de la captura.
    margen = 300
    for a in archivos:
        subprocess.run([binario, "--headless", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
                        "--virtual-time-budget=8000", f"--window-size={w},{h + margen}",
                        f"--screenshot={a.with_suffix('.png').resolve()}", a.resolve().as_uri()],
                       capture_output=True, timeout=120)
    faltan = [a.name for a in archivos if not a.with_suffix(".png").exists()]
    if faltan:
        sys.exit(f"No se generaron algunos PNG: {', '.join(faltan)}")
    try:
        from PIL import Image
    except ImportError:
        print(f"Aviso: Pillow no está instalado; los PNG miden {w}×{h + margen} y deben recortarse a {w}×{h} "
              "desde arriba (pip install pillow y repite).", file=sys.stderr)
        return "Chromium (sin recortar)"
    for a in archivos:
        png = a.with_suffix(".png")
        with Image.open(png) as im:
            im.crop((0, 0, w, h)).save(png)
    return "Chromium"


def main():
    ap = argparse.ArgumentParser(description="Genera carruseles desde JSON")
    ap.add_argument("json", nargs="?")
    ap.add_argument("destino", nargs="?", default="carrusel")
    ap.add_argument("--png", action="store_true", help="Renderiza cada diapositiva a PNG")
    ap.add_argument("--ejemplo", action="store_true", help="Imprime una especificación de ejemplo")
    a = ap.parse_args()
    if a.ejemplo:
        print(json.dumps(EJEMPLO, ensure_ascii=False, indent=2))
        return
    if not a.json:
        ap.error("indica el JSON del carrusel o usa --ejemplo")
    try:
        spec = json.loads(Path(a.json).read_text(encoding="utf-8"))
    except FileNotFoundError:
        sys.exit(f"No existe '{a.json}'.")
    except json.JSONDecodeError as err:
        sys.exit(f"JSON no válido: {err}")
    archivos, tam = construir(spec, Path(a.destino))
    print(f"{len(archivos)} diapositivas HTML en {a.destino}/ ({tam[0]}×{tam[1]})")
    if a.png:
        motor = a_png(archivos, tam)
        print(f"PNG generados con {motor}.")


if __name__ == "__main__":
    main()
