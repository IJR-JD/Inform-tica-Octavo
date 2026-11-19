# QA senior — Módulo 00 · Examen diagnóstico cronometrado

**Institución:** Instituto Jorge Robledo · Informática 8.º  
**Fecha:** 19 de noviembre de 2026  
**Repositorio:** `IJR-JD/Inform-tica-Octavo`  
**Commit funcional auditado:** `83c39823df0a6affa16a0ebc661b36049e3757be`  
**QA en Chromium:** https://github.com/IJR-JD/Inform-tica-Octavo/actions/runs/44601717128 — **SUCCESS**  
**GitHub Pages:** https://github.com/IJR-JD/Inform-tica-Octavo/actions/runs/44601717161 — **SUCCESS**

## Alcance implementado

- Examen de 24 preguntas, cuatro preguntas por cada una de seis competencias.
- **30 minutos** de duración, contados desde que el estudiante inicia el examen. El cronómetro utiliza una fecha límite real persistida en `localStorage`; cerrar o recargar la pestaña no lo reinicia.
- **Una pregunta por pantalla**, con Anterior, Siguiente, índice numerado, indicación de respondidas y revisión sin soluciones antes de entregar.
- Entrega manual confirmada o **automática cuando vence el tiempo**; las respuestas posteriores quedan bloqueadas.
- Mayor tipografía, controles y superficies táctiles, diseño responsive.
- Figuras explicativas contextuales generadas mediante HTML/SVG: cuadrícula Excel, barras de datos, carpetas, navegador, flujograma y mensaje de seguridad.
- Preguntas originales de selección única, números, referencia de celda y fórmula.
- Perfil orientativo por seis competencias, explicaciones **solo después de entregar** y exportación JSON sin respuestas individuales.
- Sin bloqueo de las unidades 01–04 por resultado del diagnóstico.

## Verificación automatizada

| Suite | Comprobaciones |
|---|---:|
| Examen diagnóstico 00 (temporizador, revisión, perfil, exportación, móvil) | 50/50 |
| Excel Unidad 01 — recorrido secuencial | 98/98 |
| Excel Unidad 01 — casos límite | 20/20 |
| Excel módulos 02–04 — operación y navegación | 118/118 |
| **Total** | **286/286** |

**Calificación de aceptación funcional automatizada: 10/10** sobre los siguientes criterios acotados:

1. Inicio controlado de examen.
2. Un único ítem visible y navegación completa.
3. Tipografía, tamaños táctiles y diagramas en seis dominios.
4. Temporizador real de 30 minutos persistente.
5. Retención local de respuestas y recarga sin reinicio del tiempo.
6. Revisión previa con ocultación de respuestas correctas.
7. Calificación exacta con respuestas incompletas.
8. Cierre automático al expirar y bloqueo de edición.
9. Desglose del perfil, explicaciones postentrega y exportación agregada.
10. Compatibilidad móvil comprobada a 375 px, sin excepciones JS en recorridos cubiertos.

### Casos de navegador verificados

- El reloj comienza cuando se pulsa *Iniciar*, con fecha límite de 1 800 000 ms.
- Se conserva la respuesta al cambiar de pregunta y al recargar la página.
- Los gráficos, cuadrícula, carpetas, flujograma y avisos de seguridad se renderizan.
- El examen con 12 respuestas correctas produce 12/24; el examen con las 24 correctas produce 24/24.
- No se muestra la clave durante el examen ni durante la revisión.
- Tras la entrega el examen deja de ser editable y el resultado se recupera al recargar.
- El informe JSON omite respuestas individuales y contiene el desglose de seis competencias.
- Una fecha límite vencida produce la entrega automática al abrir o actualizar la sesión; se contabilizan solo las respuestas guardadas.
- Los 236 tests de regresión de los módulos 01–04 también aprobaron.

## Límites importantes

**No es un examen de alta seguridad.** La fecha límite, el banco de respuestas y el perfil están disponibles en el dispositivo; `localStorage` es manipulable por una persona con conocimientos técnicos. No se debe usar como evaluación sumativa oficial sin autenticación, almacenamiento protegido y validación de tiempo y puntuación del lado servidor.

Los gráficos y figuras se han creado como **ilustraciones educativas de situaciones reales**, no como capturas verificadas de equipos o plataformas. No se hizo una auditoría psicométrica, WCAG 2.2 completa, ni pruebas exhaustivas de Safari/Firefox o equipos físicos. La puntuación 10/10 se refiere exclusivamente a las pruebas funcionales automatizadas incluidas en la ejecución citada.

## Archivos principales

- `unidad-00-diagnostico/index.html`
- `unidad-00-diagnostico/exam-mode.js`
- `unidad-00-diagnostico/exam-mode.css`
- `unidad-00-diagnostico/banco-preguntas.js`
- `tests/diagnostic-qa.mjs`
