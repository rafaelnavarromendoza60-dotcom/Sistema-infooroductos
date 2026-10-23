# Guía por plataforma

Las funciones y los planes de estas plataformas cambian. Antes de prometer una función, compruébala en su documentación o en el panel del usuario; si no puedes, márcala como `[PENDIENTE: verificar en la plataforma]`.

## Contenido
- Shopify
- Systeme.io
- Hotmart
- Página propia (HTML) enlazada a un checkout externo

## Shopify
- **Producto digital:** crea el producto sin envío ("no es un producto físico") y conecta una app de entrega digital (p. ej., Shopify Digital Downloads u otra de la App Store) para enviar el archivo tras el pago. Si hay un conector de Shopify disponible en la sesión, úsalo para comprobar el producto y su estado; no supongas.
- **Landing:** en temas Online Store 2.0, sube `shopify-seccion-landing.liquid` a `sections/` (Tienda online > Temas > Editar código), y añádela desde el editor de temas a una plantilla de página o de producto. El botón añade la variante al carrito y redirige a `/checkout`.
- **Checkout:** la personalización completa del checkout depende del plan; los cambios habituales (logotipo, colores, campos) se hacen en la configuración del checkout. Revisa el checkout en móvil.
- **Legal:** páginas de políticas en Configuración > Políticas (reembolso, privacidad, términos, contacto). Enlázalas en el pie.
- **Order bump y upsell:** normalmente mediante apps; comprueba compatibilidad con productos digitales.
- **Tienda headless:** si el usuario tiene un frontend propio (p. ej., Next.js con la Storefront API), la landing se construye en ese proyecto y el pago va al checkout de Shopify (`checkoutUrl` del carrito).

## Systeme.io
- **Estructura habitual del embudo:** página de captación o de venta → formulario de pedido → upsell (opcional) → página de gracias. Comprueba qué pasos permite el plan del usuario.
- **Insertar código propio:** el editor de páginas tiene un elemento de código HTML personalizado. Pega en él el HTML de las secciones (sin `<html>`, `<head>` ni `<body>`) y el CSS dentro de una etiqueta `<style>`. Prueba primero una sección pequeña, porque el CSS global del editor puede interferir; usa clases con prefijo propio (p. ej., `lp-`).
- **Pagos, productos y emails:** se configuran en el propio Systeme.io (conectar Stripe o PayPal, crear el producto en el formulario de pedido, automatizaciones de email). Verifica los métodos disponibles en el país del usuario.
- Alternativa: construir la página completa con el editor nativo usando el copy y la estructura entregados.

## Hotmart
- **Producto:** se da de alta en Hotmart con su página de producto, su precio y su checkout de Hotmart. El checkout gestiona pagos locales e impuestos según la configuración; revisa las condiciones vigentes.
- **Página de venta:** puede estar en una herramienta externa (HTML propio, Shopify, Systeme.io, WordPress) con los botones enlazados al checkout de Hotmart, o en las herramientas de páginas que ofrezca Hotmart si el plan del usuario las incluye.
- **Order bump, upsell y afiliados:** Hotmart dispone de funciones de embudo y de programa de afiliados; confirma en el panel cuáles están activas y sus condiciones antes de diseñarlas.
- **Garantía:** la plataforma aplica su propia política de reembolsos; la garantía que anuncies no puede contradecirla.

## Página propia enlazada a un checkout externo
- Hospeda el HTML (Netlify, Vercel, GitHub Pages, el hosting del usuario).
- Sustituye todos los `#ENLACE-DE-PAGO-PENDIENTE` por el enlace real del checkout (Stripe Payment Links, Hotmart, Shopify, etc.).
- Añade los píxeles y eventos de conversión siguiendo `meta-ads-infoproductos` y verifica con una compra de prueba.
