# Flujo B: optimizar un infoproducto que ya se vende

## Contenido
- Paso 1. Recoger datos
- Paso 2. Economía unitaria
- Paso 3. Diagnóstico del embudo
- Paso 4. Hipótesis priorizadas
- Paso 5. Pruebas controladas
- Paso 6. Decidir y escalar
- Árbol de diagnóstico rápido

## Paso 1. Recoger datos (no opines antes)

Pide al usuario, para un periodo concreto (idealmente los últimos 30 días y el mes anterior para comparar):
- Ventas, ingresos brutos, reembolsos y contracargos.
- Precio por mercado, comisiones de plataforma y de pago, impuestos.
- Tasa de aceptación de order bump y upsell.
- Gasto en publicidad, impresiones, clics y compras atribuidas por campaña o anuncio.
- Sesiones de la landing, inicios de checkout y compras.
- Métricas de email (entregados, aperturas si son fiables, clics, ventas).
- Consumo del producto si existe (descargas, lecciones completadas) y preguntas de soporte frecuentes.
Marca como `[PENDIENTE]` lo que no exista y explica cómo medirlo a partir de ahora.

## Paso 2. Economía unitaria (`precios-rentabilidad`)

Calcula, con el script de la skill de precios: ingreso neto por cliente, margen de contribución, CPA de equilibrio y ROAS de equilibrio. Sin esto no se puede decidir si el problema es de tráfico, de conversión o de oferta.

## Paso 3. Diagnóstico del embudo (`analitica-optimizacion`)

Calcula la conversión de cada paso con `embudo.py` y localiza la mayor caída **relativa a la referencia del propio negocio** (periodos anteriores, otros anuncios o mercados). No compares con "benchmarks del sector" sin fuente.

## Paso 4. Hipótesis priorizadas

Para cada problema: evidencia observada, causa posible, solución, métrica de éxito y método de validación. Prioriza por ICE (impacto, confianza y esfuerzo, de 1 a 10).

## Paso 5. Pruebas controladas

- Un cambio importante por prueba, con tamaño de muestra suficiente (`ab_test.py` de `analitica-optimizacion`).
- Las pruebas de anuncios se diseñan con `meta-ads-infoproductos`, las de copy con `copywriting-conversion` y las de oferta con `ofertas-bonos`.

## Paso 6. Decidir y escalar

Escala solo si se cumple la puerta 16 (`puertas-aprobacion.md`). Si el margen es negativo, arregla primero la oferta, el precio o la conversión; más presupuesto multiplica las pérdidas.

## Árbol de diagnóstico rápido

- **CTR del anuncio bajo frente a otros anuncios propios** → ángulo o gancho débil → nuevos creativos.
- **CTR correcto pero conversión de la landing baja** → desajuste entre mensaje y página, propuesta poco clara, precio sin justificar, problemas en móvil → revisión de la landing.
- **Muchos inicios de checkout y pocas compras** → sorpresas en el precio final, métodos de pago locales ausentes, errores técnicos, desconfianza → revisión del checkout y de `venta-internacional`.
- **Ventas correctas pero muchos reembolsos** → la promesa no coincide con el producto, o el producto no se consume → revisar el copy y el onboarding.
- **Buen margen pero poco volumen** → más creativos, nuevos ángulos, orgánico, afiliados.
- **Valor medio de pedido bajo** → order bump y upsell relevantes (`ofertas-bonos`).
