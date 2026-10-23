---
name: venta-internacional
description: Adapta un infoproducto a España, LatAm, Brasil y EE. UU. (idioma, precios por poder adquisitivo, pagos locales, impuestos digitales, consumo, privacidad, anuncios). Úsala para vender fuera.
---

# Venta internacional

Objetivo: que cada mercado reciba un producto, un precio, unos medios de pago y unos mensajes que **parezcan hechos para él**, cumpliendo sus reglas fiscales y de consumo. Una traducción literal o un precio en una moneda ajena suelen convertir peor y pueden causar problemas legales.

## Flujo de trabajo

```
Internacionalización:
- [ ] 1. Priorizar mercados
- [ ] 2. Localizar producto y mensajes
- [ ] 3. Fijar precios por mercado
- [ ] 4. Elegir plataforma de cobro y métodos de pago
- [ ] 5. Revisar impuestos y facturación
- [ ] 6. Revisar consumo, privacidad y publicidad
- [ ] 7. Lista de cuestiones para revisión profesional
```

**1. Priorizar.** Criterios: tamaño del público objetivo, poder adquisitivo, competencia local, idioma (Brasil exige portugués nativo), facilidad de cobro y de cumplimiento. Empieza por 1-2 mercados y amplía con datos.

**2. Localizar** (no traducir): variante del idioma y trato (tú, usted, vos, você), vocabulario, ejemplos culturales, alimentos y medidas, fechas, moneda y referencias. Guía en [references/localizacion.md](references/localizacion.md).

**3. Precios.** Parte de los comparables locales (cítalos) y del poder adquisitivo; redondea a precios habituales en cada moneda; comprueba el margen de cada mercado con `precios-rentabilidad` (impuestos y comisiones cambian por país).

**4. Cobro.** El método de pago local puede decidir la venta (Pix en Brasil, OXXO y meses sin intereses en México, PSE en Colombia, Yape o Plin en Perú, Mercado Pago en Argentina). Verifica qué métodos ofrece la plataforma elegida en cada país.

**5-6. Impuestos, consumo, privacidad y publicidad.** Recorre por mercado la lista de [references/checklist-paises.md](references/checklist-paises.md). Verifica cada requisito en fuentes oficiales vigentes y márcalo `[VERIFICADO: fuente, fecha]` o `[PENDIENTE: revisión profesional]`.

**7. Revisión profesional.** Entrega siempre una lista concreta de preguntas para un asesor fiscal y legal (registros de impuestos, facturación, textos legales), en lugar de dar por resueltas cuestiones que dependen de la situación del vendedor.

## Plataformas que actúan como revendedor
Algunas plataformas venden en nombre propio (*merchant of record*) y asumen la recaudación de impuestos indirectos y parte del cumplimiento. Si el usuario usa una, comprueba en sus condiciones vigentes qué asume exactamente y qué sigue siendo responsabilidad del vendedor (impuesto sobre la renta, facturación hacia la plataforma).

## Entregable
Tabla por mercado: idioma y variante, precio y moneda, métodos de pago, plataforma, impuestos aplicables (con estado de verificación), requisitos de consumo y privacidad, restricciones publicitarias, adaptaciones del producto y del copy, y pendientes de revisión profesional.

## Ejemplo (extracto)

| Mercado | Idioma | Precio | Pagos | Impuestos | Pendientes |
|---------|--------|--------|-------|-----------|------------|
| España | es-ES, tú | 19 € IVA incl. | Tarjeta, PayPal | IVA de la UE en B2C digital, régimen de ventanilla única (OSS) si se vende a otros países de la UE [VERIFICADO: fuente] | Alta censal y facturación con asesor |
| México | es-MX, tú | [comparables locales] MXN | Tarjeta, OXXO | IVA a servicios digitales de proveedores extranjeros [PENDIENTE: confirmar si la plataforma lo recauda] | Registro ante el SAT si aplica |
