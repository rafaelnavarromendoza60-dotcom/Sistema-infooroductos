# Sistema de skills para infoproductos

Sistema modular de **17 Claude Skills en español** para pasar de una oportunidad de mercado a un infoproducto comercializable y hacerlo crecer en España, Latinoamérica y Estados Unidos: investigación, ideas, validación, creación del producto, oferta, copy, creativos, diseño, landing, email, orgánico, Meta Ads, precios, venta internacional, afiliados y analítica, coordinadas por una skill directora.

Principio del sistema: **evidencia antes que entusiasmo**. Cada skill etiqueta sus datos como `[VERIFICADO]`, `[ESTIMACIÓN]`, `[HIPÓTESIS]` o `[PENDIENTE]`, no inventa cifras, testimonios ni resultados, y no avanza de etapa sin cumplir criterios de aprobación.

## Las 17 skills

| Skill | Para qué |
|-------|----------|
| `director-infoproductos` | Coordina el ciclo completo, decide la siguiente etapa y aplica las puertas de aprobación y el control de calidad |
| `investigacion-mercados` | Nichos y problemas por los que se paga, con fuentes, puntuaciones y riesgos |
| `ideas-infoproductos` | Convierte problemas en ideas de producto y las puntúa (script) |
| `validacion-demanda` | Pruebas de demanda con criterios prerregistrados y análisis estadístico (script) |
| `creacion-infoproductos` | Ebooks, guías, recetarios y cursos completos; PDF editorial (plantilla + script) |
| `ofertas-bonos` | Oferta, bonos, order bump, upsell, garantía y continuidad |
| `copywriting-conversion` | Copy de respuesta directa con variantes A/B y revisión de cumplimiento |
| `creativos-redes-sociales` | Ganchos, carruseles (generador de PNG), guiones, UGC y estáticos |
| `diseno-visual-mockups` | Identidad visual, portadas, mockups 3D, contraste WCAG (plantillas + scripts) |
| `landing-pages-venta` | Página de venta HTML/CSS, sección Liquid de Shopify, Systeme.io y Hotmart |
| `embudos-email` | Lead magnet y secuencias completas con consentimiento |
| `marketing-organico` | Posicionamiento, bio, pilares, calendario de 30 días, captación de leads |
| `meta-ads-infoproductos` | Estructura, seguimiento, creativos, análisis frente al margen y escalado (script) |
| `precios-rentabilidad` | Margen, CPA y ROAS de equilibrio, punto de equilibrio y escenarios (script) |
| `venta-internacional` | Localización, precios, pagos, impuestos y consumo por país |
| `afiliados-distribucion` | Programa de afiliados, comisión según margen, kit y seguimiento |
| `analitica-optimizacion` | Embudo, hipótesis priorizadas por ICE y tests A/B (scripts) |

## Estructura

```
sistema-infoproductos/
├── .claude-plugin/marketplace.json       Marketplace para Claude Code
├── plugins/infoproductos/
│   ├── .claude-plugin/plugin.json        Plugin con las 17 skills
│   └── skills/<skill>/SKILL.md           Cada skill: SKILL.md + references/ + scripts/ + assets/
├── docs/                                 Manuales, flujos, ejemplos y control de calidad
├── ejemplos/                             Archivos de los ejemplos (página de venta, supuestos, resultados)
├── herramientas/                         Validador y empaquetador
└── dist/                                 ZIP por skill (claude.ai) y ZIP completo
```

## Empieza aquí

1. [Instalación](docs/01-instalacion.md) en claude.ai, Claude Code o la API.
2. [Manual de uso](docs/02-manual-de-uso.md), con ejemplos de instrucciones para cada skill.
3. Flujos: [crear un infoproducto desde cero](docs/03-flujo-desde-cero.md) · [optimizar uno existente](docs/04-flujo-optimizacion.md).
4. Ejemplos: [investigación de mercado](docs/05-ejemplo-investigacion-mercado.md) · [oferta y página de venta](docs/06-ejemplo-oferta-y-pagina-de-venta.md) · [campaña de Meta Ads](docs/07-ejemplo-campana-meta-ads.md).
5. [Sistema de control de calidad](docs/08-control-de-calidad.md) y [pruebas de activación](docs/09-pruebas-de-activacion.md).

## Requisitos

- Una cuenta de Claude con skills: claude.ai (planes Pro, Max, Team o Enterprise con ejecución de código activada), Claude Code o la API de Claude.
- Python 3 para los scripts (solo biblioteca estándar). Para generar PDF y PNG: WeasyPrint, Playwright o Chromium/Chrome; Pillow para recortar las imágenes.
- Opcional: conectores (Canva, Shopify, herramientas de email) si quieres que Claude actúe directamente sobre ellos. Las skills **no conectan cuentas ni publican nada por sí solas**.

## Aviso

Las skills ayudan a investigar, crear y decidir, pero no garantizan ventas ni resultados. Los contenidos legales, fiscales, médicos y financieros que generen son orientativos y deben revisarlos profesionales cualificados.
