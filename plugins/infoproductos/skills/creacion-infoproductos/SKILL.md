---
name: creacion-infoproductos
description: Escribe infoproductos completos (ebooks, guías, recetarios, cursos con guiones, plantillas) y genera el PDF editorial final. Úsala para redactar o maquetar el contenido de un producto digital.
---

# Creadora de infoproductos profesionales

Objetivo: un producto que **cumpla lo que promete la página de ventas**, original, específico para su público y verificado. El mejor marketing no compensa un producto que se abandona en la página 10 o que genera reembolsos.

## Antes de escribir

Confirma (de la ficha del proyecto o preguntando): público y su nivel, problema, resultado prometido, formato, extensión aproximada, tono, mercado e idioma (tú/usted/vos, unidades, ingredientes locales) y qué se ha prometido en la oferta (bonos incluidos). Si el tema es de salud, nutrición, finanzas o derecho, aplica el protocolo de verificación de [references/estilo-y-verificacion.md](references/estilo-y-verificacion.md) desde el principio.

## Flujo para un ebook o guía

```
Ebook:
- [ ] 1. Investigación previa y fuentes
- [ ] 2. Título comercial, subtítulo de beneficio y propuesta de valor
- [ ] 3. Índice estratégico (aprobado por el usuario antes de redactar)
- [ ] 4. Redacción por capítulos
- [ ] 5. Hojas de trabajo, plan de implementación y recursos
- [ ] 6. Revisión: datos, coherencia, promesa vs. contenido
- [ ] 7. Maquetación y PDF
- [ ] 8. Control de calidad final
```

Detalle de cada paso, fórmulas de título y plantilla de capítulo: [references/ebook.md](references/ebook.md).

**Reglas de redacción** (el porqué: el lector compró un resultado, no páginas):
- Cada capítulo responde a "¿qué podrá hacer el lector al terminarlo?".
- Estructura de capítulo: objetivo → explicación → ejemplo concreto → error frecuente → acción o ejercicio.
- Ejemplos situados en la vida del público (horarios, presupuesto, país), no genéricos.
- Sin relleno: elimina introducciones que repiten el título, listas de obviedades y repeticiones entre capítulos.
- Sin promesas exageradas ni resultados garantizados; cuando el resultado depende del lector, dilo.

**Redacta capítulo a capítulo** y guarda cada uno en un archivo para no perder trabajo en textos largos. Para un ebook de más de ~8.000 palabras, entrega primero el índice y un capítulo de muestra para validar el tono.

## Flujo para un curso

Objetivo de aprendizaje → módulos → lecciones → guiones de vídeo → ejercicios → descargables → evaluaciones → plan de progreso → recursos. Plantillas y estructura en [references/curso.md](references/curso.md).

## Maquetación y PDF

1. Copia `assets/plantilla-ebook.html`, sustituye los textos de ejemplo por el contenido y ajusta las variables de color y tipografía de `:root` a la identidad de marca (de `diseno-visual-mockups` si existe).
2. Genera el PDF:

```bash
python scripts/html_a_pdf.py ebook.html ebook.pdf
```

El script prueba, por orden, WeasyPrint, Playwright y Chromium o Chrome instalados. Si ninguno está disponible, muestra cómo instalar uno; en ese caso también puedes usar la skill de PDF del entorno, si existe.
3. Revisa el PDF: abre 3-4 páginas como imagen si puedes (portada, índice, un capítulo y una hoja de trabajo) y comprueba cortes de página, legibilidad y enlaces del índice.

La plantilla usa formato A5 (cómodo en móvil y tableta), cuerpo de 11,5 pt, interlineado amplio, índice con enlaces internos, cajas de objetivo, ejemplo y error frecuente, y hojas de trabajo con líneas para escribir.

Si el usuario pide un formato editable (Word, Google Docs, Notion, Canva), genera ese formato en lugar del PDF: un archivo funcional vale más que una imagen bonita.

## Control de calidad final

- [ ] El índice entrega la promesa de la página de ventas, punto por punto.
- [ ] Todas las afirmaciones técnicas tienen fuente fiable (y la sección de fuentes las recoge).
- [ ] Hay avisos de salud o finanzas cuando corresponde.
- [ ] Ejercicios y hojas de trabajo son utilizables (espacio suficiente, instrucciones claras).
- [ ] Localización correcta (moneda, medidas, vocabulario).
- [ ] PDF revisado visualmente; enlaces del índice funcionan.

## Ejemplo

Entrada: "Escribe el ebook GLOWFIT: entrenamiento en casa y alimentación para mujeres de 20-45, 6 capítulos."
Respuesta esperada: confirmar promesa y bonos de la oferta → proponer 3 títulos y el índice con objetivo por capítulo → tras la aprobación, redactar capítulo a capítulo con ejercicios ilustrados en texto, progresión semanal y hojas de seguimiento → aviso de salud (consultar con un profesional ante embarazo, lesiones o patologías) → maquetar con la plantilla → PDF → control de calidad.
