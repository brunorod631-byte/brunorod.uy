# Logos de marcas del hero

Logos **oficiales**, sacados del sitio de cada marca el 2026-10-04, sin modificar (ni colores ni formas;
solo a Dahua se le recortó el margen transparente y se achicó).

| Marca | Archivo | Origen |
|---|---|---|
| TP-Link | `tp-link.svg` | static.tp-link.com/assets/images/icon/logo.svg (encabezado de tp-link.com) |
| Tapo | `tapo.svg` | static.tapo.com/res/new-home/tapo.svg (encabezado de tapo.com) |
| Hikvision | `hikvision.svg` | símbolo `icon-a-HikvisionLogo-R` del encabezado de hikvision.com (versión a color) |
| Dahua | `dahua.png` | www.dahuasecurity.com/logo.png (encabezado) |
| Intelbras | `intelbras.svg` | SVG del encabezado de intelbras.com/pt-br |
| EZVIZ | `ezviz.svg` | SVG del encabezado de ezviz.com |
| Xiongmai | — | **Falta**: xiongmaitech.com no respondía. Mientras tanto se muestra el nombre en texto. |

- En el hero se muestran a color sobre una pastilla clara (`hero.css`, `.ht-marca`), todas a la misma altura.
- Para agregar o cambiar uno: poné el archivo acá y completá `logo` en `tienda/config.js` → `hero.marcas`.
  Si se ve chico porque el archivo trae mucho margen, agregá `escala: 1.2` (o lo que haga falta).
- Si una marca te pasa su kit oficial (por ejemplo vía el distribuidor), preferí ese archivo.
