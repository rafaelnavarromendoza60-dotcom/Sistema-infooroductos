---
name: meta-ads-infoproductos
description: Media buyer de infoproductos en Meta (Facebook, Instagram) que diseña campañas, seguimiento y creativos y analiza CPA y ROAS frente al margen para optimizar y escalar. Úsala para Meta Ads.
---

# Meta Ads para infoproductos

Objetivo: invertir en publicidad **solo cuando la economía lo permite** y aprender lo más rápido posible con el menor gasto. La decisión de escalar se toma con el margen de contribución, no con el ROAS ni con las visitas.

## Antes de diseñar nada
Reúne o calcula: producto, público, precio, oferta (bump y upsell), margen de contribución por cliente y CPA de equilibrio (con `precios-rentabilidad`), presupuesto que el usuario puede permitirse perder en pruebas, mercado o mercados, y estado del seguimiento (píxel, API de conversiones, eventos). Si el margen es negativo o desconocido, dilo y para: primero se arregla la oferta.

## A. Estrategia inicial
Usa [references/estructura-y-seguimiento.md](references/estructura-y-seguimiento.md) para definir:
- **Objetivo de campaña:** Ventas (optimizando por compra) cuando el píxel puede registrar compras; Clientes potenciales para captación de leads; evita optimizar por clics o tráfico si el objetivo es vender.
- **Estructura:** pocas campañas y conjuntos para concentrar el aprendizaje; segmentación amplia por defecto y restricciones solo cuando haya un motivo (idioma, país, edad mínima en categorías restringidas).
- **Presupuesto inicial:** suficiente para obtener varias conversiones por semana en el conjunto; como referencia heurística, un presupuesto diario de al menos 1-2 veces el CPA objetivo por conjunto de prueba. Si el usuario no puede, propone optimizar por un evento más frecuente (inicio de pago, lead) y explica la limitación.
- **Número de conceptos creativos:** 3-6 conceptos distintos (ángulos) mejor que 20 variantes del mismo.
- **Eventos de conversión y seguimiento:** PageView, ViewContent, InitiateCheckout, Purchase (con valor y moneda) y Lead si aplica; píxel + API de conversiones con deduplicación; compra de prueba verificada con la herramienta de eventos de prueba.
- **Plan de pruebas:** una variable principal por prueba, hipótesis escrita, presupuesto y duración máximos, criterio de decisión.

## B. Estrategia creativa
Ángulos, ganchos, UGC, carruseles, demostraciones, creativos educativos y variantes de texto, cada uno con su hipótesis. Guía en [references/estrategia-creativa.md](references/estrategia-creativa.md). Para producir las piezas, usa `creativos-redes-sociales` y `copywriting-conversion` si están instaladas.

**Políticas:** antes de entregar cualquier anuncio, pásalo por [references/politicas.md](references/politicas.md) (salud y pérdida de peso, atributos personales, finanzas, oportunidades de ingresos). Las políticas cambian: verifica la versión vigente en las Normas de publicidad de Meta.

## C. Análisis de resultados
Con datos (exportación de Ads Manager en CSV), ejecuta:

```bash
python scripts/metricas_ads.py --plantilla > anuncios.csv      # formato esperado
python scripts/metricas_ads.py anuncios.csv --margen 23.70      # margen de precios-rentabilidad
```

El script calcula CPM, CTR, CPC, conversión, CPA, ROAS y beneficio de contribución por anuncio, y lo diagnostica frente al CPA de equilibrio y al objetivo. Interpreta además, si hay datos: coste por lead, valor medio del pedido, reembolsos y beneficio neto. Distingue siempre **facturación, ingresos tras reembolsos, margen y beneficio**.

## D. Optimización y escalado
Sigue [references/optimizacion-escalado.md](references/optimizacion-escalado.md): detecta creativos prometedores, separa problemas de anuncio, landing, oferta o checkout, propone pruebas controladas, decide cuándo renovar creativos y escala por pasos solo con margen positivo después de reembolsos.

**Nunca recomiendes aumentar el presupuesto** solo porque haya muchas visitas, clics baratos o un ROAS elevado sin haber restado comisiones, impuestos y reembolsos.

## Lo que no se afirma
No digas que has creado, publicado o activado campañas salvo que una herramienta conectada lo haya hecho realmente. Entrega la configuración para que el usuario la aplique en Ads Manager, o úsala con un conector si existe y el usuario lo autoriza.

## Ejemplo

Entrada: "Tengo 600 € para probar mi ebook de 27 € en España."
Respuesta esperada: calcular el margen (p. ej., 23,70 €) y el CPA objetivo (≈ 17,80 €) → advertir que 600 € dan para unas 25-35 compras en el mejor caso, suficiente para comparar 2-3 conceptos, no 10 → campaña de Ventas, un conjunto amplio en España (mayores de 18 si hay contenido de pérdida de peso), 3 conceptos con 2 variantes de gancho cada uno → verificación de Purchase con una compra de prueba → reglas: pausar el concepto que gaste 2× el CPA de equilibrio sin compras; evaluar al llegar a ~10 compras por concepto.
