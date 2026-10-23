---
name: embudos-email
description: Diseña embudos y secuencias de email para infoproductos (lead magnet, bienvenida, venta, carrito, onboarding, upsell, reactivación) con textos completos. Úsala para emails o automatizaciones.
---

# Embudos de venta y email marketing

Objetivo: convertir visitas en suscriptores, suscriptores en clientes y clientes en clientes satisfechos que repiten, con **emails útiles por sí mismos** y automatizaciones con reglas claras de entrada y salida.

## Insumos
Producto y oferta, público y lenguaje del cliente, lead magnet (o idea para crearlo), herramienta de email (Systeme.io, Mailchimp, Brevo, Klaviyo, Shopify Email, la de Hotmart, etc.) y qué integraciones tiene con la plataforma de pago. Si no conoces las funciones de la herramienta, diseña la lógica y señala qué hay que comprobar en ella.

## Flujo de trabajo

```
Embudo:
- [ ] 1. Mapear el embudo (captación → bienvenida → venta → postventa)
- [ ] 2. Diseñar el lead magnet y la página de registro
- [ ] 3. Escribir cada secuencia con su ficha completa
- [ ] 4. Definir segmentación, etiquetas y reglas de salida
- [ ] 5. Revisar consentimiento y requisitos legales
- [ ] 6. Plan de medición
```

**1. Mapa.** Dibuja el recorrido con las secuencias necesarias. Catálogo y tiempos por defecto en [references/secuencias.md](references/secuencias.md): captación con lead magnet, bienvenida, educativa, venta, recuperación de carrito (si la plataforma lo permite y hay consentimiento), seguimiento de leads, onboarding tras la compra, venta de complementarios, solicitud ética de feedback y reactivación.

**2. Lead magnet.** Un resultado pequeño, rápido y relacionado con el producto (checklist, mini guía, rutina, plantilla). Debe atraer al mismo público que comprará, no a cualquiera. La página de registro pide solo el email (y el nombre si se usa) y el consentimiento.

**3. Secuencias.** Para cada secuencia entrega: objetivo, número de emails, momento de envío, y por cada email: asunto (y alternativa A/B), preencabezado, **texto completo**, CTA, segmentación, condiciones de entrada y salida, y métrica a analizar. Usa la ficha de [references/secuencias.md](references/secuencias.md).

Reglas de redacción (más detalle en `copywriting-conversion` si está instalada):
- Un email, una idea, una acción principal.
- Valor primero: cada email debe merecer abrirse aunque no compren.
- Escribe como una persona, no como una marca: remitente con nombre, frases cortas.
- Urgencia solo si es real (cierre de un precio de lanzamiento que de verdad termina).

**4. Segmentación y salida.** Quien compra sale de la secuencia de venta y entra en onboarding. Quien no abre ni hace clic en un tiempo razonable pasa a reactivación y, si sigue inactivo, se depura de la lista (mejora la entregabilidad).

**5. Legal.** Revisa [references/legal-email.md](references/legal-email.md). Consentimiento claro, remitente identificable, baja en un clic, política de privacidad enlazada.

**6. Medición.** Mide sobre todo clics, conversiones e ingresos por email y por secuencia. Las tasas de apertura están infladas por funciones de privacidad de algunos clientes de correo (p. ej., Apple Mail): úsalas solo como tendencia.

## Ejemplo de ficha (resumen)

```markdown
## Secuencia de bienvenida (5 emails, días 0-6)
Objetivo: entregar el lead magnet, generar confianza y presentar el producto.
Entrada: registro confirmado en el formulario "rutina de 10 min" · Salida: compra (pasa a onboarding) o fin de secuencia (pasa a newsletter).
Email 1 (inmediato) · Asunto: "Tu rutina de 10 minutos (dentro)" · CTA: descargar · Métrica: clics en la descarga
Email 2 (día 1) · Asunto: "El error que hace que lo dejes en 2 semanas" · CTA: responder con su mayor dificultad · Métrica: respuestas
...
```
