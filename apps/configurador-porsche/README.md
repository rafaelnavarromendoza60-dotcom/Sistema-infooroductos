# Atelier · Configurador visual (gama Porsche)

App para el concesionario: el cliente elige **modelo, color de carrocería, llantas (diseño, medida y acabado), pinzas de freno, interior y costuras** y ve al momento cómo queda su coche antes de comprarlo.

## Cómo abrirla

No necesita instalación ni internet: abre `index.html` en el navegador (ordenador, tablet o móvil).
Para publicarla, sube la carpeta tal cual a cualquier hosting estático (Netlify, Vercel, GitHub Pages, Shopify Files…).

## Qué incluye

| Sección | Qué hace |
|---|---|
| **Modelos** | 53 versiones de la gama actual (718, 911, Taycan, Panamera, Macan, Cayenne) con potencia, 0-100, velocidad máxima, motor y precio orientativo. Filtros por familia y propulsión y buscador. |
| **Configurar** | Maqueta de la carrocería real del modelo (coupé, cabriolet con capota, Targa, alerón GT3 / RS, Sport/Cross Turismo, SUV, SUV Coupé). 4 vistas: lateral, frontal, interior y primer plano de la llanta. 3 ambientes: estudio, exterior y noche. |
| **Pintura** | 33 colores en 4 niveles: uni, metalizados, especiales y Paint to Sample. Color de capota en descapotables. |
| **Llantas** | 11 diseños (Carrera, Carrera S, Exclusive Design, RS Spyder, Turbo Aero, Sport Classic, GT Centerlock, Aero…), medidas de 18" a 22" según la familia y 7 acabados (incluido color carrocería). |
| **Frenos** | 6 colores de pinza, incluidos los frenos cerámicos PCCB en amarillo. |
| **Interior** | 12 tapicerías (estándar, bicolor, cuero exclusivo, cuero Club, Race-Tex) y 7 colores de costura en contraste. |
| **Resumen** | Desglose de precio, nombre del cliente, guardar, copiar enlace para enviar por WhatsApp/email e imprimir ficha (o guardarla en PDF). |
| **Comparar** | Hasta 3 modelos frente a frente, resaltando el mejor dato y el €/CV. |
| **Mis configuraciones** | Guardadas en el dispositivo; marca A y B para enseñar dos opciones lado a lado. |
| **Historia** | 18 modelos históricos (356, 550 Spyder, 917, 959, Carrera GT, 918 Spyder…). |

## Estructura

```
index.html
css/styles.css     Tema oscuro/claro, responsive, hoja de impresión
js/data.js         TODOS los datos: modelos, colores, interiores, llantas, precios. Edita aquí.
js/render.js       Motor de maquetas SVG (lateral, frontal, interior, llanta)
js/app.js          Navegación, estado, precios, guardado y enlaces compartibles
```

## Antes de usarla con clientes

- **Precios y datos técnicos** son orientativos (gama 2025-2026, España, con IVA). Revísalos con la tarifa oficial vigente en `js/data.js`.
- **Las maquetas son ilustraciones vectoriales propias**, no fotos oficiales. Si el concesionario dispone de imágenes o renders oficiales con licencia, pueden sustituir a las maquetas.
- Es un proyecto **no oficial**, sin logotipos ni marcas gráficas del fabricante. Para usarla con la marca oficial hace falta autorización de Porsche / del concesionario.
