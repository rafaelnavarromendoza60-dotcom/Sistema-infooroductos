---
name: landing-pages-venta
description: Construye páginas de venta de alta conversión para infoproductos en HTML/CSS, secciones Liquid de Shopify, Systeme.io o Hotmart, con avisos legales. Úsala para crear o revisar una landing.
---

# Constructora de landing pages y webs de venta

Objetivo: una página **rápida, accesible, clara y coherente con la oferta**, que en móvil deja claro en segundos qué es el producto, para quién es, qué incluye, cuánto cuesta y cómo se compra.

## Insumos
Oferta completa (`ofertas-bonos`), copy (`copywriting-conversion` o redactado aquí con sus mismas reglas), identidad visual (`diseno-visual-mockups`), plataforma de venta y enlace de pago real, mercados (para impuestos y avisos con `venta-internacional`).

## Flujo de trabajo

```
Landing:
- [ ] 1. Confirmar plataforma, objetivo de la página y enlace de pago
- [ ] 2. Definir la estructura
- [ ] 3. Redactar el contenido completo
- [ ] 4. Generar el código o la configuración para la plataforma
- [ ] 5. Revisar con el checklist de conversión, accesibilidad y legal
- [ ] 6. Probar: compra de prueba y revisión en móvil
```

**1. Plataforma y objetivo.** Página de venta, de captación (lead magnet), de validación (lista de espera) o de gracias. El objetivo determina el CTA y lo que se mide.

**2. Estructura** por defecto para venta: hero (titular, subtítulo, beneficios, precio, CTA, microcopy de confianza) → problema e identificación → método → beneficios → qué incluye → bonos → para quién es y para quién no → evidencias auténticas → precio y condiciones → garantía (si existe) → FAQ → CTA final → avisos legales. Para captación: hero con el lead magnet, 3 beneficios, formulario con consentimiento y una prueba de autoridad.

**3. Contenido.** Entrega el texto completo, no huecos genéricos. Marca solo lo que de verdad depende del usuario: `[TESTIMONIO REAL PENDIENTE]`, `[ENLACE DE PAGO]`, `[DATOS LEGALES]`.

**4. Código.**
- **HTML y CSS independiente:** parte de `assets/landing-infoproducto.html` (responsive, accesible, sin dependencias, con barra de compra fija en móvil). Sustituye las variables de `:root` por las de la marca.
- **Shopify:** usa `assets/shopify-seccion-landing.liquid`, una sección de Online Store 2.0 con bloques (beneficios, qué incluye, testimonios, FAQ) que lleva al checkout con el producto elegido.
- **Systeme.io y Hotmart:** sigue [references/plataformas.md](references/plataformas.md).

**Nunca inventes enlaces de pago, integraciones ni funciones.** Usa marcadores como `#ENLACE-DE-PAGO-PENDIENTE` y dilo en la entrega. Si una función de la plataforma no está verificada, indica cómo comprobarla.

**5. Revisión.** Aplica [references/checklist.md](references/checklist.md) (conversión, velocidad, accesibilidad y requisitos legales).

**6. Prueba.** Pide al usuario (o hazlo si tienes acceso real) una compra de prueba: cobro, email de confirmación, acceso al producto, recibo y evento de conversión registrado. Revisa la página en un móvil real o con emulación de 390 px de ancho.

## Entrega
1. Archivo(s) listo(s) para usar y dónde pegarlos.
2. Lista de marcadores pendientes de sustituir.
3. Variantes A/B sugeridas (titular, CTA, orden de secciones) con su hipótesis.
4. Qué medir: tasa de clic en el CTA, inicio de checkout y compra.

## Ejemplo

Entrada: "Hazme la página de venta del ebook en mi Shopify."
Respuesta esperada: confirmar el producto en Shopify y el tema (Online Store 2.0) → redactar el copy completo → entregar la sección Liquid y los textos para cada bloque → explicar cómo añadirla en el editor de temas → recordar la casilla de consentimiento para contenido digital (UE) y las páginas legales → proponer la compra de prueba.
