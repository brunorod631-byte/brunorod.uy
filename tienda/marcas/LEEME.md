# Logos de marcas del hero

Poné acá los logos **oficiales** (del kit de prensa o la web de cada marca), no versiones redibujadas.

| Marca | Archivo |
|---|---|
| TP-Link / Tapo | `tp-link-tapo.svg` |
| Hikvision | `hikvision.svg` |
| Dahua | `dahua.svg` |
| Intelbras | `intelbras.svg` |
| EZVIZ | `ezviz.svg` |
| Xiongmai | `xiongmai.svg` |

- Formato: SVG preferido; si no hay, PNG de al menos 400 px de ancho con fondo transparente.
- Si la marca tiene versión **blanca o monocromo** oficial, usá esa (el fondo de la tienda es oscuro).
- Después, en `tienda/config.js` → `hero.marcas`, cambiá `logo: null` por la ruta, por ejemplo `logo: 'marcas/hikvision.svg'`.
- El hero los muestra todos a la misma altura (28 px). Si uno se ve chico o grande porque el archivo trae mucho margen, recortalo.
