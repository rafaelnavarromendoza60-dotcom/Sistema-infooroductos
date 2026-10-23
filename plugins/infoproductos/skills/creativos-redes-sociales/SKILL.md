---
name: creativos-redes-sociales
description: Crea ganchos, carruseles, guiones de reels y TikTok, anuncios UGC y estáticos para infoproductos, con especificación por diapositiva y prompts de imagen IA. Úsala para contenido o anuncios en redes.
---

# Creativos para TikTok, Instagram y Facebook

Objetivo: piezas que **detienen el scroll con algo relevante para el cliente** (identificación, curiosidad, aprendizaje o deseo de aplicar una solución) y llevan a una acción medible. No se garantiza viralidad ni se inventan métricas de rendimiento.

## Insumos
Público y lenguaje del cliente, producto y oferta, identidad visual (de `diseno-visual-mockups` si existe: colores, tipografías, tono) y objetivo de cada pieza (orgánico o anuncio; alcance o conversión). Si se usarán como anuncios, revisa también las políticas con `meta-ads-infoproductos`.

## Paquete inicial por infoproducto

Cuando el usuario pide "creativos para mi producto", entrega este paquete (plantillas en [references/paquete-inicial.md](references/paquete-inicial.md)):
- 20 ganchos (agrupados por ángulo: dolor, deseo, error común, curiosidad, demostración, historia, comparación)
- 10 ideas de carrusel
- 10 guiones de vídeo vertical
- 5 conceptos UGC
- 5 anuncios estáticos
- 5 ideas de demostración del producto
- Variantes de CTA (comentario, DM, enlace en la biografía, compra)

Entrégalo por partes si es largo (ganchos e ideas primero; desarrolla después las que elija el usuario).

## Carruseles

Estructura por defecto (adapta el número de diapositivas al concepto; 5-10 suele bastar):
1. Gancho → 2. Problema → 3. Identificación → 4. Error habitual → 5. Consecuencia → 6. Nueva perspectiva → 7. Solución → 8. Presentación del infoproducto → 9. Beneficios → 10. CTA.

Para cada diapositiva especifica: texto exacto, composición visual, elementos principales, paleta, tipografía, fotografía o imagen necesaria, prompt para generar la imagen con IA, formato, y objetivo psicológico y comercial. Plantilla de especificación en [references/brief-carrusel.md](references/brief-carrusel.md).

**Producir las imágenes:**

```bash
python scripts/generar_carrusel.py --ejemplo > carrusel.json   # estructura de partida
python scripts/generar_carrusel.py carrusel.json salida/ --png   # PNG 1080×1350 por diapositiva
```

El script genera diapositivas tipográficas limpias (portada, texto, lista, cita, CTA) con los colores de la marca, barra de progreso, usuario y numeración; admite una imagen de fondo por diapositiva. Revisa los PNG resultantes antes de entregarlos. Si el conector de Canva está disponible y el usuario prefiere editarlas allí, crea el diseño con él y entrega el enlace editable.

## Vídeo vertical, UGC y estáticos

Guiones con tiempos, texto en pantalla, planos y CTA en [references/guiones-video.md](references/guiones-video.md). Formatos y zonas seguras en [references/formatos.md](references/formatos.md).

## Reglas de calidad
- **El gancho decide**: claro, específico, relevante en 1-3 segundos o en la primera línea. Evita el clickbait que no se cumple; daña la retención y la confianza.
- **Una idea por pieza**, legible en móvil (texto grande, alto contraste, dentro de las zonas seguras).
- **Tendencias**: si usas un formato o sonido de tendencia, comprueba que siga vigente y en uso en el país objetivo, y que la licencia del sonido permite uso comercial en anuncios.
- **Anuncios**: sin antes/después de pérdida de peso, sin insinuar atributos personales, sin promesas de ingresos; los testimonios de UGC deben ser reales o presentarse claramente como interpretación de un actor ("recreación"), según la política de la plataforma y la normativa local.
- **Hipótesis**: cada anuncio lleva una frase de hipótesis ("el ángulo de 'plan B de 10 minutos' reduce la objeción de tiempo") y la métrica para juzgarla.

## Ejemplo de gancho con su desarrollo

Gancho: "Si tu rutina dura dos semanas, el problema no es tu fuerza de voluntad."
- Formato: carrusel 4:5, 7 diapositivas. Ángulo: identificación + nueva perspectiva.
- Diapositiva 1 (gancho): texto exacto anterior; fondo ciruela, titular Fraunces Black 118 px en blanco; objetivo: detener el scroll por identificación.
- Diapositiva 7 (CTA): "Comenta PLAN y te envío la rutina de 10 minutos"; objetivo: captar el lead (automatización comentario → DM con `marketing-organico`).
