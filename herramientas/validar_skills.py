#!/usr/bin/env python3
"""Valida todas las skills del sistema con las reglas de la documentación oficial de Anthropic.

Uso:
    python herramientas/validar_skills.py [ruta/a/skills]

Comprueba por skill:
  - SKILL.md único, con frontmatter YAML que solo usa 'name' y 'description' (máxima portabilidad)
  - name: ≤ 64 caracteres, minúsculas/números/guiones, sin "anthropic" ni "claude", igual al nombre de la carpeta
  - description: no vacía, sin < ni >, ≤ 200 caracteres (límite de claude.ai; la API admite 1024)
  - cuerpo de SKILL.md < 500 líneas
  - enlaces relativos de SKILL.md que existen; referencias a un nivel de profundidad
  - archivos de referencia de más de 100 líneas con tabla de contenidos
  - scripts de Python que compilan y rutas sin barras invertidas
Solo biblioteca estándar.
"""
import py_compile
import re
import sys
from pathlib import Path

LIMITE_DESC_CLAUDE_AI = 200
LIMITE_DESC_API = 1024
LIMITE_NOMBRE = 64
LIMITE_LINEAS_CUERPO = 500
LINEAS_PARA_INDICE = 100
PALABRAS_RESERVADAS = ("anthropic", "claude")


def leer_frontmatter(texto):
    m = re.match(r"^---\n(.*?)\n---\n", texto, re.S)
    if not m:
        return None, texto
    # Con PyYAML se valida la sintaxis real (p. ej., ": " dentro de un valor sin comillas es YAML inválido).
    try:
        import yaml
        try:
            datos = yaml.safe_load(m.group(1))
        except yaml.YAMLError as e:
            return {"__error__": f"YAML inválido en el frontmatter: {str(e).splitlines()[0]}"}, texto[m.end():]
        if not isinstance(datos, dict):
            return {"__error__": "el frontmatter debe ser un diccionario YAML"}, texto[m.end():]
        return {k: str(v) for k, v in datos.items()}, texto[m.end():]
    except ImportError:
        pass
    campos = {}
    for linea in m.group(1).splitlines():
        if not linea.strip():
            continue
        if ":" not in linea or linea.startswith(" "):
            return {"__error__": f"línea de frontmatter no soportada: {linea!r}"}, texto
        clave, valor = linea.split(":", 1)
        valor = valor.strip()
        if ": " in valor and not valor.startswith(('"', "'")):
            return {"__error__": f"'{clave.strip()}' contiene ': ' sin comillas (YAML inválido)"}, texto
        campos[clave.strip()] = valor.strip('"').strip("'")
    return campos, texto[m.end():]


def validar(skill_dir):
    errores, avisos = [], []
    skill_md = skill_dir / "SKILL.md"
    if not skill_md.exists():
        return [f"falta SKILL.md"], avisos
    extra = [p for p in skill_dir.rglob("SKILL.md") if p != skill_md]
    if extra:
        errores.append(f"más de un SKILL.md: {[str(p) for p in extra]}")

    texto = skill_md.read_text(encoding="utf-8")
    fm, cuerpo = leer_frontmatter(texto)
    if fm is None:
        return ["frontmatter YAML ausente o mal delimitado"], avisos
    if "__error__" in fm:
        errores.append(fm["__error__"])
    claves = set(fm) - {"__error__"}
    if claves - {"name", "description"}:
        avisos.append(f"claves extra en el frontmatter (pueden no ser portables): {sorted(claves - {'name', 'description'})}")

    nombre = fm.get("name", "")
    if not nombre:
        errores.append("falta name")
    else:
        if len(nombre) > LIMITE_NOMBRE:
            errores.append(f"name de {len(nombre)} caracteres (> {LIMITE_NOMBRE})")
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", nombre):
            errores.append(f"name '{nombre}' debe usar solo minúsculas, números y guiones simples")
        if any(p in nombre for p in PALABRAS_RESERVADAS):
            errores.append(f"name '{nombre}' contiene una palabra reservada")
        if nombre != skill_dir.name:
            errores.append(f"name '{nombre}' no coincide con la carpeta '{skill_dir.name}'")

    desc = fm.get("description", "")
    if not desc:
        errores.append("falta description")
    else:
        if "<" in desc or ">" in desc:
            errores.append("description contiene < o >")
        if len(desc) > LIMITE_DESC_API:
            errores.append(f"description de {len(desc)} caracteres (> {LIMITE_DESC_API}, límite de la API)")
        elif len(desc) > LIMITE_DESC_CLAUDE_AI:
            errores.append(f"description de {len(desc)} caracteres (> {LIMITE_DESC_CLAUDE_AI}, límite de claude.ai)")

    n_lineas = len(cuerpo.splitlines())
    if n_lineas >= LIMITE_LINEAS_CUERPO:
        errores.append(f"cuerpo de SKILL.md con {n_lineas} líneas (≥ {LIMITE_LINEAS_CUERPO})")

    enlaces = re.findall(r"\]\(([^)#]+?)\)", cuerpo)
    for destino in enlaces:
        if destino.startswith(("http://", "https://", "mailto:")):
            continue
        if "\\" in destino:
            errores.append(f"ruta con barra invertida: {destino}")
        if not (skill_dir / destino).exists():
            errores.append(f"enlace roto en SKILL.md: {destino}")
    for ruta in re.findall(r"`((?:scripts|assets|references)/[^`\s]+)`", cuerpo):
        if not (skill_dir / ruta).exists():
            errores.append(f"archivo citado en SKILL.md no existe: {ruta}")

    for ref in sorted((skill_dir / "references").glob("*.md")) if (skill_dir / "references").exists() else []:
        contenido = ref.read_text(encoding="utf-8")
        lineas = contenido.splitlines()
        if len(lineas) > LINEAS_PARA_INDICE and "## Contenido" not in contenido:
            avisos.append(f"{ref.name}: {len(lineas)} líneas sin tabla de contenidos ('## Contenido')")
        for destino in re.findall(r"\]\(([^)#]+?\.md)\)", contenido):
            if not destino.startswith("http"):
                avisos.append(f"{ref.name} enlaza a otro .md ({destino}): las referencias deben estar a un nivel de SKILL.md")
        if ref.name not in cuerpo:
            avisos.append(f"{ref.name} no se menciona en SKILL.md (Claude podría no encontrarlo)")

    for py in sorted(skill_dir.rglob("*.py")):
        try:
            py_compile.compile(str(py), doraise=True)
        except py_compile.PyCompileError as e:
            errores.append(f"{py.name} no compila: {e.msg}")
        if py.name not in cuerpo:
            avisos.append(f"script {py.name} no se menciona en SKILL.md")
    for asset in sorted((skill_dir / "assets").glob("*")) if (skill_dir / "assets").exists() else []:
        if asset.name not in cuerpo:
            avisos.append(f"asset {asset.name} no se menciona en SKILL.md")
    return errores, avisos


def main():
    base = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / "plugins/infoproductos/skills"
    skills = sorted(p for p in base.iterdir() if p.is_dir())
    if not skills:
        sys.exit(f"No hay skills en {base}")
    total_err = 0
    print(f"Validando {len(skills)} skills en {base}\n")
    for s in skills:
        errores, avisos = validar(s)
        total_err += len(errores)
        fm, _ = leer_frontmatter((s / "SKILL.md").read_text(encoding="utf-8")) if (s / "SKILL.md").exists() else ({}, "")
        largo = len((fm or {}).get("description", ""))
        estado = "OK " if not errores else "ERR"
        print(f"[{estado}] {s.name} (descripción: {largo} caracteres)")
        for e in errores:
            print(f"   ✗ {e}")
        for a in avisos:
            print(f"   ⚠ {a}")
    print(f"\n{len(skills)} skills, {total_err} errores.")
    sys.exit(1 if total_err else 0)


if __name__ == "__main__":
    main()
