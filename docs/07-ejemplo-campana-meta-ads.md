# Ejemplo de campaña de Meta Ads: GLOWFIT en España

Generado con `meta-ads-infoproductos` y `precios-rentabilidad`. Las cifras de rendimiento son **supuestos de planificación**, no resultados: el ejemplo enseña cómo decidir con números antes de gastar.

## Contenido
- 1. Economía unitaria (antes de diseñar nada)
- 2. Decisión previa
- 3. Estrategia inicial
- 4. Estrategia creativa
- 5. Seguimiento
- 6. Reglas de decisión y análisis
- 7. Qué haría falta para escalar

## 1. Economía unitaria (antes de diseñar nada)
Supuestos en `ejemplos/supuestos-glowfit.json`; resultado completo en `ejemplos/resultado-rentabilidad-glowfit.md` (salida real del script `calcular_rentabilidad.py`).

| Concepto por cliente | Importe |
|----------------------|---------|
| Facturación (19 € + bump 7 € al 20 % + upsell 39 € al 5 %) | 22,35 € |
| Ingresos netos de IVA | 18,47 € |
| Margen de contribución tras reembolsos, comisiones y contracargos | **16,40 €** |
| CPA de equilibrio | 16,40 € |
| ROAS de equilibrio (sobre facturación con IVA / sobre ingresos sin IVA) | 1,36 / 1,13 |
| Conversión mínima de la landing con CPC de 0,55 € | 3,35 % |

Escenarios con un presupuesto de prueba de 600 € en 2 meses y 630 € de costes fijos:

| Escenario | CPA estimado | Beneficio por cliente | Clientes | Beneficio del periodo |
|-----------|--------------|-----------------------|----------|-----------------------|
| Conservador | 26,94 € | −11,73 € | 22 | −891 € |
| Base | 15,71 € | 0,68 € | 38 | −604 € |
| Optimista | 10,27 € | 6,81 € | 58 | −232 € |

## 2. Decisión previa
- Incluso en el escenario base, cada cliente de anuncios deja **menos de 1 €**, y harían falta 921 ventas para cubrir los costes fijos. **A 19 €, la publicidad sola no sostiene el producto.**
- Por tanto, la campaña de 600 € se plantea como **prueba de aprendizaje** (qué ángulo y qué conversión real), no como canal de beneficio, y en paralelo:
  1. subir el valor medio del pedido (crear el order bump y el upsell, o probar un pack a 27-29 €);
  2. reforzar el orgánico y el email (clientes sin coste de adquisición);
  3. revisar el precio con `validacion-demanda`.
- El usuario debe aceptar perder hasta 600 € para aprender. Si no, empezar por el orgánico.

## 3. Estrategia inicial
```
Campaña: GLOWFIT – Ventas – ES – Prueba de conceptos
  Objetivo: Ventas · Evento: Purchase (valor con IVA, EUR)
  Presupuesto: 20 €/día durante 30 días (≈ 1,6 × CPA objetivo de 12,30 €)
  Conjunto 1: España · mujeres y hombres ≥ 18 (sin restringir el sexo: lo decide el algoritmo con el creativo) · español · ubicaciones automáticas
    A1  Concepto A "Plan B de 10 minutos" (objeción de tiempo) – UGC
    A2  Concepto A – gancho alternativo
    B1  Concepto B "Por qué lo dejas cada jueves" (identificación) – carrusel
    C1  Concepto C "Así es el plan por dentro" (demostración) – vídeo de pantalla
    C2  Concepto C – estático con el mockup
```
- **CPA objetivo:** 12,30 € (75 % del de equilibrio).
- **Edad mínima de 18 años:** obligatoria si algún anuncio menciona la pérdida de peso; se aplica igualmente por prudencia.

## 4. Estrategia creativa
| Anuncio | Gancho | Texto principal (extracto) | Hipótesis | Métrica |
|---------|--------|----------------------------|-----------|---------|
| A1 (UGC) | "Mi rutina tenía un fallo: no contaba con mis días malos" | "...ahora, si no llego a los 30 minutos, hago el plan B de 10. La racha no se rompe." | La objeción de tiempo es la principal | CTR y CPA |
| A2 | "10 minutos también cuentan" | — | Gancho corto frente a historia | CTR frente a A1 |
| B1 (carrusel) | "Por qué lo dejas cada jueves (y no es fuerza de voluntad)" | 7 diapositivas → CTA a la landing | La identificación genera clics cualificados | Conversión de la landing |
| C1 (demo) | "Así es GLOWFIT por dentro" | Hojeo del PDF en el móvil | Ver el producto reduce la incertidumbre | Conversión de la landing |
| C2 (estático) | Mockup + "Entrena en casa sin dietas extremas" | Lista de qué incluye | Formato barato de producir | CPA |

**Revisión de políticas:** sin antes/después, sin insinuar atributos personales ("¿Tienes sobrepeso?" no; "Si quieres entrenar en casa..." sí), sin promesas de kilos, testimonios solo reales (el UGC lo graba una creadora real que ha usado el producto, con la colaboración declarada).

## 5. Seguimiento
- Píxel + API de conversiones (integración de Shopify) con deduplicación.
- Eventos: ViewContent (landing), InitiateCheckout, Purchase con valor y moneda.
- **Compra de prueba** antes de activar: Purchase llega una vez y con 19 € (o el total con bump).
- UTM en todos los anuncios.

## 6. Reglas de decisión y análisis
- Pausar un anuncio que gaste 33 € (2 × CPA de equilibrio) sin compras.
- No juzgar un concepto antes de 10 compras salvo que el CTR sea claramente inferior a la mediana de la cuenta.
- Análisis semanal con `metricas_ads.py --margen 16.40 --objetivo 12.30` sobre la exportación de Ads Manager, contrastando las compras atribuidas con los pedidos reales de Shopify.
- Tras 30 días: informe con el concepto ganador, la conversión real de la landing y la decisión (iterar la oferta, mantener la prueba o pausar).

## 7. Qué haría falta para escalar
Margen de contribución positivo tras reembolsos durante varias semanas con un CPA ≤ 12,30 €. Con los supuestos actuales, el camino más probable no es más presupuesto sino **más valor por pedido** (bump, upsell o pack). Repetir el cálculo de rentabilidad tras cada cambio de oferta.
