/* =====================================================================
   BASE DE DATOS DEL CONFIGURADOR
   Gama actual (2025-2026) + modelos históricos.
   Potencias en CV, aceleración 0-100 km/h en s, velocidad máx. en km/h.
   Precios: orientativos "desde" para España con IVA. Verificar siempre
   con la tarifa oficial vigente antes de presupuestar a un cliente.
   ===================================================================== */
window.PC = window.PC || {};

PC.families = [
  { id: '718', name: '718', tag: 'Motor central', desc: 'Biplaza de motor central. Cayman (coupé) y Boxster (roadster). Producción de los modelos de combustión finalizada en 2025.' },
  { id: '911', name: '911', tag: 'El icono', desc: 'Deportivo de motor trasero bóxer desde 1963. Generación 992.2 con primer híbrido T-Hybrid en el GTS.' },
  { id: 'taycan', name: 'Taycan', tag: '100% eléctrico', desc: 'Berlina deportiva eléctrica de 800 V. Versiones Sport Turismo y Cross Turismo.' },
  { id: 'panamera', name: 'Panamera', tag: 'Gran turismo', desc: 'Berlina GT de cuatro puertas, tercera generación con gama E-Hybrid.' },
  { id: 'macan', name: 'Macan', tag: 'SUV eléctrico', desc: 'SUV compacto deportivo, nueva generación 100% eléctrica sobre plataforma PPE.' },
  { id: 'cayenne', name: 'Cayenne', tag: 'SUV', desc: 'SUV grande en carrocería SUV y Coupé, con motores V6, V8, E-Hybrid y nueva versión Electric.' },
];

// silhouette = maqueta que se dibuja · roof = 'fixed' | 'soft' (capota) | 'targa'
// wing = alerón fijo · fuel: Gasolina | Híbrido | Eléctrico
PC.models = [
  // ---------------- 718 ----------------
  { id: '718-cayman', family: '718', name: '718 Cayman', body: 'Coupé', fuel: 'Gasolina', cv: 300, acc: 5.1, vmax: 275, price: 74900, engine: '2.0 bóxer turbo 4 cil.', silhouette: '718', roof: 'fixed' },
  { id: '718-cayman-s', family: '718', name: '718 Cayman S', body: 'Coupé', fuel: 'Gasolina', cv: 350, acc: 4.4, vmax: 285, price: 92900, engine: '2.5 bóxer turbo 4 cil.', silhouette: '718', roof: 'fixed' },
  { id: '718-cayman-gts', family: '718', name: '718 Cayman GTS 4.0', body: 'Coupé', fuel: 'Gasolina', cv: 400, acc: 4.5, vmax: 293, price: 112600, engine: '4.0 bóxer atmosférico 6 cil.', silhouette: '718', roof: 'fixed' },
  { id: '718-cayman-gt4rs', family: '718', name: '718 Cayman GT4 RS', body: 'Coupé', fuel: 'Gasolina', cv: 500, acc: 3.4, vmax: 315, price: 179900, engine: '4.0 bóxer atmosférico 6 cil. (9.000 rpm)', silhouette: '718', roof: 'fixed', wing: true, gt: true },
  { id: '718-boxster', family: '718', name: '718 Boxster', body: 'Roadster', fuel: 'Gasolina', cv: 300, acc: 5.1, vmax: 275, price: 77300, engine: '2.0 bóxer turbo 4 cil.', silhouette: '718', roof: 'soft' },
  { id: '718-boxster-s', family: '718', name: '718 Boxster S', body: 'Roadster', fuel: 'Gasolina', cv: 350, acc: 4.4, vmax: 285, price: 95300, engine: '2.5 bóxer turbo 4 cil.', silhouette: '718', roof: 'soft' },
  { id: '718-boxster-gts', family: '718', name: '718 Boxster GTS 4.0', body: 'Roadster', fuel: 'Gasolina', cv: 400, acc: 4.5, vmax: 293, price: 115000, engine: '4.0 bóxer atmosférico 6 cil.', silhouette: '718', roof: 'soft' },
  { id: '718-spyder-rs', family: '718', name: '718 Spyder RS', body: 'Roadster', fuel: 'Gasolina', cv: 500, acc: 3.4, vmax: 308, price: 182000, engine: '4.0 bóxer atmosférico 6 cil. (9.000 rpm)', silhouette: '718', roof: 'soft', gt: true },

  // ---------------- 911 ----------------
  { id: '911-carrera', family: '911', name: '911 Carrera', body: 'Coupé', fuel: 'Gasolina', cv: 394, acc: 4.1, vmax: 294, price: 147900, engine: '3.0 bóxer biturbo 6 cil.', silhouette: '911', roof: 'fixed' },
  { id: '911-carrera-cab', family: '911', name: '911 Carrera Cabriolet', body: 'Cabriolet', fuel: 'Gasolina', cv: 394, acc: 4.3, vmax: 292, price: 164300, engine: '3.0 bóxer biturbo 6 cil.', silhouette: '911', roof: 'soft' },
  { id: '911-carrera-t', family: '911', name: '911 Carrera T', body: 'Coupé', fuel: 'Gasolina', cv: 394, acc: 4.5, vmax: 295, price: 157500, engine: '3.0 bóxer biturbo 6 cil. · cambio manual 6v', silhouette: '911', roof: 'fixed' },
  { id: '911-carrera-s', family: '911', name: '911 Carrera S', body: 'Coupé', fuel: 'Gasolina', cv: 480, acc: 3.5, vmax: 308, price: 175600, engine: '3.0 bóxer biturbo 6 cil.', silhouette: '911', roof: 'fixed' },
  { id: '911-carrera-4s', family: '911', name: '911 Carrera 4S', body: 'Coupé', fuel: 'Gasolina', cv: 480, acc: 3.4, vmax: 308, price: 184100, engine: '3.0 bóxer biturbo 6 cil. · tracción total', silhouette: '911', roof: 'fixed' },
  { id: '911-carrera-gts', family: '911', name: '911 Carrera GTS', body: 'Coupé', fuel: 'Híbrido', cv: 541, acc: 3.0, vmax: 312, price: 198400, engine: '3.6 bóxer T-Hybrid 6 cil.', silhouette: '911', roof: 'fixed' },
  { id: '911-carrera-4gts-cab', family: '911', name: '911 Carrera 4 GTS Cabriolet', body: 'Cabriolet', fuel: 'Híbrido', cv: 541, acc: 3.1, vmax: 312, price: 223900, engine: '3.6 bóxer T-Hybrid 6 cil. · tracción total', silhouette: '911', roof: 'soft' },
  { id: '911-targa-4gts', family: '911', name: '911 Targa 4 GTS', body: 'Targa', fuel: 'Híbrido', cv: 541, acc: 3.0, vmax: 312, price: 223900, engine: '3.6 bóxer T-Hybrid 6 cil. · tracción total', silhouette: '911', roof: 'targa' },
  { id: '911-turbo-s', family: '911', name: '911 Turbo S', body: 'Coupé', fuel: 'Híbrido', cv: 711, acc: 2.5, vmax: 322, price: 287500, engine: '3.6 bóxer biturbo T-Hybrid 6 cil.', silhouette: '911', roof: 'fixed', turbo: true },
  { id: '911-gt3', family: '911', name: '911 GT3', body: 'Coupé', fuel: 'Gasolina', cv: 510, acc: 3.4, vmax: 311, price: 229900, engine: '4.0 bóxer atmosférico 6 cil.', silhouette: '911', roof: 'fixed', wing: true, gt: true },
  { id: '911-gt3-touring', family: '911', name: '911 GT3 Touring', body: 'Coupé', fuel: 'Gasolina', cv: 510, acc: 3.9, vmax: 313, price: 229900, engine: '4.0 bóxer atmosférico 6 cil. · manual', silhouette: '911', roof: 'fixed', gt: true },
  { id: '911-gt3-rs', family: '911', name: '911 GT3 RS', body: 'Coupé', fuel: 'Gasolina', cv: 525, acc: 3.2, vmax: 296, price: 299600, engine: '4.0 bóxer atmosférico 6 cil.', silhouette: '911', roof: 'fixed', wing: 'rs', gt: true },
  { id: '911-dakar', family: '911', name: '911 Dakar', body: 'Coupé off-road', fuel: 'Gasolina', cv: 480, acc: 3.4, vmax: 240, price: 252000, engine: '3.0 bóxer biturbo 6 cil. · edición limitada', silhouette: '911', roof: 'fixed', lifted: true },

  // ---------------- Taycan ----------------
  { id: 'taycan', family: 'taycan', name: 'Taycan', body: 'Berlina', fuel: 'Eléctrico', cv: 408, acc: 4.8, vmax: 230, price: 99600, engine: 'Eléctrico · propulsión · hasta 592 km WLTP', silhouette: 'taycan', roof: 'fixed' },
  { id: 'taycan-4s', family: 'taycan', name: 'Taycan 4S', body: 'Berlina', fuel: 'Eléctrico', cv: 598, acc: 3.7, vmax: 250, price: 124300, engine: 'Eléctrico · 2 motores · tracción total', silhouette: 'taycan', roof: 'fixed' },
  { id: 'taycan-gts', family: 'taycan', name: 'Taycan GTS', body: 'Berlina', fuel: 'Eléctrico', cv: 700, acc: 3.3, vmax: 250, price: 149800, engine: 'Eléctrico · 2 motores · tracción total', silhouette: 'taycan', roof: 'fixed' },
  { id: 'taycan-turbo', family: 'taycan', name: 'Taycan Turbo', body: 'Berlina', fuel: 'Eléctrico', cv: 884, acc: 2.7, vmax: 260, price: 186900, engine: 'Eléctrico · 2 motores · tracción total', silhouette: 'taycan', roof: 'fixed' },
  { id: 'taycan-turbo-s', family: 'taycan', name: 'Taycan Turbo S', body: 'Berlina', fuel: 'Eléctrico', cv: 952, acc: 2.4, vmax: 260, price: 216500, engine: 'Eléctrico · 2 motores · tracción total', silhouette: 'taycan', roof: 'fixed' },
  { id: 'taycan-turbo-gt', family: 'taycan', name: 'Taycan Turbo GT', body: 'Berlina', fuel: 'Eléctrico', cv: 1034, acc: 2.3, vmax: 290, price: 240800, engine: 'Eléctrico · hasta 1.108 CV con Attack Mode', silhouette: 'taycan', roof: 'fixed', wing: true, gt: true },
  { id: 'taycan-4-ct', family: 'taycan', name: 'Taycan 4 Cross Turismo', body: 'Cross Turismo', fuel: 'Eléctrico', cv: 435, acc: 4.8, vmax: 220, price: 112500, engine: 'Eléctrico · tracción total · altura elevada', silhouette: 'taycanST', roof: 'fixed', lifted: true },
  { id: 'taycan-4s-st', family: 'taycan', name: 'Taycan 4S Sport Turismo', body: 'Sport Turismo', fuel: 'Eléctrico', cv: 598, acc: 3.7, vmax: 250, price: 126100, engine: 'Eléctrico · 2 motores · tracción total', silhouette: 'taycanST', roof: 'fixed' },
  { id: 'taycan-turbo-s-ct', family: 'taycan', name: 'Taycan Turbo S Cross Turismo', body: 'Cross Turismo', fuel: 'Eléctrico', cv: 952, acc: 2.4, vmax: 250, price: 219300, engine: 'Eléctrico · 2 motores · tracción total', silhouette: 'taycanST', roof: 'fixed', lifted: true },

  // ---------------- Panamera ----------------
  { id: 'panamera', family: 'panamera', name: 'Panamera', body: 'Berlina', fuel: 'Gasolina', cv: 353, acc: 5.1, vmax: 272, price: 119900, engine: '2.9 V6 biturbo', silhouette: 'panamera', roof: 'fixed' },
  { id: 'panamera-4', family: 'panamera', name: 'Panamera 4', body: 'Berlina', fuel: 'Gasolina', cv: 353, acc: 5.0, vmax: 270, price: 125300, engine: '2.9 V6 biturbo · tracción total', silhouette: 'panamera', roof: 'fixed' },
  { id: 'panamera-4-ehybrid', family: 'panamera', name: 'Panamera 4 E-Hybrid', body: 'Berlina', fuel: 'Híbrido', cv: 470, acc: 4.1, vmax: 280, price: 134900, engine: '2.9 V6 + eléctrico · hasta 91 km eléctricos', silhouette: 'panamera', roof: 'fixed' },
  { id: 'panamera-4s-ehybrid', family: 'panamera', name: 'Panamera 4S E-Hybrid', body: 'Berlina', fuel: 'Híbrido', cv: 544, acc: 3.7, vmax: 290, price: 151500, engine: '2.9 V6 + eléctrico', silhouette: 'panamera', roof: 'fixed' },
  { id: 'panamera-gts', family: 'panamera', name: 'Panamera GTS', body: 'Berlina', fuel: 'Gasolina', cv: 500, acc: 3.8, vmax: 302, price: 176700, engine: '4.0 V8 biturbo', silhouette: 'panamera', roof: 'fixed' },
  { id: 'panamera-turbo-ehybrid', family: 'panamera', name: 'Panamera Turbo E-Hybrid', body: 'Berlina', fuel: 'Híbrido', cv: 680, acc: 3.2, vmax: 315, price: 207900, engine: '4.0 V8 biturbo + eléctrico', silhouette: 'panamera', roof: 'fixed', turbo: true },
  { id: 'panamera-turbo-s-ehybrid', family: 'panamera', name: 'Panamera Turbo S E-Hybrid', body: 'Berlina', fuel: 'Híbrido', cv: 782, acc: 2.9, vmax: 325, price: 254700, engine: '4.0 V8 biturbo + eléctrico', silhouette: 'panamera', roof: 'fixed', turbo: true },

  // ---------------- Macan ----------------
  { id: 'macan', family: 'macan', name: 'Macan', body: 'SUV', fuel: 'Eléctrico', cv: 360, acc: 5.7, vmax: 220, price: 82900, engine: 'Eléctrico · propulsión · hasta 641 km WLTP', silhouette: 'macan', roof: 'fixed' },
  { id: 'macan-4', family: 'macan', name: 'Macan 4', body: 'SUV', fuel: 'Eléctrico', cv: 408, acc: 5.2, vmax: 220, price: 87900, engine: 'Eléctrico · 2 motores · tracción total', silhouette: 'macan', roof: 'fixed' },
  { id: 'macan-4s', family: 'macan', name: 'Macan 4S', body: 'SUV', fuel: 'Eléctrico', cv: 516, acc: 4.1, vmax: 240, price: 98500, engine: 'Eléctrico · 2 motores · tracción total', silhouette: 'macan', roof: 'fixed' },
  { id: 'macan-gts', family: 'macan', name: 'Macan GTS', body: 'SUV', fuel: 'Eléctrico', cv: 571, acc: 3.8, vmax: 250, price: 114900, engine: 'Eléctrico · 2 motores · tracción total', silhouette: 'macan', roof: 'fixed' },
  { id: 'macan-turbo', family: 'macan', name: 'Macan Turbo', body: 'SUV', fuel: 'Eléctrico', cv: 639, acc: 3.3, vmax: 260, price: 125200, engine: 'Eléctrico · 2 motores · tracción total', silhouette: 'macan', roof: 'fixed', turbo: true },

  // ---------------- Cayenne ----------------
  { id: 'cayenne', family: 'cayenne', name: 'Cayenne', body: 'SUV', fuel: 'Gasolina', cv: 353, acc: 6.0, vmax: 248, price: 101200, engine: '3.0 V6 turbo', silhouette: 'cayenne', roof: 'fixed' },
  { id: 'cayenne-ehybrid', family: 'cayenne', name: 'Cayenne E-Hybrid', body: 'SUV', fuel: 'Híbrido', cv: 470, acc: 4.9, vmax: 254, price: 112300, engine: '3.0 V6 + eléctrico · hasta 90 km eléctricos', silhouette: 'cayenne', roof: 'fixed' },
  { id: 'cayenne-s', family: 'cayenne', name: 'Cayenne S', body: 'SUV', fuel: 'Gasolina', cv: 474, acc: 4.7, vmax: 273, price: 131800, engine: '4.0 V8 biturbo', silhouette: 'cayenne', roof: 'fixed' },
  { id: 'cayenne-gts', family: 'cayenne', name: 'Cayenne GTS', body: 'SUV', fuel: 'Gasolina', cv: 500, acc: 4.4, vmax: 275, price: 158900, engine: '4.0 V8 biturbo', silhouette: 'cayenne', roof: 'fixed' },
  { id: 'cayenne-turbo-ehybrid', family: 'cayenne', name: 'Cayenne Turbo E-Hybrid', body: 'SUV', fuel: 'Híbrido', cv: 739, acc: 3.7, vmax: 295, price: 199900, engine: '4.0 V8 biturbo + eléctrico', silhouette: 'cayenne', roof: 'fixed', turbo: true },
  { id: 'cayenne-coupe', family: 'cayenne', name: 'Cayenne Coupé', body: 'SUV Coupé', fuel: 'Gasolina', cv: 353, acc: 6.0, vmax: 248, price: 107300, engine: '3.0 V6 turbo', silhouette: 'cayenneCoupe', roof: 'fixed' },
  { id: 'cayenne-s-ehybrid-coupe', family: 'cayenne', name: 'Cayenne S E-Hybrid Coupé', body: 'SUV Coupé', fuel: 'Híbrido', cv: 519, acc: 4.7, vmax: 263, price: 131600, engine: '3.0 V6 + eléctrico', silhouette: 'cayenneCoupe', roof: 'fixed' },
  { id: 'cayenne-gts-coupe', family: 'cayenne', name: 'Cayenne GTS Coupé', body: 'SUV Coupé', fuel: 'Gasolina', cv: 500, acc: 4.4, vmax: 275, price: 164600, engine: '4.0 V8 biturbo', silhouette: 'cayenneCoupe', roof: 'fixed' },
  { id: 'cayenne-turbo-ehybrid-coupe', family: 'cayenne', name: 'Cayenne Turbo E-Hybrid Coupé GT', body: 'SUV Coupé', fuel: 'Híbrido', cv: 739, acc: 3.6, vmax: 305, price: 215400, engine: '4.0 V8 biturbo + eléctrico · paquete GT', silhouette: 'cayenneCoupe', roof: 'fixed', turbo: true },
  { id: 'cayenne-electric', family: 'cayenne', name: 'Cayenne Electric', body: 'SUV', fuel: 'Eléctrico', cv: 442, acc: 4.8, vmax: 230, price: 109900, engine: 'Eléctrico · 2 motores · hasta 642 km WLTP', silhouette: 'cayenne', roof: 'fixed' },
  { id: 'cayenne-turbo-electric', family: 'cayenne', name: 'Cayenne Turbo Electric', body: 'SUV', fuel: 'Eléctrico', cv: 1156, acc: 2.5, vmax: 260, price: 168900, engine: 'Eléctrico · hasta 1.156 CV con Launch Control', silhouette: 'cayenne', roof: 'fixed', turbo: true },
];

/* --------------------- PINTURA EXTERIOR --------------------- */
// tier: uni | metal | special | pts (Paint to Sample)
PC.colorTiers = [
  { id: 'uni', name: 'Colores uni', price: 0 },
  { id: 'metal', name: 'Metalizados', price: 1620 },
  { id: 'special', name: 'Colores especiales', price: 3540 },
  { id: 'pts', name: 'Paint to Sample', price: 12980 },
];
PC.colors = [
  { id: 'negro', name: 'Negro', hex: '#0d0d0e', tier: 'uni' },
  { id: 'blanco', name: 'Blanco', hex: '#f2f2ee', tier: 'uni' },
  { id: 'guards-red', name: 'Rojo Guards', hex: '#c40d23', tier: 'uni' },
  { id: 'racing-yellow', name: 'Amarillo Racing', hex: '#f5cf12', tier: 'uni' },

  { id: 'jet-black', name: 'Negro Jet metalizado', hex: '#16191d', tier: 'metal' },
  { id: 'carrara', name: 'Blanco Carrara metalizado', hex: '#e7e6df', tier: 'metal' },
  { id: 'gt-silver', name: 'Plata GT metalizado', hex: '#b5b8b9', tier: 'metal' },
  { id: 'dolomite', name: 'Plata Dolomita metalizado', hex: '#9ca1a3', tier: 'metal' },
  { id: 'ice-grey', name: 'Gris Hielo metalizado', hex: '#8a9497', tier: 'metal' },
  { id: 'agate', name: 'Gris Ágata metalizado', hex: '#5f6366', tier: 'metal' },
  { id: 'gentian', name: 'Azul Genciana metalizado', hex: '#1d3766', tier: 'metal' },
  { id: 'frozen-blue', name: 'Azul Frozen metalizado', hex: '#86aac6', tier: 'metal' },
  { id: 'aventurine', name: 'Verde Aventurina metalizado', hex: '#2e4a40', tier: 'metal' },
  { id: 'papaya', name: 'Papaya metalizado', hex: '#e2671c', tier: 'metal' },

  { id: 'chalk', name: 'Tiza (Crayon)', hex: '#cdcbc3', tier: 'special' },
  { id: 'arctic-grey', name: 'Gris Ártico', hex: '#aeb1ae', tier: 'special' },
  { id: 'slate-grey', name: 'Gris Pizarra Neo', hex: '#565b5f', tier: 'special' },
  { id: 'shark-blue', name: 'Azul Shark', hex: '#1769bf', tier: 'special' },
  { id: 'miami-blue', name: 'Azul Miami', hex: '#16a6d3', tier: 'special' },
  { id: 'gulf-blue', name: 'Azul Gulf', hex: '#6fa8cf', tier: 'special' },
  { id: 'provence', name: 'Provenza', hex: '#9aa0c4', tier: 'special' },
  { id: 'python-green', name: 'Verde Python', hex: '#64bb37', tier: 'special' },
  { id: 'oak-green', name: 'Verde Roble Neo', hex: '#3a4838', tier: 'special' },
  { id: 'lava-orange', name: 'Naranja Lava', hex: '#f05a0c', tier: 'special' },
  { id: 'ruby-star', name: 'Rubí Star Neo', hex: '#a8163f', tier: 'special' },

  { id: 'riviera-blue', name: 'Azul Riviera', hex: '#1b8ad1', tier: 'pts' },
  { id: 'mexico-blue', name: 'Azul México', hex: '#1f4daa', tier: 'pts' },
  { id: 'irish-green', name: 'Verde Irlanda', hex: '#1e5a3b', tier: 'pts' },
  { id: 'signal-green', name: 'Verde Señal', hex: '#2fb34a', tier: 'pts' },
  { id: 'cartagena', name: 'Amarillo Cartagena', hex: '#e6cf6a', tier: 'pts' },
  { id: 'fashion-grey', name: 'Gris Fashion', hex: '#a3a59f', tier: 'pts' },
  { id: 'viola', name: 'Violeta Viola metalizado', hex: '#55356f', tier: 'pts' },
  { id: 'oslo-blue', name: 'Azul Oslo', hex: '#2c4f86', tier: 'pts' },
];

/* --------------------- CAPOTA (Cabriolet / Roadster) --------------------- */
PC.tops = [
  { id: 'negro', name: 'Capota negra', hex: '#151515', price: 0 },
  { id: 'rojo', name: 'Capota rojo burdeos', hex: '#4e1219', price: 920 },
  { id: 'azul', name: 'Capota azul oscuro', hex: '#1c2433', price: 920 },
  { id: 'marron', name: 'Capota marrón', hex: '#3b2a20', price: 920 },
];

/* --------------------- INTERIOR --------------------- */
// main = asientos/salpicadero superior · accent = centros de asiento y salpicadero inferior
PC.interiors = [
  { id: 'negro', name: 'Negro', main: '#161616', accent: '#1e1e1e', price: 0, group: 'Estándar' },
  { id: 'negro-burdeos', name: 'Negro / Rojo Burdeos', main: '#161616', accent: '#5c1520', price: 2640, group: 'Bicolor' },
  { id: 'negro-tiza', name: 'Negro / Tiza', main: '#161616', accent: '#d6d0c1', price: 2640, group: 'Bicolor' },
  { id: 'pizarra-tiza', name: 'Gris Pizarra / Tiza', main: '#4b4f53', accent: '#d6d0c1', price: 2640, group: 'Bicolor' },
  { id: 'grafito-tiza', name: 'Azul Grafito / Tiza', main: '#283244', accent: '#d6d0c1', price: 2640, group: 'Bicolor' },
  { id: 'negro-mojave', name: 'Negro / Beige Mojave', main: '#161616', accent: '#c6ae86', price: 2640, group: 'Bicolor' },
  { id: 'trufa', name: 'Marrón Trufa', main: '#3c2a21', accent: '#4a3428', price: 3960, group: 'Cuero exclusivo' },
  { id: 'burdeos', name: 'Rojo Burdeos', main: '#561520', accent: '#651a27', price: 3960, group: 'Cuero exclusivo' },
  { id: 'crayon', name: 'Crayon', main: '#cfcabc', accent: '#161616', price: 3960, group: 'Cuero exclusivo' },
  { id: 'club-cognac', name: 'Cuero Club Negro / Coñac', main: '#161616', accent: '#8b4b23', price: 5280, group: 'Cuero Club' },
  { id: 'club-basalto', name: 'Cuero Club Basalto / Crayon', main: '#2b2b2b', accent: '#cfcabc', price: 5280, group: 'Cuero Club' },
  { id: 'racetex-rojo', name: 'Race-Tex Negro con detalles Rojo Guards', main: '#1a1a1a', accent: '#262626', price: 3300, group: 'Race-Tex', stitchForce: '#c40d23' },
];

PC.stitches = [
  { id: 'igual', name: 'A juego con el interior', hex: null, price: 0 },
  { id: 'tiza', name: 'Tiza', hex: '#d6d0c1', price: 780 },
  { id: 'rojo', name: 'Rojo Guards', hex: '#c40d23', price: 780 },
  { id: 'amarillo', name: 'Amarillo Racing', hex: '#f5cf12', price: 780 },
  { id: 'azul', name: 'Azul Shark', hex: '#1769bf', price: 780 },
  { id: 'verde', name: 'Verde Python', hex: '#64bb37', price: 780 },
  { id: 'naranja', name: 'Naranja Lava', hex: '#f05a0c', price: 780 },
];

/* --------------------- LLANTAS --------------------- */
// style = dibujo de los radios (ver render.js)
PC.wheelDesigns = [
  { id: 'carrera', name: 'Carrera', style: 'tenSpoke', price: 0, desc: '10 radios finos, diseño de serie.' },
  { id: 'carrera-s', name: 'Carrera S', style: 'doubleFive', price: 1380, desc: '5 radios dobles.' },
  { id: 'exclusive', name: 'Exclusive Design', style: 'yFive', price: 3610, desc: '5 radios en Y con aletas aerodinámicas.' },
  { id: 'rs-spyder', name: 'RS Spyder Design', style: 'multi', price: 3290, desc: '10 radios dobles de inspiración racing.' },
  { id: 'turbo-aero', name: 'Turbo Aero', style: 'turbine', price: 4120, desc: 'Turbina de álabes curvos.' },
  { id: 'sport-classic', name: 'Sport Classic', style: 'petal', price: 3850, desc: '5 pétalos, homenaje a las llantas clásicas de los 70.' },
  { id: 'gt-forged', name: 'GT forjada Centerlock', style: 'centerlock', price: 5240, desc: 'Forjada con tuerca central de competición.' },
  { id: 'aero', name: 'Aero Design', style: 'aeroDisc', price: 0, desc: 'Llanta aerodinámica cerrada para máxima autonomía.' },
  { id: 'mission-e', name: 'Mission E Design', style: 'yFive', price: 2860, desc: 'Radios en Y de inspiración eléctrica.' },
  { id: 'rs-sport', name: 'RS Sport', style: 'multi', price: 3180, desc: 'Multi-radio deportiva.' },
  { id: 'offroad', name: 'Offroad Design', style: 'doubleFive', price: 1980, desc: '5 radios dobles robustos para todoterreno.' },
];

// diseños y medidas disponibles por familia
PC.wheelsByFamily = {
  '718': { designs: ['carrera', 'carrera-s', 'exclusive', 'sport-classic', 'gt-forged'], sizes: [18, 19, 20], base: 18 },
  '911': { designs: ['carrera', 'carrera-s', 'exclusive', 'rs-spyder', 'turbo-aero', 'sport-classic', 'gt-forged'], sizes: [19, 20, 21], base: 19 },
  taycan: { designs: ['aero', 'mission-e', 'rs-spyder', 'turbo-aero', 'exclusive'], sizes: [19, 20, 21], base: 19 },
  panamera: { designs: ['carrera', 'exclusive', 'rs-sport', 'turbo-aero', 'sport-classic'], sizes: [19, 20, 21, 22], base: 19 },
  macan: { designs: ['aero', 'mission-e', 'rs-sport', 'turbo-aero', 'exclusive'], sizes: [20, 21, 22], base: 20 },
  cayenne: { designs: ['carrera', 'rs-sport', 'turbo-aero', 'exclusive', 'offroad', 'gt-forged'], sizes: [20, 21, 22], base: 20 },
};
PC.sizeStepPrice = 1450; // € por pulgada sobre la medida de serie

PC.wheelFinishes = [
  { id: 'plata', name: 'Plata', hex: '#c9cccf', price: 0 },
  { id: 'negro-sat', name: 'Negro satinado', hex: '#232427', price: 960 },
  { id: 'negro-brillo', name: 'Negro alto brillo', hex: '#0f1012', price: 1180, gloss: true },
  { id: 'platino', name: 'Platino satinado', hex: '#a7a59d', price: 1180 },
  { id: 'darksilver', name: 'Darksilver', hex: '#6c6f72', price: 960 },
  { id: 'aurum', name: 'Aurum (oro satinado)', hex: '#a88a52', price: 1420 },
  { id: 'carroceria', name: 'Color carrocería', hex: null, price: 1960 },
];

PC.calipers = [
  { id: 'negro', name: 'Negro', hex: '#1b1b1b', price: 0 },
  { id: 'rojo', name: 'Rojo', hex: '#c40d23', price: 860 },
  { id: 'plata', name: 'Plata', hex: '#b9bcbe', price: 860 },
  { id: 'verde-acido', name: 'Verde ácido', hex: '#a6d23a', price: 860 },
  { id: 'azul', name: 'Azul', hex: '#1d5fb5', price: 860 },
  { id: 'pccb', name: 'Amarillo · frenos cerámicos PCCB', hex: '#f2c40f', price: 9690 },
];

/* --------------------- HISTÓRICOS --------------------- */
PC.classics = [
  { name: '356', years: '1948–1965', engine: '1.1–2.0 bóxer 4 cil.', cv: '40–130', fact: 'El primer deportivo de la marca. Ligero, aerodinámico y con motor trasero refrigerado por aire.' },
  { name: '550 Spyder', years: '1953–1956', engine: '1.5 bóxer 4 cil.', cv: '110', fact: 'Barqueta de competición que ganó en su clase en Le Mans y la Carrera Panamericana.' },
  { name: '911 (original)', years: '1964–1973', engine: '2.0–2.4 bóxer 6 cil.', cv: '130–190', fact: 'Nació como 901; el nombre cambió a 911 antes de su lanzamiento comercial.' },
  { name: '912', years: '1965–1969', engine: '1.6 bóxer 4 cil.', cv: '90', fact: 'Versión de acceso del 911 con el motor de 4 cilindros del 356.' },
  { name: '914', years: '1969–1976', engine: '1.7–2.0 bóxer 4/6 cil.', cv: '80–110', fact: 'Primer modelo de motor central de serie, desarrollado junto a Volkswagen.' },
  { name: '917', years: '1969–1973', engine: '4.5–5.4 flat-12', cv: '520–1.100', fact: 'Dio a la marca su primera victoria absoluta en las 24 Horas de Le Mans (1970).' },
  { name: '911 Carrera RS 2.7', years: '1972–1973', engine: '2.7 bóxer 6 cil.', cv: '210', fact: 'Homologación con el famoso alerón "cola de pato". Uno de los 911 más cotizados.' },
  { name: '930 Turbo', years: '1975–1989', engine: '3.0–3.3 bóxer turbo 6 cil.', cv: '260–300', fact: 'Primer 911 Turbo de serie, con su icónico alerón "cola de ballena".' },
  { name: '924', years: '1976–1988', engine: '2.0 4 cil. en línea', cv: '125–177', fact: 'Primer modelo de motor delantero y refrigeración por agua.' },
  { name: '928', years: '1977–1995', engine: '4.5–5.4 V8', cv: '240–350', fact: 'Gran turismo V8; único deportivo elegido "Coche del Año en Europa" (1978).' },
  { name: '944', years: '1982–1991', engine: '2.5–3.0 4 cil.', cv: '163–250', fact: 'Evolución del 924 con aletas ensanchadas; un éxito de ventas de los 80.' },
  { name: '959', years: '1986–1988', engine: '2.85 bóxer biturbo 6 cil.', cv: '450', fact: 'Superdeportivo tecnológico con tracción total; ganó el París-Dakar de 1986.' },
  { name: '964', years: '1989–1994', engine: '3.6 bóxer 6 cil.', cv: '250–360', fact: 'Primer 911 Carrera 4 con tracción total y la caja Tiptronic.' },
  { name: '993', years: '1993–1998', engine: '3.6–3.8 bóxer 6 cil.', cv: '272–450', fact: 'El último 911 refrigerado por aire, muy buscado por coleccionistas.' },
  { name: 'Boxster (986)', years: '1996–2004', engine: '2.5–3.2 bóxer 6 cil.', cv: '204–260', fact: 'El roadster de motor central que salvó económicamente a la marca en los 90.' },
  { name: '996', years: '1997–2005', engine: '3.4–3.6 bóxer 6 cil.', cv: '300–483', fact: 'Primer 911 refrigerado por agua.' },
  { name: 'Carrera GT', years: '2003–2006', engine: '5.7 V10 atmosférico', cv: '612', fact: 'Superdeportivo de fibra de carbono con un V10 derivado de la competición.' },
  { name: '918 Spyder', years: '2013–2015', engine: '4.6 V8 + 2 motores eléctricos', cv: '887', fact: 'Hiperdeportivo híbrido enchufable; 918 unidades fabricadas.' },
];

PC.defaults = {
  color: 'guards-red',
  wheel: null, // se fija por familia
  size: null,
  finish: 'plata',
  caliper: 'negro',
  interior: 'negro',
  stitch: 'igual',
  top: 'negro',
};
