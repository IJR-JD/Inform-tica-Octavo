/* Motion figures · IJR Informática 8 · shared engine for every topic.
   Two scene kinds:
     - "sheet": Excel-style grid + ƒx/result panel (coloured refs, typed formulas,
                cursor, result flow, errors, fill-down, bar charts)
     - "code":  HTML/CSS editor + live browser preview
   Public API: window.AnimatedExcelFigures.render(type, root)  (name kept for compatibility)
               window.AnimatedExcelFigures.lessons  -> list of available lesson ids */
(()=>{
"use strict";
const NS="http://www.w3.org/2000/svg";
const COLS=["A","B","C","D","E"];
const GX=20, GY=40, RHW=34, CHH=30, RH=46, ROWS=5;
const CW=[108,74,74,74,74];
const PX=468, PW=154;
const REF=["#2563c9","#c42b4f","#7a3fd1"];
const OK="#176440";

const colX=i=>GX+RHW+CW.slice(0,i).reduce((a,b)=>a+b,0);
const gridW=RHW+CW.reduce((a,b)=>a+b,0);
function box(cell){const c=COLS.indexOf(cell.replace(/\$/g,"")[0]),r=Number(cell.replace(/\$/g,"").slice(1));return {x:colX(c),y:GY+CHH+(r-1)*RH,w:CW[c],h:RH}}
const isNum=v=>/^-?\d+(\.\d+)?$/.test(String(v));
const fmt=v=>isNum(v)?Number(v).toLocaleString("es-CO"):v;
const S=(text,o={})=>Object.assign({text},o);

/* =====================  SHEET LESSONS  ===================== */
function binary(seed,a,b,target,op,va,vb,res,names){
  const f="="+a+op+b, sym={"+":"+","-":"−","*":"×","/":"÷"}[op], r=fmt(va)+" "+sym+" "+fmt(vb)+" = "+fmt(res);
  return {seed,steps:[
    S(names[0],{refs:[a],name:a}),
    S(names[1],{refs:[a,b],name:b}),
    S(names[2],{refs:[a,b],sel:target,cursor:target,type:f,name:target}),
    S(names[3],{refs:[a,b],sel:target,fx:f,show:{[target]:res},flow:true,result:r,name:target}),
    S(names[4],{sel:target,fx:f,show:{[target]:res},check:target,result:r,name:target})
  ]};
}
const LESSONS={
 /* ---- Unidad 01 (guided page) ---- */
 cell:{seed:{},steps:[
  S("Observa las letras de las columnas. Busca la letra B en la parte superior.",{col:"B"}),
  S("Ahora localiza la fila número 2 en el borde izquierdo.",{col:"B",row:2}),
  S("La columna B y la fila 2 se cruzan en una sola celda: su nombre es B2.",{col:"B",row:2,sel:"B2",name:"B2",tag:["B2","B2"]}),
  S("Haz clic en B2, escribe VENTAS y presiona Enter.",{sel:"B2",cursor:"B2",type:"VENTAS",name:"B2"}),
  S("¡Listo! La palabra VENTAS quedó guardada en la celda B2. Ahora hazlo tú en la hoja práctica.",{sel:"B2",fx:"VENTAS",show:{B2:"VENTAS"},check:"B2",result:"B2 = VENTAS",name:"B2"})
 ]},
 data:{seed:{A1:"Producto",B1:"Cantidad"},steps:[
  S("La fila 1 contiene los títulos de la tabla: Producto y Cantidad.",{row:1,name:"A1"}),
  S("En A2 se escribe un texto: el nombre del producto, Cuaderno.",{sel:"A2",cursor:"A2",type:"Cuaderno",name:"A2"}),
  S("En B2 se escribe un número: la cantidad, 4. Excel alinea los números a la derecha.",{show:{A2:"Cuaderno"},sel:"B2",cursor:"B2",type:"4",name:"B2"}),
  S("Texto a la izquierda, número a la derecha: así distingues los dos tipos de dato.",{show:{A2:"Cuaderno",B2:"4"},refs:["A2","B2"],tag:["A2","Texto"],tag2:["B2","Número"],result:"Texto · Número",fx:"4",name:"B2"}),
  S("Revisa ambas direcciones y escribe los mismos datos en la hoja práctica.",{show:{A2:"Cuaderno",B2:"4"},check:"B2",result:"A2 · B2 ✓",fx:"4",name:"B2"})
 ]},
 addition:binary({A2:"Lápices",B2:"8",A3:"Borradores",B3:"5",A4:"TOTAL"},"B2","B3","B4","+",8,5,13,[
  "Identifica el primer valor: B2 contiene 8.",
  "Identifica el segundo valor: B3 contiene 5. Cada referencia tiene su propio color.",
  "Selecciona B4 y escribe la fórmula =B2+B3. Toda fórmula empieza con =.",
  "Al presionar Enter, B4 muestra 13. La barra ƒx conserva la fórmula.",
  "Si cambias B2 o B3, el total se actualiza solo. Ahora resuélvelo en la hoja."]),
 subtraction:binary({A2:"Inventario",B2:"20",A3:"Vendidas",B3:"7",A4:"Disponible"},"B2","B3","B4","-",20,7,13,[
  "El inventario inicial está en B2: 20 unidades.",
  "Las unidades vendidas están en B3: 7. El orden importa: primero el total.",
  "Selecciona B4 y escribe =B2-B3.",
  "B4 muestra 13: las unidades que quedan disponibles.",
  "Escribe la misma fórmula en la hoja y comprueba el resultado."]),
 multiplication:binary({A1:"Producto",B1:"Cantidad",C1:"Precio",D1:"Subtotal",A2:"Cuaderno",B2:"4",C2:"3500"},"B2","C2","D2","*",4,3500,14000,[
  "La cantidad está en B2: 4 unidades.",
  "El precio unitario está en C2: 3.500.",
  "Selecciona D2 y escribe =B2*C2. En Excel se multiplica con * (asterisco).",
  "D2 muestra el subtotal: 14.000.",
  "Reproduce la operación en D2 de la hoja práctica."]),
 division:binary({A1:"Compra",B1:"Total",C1:"Unidades",D1:"C/u",A2:"Bolígrafos",B2:"12000",C2:"3"},"B2","C2","D2","/",12000,3,4000,[
  "El costo total está en B2: 12.000.",
  "El número de unidades está en C2: 3. Nunca se divide entre cero.",
  "Selecciona D2 y escribe =B2/C2. La división usa / (barra).",
  "D2 muestra el precio por unidad: 4.000.",
  "Escribe esa fórmula en D2 de la hoja práctica y valídala."]),
 sum:{seed:{A2:"Lunes",B2:"10",A3:"Martes",B3:"20",A4:"Miércoles",B4:"30",A5:"TOTAL"},steps:[
  S("Observa las tres cantidades de la columna B: 10, 20 y 30.",{col:"B",name:"B2"}),
  S("El rango B2:B4 incluye todas las celdas desde B2 hasta B4.",{range:["B2","B4"],name:"B2:B4"}),
  S("Selecciona B5 y escribe la función =SUMA(B2:B4).",{range:["B2","B4"],sel:"B5",cursor:"B5",type:"=SUMA(B2:B4)",name:"B5"}),
  S("B5 muestra 60, la suma de las tres celdas del rango.",{range:["B2","B4"],sel:"B5",fx:"=SUMA(B2:B4)",show:{B5:"60"},flow:true,result:"10 + 20 + 30 = 60",name:"B5"}),
  S("Introduce la función en B5 de la hoja práctica y completa la unidad.",{sel:"B5",fx:"=SUMA(B2:B4)",show:{B5:"60"},check:"B5",result:"10 + 20 + 30 = 60",name:"B5"})
 ]},

 /* ---- Hub · Topic 02 · Operaciones y fórmulas ---- */
 formulas:{seed:{A1:"Producto",B1:"Cantidad",C1:"Precio",D1:"Total",A2:"Hamburguesa",B2:"5",C2:"3500"},steps:[
  S("Los datos están separados: cantidad en B2 y precio en C2.",{refs:["B2","C2"],name:"B2"}),
  S("En D2 escribe =B2*C2. La fórmula usa referencias, no números repetidos.",{refs:["B2","C2"],sel:"D2",cursor:"D2",type:"=B2*C2",name:"D2"}),
  S("Excel calcula 5 × 3.500 = 17.500 y lo muestra en D2.",{refs:["B2","C2"],sel:"D2",fx:"=B2*C2",show:{D2:"17500"},flow:true,result:"5 × 3.500 = 17.500",name:"D2"}),
  S("Ahora cambia la cantidad de B2 a 6…",{refs:["B2"],sel:"B2",cursor:"B2",type:"6",show:{D2:"17500"},name:"B2"}),
  S("…y D2 se recalcula solo: 6 × 3.500 = 21.000. Esa es la ventaja de usar referencias.",{refs:["B2","C2"],sel:"D2",fx:"=B2*C2",show:{B2:"6",D2:"21000"},pop:["D2"],check:"D2",result:"6 × 3.500 = 21.000",name:"D2"})
 ]},
 /* ---- Topic 03 · Errores y depuración ---- */
 errors:{seed:{A1:"Total",B1:"Divisor",C1:"Resultado",A2:"10",B2:"0"},steps:[
  S("La fórmula de C2 dividirá A2 entre B2. Observa que B2 vale 0.",{refs:["A2","B2"],name:"B2"}),
  S("Escribe =A2/B2 en C2.",{refs:["A2","B2"],sel:"C2",cursor:"C2",type:"=A2/B2",name:"C2"}),
  S("Excel muestra #DIV/0!: no se puede dividir entre cero. La fórmula está bien escrita; el dato no.",{refs:["A2","B2"],sel:"C2",fx:"=A2/B2",show:{C2:"#DIV/0!"},tag:["C2","Error"],result:"10 ÷ 0 = #DIV/0!",bad:true,name:"C2"}),
  S("Corrige la causa, no la hoja entera: cambia el divisor B2 a 2.",{refs:["B2"],sel:"B2",cursor:"B2",type:"2",show:{C2:"#DIV/0!"},name:"B2"}),
  S("C2 devuelve 5. Error identificado, causa corregida y resultado comprobado.",{refs:["A2","B2"],sel:"C2",fx:"=A2/B2",show:{B2:"2",C2:"5"},pop:["C2"],check:"C2",result:"10 ÷ 2 = 5",name:"C2"})
 ]},
 /* ---- Topic 04 · Gráficos y decisiones ---- */
 chart:{seed:{A1:"Fruta",B1:"Unidades",A2:"Mango",B2:"20",A3:"Fresa",B3:"35",A4:"Uva",B4:"25",A5:"TOTAL"},
  chart:{title:"Ventas por fruta",labels:["Mango","Fresa","Uva"],values:[20,35,25],unit:"unidades"},steps:[
  S("La tabla compara tres categorías: Mango, Fresa y Uva.",{range:["A2","B4"],name:"A2:B4"}),
  S("Primero calcula el total con =SUMA(B2:B4): 80 unidades.",{range:["B2","B4"],sel:"B5",fx:"=SUMA(B2:B4)",show:{B5:"80"},result:"Total = 80",name:"B5"}),
  S("Para comparar categorías se usa un gráfico de barras. Cada barra representa una fila.",{show:{B5:"80"},bars:true,result:"Gráfico de barras",name:"B2:B4"}),
  S("La barra más alta es Fresa: 35 unidades, el producto más vendido.",{show:{B5:"80"},bars:true,barMax:true,refs:["B3"],result:"Máximo: Fresa · 35",name:"B3"}),
  S("Conclusión con datos: Fresa vende 35 de 80 unidades. Siempre añade título y unidades.",{show:{B5:"80"},bars:true,barMax:true,check:"B3",result:"Fresa = 35 / 80",name:"B3"})
 ]},
 /* ---- Topic 05 · Proyecto emprendimiento ---- */
 project:{seed:{A1:"Producto",B1:"Cant.",C1:"Precio",D1:"Subtotal",A2:"Hamburguesa",B2:"4",C2:"14000",A3:"Perro",B3:"6",C3:"9000",A4:"TOTAL"},steps:[
  S("Registro de ventas de un restaurante: cantidad y precio por producto.",{range:["A2","C3"],name:"A2:C3"}),
  S("Subtotal = cantidad × precio. En D2 escribe =B2*C2.",{refs:["B2","C2"],sel:"D2",cursor:"D2",type:"=B2*C2",name:"D2"}),
  S("Copia la fórmula hacia abajo: D3 calcula =B3*C3 automáticamente.",{refs:["B3","C3"],sel:"D3",fx:"=B3*C3",show:{D2:"56000",D3:"54000"},pop:["D3"],fill:["D2","D3"],name:"D3"}),
  S("El total suma los subtotales: =SUMA(D2:D3).",{range:["D2","D3"],sel:"D4",cursor:"D4",type:"=SUMA(D2:D3)",show:{D2:"56000",D3:"54000"},name:"D4"}),
  S("Ventas totales: 110.000. Nunca sumes precios unitarios: suma los subtotales.",{range:["D2","D3"],sel:"D4",fx:"=SUMA(D2:D3)",show:{D2:"56000",D3:"54000",D4:"110000"},flow:true,check:"D4",result:"Total = 110.000",name:"D4"})
 ]},
 /* ---- Topic 06 · Referencias relativas y absolutas ---- */
 references:{seed:{A1:"IVA",B1:"0.19",A2:"Producto",B2:"Precio",C2:"Impuesto",A3:"Lápiz",B3:"1000",A4:"Regla",B4:"2000",A5:"Libro",B5:"5000"},steps:[
  S("La tasa está en B1 y debe usarse en todas las filas.",{refs:["B1"],name:"B1"}),
  S("En C3 escribe =$B$1*B3. El símbolo $ fija la columna y la fila de B1.",{refs:["B1","B3"],sel:"C3",cursor:"C3",type:"=$B$1*B3",name:"C3"}),
  S("C3 muestra 190. Ahora copia la fórmula hacia abajo.",{refs:["B1","B3"],sel:"C3",fx:"=$B$1*B3",show:{C3:"190"},flow:true,result:"0,19 × 1.000 = 190",name:"C3"}),
  S("Al copiar, B3 cambia a B4 y B5 (relativa), pero $B$1 se mantiene fija (absoluta).",{refs:["B1","B5"],sel:"C5",fx:"=$B$1*B5",show:{C3:"190",C4:"380",C5:"950"},fill:["C3","C5"],pop:["C4","C5"],tag:["B1","Fija"],name:"C5"}),
  S("Una referencia absoluta se escribe $B$1; una relativa, B3.",{refs:["B1","B5"],sel:"C5",fx:"=$B$1*B5",show:{C3:"190",C4:"380",C5:"950"},check:"C5",result:"$B$1 fija · B5 cambia",name:"C5"})
 ]},
 /* ---- Topic 07 · Funciones estadísticas ---- */
 stats:{seed:{A1:"Día",B1:"Ingreso",A2:"Lunes",B2:"10",A3:"Martes",B3:"20",A4:"Miércoles",B4:"30",D1:"Medida",D2:"Promedio",D3:"Máximo",D4:"Mínimo"},steps:[
  S("Tres ingresos en el rango B2:B4: 10, 20 y 30.",{range:["B2","B4"],name:"B2:B4"}),
  S("En E2 escribe =PROMEDIO(B2:B4) para obtener la media.",{range:["B2","B4"],sel:"E2",cursor:"E2",type:"=PROMEDIO(B2:B4)",name:"E2"}),
  S("El promedio es 20: (10 + 20 + 30) ÷ 3.",{range:["B2","B4"],sel:"E2",fx:"=PROMEDIO(B2:B4)",show:{E2:"20"},flow:true,result:"60 ÷ 3 = 20",name:"E2"}),
  S("=MAX(B2:B4) devuelve 30 y =MIN(B2:B4) devuelve 10.",{range:["B2","B4"],sel:"E3",fx:"=MAX(B2:B4)",show:{E2:"20",E3:"30",E4:"10"},pop:["E3","E4"],result:"Máx 30 · Mín 10",name:"E3"}),
  S("Cada medida resume algo distinto: no confundas el máximo con el promedio.",{sel:"E2",fx:"=PROMEDIO(B2:B4)",show:{E2:"20",E3:"30",E4:"10"},check:"E2",result:"Media 20 · Máx 30",name:"E2"})
 ]},
 /* ---- Topic 12 · Validación ---- */
 validation:{seed:{A1:"Dato 1",B1:"Dato 2",C1:"Obtenido",D1:"Esperado",A2:"5",B2:"3",D2:"8"},steps:[
  S("Una prueba tiene acción, resultado esperado y resultado real. Esperado: 8.",{refs:["D2"],name:"D2"}),
  S("Acción: escribe =A2+B2 en C2.",{refs:["A2","B2"],sel:"C2",cursor:"C2",type:"=A2+B2",name:"C2"}),
  S("Resultado real: 8.",{refs:["A2","B2"],sel:"C2",fx:"=A2+B2",show:{C2:"8"},flow:true,result:"Obtenido = 8",name:"C2"}),
  S("Compara obtenido con esperado: coinciden.",{refs:["C2","D2"],sel:"C2",fx:"=A2+B2",show:{C2:"8"},tag:["C2","8 = 8"],result:"8 = 8 ✓",name:"C2"}),
  S("Prueba superada. Si no coincidiera, registra la diferencia antes de corregir.",{sel:"C2",fx:"=A2+B2",show:{C2:"8"},check:"C2",result:"Prueba OK",name:"C2"})
 ]},

 /* =====================  CODE LESSONS  ===================== */
 html:{kind:"code",url:"mi-colegio.html",steps:[
  S("Todo documento HTML tiene un esqueleto: html contiene la página y body el contenido visible.",{code:["<!doctype html>","<html>","<body>","","</body>","</html>"],hl:[1,2,4,5],preview:[]}),
  S("Escribe un título principal con h1.",{code:["<!doctype html>","<html>","<body>","  <h1>Mi colegio</h1>","</body>","</html>"],typeLine:3,preview:[{t:"h1",text:"Mi colegio"}],focus:0}),
  S("Agrega un párrafo con p. Cada etiqueta que se abre, se cierra.",{code:["<!doctype html>","<html>","<body>","  <h1>Mi colegio</h1>","  <p>Este es un texto.</p>","</body>","</html>"],typeLine:4,preview:[{t:"h1",text:"Mi colegio"},{t:"p",text:"Este es un texto."}],focus:1}),
  S("h1 y p están dentro de body: por eso aparecen en la página.",{code:["<!doctype html>","<html>","<body>","  <h1>Mi colegio</h1>","  <p>Este es un texto.</p>","</body>","</html>"],hl:[2,3,4,5],preview:[{t:"h1",text:"Mi colegio"},{t:"p",text:"Este es un texto."}],focus:"all",badge:"body"}),
  S("Estructura válida: título, párrafo y etiquetas bien cerradas.",{code:["<!doctype html>","<html>","<body>","  <h1>Mi colegio</h1>","  <p>Este es un texto.</p>","</body>","</html>"],preview:[{t:"h1",text:"Mi colegio"},{t:"p",text:"Este es un texto."}],check:true})
 ]},
 css:{kind:"code",url:"estilos.html",steps:[
  S("Sin CSS, el navegador usa su estilo por defecto.",{code:["<style>","","</style>","<h1>Mi colegio</h1>","<p>Bienvenidos</p>"],hl:[3,4],preview:[{t:"h1",text:"Mi colegio"},{t:"p",text:"Bienvenidos"}]}),
  S("Una regla tiene selector y declaraciones: h1 { color: #1f5fbf; }",{code:["<style>","  h1 { color: #1f5fbf; }","</style>","<h1>Mi colegio</h1>","<p>Bienvenidos</p>"],typeLine:1,preview:[{t:"h1",text:"Mi colegio",color:"#1f5fbf"},{t:"p",text:"Bienvenidos"}],focus:0}),
  S("Ahora cambia el tamaño de los párrafos con font-size.",{code:["<style>","  h1 { color: #1f5fbf; }","  p { font-size: 20px; }","</style>","<h1>Mi colegio</h1>","<p>Bienvenidos</p>"],typeLine:2,preview:[{t:"h1",text:"Mi colegio",color:"#1f5fbf"},{t:"p",text:"Bienvenidos",size:20}],focus:1}),
  S("El HTML no cambió: CSS solo modifica la presentación.",{code:["<style>","  h1 { color: #1f5fbf; }","  p { font-size: 20px; }","</style>","<h1>Mi colegio</h1>","<p>Bienvenidos</p>"],hl:[4,5],preview:[{t:"h1",text:"Mi colegio",color:"#1f5fbf"},{t:"p",text:"Bienvenidos",size:20}],badge:"mismo HTML"}),
  S("Comprueba el contraste: texto oscuro sobre fondo claro se lee bien.",{code:["<style>","  h1 { color: #1f5fbf; }","  p { font-size: 20px; }","</style>","<h1>Mi colegio</h1>","<p>Bienvenidos</p>"],preview:[{t:"h1",text:"Mi colegio",color:"#1f5fbf"},{t:"p",text:"Bienvenidos",size:20}],check:true,badge:"Contraste OK"})
 ]},
 site:{kind:"code",url:"sitio.html#horario",steps:[
  S("Un menú usa a con href: el destino del enlace.",{code:["<nav>","  <a href=\"#horario\">Ver horario</a>","</nav>"],typeLine:1,preview:[{t:"nav",items:["Ver horario"]}],focus:0}),
  S("Una tabla organiza datos: th para encabezados y td para datos.",{code:["<nav>","  <a href=\"#horario\">Ver horario</a>","</nav>","<table id=\"horario\">","  <tr><th>Día</th><th>Clase</th></tr>","  <tr><td>Lunes</td><td>Excel</td></tr>","</table>"],typeLine:5,preview:[{t:"nav",items:["Ver horario"]},{t:"table",rows:[["Día","Clase"],["Lunes","Excel"]]}],focus:1}),
  S("Al hacer clic en el enlace, el navegador salta a id=\"horario\".",{code:["<nav>","  <a href=\"#horario\">Ver horario</a>","</nav>","<table id=\"horario\">","  <tr><th>Día</th><th>Clase</th></tr>","  <tr><td>Lunes</td><td>Excel</td></tr>","</table>"],hl:[1,3],preview:[{t:"nav",items:["Ver horario"]},{t:"table",rows:[["Día","Clase"],["Lunes","Excel"]]}],click:0,focus:1}),
  S("Una imagen necesita alt: el texto que describe su contenido.",{code:["<nav>","  <a href=\"#horario\">Ver horario</a>","</nav>","<table id=\"horario\">","  <tr><th>Día</th><th>Clase</th></tr>","  <tr><td>Lunes</td><td>Excel</td></tr>","</table>","<img src=\"aula.jpg\" alt=\"Aula\">"],typeLine:7,preview:[{t:"nav",items:["Ver horario"]},{t:"table",rows:[["Día","Clase"],["Lunes","Excel"]]},{t:"img",alt:"Aula"}],focus:2}),
  S("Navegación, datos tabulares e imágenes accesibles: el sitio está organizado.",{code:["<nav>","  <a href=\"#horario\">Ver horario</a>","</nav>","<table id=\"horario\">","  <tr><th>Día</th><th>Clase</th></tr>","  <tr><td>Lunes</td><td>Excel</td></tr>","</table>","<img src=\"aula.jpg\" alt=\"Aula\">"],preview:[{t:"nav",items:["Ver horario"]},{t:"table",rows:[["Día","Clase"],["Lunes","Excel"]]},{t:"img",alt:"Aula"}],check:true})
 ]},
 webproject:{kind:"code",url:"proyecto.html",steps:[
  S("Planifica: un encabezado con el título del sitio.",{code:["<header>","  <h1>Reseñas</h1>","</header>"],typeLine:1,preview:[{t:"header",text:"Reseñas"}],focus:0}),
  S("Agrega un menú con enlaces internos a cada sección.",{code:["<header>","  <h1>Reseñas</h1>","</header>","<nav>","  <a href=\"#libros\">Libros</a>","  <a href=\"#datos\">Datos</a>","</nav>"],typeLine:5,preview:[{t:"header",text:"Reseñas"},{t:"nav",items:["Libros","Datos"]}],focus:1}),
  S("Crea las secciones con contenido, imagen con alt y una tabla de datos.",{code:["<nav>…</nav>","<section id=\"libros\">","  <h2>Libros</h2>","  <img alt=\"Portada\">","</section>","<section id=\"datos\">","  <table>…</table>","</section>"],typeLine:6,preview:[{t:"header",text:"Reseñas"},{t:"nav",items:["Libros","Datos"]},{t:"h2",text:"Libros"},{t:"img",alt:"Portada"},{t:"table",rows:[["Libro","★"],["Rayuela","5"]]}],focus:4}),
  S("Revisa el diseño en pantalla pequeña: todo debe leerse sin desplazarse a los lados.",{code:["<nav>…</nav>","<section id=\"libros\">","  <h2>Libros</h2>","  <img alt=\"Portada\">","</section>","<section id=\"datos\">","  <table>…</table>","</section>"],preview:[{t:"header",text:"Reseñas"},{t:"nav",items:["Libros","Datos"]},{t:"h2",text:"Libros"},{t:"img",alt:"Portada"},{t:"table",rows:[["Libro","★"],["Rayuela","5"]]}],mobile:true,badge:"Móvil"}),
  S("Antes de publicar: enlaces, alt, jerarquía de títulos y lectura en móvil. ¡Listo!",{code:["<nav>…</nav>","<section id=\"libros\">","  <h2>Libros</h2>","  <img alt=\"Portada\">","</section>","<section id=\"datos\">","  <table>…</table>","</section>"],preview:[{t:"header",text:"Reseñas"},{t:"nav",items:["Libros","Datos"]},{t:"h2",text:"Libros"},{t:"img",alt:"Portada"},{t:"table",rows:[["Libro","★"],["Rayuela","5"]]}],check:true})
 ]}
};

/* =====================  SVG HELPERS  ===================== */
function el(tag,attrs={},parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
function txt(parent,x,y,s,cls,anchor="middle",extra={}){const t=el("text",Object.assign({x,y,"text-anchor":anchor,class:cls},extra),parent);t.textContent=s;return t}
function fitText(t,max){t.removeAttribute("textLength");t.removeAttribute("lengthAdjust");
  try{const w=t.getComputedTextLength();if(w>max){t.setAttribute("textLength",max);t.setAttribute("lengthAdjust","spacingAndGlyphs")}}catch{}}
const REFRX=/(\$?[A-E]\$?[1-9](?::\$?[A-E]\$?[1-9])?)/;
function lessonRefs(lesson){const refs=[];lesson.steps.forEach(s=>(s.refs||[]).forEach(r=>{if(!refs.includes(r))refs.push(r)}));return refs}
function refColour(lesson,cell){const i=lessonRefs(lesson).indexOf(cell.replace(/\$/g,""));return i<0?null:REF[i%REF.length]}
function formulaSpans(t,s,lesson){
  t.replaceChildren();
  s.split(REFRX).forEach(p=>{if(!p)return;const sp=el("tspan",{},t);sp.textContent=p;
    let c=null;if(/:/.test(p)&&REFRX.test(p))c=REF[0];else if(REFRX.test(p))c=refColour(lesson,p)||REF[0];
    if(c&&s.startsWith("="))sp.setAttribute("style","fill:"+c)});
}
function defs(svg,id){
  const d=el("defs",{},svg);
  const mk=el("marker",{id:"fx-tip-"+id,viewBox:"0 0 10 10",refX:"8",refY:"5",markerWidth:"6",markerHeight:"6",orient:"auto-start-reverse"},d);
  el("path",{d:"M0 0 L10 5 L0 10 Z",fill:OK},mk);
  const sh=el("filter",{id:"fx-shadow-"+id,x:"-30%",y:"-30%",width:"160%",height:"160%"},d);
  el("feDropShadow",{dx:"0",dy:"2",stdDeviation:"2.2","flood-color":"#000","flood-opacity":".22"},sh);
}
function cursorEl(svg,id){const g=el("g",{class:"cursor anim",filter:"url(#fx-shadow-"+id+")"},svg);
  el("path",{d:"M0 0 L0 22 L6 17 L10 26 L14 24 L10 15 L18 15 Z",class:"cursor-shape"},g);
  const r=el("circle",{r:4,class:"ripple"},g);return {g,r}}
function checkEl(svg){const g=el("g",{class:"check anim"},svg);el("circle",{r:13,class:"check-bg"},g);el("path",{d:"M-6 0 L-2 5 L6 -5",class:"check-mark"},g);return g}
let uid=0;

/* =====================  SHEET SCENE  ===================== */
function buildSheet(type,lesson){
  const id=type+"-"+(++uid);
  const svg=el("svg",{viewBox:"0 0 640 360",role:"img","aria-label":"Demostración animada: "+type});
  defs(svg,id);
  const H=CHH+ROWS*RH, L={id};
  el("rect",{x:GX,y:GY,width:gridW,height:H,rx:6,class:"sheet-bg"},svg);
  el("rect",{x:GX,y:GY,width:gridW,height:CHH,class:"sheet-header"},svg);
  el("rect",{x:GX,y:GY,width:RHW,height:H,class:"sheet-header"},svg);
  L.colBand=el("rect",{class:"band anim",y:GY+CHH,height:ROWS*RH},svg);
  L.rowBand=el("rect",{class:"band anim",x:GX+RHW,width:gridW-RHW},svg);
  L.colHead=el("rect",{class:"head-on anim",y:GY,height:CHH},svg);
  L.rowHead=el("rect",{class:"head-on anim",x:GX,width:RHW},svg);
  L.fill=el("rect",{class:"fill-band anim",rx:3},svg);
  for(let i=1;i<=COLS.length;i++){const x=colX(i-1);el("line",{x1:x,y1:GY,x2:x,y2:GY+H,class:i===1?"line strong":"line"},svg)}
  for(let r=0;r<=ROWS;r++){const y=GY+CHH+r*RH;el("line",{x1:GX,y1:y,x2:GX+gridW,y2:y,class:r===0?"line strong":"line"},svg)}
  el("rect",{x:GX,y:GY,width:gridW,height:H,rx:6,class:"frame"},svg);
  L.colLbl={};L.rowLbl={};
  COLS.forEach((c,i)=>{L.colLbl[c]=txt(svg,colX(i)+CW[i]/2,GY+21,c,"axis-label")});
  for(let r=1;r<=ROWS;r++)L.rowLbl[r]=txt(svg,GX+RHW/2,GY+CHH+(r-1)*RH+29,String(r),"axis-label");
  L.refs={};
  lessonRefs(lesson).forEach(r=>{const b=box(r),c=refColour(lesson,r);
    L.refs[r]=el("rect",{x:b.x+2,y:b.y+2,width:b.w-4,height:b.h-4,rx:3,class:"ref anim",style:"stroke:"+c+";fill:"+c+"1f"},svg)});
  L.range=el("rect",{rx:3,class:"ref range anim",style:"stroke:"+REF[0]+";fill:"+REF[0]+"1a"},svg);
  L.sel=el("g",{class:"sel anim"},svg);
  L.selRect=el("rect",{class:"sel-rect",rx:1},L.sel);
  L.selHandle=el("rect",{class:"sel-handle",width:7,height:7},L.sel);
  L.cell={};
  const all=new Set(Object.keys(lesson.seed));lesson.steps.forEach(s=>{Object.keys(s.show||{}).forEach(k=>all.add(k));if(s.sel)all.add(s.sel)});
  all.forEach(k=>{const b=box(k);L.cell[k]=txt(svg,b.x+8,b.y+29,"","cell-text","start")});
  // optional bar chart card (sits on the empty columns C–E)
  if(lesson.chart){const ch=lesson.chart,cx=colX(2)+8,cy=GY+CHH+8,cw=colX(4)+CW[4]-cx-8,chh=ROWS*RH-16;
    L.chart=el("g",{class:"chart anim"},svg);
    el("rect",{x:cx,y:cy,width:cw,height:chh,rx:8,class:"chart-card"},L.chart);
    txt(L.chart,cx+12,cy+20,ch.title,"chart-title","start");
    const base=cy+chh-28,top=cy+38,max=Math.max(...ch.values),bw=36,gap=(cw-24-bw*ch.values.length)/(ch.values.length-1);
    el("line",{x1:cx+10,y1:base,x2:cx+cw-10,y2:base,class:"chart-axis"},L.chart);
    L.bars=ch.values.map((v,i)=>{const x=cx+12+i*(bw+gap),h=(base-top)*v/max;
      const g=el("g",{},L.chart);
      const r=el("rect",{x,y:base-h,width:bw,height:h,rx:3,class:"bar"},g);
      txt(g,x+bw/2,base-h-6,String(v),"bar-value");
      txt(g,x+bw/2,base+16,ch.labels[i],"bar-label");
      return {g,r,v}});
    L.maxIdx=ch.values.indexOf(max);
  }
  L.tags=[0,1].map(()=>{const g=el("g",{class:"tag anim"},svg);el("rect",{rx:9,height:20,class:"tag-bg"},g);txt(g,0,0,"","tag-text");return g});
  L.flow=el("path",{class:"flow anim","marker-end":"url(#fx-tip-"+id+")"},svg);
  L.check=checkEl(svg);
  // side panel
  el("rect",{x:PX,y:GY,width:PW,height:120,rx:8,class:"panel"},svg);
  txt(svg,PX+14,GY+24,"BARRA ƒx","panel-title","start");
  el("rect",{x:PX+PW-62,y:GY+10,width:50,height:22,rx:4,class:"name-box"},svg);
  L.name=txt(svg,PX+PW-37,GY+26,"","name-text");
  el("rect",{x:PX+12,y:GY+44,width:PW-24,height:42,rx:5,class:"fx-field"},svg);
  txt(svg,PX+22,GY+71,"ƒx","fx-icon","start");
  L.fx=txt(svg,PX+44,GY+71,"","formula-text","start");
  L.caret=el("rect",{y:GY+54,width:2,height:22,class:"caret anim"},svg);
  L.fxHint=txt(svg,PX+PW/2,GY+107,"","panel-hint");
  L.resultPanel=el("rect",{x:PX,y:GY+136,width:PW,height:98,rx:8,class:"panel result-panel"},svg);
  txt(svg,PX+14,GY+160,"RESULTADO","panel-title","start");
  L.result=txt(svg,PX+PW/2,GY+203,"","result-text");
  L.dots=lesson.steps.map((_,i)=>el("circle",{cx:PX+PW/2+(i-(lesson.steps.length-1)/2)*18,cy:GY+262,r:5,class:"dot"},svg));
  txt(svg,PX+PW/2,GY+290,"PASO A PASO","panel-hint");
  const c=cursorEl(svg,id);L.cursor=c.g;L.ripple=c.r;
  return {svg,L};
}

function SheetPlayer(type,lesson,root,opts){
  const {svg,L}=buildSheet(type,lesson);root.appendChild(svg);
  const steps=lesson.steps;let step=0,timers=[],alive=true;
  const later=(fn,ms)=>{const id=setTimeout(()=>{timers=timers.filter(t=>t!==id);if(alive)fn()},ms);timers.push(id)};
  const clear=()=>{timers.forEach(clearTimeout);timers=[]};
  const on=(e,yes)=>e&&e.classList.toggle("visible",!!yes);
  function setCell(k,value){const t=L.cell[k];if(!t)return;const b=box(k);value=String(value);
    const num=isNum(value),formula=value.startsWith("="),err=value.startsWith("#");
    t.setAttribute("class","cell-text"+(formula?" cell-formula":"")+(!num&&!formula&&!err&&lesson.seed[k]!==undefined?" cell-label":"")+(num?" cell-num":"")+(err?" cell-error":""));
    const right=num||err;t.setAttribute("text-anchor",right?"end":"start");t.setAttribute("x",right?b.x+b.w-9:b.x+8);
    if(formula)formulaSpans(t,value,lesson);else t.textContent=num?fmt(value):value;
    fitText(t,b.w-14)}
  function setFx(s,typing){
    if(s&&s.startsWith("="))formulaSpans(L.fx,s,lesson);else L.fx.textContent=s||"";
    fitText(L.fx,PW-62);let w=0;try{w=s?Math.min(L.fx.getComputedTextLength(),PW-62):0}catch{}
    L.caret.setAttribute("x",PX+46+w);on(L.caret,typing)}
  function rectOver(a,b){const p=box(a),q=box(b);return {x:Math.min(p.x,q.x)+2,y:Math.min(p.y,q.y)+2,w:Math.max(p.x+p.w,q.x+q.w)-Math.min(p.x,q.x)-4,h:Math.max(p.y+p.h,q.y+q.h)-Math.min(p.y,q.y)-4}}
  function paint(n,animate){
    clear();step=n;const s=steps[n],prev=steps[n-1]||{};
    if(s.col){const i=COLS.indexOf(s.col);[L.colBand,L.colHead].forEach(r=>{r.setAttribute("x",colX(i));r.setAttribute("width",CW[i])})}
    if(s.row){const y=GY+CHH+(s.row-1)*RH;[L.rowBand,L.rowHead].forEach(r=>{r.setAttribute("y",y);r.setAttribute("height",RH)})}
    on(L.colBand,s.col);on(L.colHead,s.col);on(L.rowBand,s.row);on(L.rowHead,s.row);
    const sc=s.sel?s.sel[0]:null,sr=s.sel?Number(s.sel.slice(1)):null;
    COLS.forEach(c=>L.colLbl[c].classList.toggle("on",c===s.col||c===sc));
    for(let r=1;r<=ROWS;r++)L.rowLbl[r].classList.toggle("on",r===s.row||r===sr);
    Object.entries(L.refs).forEach(([k,e])=>on(e,(s.refs||[]).includes(k)));
    if(s.range){const r=rectOver(s.range[0],s.range[1]);L.range.setAttribute("x",r.x);L.range.setAttribute("y",r.y);L.range.setAttribute("width",r.w);L.range.setAttribute("height",r.h)}
    on(L.range,!!s.range);
    if(s.fill){const r=rectOver(s.fill[0],s.fill[1]);L.fill.setAttribute("x",r.x-2);L.fill.setAttribute("y",r.y-2);L.fill.setAttribute("width",r.w+4);L.fill.setAttribute("height",r.h+4)}
    on(L.fill,!!s.fill);
    if(s.sel){const b=box(s.sel);L.selRect.setAttribute("x",b.x);L.selRect.setAttribute("y",b.y);L.selRect.setAttribute("width",b.w);L.selRect.setAttribute("height",b.h);
      L.selHandle.setAttribute("x",b.x+b.w-4);L.selHandle.setAttribute("y",b.y+b.h-4)}
    on(L.sel,s.sel);
    Object.keys(L.cell).forEach(k=>setCell(k,(s.show&&s.show[k]!==undefined)?s.show[k]:(lesson.seed[k]??"")));
    Object.keys(L.cell).forEach(k=>{const fresh=(s.pop||[]).includes(k)||(s.show&&s.show[k]!==undefined&&!(prev.show||{})[k]&&n>0);
      L.cell[k].classList.remove("pop");if(fresh&&animate){L.cell[k].getBoundingClientRect();L.cell[k].classList.add("pop")}});
    [s.tag,s.tag2].forEach((tg,i)=>{const g=L.tags[i];if(!tg){on(g,false);return}
      const b=box(tg[0]),t=g.querySelector("text"),r=g.querySelector("rect");t.textContent=tg[1];
      const w=Math.max(38,tg[1].length*8+18);r.setAttribute("x",-w/2);r.setAttribute("y",-15);r.setAttribute("width",w);t.setAttribute("x",0);t.setAttribute("y",0);
      g.classList.toggle("tag-bad",tg[1]==="Error");
      g.setAttribute("transform","translate("+(b.x+b.w/2)+","+(b.y+b.h+17)+")");on(g,true)});
    if(L.chart){on(L.chart,s.bars);L.bars.forEach((b,i)=>{b.g.classList.toggle("grow",!!s.bars);b.r.classList.toggle("max",!!s.barMax&&i===L.maxIdx);b.g.classList.toggle("dim",!!s.barMax&&i!==L.maxIdx);b.g.style.transitionDelay=(i*.15)+"s"})}
    L.name.textContent=s.name||"";fitText(L.name,44);
    setFx(s.fx||"",false);
    L.fxHint.textContent=s.fx&&s.fx.startsWith("=")?"Fórmula guardada":(s.type?"Escribiendo…":"");
    L.result.textContent=s.result||"—";L.result.classList.toggle("empty",!s.result);L.result.classList.toggle("bad",!!s.bad);fitText(L.result,PW-20);
    L.resultPanel.classList.toggle("on",!!s.result&&!s.bad);L.resultPanel.classList.toggle("bad",!!s.bad);
    L.dots.forEach((d,i)=>{d.classList.toggle("done",i<n);d.classList.toggle("now",i===n)});
    if(s.flow&&s.sel){const b=box(s.sel),sx=PX,sy=GY+65,ex=b.x+b.w+4,ey=b.y+b.h/2;
      L.flow.setAttribute("d","M "+sx+" "+sy+" C "+(sx-40)+" "+sy+", "+(ex+40)+" "+ey+", "+ex+" "+ey)}
    L.flow.classList.remove("visible");if(s.flow)requestAnimationFrame(()=>requestAnimationFrame(()=>on(L.flow,true)));
    if(s.check){const b=box(s.check);L.check.setAttribute("transform","translate("+(b.x+b.w-2)+","+(b.y+2)+")")}
    on(L.check,s.check);
    on(L.cursor,s.cursor);L.ripple.classList.remove("go");
    if(s.cursor){const p=box(s.cursor);
      if(animate&&!L.cursor.dataset.placed){L.cursor.style.transition="none";L.cursor.style.transform="translate("+(p.x+p.w+70)+"px,"+(p.y+p.h+50)+"px)";L.cursor.getBoundingClientRect();L.cursor.style.transition=""}
      L.cursor.dataset.placed="1";L.cursor.style.transform="translate("+(p.x+p.w-22)+"px,"+(p.y+p.h-18)+"px)";
      later(()=>{L.ripple.classList.remove("go");L.ripple.getBoundingClientRect();L.ripple.classList.add("go")},animate?650:0);
    }else delete L.cursor.dataset.placed;
    if(s.type){const full=s.type;
      if(!animate){setFx(full,false);setCell(s.sel,full)}
      else{setFx("",true);setCell(s.sel,"");
        let i=0;const tick=()=>{i++;const part=full.slice(0,i);setFx(part,true);setCell(s.sel,part);if(i<full.length)later(tick,full.length>8?90:140);else later(()=>on(L.caret,false),500)};
        later(tick,850)}}
    if(opts.onStep)opts.onStep(n,s);
  }
  return {steps,paint:(n,a=true)=>paint(Math.max(0,Math.min(steps.length-1,n)),a),get step(){return step},
    duration:n=>{const s=steps[n];return (s.type?1500+s.type.length*110:0)+(n===steps.length-1?3400:3000)},
    destroy(){alive=false;clear()}};
}

/* =====================  CODE SCENE  ===================== */
const EX=20,EY=40,EW=318,EH=278,BX=354,BW=266;
function tokens(line){ // tiny HTML/CSS highlighter
  const out=[];const rx=/(<\/?[a-z0-9!]+|\/?>|[a-z-]+(?==)|"[^"]*"|[{}:;]|#[0-9a-f]{3,6}\b|\d+px)/gi;let last=0,m;
  while((m=rx.exec(line))){if(m.index>last)out.push([line.slice(last,m.index),"tk-text"]);
    const v=m[0];out.push([v,v[0]==="<"||v.endsWith(">")?"tk-tag":v[0]==='"'?"tk-str":/^[{}:;]$/.test(v)?"tk-punct":/^#|px$/.test(v)?"tk-val":"tk-attr"]);last=rx.lastIndex}
  if(last<line.length)out.push([line.slice(last),"tk-text"]);
  return out.map(([v,c])=>/^\s*[a-z-]+\s*$/i.test(v)&&c==="tk-text"&&line.includes("{")?[v,"tk-prop"]:[v,c]);
}
function buildCode(type,lesson){
  const id=type+"-"+(++uid);
  const svg=el("svg",{viewBox:"0 0 640 360",role:"img","aria-label":"Demostración animada: "+type});
  defs(svg,id);const L={id};
  // editor
  el("rect",{x:EX,y:EY,width:EW,height:EH,rx:10,class:"editor"},svg);
  el("rect",{x:EX,y:EY,width:EW,height:30,rx:10,class:"editor-bar"},svg);
  el("rect",{x:EX,y:EY+20,width:EW,height:10,class:"editor-bar"},svg);
  txt(svg,EX+14,EY+20,lesson.url.split("#")[0],"editor-file","start");
  txt(svg,EX+EW-14,EY+20,"EDITOR","editor-label","end");
  L.hlg=el("g",{},svg);L.lines=el("g",{},svg);
  L.caret=el("rect",{width:2,height:16,class:"code-caret anim"},svg);
  // browser
  el("rect",{x:BX,y:EY,width:BW,height:EH,rx:10,class:"browser"},svg);
  el("rect",{x:BX,y:EY,width:BW,height:30,rx:10,class:"browser-bar"},svg);
  el("rect",{x:BX,y:EY+20,width:BW,height:10,class:"browser-bar"},svg);
  ["#ff6159","#ffbd2e","#28c941"].forEach((c,i)=>el("circle",{cx:BX+14+i*13,cy:EY+15,r:4.2,fill:c},svg));
  el("rect",{x:BX+56,y:EY+6,width:BW-66,height:18,rx:9,class:"url"},svg);
  txt(svg,BX+66,EY+19,lesson.url,"url-text","start");
  L.view=el("g",{},svg);
  L.badge=el("g",{class:"tag anim"},svg);el("rect",{rx:9,height:20,class:"tag-bg"},L.badge);txt(L.badge,0,0,"","tag-text");
  L.check=checkEl(svg);
  L.dots=lesson.steps.map((_,i)=>el("circle",{cx:BX+BW/2+(i-(lesson.steps.length-1)/2)*16,cy:EY+EH+22,r:4.5,class:"dot"},svg));
  L.stepLbl=txt(svg,EX+EW/2,EY+EH+26,"","panel-hint");
  const c=cursorEl(svg,id);L.cursor=c.g;L.ripple=c.r;
  return {svg,L};
}
function CodePlayer(type,lesson,root,opts){
  const {svg,L}=buildCode(type,lesson);root.appendChild(svg);
  const steps=lesson.steps;let step=0,timers=[],alive=true;
  const later=(fn,ms)=>{const id=setTimeout(()=>{timers=timers.filter(t=>t!==id);if(alive)fn()},ms);timers.push(id)};
  const clear=()=>{timers.forEach(clearTimeout);timers=[]};
  const on=(e,yes)=>e&&e.classList.toggle("visible",!!yes);
  const LH=24,top=EY+52;
  function drawLine(i,text,partial){
    let t=L.lines.querySelector('[data-i="'+i+'"]');
    if(!t){t=txt(L.lines,EX+40,top+i*LH,"","code-line","start");t.dataset.i=i;
      txt(L.lines,EX+24,top+i*LH,String(i+1),"line-no","end")}
    t.replaceChildren();tokens(partial).forEach(([v,c])=>{const sp=el("tspan",{class:c},t);sp.textContent=v});
    fitText(t,EW-52);return t}
  function drawCode(s,typedChars){
    L.lines.replaceChildren();L.hlg.replaceChildren();
    (s.hl||[]).forEach(i=>el("rect",{x:EX+6,y:top+i*LH-16,width:EW-12,height:22,rx:4,class:"code-hl"},L.hlg));
    if(s.typeLine!==undefined)el("rect",{x:EX+6,y:top+s.typeLine*LH-16,width:EW-12,height:22,rx:4,class:"code-hl typing"},L.hlg);
    let caretT=null;
    s.code.forEach((line,i)=>{const part=(i===s.typeLine&&typedChars!==null)?line.slice(0,typedChars):line;const t=drawLine(i,line,part);if(i===s.typeLine)caretT=t});
    if(caretT&&typedChars!==null){let w=0;try{w=caretT.getComputedTextLength()}catch{}
      L.caret.setAttribute("x",EX+41+w);L.caret.setAttribute("y",top+s.typeLine*LH-13);on(L.caret,true)}else on(L.caret,false);
  }
  function drawPreview(s,animate){
    L.view.replaceChildren();
    const mobile=!!s.mobile,fw=mobile?132:BW-36,fx=mobile?BX+(BW-132)/2:BX+18;let y=EY+48;
    if(mobile)el("rect",{x:fx-8,y:EY+38,width:fw+16,height:EH-44,rx:16,class:"phone"},L.view);
    const boxes=[];
    if(!s.preview.length){txt(L.view,BX+BW/2,EY+EH/2+10,"Página en blanco","blank-text")}
    s.preview.forEach((p,i)=>{const g=el("g",{class:"pv"},L.view);let h=0;
      if(p.t==="h1"){const t=txt(g,fx,y+22,p.text,"pv-h1","start");if(p.color)t.setAttribute("style","fill:"+p.color);h=30}
      else if(p.t==="h2"){txt(g,fx,y+16,p.text,"pv-h2","start");h=22}
      else if(p.t==="p"){const t=txt(g,fx,y+(p.size||14)+2,p.text,"pv-p","start");if(p.size)t.setAttribute("style","font-size:"+p.size+"px");h=(p.size||14)+10}
      else if(p.t==="header"){el("rect",{x:fx,y,width:fw,height:30,rx:5,class:"pv-header"},g);txt(g,fx+10,y+20,p.text,"pv-header-t","start");h=34}
      else if(p.t==="nav"){let x=fx;p.items.forEach(it=>{const w=it.length*7+16;el("rect",{x,y:y+2,width:w,height:20,rx:10,class:"pv-pill"},g);txt(g,x+w/2,y+16,it,"pv-link");x+=w+6});h=26}
      else if(p.t==="img"){const w=mobile?fw:110,ih=mobile?40:52;el("rect",{x:fx,y,width:w,height:ih,rx:5,class:"pv-img"},g);
        el("path",{d:"M"+(fx+10)+" "+(y+ih-8)+" l18 -20 l12 12 l8 -8 l16 16 z",class:"pv-mtn"},g);el("circle",{cx:fx+w-18,cy:y+14,r:6,class:"pv-sun"},g);
        txt(g,fx+(mobile?6:w+10),y+(mobile?ih+14:ih/2+5),'alt="'+p.alt+'"',"pv-alt","start");h=ih+(mobile?20:6)}
      else if(p.t==="table"){const cw=(mobile?fw:150)/p.rows[0].length;p.rows.forEach((row,r)=>row.forEach((c,ci)=>{
        el("rect",{x:fx+ci*cw,y:y+r*20,width:cw,height:20,class:r?"pv-td":"pv-th"},g);txt(g,fx+ci*cw+6,y+r*20+14,c,r?"pv-cell":"pv-cell th","start")}));h=p.rows.length*20+4}
      boxes.push({x:fx-4,y:y-3,w:(p.t==="table"?(mobile?fw:150):p.t==="img"&&!mobile?110:fw)+8,h:h+2});
      if(animate&&s.typeLine!==undefined&&(s.focus===i))g.classList.add("enter");
      y+=h+(mobile?6:10)});
    const fb=(s.focus==="all")?{x:fx-6,y:EY+42,w:fw+12,h:y-EY-46}:(typeof s.focus==="number"?boxes[s.focus]:null);
    if(fb)el("rect",{x:fb.x,y:fb.y,width:fb.w,height:fb.h,rx:5,class:"pv-focus"},L.view);
    return boxes;
  }
  function paint(n,animate){
    clear();step=n;const s=steps[n];
    const typing=animate&&s.typeLine!==undefined;
    drawCode(s,typing?0:null);
    // preview: during typing show previous step's preview, then swap
    const prevPreview=(steps[n-1]&&steps[n-1].preview)||[];
    let boxes=drawPreview(typing?Object.assign({},s,{preview:prevPreview.slice(0,Math.min(prevPreview.length,s.preview.length)),focus:null}):s,false);
    if(s.badge){const t=L.badge.querySelector("text"),r=L.badge.querySelector("rect");t.textContent=s.badge;const w=s.badge.length*7.5+20;
      r.setAttribute("x",-w/2);r.setAttribute("y",-15);r.setAttribute("width",w);t.setAttribute("x",0);t.setAttribute("y",0);
      L.badge.setAttribute("transform","translate("+(BX+BW-w/2-12)+","+(EY+EH-14)+")")}
    on(L.badge,!!s.badge);
    L.check.setAttribute("transform","translate("+(BX+BW-6)+","+(EY+6)+")");on(L.check,s.check);
    L.dots.forEach((d,i)=>{d.classList.toggle("done",i<n);d.classList.toggle("now",i===n)});
    L.stepLbl.textContent=typing?"ESCRIBIENDO…":"CÓDIGO → VISTA PREVIA";
    on(L.cursor,false);L.ripple.classList.remove("go");
    const doClick=()=>{if(s.click===undefined)return;const b=boxes[s.click];if(!b)return;
      L.cursor.style.transition="none";L.cursor.style.transform="translate("+(b.x+90)+"px,"+(b.y+70)+"px)";L.cursor.getBoundingClientRect();L.cursor.style.transition="";
      on(L.cursor,true);L.cursor.style.transform="translate("+(b.x+30)+"px,"+(b.y+12)+"px)";
      later(()=>{L.ripple.classList.add("go")},animate?700:0)};
    if(typing){const line=s.code[s.typeLine];let i=0;
      const tick=()=>{i=Math.min(line.length,i+2);drawCode(s,i);if(i<line.length)later(tick,55);else later(()=>{drawCode(s,null);boxes=drawPreview(s,true);doClick()},350)};
      later(tick,600)}
    else{if(!animate)drawCode(s,null);doClick()}
    if(opts.onStep)opts.onStep(n,s);
  }
  return {steps,paint:(n,a=true)=>paint(Math.max(0,Math.min(steps.length-1,n)),a),get step(){return step},
    duration:n=>{const s=steps[n];return (s.typeLine!==undefined?1300+s.code[s.typeLine].length*28:0)+(n===steps.length-1?3400:3100)},
    destroy(){alive=false;clear()}};
}
function Player(type,root,opts={}){const lesson=LESSONS[type];return lesson.kind==="code"?CodePlayer(type,lesson,root,opts):SheetPlayer(type,lesson,root,opts)}

/* =====================  PUBLIC RENDER  ===================== */
let token=0,inline=null,loopTimer=null;
function render(type,root){
  token++;const generation=token;
  if(loopTimer){clearTimeout(loopTimer);loopTimer=null}
  if(inline){inline.destroy();inline=null}
  root.replaceChildren();
  if(!LESSONS[type])return;
  const stage=document.createElement("div");stage.className="motion-stage"+(LESSONS[type].kind==="code"?" motion-code":"");
  const progress=document.createElement("div");progress.className="motion-progress";const bar=document.createElement("span");progress.append(bar);
  const controls=document.createElement("div");controls.className="motion-controls";
  const mkBtn=(t,c)=>{const b=document.createElement("button");b.type="button";b.textContent=t;if(c)b.className=c;return b};
  const back=mkBtn("← Anterior"),play=mkBtn("❚❚ Pausar","motion-primary"),forward=mkBtn("Siguiente →"),expand=mkBtn("⛶ Ampliar explicación","motion-expand");
  const count=document.createElement("span");count.className="motion-count";
  controls.append(back,play,forward,count,expand);
  const description=document.createElement("div");description.className="motion-explanation";description.setAttribute("aria-live","off");
  root.append(stage,progress,controls,description);
  const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let playing=!reduce,paused=false;
  const p=Player(type,stage,{onStep:(n,s)=>{
    description.replaceChildren();const strong=document.createElement("strong");strong.textContent="Paso "+(n+1)+" de "+p.steps.length+". ";
    description.append(strong,document.createTextNode(s.text));
    count.textContent=(n+1)+" / "+p.steps.length+(playing?" · EN BUCLE":" · PAUSADO");
    back.disabled=n===0;forward.disabled=n===p.steps.length-1;play.textContent=playing?"❚❚ Pausar":"▶ Reproducir";
    bar.style.animation="none";bar.getBoundingClientRect();
    bar.style.animation=playing&&!paused?"motionProgress "+p.duration(n)+"ms linear forwards":"none";
    bar.style.width=playing?"":((n+1)/p.steps.length*100)+"%";
  }});
  inline=p;
  function schedule(){if(loopTimer)clearTimeout(loopTimer);if(!playing||paused||generation!==token)return;
    loopTimer=setTimeout(()=>{if(generation!==token||!playing||paused)return;p.paint((p.step+1)%p.steps.length);schedule()},p.duration(p.step))}
  const stop=()=>{playing=false;if(loopTimer)clearTimeout(loopTimer)};
  back.onclick=()=>{stop();p.paint(p.step-1,false)};
  forward.onclick=()=>{stop();p.paint(p.step+1,false)};
  play.onclick=()=>{if(playing){stop();p.paint(p.step,false)}else{playing=true;p.paint(p.step===p.steps.length-1?0:p.step);schedule()}};
  expand.onclick=()=>{
    const dialog=document.getElementById("figureDialog"),body=document.getElementById("figureDialogBody"),title=document.getElementById("figureDialogTitle");
    if(!dialog||!body||!title)return;
    paused=true;if(loopTimer)clearTimeout(loopTimer);
    title.textContent="Demostración ampliada · "+(document.getElementById("stepTitle")?.textContent||document.getElementById("theoryTitle")?.textContent||"Informática 8");
    body.replaceChildren();
    const bigStage=document.createElement("div");bigStage.className=stage.className;
    const bigProg=document.createElement("div");bigProg.className="motion-progress";const bigBar=document.createElement("span");bigProg.append(bigBar);
    const cap=document.createElement("p");cap.className="motion-fullscreen-caption";
    body.append(bigStage,bigProg,cap);
    let bigTimer=null;
    const big=Player(type,bigStage,{onStep:(n,s)=>{cap.textContent="Paso "+(n+1)+" / "+big.steps.length+" · "+s.text;
      bigBar.style.animation="none";bigBar.getBoundingClientRect();bigBar.style.animation=reduce?"none":"motionProgress "+big.duration(n)+"ms linear forwards"}});
    const tick=()=>{bigTimer=setTimeout(()=>{big.paint((big.step+1)%big.steps.length);tick()},big.duration(big.step))};
    const cleanup=()=>{clearTimeout(bigTimer);big.destroy();dialog.removeEventListener("close",cleanup);body.replaceChildren();
      paused=false;if(generation===token&&playing){p.paint(p.step);schedule()}};
    dialog.addEventListener("close",cleanup);
    if(typeof dialog.showModal==="function")dialog.showModal();else{dialog.setAttribute("open","");dialog.focus()}
    if(reduce)big.paint(big.steps.length-1,false);else{big.paint(0);tick()}
  };
  if(reduce)p.paint(p.steps.length-1,false);else{p.paint(0);schedule()}
}
function loopMs(type){const d=document.createElement("div"),pl=Player(type,d);let t=0;pl.steps.forEach((_,i)=>t+=pl.duration(i));pl.destroy();return t}
window.AnimatedExcelFigures={render,loopMs,lessons:Object.keys(LESSONS),source:"motion-figures.js"};
})();
