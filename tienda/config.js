// Configuración de la tienda. Los productos y las categorías se cargan desde el panel
// (brunorod.uy/admin) y llegan por la API /api/tienda/catalogo (Worker cv-tienda).

window.TIENDA = {
  whatsapp: '59898611824',
  pago:
    'Pago por transferencia bancaria. Al recibir tu pedido te confirmo stock y total por WhatsApp ' +
    'y te paso los datos de la cuenta.',
  entrega: ['Retiro coordinado', 'Envío a domicilio'],

  // Hero: accesos a categorías y franja de marcas (los textos del título están en index.html).
  hero: {
    // `categoria` tiene que coincidir con el nombre de la categoría en el panel (/admin).
    // `corto` es el texto visible; `icono` es un <symbol id="ico-..."> de index.html.
    categorias: [
      { categoria: 'Cámaras', corto: 'Cámaras', icono: 'camara' },
      { categoria: 'Alarmas', corto: 'Alarmas', icono: 'alarma' },
      { categoria: 'Porteros', corto: 'Porteros', icono: 'portero' },
      { categoria: 'Cerraduras inteligentes', corto: 'Cerraduras', icono: 'cerradura' },
      { categoria: 'Redes y conectividad', corto: 'Redes y WiFi', icono: 'redes' },
      { categoria: 'Electricidad inteligente', corto: 'Electricidad', icono: 'electricidad' },
      { categoria: 'DVR/NVR', corto: 'DVR/NVR', icono: 'grabador' },
      { categoria: 'Accesorios CCTV', corto: 'Accesorios', icono: 'accesorios' },
    ],
    // `logo`: logo oficial (sacado del sitio de cada marca, sin modificar; ver marcas/LEEME.md).
    // Si es null se muestra el nombre en texto. `escala` agranda un logo que se ve chico (1 = normal).
    marcas: [
      { nombre: 'TP-Link', logo: 'marcas/tp-link.svg', escala: 1.35 },
      { nombre: 'Tapo', logo: 'marcas/tapo.svg' },
      { nombre: 'Hikvision', logo: 'marcas/hikvision.svg' },
      { nombre: 'Dahua', logo: 'marcas/dahua.png' },
      { nombre: 'Intelbras', logo: 'marcas/intelbras.svg' },
      { nombre: 'EZVIZ', logo: 'marcas/ezviz.svg' },
      // TODO: el sitio oficial (xiongmaitech.com) no respondía el 2026-10-04; cargar marcas/xiongmai.svg.
      { nombre: 'Xiongmai', logo: null },
    ],
  },
};
