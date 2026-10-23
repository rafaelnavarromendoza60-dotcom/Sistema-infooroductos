# Estructura de campañas y seguimiento

Los nombres de los objetivos, de los tipos de campaña automatizada y de las opciones cambian con frecuencia en Ads Manager. Usa el nombre vigente equivalente y verifica las opciones en la cuenta del usuario.

## Contenido
- Estructura recomendada para empezar
- Presupuesto
- Segmentación
- Seguimiento y eventos
- Plan de pruebas

## Estructura recomendada para empezar
```
Campaña: [Producto] – Ventas – [País] – Prueba de conceptos
  Objetivo: Ventas · Evento: Purchase
  Conjunto 1: Amplio [país, idioma, edad mínima si aplica] · Ubicaciones automáticas
    Anuncio A1: Concepto A (ángulo dolor) – gancho 1
    Anuncio A2: Concepto A – gancho 2
    Anuncio B1: Concepto B (ángulo deseo/resultado) – gancho 1
    Anuncio C1: Concepto C (demostración del producto) – gancho 1
```
Cuando haya ganadores claros: campaña de escalado con los mejores anuncios (o la campaña automatizada de ventas que ofrezca la cuenta) y una campaña de pruebas aparte para nuevos conceptos.

## Presupuesto
- Presupuesto de prueba = cantidad que el usuario acepta perder para aprender. Anótalo antes de empezar.
- Por conjunto de prueba, heurística de partida: presupuesto diario ≥ 1-2 × CPA objetivo, para que entren conversiones con regularidad.
- Duración mínima de evaluación: deja que cada concepto acumule gasto suficiente (p. ej., 2-3 × el CPA objetivo) antes de juzgarlo, salvo que el CTR o el CPC indiquen un problema evidente.
- Evita cambios grandes y frecuentes en los conjuntos en aprendizaje.

## Segmentación
- Por defecto, amplia: país o países + idioma + edad mínima legal o de política. Los algoritmos de entrega suelen encontrar a los compradores con creativos claros.
- Intereses o públicos similares solo como prueba explícita, con hipótesis.
- Excluir compradores (lista de clientes o evento Purchase) de las campañas de captación.
- Remarketing (visitantes, interacciones) con presupuesto pequeño y mensajes de objeción y garantía.

## Seguimiento y eventos
| Evento | Dónde | Parámetros |
|--------|-------|-----------|
| PageView | Todas las páginas | — |
| ViewContent | Landing o página de producto | content_name, value, currency |
| Lead | Gracias del lead magnet | — |
| InitiateCheckout | Inicio del pago | value, currency |
| Purchase | Confirmación de compra | value, currency, order_id |

- Instala el píxel y la API de conversiones (directamente o mediante la integración de la plataforma: Shopify, Hotmart, Systeme.io, etc.) con deduplicación por event_id.
- Verifica el dominio en el Business Manager y configura los eventos según exija la cuenta.
- **Compra de prueba** con la herramienta de eventos de prueba: comprueba que Purchase llega una sola vez y con el valor y la moneda correctos.
- Decide qué valor envía Purchase (con o sin impuestos) y calcula el ROAS de equilibrio con esa misma base.
- UTM en todos los anuncios para contrastar con la analítica propia.

## Plan de pruebas
| Prueba | Variable | Hipótesis | Presupuesto máx. | Criterio de decisión |
|--------|----------|-----------|------------------|----------------------|
| 1 | Concepto (ángulo) | | | CPA ≤ objetivo con ≥ N compras |
| 2 | Gancho dentro del concepto ganador | | | CTR y CPA |
| 3 | Landing (titular o precio visible) | | | Conversión de la landing |
| 4 | Oferta (bump/bono) | | | Valor medio del pedido y CPA |
