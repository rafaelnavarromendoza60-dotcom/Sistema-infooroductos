> Este documento es una copia de `plugins/infoproductos/skills/director-infoproductos/references/flujo-desde-cero.md`, la guía que usa la skill directora. Las puertas de aprobación detalladas están en `puertas-aprobacion.md` de la misma carpeta.

# Flujo A: crear un infoproducto desde cero

## Contenido
- Fase 1. Descubrir (etapas 1-3)
- Fase 2. Validar (etapa 4)
- Fase 3. Construir (etapas 5-10)
- Fase 4. Atraer (etapas 11-13)
- Fase 5. Aprender y crecer (etapas 14-17)
- Calendario orientativo

Cada etapa termina con una decisión (avanzar, iterar, descartar) registrada en la ficha. Las puertas detalladas están en `puertas-aprobacion.md`.

## Fase 1. Descubrir

**Etapa 1. Investigar nichos** (`investigacion-mercados`)
- Entrada: intereses, experiencia y recursos del usuario; mercados posibles.
- Haz: 5-8 nichos candidatos → señales de pago, competencia y riesgo regulatorio → informe con puntuaciones justificadas.
- Salida: `01-investigacion.md` con 2-3 nichos recomendados.

**Etapa 2. Detectar problemas rentables** (`investigacion-mercados`)
- Haz: minería de lenguaje del cliente (reseñas de 1-3 estrellas de la competencia, preguntas en foros y comentarios) → problemas concretos, deseos, frustraciones y objeciones con citas literales.
- Salida: mapa de problemas con frecuencia observada y ejemplos.

**Etapa 3. Seleccionar ideas** (`ideas-infoproductos`)
- Haz: convierte los 3 problemas principales en 10-15 ideas de producto en varios formatos → puntuación ponderada con `scripts/puntuar_ideas.py` → selecciona 1-2.
- Salida: `02-ideas.md` con ranking, evidencia y escalera de productos.

## Fase 2. Validar

**Etapa 4. Validar la demanda** (`validacion-demanda` + `precios-rentabilidad`)
- Haz: escribe los criterios de éxito y fracaso antes de nada → elige la prueba más barata que genere una señal de compromiso (lista de espera con precio visible, preventa honesta, venta de una versión mínima) → ejecuta → analiza con `scripts/analizar_prueba.py`.
- Antes de lanzar: estima con `precios-rentabilidad` si el precio previsto deja margen.
- Salida: `03-validacion.md` con decisión.

## Fase 3. Construir

**Etapa 5. Crear el producto** (`creacion-infoproductos`): investigación, índice estratégico, capítulos o lecciones completos, hojas de trabajo, revisión de datos y archivo final (PDF, plantilla o guiones).

**Etapa 6. Oferta y bonos** (`ofertas-bonos`): producto principal + bonos que eliminan obstáculos + order bump + upsell + garantía real. Comprueba la economía con `precios-rentabilidad`.

**Etapa 7. Identidad visual** (`diseno-visual-mockups`): paleta, tipografías, portada, mockups e imágenes de la landing.

**Etapa 8. Landing page** (`landing-pages-venta` + `copywriting-conversion`): estructura, copy completo, código o secciones para la plataforma elegida y avisos legales.

**Etapa 9. Pagos y entrega** (`landing-pages-venta` + `venta-internacional`): plataforma de pago, impuestos, entrega automática, email de confirmación y **compra de prueba**.

**Etapa 10. Email marketing** (`embudos-email`): lead magnet, bienvenida, secuencia de venta, onboarding y recuperación de carrito si la plataforma lo permite.

## Fase 4. Atraer

**Etapa 11. Contenido orgánico** (`marketing-organico`): posicionamiento, biografía, pilares y calendario de 30 días.

**Etapa 12. Creativos publicitarios** (`creativos-redes-sociales` + `copywriting-conversion`): ángulos, ganchos, UGC, estáticos y carruseles con hipótesis.

**Etapa 13. Campañas de prueba** (`meta-ads-infoproductos`): estructura, presupuesto de prueba, eventos de conversión verificados y plan de pruebas.

## Fase 5. Aprender y crecer

**Etapa 14. Analizar** (`analitica-optimizacion`): embudo completo, del contenido a la recompra, con el script `embudo.py`.

**Etapa 15. Optimizar**: hipótesis priorizadas por ICE (impacto, confianza, esfuerzo); un cambio importante a la vez y medido.

**Etapa 16. Escalar** (`meta-ads-infoproductos` + `precios-rentabilidad`): solo con margen de contribución positivo después de reembolsos; incrementos graduales.

**Etapa 17. Productos complementarios** (`ideas-infoproductos` + `ofertas-bonos`): siguiente necesidad de los clientes actuales → upsell, programa avanzado o continuidad.

## Calendario orientativo

Es un orden de magnitud para planificar, no una promesa. Depende del formato y de la disponibilidad del usuario.

| Semana | Trabajo |
|--------|---------|
| 1 | Etapas 1-3 |
| 2-3 | Etapa 4 (la validación necesita tiempo de exposición real) |
| 3-5 | Etapas 5-10 (un ebook es más rápido que un curso en vídeo) |
| 5-6 | Etapas 11-13 |
| 7 en adelante | Ciclo semanal de las etapas 14-16 |
