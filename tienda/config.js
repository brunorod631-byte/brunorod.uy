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
      { categoria: 'DVR/NVR', corto: 'DVR/NVR', icono: 'grabador' },
      { categoria: 'Accesorios CCTV', corto: 'Accesorios', icono: 'accesorios' },
    ],
    // `logo`: ruta al logo oficial (ver marcas/LEEME.md). Mientras sea null se muestra el nombre en texto.
    // TODO: cargar los logos oficiales y completar `logo` en cada una.
    marcas: [
      { nombre: 'TP-Link / Tapo', logo: null }, // marcas/tp-link-tapo.svg
      { nombre: 'Hikvision', logo: null }, // marcas/hikvision.svg
      { nombre: 'Dahua', logo: null }, // marcas/dahua.svg
      { nombre: 'Intelbras', logo: null }, // marcas/intelbras.svg
      { nombre: 'EZVIZ', logo: null }, // marcas/ezviz.svg
      { nombre: 'Xiongmai', logo: null }, // marcas/xiongmai.svg
    ],
  },
};
