# Optimización y escalado

## Diagnóstico por síntoma
| Síntoma (frente al histórico propio) | Problema probable | Acción |
|--------------------------------------|-------------------|--------|
| CPM muy alto | Público pequeño, competencia o mala calidad percibida | Ampliar la segmentación, revisar creativos y políticas |
| CTR bajo | Gancho o ángulo que no conecta | Nuevos ganchos y conceptos |
| CTR bueno, conversión de landing baja | Desajuste anuncio-landing, propuesta poco clara, móvil | Revisar la landing (`landing-pages-venta`) |
| Muchos InitiateCheckout, pocas compras | Precio final sorpresa, métodos de pago, errores técnicos | Revisar el checkout y los pagos locales |
| CPA bueno, reembolsos altos | La promesa no coincide con el producto | Ajustar el copy, mejorar el onboarding |
| CPA sube con la frecuencia | Fatiga creativa | Variantes del ganador, nuevos conceptos |
| ROAS > 1 pero beneficio negativo | Margen sin descontar comisiones, IVA o reembolsos | Recalcular con `precios-rentabilidad` |

## Reglas de decisión (heurísticas de partida, ajustables)
- **Pausar** un anuncio que gasta 2-3 × el CPA de equilibrio sin compras.
- **Mantener en observación** mientras no tenga compras suficientes para estabilizar el CPA (p. ej., 10).
- **Candidato a escalar:** CPA ≤ objetivo con compras suficientes, durante varios días, y reembolsos estables.
- **No tocar** a diario los conjuntos que funcionan; cada cambio grande reinicia parte del aprendizaje.

## Escalado
1. Confirma el margen de contribución positivo tras reembolsos en la ventana analizada.
2. Sube el presupuesto de forma gradual (heurística habitual: incrementos de ~20-30 % cada pocos días) y vigila el CPA en cada paso.
3. Escalado horizontal: lleva los anuncios ganadores a nuevos países o idiomas (con `venta-internacional`) o a nuevas ubicaciones y formatos.
4. Alimenta el escalado con creativos nuevos del concepto ganador.
5. Si el CPA supera el objetivo de forma sostenida tras escalar, vuelve al último presupuesto rentable.

## Informe semanal
```markdown
# Meta Ads — semana [n]
Gasto: · Compras: · Reembolsos: · CPA: · ROAS: · Beneficio de contribución:
Mejores anuncios: [y por qué]
Problemas detectados: [síntoma → causa probable → acción]
Pruebas en curso: [hipótesis, estado]
Decisión: mantener / optimizar / escalar / pausar — [motivo]
```
