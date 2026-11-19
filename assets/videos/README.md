# Videos MP4 · Informática 8

Full HD 1920×1080 · 30 fps · H.264 (CRF 16) · sin audio · cada archivo dura exactamente un ciclo, así que el bucle es continuo.
Miniaturas para tarjetas: `assets/videos/thumbs/` (640×360).

| Código | Lección (motor) | Contenido | Duración | Archivo |
|---|---|---|---|---|
| `topic-01` | `cell` | Tema 01 · Excel · primeros pasos | 17.6 s | `assets/videos/topic-01.mp4` |
| `topic-02` | `formulas` | Tema 02 · Operaciones y fórmulas | 19.2 s | `assets/videos/topic-02.mp4` |
| `topic-03` | `errors` | Tema 03 · Errores y depuración | 19.2 s | `assets/videos/topic-03.mp4` |
| `topic-04` | `chart` | Tema 04 · Gráficos y decisiones | 15.4 s | `assets/videos/topic-04.mp4` |
| `topic-05` | `project` | Tema 05 · Proyecto · emprendimiento | 20.4 s | `assets/videos/topic-05.mp4` |
| `topic-06` | `references` | Tema 06 · Referencias de celdas | 17.8 s | `assets/videos/topic-06.mp4` |
| `topic-07` | `stats` | Tema 07 · Funciones estadísticas | 18.7 s | `assets/videos/topic-07.mp4` |
| `topic-08` | `html` | Tema 08 · HTML · estructura | 19.7 s | `assets/videos/topic-08.mp4` |
| `topic-09` | `css` | Tema 09 · CSS · diseño y accesibilidad | 19.7 s | `assets/videos/topic-09.mp4` |
| `topic-10` | `site` | Tema 10 · Organización de un sitio | 22.7 s | `assets/videos/topic-10.mp4` |
| `topic-11` | `webproject` | Tema 11 · Proyecto final · sitio web | 21.5 s | `assets/videos/topic-11.mp4` |
| `topic-12` | `validation` | Tema 12 · Validación de un proyecto | 17.6 s | `assets/videos/topic-12.mp4` |
| `u01-data` | `data` | Unidad 01 · Ej. 2 · Texto y números | 19.4 s | `assets/videos/u01-data.mp4` |
| `u01-addition` | `addition` | Unidad 01 · Ej. 3 · Suma | 17.6 s | `assets/videos/u01-addition.mp4` |
| `u01-subtraction` | `subtraction` | Unidad 01 · Ej. 4 · Resta | 17.6 s | `assets/videos/u01-subtraction.mp4` |
| `u01-multiplication` | `multiplication` | Unidad 01 · Ej. 5 · Multiplicación | 17.6 s | `assets/videos/u01-multiplication.mp4` |
| `u01-division` | `division` | Unidad 01 · Ej. 6 · División | 17.6 s | `assets/videos/u01-division.mp4` |
| `u01-sum` | `sum` | Unidad 01 · Ej. 7 · Función SUMA | 18.2 s | `assets/videos/u01-sum.mp4` |

## Código para insertar un video

```html
<video src="assets/videos/topic-04.mp4" autoplay muted loop playsinline
       preload="metadata" width="1920" height="1080"
       style="width:100%;height:auto;border-radius:12px"
       aria-label="Demostración animada: Gráficos y decisiones"></video>
```

Desde `unidad-01-excel/` usa `../assets/videos/u01-sum.mp4`. `muted` + `playsinline` son obligatorios para que el navegador permita la reproducción automática.

## Código para mostrar la animación interactiva (con controles)

```html
<link rel="stylesheet" href="motion-figures.css">
<div id="demo"></div>
<script src="motion-figures.js"></script>
<script>AnimatedExcelFigures.render("chart", document.getElementById("demo"));</script>
```

El nombre de la lección es la columna «Lección (motor)». `AnimatedExcelFigures.loopMs("chart")` devuelve la duración del ciclo en milisegundos.
