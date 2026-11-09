/* =====================================================================
   MOTOR DE MAQUETAS (SVG)
   Dibuja cada carrocería con el color, llantas, pinzas e interior
   elegidos. Todo es vectorial: nítido en cualquier pantalla y sin
   descargas, apto para usar sin conexión en el concesionario.
   ===================================================================== */
(function () {
  const PC = window.PC;
  let uid = 0;

  /* ---------- utilidades de color ---------- */
  function hexToRgb(h) {
    h = h.replace('#', '');
    return [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));
  }
  function rgbToHex(r) {
    return '#' + r.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  }
  // amt > 0 aclara, amt < 0 oscurece (−1..1)
  function shade(hex, amt) {
    const c = hexToRgb(hex);
    return rgbToHex(c.map((v) => (amt >= 0 ? v + (255 - v) * amt : v * (1 + amt))));
  }
  function luminance(hex) {
    const [r, g, b] = hexToRgb(hex);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  PC.shade = shade;
  PC.luminance = luminance;

  /* ---------- geometría de cada carrocería (vista lateral, frente a la izquierda) ----------
     fx/rx = eje delantero/trasero · wr = radio de rueda · cy = centro de rueda
     ar = radio del paso de rueda · sill = línea inferior                         */
  const S = {
    '911': {
      fx: 245, rx: 715, wr: 58, cy: 272, ar: 66, sill: 292,
      body: 'M92,280 C84,262 86,236 104,224 C130,208 180,200 250,196 C300,194 340,192 385,186 C430,150 470,122 520,114 C580,108 630,116 680,140 C740,166 800,182 860,196 C885,200 900,210 902,226 C905,250 900,272 892,290 L778,292 A66,66 0 1 0 652,292 L308,292 A66,66 0 1 0 182,292 L120,292 C104,292 96,288 92,280 Z',
      glass: 'M402,188 C440,154 478,130 522,123 C575,117 622,125 664,147 C688,160 698,172 690,182 L668,186 Z',
      pillars: ['M585,122 L600,186 L612,186 L598,123 Z'],
      roof: 'M500,121 C560,110 625,116 676,141 C700,153 712,168 708,184 L682,184 C676,166 650,146 600,134 C560,126 525,127 500,131 Z',
      doors: 'M392,192 C396,230 398,262 404,288 M612,190 C622,214 628,250 626,288',
      handle: [560, 206],
      head: 'M104,222 C118,206 148,202 166,206 C160,214 138,222 110,228 Z',
      tail: 'M846,196 L906,212 L906,224 L844,206 Z',
      mirror: 'M408,188 C404,176 420,170 436,172 L438,186 Z',
      wing: 'M790,170 L812,152 L900,150 L902,160 L820,164 L806,178 Z',
      wingRS: 'M760,166 L790,120 L800,120 L782,166 Z M770,118 L912,112 L914,126 L776,132 Z',
      sideIntake: null,
    },
    '718': {
      fx: 255, rx: 690, wr: 57, cy: 273, ar: 65, sill: 292,
      body: 'M100,282 C92,264 94,240 112,228 C140,212 190,204 255,200 C300,198 330,196 370,190 C410,156 450,132 495,126 C540,122 575,126 605,140 C650,160 700,176 760,184 C800,188 830,192 850,204 C862,214 864,250 858,290 L752,292 A65,65 0 1 0 628,292 L317,292 A65,65 0 1 0 193,292 L125,292 C110,292 102,288 100,282 Z',
      glass: 'M386,192 C420,162 454,140 496,134 C536,130 566,134 586,146 L594,190 Z',
      pillars: [],
      roof: 'M478,130 C530,124 572,128 600,142 C640,160 690,174 740,182 L740,190 L600,190 C594,166 570,148 520,146 C500,146 486,148 478,150 Z',
      doors: 'M378,196 C382,234 384,264 388,288 M590,192 C596,222 598,258 596,288',
      handle: [548, 210],
      head: 'M112,226 C126,210 156,206 176,210 C168,218 146,226 118,232 Z',
      tail: 'M800,190 L852,204 L854,214 L798,200 Z',
      mirror: 'M392,194 C388,182 404,176 420,178 L422,192 Z',
      wing: 'M760,178 L778,158 L860,156 L862,166 L786,170 L772,186 Z',
      sideIntake: 'M612,214 C640,206 664,210 676,222 L664,258 C646,250 628,250 614,252 Z',
    },
    taycan: {
      fx: 225, rx: 760, wr: 60, cy: 270, ar: 68, sill: 292,
      body: 'M80,282 C72,262 76,238 98,226 C130,212 190,206 260,202 C310,200 350,196 395,188 C440,150 490,124 550,118 C620,112 690,122 745,146 C800,170 850,186 895,196 C912,202 918,214 918,230 C918,256 912,276 904,290 L824,292 A68,68 0 1 0 696,292 L289,292 A68,68 0 1 0 161,292 L105,292 C90,292 82,288 80,282 Z',
      glass: 'M410,190 C450,156 495,132 552,126 C620,120 680,128 730,150 C758,163 768,176 758,186 Z',
      pillars: ['M575,126 L588,188 L600,188 L588,125 Z'],
      roof: null,
      doors: 'M398,194 C402,232 404,262 408,288 M594,192 C598,226 600,258 600,288 M760,188 C770,210 772,240 760,280',
      handle: [540, 206],
      head: 'M98,224 C112,212 140,206 162,208 C156,216 132,224 104,230 Z',
      tail: 'M860,190 L916,206 L918,214 L858,200 Z',
      mirror: 'M414,192 C410,180 426,174 442,176 L444,190 Z',
      wing: 'M836,182 L908,186 L912,194 L840,192 Z',
    },
    taycanST: {
      fx: 225, rx: 760, wr: 60, cy: 270, ar: 68, sill: 292,
      body: 'M80,282 C72,262 76,238 98,226 C130,212 190,206 260,202 C310,200 350,196 395,188 C440,150 490,124 550,118 C640,110 740,112 800,124 C842,134 872,170 895,194 C912,202 918,214 918,230 C918,256 912,276 904,290 L824,292 A68,68 0 1 0 696,292 L289,292 A68,68 0 1 0 161,292 L105,292 C90,292 82,288 80,282 Z',
      glass: 'M410,190 C450,156 495,132 552,126 C640,118 730,120 790,132 C820,140 840,162 848,184 Z',
      pillars: ['M575,126 L588,188 L600,188 L588,125 Z', 'M748,124 L756,188 L768,188 L760,124 Z'],
      roof: null,
      doors: 'M398,194 C402,232 404,262 408,288 M594,192 C598,226 600,258 600,288 M764,190 C770,214 772,244 762,282',
      handle: [540, 206],
      head: 'M98,224 C112,212 140,206 162,208 C156,216 132,224 104,230 Z',
      tail: 'M872,192 L916,206 L918,214 L870,202 Z',
      mirror: 'M414,192 C410,180 426,174 442,176 L444,190 Z',
      cladding: true,
    },
    panamera: {
      fx: 220, rx: 770, wr: 61, cy: 269, ar: 69, sill: 292,
      body: 'M78,280 C70,258 74,232 98,220 C130,206 190,198 260,194 C310,192 350,188 395,180 C440,140 490,112 552,106 C625,100 690,110 748,134 C805,160 855,178 898,188 C915,194 922,208 922,226 C922,254 916,276 906,290 L835,292 A69,69 0 1 0 705,292 L285,292 A69,69 0 1 0 155,292 L102,292 C88,292 80,288 78,280 Z',
      glass: 'M410,182 C450,146 496,120 554,114 C624,108 686,118 736,140 C766,154 776,168 766,178 Z',
      pillars: ['M582,113 L594,180 L606,180 L595,112 Z'],
      roof: null,
      doors: 'M398,186 C402,226 404,260 408,288 M600,184 C604,222 606,256 606,288 M770,180 C780,206 782,240 772,282',
      handle: [548, 200],
      head: 'M98,218 C114,206 144,200 166,202 C160,210 134,218 104,224 Z',
      tail: 'M862,184 L920,200 L922,210 L860,194 Z',
      mirror: 'M414,184 C410,172 426,166 442,168 L444,182 Z',
    },
    macan: {
      fx: 235, rx: 745, wr: 64, cy: 266, ar: 72, sill: 290,
      body: 'M84,276 C76,250 80,222 104,208 C136,192 196,184 265,180 C315,178 350,174 392,166 C430,128 470,102 525,96 C600,90 680,94 740,108 C790,122 840,146 880,166 C900,176 908,196 908,220 C908,250 902,272 894,288 L813,290 A72,72 0 1 0 677,290 L303,290 A72,72 0 1 0 167,290 L108,290 C94,290 86,284 84,276 Z',
      glass: 'M408,168 C440,134 476,110 528,104 C600,98 670,102 728,114 C770,124 800,140 812,160 L806,168 Z',
      pillars: ['M590,101 L598,168 L612,168 L604,100 Z', 'M744,116 L752,168 L764,168 L758,120 Z'],
      roof: null,
      doors: 'M396,172 C400,214 402,252 404,286 M606,170 C610,212 612,250 610,286 M776,166 C784,196 786,232 776,278',
      handle: [552, 190],
      head: 'M104,206 C120,194 150,188 174,190 C168,198 142,206 110,212 Z',
      tail: 'M842,160 L904,186 L906,196 L840,172 Z',
      mirror: 'M412,170 C408,158 424,152 440,154 L442,168 Z',
      cladding: true,
    },
    cayenne: {
      fx: 230, rx: 760, wr: 66, cy: 264, ar: 74, sill: 290,
      body: 'M80,272 C72,244 78,214 104,200 C138,184 200,176 270,172 C320,170 352,166 392,158 C428,120 466,94 520,86 C600,80 700,82 780,90 C830,96 862,110 885,140 C900,160 908,190 910,220 C910,250 904,272 896,288 L829,290 A74,74 0 1 0 691,290 L299,290 A74,74 0 1 0 161,290 L104,290 C90,290 82,282 80,272 Z',
      glass: 'M408,160 C440,126 474,100 522,94 C600,88 700,90 772,98 C810,104 836,118 850,150 L846,160 Z',
      pillars: ['M592,90 L600,160 L614,160 L606,89 Z', 'M772,98 L782,160 L796,160 L786,100 Z'],
      roof: null,
      doors: 'M396,164 C400,208 402,250 404,286 M608,162 C612,206 614,248 612,286 M800,162 C808,196 810,232 800,276',
      handle: [556, 182],
      head: 'M104,198 C120,186 152,180 178,182 C172,190 144,198 110,204 Z',
      tail: 'M864,152 L906,170 L908,182 L862,164 Z',
      mirror: 'M412,162 C408,150 424,144 440,146 L442,160 Z',
      cladding: true,
    },
    cayenneCoupe: {
      fx: 230, rx: 760, wr: 66, cy: 264, ar: 74, sill: 290,
      body: 'M80,272 C72,244 78,214 104,200 C138,184 200,176 270,172 C320,170 352,166 392,158 C428,120 466,94 520,86 C600,80 680,84 740,96 C800,110 850,140 885,170 C900,184 908,200 910,220 C910,250 904,272 896,288 L829,290 A74,74 0 1 0 691,290 L299,290 A74,74 0 1 0 161,290 L104,290 C90,290 82,282 80,272 Z',
      glass: 'M408,160 C440,126 474,100 522,94 C600,88 680,92 736,104 C780,116 812,134 828,158 L824,160 Z',
      pillars: ['M592,90 L600,160 L614,160 L606,89 Z', 'M744,106 L756,160 L770,160 L758,110 Z'],
      roof: null,
      doors: 'M396,164 C400,208 402,250 404,286 M608,162 C612,206 614,248 612,286 M792,164 C800,196 802,232 792,276',
      handle: [556, 182],
      head: 'M104,198 C120,186 152,180 178,182 C172,190 144,198 110,204 Z',
      tail: 'M872,164 L906,178 L908,190 L870,176 Z',
      mirror: 'M412,162 C408,150 424,144 440,146 L442,160 Z',
      cladding: true,
      wing: 'M830,150 L888,170 L886,176 L828,158 Z',
    },
  };
  PC.silhouettes = S;

  /* ---------- resolver la configuración a colores concretos ---------- */
  function resolve(model, cfg) {
    const color = PC.colors.find((c) => c.id === cfg.color) || PC.colors[0];
    const finish = PC.wheelFinishes.find((f) => f.id === cfg.finish) || PC.wheelFinishes[0];
    const design = PC.wheelDesigns.find((d) => d.id === cfg.wheel) || PC.wheelDesigns[0];
    const caliper = PC.calipers.find((c) => c.id === cfg.caliper) || PC.calipers[0];
    const interior = PC.interiors.find((i) => i.id === cfg.interior) || PC.interiors[0];
    const stitch = PC.stitches.find((s) => s.id === cfg.stitch) || PC.stitches[0];
    const top = PC.tops.find((t) => t.id === cfg.top) || PC.tops[0];
    const wheelHex = finish.hex || color.hex;
    const stitchHex = interior.stitchForce || stitch.hex || shade(interior.main, luminance(interior.main) > 0.5 ? -0.25 : 0.18);
    return { color, finish, design, caliper, interior, stitch, top, wheelHex, stitchHex, size: cfg.size || 20 };
  }
  PC.resolve = resolve;

  /* ---------- LLANTA ---------- */
  function spokeSet(style, rr, fill, stroke) {
    const rot = (n, path, offset = 0, f = fill) =>
      Array.from({ length: n }, (_, i) => `<path d="${path}" transform="rotate(${offset + (360 / n) * i})" fill="${f}" stroke="${f === fill ? stroke : 'none'}" stroke-width="0.6"/>`).join('');
    const h = rr * 0.2; // radio del buje
    const r = rr * 0.96;
    switch (style) {
      case 'tenSpoke':
        return rot(10, `M${-rr * 0.05},${-h} L${-rr * 0.035},${-r} L${rr * 0.035},${-r} L${rr * 0.05},${-h} Z`);
      case 'doubleFive':
        return rot(5, `M${-rr * 0.05},${-h} L${-rr * 0.03},${-r} L${rr * 0.035},${-r} L${rr * 0.035},${-h} Z`, -7) +
          rot(5, `M${-rr * 0.035},${-h} L${-rr * 0.035},${-r} L${rr * 0.03},${-r} L${rr * 0.05},${-h} Z`, 7);
      case 'yFive':
        return rot(5, `M${-rr * 0.07},${-h} L${-rr * 0.06},${-rr * 0.55} L${-rr * 0.2},${-r} L${-rr * 0.12},${-r} L0,${-rr * 0.62} L${rr * 0.12},${-r} L${rr * 0.2},${-r} L${rr * 0.06},${-rr * 0.55} L${rr * 0.07},${-h} Z`);
      case 'multi':
        return rot(20, `M${-rr * 0.022},${-h} L${-rr * 0.016},${-r} L${rr * 0.016},${-r} L${rr * 0.022},${-h} Z`);
      case 'turbine':
        return rot(10, `M${-rr * 0.06},${-h} C${-rr * 0.02},${-rr * 0.5} ${rr * 0.2},${-rr * 0.75} ${rr * 0.32},${-r * 0.93} L${rr * 0.44},${-r * 0.88} C${rr * 0.26},${-rr * 0.66} ${rr * 0.1},${-rr * 0.45} ${rr * 0.07},${-h} Z`) +
          `<circle r="${rr * 0.9}" fill="none" stroke="${fill}" stroke-width="${rr * 0.07}"/>`;
      case 'petal':
        return `<circle r="${rr * 0.62}" fill="${fill}"/>` +
          rot(5, `M${-rr * 0.2},${-rr * 0.5} C${-rr * 0.26},${-rr * 0.75} ${-rr * 0.18},${-r} 0,${-r} C${rr * 0.18},${-r} ${rr * 0.26},${-rr * 0.75} ${rr * 0.2},${-rr * 0.5} Z`) +
          rot(5, `M0,${-rr * 0.5} m${-rr * 0.07},0 a${rr * 0.07},${rr * 0.07} 0 1,0 ${rr * 0.14},0 a${rr * 0.07},${rr * 0.07} 0 1,0 ${-rr * 0.14},0`, 36, '#151515');
      case 'centerlock':
        return rot(10, `M${-rr * 0.045},${-h} L${-rr * 0.028},${-r} L${rr * 0.028},${-r} L${rr * 0.045},${-h} Z`) +
          `<polygon points="${Array.from({ length: 6 }, (_, i) => { const a = (Math.PI / 3) * i; return `${Math.cos(a) * rr * 0.17},${Math.sin(a) * rr * 0.17}`; }).join(' ')}" fill="#b4121f"/>`;
      case 'aeroDisc':
        return `<circle r="${r}" fill="${fill}"/>` +
          rot(5, `M${rr * 0.1},${-rr * 0.32} C${rr * 0.3},${-rr * 0.5} ${rr * 0.32},${-rr * 0.72} ${rr * 0.22},${-rr * 0.86} L${rr * 0.12},${-rr * 0.86} C${rr * 0.2},${-rr * 0.7} ${rr * 0.16},${-rr * 0.5} ${rr * 0.02},${-rr * 0.36} Z`, 0, '#141414');
      default:
        return '';
    }
  }

  // Dibuja una rueda completa centrada en (cx, cy) con radio exterior R
  function wheel(cx, cy, R, rs, opts = {}) {
    const ratio = { 18: 0.64, 19: 0.67, 20: 0.7, 21: 0.73, 22: 0.76 }[rs.size] || 0.7;
    const rr = R * ratio;
    const f = rs.wheelHex;
    const dark = shade(f, -0.45);
    const light = shade(f, 0.35);
    const edge = luminance(f) > 0.4 ? shade(f, -0.3) : shade(f, 0.2);
    const id = 'w' + ++uid;
    // pinza de freno: sector anular arriba-detrás del eje
    const a1 = -62, a2 = -18;
    const p = (r, a) => `${(Math.cos((a * Math.PI) / 180) * r).toFixed(2)},${(Math.sin((a * Math.PI) / 180) * r).toFixed(2)}`;
    const c1 = rr * 0.6, c2 = rr * 0.86;
    const caliper = `<path d="M${p(c1, a1)} A${c1},${c1} 0 0 1 ${p(c1, a2)} L${p(c2, a2)} A${c2},${c2} 0 0 0 ${p(c2, a1)} Z" fill="${rs.caliper.hex}" stroke="${shade(rs.caliper.hex, -0.4)}" stroke-width="1"/>`;
    return `<g transform="translate(${cx},${cy})${opts.spin ? ' rotate(' + opts.spin + ')' : ''}">
      <defs><radialGradient id="${id}g" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stop-color="${light}"/><stop offset="0.55" stop-color="${f}"/><stop offset="1" stop-color="${dark}"/></radialGradient></defs>
      <circle r="${R}" fill="#121212"/>
      <circle r="${R * 0.97}" fill="none" stroke="#262626" stroke-width="${R * 0.03}"/>
      <circle r="${R * 0.86}" fill="none" stroke="#1d1d1d" stroke-width="1"/>
      <circle r="${rr}" fill="${dark}"/>
      <circle r="${rr * 0.92}" fill="#2a2b2d"/>
      <circle r="${rr * 0.78}" fill="#7b7e81"/>
      <circle r="${rr * 0.74}" fill="none" stroke="#5c5f62" stroke-width="${rr * 0.04}" stroke-dasharray="2 3"/>
      <circle r="${rr * 0.3}" fill="#45474a"/>
      ${caliper}
      ${spokeSet(rs.design.style, rr, `url(#${id}g)`, edge)}
      <circle r="${rr}" fill="none" stroke="${light}" stroke-width="${rr * 0.05}"/>
      <circle r="${rr * 0.96}" fill="none" stroke="${dark}" stroke-width="${rr * 0.02}"/>
      ${rs.design.style === 'centerlock' ? '' : `<circle r="${rr * 0.14}" fill="#151515" stroke="${light}" stroke-width="${rr * 0.02}"/><circle r="${rr * 0.06}" fill="${shade(f, 0.15)}"/>`}
    </g>`;
  }
  PC.wheelSVG = wheel;

  /* ---------- VISTA LATERAL ---------- */
  function side(model, cfg, o = {}) {
    const s = S[model.silhouette];
    const rs = resolve(model, cfg);
    const id = 's' + ++uid;
    const paint = rs.color.hex;
    const isMetal = rs.color.tier === 'metal' || /metalizado/i.test(rs.color.name);
    const lum = luminance(paint);
    const lift = model.lifted ? -8 : 0;
    const env = o.env || 'studio';
    const reflect = env === 'night' ? 0.18 : 0.38;

    const roofSoft = model.roof === 'soft' && s.roof;
    const roofTarga = model.roof === 'targa';
    const glassFill = env === 'night' ? '#0a0d12' : `url(#${id}glass)`;

    const wing = model.wing === 'rs' && s.wingRS ? s.wingRS : model.wing && s.wing ? s.wing : null;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 40 920 320" class="car-svg" role="img" aria-label="Maqueta lateral de ${model.name} en ${rs.color.name}">
    <defs>
      <linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity="${reflect}"/>
        <stop offset="0.32" stop-color="#fff" stop-opacity="${isMetal ? 0.12 : 0.05}"/>
        <stop offset="0.5" stop-color="#000" stop-opacity="0"/>
        <stop offset="0.78" stop-color="#000" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#000" stop-opacity="0.5"/>
      </linearGradient>
      <linearGradient id="${id}h" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#000" stop-opacity="0.22"/>
        <stop offset="0.2" stop-color="#000" stop-opacity="0"/>
        <stop offset="0.55" stop-color="#fff" stop-opacity="${isMetal ? 0.16 : 0.06}"/>
        <stop offset="0.85" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity="0.25"/>
      </linearGradient>
      <linearGradient id="${id}glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3b4654"/><stop offset="0.45" stop-color="#121820"/><stop offset="0.6" stop-color="#29323d"/><stop offset="1" stop-color="#0b0f14"/>
      </linearGradient>
      <radialGradient id="${id}sh" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#000" stop-opacity="0.55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <clipPath id="${id}c"><path d="${s.body}"/></clipPath>
      ${isMetal ? `<filter id="${id}flake" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.09 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>` : ''}
    </defs>
    <ellipse cx="500" cy="334" rx="440" ry="16" fill="url(#${id}sh)"/>
    <g transform="translate(0,${lift})">
      <path d="${s.body}" fill="${paint}"/>
      <g clip-path="url(#${id}c)">
        <rect x="40" y="40" width="920" height="320" fill="url(#${id}v)"/>
        <rect x="40" y="40" width="920" height="320" fill="url(#${id}h)"/>
        ${isMetal ? `<rect x="40" y="40" width="920" height="320" fill="${paint}" filter="url(#${id}flake)"/>` : ''}
        <path d="M60,${s.sill - 30} C300,${s.sill - 44} 700,${s.sill - 44} 940,${s.sill - 30}" stroke="#fff" stroke-opacity="${lum > 0.6 ? 0.25 : 0.14}" stroke-width="2" fill="none"/>
        <rect x="40" y="${s.sill - 8}" width="920" height="40" fill="${s.cladding ? '#1a1b1d' : '#000'}" opacity="${s.cladding ? 0.85 : 0.25}"/>
        ${s.cladding ? `<path d="M${s.fx - s.ar - 4},${s.sill} A${s.ar + 8},${s.ar + 8} 0 1 1 ${s.fx + s.ar + 4},${s.sill} M${s.rx - s.ar - 4},${s.sill} A${s.ar + 8},${s.ar + 8} 0 1 1 ${s.rx + s.ar + 4},${s.sill}" stroke="#1a1b1d" stroke-width="12" fill="none"/>` : ''}
      </g>
      <path d="${s.body}" fill="none" stroke="${shade(paint, -0.5)}" stroke-width="1.2"/>
      <path d="${s.glass}" fill="${glassFill}" stroke="#05070a" stroke-width="2"/>
      <path d="${s.glass}" fill="none" stroke="#fff" stroke-opacity="0.08" stroke-width="5"/>
      ${s.pillars.map((pp) => `<path d="${pp}" fill="#0b0d10"/>`).join('')}
      ${roofSoft ? `<path d="${s.roof}" fill="${rs.top.hex}" stroke="${shade(rs.top.hex, -0.4)}" stroke-width="1.5"/><path d="${s.roof}" fill="url(#${id}v)" opacity="0.6"/>` : ''}
      ${roofTarga ? `<path d="M576,120 C590,118 606,120 614,123 L636,186 L604,186 Z" fill="#c9ccce" stroke="#7d8184" stroke-width="1"/><text x="606" y="160" font-size="7" fill="#555" transform="rotate(68 606 160)" font-family="sans-serif" letter-spacing="1">TARGA</text>` : ''}
      <path d="${s.doors}" fill="none" stroke="${shade(paint, -0.55)}" stroke-width="1.4" opacity="0.8"/>
      <rect x="${s.handle[0]}" y="${s.handle[1]}" width="34" height="5" rx="2.5" fill="${shade(paint, -0.35)}"/>
      ${s.sideIntake ? `<path d="${s.sideIntake}" fill="#0c0d0f"/>` : ''}
      <path d="${s.mirror}" fill="${paint}" stroke="${shade(paint, -0.5)}" stroke-width="1"/>
      <path d="${s.head}" fill="#e9eef3" stroke="#6c7480" stroke-width="1"/>
      <path d="${s.head}" fill="#9fd3ff" opacity="${env === 'night' ? 0.55 : 0.15}"/>
      <g clip-path="url(#${id}c)"><path d="${s.tail}" fill="#b0101e"/>
      ${env === 'night' ? `<path d="${s.tail}" fill="#ff2a3a" opacity="0.9"/>` : ''}</g>
      ${wing ? `<path d="${wing}" fill="${model.wing === 'rs' ? '#141414' : shade(paint, -0.1)}" stroke="#000" stroke-opacity="0.5"/>` : ''}
      ${model.lifted ? `<path d="M${s.fx - 70},${s.sill + 2} L${s.rx + 70},${s.sill + 2}" stroke="#1a1b1d" stroke-width="8"/>` : ''}
    </g>
    ${wheel(s.fx, s.cy, s.wr, rs, { spin: 12 })}
    ${wheel(s.rx, s.cy, s.wr, rs, { spin: 40 })}
    ${env === 'night' ? `<path d="M90,${222 + lift} L-60,250 L-60,300 Z" fill="#cfe8ff" opacity="0.08"/>` : ''}
  </svg>`;
    return svg;
  }
  PC.renderSide = side;

  /* ---------- VISTA FRONTAL ---------- */
  function front(model, cfg, o = {}) {
    const rs = resolve(model, cfg);
    const id = 'f' + ++uid;
    const paint = rs.color.hex;
    const fam = model.family;
    const suv = fam === 'macan' || fam === 'cayenne';
    const sport = fam === '911' || fam === '718';
    const hw = suv ? 300 : 315; // media anchura
    const roofY = suv ? 70 : fam === 'panamera' ? 102 : fam === 'taycan' ? 112 : 118;
    const beltY = suv ? 178 : 200;
    const hoodY = suv ? 205 : 228;
    const botY = suv ? 310 : 312;
    const c = 500;
    const body = `M${c - hw + 30},${botY} C${c - hw},${botY - 10} ${c - hw - 6},${hoodY + 40} ${c - hw + 4},${hoodY + 6}
      C${c - hw + 20},${hoodY - (sport ? 22 : 8)} ${c - hw + 90},${hoodY - (sport ? 22 : 10)} ${c - 150},${hoodY - 2}
      C${c - 60},${hoodY + 6} ${c + 60},${hoodY + 6} ${c + 150},${hoodY - 2}
      C${c + hw - 90},${hoodY - (sport ? 22 : 10)} ${c + hw - 20},${hoodY - (sport ? 22 : 8)} ${c + hw - 4},${hoodY + 6}
      C${c + hw + 6},${hoodY + 40} ${c + hw},${botY - 10} ${c + hw - 30},${botY} Z`;
    const cabin = `M${c - hw + 78},${hoodY - 6} L${c - hw + 150},${roofY + 6} Q${c},${roofY - 10} ${c + hw - 150},${roofY + 6} L${c + hw - 78},${hoodY - 6} Z`;
    const wind = `M${c - hw + 98},${hoodY - 10} L${c - hw + 158},${roofY + 14} Q${c},${roofY} ${c + hw - 158},${roofY + 14} L${c + hw - 98},${hoodY - 10} Z`;
    let lights;
    if (sport) {
      lights = [-1, 1].map((sg) => `<ellipse cx="${c + sg * (hw - 78)}" cy="${hoodY + 8}" rx="40" ry="26" fill="#dfe6ed" stroke="#555" stroke-width="2"/>
        ${[0, 1, 2, 3].map((i) => `<circle cx="${c + sg * (hw - 78) + (i % 2 ? 9 : -9)}" cy="${hoodY + 8 + (i > 1 ? 8 : -8)}" r="5" fill="#fff" stroke="#9fd3ff" stroke-width="1.5"/>`).join('')}`).join('');
    } else {
      lights = [-1, 1].map((sg) => `<path d="M${c + sg * (hw - 30)},${hoodY + 18} L${c + sg * (hw - 120)},${hoodY + 28} L${c + sg * (hw - 118)},${hoodY + 44} L${c + sg * (hw - 34)},${hoodY + 38} Z" fill="#dfe6ed" stroke="#555" stroke-width="2"/>
        ${[0, 1, 2, 3].map((i) => `<rect x="${c + sg * (hw - 60) - (sg > 0 ? 0 : 0) + (i % 2 ? 6 : -10)}" y="${hoodY + 26 + (i > 1 ? 6 : -2)}" width="5" height="4" fill="#fff"/>`).join('')}`).join('');
    }
    const electric = model.fuel === 'Eléctrico';
    const intakes = `
      <path d="M${c - 150},${botY - 52} L${c + 150},${botY - 52} L${c + 130},${botY - 16} L${c - 130},${botY - 16} Z" fill="${electric ? shade(paint, -0.15) : '#0d0e10'}" stroke="#000" stroke-opacity="0.5"/>
      ${electric ? '' : Array.from({ length: 6 }, (_, i) => `<line x1="${c - 135}" y1="${botY - 46 + i * 5}" x2="${c + 135}" y2="${botY - 46 + i * 5}" stroke="#222" stroke-width="1.5"/>`).join('')}
      ${[-1, 1].map((sg) => `<path d="M${c + sg * 170},${botY - 60} L${c + sg * (hw - 30)},${botY - 66} L${c + sg * (hw - 40)},${botY - 18} L${c + sg * 160},${botY - 16} Z" fill="#0d0e10"/>`).join('')}
      <rect x="${c - 52}" y="${botY - 92}" width="104" height="24" rx="2" fill="#f4f4f4" stroke="#999"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="120 20 760 350" class="car-svg" role="img" aria-label="Maqueta frontal de ${model.name}">
      <defs>
        <linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.35"/><stop offset="0.45" stop-color="#fff" stop-opacity="0.03"/><stop offset="1" stop-color="#000" stop-opacity="0.45"/></linearGradient>
        <linearGradient id="${id}h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0.35"/><stop offset="0.25" stop-color="#000" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.12"/><stop offset="0.75" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.35"/></linearGradient>
        <linearGradient id="${id}g" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#4a5664"/><stop offset="0.5" stop-color="#121820"/><stop offset="1" stop-color="#232b35"/></linearGradient>
        <radialGradient id="${id}sh" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#000" stop-opacity="0.6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      </defs>
      <ellipse cx="${c}" cy="${botY + 34}" rx="${hw + 40}" ry="16" fill="url(#${id}sh)"/>
      ${[-1, 1].map((sg) => `<rect x="${c + sg * (hw - 62) - 34}" y="${botY - 40}" width="68" height="${74}" rx="10" fill="#121212"/>`).join('')}
      <path d="${cabin}" fill="${paint}"/><path d="${cabin}" fill="url(#${id}v)"/>
      <path d="${wind}" fill="url(#${id}g)" stroke="#05070a" stroke-width="2"/>
      ${model.roof === 'soft' ? `<path d="M${c - hw + 158},${roofY + 14} Q${c},${roofY} ${c + hw - 158},${roofY + 14} L${c + hw - 152},${roofY + 6} Q${c},${roofY - 10} ${c - hw + 152},${roofY + 6} Z" fill="${rs.top.hex}"/>` : ''}
      ${[-1, 1].map((sg) => `<path d="M${c + sg * (hw - 70)},${hoodY - 12} L${c + sg * (hw + 8)},${hoodY - 22} L${c + sg * (hw + 10)},${hoodY - 2} L${c + sg * (hw - 66)},${hoodY + 2} Z" fill="${paint}" stroke="${shade(paint, -0.5)}"/>`).join('')}
      <path d="${body}" fill="${paint}"/>
      <path d="${body}" fill="url(#${id}v)"/><path d="${body}" fill="url(#${id}h)"/>
      <path d="${body}" fill="none" stroke="${shade(paint, -0.5)}" stroke-width="1.2"/>
      <path d="M${c - 150},${hoodY + 2} C${c - 60},${hoodY + 10} ${c + 60},${hoodY + 10} ${c + 150},${hoodY + 2}" stroke="${shade(paint, -0.4)}" fill="none"/>
      ${lights}
      ${intakes}
      ${!sport ? `<path d="M${c - hw + 40},${hoodY + 4} L${c + hw - 40},${hoodY + 4}" stroke="${shade(paint, -0.3)}" stroke-width="1"/>` : ''}
    </svg>`;
  }
  PC.renderFront = front;

  /* ---------- VISTA INTERIOR ---------- */
  function interior(model, cfg) {
    const rs = resolve(model, cfg);
    const id = 'i' + ++uid;
    const m = rs.interior.main;
    const a = rs.interior.accent;
    const st = rs.stitchHex;
    const leather = (base) => `url(#${id}${base === m ? 'lm' : 'la'})`;
    const ev = model.fuel === 'Eléctrico';
    const seat = (x, flip) => {
      const sg = flip ? -1 : 1;
      const X = (v) => x + sg * v;
      return `<g>
        <path d="M${X(-150)},560 L${X(-140)},360 C${X(-138)},300 ${X(-110)},270 ${X(-60)},266 L${X(60)},266 C${X(110)},270 ${X(138)},300 ${X(140)},360 L${X(150)},560 Z" fill="${leather(m)}" stroke="#000" stroke-opacity="0.5" stroke-width="2"/>
        <path d="M${X(-62)},560 L${X(-58)},330 C${X(-56)},306 ${X(-40)},296 ${X(-20)},296 L${X(20)},296 C${X(40)},296 ${X(56)},306 ${X(58)},330 L${X(62)},560 Z" fill="${leather(a)}"/>
        ${[340, 380, 420, 460, 500].map((yy) => `<line x1="${X(-58)}" y1="${yy}" x2="${X(58)}" y2="${yy}" stroke="${st}" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.9"/>`).join('')}
        <path d="M${X(-62)},560 L${X(-58)},330 C${X(-56)},306 ${X(-40)},296 ${X(-20)},296 L${X(20)},296 C${X(40)},296 ${X(56)},306 ${X(58)},330 L${X(62)},560" fill="none" stroke="${st}" stroke-width="1.6" stroke-dasharray="5 3"/>
        <ellipse cx="${X(0)}" cy="285" rx="34" ry="10" fill="#000" opacity="0.25"/>
        <path d="M${X(-130)},300 C${X(-118)},280 ${X(-96)},272 ${X(-70)},270" stroke="#fff" stroke-opacity="0.15" stroke-width="5" fill="none"/>
      </g>`;
    };
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" class="car-svg interior" role="img" aria-label="Interior de ${model.name} en ${rs.interior.name}">
      <defs>
        <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb7d9"/><stop offset="0.7" stop-color="#d9e6ee"/><stop offset="1" stop-color="#b8c2c8"/></linearGradient>
        <linearGradient id="${id}lm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(m, 0.18)}"/><stop offset="0.5" stop-color="${m}"/><stop offset="1" stop-color="${shade(m, -0.35)}"/></linearGradient>
        <linearGradient id="${id}la" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(a, 0.18)}"/><stop offset="0.5" stop-color="${a}"/><stop offset="1" stop-color="${shade(a, -0.35)}"/></linearGradient>
        <linearGradient id="${id}scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1622"/><stop offset="1" stop-color="#05080c"/></linearGradient>
      </defs>
      <rect width="1000" height="560" fill="${shade(m, -0.55)}"/>
      <path d="M150,40 L850,40 L960,230 L40,230 Z" fill="url(#${id}sky)"/>
      <path d="M40,230 C200,200 300,190 500,190 C700,190 800,200 960,230" fill="#9aa7ae" opacity="0.4"/>
      <path d="M0,0 L150,40 L40,230 L0,250 Z" fill="${shade(m, -0.4)}"/>
      <path d="M1000,0 L850,40 L960,230 L1000,250 Z" fill="${shade(m, -0.4)}"/>
      <rect x="0" y="0" width="1000" height="40" fill="${shade(m, -0.3)}"/>
      <path d="M0,230 C200,206 340,198 500,198 C660,198 800,206 1000,230 L1000,300 L0,300 Z" fill="${leather(m)}"/>
      <path d="M0,232 C200,208 340,200 500,200 C660,200 800,208 1000,232" fill="none" stroke="${st}" stroke-width="1.6" stroke-dasharray="6 4"/>
      <path d="M0,292 C200,280 340,276 500,276 C660,276 800,280 1000,292 L1000,360 L0,360 Z" fill="${leather(a)}"/>
      <path d="M0,294 C200,282 340,278 500,278 C660,278 800,282 1000,294" fill="none" stroke="${st}" stroke-width="1.4" stroke-dasharray="6 4"/>
      <rect x="0" y="288" width="1000" height="5" fill="#8b8f93" opacity="0.6"/>
      ${[-1, 1].map((sg) => `<path d="M${500 + sg * 500},250 L${500 + sg * 420},300 L${500 + sg * 430},520 L${500 + sg * 500},560 Z" fill="${leather(m)}"/><path d="M${500 + sg * 470},300 L${500 + sg * 430},320 L${500 + sg * 436},420 L${500 + sg * 478},430 Z" fill="${leather(a)}"/>`).join('')}
      <path d="M190,214 C230,186 380,186 420,214 L412,262 C380,248 230,248 198,262 Z" fill="url(#${id}scr)" stroke="#000" stroke-width="2"/>
      ${ev
        ? `<rect x="214" y="208" width="180" height="40" rx="6" fill="#0e2234"/><text x="304" y="234" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#cfe8ff">128 km/h</text><rect x="224" y="240" width="${ev ? 120 : 0}" height="3" fill="#3fd0a0"/>`
        : [250, 305, 360].map((gx, i) => `<circle cx="${gx}" cy="232" r="${i === 1 ? 24 : 18}" fill="#0a0a0a" stroke="#666" stroke-width="2"/><line x1="${gx}" y1="232" x2="${gx + (i === 1 ? 14 : 10)}" y2="${232 - (i === 1 ? 14 : 8)}" stroke="#e33" stroke-width="2"/>`).join('')}
      <path d="M440,210 L560,210 L556,270 L444,270 Z" fill="url(#${id}scr)" stroke="#000" stroke-width="2"/>
      <rect x="452" y="220" width="96" height="40" rx="3" fill="#0f1d2b"/>
      <rect x="458" y="226" width="40" height="28" rx="2" fill="${rs.color.hex}" opacity="0.85"/>
      <rect x="504" y="228" width="38" height="4" fill="#5a7a96"/><rect x="504" y="238" width="30" height="4" fill="#5a7a96"/><rect x="504" y="248" width="34" height="4" fill="#5a7a96"/>
      <circle cx="305" cy="330" r="112" fill="none" stroke="#141414" stroke-width="24"/>
      <circle cx="305" cy="330" r="112" fill="none" stroke="${st}" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.7"/>
      <path d="M200,345 L410,345 L380,380 L230,380 Z" fill="#191919"/>
      <circle cx="305" cy="360" r="30" fill="#1d1d1d"/>
      <rect x="301" y="216" width="8" height="10" fill="#d10f1f"/>
      <path d="M400,560 L430,340 C440,320 560,320 570,340 L600,560 Z" fill="${leather(a)}" stroke="#000" stroke-opacity="0.4"/>
      <path d="M430,340 C440,320 560,320 570,340" fill="none" stroke="${st}" stroke-width="1.5" stroke-dasharray="5 3"/>
      <rect x="470" y="370" width="60" height="70" rx="10" fill="#1a1a1a" stroke="#555"/>
      <rect x="490" y="382" width="20" height="44" rx="8" fill="#2c2c2c"/>
      ${seat(170, false)}
      ${seat(830, true)}
    </svg>`;
  }
  PC.renderInterior = interior;

  /* ---------- DETALLE LLANTA ---------- */
  function wheelDetail(model, cfg) {
    const rs = resolve(model, cfg);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" class="car-svg" role="img" aria-label="Llanta ${rs.design.name} ${rs.size} pulgadas">
      <defs><radialGradient id="wd${++uid}" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#000" stop-opacity="0.45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="300" cy="392" rx="200" ry="14" fill="url(#wd${uid})"/>
      ${wheel(300, 205, 180, rs, { spin: 0 })}
      <text x="300" y="414" text-anchor="middle" font-size="13" fill="currentColor" opacity="0.6" font-family="inherit">${rs.design.name} · ${rs.size}" · ${rs.finish.name}</text>
    </svg>`;
  }
  PC.renderWheelDetail = wheelDetail;

  // miniatura de llanta para el selector
  PC.renderWheelThumb = function (designId, finishHex, caliperHex) {
    const design = PC.wheelDesigns.find((d) => d.id === designId);
    const rs = { design, wheelHex: finishHex, caliper: { hex: caliperHex }, size: 20 };
    return `<svg viewBox="-52 -52 104 104" aria-hidden="true">${wheel(0, 0, 50, rs)}</svg>`;
  };
})();
