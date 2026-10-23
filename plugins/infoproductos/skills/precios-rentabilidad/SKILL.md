---
name: precios-rentabilidad
description: Calcula precio, márgenes, CPA y ROAS de equilibrio, punto de equilibrio y escenarios de un infoproducto con comisiones, impuestos y reembolsos. Úsala antes de fijar precio o invertir en anuncios.
---

# Precios, márgenes y rentabilidad

Objetivo: saber **cuánto deja de verdad cada cliente** y cuánto se puede pagar por conseguirlo. Sin esta cuenta no se puede decidir si un anuncio "funciona" ni si conviene escalar.

## Conceptos que nunca se mezclan

| Término | Qué es |
|---------|--------|
| Facturación | Lo que paga el cliente, impuestos incluidos |
| Ingresos netos | Facturación menos impuestos indirectos (IVA y similares) |
| Ingresos tras reembolsos | Ingresos netos menos reembolsos |
| Margen de contribución | Ingresos tras reembolsos menos comisiones, afiliados, contracargos y costes variables. Es el CPA máximo de equilibrio |
| Beneficio de contribución | Margen de contribución menos coste de adquisición (CPA) |
| Beneficio neto | Lo anterior menos costes fijos (y, fuera de este cálculo, impuesto sobre beneficios y tiempo del creador) |

Un ROAS alto puede esconder pérdidas si los reembolsos, las comisiones o el IVA no se han restado. Dilo siempre que el usuario hable de "ventas" como si fueran ganancias.

## Flujo de trabajo

```
Rentabilidad:
- [ ] 1. Reunir los datos imprescindibles
- [ ] 2. Crear el JSON de supuestos (marcando hipótesis)
- [ ] 3. Ejecutar el cálculo
- [ ] 4. Interpretar umbrales y escenarios
- [ ] 5. Recomendar precio y límites de inversión
```

**1. Datos imprescindibles.** Si faltan, pregunta por estos (y solo por estos) antes de calcular:
1. Precio por mercado y si incluye impuestos.
2. Plataforma de venta y de pago (para buscar sus comisiones **vigentes**; no las supongas de memoria).
3. Impuesto indirecto aplicable al cliente final (depende del país del comprador; ver `venta-internacional`).
4. Tasa de reembolso esperada o real.
5. Order bump y upsell (precio y aceptación), si existen.
6. Costes fijos (producción, herramientas, diseño) y periodo de análisis.
7. Para publicidad: CPC y conversión de la landing (reales o hipótesis), y presupuesto.
Si el usuario no tiene un dato, usa una hipótesis transparente, anótala en `supuestos` y muestra la sensibilidad en los escenarios.

**2-3. Calcular.**

```bash
python scripts/calcular_rentabilidad.py --plantilla > supuestos.json
# editar supuestos.json
python scripts/calcular_rentabilidad.py supuestos.json
```

El script devuelve: desglose por cliente, margen de contribución, CPA y ROAS de equilibrio (sobre facturación y sobre ingresos netos), conversión mínima necesaria con el CPC indicado, ventas para cubrir costes fijos, resultado del presupuesto y escenarios conservador, base y optimista. Puedes definir escenarios propios en el campo `escenarios` con valores absolutos, por ejemplo: `{"conservador": {"publicidad": {"cpc": 0.9, "tasa_conversion": 0.012, "presupuesto": 1500}}}`.

**4. Interpretar.** Explica en lenguaje llano:
- Cuánto deja cada cliente y qué partida pesa más.
- El CPA máximo y cuánto margen de seguridad hay frente al CPA estimado o real.
- Qué variable cambia más el resultado (normalmente la conversión, el precio o el valor medio del pedido).
- Qué ROAS de la plataforma equivale al equilibrio, según la base de valor que envíe el píxel (con o sin impuestos).

**5. Recomendar.** Usa [references/estrategia-precios.md](references/estrategia-precios.md) para el precio y la estructura de la oferta y [references/formulas.md](references/formulas.md) para cálculos manuales o verificaciones. Fija un **CPA objetivo** por debajo del de equilibrio (por defecto, un 20-30 % por debajo como margen de seguridad heurístico, ajustable) y un presupuesto de prueba que el usuario pueda permitirse perder.

## Ejemplo

Entrada: "Vendo un ebook a 27 € en España, con Stripe, y quiero gastar 1.500 € en Meta."
Respuesta esperada: crear `supuestos.json` con IVA del 21 % incluido, comisiones vigentes de Stripe verificadas o marcadas como `[PENDIENTE]`, reembolso del 5 % como `[HIPÓTESIS]`, CPC y conversión como hipótesis; ejecutar el script y concluir, por ejemplo: "Con una conversión del 2 % y un CPC de 0,60 € el CPA (30 €) supera el de equilibrio (23,70 €): perderías unos 6 € por cliente. Necesitas una conversión ≥ 2,53 %, subir el valor medio del pedido o bajar el CPC antes de invertir el presupuesto completo."
