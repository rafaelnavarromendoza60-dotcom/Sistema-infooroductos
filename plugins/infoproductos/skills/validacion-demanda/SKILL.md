---
name: validacion-demanda
description: Diseña y analiza pruebas de demanda antes de crear un infoproducto (landing de validación, encuestas, entrevistas, preventas, anuncios de prueba). Úsala para validar una idea o decidir si seguir.
---

# Validación antes de crear

Objetivo: obtener la **señal de compra más fuerte posible con el menor coste**, con criterios de decisión escritos antes de mirar los datos. Así se evita invertir semanas en un producto que nadie compra y se evita también "leer" en los datos lo que se quería ver.

## Escalera de señales

De más débil a más fuerte. Las tres primeras sirven para elegir mensajes, **no** para afirmar que habrá ventas.

1. Opinión ("¿te interesaría?", encuestas sin precio)
2. Atención (visualizaciones, likes, comentarios, seguidores)
3. Clic en un anuncio o en un contenido
4. Registro con email en una lista de espera
5. Registro con el precio visible
6. Clic en "comprar" de una página de prueba (requiere transparencia inmediata, ver abajo)
7. Reserva o depósito reembolsable
8. Preventa pagada con fecha de entrega y condiciones claras
9. Venta de una versión mínima del producto

Busca llegar al menos al nivel 5; los niveles 7-9 permiten afirmar "validado comercialmente".

## Flujo de trabajo

```
Validación:
- [ ] 1. Formular la hipótesis (público + problema + oferta + precio)
- [ ] 2. Prerregistrar criterios de éxito y fracaso
- [ ] 3. Elegir la prueba y prepararla
- [ ] 4. Ejecutar sin cambiar las condiciones a mitad
- [ ] 5. Analizar con el script
- [ ] 6. Decidir: continuar, modificar o abandonar
```

**1. Hipótesis.** Una frase comprobable: "Mujeres de 30-45 en España que retoman el ejercicio pagarán 19 € por un reto de 14 días en casa".

**2. Prerregistro.** Rellena la plantilla de [references/prerregistro.md](references/prerregistro.md) **antes** de lanzar: métrica, umbral de éxito, umbral de fracaso, tamaño de muestra o duración y presupuesto máximo. Calcula la muestra necesaria con:

```bash
python scripts/analizar_prueba.py --tamano-muestra 0.04 --margen 0.015
```

Los umbrales son decisiones del negocio (qué tasa hace viable el producto a ese precio), no "medias del sector". Si hay datos de `precios-rentabilidad`, derívalos de la conversión necesaria para que salga la cuenta.

**3. Prueba.** Elige según presupuesto, audiencia y nivel de señal en [references/tipos-de-prueba.md](references/tipos-de-prueba.md). Para entrevistas y encuestas usa los guiones de [references/entrevistas-encuestas.md](references/entrevistas-encuestas.md). La landing de validación puede construirse con `landing-pages-venta`.

**Ética no negociable:**
- **Páginas de prueba ("fake door")**: al hacer clic en comprar, informa en el acto de que el producto aún no está disponible, no cobres y ofrece apuntarse a la lista de espera. No recojas datos de pago.
- **Preventas**: indica claramente la fecha de entrega prevista, qué se entrega, qué pasa si hay retraso y cómo pedir el reembolso. Cumple esas condiciones.
- **Encuestas**: no prometas premios que no vas a dar; informa de cómo usarás los datos.

**5. Análisis.**

```bash
python scripts/analizar_prueba.py --exposiciones 420 --conversiones 19 --exito 0.05 --fracaso 0.02
python scripts/analizar_prueba.py --variantes "Dolor:500:21,Deseo:510:34"   # comparar mensajes
```

El script calcula la tasa, su intervalo de confianza del 95 % y una decisión frente a los umbrales prerregistrados. Si el resultado es "no concluyente", dilo así: no lo redondees a éxito.

**6. Informe.** Usa la estructura de [references/interpretar.md](references/interpretar.md): qué se probó, qué se observó, **qué se puede concluir y qué no**, y la decisión.

## Ejemplo

Entrada: "Tengo 2.000 seguidores en Instagram y quiero validar un recetario de 15 €."
Plan esperado (extracto):
- Hipótesis y criterios: lista de espera con precio visible "15 € en el lanzamiento"; éxito si se registra ≥ X % de las visitas a la landing, fracaso si < Y % (X e Y derivados de la economía), mínimo 300 visitas o 14 días.
- Prueba: 3 historias + 1 reel que llevan a la landing; encuesta de 5 preguntas a quienes se registren; 5 entrevistas de 20 minutos.
- Señal superior opcional: preventa con 30 % de descuento real y fecha de entrega.
- Lo que NO se podrá concluir: cómo convertirá el tráfico frío de anuncios (la audiencia actual ya confía en la creadora).
