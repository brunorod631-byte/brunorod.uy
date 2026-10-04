// Catálogo de la tienda. Es la única fuente de datos: tienda/index.html se arma desde acá.
// Para agregar un producto, copiá el ejemplo de abajo dentro de `productos` y completalo.
//
// {
//   id: 'camara-domo-3mp',             // único, sin espacios ni tildes (va en la URL)
//   nombre: 'Cámara domo WiFi 3 MP',
//   categoria: 'Cámaras',              // tiene que estar en `categorias`
//   precio: 1990,                      // número sin puntos; null = "Consultar precio"
//   moneda: 'UYU',                     // 'UYU' o 'USD'
//   fotos: ['img/camara-domo-3mp.webp'], // en tienda/img/; la primera es la portada
//   resumen: 'Una línea que se ve en la tarjeta.',
//   descripcion: 'Texto largo de la ficha. Se puede usar \n para separar párrafos.',
//   caracteristicas: ['Resolución 3 MP', 'Visión nocturna'],
//   stock: true,                       // false = "Sin stock" (no se puede agregar al carrito)
// },

window.TIENDA = {
  whatsapp: '59898611824',
  categorias: ['Cámaras', 'Componentes'],
  pago:
    'Pago por transferencia bancaria. Al recibir tu pedido te confirmo stock y total por WhatsApp ' +
    'y te paso los datos de la cuenta.',
  entrega: ['Retiro coordinado', 'Envío a domicilio'],
  productos: [],
};
