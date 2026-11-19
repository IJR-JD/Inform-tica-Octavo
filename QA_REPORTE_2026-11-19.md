# Auditoría QA senior — Informática 8.º · Unidad 01 de Excel
**Fecha:** 19 de noviembre de 2026
**Repositorio:** `IJR-JD/Inform-tica-Octavo`
**Build validado:** `7ed0abfbfe28a2da3a075aa7043fea10a7e67e48`
**GitHub Actions QA:** https://github.com/IJR-JD/Inform-tica-Octavo/actions/runs/44592925573
**GitHub Pages:** https://github.com/IJR-JD/Inform-tica-Octavo/actions/runs/44592925540

## Resultado
**10/10 en los diez criterios de aceptación funcional automatizados definidos a continuación.**
Dos suites reales con Playwright/Chromium: **98 verificaciones de flujo secuencial + 20 de casos extremos = 118 verificaciones PASS**. Ambas suites terminaron sin excepciones JavaScript y el despliegue de GitHub Pages terminó SUCCESS para el mismo commit.

Esta calificación delimita la funcionalidad probada, no garantiza ausencia universal de defectos. No implica auditoría de seguridad de autenticación, pruebas con todos los navegadores/dispositivos reales, accesibilidad WCAG integral ni verificación integral del back-end Supabase.

## Matriz de criterios
| Criterio automatizado | Puntuación | Evidencia |
| --- | ---: | --- |
| 1. Carga y estructura de la unidad | 1/1 | HTTP 200, siete lecciones, siete hojas editables |
| 2. Material audiovisual | 1/1 | Siete videos MP4 referenciados, archivos clave accesibles |
| 3. Bloqueo y secuenciación | 1/1 | Índice cerrado, enlaces sin bypass, apertura tras aprobación |
| 4. Edición de celdas y teclado | 1/1 | Escribir, F2, Enter, barra ƒx |
| 5. Evaluación de fórmulas | 1/1 | Suma, resta, multiplicación, división y SUMA |
| 6. Manejo de errores y feedback | 1/1 | Rechazo de respuesta incorrecta, `#DIV/0!`, posterior corrección |
| 7. Persistencia y recuperación | 1/1 | Registro y respuestas tras recargar, protección contra claves anómalas |
| 8. Integridad de progreso | 1/1 | Revocación cuando cambia una solución, restauración al recomprobar, reset |
| 9. Diseño adaptable y legibilidad | 1/1 | Tipografía ampliada, celdas mayores, vista 390/375 px sin overflow de página |
| 10. Estabilidad y despliegue | 1/1 | 0 excepciones JS en los recorridos, QA SUCCESS, Pages SUCCESS |
| **TOTAL** | **10/10** | **118 pruebas satisfactorias** |

## Hallazgo corregido en esta revisión
**Barra de fórmulas ƒx:** al perder el foco podía volver a guardar contenidos sin edición explícita. Riesgo: invalidación del progreso y escritura accidental. Se corrigió para que solo haya confirmación cuando el usuario haya modificado la barra. Se añadió soporte de cálculo `SUM` además de `SUMA` y saneamiento básico de las celdas restauradas de `localStorage`.

## Casos de aceptación probados
- La primera lección permite escribir `VENTAS` en `B2`; no desbloquea la segunda sin verificación correcta.
- Texto y cantidades `A2=Cuaderno` y `B2=4`.
- `=B2+B3` recalcula tras modificar los valores de origen; `=B2-B3` se rechaza cuando se espera suma.
- Resta de inventarios, multiplicación de subtotales, división por cero y recuperación, `=SUMA(B2:B4)`.
- Imposibilidad de saltar desde el índice a la lección siete mientras está bloqueada.
- Solo después de validar siete conceptos se habilita el laboratorio final.
- Recarga del navegador restaura respuestas y aprobaciones.
- Editar una solución ya aprobada invalida esa aprobación y las posteriores.
- Una barra ƒx que recibe foco y se abandona sin cambios no altera una solución aprobada.
- El navegador a 375 px conserva el desplazamiento dentro de la hoja en lugar de desbordar toda la página.

## Riesgos y límites pendientes (fuera de esta puntuación)
1. **Integridad institucional:** la progresión y las respuestas están en `localStorage`, por lo que un usuario con acceso a DevTools podría alterarlas. No utilizar como notas oficiales ni como evidencia antifraude. Un sistema de calificación institucional requiere identidad, reglas de validación y persistencia segura en servidor.
2. **Compatibilidad:** Chromium en CI no sustituye pruebas manuales en Safari, Firefox, navegadores móviles ni dispositivos de bajas prestaciones.
3. **Accesibilidad:** la evaluación no sustituye una auditoría integral WCAG 2.2 (lector de pantalla, contraste instrumentado, navegación completa sin ratón y preferencias de movimiento).
4. **Multimedia:** se verificó la presencia de los siete videos y la disponibilidad HTTP de archivos representativos. No se reprodujo completamente cada video en todos los navegadores.
5. **Datos personales:** no se probaron políticas Supabase porque esta unidad todavía funciona con almacenamiento local.

## Protocolo de mantenimiento
Cada cambio en `unidad-01-excel/**`, `pedagogia-modulos.js` o las suites dispara `QA · Excel editable UX (Chromium)`. Un despliegue exitoso sin QA satisfactorio **no** autoriza declarar la entrega como 10/10. Se deben revisar ambas ejecuciones (QA y Pages) para el mismo commit.

**Scripts:** `tests/excel-ux-qa.mjs` y `tests/excel-edge-qa.mjs`.
