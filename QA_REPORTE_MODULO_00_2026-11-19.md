# QA senior — Módulo 00 · Diagnóstico de Informática 8.º

**Institución:** Instituto Jorge Robledo
**Fecha:** 19 de noviembre de 2026
**Repositorio:** `IJR-JD/Inform-tica-Octavo`
**Commit de código validado:** `f0fadb21f55a69d25901f965678b3e805c852f57`
**Pruebas en Chromium:** [GitHub Actions, SUCCESS](https://github.com/IJR-JD/Inform-tica-Octavo/actions/runs/44599410267)
**Publicación GitHub Pages:** [Deploy, SUCCESS](https://github.com/IJR-JD/Inform-tica-Octavo/actions/runs/44599410438)

## Evaluación de aceptación

**Puntuación: 10/10 en los diez criterios funcionales automatizados especificados para este módulo**. Esta puntuación no equivale a certificación integral de seguridad, ausencia absoluta de defectos, validez psicométrica, accesibilidad WCAG completa ni autorización para calificación oficial.

| Criterio | Resultado |
| --- | ---: |
| Carga, navegación y acceso desde Learning Hub | 1/1 |
| Cobertura de seis dominios / 24 preguntas | 1/1 |
| Interacción de opción múltiple, texto, referencia y fórmula | 1/1 |
| Cálculo de puntuación global 0–24 | 1/1 |
| Desglose de competencia de 0–4 | 1/1 |
| Tres niveles orientativos y recomendaciones | 1/1 |
| Respuestas incompletas, corrección y reevaluación | 1/1 |
| Persistencia y retoma después de recargar | 1/1 |
| Exportación agregada y minimización de datos personales | 1/1 |
| Interfaz móvil, semántica de preguntas, estabilidad y despliegue | 1/1 |
| **Total** | **10/10** |

## Resultado técnico

- **44 verificaciones PASS para el módulo diagnóstico**, mediante `tests/diagnostic-qa.mjs`.
- **236 verificaciones PASS de regresión** para módulos 01–04, mediante `tests/excel-ux-qa.mjs`, `tests/excel-edge-qa.mjs` y `tests/excel-modules-qa.mjs`.
- **Total: 280 verificaciones satisfactorias** y cero excepciones JavaScript no controladas en las rutas ensayadas.
- QA de navegador y GitHub Pages: **SUCCESS para el mismo commit**.

## Dominios evaluados

Seis competencias, cuatro ítems por competencia:

1. Entorno digital y navegación.
2. Archivos y organización.
3. Hojas de cálculo (celdas, referencias, fórmula, cálculo).
4. Interpretación de datos (tabla, máximo, suma y promedio).
5. Pensamiento computacional (secuencias, patrones, condiciones y bucles).
6. Seguridad y ciudadanía digital.

Los ítems se diseñaron como evaluación exploratoria no estandarizada. El desempeño de solo cuatro preguntas por competencia debe interpretarse como **señal provisional para orientar apoyos**, no como medición exhaustiva o clasificación de capacidades.

### Interpretación local, no clínica ni permanente

Por dominio (4 preguntas):
- 0–1: **Requiere acompañamiento**.
- 2: **En desarrollo**.
- 3–4: **Fortaleza inicial**.

Globalmente:
- 0–11: **Punto de partida: refuerzo guiado**.
- 12–18: **Competencias en consolidación**.
- 19–24: **Aplicación relativamente autónoma**.

Los umbrales son **criterios pedagógicos orientativos** elegidos para guiar ejercicios; no están calibrados estadísticamente ni deben usarse para selección, sanciones o decisiones de alto impacto.

## Flujos funcionales ejecutados

- Un cuestionario vacío calcula 0/24 e indica que las preguntas sin responder cuentan como no acertadas.
- Un estudiante que acierta exactamente 12 preguntas obtiene 12/24 y un desglose independiente por dominio.
- Con las 24 claves correctas se obtiene 24/24; se verificó la posibilidad de acertar todos los ítems.
- La fórmula conmutativa `=C2*B2` se acepta, además de `=B2*C2`.
- Una respuesta numérica mal formateada se rechaza y puede corregirse sin reiniciar todo.
- Las ediciones invalidan los informes anteriores para evitar presentar datos desactualizados.
- Las respuestas y el último perfil se recuperan al recargar el navegador.
- La exportación JSON contiene agregado global, seis resultados por dominio y un código opcional; no exporta respuestas individuales.
- El reinicio solicita confirmación y elimina el resultado y las respuestas locales de la sesión.
- En Chromium a 375 px no se observó desbordamiento horizontal del documento.
- Todas las preguntas incluyen leyenda semántica y el progreso anuncia los cambios.
- Se comprobaron portada y acceso independiente al módulo 01.
- Una cancelación `net::ERR_ABORTED` de MP4 al abandonar una página con preloading es un comportamiento normal del navegador. Se ajustó la prueba QA para no confundirlo con un archivo inexistente.

## Protección de menores e integridad académica

- El sitio **no recoge nombres completos, correos ni documentos**. Admite un identificador interno opcional autorizado por el docente.
- Las respuestas y el informe se almacenan en `localStorage`, sin enviarse a Supabase.
- El informe JSON se descarga mediante una acción voluntaria del estudiante.
- `localStorage` y la clave de respuestas contenida en el JavaScript del sitio público pueden manipularse: **no es un examen seguro ni una calificación oficial antifraude**.
- Para perfilar cada estudiante a nivel institucional de forma fiable se requiere autenticación, tratamiento de datos adecuado para menores, consentimiento/aviso institucional donde corresponda, banco protegido y evaluación/almacenamiento del lado servidor.

## Riesgos fuera de alcance

No se realizó una calibración psicométrica de ítems, auditoría WCAG 2.2 completa, lectura con todas las tecnologías asistivas, prueba multibrowser (Firefox/Safari), prueba de carga ni auditoría de almacenamiento institucional. La nota QA reportada corresponde **únicamente a los criterios funcionales automatizados definidos**.
