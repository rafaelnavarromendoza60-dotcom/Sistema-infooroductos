# Manual de instalación

Las skills se instalan por separado en cada superficie: lo que subes a claude.ai no aparece en Claude Code ni en la API, y al revés.

## Contenido
- Antes de empezar
- Opción A. claude.ai (web, escritorio y móvil)
- Opción B. Claude Code (recomendado: las 17 de una vez)
- Opción C. API de Claude
- Requisitos de los scripts
- Integraciones opcionales
- Actualizar y validar
- Solución de problemas

## Antes de empezar

Archivos entregados:
- `dist/claude-ai/<skill>.zip`: 17 ZIP, uno por skill, con la carpeta de la skill en la raíz (formato que exige claude.ai).
- `dist/sistema-infoproductos.zip`: todo el sistema (plugin, documentación, ejemplos y herramientas).

## Opción A. claude.ai (web, escritorio y móvil)

Requisitos: plan Pro, Max, Team o Enterprise con la **ejecución de código** activada (Configuración → Funciones o Capacidades).

1. Descomprime `sistema-infoproductos.zip` y abre la carpeta `dist/claude-ai/`.
2. En claude.ai, ve a **Personalizar → Skills** (claude.ai/customize/skills) o a la sección de Skills de la configuración.
3. Sube los ZIP **uno a uno**, sin descomprimirlos. Empieza por `director-infoproductos.zip` y después los que vayas a usar más.
4. Activa cada skill subida.
5. Prueba: en un chat nuevo escribe "Quiero lanzar un ebook de recetas para personas con poco tiempo en México; ¿por dónde empiezo?". Claude debería usar `director-infoproductos`.

Notas:
- En claude.ai las skills son personales: cada persona del equipo debe subirlas.
- El acceso a internet de las skills depende de la configuración de la cuenta; sin él, la investigación marcará los datos como `[PENDIENTE]`.
- Para conservar el contexto entre chats, guarda la **ficha del proyecto** (`00-ficha-proyecto.md`) que genera la skill directora y súbela al iniciar cada conversación, o usa un Proyecto de claude.ai con la ficha como conocimiento.

## Opción B. Claude Code (recomendado: las 17 de una vez)

Como plugin desde la carpeta local:

```bash
claude plugin marketplace add /ruta/a/sistema-infoproductos
claude plugin install infoproductos@sistema-infoproductos
claude plugin details infoproductos      # debe listar Skills (17)
```

Si subes la carpeta a un repositorio de GitHub (por ejemplo, `tu-usuario/sistema-infoproductos`):

```bash
claude plugin marketplace add tu-usuario/sistema-infoproductos
claude plugin install infoproductos@sistema-infoproductos
```

Dentro de una sesión, las skills del plugin se invocan con el prefijo del plugin (por ejemplo, `/infoproductos:director-infoproductos`), y Claude también las usa automáticamente cuando la tarea encaja.

Alternativa sin plugin: copia las carpetas de `plugins/infoproductos/skills/` a `~/.claude/skills/` (personales) o a `.claude/skills/` dentro de un proyecto.

## Opción C. API de Claude

- Las skills personalizadas se suben con la API de Skills (`/v1/skills`) y se usan junto con la herramienta de ejecución de código, referenciando su `skill_id` en el parámetro `container`. Sigue la guía oficial "Using Agent Skills with the API" (platform.claude.com/docs) para los encabezados y versiones vigentes.
- En la API las skills son de todo el espacio de trabajo y se ejecutan **sin acceso a internet ni instalación de paquetes**: los scripts del sistema solo usan la biblioteca estándar de Python, pero la generación de PDF y PNG necesita un motor de renderizado disponible en el contenedor, y la investigación web no funcionará.

## Requisitos de los scripts

| Script | Skill | Requisitos |
|--------|-------|------------|
| `puntuar_ideas.py` | ideas-infoproductos | Python 3 |
| `analizar_prueba.py` | validacion-demanda | Python 3 |
| `calcular_rentabilidad.py` | precios-rentabilidad | Python 3 |
| `metricas_ads.py` | meta-ads-infoproductos | Python 3 |
| `embudo.py`, `ab_test.py` | analitica-optimizacion | Python 3 |
| `contraste.py` | diseno-visual-mockups | Python 3 |
| `html_a_pdf.py` | creacion-infoproductos | WeasyPrint, Playwright o Chromium/Chrome |
| `renderizar.py`, `generar_carrusel.py` | diseno-visual-mockups, creativos-redes-sociales | Playwright o Chromium/Chrome (+ Pillow para recortar) |

Instalación local de las opciones de renderizado (si las necesitas):

```bash
pip install weasyprint            # PDF
pip install playwright pillow && python -m playwright install chromium   # PDF y PNG
```

## Integraciones opcionales

Las skills funcionan sin integraciones: entregan archivos, textos y configuraciones para que tú los apliques. Si tu entorno tiene conectores (por ejemplo, Canva para editar diseños, Shopify para consultar productos, tu herramienta de email), Claude puede usarlos cuando lo autorices. Necesitarás tus propias cuentas y suscripciones en cada plataforma (Shopify, Hotmart, Systeme.io, Meta Business, herramienta de email, etc.).

## Actualizar y validar

Tras modificar una skill:

```bash
python herramientas/validar_skills.py          # reglas oficiales + límite de 200 caracteres de claude.ai
python herramientas/empaquetar.py              # regenera los ZIP de dist/
claude plugin validate .                       # si usas Claude Code
```

En claude.ai, sube de nuevo el ZIP de la skill modificada. En Claude Code, ejecuta `/reload-plugins` o inicia una sesión nueva.

## Solución de problemas

| Problema | Causa probable | Solución |
|----------|----------------|----------|
| claude.ai rechaza el ZIP | Estructura incorrecta o descripción demasiado larga | Usa los ZIP de `dist/claude-ai/` sin modificar; ejecuta el validador |
| La skill no se activa | La petición es demasiado simple o no coincide con la descripción | Nómbrala ("usa la skill de precios-rentabilidad") o da más contexto |
| El PDF o los PNG no se generan | No hay motor de renderizado | Instala WeasyPrint o Playwright (ver arriba) |
| La investigación devuelve muchos `[PENDIENTE]` | Sin acceso a internet o fuentes que requieren navegador | Activa el acceso a la red o completa los datos manualmente siguiendo las instrucciones del informe |
