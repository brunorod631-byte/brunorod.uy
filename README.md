# brunorod.uy — Bruno Rodríguez

Página estática (HTML/CSS/JS, sin build) publicada en GitHub Pages: https://brunorod.uy/

- `data.js`: contenido de la portada (proyectos, PR, contacto, créditos). Para cambiar algo, se edita solo este archivo.
- `index.html` + `app.js` + `style.css`: la página.
- `qr.html`: tarjetas con QR para imprimir (web y tienda).
- `img/prs/`: capturas de GitHub. Se agregan en `capturas` de `data.js` como `{ src: 'img/prs/x.png', texto: '...' }`.
- Al publicar cambios, subir el `?v=` de `style.css`, `data.js` y `app.js` en `index.html` para que el celular no muestre la versión vieja.

Modelos 3D y animaciones de terceros: ver `creditos.html`.

## Tarjetas para imprimir

- `tarjetas.html`: hoja A4 con 10 tarjetas de 85,6 × 54 mm.
- `tarjeta-visita.html?modo=imprenta|a4`: tarjeta de 85,6 × 54 mm a doble faz. PDF en `imprimir/tarjeta-visita-imprenta.pdf` (91,6 × 60 mm con 3 mm de sangrado, pág. 1 frente, pág. 2 dorso) y `imprimir/tarjeta-visita-a4.pdf` (10 por hoja, para doble faz).
- PDF listos en `imprimir/` (se regeneran con Chrome headless `--print-to-pdf` si cambia el diseño).

## Bienvenida

- Se muestra al entrar por la dirección general (una vez por sesión). Con `#sección` en la URL va directo.
- `sillon3d.js` anima el modelo 3D (`models/camara-domo.glb`) y `robotpaseo.js` el robot que cruza la página.

## Tienda (`/tienda/`)

- Productos, categorías y fotos se cargan en el panel `brunorod.uy/admin` (Worker `cv-tienda`, repo aparte) y la tienda los lee de `/api/tienda/catalogo`.
- `tienda/config.js`: WhatsApp, texto de pago y opciones de entrega.
- Carrito en el navegador del cliente (localStorage). El pedido se manda por WhatsApp con el detalle, y el pago es por transferencia (los datos de la cuenta se pasan por WhatsApp, no están en la web).
- `brunorod.uy/tienda/#<id>` abre directo la ficha de un producto (sirve para compartir).
- Al cambiar `config.js`, `tienda.js` o `tienda.css`, subir su `?v=` en `tienda/index.html`.
- Hero de la tienda: título, bajada y botones en `tienda/index.html`; accesos a categorías y marcas en `tienda/config.js` → `hero` (lo arma `tienda/hero.js`, estilos en `tienda/hero.css`). Los logos oficiales van en `tienda/marcas/` (ver `LEEME.md` ahí). `?categoria=<slug>` abre la tienda filtrada.
