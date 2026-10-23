# Especificación de carrusel por diapositiva

```markdown
# Carrusel: [título interno]
- Objetivo: [alcance / identificación / educación / autoridad / confianza / conversión]
- Público y nivel de conciencia: 
- Formato: 4:5 (1080×1350) · Nº de diapositivas: 
- Paleta: [primario, acento, fondo, texto] · Tipografías: [títulos / texto]
- CTA final: 
- Hipótesis y métrica: [p. ej., guardados/alcance, comentarios con palabra clave]

## Diapositiva 1 — Gancho
- Texto exacto: 
- Composición visual: [jerarquía, alineación, % de espacio para el texto]
- Elementos principales: 
- Paleta: 
- Tipografía: [familia, peso, tamaño aproximado]
- Imagen o fotografía necesaria: [o "solo tipografía"]
- Prompt de imagen IA: 
- Formato: 
- Objetivo psicológico: [p. ej., identificación inmediata]
- Objetivo comercial: [p. ej., que deslice a la 2]

## Diapositiva 2 — [Problema] ...
```

## Cómo escribir el prompt de imagen IA
Estructura: **sujeto + acción + entorno + estilo fotográfico + luz + encuadre + paleta + formato + restricciones**.

Ejemplo: "Mujer de unos 35 años haciendo una sentadilla en el salón de casa por la mañana, ropa deportiva sencilla, fotografía editorial natural, luz cálida de ventana, plano medio, tonos crema y coral, formato vertical 4:5, espacio libre en el tercio superior para texto, sin texto en la imagen, sin logotipos, cuerpo realista y saludable."

Restricciones recomendadas: sin texto incrustado (se añade después), sin marcas ni personas reales reconocibles, cuerpos diversos y realistas, nada que sugiera un antes/después.

## Conversión al JSON del script
Cada diapositiva de la especificación se traduce a `{"tipo": ..., "estilo": ..., "titulo": ..., "cuerpo"/"items"/"subtitulo"/"boton": ..., "imagen": "ruta-opcional.png"}`. Tipos: `portada`, `texto`, `lista`, `cita`, `cta`. Estilos: `claro`, `oscuro`, `acento`.
