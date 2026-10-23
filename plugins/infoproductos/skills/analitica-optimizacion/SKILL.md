---
name: analitica-optimizacion
description: Analiza datos de tienda, landing, embudo, email y anuncios de un infoproducto, localiza dónde se pierden clientes y prioriza mejoras con ICE y tests A/B. Úsala para diagnosticar u optimizar ventas.
---

# Analítica y optimización

Objetivo: encontrar **dónde** se pierden los clientes potenciales, formular hipótesis sobre **por qué** y validarlas con pruebas, sin confundir correlación con causalidad.

## Etapas que se analizan
Contenido → clics → registro → landing → checkout → pago → consumo del producto → reembolsos → recompra. Métricas, fuentes de datos y causas habituales de cada etapa en [references/diagnostico.md](references/diagnostico.md).

## Flujo de trabajo

```
Análisis:
- [ ] 1. Reunir datos y comprobar su calidad
- [ ] 2. Calcular el embudo y compararlo
- [ ] 3. Localizar las mayores pérdidas
- [ ] 4. Formular hipótesis con evidencia
- [ ] 5. Priorizar por ICE
- [ ] 6. Diseñar la validación de cada hipótesis
- [ ] 7. Informe con recomendaciones
```

**1. Datos y calidad.** Pide exportaciones (plataforma de venta, analítica web, herramienta de email, Ads Manager). Antes de analizar, comprueba: periodos idénticos, mismas definiciones (personas o eventos), eventos duplicados, compras de prueba incluidas, diferencias entre compras atribuidas por la plataforma publicitaria y ventas reales. Anota cada limitación.

**2. Embudo.**

```bash
python scripts/embudo.py --plantilla > embudo.csv    # paso, actual, anterior
python scripts/embudo.py embudo.csv
```

Compara con el periodo anterior, entre anuncios, mercados o dispositivos. **No compares con "medias del sector" sin fuente**: cada producto, precio y tráfico es distinto.

**3. Pérdidas.** Prioriza los pasos con mayor caída frente a la propia referencia y con más volumen afectado. El script indica si el cambio es estadísticamente significativo o puede deberse al azar.

**4. Hipótesis.** Para cada problema, completa la ficha de [references/recomendacion.md](references/recomendacion.md): problema observado, evidencia disponible, causa posible, solución propuesta, métrica de éxito y método de validación. Usa evidencia cualitativa además de la cuantitativa: grabaciones de sesión y mapas de calor si existen, preguntas al soporte, respuestas a emails y encuestas de salida.

**5. ICE.** Puntúa de 1 a 10 el impacto (cuánto mejoraría la métrica de negocio), la confianza (cuánta evidencia lo apoya) y la facilidad (inversa del esfuerzo). Ordena por la media o el producto; explica cada nota.

**6. Validación.**

```bash
python scripts/ab_test.py muestra --base 0.03 --mejora 0.20      # tráfico necesario
python scripts/ab_test.py analizar --a 2400 72 --b 2380 95        # resultado de un test
```

Si el tráfico no permite un test A/B fiable, usa alternativas honestas: cambios secuenciales con comparación antes y después (indicando sus limitaciones), pruebas con usuarios (5 personas usando la landing en voz alta) o pruebas de mensajes con anuncios.

**7. Informe.** Estructura: resumen (3 hallazgos principales), embudo, problemas priorizados con su ficha, plan de pruebas y lo que **no** puede concluirse con los datos actuales.

## Reglas de razonamiento
- No atribuyas causalidad sin un experimento o una evidencia sólida: "las ventas bajaron cuando cambiamos el titular" puede deberse a la estacionalidad, al tráfico o a los anuncios.
- Separa el ruido de la señal: con pocos datos, un cambio grande en porcentaje puede ser azar.
- Una métrica intermedia mejor (CTR) no vale si la métrica de negocio empeora (beneficio, reembolsos).
- Comprueba el efecto en los ingresos y los reembolsos, no solo en la conversión.

## Ejemplo de recomendación

```markdown
### Problema 1: caída del inicio de checkout a compra (41,5 % → 37,1 %)
- Evidencia: el embudo muestra la caída (no significativa todavía); 6 de 14 respuestas de soporte preguntan por el pago con OXXO
- Causa posible: falta de un método de pago local en México
- Solución: activar OXXO o un método equivalente en el checkout de México
- Métrica de éxito: conversión checkout → compra en México
- Validación: comparar 3 semanas antes/después en México frente a España como control (sin cambios); confirmar con más volumen
- ICE: impacto 7, confianza 6, facilidad 8
```
