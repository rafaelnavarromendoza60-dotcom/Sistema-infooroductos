# Identidad visual: guía rápida

## Contenido
- Paleta con función
- Psicología del color (orientativa)
- Tipografías
- Estilo fotográfico y prompts
- Bloque de variables de marca

## Paleta con función
Asigna a cada color un trabajo, no solo un gusto:
| Rol | Uso | Regla |
|-----|-----|-------|
| Primario | Titulares, fondos de marca | Alto contraste con el fondo claro |
| Acento | Solo botones y acciones | Si se usa en todo, deja de guiar la mirada |
| Fondo | Base de páginas y diapositivas | Neutro cálido o frío según el tono |
| Texto | Cuerpo | Casi negro o el primario muy oscuro |
| Confianza | Garantías, checks, confirmaciones | Verde, azul o menta; uso escaso |

## Psicología del color (orientativa)
Las asociaciones dependen de la cultura y del contexto; úsalas como punto de partida y valida con el público.
- **Coral, melocotón, naranja:** energía, calidez, cercanía. Útiles en fitness y bienestar para un público femenino adulto.
- **Ciruela, berenjena, azul noche:** sofisticación, confianza, percepción premium.
- **Verde y menta:** salud, naturalidad, seguridad.
- **Azul:** confianza, finanzas, tecnología.
- **Amarillo y dorado:** optimismo, atención; difícil de leer como texto sobre blanco.
- **Negro + un acento:** lujo, autoridad, minimalismo.

## Tipografías
- Un par: **títulos** con personalidad (serif editorial como Fraunces o Playfair Display; sans geométrica como Poppins o Montserrat) + **texto** muy legible (Inter, Plus Jakarta Sans, Source Sans 3).
- Máximo dos familias. Usa pesos para la jerarquía.
- Comprueba la licencia (Google Fonts es de uso libre comercial).

## Estilo fotográfico y prompts
Define: tipo de personas (edad, diversidad), entornos (casa real, cocina luminosa), luz (natural cálida), encuadres y lo que se evita (estudio frío, cuerpos irreales, antes/después).

Estructura de prompt: **sujeto + acción + entorno + estilo + luz + encuadre + paleta + formato + restricciones**.
Ejemplo para una landing: "Mujer de unos 40 años estirando en una esterilla junto a la ventana de su salón, fotografía de estilo de vida natural, luz de mañana cálida, plano general horizontal 16:9 con espacio libre a la izquierda para texto, tonos crema y coral suave, sin texto ni logotipos, cuerpo realista."

## Bloque de variables de marca
```css
:root {
  --primario: #2A1033;
  --acento: #D63A48;        /* coral oscurecido: 4,61:1 con texto blanco (AA) para botones */
  --acento-claro: #FF8467;  /* decoración, no texto */
  --fondo: #FFF8F3;
  --texto: #2A1033;
  --confianza: #1B7F6B;
  --fuente-titulos: 'Fraunces', Georgia, serif;
  --fuente-texto: 'Inter', system-ui, sans-serif;
}
```
