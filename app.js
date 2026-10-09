// Arma la página desde window.CV (data.js).
(function () {
  const cv = window.CV;
  const $ = (id) => document.getElementById(id);
  const el = (tag, attrs = {}, ...hijos) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v);
    }
    for (const h of hijos) if (h != null) n.append(h);
    return n;
  };

  // --- Portada ---
  $('nombre').textContent = cv.nombre;
  $('titulo').textContent = cv.titulo;
  $('resumen').textContent = cv.resumen;
  $('lugar').textContent = cv.lugar;
  $('btn-wa').href = cv.contacto.whatsapp;

  // Compartir: menú nativo del celular; si no existe (computadora), abre WhatsApp con el link.
  $('btn-compartir').addEventListener('click', async () => {
    const datos = {
      title: 'Bruno Rodríguez · Desarrollador',
      text: 'Tienda de seguridad y conectividad, con instalación y asesoramiento. También apps, bots y web.',
      url: 'https://brunorod.uy/',
    };
    if (navigator.share) {
      try { await navigator.share(datos); } catch { /* el usuario cerró el menú */ }
      return;
    }
    window.open('https://wa.me/?text=' + encodeURIComponent(datos.text + ' ' + datos.url), '_blank', 'noopener');
  });

  // --- Intro ---
  // Se muestra al entrar por la dirección general. Si el QR trae un #sección, va directo.
  const intro = $('intro');
  function cerrarIntro() {
    intro.classList.add('saliendo');
    document.body.classList.remove('con-intro');
    setTimeout(() => { intro.hidden = true; }, 350);
    try { sessionStorage.setItem('introVista', '1'); } catch {}
  }
  let vista = false;
  try { vista = sessionStorage.getItem('introVista') === '1'; } catch {}
  if (!location.hash && !vista) {
    intro.hidden = false;
    document.body.classList.add('con-intro');
    $('intro-iniciar').focus();
  }
  $('intro-iniciar').addEventListener('click', cerrarIntro);
  // Ir a la tienda cuenta como bienvenida vista (al volver atrás no reaparece).
  $('intro-tienda').addEventListener('click', () => { try { sessionStorage.setItem('introVista', '1'); } catch {} });
  if (!intro.hidden) {
    robotQueAsoma($('asoma-intro'), () => intro.hidden);
    robotQueAsoma($('asoma-tienda'), () => intro.hidden);
  }
  if (!intro.hidden) {
    // El 3D se descarga solo si se ve la bienvenida; si falla (sin WebGL) queda el texto solo
    const sillon = $('sillon-intro');
    import('./sillon3d.js?v=3')
      .then((m) => m.iniciarSillon(sillon, () => !intro.hidden, 'models/camara-domo.glb'))
      .catch(() => { sillon.hidden = true; });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !intro.hidden) cerrarIntro(); });

  // --- Link siempre limpio: brunorod.uy, sin ?v=, ?fbclid= ni #sección en la barra ---
  // Primero se usa lo que trae el link (#sección) y después se borra.
  const destino = location.hash.slice(1);
  if (location.search || location.hash) history.replaceState(null, '', location.pathname);
  const irA = (id) => {
    if (id === 'inicio') { scrollTo({ top: 0 }); return; }
    const seccion = $(id);
    if (seccion) seccion.scrollIntoView();
  };
  if (destino) requestAnimationFrame(() => irA(destino));
  // Los links del menú bajan a la sección sin agregar #algo a la dirección
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    e.preventDefault();
    irA(a.getAttribute('href').slice(1));
  });

  // Robot que cruza la pantalla arriba de Proyectos: se carga al acercarse y solo se mueve a la vista
  const paseo = $('paseo');
  let paseoVisible = false;
  new IntersectionObserver(([e]) => {
    paseoVisible = e.isIntersecting;
    if (paseoVisible && !paseo.dataset.cargado) {
      paseo.dataset.cargado = '1';
      import('./robotpaseo.js?v=1')
        .then((m) => m.iniciarPaseo(paseo, () => paseoVisible && intro.hidden))
        .catch(() => { paseo.hidden = true; });
    }
  }, { rootMargin: '300px' }).observe(paseo);

  // --- Proyectos ---
  for (const p of cv.proyectos) {
    const card = el('article', { class: 'proyecto' + (p.imagenes ? ' con-imagenes' : '') },
      el('p', { class: 'etiqueta', text: p.etiqueta }),
      el('h3', { text: p.nombre }),
      el('p', { text: p.texto }),
      el('ul', { class: 'chips chips-chicos' }, ...p.stack.map((s) => el('li', { text: s }))),
    );
    if (p.imagenes) {
      card.append(el('div', { class: 'galeria' },
        ...p.imagenes.map((img) => {
          const [src, w, h] = Array.isArray(img) ? img : [img, 480, 1061];
          return el('img', { src, alt: 'Captura de ' + p.nombre, loading: 'lazy', width: String(w), height: String(h) });
        })));
    }
    $('lista-proyectos').append(card);
  }

  // --- GitHub ---
  const repos = Object.keys(cv.prs);
  const todos = repos.flatMap((r) => cv.prs[r]);
  const lineas = todos.reduce((a, pr) => a + pr[3], 0);
  const stats = [
    [todos.length, 'PR mostrados'],
    [repos.length, 'repositorios'],
    ['+' + lineas.toLocaleString('es-UY'), 'líneas agregadas'],
  ];
  for (const [n, t] of stats) $('stats').append(el('div', { class: 'stat' }, el('strong', { text: String(n) }), el('span', { text: t })));

  if (cv.capturas.length) {
    $('capturas').hidden = false;
    for (const c of cv.capturas) {
      $('capturas').append(el('figure', {},
        el('a', { href: c.src, target: '_blank', rel: 'noopener' }, el('img', { src: c.src, alt: c.texto, loading: 'lazy' })),
        el('figcaption', { text: c.texto })));
    }
  }

  const fmt = new Intl.DateTimeFormat('es-UY', { day: 'numeric', month: 'short' });
  function mostrarRepo(repo) {
    for (const b of $('repos').children) b.setAttribute('aria-selected', String(b.dataset.id === repo));
    const ul = $('prs');
    ul.replaceChildren();
    for (const [num, titulo, fecha, mas, menos, archivos] of cv.prs[repo]) {
      ul.append(el('li', { class: 'pr' },
        el('span', { class: 'pr-icono', 'aria-hidden': 'true' }),
        el('div', { class: 'pr-cuerpo' },
          el('p', { class: 'pr-titulo', text: titulo }),
          el('p', { class: 'pr-meta' },
            el('span', { class: 'merged', text: 'Merged' }),
            ` #${num} · ${fmt.format(new Date(fecha + 'T12:00:00'))} · ${archivos} archivo${archivos === 1 ? '' : 's'} · `,
            el('span', { class: 'mas', text: '+' + mas }), ' ',
            el('span', { class: 'menos', text: '−' + menos })),
        )));
    }
  }
  for (const r of repos) {
    const b = el('button', { class: 'rubro', type: 'button', role: 'tab', 'data-id': r },
      r, el('span', { class: 'cuenta', text: String(cv.prs[r].length) }));
    b.addEventListener('click', () => mostrarRepo(r));
    $('repos').append(b);
  }
  mostrarRepo(repos[0]);

  // --- Contacto ---
  const c = cv.contacto;
  const tarjetas = [
    ['WhatsApp', c.telefono, c.whatsapp],
    ['Email', c.email, 'mailto:' + c.email],
    ['LinkedIn', 'brunorodriguez-dev', c.linkedin],
    ['GitHub', 'brunorod631-byte', c.github],
  ];
  for (const [t, v, href] of tarjetas) {
    const a = el('a', { class: 'contacto-card', href }, el('span', { text: t }), el('strong', { text: v }));
    if (href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
    $('contacto-grid').append(a);
  }

  // --- Formulario de contacto (lo recibe el Worker de Cloudflare en /api/contacto) ---
  const form = $('form-contacto');
  const inicioForm = Date.now();
  const estado = (texto, tipo) => { $('form-estado').textContent = texto; $('form-estado').className = 'form-estado ' + (tipo || ''); };

  // Verificación anti-robots de Cloudflare (Turnstile): se carga al acercarse al formulario
  let widgetTurnstile = null;
  window.alCargarTurnstile = () => {
    widgetTurnstile = window.turnstile.render('#turnstile', {
      sitekey: '0x4AAAAAAFD7TwWAT_sc5wRe', theme: 'dark', language: 'es',
    });
  };
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=alCargarTurnstile';
    s.async = true;
    document.head.append(s);
  }, { rootMargin: '400px' }).observe(form);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(form));
    if (datos.nombre.trim().length < 2 || datos.contacto.trim().length < 6 || datos.mensaje.trim().length < 5) {
      estado('Completá tu nombre, un WhatsApp o email y el mensaje.', 'error');
      return;
    }
    datos.t = Date.now() - inicioForm;
    if (widgetTurnstile !== null) {
      datos.token = window.turnstile.getResponse(widgetTurnstile);
      if (!datos.token) { estado('Esperá un segundo a que se complete la verificación de abajo.', 'error'); return; }
    }
    const boton = form.querySelector('button');
    boton.disabled = true;
    estado('Enviando…');
    try {
      const r = await fetch('/api/contacto', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(datos) });
      if (r.status === 403) { estado('No pudimos verificar que no seas un robot. Probá de nuevo en unos segundos.', 'error'); return; }
      if (!r.ok) throw new Error(r.status);
      form.reset();
      estado('¡Listo! Recibí tu mensaje, te respondo a la brevedad.', 'ok');
    } catch {
      estado('No se pudo enviar. Probá de nuevo o escribime por WhatsApp.', 'error');
    } finally {
      boton.disabled = false;
      // Cada verificación sirve para un solo envío
      if (widgetTurnstile !== null) window.turnstile.reset(widgetTurnstile);
    }
  });

  $('anio').textContent = new Date().getFullYear();
})();

// Barra de navegación: transparente arriba, esmerilada al hacer scroll
(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const actualizar = () => nav.classList.toggle('con-fondo', window.scrollY > 8);
  window.addEventListener('scroll', actualizar, { passive: true });
  window.addEventListener('load', actualizar);
  window.addEventListener('hashchange', actualizar);
  actualizar();
})();

// Robots que asoman por detrás de un botón y saludan ("Robot Wave" de Irby Pace y
// "AI bot" de Trình, LottieFiles). La librería se descarga una sola vez y solo si hace falta.
// (Declaraciones de función, no const: se llaman desde el bloque de arriba, que corre antes.)
function cargarLottie() {
  cargarLottie.listo ??= new Promise((ok, mal) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie_light.min.js';
    s.onload = ok;
    s.onerror = mal;
    document.head.append(s);
  });
  return cargarLottie.listo;
}
function robotQueAsoma(caja, terminado) {
  if (!caja) return;
  cargarLottie().then(async () => {
    const cargar = async (el) => {
      const url = el.dataset.anim;
      const datos = await (await fetch(url)).json();
      const anim = window.lottie.loadAnimation({
        container: el, renderer: 'svg', loop: true, autoplay: false,
        animationData: datos, assetsPath: url.slice(0, url.lastIndexOf('/') + 1),
      });
      await new Promise((ok) => anim.addEventListener('DOMLoaded', ok));
      return anim;
    };
    let anims;
    try { anims = await Promise.all([...caja.querySelectorAll('.asoma-robot[data-anim]')].map(cargar)); } catch { return; }
    let arriba = false, bajar;
    const asomar = () => {
      if (arriba || terminado()) return;
      arriba = true;
      anims.forEach((a) => a.goToAndPlay(0, true));
      caja.classList.add('saluda');
      bajar = setTimeout(esconder, 5200); // dos saludos
    };
    const esconder = () => {
      clearTimeout(bajar);
      caja.classList.remove('saluda');
      setTimeout(() => { arriba = false; if (!caja.classList.contains('saluda')) anims.forEach((a) => a.pause()); }, 500);
    };
    caja.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') asomar(); });
    setTimeout(asomar, 1000);
    const ciclo = setInterval(() => {
      if (terminado()) { clearInterval(ciclo); anims.forEach((a) => a.destroy()); } else asomar();
    }, 9000);
  }).catch(() => {});
}
