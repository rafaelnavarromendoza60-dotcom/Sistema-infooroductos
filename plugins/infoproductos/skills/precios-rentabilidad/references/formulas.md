# Fórmulas de referencia

Para un artículo con precio P y tipo de impuesto t:
- Si P incluye impuestos: neto = P / (1 + t); impuesto = P − neto.
- Si no: neto = P; cobrado = P × (1 + t).

Por cliente (sumando producto principal + bump × aceptación + upsell × aceptación):
- Comisiones = cobrado × (% pago + % plataforma) + comisiones fijas por transacción.
- Reembolsos = tasa de reembolso × neto.
- Afiliados = (1 − tasa de reembolso) × proporción de ventas con afiliado × % comisión × neto. (Comprueba sobre qué base calcula la comisión la plataforma real.)
- Contracargos = tasa de contracargo × (neto + coste por contracargo).
- **Margen de contribución (MC)** = neto − reembolsos − comisiones − afiliados − contracargos − costes variables.

Umbrales:
- **CPA de equilibrio** = MC.
- **ROAS de equilibrio** = valor atribuido por cliente / MC (usa la misma base que el píxel: con o sin impuestos).
- **Conversión necesaria** = CPC / MC.
- **CPA real** = gasto / compras; **CPA estimado** = CPC / conversión.
- **Beneficio por cliente** = MC − CPA.
- **Ventas para cubrir fijos** = costes fijos / beneficio por cliente (solo si este es positivo).
- **Valor medio del pedido (AOV)** = facturación / pedidos.

Escenarios: varía solo los supuestos inciertos (conversión, CPC, reembolsos, aceptación de bump y upsell) y mantén fijos los conocidos (precio, impuestos, comisiones).

Valor del cliente en el tiempo (si hay recompra o continuidad): suma del MC esperado de las compras futuras, descontando la probabilidad de que ocurran. No lo uses para justificar un CPA más alto hasta haber observado la recompra real.
