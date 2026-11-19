# Auditoría QA senior — Primeros cuatro módulos · Informática 8.º

**Institución:** Instituto Jorge Robledo
**Fecha:** 19 de noviembre de 2026
**Repositorio:** `IJR-JD/Inform-tica-Octavo`
**Código auditado:** commit `eb4b79318371a8e67c8bc5b865d0d937eb996cc2`
**QA ejecutado:** [GitHub Actions — SUCCESS](https://github.com/IJR-JD/Inform-tica-Octavo/actions/runs/44596802562)
**Publicación:** [GitHub Pages — SUCCESS](https://github.com/IJR-JD/Inform-tica-Octavo/actions/runs/44596802506)

## Resultado

**10/10 en el alcance funcional automatizado definido**. Se completaron **236 verificaciones PASS** en Chromium contra el código del mismo commit desplegado: 98 pruebas de progresión/operaciones de la Unidad 01; 20 pruebas de casos extremos y accesibilidad funcional de la Unidad 01; 118 verificaciones para unidades 02–04 y navegación de la portada. Cero excepciones JavaScript no controladas observadas en esos recorridos.

La puntuación corresponde al conjunto de pruebas especificado y ejecutado. No constituye garantía universal de ausencia de defectos, ni auditoría de seguridad de servidor, accesibilidad WCAG íntegra o compatibilidad de todos los dispositivos.

## Matriz de 10 criterios

| Criterio | Nota | Evidencia |
|---|---:|---|
| 1. Acceso y carga de los cuatro módulos | 1/1 | Rutas 01–04 y contenido generado |
| 2. Cobertura teórica y audiovisual | 1/1 | Explicaciones, ejemplos y MP4 presentes |
| 3. Celdas editables y fórmulas | 1/1 | 22 ejercicios con hoja funcional |
| 4. Validación correcta de resultados | 1/1 | Todos los 22 escenarios resueltos |
| 5. Mensajes ante respuestas incorrectas | 1/1 | Corrección sin aprobar respuestas inválidas |
| 6. Desbloqueo secuencial dentro del módulo | 1/1 | Sin enlaces que permitan saltar ejercicios |
| 7. Requisitos entre módulos 01–04 | 1/1 | Acceso a siguiente módulo tras aprobación anterior |
| 8. Persistencia e integridad del progreso | 1/1 | Recarga, edición posterior, bloqueo y recuperación |
| 9. Presentación adaptativa y gráficos | 1/1 | Tipografía ampliada, móvil y gráfico dinámico |
| 10. Estabilidad del navegador y publicación | 1/1 | Chromium sin excepciones + Pages SUCCESS |
| **TOTAL** | **10/10** | **236/236 PASS** |

## Cobertura curricular y actividades

### Módulo 01 — Excel · primeros pasos — 7 ejercicios
- Intersección de columnas/filas y referencia B2.
- Texto y números.
- Suma y resta.
- Multiplicación y división.
- Función SUMA y rangos.

### Módulo 02 — Operaciones y fórmulas — 5 ejercicios
- Suma de entregas de tienda escolar.
- Resta de existencias.
- Subtotal de cuadernos mediante multiplicación.
- División para hallar precio unitario.
- Fórmula combinada con prioridad de operaciones (`=B2*C2+B3*C3`).

### Módulo 03 — Errores y depuración — 5 ejercicios
- `#DIV/0!`: corregir divisor sin borrar fórmula.
- Referencia equivocada: reparar lectura de celdas.
- Sintaxis inválida: usar `*` y no `x`.
- Incompatibilidad texto/número: corregir un dato.
- Referencia circular: sustituir autorreferencia por datos válidos.

### Módulo 04 — Gráficos y decisiones — 5 ejercicios
- SUMA y gráfico de cantidades por fruta.
- Identificación de categoría con mayor frecuencia.
- Actualización dinámica de barras y total al editar datos.
- Diferencia entre dos categorías mediante resta.
- Informe con total, título y categoría líder.

## Evidencias verificadas en navegador

- Escritura en celdas reales, barra de fórmulas y teclado.
- Rechazo de errores y verificación de operaciones.
- Comportamiento secuencial en cada conjunto de ejercicios.
- Bloqueo del módulo 02 sin completar previamente el módulo 01.
- Desbloqueos 02→03 y 03→04 tras registrar todos los ejercicios anteriores.
- Progreso recuperado tras recargar la página.
- Invalidación de la aprobación cuando se altera una respuesta comprobada.
- En el módulo 04, las barras cambian de proporción al pasar de 35 a 40 unidades y el total pasa de 80 a 85.
- En la portada, las cuatro tarjetas muestran 100 % al terminar las respectivas unidades y la navegación conduce a la página real.
- Vista móvil de 375 px sin desbordamiento horizontal del documento.

## Infraestructura reproducible

La automatización `.github/workflows/qa-excel-ux.yml` ejecuta:
1. `tests/excel-ux-qa.mjs` — 98 verificaciones.
2. `tests/excel-edge-qa.mjs` — 20 verificaciones.
3. `tests/excel-modules-qa.mjs` — 118 verificaciones.

Se utiliza Node.js 22, Playwright + Chromium en Ubuntu 24.04 y un servidor HTTP local del mismo árbol fuente. Los resultados de Actions y Pages se comprobaron para el mismo commit `eb4b793...`.

## Límites y mejoras futuras

- El progreso y las respuestas se guardan en `localStorage`; no tienen garantía antifraude y **no son calificaciones oficiales**. Integrar identidad y validación desde servidor antes de su uso evaluativo institucional.
- Se ejecutaron pruebas automatizadas en Chromium; no se certificaron Safari, Firefox, todas las resoluciones ni una evaluación WCAG 2.2 completa.
- Las demostraciones MP4 se verificaron como recursos accesibles y asociados a sus ejercicios, sin una revisión audiovisual manual de cada fotograma.
- La prueba de gráficos actualiza SVG en el cliente; no implica exportación de gráficos de Excel.
- La totalidad de datos y progreso permanece local en cada navegador. No se asegura sincronización entre dispositivos ni integración Supabase.

**Conclusión:** puntuación de aceptación automatizada **10/10** en cuatro módulos, 22 ejercicios y 236 comprobaciones; no equivale a garantía universal de calidad o seguridad.
