# Sistema de control de calidad

El sistema tiene tres capas de control:

1. **Control de las skills (estructura):** `herramientas/validar_skills.py` comprueba cada skill con las reglas de la documentación oficial de Anthropic (frontmatter YAML válido, nombre, descripción de 200 caracteres como máximo para claude.ai, menos de 500 líneas, enlaces y referencias a un nivel, tablas de contenidos, scripts que compilan). Además se ha comprobado con el validador oficial de la skill-creator de Anthropic y con `claude plugin validate`.
2. **Control de los scripts (cálculos):** cada script se ha probado con datos de ejemplo; véase "Pruebas realizadas" al final.
3. **Control de los entregables (contenido):** la lista siguiente, que la skill `director-infoproductos` aplica antes de entregar cualquier trabajo (copia de `references/control-calidad.md`).

---


## Contenido
- Revisión universal (todo entregable)
- Investigación e ideas
- Producto
- Oferta y copy
- Landing page
- Creativos y anuncios
- Emails
- Números y finanzas
- Protocolo de corrección

Aplica la revisión universal a todo y después la sección del tipo de entregable. Si un punto falla, corrígelo y vuelve a revisar; no entregues con fallos conocidos sin declararlos.

## Revisión universal
- [ ] Cada dato lleva etiqueta: VERIFICADO, ESTIMACIÓN, HIPÓTESIS o PENDIENTE.
- [ ] No hay cifras, testimonios, ventas, descuentos, escasez ni resultados inventados.
- [ ] El texto está escrito para el cliente concreto de la ficha (vocabulario, país, nivel de conciencia).
- [ ] No hay relleno: cada párrafo aporta información, un paso o una decisión.
- [ ] Se distingue lo hecho ("he creado X") de lo pendiente ("queda publicarlo en Y").
- [ ] Las promesas cumplen `cumplimiento.md`.
- [ ] Ortografía y localización revisadas (tú/usted/vos, moneda, formato de fecha).

## Investigación e ideas
- [ ] Cada fuente tiene nombre, enlace y fecha de consulta.
- [ ] Las puntuaciones explican el porqué de cada nota.
- [ ] Se separan "idea prometedora" y "producto validado".
- [ ] Se listan los datos que no se pudieron verificar y cómo obtenerlos.

## Producto
- [ ] El índice sigue una progresión lógica hacia el resultado prometido.
- [ ] Cada capítulo o lección tiene un objetivo, una explicación, un ejemplo y una acción.
- [ ] Las afirmaciones técnicas tienen fuente fiable; en salud y finanzas se respetan los límites de la información general.
- [ ] Incluye avisos necesarios (salud, finanzas) sin esconderlos.
- [ ] Formato: jerarquía visual clara, legible en móvil, índice navegable en PDF.
- [ ] El producto entrega todo lo que promete la página de ventas.

## Oferta y copy
- [ ] Público, problema, resultado, mecanismo, entregables, precio, garantía y CTA están definidos.
- [ ] Cada bono resuelve una objeción o un obstáculo concreto.
- [ ] Beneficios formulados como resultado para el cliente, apoyados en características reales.
- [ ] Hay al menos 2 variantes para A/B en titular y CTA.
- [ ] Sin miedo desproporcionado ni manipulación.

## Landing page
- [ ] Propuesta de valor y CTA visibles sin hacer scroll en móvil.
- [ ] Precio final, qué incluye, formato y forma de entrega claros antes del pago.
- [ ] Política de reembolso, privacidad, términos y datos del vendedor enlazados.
- [ ] Imágenes optimizadas, contraste suficiente, textos alternativos, botones de al menos 44 px de alto.
- [ ] Enlaces de pago reales y probados; nunca enlaces inventados.
- [ ] Compra de prueba completada (cobro, email, acceso).

## Creativos y anuncios
- [ ] Gancho claro en los primeros segundos o en la primera línea.
- [ ] Texto legible en móvil y dentro de las zonas seguras del formato.
- [ ] Revisión de políticas: sin atributos personales, sin antes/después de peso, sin promesas de ingresos.
- [ ] Hipótesis escrita y métrica para juzgarla.

## Emails
- [ ] Asunto, preencabezado, cuerpo, CTA, segmento, momento de envío y condiciones de entrada y salida definidos.
- [ ] Remitente identificable y enlace de baja.
- [ ] Una idea y una acción principal por email.

## Números y finanzas
- [ ] Se distinguen facturación, ingresos netos tras reembolsos, margen de contribución y beneficio neto.
- [ ] Comisiones, impuestos y reembolsos incluidos o marcados como hipótesis.
- [ ] Escenarios conservador, base y optimista con supuestos explícitos.
- [ ] Los cálculos se han hecho con el script de la skill de precios o se pueden reproducir.

## Protocolo de corrección
1. Lista los fallos con su sección y punto.
2. Corrige empezando por los de cumplimiento y los datos inventados.
3. Repite la revisión completa de la sección afectada.
4. Si un punto no puede cumplirse (falta un dato), declara el pendiente en la entrega.

---

## Pruebas realizadas en la construcción del sistema

| Prueba | Resultado |
|--------|-----------|
| `validar_skills.py` (17 skills) | 0 errores, 0 avisos |
| Validador oficial `quick_validate.py` (17 skills) | 17 válidas |
| `claude plugin validate` (plugin y marketplace) | Validación superada |
| Instalación real del plugin en Claude Code | 17 skills cargadas; ~1.600 tokens fijos por sesión; ninguna skill supera ~3.100 tokens al invocarse |
| `calcular_rentabilidad.py` | Desglose comprobado a mano (p. ej., facturación 32,07 € = 27 + 9 × 0,25 + 47 × 0,06) |
| `puntuar_ideas.py` | Ranking ponderado; filas con errores rechazadas con mensaje; ideas sin evidencia marcadas |
| `analizar_prueba.py` | Intervalo de Wilson, comparación de variantes y tamaño de muestra |
| `ab_test.py` | Tamaño de muestra coherente con las calculadoras estándar (≈ 13.900 por variante para +20 % sobre 3 %) |
| `embudo.py` | Conversión por paso, cambio relativo y significación |
| `metricas_ads.py` | Diagnóstico frente al CPA de equilibrio; detecta "ROAS > 1 pero pierde dinero" |
| `html_a_pdf.py` | PDF A5 de 11 páginas con enlaces internos generado con Chromium |
| `generar_carrusel.py` | PNG 1080×1350 correctos tras corregir el recorte de Chromium sin interfaz y la carga de fuentes |
| `renderizar.py` y plantillas de portada y mockup | PNG correctos tras corregir el lomo 3D del mockup |
| `contraste.py` | Detectó el contraste insuficiente del coral original con texto blanco (2,99:1) |
| Landing HTML en un iPhone emulado (390 px) | Sin scroll horizontal; CTA visible en la primera pantalla |
| Sección Liquid de Shopify | Esquema JSON válido (21 ajustes, 4 bloques); no probada en una tienda real |

### Lo que no se ha podido probar
- La subida de los ZIP a claude.ai (requiere tu cuenta).
- La sección Liquid en una tienda Shopify real.
- La calidad de activación de cada skill con distintos modelos: usa las pruebas de `09-pruebas-de-activacion.md`.
