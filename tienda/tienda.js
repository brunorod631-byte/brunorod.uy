// Tienda: catálogo desde la API (se carga en el panel /admin), carrito en localStorage y pedido por WhatsApp.

(async () => {
  const T = window.TIENDA;
  const $ = (id) => document.getElementById(id);
  const CLAVE = 'brunorod-carrito';
  const API = T.api || '/api/tienda';

  $('anio').textContent = new Date().getFullYear();
  $('vacia-wa').href = `https://wa.me/${T.whatsapp}?text=${encodeURIComponent('Hola Bruno, quiero consultar por cámaras y componentes.')}`;
  $('tienda-cargando').hidden = false;
  try {
    const r = await fetch(`${API}/catalogo`);
    if (!r.ok) throw new Error(r.status);
    const datos = await r.json();
    T.categorias = datos.categorias;
    T.productos = datos.productos.map((p) => ({ ...p, fotos: p.fotos.map((k) => `${API}/fotos/${k}`) }));
  } catch (err) {
    console.error('catalogo', err);
    T.categorias = [];
    T.productos = [];
    $('tienda-error').hidden = false;
  }
  $('tienda-cargando').hidden = true;
  const porId = new Map(T.productos.map((p) => [p.id, p]));

  const formatos = {};
  const precio = (monto, moneda = 'UYU') => {
    formatos[moneda] ??= new Intl.NumberFormat('es-UY', { style: 'currency', currency: moneda, maximumFractionDigits: 0 });
    return formatos[moneda].format(monto).replace('UYU', '$').replace('US$', 'U$S');
  };
  const textoPrecio = (p) => (p.precio == null ? 'Consultar precio' : precio(p.precio, p.moneda));

  const el = (tag, clase, texto) => {
    const n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto != null) n.textContent = texto;
    return n;
  };

  const foto = (p, i = 0) => {
    const src = p.fotos?.[i];
    if (!src) {
      const n = el('div', 'sin-foto');
      n.setAttribute('aria-hidden', 'true');
      n.innerHTML = '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M4 5h3l2-2h6l2 2h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/></svg>';
      return n;
    }
    const img = el('img');
    img.src = src;
    img.alt = p.nombre;
    img.loading = 'lazy';
    img.decoding = 'async';
    return img;
  };

  // ---- Carrito ----
  let carrito = {};
  try { carrito = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch { carrito = {}; }
  // Descarta productos que ya no están en el catálogo o quedaron sin stock.
  for (const id of Object.keys(carrito)) {
    const p = porId.get(id);
    if (!p || p.stock === false || !(carrito[id] > 0)) delete carrito[id];
  }
  const guardar = () => {
    try { localStorage.setItem(CLAVE, JSON.stringify(carrito)); } catch {}
    pintarCarrito();
  };
  const agregar = (id, n) => {
    carrito[id] = Math.min(99, (carrito[id] || 0) + n);
    if (carrito[id] <= 0) delete carrito[id];
    guardar();
  };

  const totales = () => {
    const suma = {};
    let consultar = false;
    for (const [id, n] of Object.entries(carrito)) {
      const p = porId.get(id);
      if (p.precio == null) { consultar = true; continue; }
      const m = p.moneda || 'UYU';
      suma[m] = (suma[m] || 0) + p.precio * n;
    }
    const partes = Object.entries(suma).map(([m, v]) => precio(v, m));
    return { texto: partes.join(' + ') || '—', consultar };
  };

  const pintarCarrito = () => {
    const ids = Object.keys(carrito);
    const unidades = ids.reduce((s, id) => s + carrito[id], 0);
    $('carrito-cuenta').textContent = unidades;
    $('carrito-cuenta').hidden = unidades === 0;

    const lista = $('carrito-lista');
    lista.replaceChildren();
    for (const id of ids) {
      const p = porId.get(id);
      const li = el('li', 'carrito-item');
      const mini = el('div', 'carrito-mini');
      mini.append(foto(p));
      const info = el('div', 'carrito-info');
      info.append(el('strong', null, p.nombre), el('span', null, textoPrecio(p)));
      const cant = el('div', 'cantidad');
      const menos = el('button', null, '−');
      menos.type = 'button';
      menos.setAttribute('aria-label', `Restar uno de ${p.nombre}`);
      menos.onclick = () => agregar(id, -1);
      const mas = el('button', null, '+');
      mas.type = 'button';
      mas.setAttribute('aria-label', `Sumar uno de ${p.nombre}`);
      mas.onclick = () => agregar(id, 1);
      cant.append(menos, el('output', null, carrito[id]), mas);
      const quitar = el('button', 'carrito-quitar', 'Quitar');
      quitar.type = 'button';
      quitar.onclick = () => { delete carrito[id]; guardar(); };
      li.append(mini, info, cant, quitar);
      lista.append(li);
    }
    $('carrito-vacio').hidden = ids.length > 0;
    $('carrito-pie').hidden = ids.length === 0;
    const t = totales();
    $('carrito-total').innerHTML = '';
    $('carrito-total').append(el('span', null, 'Total estimado'), el('strong', null, t.texto));
    if (t.consultar) $('carrito-total').append(el('small', null, 'Algunos productos son a consultar: te paso el precio por WhatsApp.'));
  };

  // ---- Catálogo ----
  let categoria = 'Todos';
  const pintarCatalogo = () => {
    const grid = $('productos');
    grid.replaceChildren();
    const visibles = T.productos.filter((p) => categoria === 'Todos' || (p.categoria || 'Otros') === categoria);
    for (const p of visibles) {
      const card = el('button', 'producto');
      card.type = 'button';
      card.onclick = () => abrirFicha(p.id);
      const img = el('div', 'producto-foto');
      img.append(foto(p));
      if (p.stock === false) img.append(el('span', 'etiqueta-stock', 'Sin stock'));
      const cuerpo = el('div', 'producto-cuerpo');
      cuerpo.append(el('span', 'producto-cat', p.categoria || ''), el('strong', 'producto-nombre', p.nombre));
      if (p.resumen) cuerpo.append(el('span', 'producto-resumen', p.resumen));
      cuerpo.append(el('span', 'producto-precio', textoPrecio(p)));
      card.append(img, cuerpo);
      grid.append(card);
    }
  };

  const pintarCategorias = () => {
    const cont = $('categorias');
    const usadas = T.categorias.filter((c) => T.productos.some((p) => p.categoria === c));
    if (T.productos.some((p) => !p.categoria)) usadas.push('Otros');
    cont.hidden = usadas.length < 2;
    cont.replaceChildren();
    for (const c of ['Todos', ...usadas]) {
      const b = el('button', 'rubro', c);
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(c === categoria));
      b.onclick = () => { categoria = c; pintarCategorias(); pintarCatalogo(); };
      cont.append(b);
    }
  };

  // ---- Ficha ----
  let fichaId = null;
  let fichaCant = 1;
  const abrirFicha = (id, { historial = true } = {}) => {
    const p = porId.get(id);
    if (!p) return;
    fichaId = id;
    fichaCant = 1;
    $('ficha-cantidad').textContent = 1;
    $('ficha-categoria').textContent = p.categoria || '';
    $('ficha-nombre').textContent = p.nombre;
    $('ficha-precio').textContent = textoPrecio(p);

    const verFoto = (i) => {
      $('ficha-foto').replaceChildren(foto(p, i));
      [...$('ficha-miniaturas').children].forEach((b, j) => b.setAttribute('aria-current', String(i === j)));
    };
    $('ficha-miniaturas').replaceChildren();
    if ((p.fotos?.length || 0) > 1) {
      p.fotos.forEach((_, i) => {
        const b = el('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Foto ${i + 1}`);
        b.append(foto(p, i));
        b.onclick = () => verFoto(i);
        $('ficha-miniaturas').append(b);
      });
    }
    verFoto(0);

    $('ficha-descripcion').replaceChildren(
      ...String(p.descripcion || p.resumen || '').split('\n').filter(Boolean).map((t) => el('p', null, t)),
    );
    $('ficha-caracteristicas').replaceChildren(...(p.caracteristicas || []).map((c) => el('li', null, c)));
    $('ficha-caracteristicas').hidden = !p.caracteristicas?.length;

    const sinStock = p.stock === false;
    $('ficha-agregar').disabled = sinStock;
    $('ficha-agregar').textContent = sinStock ? 'Sin stock' : 'Agregar al carrito';
    $('ficha-menos').disabled = $('ficha-mas').disabled = sinStock;

    if (historial && location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    if (!$('ficha').open) $('ficha').showModal();
  };

  $('ficha-menos').onclick = () => { fichaCant = Math.max(1, fichaCant - 1); $('ficha-cantidad').textContent = fichaCant; };
  $('ficha-mas').onclick = () => { fichaCant = Math.min(99, fichaCant + 1); $('ficha-cantidad').textContent = fichaCant; };
  $('ficha-agregar').onclick = () => {
    agregar(fichaId, fichaCant);
    $('ficha').close();
    abrirCarrito();
  };

  // El hash (#id-producto) permite compartir el link directo a un producto.
  const segunHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (porId.has(id)) abrirFicha(id, { historial: false });
    else if ($('ficha').open) $('ficha').close();
  };
  window.addEventListener('popstate', segunHash);
  $('ficha').addEventListener('close', () => {
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  });

  // ---- Diálogos ----
  const abrirCarrito = () => { pintarCarrito(); $('carrito').showModal(); };
  $('abrir-carrito').onclick = abrirCarrito;
  for (const d of document.querySelectorAll('dialog.hoja')) {
    d.querySelector('[data-cerrar]').onclick = () => d.close();
    // Click en el fondo oscuro cierra.
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
  }

  // ---- Pedido ----
  const form = $('form-pedido');
  $('pedido-entrega').replaceChildren(...T.entrega.map((op) => el('option', null, op)));
  const esEnvio = () => /env[ií]o/i.test(form.entrega.value);
  const actualizarEntrega = () => { $('pedido-envio').hidden = !esEnvio(); };
  form.entrega.onchange = actualizarEntrega;
  actualizarEntrega();
  $('pedido-pago').textContent = T.pago;

  form.onsubmit = (e) => {
    e.preventDefault();
    const estado = $('pedido-estado');
    const nombre = form.nombre.value.trim();
    const faltan = [];
    if (!nombre) faltan.push(form.nombre);
    if (esEnvio()) {
      if (!form.direccion.value.trim()) faltan.push(form.direccion);
      if (!form.localidad.value.trim()) faltan.push(form.localidad);
    }
    if (faltan.length) {
      estado.textContent = 'Completá los datos marcados.';
      faltan.forEach((i) => i.setAttribute('aria-invalid', 'true'));
      faltan[0].focus();
      return;
    }
    estado.textContent = '';

    const lineas = ['Hola Bruno, quiero hacer este pedido desde la tienda:', ''];
    for (const [id, n] of Object.entries(carrito)) {
      const p = porId.get(id);
      const sub = p.precio == null ? 'a consultar' : precio(p.precio * n, p.moneda);
      lineas.push(`• ${n} × ${p.nombre} — ${sub}`);
    }
    const t = totales();
    lineas.push('', `Total estimado: ${t.texto}${t.consultar ? ' (+ productos a consultar)' : ''}`, '');
    lineas.push(`Nombre: ${nombre}`, `Entrega: ${form.entrega.value}`);
    if (esEnvio()) lineas.push(`Dirección: ${form.direccion.value.trim()}, ${form.localidad.value.trim()}`);
    if (form.comentario.value.trim()) lineas.push(`Comentario: ${form.comentario.value.trim()}`);
    lineas.push('Pago: transferencia bancaria');

    window.open(`https://wa.me/${T.whatsapp}?text=${encodeURIComponent(lineas.join('\n'))}`, '_blank', 'noopener');
  };
  form.addEventListener('input', (e) => e.target.removeAttribute('aria-invalid'));

  // ---- Inicio ----
  $('tienda-vacia').hidden = T.productos.length > 0 || !$('tienda-error').hidden;
  pintarCategorias();
  pintarCatalogo();
  pintarCarrito();
  segunHash();
})();
