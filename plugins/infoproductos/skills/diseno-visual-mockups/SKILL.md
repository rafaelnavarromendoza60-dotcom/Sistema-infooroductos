---
name: diseno-visual-mockups
description: Crea identidad visual, portadas de ebook y curso, mockups 3D, banners, imágenes de landing e infografías legibles en móvil, renderizadas a PNG. Úsala para diseñar los visuales de un infoproducto.
---

# Diseño visual y mockups

Objetivo: visuales coherentes con la marca y el público que **se entienden a tamaño de miniatura en un móvil**. La claridad vende más que el adorno.

## Flujo de trabajo

```
Diseño:
- [ ] 1. Definir o leer la identidad visual
- [ ] 2. Comprobar el contraste de la paleta
- [ ] 3. Producir las piezas con las plantillas
- [ ] 4. Renderizar y revisar visualmente
- [ ] 5. Entregar en los formatos que se usarán
```

**1. Identidad visual.** Si no existe, propón una con [references/identidad-visual.md](references/identidad-visual.md): paleta (primario, acento para acciones, fondo, texto, color de confianza), dos tipografías (títulos y texto), estilo fotográfico e iconografía, con el porqué de cada elección según el público y el posicionamiento. Guárdala como bloque de variables CSS reutilizable.

**2. Contraste.**

```bash
python scripts/contraste.py --paleta "#2A1033,#FF5E62,#FFF8F3,#FFFFFF"
```

Usa solo combinaciones aptas para texto (≥ 4,5:1 texto normal; ≥ 3:1 texto grande). Si el color de acento no llega con texto blanco, oscurécelo para los botones o usa texto oscuro sobre él.

**3. Piezas.** Plantillas HTML editables en `assets/`:
- `portada-ebook.html`: portada 1600×2560 (proporción 1:1,6, válida para la mayoría de tiendas y marketplaces).
- `mockup-libro.html`: ebook en 3D + móvil, 1600×1200, para landing y anuncios (usa `portada.png` en la misma carpeta).

Para otras piezas (banners, portadas de curso 16:9, imágenes de la landing, infografías, plantillas de redes) adapta una plantilla manteniendo las variables de marca. Para carruseles usa la skill `creativos-redes-sociales`.

**4. Renderizar.**

```bash
python scripts/renderizar.py assets/portada-ebook.html portada.png --ancho 1600 --alto 2560
python scripts/renderizar.py mockup-libro.html mockup.png --ancho 1600 --alto 1200
```

Mira el PNG resultante antes de entregarlo: texto cortado, solapamientos, legibilidad reducida al 25 %.

**Imágenes fotográficas** (personas, comida, entornos): escribe prompts para IA con la estructura de [references/identidad-visual.md](references/identidad-visual.md) o usa bancos con licencia. Si hay un conector de generación de imágenes o de Canva disponible, úsalo y entrega el enlace editable; si no, entrega los prompts listos para usar.

**5. Entrega.** PNG o JPG para web y redes; PDF para imprimibles; formato editable (HTML, Canva, Figma) cuando el usuario necesite modificarlo. No sustituyas un archivo funcional (PDF con índice, plantilla editable) por una imagen.

## Principios de diseño para infoproductos
- **Jerarquía:** un elemento dominante por pieza (título o producto), después el beneficio y después el CTA.
- **El producto se ve:** el mockup hace tangible lo digital; muestra el interior (páginas, plantillas) cuando sea posible.
- **Coherencia:** mismos colores, tipografías y estilo en portada, landing, anuncios y emails.
- **Cuerpos reales y diversos** en fitness y belleza; nada de imágenes antes/después para publicidad.
- **Accesibilidad:** contraste, tamaño mínimo de texto y texto alternativo en la web.

## Ejemplo

Entrada: "Necesito la portada y el mockup del ebook GLOWFIT."
Respuesta esperada: leer la paleta de la marca (ciruela, coral, crema) → comprobar contraste (detectar que el coral con texto blanco no alcanza 3:1 y proponer un coral más oscuro para los botones) → rellenar `portada-ebook.html` con título, subtítulo y autora → renderizar → crear el mockup con esa portada → revisar ambos PNG → entregar los dos archivos y las variables CSS.
