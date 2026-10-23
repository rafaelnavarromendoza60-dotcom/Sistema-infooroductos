# Ejemplo de oferta y página de venta: ebook GLOWFIT

Generado con las skills `ofertas-bonos`, `copywriting-conversion`, `diseno-visual-mockups` y `landing-pages-venta`. Archivos:
- `ejemplos/pagina-venta-glowfit.html`: página de venta completa (plantilla de la skill rellenada).
- `ejemplos/portada-glowfit.png` y `ejemplos/mockup.png`: portada 1600×2560 y mockup 3D generados con los scripts de diseño.

Los huecos que siguen marcados (enlace de pago, testimonios, datos de la autora y datos legales del vendedor) necesitan **información real**: el sistema no los inventa.

## 1. Ficha de oferta

### Núcleo
- **Público objetivo:** mujeres de 20 a 45 años que quieren entrenar con constancia, sobre todo las que empiezan o retoman tras un parón (la investigación del documento 05 sugiere probar un ángulo específico para 35-44).
- **Problema principal:** "Empiezo con ganas y lo dejo a las dos semanas"; dietas que dejan con hambre; no saber qué hacer en el gimnasio.
- **Resultado esperado (realista):** completar un plan de 4 semanas con 3-5 sesiones semanales y salir con una rutina y una forma de comer que pueda mantener. Sin promesas de kilos.
- **Mecanismo:** método GLOW (entrenar con lo que tienes, comer con el plato GLOWFIT y sostener la racha con un plan B de 10 minutos).
- **Entregables:** ebook en PDF (6 módulos) + plan de 4 semanas + bonos.
- **Diferenciadores:** plan B para los días malos; versión en casa y en el gimnasio de cada rutina; capítulo sobre el ciclo menstrual (con revisión profesional pendiente).
- **Precio:** 19 € IVA incluido `[EJEMPLO: confirmar el precio real]`.
- **Garantía:** 30 días, solo si coincide con la política de reembolsos publicada.
- **CTA:** "Quiero mi plan" · acceso inmediato.

### Componentes
| Elemento | Obstáculo que resuelve | Cómo ayuda a aplicar | Formato | Valor mostrado |
|----------|------------------------|----------------------|---------|----------------|
| Ebook GLOWFIT (6 módulos) | "No sé por dónde empezar" | Método completo y ordenado | PDF A5 | No se muestra valor monetario: se describe el contenido |
| Plan de 4 semanas | "No sé qué toca hoy" | Acción diaria concreta | Dentro del ebook | — |
| Bono: calendario imprimible | Falta de constancia | Visible en la nevera, marcar días | PDF A4 | — |
| Bono: 5 rutinas exprés de 10 min | "Hoy no tengo tiempo" | Evita romper la racha | PDF | — |
| Bono: lista de la compra semanal | Fricción para comer bien | Compra en 1 vez a la semana | PDF | — |

> Decisión de cumplimiento: la versión anterior de la tienda mostraba un "valor total de 73 €" y un precio tachado de 39 €. Como no hay constancia de que esos precios se hayan aplicado de verdad, esta oferta **no** muestra valores monetarios ni precio tachado. Si el ebook se vendió realmente a 39 € (y en la UE fue el precio más bajo de los 30 días anteriores), se puede recuperar el tachado.

### Complementos
| Tipo | Producto | Precio | Por qué en ese momento |
|------|----------|--------|------------------------|
| Order bump | Videoteca de técnica (20 ejercicios) | 7 € `[POR CREAR]` | Resuelve "¿lo estaré haciendo bien?" justo al comprar |
| Upsell | Programa de 12 semanas con progresión | 39 € `[POR CREAR]` | Siguiente paso natural tras el plan de 4 semanas |
| Post-compra (semana 3) | Revisión grupal de técnica | `[A DEFINIR]` | Cuando ya hay hábito y surgen dudas |

### Objeciones y respuestas
| Objeción | Respuesta en la oferta |
|----------|------------------------|
| "No tengo tiempo" | Sesiones de 30 min + plan B de 10 min |
| "Ya lo intenté y lo dejé" | El mecanismo está diseñado para los días malos |
| "No quiero ir al gimnasio" | Versión en casa de todas las rutinas |
| "¿Y si no me sirve?" | Garantía de 30 días (si coincide con la política) |
| "Otro PDF que no voy a leer" | Plan de 4 semanas día a día y calendario imprimible |

## 2. Variantes A/B propuestas
| Elemento | A | B | Hipótesis |
|----------|---|---|-----------|
| Titular | "Tu cuerpo no necesita otra dieta. Necesita un plan que puedas mantener." | "Vuelve a entrenar en casa, 30 minutos al día, sin abandonar a la segunda semana." | B convertirá mejor en tráfico frío de 35-44 (ángulo "retomar" de la investigación) |
| CTA | "Quiero mi plan →" | "Empezar hoy · acceso inmediato" | La primera persona aumenta el clic |
| Bono destacado | Calendario imprimible | Rutinas exprés de 10 min | La objeción de tiempo pesa más que la de organización |

## 3. Página de venta
Abre `ejemplos/pagina-venta-glowfit.html` en el navegador (junto a `mockup.png`). Estructura: hero con precio y CTA visibles en móvil → problema e identificación → método → qué incluye → para quién es y para quién no → evidencias (huecos para testimonios reales y datos de la autora) → oferta → garantía → FAQ → CTA final → avisos legales → barra de compra fija en móvil.

Antes de publicar:
- [ ] Sustituir todos los `#ENLACE-DE-PAGO-PENDIENTE` por el enlace real del checkout (por ejemplo, el de Shopify).
- [ ] Testimonios reales con permiso, o eliminar la tarjeta.
- [ ] Datos de la autora verificables.
- [ ] Datos legales del vendedor (en España, nombre o razón social, NIF, domicilio y email) y enlaces a las políticas.
- [ ] Confirmar el precio, la garantía y los métodos de pago.
- [ ] Compra de prueba completa.

## 4. Nota sobre accesibilidad
El comprobador de contraste de `diseno-visual-mockups` detectó que el coral original (`#FF5E62`) con texto blanco da 2,99:1, por debajo del mínimo WCAG. La página usa `#D63A48` en los botones (4,61:1). Conviene aplicar el mismo cambio a la tienda GLOWFIT existente.
