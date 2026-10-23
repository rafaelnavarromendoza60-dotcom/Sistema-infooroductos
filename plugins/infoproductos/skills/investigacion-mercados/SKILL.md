---
name: investigacion-mercados
description: Investiga nichos y problemas por los que se paga en España, LatAm y EE. UU. (demanda, competencia, precios, reseñas, riesgo). Úsala para buscar o comparar nichos de infoproductos.
---

# Investigación de mercados y nichos

Objetivo: encontrar **problemas por los que la gente ya paga** y que un infoproducto puede resolver mejor o de forma distinta, en mercados concretos. El resultado es un informe con puntuaciones justificadas y fuentes, no una lista de opiniones.

## Reglas de evidencia

- Cita cada dato con fuente, enlace y fecha de consulta, y etiquétalo: `[VERIFICADO]`, `[ESTIMACIÓN]`, `[HIPÓTESIS]` o `[PENDIENTE]`.
- **No inventes** volúmenes de búsqueda, índices de Google Trends, ventas ni ingresos de competidores. Si no puedes consultar una fuente (por ejemplo, porque requiere navegador o inicio de sesión), escribe `[PENDIENTE: abrir X, filtrar por Y, anotar Z]` para que el usuario lo complete.
- Las cifras de "estudiantes" o "ventas" que muestran los propios vendedores son afirmaciones de marketing: regístralas como "declarado por el vendedor", no como verificadas.
- Interés no es demanda. Distingue en todo momento **interés** (búsquedas, vídeos virales) de **señales de pago** (productos con reseñas, anuncios activos durante semanas, servicios que cobran).

## Flujo de trabajo

```
Investigación:
- [ ] 1. Delimitar alcance (nichos, mercados, idioma, recursos del usuario)
- [ ] 2. Generar candidatos (problemas, no temas)
- [ ] 3. Recoger señales de demanda y de pago
- [ ] 4. Mapear competencia y precios
- [ ] 5. Extraer el lenguaje del cliente (deseos, frustraciones, objeciones)
- [ ] 6. Evaluar riesgos regulatorios y publicitarios
- [ ] 7. Puntuar y redactar el informe
```

**1. Alcance.** Pregunta o deduce: mercados prioritarios, idioma, experiencia del usuario (la autoridad del creador es una ventaja real), presupuesto y formatos que puede producir. Si el usuario no acota, cubre los nichos de partida y añade otros cuando los datos lo justifiquen: salud y hábitos, fitness, IA y productividad, finanzas personales, emprendimiento digital, marketing y ventas, desarrollo personal, formación profesional, cocina, belleza, habilidades digitales y formación especializada.

**2. Candidatos.** Formula cada candidato como *persona + situación + problema* ("madres que trabajan y no tienen 1 hora para entrenar"), no como tema ("fitness"). Los subnichos concretos suelen tener menos competencia y un mensaje más claro.

**3-5. Señales, competencia y lenguaje.** Usa las fuentes y el método de [references/fuentes-y-metodo.md](references/fuentes-y-metodo.md). Para cada candidato reúne al menos: evolución del interés, 3-5 competidores con precio y formato, anuncios activos y citas literales de clientes (mejor de reseñas de 1 a 3 estrellas, que revelan lo que falta).

**6. Riesgos.** Salud, pérdida de peso, finanzas, "ganar dinero" y belleza tienen restricciones publicitarias y de consumo. Señala qué promesas no se podrán hacer y cómo afecta a la captación.

**7. Puntuación e informe.** Puntúa con la rúbrica y la plantilla de [references/plantilla-informe.md](references/plantilla-informe.md). Para las particularidades de cada país (poder adquisitivo, métodos de pago, idioma), consulta [references/paises.md](references/paises.md).

## Criterios de calidad del informe

- Cada puntuación tiene una justificación de 1-2 frases con evidencia.
- Las recomendaciones distinguen "investigar más", "validar ya" y "descartar".
- Incluye una sección "Lo que no sabemos todavía" con los datos pendientes y cómo obtenerlos.
- Termina con la siguiente acción concreta (normalmente, pasar las 1-2 mejores oportunidades a `ideas-infoproductos` o a `validacion-demanda`).

## Ejemplo

Entrada: "Busca oportunidades de infoproductos de cocina en México y Colombia."
Salida esperada (extracto):

```markdown
### Oportunidad 2: comidas para llevar al trabajo con presupuesto ajustado (México)
Puntuación: 3,6/5 · Recomendación: validar
- Evidencia de pago: 4 recetarios digitales en marketplaces con reseñas [VERIFICADO: enlaces, fecha]
- Lenguaje del cliente: "siempre termino comprando comida en la calle porque no me da tiempo" [VERIFICADO: comentario en..., fecha]
- Interés: [PENDIENTE: Google Trends, "recetas para llevar al trabajo", México, 5 años, anotar tendencia]
- Riesgo: bajo (sin promesas de salud)
- Diferenciación posible: plan semanal con lista de compras por menos de X pesos [HIPÓTESIS]
```
