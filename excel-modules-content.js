window.IJRExcelModuleContent={
  "2": {
    "title": "Operaciones y fórmulas",
    "intro": "Comprende las referencias y construye expresiones reales: suma, resta, multiplicación, división y operaciones combinadas. Completa cada hoja para desbloquear la siguiente.",
    "video": "topic-02",
    "items": [
      {
        "title": "Sumar cantidades",
        "concept": "La fórmula comienza con = y utiliza referencias. Sumar desde celdas permite que el total cambie si cambia el inventario.",
        "glossary": [
          [
            "Referencia",
            "Dirección de una celda, como B2."
          ],
          [
            "Operador +",
            "Suma dos cantidades numéricas."
          ]
        ],
        "scenario": "La tienda escolar recibió ocho cuadernos por la mañana y cinco en la tarde.",
        "steps": [
          "Localiza 8 en B2 y 5 en B3.",
          "Haz clic en B4 y escribe =B2+B3.",
          "Presiona Enter y comprueba el total de 13."
        ],
        "task": "En B4 escribe la suma de las entregas.",
        "seed": {
          "A1": "Registro",
          "B1": "Unidades",
          "A2": "Mañana",
          "B2": "8",
          "A3": "Tarde",
          "B3": "5",
          "A4": "Total"
        },
        "targets": {
          "B4": {
            "formula": "=B2+B3",
            "result": 13
          }
        },
        "hint": "Utiliza las dos referencias con el operador +.",
        "video": "u01-addition"
      },
      {
        "title": "Restar unidades vendidas",
        "concept": "El orden de los operandos importa: inventario menos unidades vendidas.",
        "glossary": [
          [
            "Minuendo",
            "Cantidad inicial de la resta."
          ],
          [
            "Diferencia",
            "Resultado que expresa lo que queda."
          ]
        ],
        "scenario": "Hay 24 botellas disponibles y se venden 7.",
        "steps": [
          "Identifica B2 como inventario inicial.",
          "En B4 escribe =B2-B3.",
          "Explica por qué 24−7 deja 17 botellas."
        ],
        "task": "Calcula las botellas disponibles en B4.",
        "seed": {
          "A2": "Inventario",
          "B2": "24",
          "A3": "Vendidas",
          "B3": "7",
          "A4": "Disponible"
        },
        "targets": {
          "B4": {
            "formula": "=B2-B3",
            "result": 17
          }
        },
        "hint": "Primero el inventario, luego lo vendido.",
        "video": "u01-subtraction"
      },
      {
        "title": "Multiplicar cantidad por precio",
        "concept": "La multiplicación en Excel se representa con *, no con la letra x. El subtotal es cantidad por precio.",
        "glossary": [
          [
            "Precio unitario",
            "Costo de un solo artículo."
          ],
          [
            "Subtotal",
            "Costo de todas las unidades del producto."
          ]
        ],
        "scenario": "Cuatro cuadernos cuestan 3500 COP cada uno.",
        "steps": [
          "Revisa B2 (cantidad) y C2 (precio).",
          "Escribe =B2*C2 en D2.",
          "Comprueba 14000 COP."
        ],
        "task": "Calcula el subtotal de la compra en D2.",
        "seed": {
          "A1": "Producto",
          "B1": "Cantidad",
          "C1": "Precio",
          "D1": "Subtotal",
          "A2": "Cuaderno",
          "B2": "4",
          "C2": "3500"
        },
        "targets": {
          "D2": {
            "formula": "=B2*C2",
            "result": 14000
          }
        },
        "hint": "El operador correcto es *.",
        "video": "u01-multiplication"
      },
      {
        "title": "Dividir un costo total",
        "concept": "La división usa /. El denominador debe ser distinto de cero; si vale 0, Excel muestra #DIV/0!.",
        "glossary": [
          [
            "Divisor",
            "Cantidad entre la que se reparte."
          ],
          [
            "Cociente",
            "Resultado de la división."
          ]
        ],
        "scenario": "Tres bolígrafos cuestan 12000 COP en total.",
        "steps": [
          "Identifica el total B2 y la cantidad C2.",
          "En D2 escribe =B2/C2.",
          "Comprueba que el precio unitario es 4000 COP."
        ],
        "task": "Calcula el precio unitario en D2.",
        "seed": {
          "A2": "Bolígrafos",
          "B2": "12000",
          "C2": "3"
        },
        "targets": {
          "D2": {
            "formula": "=B2/C2",
            "result": 4000
          }
        },
        "hint": "Divide el costo total entre las unidades.",
        "video": "u01-division"
      },
      {
        "title": "Combinar operaciones",
        "concept": "En una fórmula se aplica primero la multiplicación y después la suma. Los paréntesis permiten establecer otro orden.",
        "glossary": [
          [
            "Precedencia",
            "Orden en que se calculan los operadores."
          ],
          [
            "Expresión combinada",
            "Fórmula con más de una operación."
          ]
        ],
        "scenario": "La tienda vendió dos cuadernos de 5000 COP y tres lápices de 2500 COP.",
        "steps": [
          "Multiplica las cantidades por sus precios.",
          "Suma ambos subtotales en una fórmula.",
          "Escribe =B2*C2+B3*C3 en D4 y verifica 17500."
        ],
        "task": "Calcula el total de ambas compras en D4, mediante una fórmula con dos productos.",
        "seed": {
          "A1": "Producto",
          "B1": "Cantidad",
          "C1": "Precio",
          "A2": "Cuaderno",
          "B2": "2",
          "C2": "5000",
          "A3": "Lápiz",
          "B3": "3",
          "C3": "2500",
          "A4": "TOTAL"
        },
        "targets": {
          "D4": {
            "formula": "=B2*C2+B3*C3",
            "result": 17500
          }
        },
        "hint": "Multiplica cada cantidad por su precio y suma ambos productos.",
        "video": "topic-02"
      }
    ]
  },
  "3": {
    "title": "Errores y depuración",
    "intro": "Diagnostica hojas que contienen errores reales. En lugar de borrar la hoja, identifica si falló un dato, una referencia o la sintaxis de una fórmula.",
    "video": "topic-03",
    "items": [
      {
        "title": "Identificar #DIV/0!",
        "concept": "Dividir por cero no produce un número. Si el divisor es 0, la hoja muestra #DIV/0!. Corrige la cantidad antes de confiar en el resultado.",
        "glossary": [
          [
            "#DIV/0!",
            "División por cero."
          ],
          [
            "Depuración",
            "Proceso de localizar y corregir la causa del error."
          ]
        ],
        "scenario": "Se pagaron 10 unidades monetarias por cero artículos registrados por equivocación.",
        "steps": [
          "Observa el error inicial en C2.",
          "Corrige B3: la cantidad real es 2.",
          "Comprueba que C2 se calcula como 10/2 = 5."
        ],
        "task": "Corrige B3 a 2. Conserva la fórmula de C2 y comprueba que aparece 5.",
        "seed": {
          "A2": "Costo total",
          "B2": "10",
          "A3": "Unidades",
          "B3": "0",
          "C2": "=B2/B3"
        },
        "targets": {
          "B3": {
            "value": 2
          },
          "C2": {
            "formula": "=B2/B3",
            "result": 5
          }
        },
        "hint": "No borres la fórmula: arregla el divisor B3.",
        "video": "u01-division"
      },
      {
        "title": "Corregir una referencia",
        "concept": "Una fórmula puede tener sintaxis válida, pero apuntar a una celda equivocada. Debes comprobar direcciones y el significado de cada dato.",
        "glossary": [
          [
            "Referencia incorrecta",
            "La fórmula lee otra celda."
          ],
          [
            "Auditoría",
            "Revisión de datos y cálculos."
          ]
        ],
        "scenario": "Se suman siete y cinco unidades, pero la fórmula toma por error una tercera fila con 9.",
        "steps": [
          "Comprueba que B2=7 y B3=5.",
          "Corrige D2, que actualmente lee B4.",
          "Escribe =B2+B3 y verifica 12."
        ],
        "task": "Corrige la fórmula de D2 para sumar únicamente B2 y B3.",
        "seed": {
          "B2": "7",
          "B3": "5",
          "B4": "9",
          "D2": "=B2+B4"
        },
        "targets": {
          "D2": {
            "formula": "=B2+B3",
            "result": 12
          }
        },
        "hint": "La celda B4 no debe participar en esta suma.",
        "video": "u01-addition"
      },
      {
        "title": "Reparar el operador",
        "concept": "Excel reconoce * para multiplicar. La letra x no es un operador, por lo que provoca un error de fórmula.",
        "glossary": [
          [
            "Sintaxis",
            "Reglas para escribir una fórmula."
          ],
          [
            "Operador",
            "Símbolo +, -, * o /."
          ]
        ],
        "scenario": "Tres unidades cuestan 2500 COP cada una; se ha escrito una multiplicación con x.",
        "steps": [
          "Identifica la fórmula incorrecta de D2.",
          "Sustituye x por *.",
          "Comprueba que D2 muestra 7500."
        ],
        "task": "Repara D2 con una fórmula válida y el operador de multiplicación.",
        "seed": {
          "B2": "3",
          "C2": "2500",
          "D2": "=B2xC2"
        },
        "targets": {
          "D2": {
            "formula": "=B2*C2",
            "result": 7500
          }
        },
        "hint": "Multiplica con asterisco, no con la letra x.",
        "video": "u01-multiplication"
      },
      {
        "title": "Separar texto de números",
        "concept": "Una operación numérica no puede multiplicar la palabra 'cuatro'. Corrige el tipo de dato sin cambiar la fórmula correcta.",
        "glossary": [
          [
            "#VALOR!",
            "Un operando no se interpreta como número."
          ],
          [
            "Tipo de dato",
            "Determina si un contenido es texto o número."
          ]
        ],
        "scenario": "Un registro indica 'cuatro' unidades y su precio es de 3000 COP.",
        "steps": [
          "Observa por qué D2 no puede multiplicar el texto de B2.",
          "Corrige B2 a 4.",
          "Comprueba que D2 pasa a 12000."
        ],
        "task": "Corrige el dato B2 y conserva la fórmula D2.",
        "seed": {
          "A2": "Artículo",
          "B2": "cuatro",
          "C2": "3000",
          "D2": "=B2*C2"
        },
        "targets": {
          "B2": {
            "value": 4
          },
          "D2": {
            "formula": "=B2*C2",
            "result": 12000
          }
        },
        "hint": "Escribe el número 4, no una palabra.",
        "video": "u01-data"
      },
      {
        "title": "Eliminar referencia circular",
        "concept": "Una fórmula circular se refiere directa o indirectamente a sí misma. Para evitarla, toma los valores de otras celdas.",
        "glossary": [
          [
            "#CIRCULAR!",
            "Una fórmula depende de sí misma."
          ],
          [
            "Dependencia",
            "Relación entre una fórmula y sus datos."
          ]
        ],
        "scenario": "La celda C2 intenta calcular C2+1, pero debe sumar 10 y 5 de B2 y D2.",
        "steps": [
          "Identifica la autorreferencia de C2.",
          "Escribe =B2+D2.",
          "Comprueba 15 sin ciclos."
        ],
        "task": "Corrige C2 sin referencias circulares.",
        "seed": {
          "B2": "10",
          "C2": "=C2+1",
          "D2": "5"
        },
        "targets": {
          "C2": {
            "formula": "=B2+D2",
            "result": 15
          }
        },
        "hint": "C2 no puede formar parte de su propia suma.",
        "video": "topic-03"
      }
    ]
  },
  "4": {
    "title": "Gráficos y decisiones",
    "intro": "Convierte una tabla real en comparaciones visuales. Calcula totales, identifica máximos, compara categorías y redacta conclusiones sustentadas en datos.",
    "video": "topic-04",
    "items": [
      {
        "title": "Crear una tabla para graficar",
        "concept": "Los gráficos de barras comparan cantidades entre categorías. La tabla debe tener etiquetas consistentes, datos numéricos y un total calculado.",
        "glossary": [
          [
            "Categorías",
            "Elementos que se comparan en el gráfico."
          ],
          [
            "Frecuencia",
            "Cantidad registrada para cada categoría."
          ]
        ],
        "scenario": "Una frutería vende 20 manzanas, 35 peras y 25 bananos.",
        "steps": [
          "Identifica los nombres en A2:A4.",
          "Revisa las cantidades B2:B4.",
          "Escribe =SUMA(B2:B4) en B5 y observa las barras."
        ],
        "task": "Calcula el total de unidades vendidas en B5.",
        "seed": {
          "A1": "Fruta",
          "B1": "Unidades",
          "A2": "Manzana",
          "B2": "20",
          "A3": "Pera",
          "B3": "35",
          "A4": "Banano",
          "B4": "25",
          "A5": "TOTAL"
        },
        "targets": {
          "B5": {
            "formula": "=SUMA(B2:B4)",
            "result": 80
          }
        },
        "hint": "Usa el rango completo B2:B4.",
        "chart": true,
        "video": "topic-04"
      },
      {
        "title": "Interpretar la barra mayor",
        "concept": "El producto con la barra más alta tiene mayor cantidad. Una conclusión debe indicar explícitamente el dato observado.",
        "glossary": [
          [
            "Máximo",
            "Mayor cantidad de la tabla."
          ],
          [
            "Interpretación",
            "Conclusión sustentada por los valores."
          ]
        ],
        "scenario": "En la misma frutería, ¿cuál de los productos se vendió más?",
        "steps": [
          "Compara las barras de 20, 35 y 25.",
          "Identifica el máximo de 35.",
          "Escribe Pera en D2."
        ],
        "task": "Escribe en D2 el nombre del producto más vendido.",
        "seed": {
          "A2": "Manzana",
          "B2": "20",
          "A3": "Pera",
          "B3": "35",
          "A4": "Banano",
          "B4": "25"
        },
        "targets": {
          "D2": {
            "value": "Pera"
          }
        },
        "hint": "La barra más alta corresponde a 35 unidades.",
        "chart": true,
        "video": "topic-04"
      },
      {
        "title": "Actualizar un gráfico al editar datos",
        "concept": "Un gráfico útil se actualiza cuando cambian los valores de origen. Mantener referencias evita rehacer cálculos manuales.",
        "glossary": [
          [
            "Actualización",
            "Recalcular después de modificar los datos."
          ],
          [
            "Fuente de datos",
            "Celdas que alimentan el gráfico."
          ]
        ],
        "scenario": "Las ventas de peras aumentan de 35 a 40 unidades.",
        "steps": [
          "Modifica B3 a 40.",
          "En B5 calcula el nuevo total con SUMA.",
          "Observa cómo crece la barra de peras."
        ],
        "task": "Actualiza B3 a 40 y calcula B5 utilizando una fórmula.",
        "seed": {
          "A2": "Manzana",
          "B2": "20",
          "A3": "Pera",
          "B3": "35",
          "A4": "Banano",
          "B4": "25",
          "A5": "TOTAL"
        },
        "targets": {
          "B3": {
            "value": 40
          },
          "B5": {
            "formula": "=SUMA(B2:B4)",
            "result": 85
          }
        },
        "hint": "Primero cambia la venta de peras y luego usa SUMA.",
        "chart": true,
        "video": "topic-04"
      },
      {
        "title": "Comparar dos categorías",
        "concept": "Para interpretar diferencias, resta la categoría menor de la mayor. No basta con mirar la longitud de las barras.",
        "glossary": [
          [
            "Diferencia absoluta",
            "Cuántas unidades separan dos categorías."
          ],
          [
            "Comparación",
            "Relación que se calcula usando valores de la tabla."
          ]
        ],
        "scenario": "Se vendieron 35 peras y 20 manzanas.",
        "steps": [
          "Identifica el valor de peras B3 y manzanas B2.",
          "En D2 escribe =B3-B2.",
          "Explica que se vendieron 15 peras más."
        ],
        "task": "Escribe en D2 una fórmula que calcule cuántas peras más que manzanas se vendieron.",
        "seed": {
          "A2": "Manzana",
          "B2": "20",
          "A3": "Pera",
          "B3": "35",
          "A4": "Banano",
          "B4": "25"
        },
        "targets": {
          "D2": {
            "formula": "=B3-B2",
            "result": 15
          }
        },
        "hint": "Resta el valor de manzanas al valor de peras.",
        "chart": true,
        "video": "topic-04"
      },
      {
        "title": "Presentar una conclusión sustentada",
        "concept": "Una gráfica necesita título, unidades y una conclusión comprobable. El título informa qué se representa y la conclusión relaciona categorías y valores.",
        "glossary": [
          [
            "Título",
            "Identifica qué representa la gráfica."
          ],
          [
            "Conclusión",
            "Interpreta los resultados sin inventar datos."
          ]
        ],
        "scenario": "Presenta el informe semanal de la frutería con 80 unidades y una categoría líder de 35.",
        "steps": [
          "Calcula el total de unidades en B5.",
          "En D2 escribe Ventas semanales.",
          "En D3 identifica el producto líder: Pera."
        ],
        "task": "Escribe en B5 la SUMA, en D2 el título Ventas semanales y en D3 el producto líder.",
        "seed": {
          "A1": "Fruta",
          "B1": "Unidades",
          "A2": "Manzana",
          "B2": "20",
          "A3": "Pera",
          "B3": "35",
          "A4": "Banano",
          "B4": "25",
          "A5": "TOTAL"
        },
        "targets": {
          "B5": {
            "formula": "=SUMA(B2:B4)",
            "result": 80
          },
          "D2": {
            "value": "Ventas semanales"
          },
          "D3": {
            "value": "Pera"
          }
        },
        "hint": "Incluye fórmula, título descriptivo y categoría de mayor venta.",
        "chart": true,
        "video": "topic-04"
      }
    ]
  }
};
