#!/usr/bin/env python3
"""Genera los paquetes de distribución del sistema.

Uso:
    python herramientas/empaquetar.py

Crea:
  dist/claude-ai/<skill>.zip       Un ZIP por skill con la carpeta de la skill en la raíz (formato de claude.ai)
  dist/sistema-infoproductos.zip   Todo el sistema (plugin, docs, ejemplos, herramientas y los ZIP anteriores)
Antes valida las skills y se detiene si hay errores.
"""
import subprocess
import sys
import zipfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SKILLS = RAIZ / "plugins" / "infoproductos" / "skills"
DIST = RAIZ / "dist"
EXCLUIR = {"__pycache__", ".DS_Store", ".git", "node_modules"}


def archivos(base):
    for p in sorted(base.rglob("*")):
        if p.is_file() and not any(parte in EXCLUIR for parte in p.relative_to(base).parts) and p.suffix != ".pyc":
            yield p


def main():
    r = subprocess.run([sys.executable, str(RAIZ / "herramientas" / "validar_skills.py"), str(SKILLS)],
                       capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout)
        sys.exit("Validación fallida: corrige los errores antes de empaquetar.")
    print("Validación superada.")

    destino = DIST / "claude-ai"
    destino.mkdir(parents=True, exist_ok=True)
    for viejo in destino.glob("*.zip"):
        viejo.unlink()
    for skill in sorted(p for p in SKILLS.iterdir() if p.is_dir()):
        zip_path = destino / f"{skill.name}.zip"
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
            for f in archivos(skill):
                z.write(f, Path(skill.name) / f.relative_to(skill))
        print(f"  {zip_path.relative_to(RAIZ)} ({zip_path.stat().st_size / 1024:.0f} KB)")

    completo = DIST / "sistema-infoproductos.zip"
    if completo.exists():
        completo.unlink()
    with zipfile.ZipFile(completo, "w", zipfile.ZIP_DEFLATED) as z:
        for f in archivos(RAIZ):
            if f == completo:
                continue
            z.write(f, Path("sistema-infoproductos") / f.relative_to(RAIZ))
    print(f"  {completo.relative_to(RAIZ)} ({completo.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
