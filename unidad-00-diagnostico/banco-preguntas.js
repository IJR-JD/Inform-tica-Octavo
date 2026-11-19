window.IJRDiagnosticBank={
  "version": "2026-11-19-v1",
  "domains": [
    {
      "id": "operacion",
      "title": "Entorno digital y navegación",
      "description": "Uso responsable de equipos, aplicaciones y navegación web.",
      "course": "Unidad 01",
      "link": "../unidad-01-excel/"
    },
    {
      "id": "archivos",
      "title": "Archivos y organización",
      "description": "Carpetas, extensiones, copias y versiones de archivos.",
      "course": "Prácticas digitales",
      "link": "../"
    },
    {
      "id": "excel",
      "title": "Hojas de cálculo",
      "description": "Celdas, datos y fórmulas de Excel.",
      "course": "Unidades 01–02",
      "link": "../unidad-01-excel/"
    },
    {
      "id": "datos",
      "title": "Interpretación de datos",
      "description": "Tablas, gráficos, comparación e interpretación.",
      "course": "Unidad 04",
      "link": "../unidad-04-excel/"
    },
    {
      "id": "logica",
      "title": "Pensamiento computacional",
      "description": "Secuencias, condiciones, patrones y resolución de problemas.",
      "course": "Seminario y programación",
      "link": "../"
    },
    {
      "id": "seguridad",
      "title": "Seguridad y ciudadanía digital",
      "description": "Contraseñas, privacidad, fuentes confiables y comunicación respetuosa.",
      "course": "Ciudadanía digital",
      "link": "../"
    }
  ],
  "questions": [
    {
      "id": "o1",
      "domain": "operacion",
      "kind": "choice",
      "question": "Al abrir una página web, ¿cuál de estos programas utilizarías?",
      "options": [
        "Un navegador web",
        "Una calculadora",
        "Un editor de fotografías",
        "Un reproductor de audio"
      ],
      "correct": 0,
      "explain": "Un navegador (por ejemplo, Chrome, Edge o Firefox) permite visitar páginas web."
    },
    {
      "id": "o2",
      "domain": "operacion",
      "kind": "choice",
      "question": "Necesitas abrir otra pestaña sin cerrar la página actual. ¿Qué combinación es habitual en Windows?",
      "options": [
        "Ctrl + T",
        "Ctrl + S",
        "Ctrl + P",
        "Alt + F4"
      ],
      "correct": 0,
      "explain": "Ctrl + T abre una pestaña nueva en la mayoría de los navegadores."
    },
    {
      "id": "o3",
      "domain": "operacion",
      "kind": "choice",
      "question": "Una aplicación deja de responder. ¿Qué acción es más adecuada primero?",
      "options": [
        "Apagar el equipo desconectándolo de la corriente",
        "Esperar brevemente y comprobar si responde",
        "Borrar todas las carpetas",
        "Instalar cualquier programa sugerido en una publicidad"
      ],
      "correct": 1,
      "explain": "Conviene comprobar si se recupera antes de tomar medidas más drásticas."
    },
    {
      "id": "o4",
      "domain": "operacion",
      "kind": "choice",
      "question": "¿Qué significa que una dirección web comience por https://?",
      "options": [
        "Que la página nunca contiene información falsa",
        "Que la conexión entre navegador y sitio está cifrada",
        "Que el contenido es gratuito",
        "Que pertenece necesariamente al colegio"
      ],
      "correct": 1,
      "explain": "HTTPS cifra la comunicación, pero no garantiza la honestidad del sitio."
    },
    {
      "id": "a1",
      "domain": "archivos",
      "kind": "choice",
      "question": "Quieres guardar una actividad de Excel. ¿Cuál extensión corresponde habitualmente a un libro de Excel?",
      "options": [
        ".mp4",
        ".xlsx",
        ".png",
        ".html"
      ],
      "correct": 1,
      "explain": ".xlsx es un formato de libro de Excel."
    },
    {
      "id": "a2",
      "domain": "archivos",
      "kind": "choice",
      "question": "¿Qué organización facilita encontrar cinco actividades de un mismo periodo?",
      "options": [
        "Guardar todo en el escritorio sin nombres",
        "Crear una carpeta del periodo y dar nombres descriptivos",
        "Cambiar todas las extensiones a .txt",
        "Guardar cada archivo con el nombre 'nuevo'"
      ],
      "correct": 1,
      "explain": "Una estructura de carpetas y nombres claros facilita localizar documentos."
    },
    {
      "id": "a3",
      "domain": "archivos",
      "kind": "choice",
      "question": "¿Para qué sirve una copia de seguridad?",
      "options": [
        "Para recuperar archivos si se pierde el original",
        "Para aumentar siempre la velocidad del computador",
        "Para cambiar archivos de texto en videos",
        "Para eliminar las contraseñas"
      ],
      "correct": 0,
      "explain": "Una copia guardada en un lugar seguro reduce el riesgo de pérdida de información."
    },
    {
      "id": "a4",
      "domain": "archivos",
      "kind": "choice",
      "question": "Dos documentos se llaman trabajo_v1 y trabajo_v2. ¿Qué indica normalmente v2?",
      "options": [
        "Una versión posterior del documento",
        "Que el archivo contiene dos páginas",
        "Que está infectado",
        "Que es una fotografía"
      ],
      "correct": 0,
      "explain": "Las versiones facilitan distinguir revisiones sucesivas."
    },
    {
      "id": "e1",
      "domain": "excel",
      "kind": "choice",
      "question": "¿Qué indica la referencia C4 en una hoja de cálculo?",
      "options": [
        "Fila C, columna 4",
        "Columna C, fila 4",
        "Cuatro hojas llamadas C",
        "El cuarto archivo del libro"
      ],
      "correct": 1,
      "explain": "Primero va la columna (letra) y después la fila (número)."
    },
    {
      "id": "e2",
      "domain": "excel",
      "kind": "cell",
      "question": "Escribe la referencia de la celda ubicada en la columna B y la fila 7.",
      "correct": "B7",
      "placeholder": "Ejemplo: A1",
      "explain": "La dirección se forma escribiendo la columna B seguida de la fila 7: B7."
    },
    {
      "id": "e3",
      "domain": "excel",
      "kind": "formula",
      "question": "En B2 hay 6 unidades y en C2 el precio 2500. Escribe una fórmula con referencias para calcular el subtotal en D2.",
      "correct": "=B2*C2",
      "placeholder": "=...",
      "explain": "Para multiplicar referencias, Excel utiliza el asterisco: =B2*C2."
    },
    {
      "id": "e4",
      "domain": "excel",
      "kind": "number",
      "question": "Si B2 contiene 6 y C2 contiene 2500, ¿qué valor mostrará D2 al calcular =B2*C2?",
      "correct": 15000,
      "placeholder": "Resultado numérico",
      "explain": "6 × 2500 = 15000."
    },
    {
      "id": "d1",
      "domain": "datos",
      "kind": "choice",
      "question": "Para comparar ventas de manzanas, peras y bananos, ¿qué gráfico suele ser apropiado?",
      "options": [
        "Gráfico de barras",
        "Mapa de calles",
        "Diagrama de conexiones eléctricas",
        "Una fotografía"
      ],
      "correct": 0,
      "explain": "Las barras facilitan comparar cantidades por categoría."
    },
    {
      "id": "d2",
      "domain": "datos",
      "kind": "number",
      "question": "Una tienda vendió 12 cuadernos el lunes, 18 el martes y 10 el miércoles. ¿Cuántos vendió en total?",
      "correct": 40,
      "placeholder": "Total",
      "explain": "12 + 18 + 10 = 40."
    },
    {
      "id": "d3",
      "domain": "datos",
      "kind": "choice",
      "question": "En la tabla, A=20, B=35 y C=25. ¿Qué categoría tiene la mayor cantidad?",
      "options": [
        "A",
        "B",
        "C",
        "Todas empatan"
      ],
      "correct": 1,
      "explain": "35 es mayor que 20 y 25; por tanto la categoría B tiene el máximo."
    },
    {
      "id": "d4",
      "domain": "datos",
      "kind": "number",
      "question": "Una clase registra 10, 20 y 30 libros por equipo. ¿Cuál es el promedio por equipo?",
      "correct": 20,
      "placeholder": "Promedio",
      "explain": "(10 + 20 + 30) ÷ 3 = 20."
    },
    {
      "id": "l1",
      "domain": "logica",
      "kind": "choice",
      "question": "Para preparar un archivo digital, ¿qué secuencia es más lógica?",
      "options": [
        "Guardar → Escribir → Abrir",
        "Abrir → Escribir → Guardar",
        "Escribir → Apagar → Abrir",
        "Borrar → Guardar → Crear"
      ],
      "correct": 1,
      "explain": "Primero se abre o crea el documento, luego se edita y finalmente se guarda."
    },
    {
      "id": "l2",
      "domain": "logica",
      "kind": "number",
      "question": "Completa la secuencia: 2, 4, 8, 16, __.",
      "correct": 32,
      "placeholder": "Siguiente número",
      "explain": "Cada término se duplica; 16 × 2 = 32."
    },
    {
      "id": "l3",
      "domain": "logica",
      "kind": "choice",
      "question": "Si una condición dice 'si la nota es mayor o igual a 3, aprobar', ¿qué ocurre con una nota de 3?",
      "options": [
        "Aprueba",
        "Reprueba",
        "No puede evaluarse",
        "Depende del navegador"
      ],
      "correct": 0,
      "explain": "El operador mayor o igual incluye el valor límite, 3."
    },
    {
      "id": "l4",
      "domain": "logica",
      "kind": "choice",
      "question": "Un procedimiento se repite cinco veces. ¿Qué concepto describe mejor esa repetición?",
      "options": [
        "Ciclo o bucle",
        "Contraseña",
        "Archivo comprimido",
        "Extensión"
      ],
      "correct": 0,
      "explain": "Un ciclo repite un conjunto de instrucciones."
    },
    {
      "id": "s1",
      "domain": "seguridad",
      "kind": "choice",
      "question": "Recibes un enlace que pide tu contraseña escolar. ¿Qué debes hacer?",
      "options": [
        "Escribirla rápidamente",
        "Compartirla con un compañero",
        "Verificar la fuente por un canal oficial y no entregarla en enlaces sospechosos",
        "Publicarla para pedir ayuda"
      ],
      "correct": 2,
      "explain": "Las contraseñas no se comparten y los enlaces sospechosos se verifican por canales oficiales."
    },
    {
      "id": "s2",
      "domain": "seguridad",
      "kind": "choice",
      "question": "¿Cuál práctica protege mejor una cuenta?",
      "options": [
        "Usar la misma contraseña en todas las cuentas",
        "Usar una contraseña única y activar verificación adicional cuando esté disponible",
        "Guardar la clave en una publicación pública",
        "Dar acceso a cualquier visitante"
      ],
      "correct": 1,
      "explain": "Una contraseña única y la autenticación adicional reducen riesgos."
    },
    {
      "id": "s3",
      "domain": "seguridad",
      "kind": "choice",
      "question": "Una noticia sorprendente aparece en una red social. Antes de compartirla conviene...",
      "options": [
        "Revisar fecha, autor y otras fuentes confiables",
        "Publicarla sin leer",
        "Cambiar el título para hacerla viral",
        "Asumir que es cierta porque tiene muchas vistas"
      ],
      "correct": 0,
      "explain": "El contraste de fuentes y contexto ayuda a evitar desinformación."
    },
    {
      "id": "s4",
      "domain": "seguridad",
      "kind": "choice",
      "question": "¿Cuál es un comportamiento adecuado en un grupo de trabajo digital?",
      "options": [
        "Publicar datos personales de compañeros",
        "Ridiculizar públicamente los errores",
        "Dar comentarios respetuosos y proteger la información personal",
        "Compartir capturas privadas sin permiso"
      ],
      "correct": 2,
      "explain": "La ciudadanía digital implica respeto, privacidad y responsabilidad."
    }
  ]
};
