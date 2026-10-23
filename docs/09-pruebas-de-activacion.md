# Pruebas de activación

Peticiones para comprobar, tras instalar, que cada skill se activa cuando debe y que no se activa cuando la petición pertenece a otra. Pruébalas en conversaciones nuevas y anota qué skill se usa. Si una skill no se activa, revisa su descripción o nómbrala explícitamente.

| Skill | Debería activarse | Caso límite: debería activarse OTRA skill |
|-------|-------------------|-------------------------------------------|
| director-infoproductos | "Soy fisioterapeuta y quiero crear mi primer producto digital para gente con dolor de espalda en oficina; ¿cómo lo planteo de principio a fin?" | "Escríbeme 3 asuntos de email para mi lanzamiento" → embudos-email o copywriting-conversion |
| investigacion-mercados | "¿Qué nichos de infoproductos de cocina tienen demanda real en Chile y Perú? Necesito fuentes" | "Puntúa estas 8 ideas que ya tengo" → ideas-infoproductos |
| ideas-infoproductos | "Con estos problemas de mis seguidoras, ¿qué productos digitales podría vender y cuál priorizo?" | "¿Cómo compruebo si alguien pagaría por mi idea antes de crearla?" → validacion-demanda |
| validacion-demanda | "Mi lista de espera tuvo 900 visitas y 27 registros; ¿sigo adelante con el curso?" | "¿Cuánto tráfico necesito para probar un titular nuevo en mi landing que ya vende?" → analitica-optimizacion |
| creacion-infoproductos | "Escribe el capítulo 3 de mi ebook sobre ahorro para familias y maquétalo en PDF" | "Diseña solo la portada del ebook" → diseno-visual-mockups |
| ofertas-bonos | "Mi guía de 15 € no convence; ¿qué bonos y upsell añadirías sin bajar el precio?" | "Calcula si el upsell de 47 € compensa con un 5 % de aceptación" → precios-rentabilidad |
| copywriting-conversion | "Reescribe el titular y el primer párrafo de mi página de ventas para tráfico frío, con variantes A/B" | "Dame la estructura HTML de la página" → landing-pages-venta |
| creativos-redes-sociales | "Necesito 20 ganchos y 3 carruseles para Instagram sobre mi recetario" | "Hazme el calendario de publicaciones del mes con objetivos" → marketing-organico |
| diseno-visual-mockups | "Crea un mockup 3D de mi ebook para la web y revisa que los colores se lean bien" | "Haz el carrusel de 7 diapositivas" → creativos-redes-sociales |
| landing-pages-venta | "Hazme una sección de Shopify para vender mi curso con FAQ y garantía" | "Solo quiero mejorar el CTA" → copywriting-conversion |
| embudos-email | "Diseña la secuencia de emails después de que alguien descargue mi checklist gratis" | "¿Qué asunto convierte mejor según mis datos?" → analitica-optimizacion |
| marketing-organico | "No quiero pagar anuncios; ¿cómo consigo clientas con TikTok e Instagram en 30 días?" | "Configura una campaña de 300 € en Instagram" → meta-ads-infoproductos |
| meta-ads-infoproductos | "Mis anuncios tienen ROAS 1,8 pero no gano dinero; te paso el CSV" | "¿A qué precio vendo mi ebook en México?" → venta-internacional o precios-rentabilidad |
| precios-rentabilidad | "¿Cuánto puedo pagar por cliente si vendo a 37 € en Hotmart con un 8 % de reembolsos?" | "Analiza qué anuncio pausar" → meta-ads-infoproductos |
| venta-internacional | "Quiero vender mi curso en Brasil y EE. UU. además de España; ¿qué cambio?" | "Traduce este párrafo al inglés" → ninguna skill (tarea simple) |
| afiliados-distribucion | "¿Cuánta comisión puedo ofrecer a influencers que vendan mi programa y cómo los contacto?" | "Escribe un post patrocinado para mi propia cuenta" → creativos-redes-sociales |
| analitica-optimizacion | "Este mes vendí menos con el mismo tráfico; te paso el embudo de los dos meses" | "Tengo 400 visitas en mi lista de espera, ¿valido la idea?" → validacion-demanda |

## Criterio de éxito sugerido
Al menos 15 de las 17 peticiones "debería activarse" usan la skill esperada, y la mayoría de los casos límite usan la skill alternativa indicada. Repite la prueba con los modelos que vayas a usar (la documentación oficial recomienda probar las skills con todos ellos).
