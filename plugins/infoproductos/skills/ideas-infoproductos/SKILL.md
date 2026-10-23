---
name: ideas-infoproductos
description: Convierte problemas de mercado en ideas de infoproductos (ebooks, cursos, plantillas, retos, membresías) y las puntúa con criterios ponderados. Úsala para generar o elegir qué producto digital crear.
---

# Buscadora de ideas de infoproductos

Objetivo: transformar problemas reales en ideas de producto concretas, analizarlas con el mismo rigor y ordenarlas. Una idea bien puntuada sigue siendo una **hipótesis** hasta que la validación muestre señales de compra.

## Insumos

Necesitas, idealmente de `investigacion-mercados` o de la ficha del proyecto: público, problemas con citas del cliente, competidores y precios observados. Si faltan, pídelos o trabaja con `[HIPÓTESIS]` explícitas y avisa de que la puntuación será menos fiable.

## Flujo de trabajo

```
Ideas:
- [ ] 1. Elegir 1-3 problemas concretos
- [ ] 2. Generar ideas en varios formatos (mínimo 3 formatos por problema)
- [ ] 3. Analizar cada idea con la ficha de 15 puntos
- [ ] 4. Puntuar con el script
- [ ] 5. Diseñar la escalera de productos de las 1-2 mejores
- [ ] 6. Recomendar la siguiente acción (normalmente, validar)
```

**2. Generar.** Cruza cada problema con el catálogo de formatos de [references/formatos.md](references/formatos.md). Prioriza el formato que **reduce el esfuerzo del cliente para obtener el resultado**: una persona sin tiempo prefiere un planificador o un reto guiado a un ebook de 200 páginas.

**3. Analizar.** Completa para cada idea la ficha de [references/ficha-idea.md](references/ficha-idea.md): nicho, cliente ideal, problema, resultado realista, soluciones actuales, competidores, diferenciación, formato, precio potencial, coste de producción, dificultad, potencial orgánico, potencial publicitario, escalera de productos, y riesgos y limitaciones.
- El **precio potencial** sale de los precios observados de la competencia en ese mercado (cítalos), no de la intuición.
- El **resultado realista** debe poder alcanzarse con el producto y el esfuerzo razonable del cliente. Nada de "transforma tu vida en 7 días".

**4. Puntuar.** Prepara un CSV y ejecuta:

```bash
python scripts/puntuar_ideas.py --plantilla > ideas.csv   # plantilla de partida
python scripts/puntuar_ideas.py ideas.csv                  # ranking en Markdown
```

Criterios (nota 1-5) y pesos por defecto: demanda 25 %, diferenciación 20 %, facilidad de producción 15 %, margen 15 %, capacidad de captación 15 %, competencia 10 % (5 = competencia débil o superable). Ajusta los pesos con `--pesos` si la situación lo justifica (por ejemplo, más peso a la facilidad si el usuario necesita lanzar en dos semanas) y explica el motivo. Rellena la columna `evidencia` con la fuente de la nota de demanda: el script marca las ideas sin evidencia y nunca las clasifica como ganadoras.

**5. Escalera de productos.** Para las mejores ideas, diseña con [references/escalera.md](references/escalera.md) la secuencia de lead magnet → producto de entrada → producto principal → producto avanzado o continuidad.

**6. Siguiente acción.** Entrega el ranking y recomienda validar la primera idea con `validacion-demanda`, indicando qué señal concreta se buscará.

## Lenguaje obligatorio

- "Idea prometedora": buena puntuación, pendiente de validar.
- "Producto validado comercialmente": ha obtenido ventas o compromisos de pago según criterios definidos antes de la prueba.
No uses "ganador", "best seller" ni "garantizado" para ideas sin ventas.

## Ejemplo de idea analizada (extracto)

```markdown
### Idea 3: Reto de 14 días "Fuerza en casa" para mujeres de 30-45 que retoman el ejercicio
- Problema: "Empiezo con ganas y lo dejo a la segunda semana" [VERIFICADO: comentarios en..., fecha]
- Resultado realista: completar 14 sesiones de 20 minutos y tener una rutina semanal propia
- Formato: reto guiado (PDF + calendario imprimible + vídeos cortos de técnica)
- Precio potencial: rango de productos comparables en el mercado [VERIFICADO: 3 enlaces]
- Diferenciación: progresión adaptada a quien retoma, con plan B de 10 minutos para los días difíciles [HIPÓTESIS]
- Escalera: lead magnet "rutina de 10 min" → reto (entrada) → programa de 12 semanas (principal)
- Riesgos: categoría fitness (sin promesas de pérdida de peso en anuncios)
- Nota ponderada: 3,85 → Prometedora con evidencia: validar
```
