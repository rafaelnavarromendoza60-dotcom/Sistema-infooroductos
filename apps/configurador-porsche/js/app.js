/* =====================================================================
   APP · navegación, estado del configurador, precios y guardado
   ===================================================================== */
(function () {
  const PC = window.PC;
  const $app = document.getElementById('app');
  const eur = (n) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const plus = (n) => (n ? '+ ' + eur(n) : 'Incluido');
  const byId = (list, id) => list.find((x) => x.id === id);

  /* ---------- almacenamiento local (tolerante a modo privado) ---------- */
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } },
  };

  /* ---------- estado ---------- */
  const state = {
    view: 'modelos',
    fam: 'todos',
    fuel: 'todos',
    q: '',
    modelId: '911-carrera-s',
    cfg: null,
    step: 'exterior',
    stageView: 'side',
    env: store.get('pc.env', 'studio'),
    compare: store.get('pc.compare', []),
    saved: store.get('pc.saved', []),
    client: '',
    vsA: null,
    vsB: null,
  };

  function defaultCfg(model) {
    const wf = PC.wheelsByFamily[model.family];
    const d = { ...PC.defaults, wheel: wf.designs[0], size: wf.base };
    if (model.gt) { d.wheel = wf.designs.includes('gt-forged') ? 'gt-forged' : wf.designs[0]; d.size = wf.sizes[wf.sizes.length - 1]; }
    if (model.turbo) { d.wheel = wf.designs.includes('turbo-aero') ? 'turbo-aero' : d.wheel; d.size = wf.sizes[wf.sizes.length - 1]; d.caliper = 'pccb'; }
    if (model.fuel === 'Eléctrico' && model.family !== 'cayenne') d.caliper = 'verde-acido';
    if (model.gt) d.interior = 'racetex-rojo';
    return d;
  }
  const model = () => byId(PC.models, state.modelId);
  if (!state.cfg) state.cfg = defaultCfg(model());

  /* ---------- precio ---------- */
  function priceLines(m, c) {
    const wf = PC.wheelsByFamily[m.family];
    const color = byId(PC.colors, c.color);
    const tier = byId(PC.colorTiers, color.tier);
    const design = byId(PC.wheelDesigns, c.wheel);
    const finish = byId(PC.wheelFinishes, c.finish);
    const cal = byId(PC.calipers, c.caliper);
    const int = byId(PC.interiors, c.interior);
    const sti = byId(PC.stitches, c.stitch);
    const top = byId(PC.tops, c.top);
    const lines = [
      { k: 'Modelo', v: m.name, sub: `${m.body} · ${m.engine}`, p: m.price },
      { k: 'Pintura', v: color.name, sub: tier.name, p: tier.price },
      { k: 'Llantas', v: `${design.name} ${c.size}"`, sub: design.desc, p: design.price + Math.max(0, c.size - wf.base) * PC.sizeStepPrice },
      { k: 'Acabado llantas', v: finish.name, p: finish.price },
      { k: 'Pinzas de freno', v: cal.name, p: cal.price },
      { k: 'Interior', v: int.name, sub: int.group, p: int.price },
      { k: 'Costuras', v: int.stitchForce ? 'Incluidas en el paquete' : sti.name, p: int.stitchForce ? 0 : sti.price },
    ];
    if (m.roof === 'soft') lines.splice(2, 0, { k: 'Capota', v: top.name, p: top.price });
    return lines;
  }
  const total = (m, c) => priceLines(m, c).reduce((s, l) => s + l.p, 0);

  /* ---------- compartir por enlace ---------- */
  function encode() {
    return btoa(unescape(encodeURIComponent(JSON.stringify({ m: state.modelId, c: state.cfg }))));
  }
  function readHash() {
    const h = location.hash.match(/c=([^&]+)/);
    if (!h) return;
    try {
      const o = JSON.parse(decodeURIComponent(escape(atob(h[1]))));
      if (byId(PC.models, o.m)) { state.modelId = o.m; state.cfg = { ...defaultCfg(model()), ...o.c }; state.view = 'configurar'; }
    } catch { /* enlace inválido */ }
  }

  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2200);
  }

  const fuelPill = (f) => `<span class="pill ${f === 'Eléctrico' ? 'ev' : f === 'Híbrido' ? 'hy' : ''}">${f}</span>`;

  /* =================================================================
     VISTA: MODELOS
     ================================================================= */
  function viewModelos() {
    const q = state.q.trim().toLowerCase();
    const list = PC.models.filter((m) =>
      (state.fam === 'todos' || m.family === state.fam) &&
      (state.fuel === 'todos' || m.fuel === state.fuel) &&
      (!q || (m.name + ' ' + m.body + ' ' + m.engine).toLowerCase().includes(q)));
    const fams = PC.families.filter((f) => list.some((m) => m.family === f.id));
    return `<div class="wrap">
      <div class="hero">
        <div>
          <div class="eyebrow">Gama actual · ${PC.models.length} versiones</div>
          <h1>Elige tu modelo</h1>
          <p class="lead">Selecciona una versión para personalizar pintura, llantas, pinzas e interior y ver cómo queda antes de firmar el pedido.</p>
        </div>
        <button class="btn ghost small" data-act="theme">Modo claro / oscuro</button>
      </div>
      <div class="filters" role="toolbar" aria-label="Filtros">
        ${['todos', ...PC.families.map((f) => f.id)].map((f) => `<button class="chip ${state.fam === f ? 'is-on' : ''}" data-fam="${f}">${f === 'todos' ? 'Todos' : byId(PC.families, f).name}</button>`).join('')}
        <span class="sep"></span>
        ${['todos', 'Gasolina', 'Híbrido', 'Eléctrico'].map((f) => `<button class="chip ${state.fuel === f ? 'is-on' : ''}" data-fuel="${f}">${f === 'todos' ? 'Toda propulsión' : f}</button>`).join('')}
        <input class="search" type="search" placeholder="Buscar: GTS, Cabriolet, Turbo…" value="${state.q.replace(/"/g, '&quot;')}" data-search aria-label="Buscar modelo">
      </div>
      ${fams.length ? fams.map((f) => `<section class="family">
        <div class="family-head"><h2>${f.name}</h2><span class="pill">${f.tag}</span><p>${f.desc}</p></div>
        <div class="grid">${list.filter((m) => m.family === f.id).map(card).join('')}</div>
      </section>`).join('') : `<div class="empty">No hay modelos con esos filtros.</div>`}
    </div>`;
  }
  function card(m) {
    const c = defaultCfg(m);
    const inCmp = state.compare.includes(m.id);
    return `<article class="card">
      <div class="card-img" data-open="${m.id}" title="Configurar ${m.name}">${PC.renderSide(m, c, { env: 'studio' })}</div>
      <div class="card-body">
        <div class="card-title"><h3>${m.name}</h3>${fuelPill(m.fuel)}</div>
        <div class="specs">
          <div class="spec"><b>${m.cv.toLocaleString('es-ES')}</b><span>CV</span></div>
          <div class="spec"><b>${m.acc.toLocaleString('es-ES')} s</b><span>0-100 km/h</span></div>
          <div class="spec"><b>${m.vmax}</b><span>km/h máx.</span></div>
        </div>
        <div class="card-foot">
          <div class="price">Desde<br><b>${eur(m.price)}</b></div>
          <label class="cmp-toggle"><input type="checkbox" data-cmp="${m.id}" ${inCmp ? 'checked' : ''}> Comparar</label>
          <button class="btn red small" data-open="${m.id}">Configurar</button>
        </div>
      </div>
    </article>`;
  }

  /* =================================================================
     VISTA: CONFIGURADOR
     ================================================================= */
  const STEPS = [
    ['exterior', 'Pintura'],
    ['llantas', 'Llantas'],
    ['frenos', 'Frenos'],
    ['interior', 'Interior'],
    ['resumen', 'Resumen'],
  ];
  function stageSVG(m, c, v = state.stageView) {
    if (v === 'front') return PC.renderFront(m, c, { env: state.env });
    if (v === 'interior') return PC.renderInterior(m, c);
    if (v === 'wheel') return PC.renderWheelDetail(m, c);
    return PC.renderSide(m, c, { env: state.env });
  }
  function viewConfigurar() {
    const m = model();
    const c = state.cfg;
    const rs = PC.resolve(m, c);
    const tot = total(m, c);
    return `<div class="cfg">
      <section class="stage" data-env="${state.env}" aria-label="Vista previa">
        <div class="stage-top">
          <div class="stage-title">
            <div class="eyebrow">${byId(PC.families, m.family).name} · ${m.body}</div>
            <h1>${m.name}</h1>
            <p>${m.cv.toLocaleString('es-ES')} CV · 0-100 en ${m.acc.toLocaleString('es-ES')} s · ${m.vmax} km/h · ${m.engine}</p>
          </div>
          <div class="stage-controls">
            <div class="seg" role="tablist" aria-label="Vista">
              ${[['side', 'Lateral'], ['front', 'Frontal'], ['interior', 'Interior'], ['wheel', 'Llanta']].map(([k, l]) => `<button class="${state.stageView === k ? 'is-on' : ''}" data-view="${k}">${l}</button>`).join('')}
            </div>
            <div class="seg" aria-label="Ambiente">
              ${[['studio', 'Estudio'], ['day', 'Exterior'], ['night', 'Noche']].map(([k, l]) => `<button class="${state.env === k ? 'is-on' : ''}" data-env="${k}">${l}</button>`).join('')}
            </div>
          </div>
        </div>
        <div class="viewer" id="viewer">${stageSVG(m, c)}</div>
        <div class="stage-strip">
          <span class="strip-item"><span class="dot" style="background:${rs.color.hex}"></span>${rs.color.name}</span>
          <span class="strip-item"><span class="dot" style="background:${rs.wheelHex}"></span>${rs.design.name} ${c.size}"</span>
          <span class="strip-item"><span class="dot" style="background:${rs.caliper.hex}"></span>Pinzas ${rs.caliper.name.split(' ·')[0].toLowerCase()}</span>
          <span class="strip-item"><span class="dot" style="background:linear-gradient(135deg, ${rs.interior.main} 50%, ${rs.interior.accent} 50%)"></span>${rs.interior.name}</span>
        </div>
        <div class="print-sheet">${printSheet(m, c)}</div>
      </section>
      <aside class="panel" aria-label="Opciones">
        <div class="steps" role="tablist">
          ${STEPS.map(([k, l], i) => `<button class="${state.step === k ? 'is-on' : ''}" data-step="${k}"><span class="n">${i + 1}</span>${l}</button>`).join('')}
        </div>
        <div class="panel-body">${stepBody(m, c, rs)}</div>
        <div class="pricebar">
          <div class="tot">Precio total estimado<b>${eur(tot)}</b></div>
          ${state.step === 'resumen'
            ? `<button class="btn red" data-act="save">Guardar</button>`
            : `<button class="btn red" data-next>Siguiente</button>`}
        </div>
      </aside>
    </div>`;
  }

  function swatch(id, hex, on, label, attr) {
    return `<button class="sw ${on ? 'is-on' : ''}" style="background:${hex}" ${attr}="${id}" aria-label="${label}" title="${label}"></button>`;
  }

  function stepBody(m, c, rs) {
    const wf = PC.wheelsByFamily[m.family];
    if (state.step === 'exterior') {
      return PC.colorTiers.map((t) => `<div class="group">
          <h3><span>${t.name}</span><span>${plus(t.price)}</span></h3>
          <div class="swatches">${PC.colors.filter((x) => x.tier === t.id).map((x) => swatch(x.id, x.hex, x.id === c.color, x.name, 'data-color')).join('')}</div>
        </div>`).join('') +
        `<div class="picked"><b>${rs.color.name}</b><span>${byId(PC.colorTiers, rs.color.tier).name}</span></div>` +
        (m.roof === 'soft' ? `<div class="group" style="margin-top:22px"><h3><span>Color de la capota</span></h3>
          <div class="swatches">${PC.tops.map((t) => swatch(t.id, t.hex, t.id === c.top, `${t.name} · ${plus(t.price)}`, 'data-top')).join('')}</div>
          <div class="picked"><b>${rs.top.name}</b><span>${plus(rs.top.price)}</span></div></div>` : '');
    }
    if (state.step === 'llantas') {
      return `<div class="group"><h3><span>Diseño</span></h3><div class="options">
          ${wf.designs.map((id) => { const d = byId(PC.wheelDesigns, id); return `<button class="opt ${c.wheel === id ? 'is-on' : ''}" data-wheel="${id}">
            ${PC.renderWheelThumb(id, rs.wheelHex, rs.caliper.hex)}
            <span class="o-txt"><b>${d.name}</b><small>${d.desc}</small></span><span class="o-price">${plus(d.price)}</span></button>`; }).join('')}
        </div></div>
        <div class="group"><h3><span>Medida</span><span>${plus(Math.max(0, c.size - wf.base) * PC.sizeStepPrice)}</span></h3>
          <div class="sizes">${wf.sizes.map((s) => `<button class="chip ${c.size === s ? 'is-on' : ''}" data-size="${s}">${s}"</button>`).join('')}</div></div>
        <div class="group"><h3><span>Acabado</span><span>${plus(rs.finish.price)}</span></h3>
          <div class="swatches">${PC.wheelFinishes.map((f) => swatch(f.id, f.hex || rs.color.hex, f.id === c.finish, `${f.name} · ${plus(f.price)}`, 'data-finish')).join('')}</div>
          <div class="picked"><b>${rs.finish.name}</b></div></div>`;
    }
    if (state.step === 'frenos') {
      return `<div class="group"><h3><span>Color de las pinzas</span></h3><div class="options">
        ${PC.calipers.map((k) => `<button class="opt ${c.caliper === k.id ? 'is-on' : ''}" data-caliper="${k.id}">
          ${PC.renderWheelThumb(c.wheel, rs.wheelHex, k.hex)}
          <span class="o-txt"><b>${k.name}</b><small>${k.id === 'pccb' ? 'Discos cerámicos de 410/390 mm, menos peso no suspendido' : 'Frenos de acero de alto rendimiento'}</small></span>
          <span class="o-price">${plus(k.price)}</span></button>`).join('')}
      </div></div>`;
    }
    if (state.step === 'interior') {
      const groups = [...new Set(PC.interiors.map((i) => i.group))];
      return groups.map((g) => `<div class="group"><h3><span>${g}</span><span>${plus(PC.interiors.find((i) => i.group === g).price)}</span></h3>
          <div class="swatches">${PC.interiors.filter((i) => i.group === g).map((i) => `<button class="sw ${c.interior === i.id ? 'is-on' : ''}" style="background:linear-gradient(135deg, ${i.main} 0 50%, ${i.accent} 50% 100%)" data-interior="${i.id}" title="${i.name}" aria-label="${i.name}"></button>`).join('')}</div>
        </div>`).join('') +
        `<div class="picked"><b>${rs.interior.name}</b><span>${plus(rs.interior.price)}</span></div>
        <div class="group" style="margin-top:22px"><h3><span>Costuras en contraste</span><span>${rs.interior.stitchForce ? 'Incluidas' : plus(rs.stitch.price)}</span></h3>
          ${rs.interior.stitchForce ? '<p class="saved-meta">El paquete Race-Tex incluye costuras en contraste.</p>' :
          `<div class="swatches">${PC.stitches.map((s) => swatch(s.id, s.hex || rs.interior.main, c.stitch === s.id, s.name, 'data-stitch')).join('')}</div>
          <div class="picked"><b>${rs.stitch.name}</b></div>`}
        </div>`;
    }
    // resumen
    const lines = priceLines(m, c);
    return `<table class="summary-table">
        ${lines.map((l) => `<tr><td><small>${l.k}</small>${l.v}</td><td>${l.k === 'Modelo' ? eur(l.p) : plus(l.p)}</td></tr>`).join('')}
        <tr class="total"><td>Total estimado</td><td>${eur(total(m, c))}</td></tr>
      </table>
      <div class="client">
        <label class="saved-meta" for="clientName">Nombre del cliente (opcional, se guarda solo en este dispositivo)</label>
        <input id="clientName" data-client value="${state.client.replace(/"/g, '&quot;')}" placeholder="Ej.: Laura M.">
      </div>
      <div class="actions">
        <button class="btn ghost" data-act="share">Copiar enlace</button>
        <button class="btn ghost" data-act="print">Imprimir ficha</button>
        <button class="btn ghost" data-act="reset">Restablecer</button>
        <button class="btn ghost" data-nav="modelos">Cambiar modelo</button>
      </div>`;
  }

  function printSheet(m, c) {
    const lines = priceLines(m, c);
    return `<h2 style="margin:18px 0 6px">${m.name} — ficha de configuración</h2>
      <p style="margin:0 0 12px;color:#555">${state.client ? 'Cliente: ' + state.client.replace(/</g, '&lt;') + ' · ' : ''}${new Date().toLocaleDateString('es-ES')}</p>
      <div class="views">${PC.renderFront(m, c)}${PC.renderInterior(m, c)}</div>
      <table class="summary-table">${lines.map((l) => `<tr><td><small>${l.k}</small>${l.v}</td><td>${l.k === 'Modelo' ? eur(l.p) : plus(l.p)}</td></tr>`).join('')}
      <tr class="total"><td>Total estimado</td><td>${eur(total(m, c))}</td></tr></table>
      <p style="font-size:10px;color:#777">Precios orientativos con IVA, sin gastos de matriculación ni transporte. Imagen ilustrativa.</p>`;
  }

  /* =================================================================
     VISTA: COMPARAR
     ================================================================= */
  function viewComparar() {
    const ms = state.compare.map((id) => byId(PC.models, id)).filter(Boolean);
    if (!ms.length) return `<div class="wrap"><div class="empty">Marca “Comparar” en hasta 3 modelos del catálogo para verlos lado a lado.<br><button class="btn" data-nav="modelos">Ir al catálogo</button></div></div>`;
    const best = (k, dir) => { const vals = ms.map((m) => m[k]); return dir > 0 ? Math.max(...vals) : Math.min(...vals); };
    const row = (label, k, fmt, dir) => `<tr><th>${label}</th>${ms.map((m) => `<td class="${dir && ms.length > 1 && m[k] === best(k, dir) ? 'best' : ''}">${fmt(m[k])}</td>`).join('')}</tr>`;
    return `<div class="wrap">
      <div class="hero"><div><div class="eyebrow">Comparador</div><h1>Frente a frente</h1></div>
      <button class="btn ghost small" data-act="clearcmp">Vaciar comparación</button></div>
      <div class="table-wrap"><table class="cmp">
        <tr><th></th>${ms.map((m) => `<td><div class="thumb">${PC.renderSide(m, defaultCfg(m))}</div><b>${m.name}</b></td>`).join('')}</tr>
        ${row('Carrocería', 'body', (v) => v)}
        ${row('Propulsión', 'fuel', (v) => v)}
        ${row('Motor', 'engine', (v) => v)}
        ${row('Potencia', 'cv', (v) => v.toLocaleString('es-ES') + ' CV', 1)}
        ${row('0-100 km/h', 'acc', (v) => v.toLocaleString('es-ES') + ' s', -1)}
        ${row('Velocidad máx.', 'vmax', (v) => v + ' km/h', 1)}
        ${row('Precio desde', 'price', eur, -1)}
        <tr><th>€ por CV</th>${ms.map((m) => `<td>${eur(Math.round(m.price / m.cv))}</td>`).join('')}</tr>
        <tr><th></th>${ms.map((m) => `<td><button class="btn red small" data-open="${m.id}">Configurar</button> <button class="btn ghost small" data-uncmp="${m.id}">Quitar</button></td>`).join('')}</tr>
      </table></div>
    </div>`;
  }

  /* =================================================================
     VISTA: MIS CONFIGURACIONES (con comparación de 2 lado a lado)
     ================================================================= */
  function viewGaraje() {
    const s = state.saved;
    if (!s.length) return `<div class="wrap"><div class="empty">Aún no hay configuraciones guardadas. Configura un coche y pulsa “Guardar” en el resumen.<br><button class="btn" data-nav="modelos">Empezar</button></div></div>`;
    const A = s.find((x) => x.id === state.vsA), B = s.find((x) => x.id === state.vsB);
    const vs = A && B ? `<div class="vs">${[A, B].map((x) => { const m = byId(PC.models, x.m); return `<div class="card"><div class="card-img">${PC.renderSide(m, x.c)}</div><div class="card-body"><b>${m.name}</b><span class="saved-meta">${PC.resolve(m, x.c).color.name} · ${PC.resolve(m, x.c).interior.name}</span><b>${eur(total(m, x.c))}</b></div></div>`; }).join('')}</div>` : '';
    return `<div class="wrap">
      <div class="hero"><div><div class="eyebrow">Guardadas en este dispositivo</div><h1>Mis configuraciones</h1>
      <p class="lead">Marca A y B en dos configuraciones para compararlas lado a lado con el cliente.</p></div></div>
      ${vs}
      <div class="grid">${s.map((x) => { const m = byId(PC.models, x.m); if (!m) return ''; const rs = PC.resolve(m, x.c); return `<article class="card saved">
        <div class="card-img" data-load="${x.id}">${PC.renderSide(m, x.c)}</div>
        <div class="card-body">
          <div class="card-title"><h3>${m.name}</h3><span class="pill">${eur(total(m, x.c))}</span></div>
          <div class="saved-meta">${x.client ? x.client.replace(/</g, '&lt;') + ' · ' : ''}${new Date(x.t).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}<br>${rs.color.name} · ${rs.design.name} ${x.c.size}" · ${rs.interior.name}</div>
          <div class="card-foot">
            <span><button class="btn small ${state.vsA === x.id ? 'red' : 'ghost'}" data-vsa="${x.id}">A</button> <button class="btn small ${state.vsB === x.id ? 'red' : 'ghost'}" data-vsb="${x.id}">B</button></span>
            <span><button class="btn ghost small" data-del="${x.id}" aria-label="Borrar">Borrar</button> <button class="btn small" data-load="${x.id}">Abrir</button></span>
          </div>
        </div></article>`; }).join('')}</div>
    </div>`;
  }

  /* =================================================================
     VISTA: HISTORIA
     ================================================================= */
  function viewHistoria() {
    return `<div class="wrap">
      <div class="hero"><div><div class="eyebrow">Desde 1948</div><h1>Modelos históricos</h1>
      <p class="lead">Referencia rápida para conversaciones con clientes y coleccionistas.</p></div></div>
      <div class="timeline">${PC.classics.map((k) => `<div class="tl"><div class="yr">${k.years}</div><h3>${k.name}</h3>
        <div class="saved-meta">${k.engine} · ${k.cv} CV</div><p>${k.fact}</p></div>`).join('')}</div>
    </div>`;
  }

  /* =================================================================
     RENDER + EVENTOS
     ================================================================= */
  function render(opts = {}) {
    const views = { modelos: viewModelos, configurar: viewConfigurar, comparar: viewComparar, garaje: viewGaraje, historia: viewHistoria };
    const scrollPanel = document.querySelector('.panel-body')?.scrollTop || 0;
    $app.innerHTML = views[state.view]();
    document.querySelectorAll('.mainnav button').forEach((b) => b.classList.toggle('is-active', b.dataset.nav === state.view));
    const cc = document.getElementById('cmpCount'); cc.hidden = !state.compare.length; cc.textContent = state.compare.length;
    const gc = document.getElementById('garCount'); gc.hidden = !state.saved.length; gc.textContent = state.saved.length;
    if (opts.keepScroll) { const pb = document.querySelector('.panel-body'); if (pb) pb.scrollTop = scrollPanel; }
    if (opts.top) window.scrollTo({ top: 0 });
  }

  function go(view) { state.view = view; render({ top: true }); }
  function open(id) {
    if (state.modelId !== id) { state.modelId = id; state.cfg = defaultCfg(model()); }
    state.step = 'exterior'; state.stageView = 'side'; go('configurar');
  }
  function setCfg(k, v, viewHint) {
    state.cfg[k] = v;
    if (viewHint) state.stageView = viewHint;
    history.replaceState(null, '', '#c=' + encode());
    render({ keepScroll: true });
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('button, [data-open], [data-load], a[data-nav]');
    if (!t) return;
    const d = t.dataset;
    if (d.nav) { e.preventDefault(); return go(d.nav); }
    if (d.open) return open(d.open);
    if (d.fam) { state.fam = d.fam; return render(); }
    if (d.fuel) { state.fuel = d.fuel; return render(); }
    if (d.view) { state.stageView = d.view; return render({ keepScroll: true }); }
    if (d.env) { state.env = d.env; store.set('pc.env', d.env); return render({ keepScroll: true }); }
    if (d.step) {
      state.step = d.step;
      state.stageView = d.step === 'interior' ? 'interior' : d.step === 'frenos' ? 'wheel' : state.stageView === 'interior' || state.stageView === 'wheel' ? 'side' : state.stageView;
      return render();
    }
    if ('next' in d) { const i = STEPS.findIndex(([k]) => k === state.step); t.dataset.step = STEPS[Math.min(i + 1, STEPS.length - 1)][0]; state.step = t.dataset.step; state.stageView = state.step === 'interior' ? 'interior' : state.step === 'frenos' ? 'wheel' : 'side'; return render(); }
    if (d.color) return setCfg('color', d.color, state.stageView === 'interior' || state.stageView === 'wheel' ? 'side' : null);
    if (d.top) return setCfg('top', d.top, 'side');
    if (d.wheel) return setCfg('wheel', d.wheel, state.stageView === 'side' ? null : 'wheel');
    if (d.size) return setCfg('size', +d.size);
    if (d.finish) return setCfg('finish', d.finish);
    if (d.caliper) return setCfg('caliper', d.caliper);
    if (d.interior) return setCfg('interior', d.interior, 'interior');
    if (d.stitch) return setCfg('stitch', d.stitch, 'interior');
    if (d.uncmp) { state.compare = state.compare.filter((x) => x !== d.uncmp); store.set('pc.compare', state.compare); return render(); }
    if (d.load) { const x = state.saved.find((s) => s.id === d.load); if (x) { state.modelId = x.m; state.cfg = { ...x.c }; state.client = x.client || ''; state.step = 'resumen'; state.stageView = 'side'; go('configurar'); } return; }
    if (d.del) { state.saved = state.saved.filter((s) => s.id !== d.del); store.set('pc.saved', state.saved); return render(); }
    if (d.vsa) { state.vsA = d.vsa; return render(); }
    if (d.vsb) { state.vsB = d.vsb; return render(); }
    switch (d.act) {
      case 'save':
        state.saved.unshift({ id: Date.now().toString(36), m: state.modelId, c: { ...state.cfg }, client: state.client, t: Date.now() });
        store.set('pc.saved', state.saved); render({ keepScroll: true }); return toast('Configuración guardada');
      case 'share': {
        const url = location.href.split('#')[0] + '#c=' + encode();
        (navigator.clipboard?.writeText(url) || Promise.reject()).then(() => toast('Enlace copiado'), () => prompt('Copia este enlace:', url));
        return;
      }
      case 'print': return window.print();
      case 'reset': state.cfg = defaultCfg(model()); render(); return toast('Configuración restablecida');
      case 'clearcmp': state.compare = []; store.set('pc.compare', []); return render();
      case 'theme': {
        const r = document.documentElement; const light = r.dataset.theme !== 'light';
        r.dataset.theme = light ? 'light' : 'dark'; store.set('pc.theme', r.dataset.theme); return;
      }
    }
  });

  document.addEventListener('change', (e) => {
    const id = e.target.dataset.cmp;
    if (!id) return;
    if (e.target.checked) {
      if (state.compare.length >= 3) { e.target.checked = false; return toast('Máximo 3 modelos para comparar'); }
      state.compare.push(id);
    } else state.compare = state.compare.filter((x) => x !== id);
    store.set('pc.compare', state.compare);
    const cc = document.getElementById('cmpCount'); cc.hidden = !state.compare.length; cc.textContent = state.compare.length;
  });

  document.addEventListener('input', (e) => {
    if ('search' in e.target.dataset) {
      state.q = e.target.value;
      const pos = e.target.selectionStart;
      render();
      const s = document.querySelector('[data-search]'); s.focus(); s.setSelectionRange(pos, pos);
    }
    if ('client' in e.target.dataset) state.client = e.target.value;
  });

  // teclado: flechas para cambiar de vista en el configurador
  document.addEventListener('keydown', (e) => {
    if (state.view !== 'configurar' || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    const order = ['side', 'front', 'interior', 'wheel'];
    const i = order.indexOf(state.stageView);
    if (e.key === 'ArrowRight') { state.stageView = order[(i + 1) % 4]; render({ keepScroll: true }); }
    if (e.key === 'ArrowLeft') { state.stageView = order[(i + 3) % 4]; render({ keepScroll: true }); }
  });

  const theme = store.get('pc.theme', null);
  if (theme) document.documentElement.dataset.theme = theme;
  readHash();
  render();
})();
