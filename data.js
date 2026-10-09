// Contenido de la web. Es la única fuente de datos: index.html se arma desde acá.
// Los PR son datos reales de GitHub (gh pr list), repos privados.

window.CV = {
  nombre: 'Bruno Rodríguez',
  titulo: 'Desarrollador freelance · Apps, bots y web · Seguridad y redes',
  lugar: 'Uruguay',
  resumen:
    'Construyo software que resuelve problemas reales de negocio: apps Android, bots de Telegram y tiendas online. ' +
    'También vendo e instalo cámaras de seguridad, alarmas y redes, con asesoramiento.',

  contacto: {
    whatsapp: 'https://wa.me/59898611824',
    telefono: '098 611 824',
    email: 'bruno@brunorod.uy',
    linkedin: 'https://linkedin.com/in/brunorodriguez-dev',
    github: 'https://github.com/brunorod631-byte',
  },

  proyectos: [
    {
      nombre: 'CamLibre',
      etiqueta: 'App Android',
      texto:
        'App propia para cámaras de seguridad Xiongmai/iCSee, sin publicidad. Video en vivo, PTZ, audio bidireccional ' +
        'y configuración del WiFi de la cámara por Bluetooth (protocolo reconstruido por ingeniería inversa).',
      stack: ['Kotlin', 'Jetpack Compose', 'DVRIP', 'ONVIF', 'RTSP', 'BLE'],
      imagenes: ['img/app/camlibre-inicio.webp', 'img/app/camlibre-video_en_vivo.webp', 'img/app/camlibre-dispositivos.webp'],
    },
    {
      nombre: 'Bot de pedidos y administración para una ferretería',
      etiqueta: 'Bot en producción',
      texto:
        'Bot de Telegram que usa el personal todos los días: pedidos de clientes, facturas de proveedores por mes, ' +
        'faltantes, libreta de crédito, buscador de productos y avisos automáticos a Discord. Más de 800 tests.',
      stack: ['Python', 'Telegram Bot API', 'Discord', 'Docker'],
      imagenes: [['img/app/bot-pedidos-menu.webp', 416, 1144]],
    },
    {
      nombre: 'App de mensajería segura y privada',
      etiqueta: 'App móvil + backend',
      texto:
        'Comunidad privada por invitación: mensajería en tiempo real, historias que se borran a las 24 h, ' +
        'moderación y pagos con Mercado Pago. Privacidad por diseño (se borran los datos GPS de fotos y videos).',
      stack: ['React Native', 'Expo', 'Node.js', 'WebSocket', 'SQLite'],
      imagenes: ['img/app/pambauy-chats.webp', 'img/app/pambauy-cerca.webp', 'img/app/pambauy-historia.webp', 'img/app/pambauy-chat.webp']
        .map((src) => [src, 480, 1039]),
    },
    {
      nombre: 'Polarizados a Medida',
      etiqueta: 'E-commerce',
      texto:
        'Tienda online de kits de polarizado cortados a medida: el cliente elige marca, modelo y versión de su auto ' +
        'y ve los kits compatibles con stock real.',
      stack: ['Next.js', 'Prisma', 'PostgreSQL'],
    },
    {
      nombre: 'Bot de productos para Shopify',
      etiqueta: 'Bot + e-commerce',
      texto:
        'Carga productos a una tienda online sin tipear nada. Copiás el link de un producto de otra página ' +
        '(Mercado Libre, INGCO, Würth y otras) y se lo mandás al bot por Telegram. El bot entra a esa página y saca ' +
        'la foto, el título, la descripción y el precio: reescribe la descripción en español, le quita los códigos internos ' +
        'y, si el precio está en dólares u otra moneda, lo pasa a pesos uruguayos con la cotización del día y le suma tu recargo. ' +
        'Te muestra todo para revisar y corregir, lo guarda como borrador en Shopify y lo publica en la tienda ' +
        '(y en Instagram) solo cuando lo confirmás.',
      stack: ['Python', 'Telegram Bot API', 'Shopify API', 'Instagram'],
      imagenes: [['img/app/bot-productos-shopify.webp', 419, 858]],
    },
  ],

  // PR mergeados, datos reales. fecha = día del merge.
  prs: {
    CamLibre: [
      [17, 'Agregar README con capturas de pantalla', '2026-09-22', 36, 0, 6],
      [16, 'Mostrar miniaturas reales de las cámaras DVRIP', '2026-09-17', 189, 17, 10],
      [15, 'Implementar audio bidireccional (OPTalk) en el adaptador DVRIP', '2026-09-17', 503, 7, 12],
      [14, 'Configurar WiFi de cámaras Xiongmai/iCSee por Bluetooth', '2026-09-17', 380, 4, 4],
      [13, 'Autenticar la URL RTSP de cámaras Xiongmai embebiendo user:pass', '2026-09-17', 39, 1, 3],
      [12, 'Mostrar el logo de CamLibre en el header', '2026-09-13', 28, 2, 3],
      [11, 'Renombrar la app a "CamLibre" y aplicar el logo nuevo', '2026-09-13', 23, 7, 10],
      [10, 'Agregar escaneo Bluetooth (BLE) en "Agregar cámara"', '2026-09-13', 298, 1, 4],
      [9, 'Mostrar el control PTZ siempre en el video en vivo', '2026-09-13', 4, 9, 1],
      [8, 'Rediseñar la interfaz de la app (estilo Ring/Arlo)', '2026-09-13', 1353, 178, 17],
      [7, 'Conectar el adaptador ONVIF real en la app (selector de protocolo)', '2026-09-13', 962, 32, 11],
      [6, 'Adaptador ONVIF real (SOAP/HTTP, WS-Security, Media, PTZ)', '2026-09-12', 902, 19, 8],
      [5, 'getCapabilities() real del DVRIP (detección de movimiento verificada)', '2026-09-12', 90, 8, 4],
      [4, 'Video real con media3-exoplayer-rtsp para cámaras reales', '2026-09-12', 136, 11, 5],
      [3, 'Agregar cámaras reales: pantalla, persistencia y adaptador DVRIP', '2026-09-12', 346, 30, 10],
      [2, 'Adaptador DVRIP real (login, keepalive, PTZ, streaming en vivo)', '2026-09-12', 824, 0, 2],
      [1, 'Core de cámaras + MVP de app (lista + video en vivo)', '2026-09-12', 2901, 0, 58],
    ],
    'Bot ferretería': [
      [39, 'fix(crédito): el botón "Crédito" del menú principal nunca abre el padrón', '2026-09-09', 86, 38, 2],
      [38, 'feat(crédito): vista del empleado sin saldos y botones sin emoji', '2026-09-09', 253, 140, 3],
      [36, 'feat: libreta de crédito (fiado) — conversación de Telegram, menú y tests', '2026-09-08', 1321, 3, 7],
      [35, 'Comando /estado y verificación de servicio para uso diario', '2026-09-05', 577, 2, 10],
      [34, 'feat: botones "Editar" en todo lo editable', '2026-09-03', 588, 8, 7],
      [33, 'Sección Clientes, archivar pedido de cliente y acceso para empleados', '2026-09-02', 562, 20, 11],
      [30, 'fix: "Facturas por mes" interactiva + resumen a Discord automático', '2026-09-01', 249, 196, 6],
      [22, 'feat: notificaciones del bot hacia Discord (webhook)', '2026-08-30', 315, 2, 7],
      [18, 'Buscador de productos por nombre desde todos los menús', '2026-08-30', 247, 6, 6],
      [16, 'Clasificación en 22 categorías + taxonomía ferretera uruguaya', '2026-08-30', 371, 344, 25],
      [15, 'feat: candado con PIN para toda acción de borrado', '2026-08-29', 458, 269, 14],
      [10, 'feat: método de pago y comprobante al confirmar pago de factura', '2026-08-28', 268, 26, 7],
      [1, 'feat: elegir empresa de proveedor por botón y depurar catálogo', '2026-08-27', 576, 45, 7],
    ],
    'App de mensajería': [
      [2, 'Fase 3.5 (app): grabar y ver estados de video', '2026-09-10', 472, 67, 15],
      [1, 'Fase 3.5 (backend): video en estados con ffmpeg', '2026-09-10', 730, 55, 16],
    ],
  },
  // Capturas reales de GitHub (se agregan en img/prs/). Si la lista está vacía, no se muestra el bloque.
  capturas: [
    { src: 'img/prs/camlibre-14-wifi-bluetooth.webp', texto: 'CamLibre #14 — Protocolo WiFi por Bluetooth reconstruido por ingeniería inversa' },
    { src: 'img/prs/bot-ferreteria-36-libreta-credito.webp', texto: 'Bot ferretería #36 — Libreta de crédito (fiado) en Telegram, con tests' },
    { src: 'img/prs/camlibre-8-rediseno.webp', texto: 'CamLibre #8 — Rediseño completo de la interfaz' },
    { src: 'img/prs/pambauy-1-video-ffmpeg.webp', texto: 'App de mensajería #1 — Video en estados, borrando los datos GPS con ffmpeg' },
  ],

  creditos: [
    '"Security Camera" — Vladyslav Holhanov (Sketchfab), CC BY 4.0 · usado en la bienvenida',
    '"Pomo Inteligente para Entrada del Hogar" — Eonesia_world (Sketchfab), CC BY 4.0 · usado en la tienda',
    'Pizza "BigBoss" — ponomarovmax (Sketchfab), CC BY 4.0',
    '"Strawberry Chocolate Cake" — Poly Haven, CC0',
    '"Big Mac" — Aaron Theesfeld (Sketchfab), CC BY 4.0 · optimizado y escalado',
    '"Pasta with Meatballs and Sausage" — Michael Bastianelli (Sketchfab), CC BY 4.0 · optimizado y escalado',
    '"Washing Machine (new)" — nikita.bulgakov (Sketchfab), CC BY 4.0 · optimizado y escalado',
    '"Microwave Oven" — Mustafa Yerebasmaz (Sketchfab), CC BY 4.0 · optimizado y escalado',
    '"Led Tv" — Daniyal Malik (Sketchfab), CC BY 4.0 · optimizado y escalado',
    '"Air condition Daikin" — maxsbond.work (Sketchfab), CC BY 4.0 · optimizado y escalado',
    '"Modern Fridge" — dylanheyes (Sketchfab), CC BY 4.0 · optimizado y escalado',
    '"Blender" — giga / gits3d (Sketchfab), CC BY 4.0 · optimizado y escalado',
    '"(FREE) Porsche 911 Carrera 4S" — Karol Miklas (Sketchfab), CC BY-SA 4.0',
    'Gorila low poly — iRahulRajput (Sketchfab), CC BY 4.0',
    '"RobotExpressive" — Tomás Laulhé, modificado por Don McCurdy, CC0',
    '"Glam Velvet Sofa" — Eric Chadwick / Wayfair (Khronos glTF Sample Assets), CC BY 4.0',
    '"Sheen Chair" — Eric Chadwick / Wayfair (Khronos glTF Sample Assets), CC0',
    '"Wooden Table 02" y "Painted Wooden Nightstand" — Poly Haven, CC0',
    'Animación "Robot Wave" — Irby Pace (LottieFiles), Lottie Simple License · recortada y optimizada',
    'Animación "AI bot" — Trình (LottieFiles), Lottie Simple License · optimizada',
  ],
};
