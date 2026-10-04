// Hero de la tienda: arma los accesos a categorías y la franja de marcas desde config.js.

(() => {
  const H = window.TIENDA.hero;
  const $ = (id) => document.getElementById(id);
  // Mismo slug que tienda.js (?categoria=<slug>).
  const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const SVG = 'http://www.w3.org/2000/svg';

  const icono = (nombre) => {
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('class', 'ht-cat-icono');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(SVG, 'use');
    use.setAttribute('href', `#ico-${nombre}`);
    svg.append(use);
    return svg;
  };

  const irAlCatalogo = () => {
    const destino = $('catalogo');
    destino.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    destino.focus({ preventScroll: true });
  };

  // Categorías: links reales (?categoria=); con JS filtran sin recargar.
  for (const c of H.categorias) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'ht-cat';
    a.href = `./?categoria=${slug(c.categoria)}`;
    a.append(icono(c.icono));
    const t = document.createElement('span');
    t.textContent = c.corto;
    a.append(t);
    a.addEventListener('click', (e) => {
      if (!window.tiendaFiltrar || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      window.tiendaFiltrar(c.categoria);
      irAlCatalogo();
    });
    li.append(a);
    $('ht-categorias').append(li);
  }

  // Otros accesos a categorías (franja destacada): mismo comportamiento que las tarjetas.
  for (const a of document.querySelectorAll('[data-filtrar]')) {
    a.addEventListener('click', (e) => {
      if (!window.tiendaFiltrar || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      window.tiendaFiltrar(a.dataset.filtrar);
      irAlCatalogo();
    });
  }

  // CTA principal: baja al catálogo sin dejar #catalogo en la URL.
  $('ht-cta').addEventListener('click', (e) => {
    e.preventDefault();
    irAlCatalogo();
  });

  // Marcas: logo oficial si está cargado; si no, el nombre en texto (sin imitar el logotipo).
  const lista = $('ht-marcas');
  H.marcas.forEach((m, i) => {
    const li = document.createElement('li');
    li.className = 'ht-marca';
    li.style.setProperty('--i', i);
    let contenido;
    if (m.logo) {
      contenido = document.createElement('img');
      contenido.src = m.logo;
      contenido.alt = m.nombre;
      contenido.loading = 'lazy';
      contenido.decoding = 'async';
      contenido.height = 22;
      // `escala` (opcional) compensa logos que traen mucho margen en el archivo.
      if (m.escala) contenido.style.setProperty('--escala', m.escala);
    } else {
      contenido = document.createElement('span');
      contenido.className = 'ht-marca-texto';
      contenido.textContent = m.nombre;
    }
    if (m.href) {
      const a = document.createElement('a');
      a.href = m.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.append(contenido);
      contenido = a;
    }
    li.append(contenido);
    lista.append(li);
  });

  // Modelo 3D: sin giro continuo si el sistema pide reducir animaciones.
  const modelo = document.querySelector('.ht-modelo');
  if (modelo && matchMedia('(prefers-reduced-motion: reduce)').matches) modelo.removeAttribute('auto-rotate');

  // Aparición escalonada de las marcas, una sola vez, al entrar en pantalla.
  if ('IntersectionObserver' in window) {
    lista.classList.add('por-aparecer');
    const io = new IntersectionObserver((entradas) => {
      if (entradas.some((e) => e.isIntersecting)) {
        lista.classList.add('visible');
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(lista);
  }
})();
