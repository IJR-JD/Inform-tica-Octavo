/* Instituto Jorge Robledo · Informática 8 · Material de profundización
   Módulos 01 y 02. No modifica ni reemplaza la validación oficial
   del Learning Hub, el sandbox ni los videos Full HD originales. */
(()=>{
"use strict";

const U1=[
{
 heading:"La cuadrícula de Excel y la dirección de una celda",
 concept:"Excel es una hoja de cálculo: organiza información en filas horizontales (1, 2, 3…) y columnas verticales (A, B, C…). Cada intersección es una celda. La dirección siempre se escribe primero con la letra de la columna y luego con el número de la fila. Por ejemplo, B2 significa columna B, fila 2. La barra de nombres confirma qué celda está seleccionada.",
 glossary:[["Libro","Archivo que contiene una o más hojas de cálculo"],["Hoja","Espacio de trabajo con filas y columnas"],["Celda","Intersección de una columna y una fila"],["Referencia","Dirección que identifica una celda, por ejemplo B2"]],
 scenario:"Organizamos el registro de ventas de la tienda escolar. En la columna A irán los productos y en la B, sus cantidades. Antes de escribir, necesitamos aprender a ubicar la celda correcta.",
 headers:["","A","B","C"],
 rows:[["1","Producto","Cantidad","Precio"],["2","Cuaderno","4","3500"],["3","Lápiz","8","1200"]],
 focus:"B2", calculation:"Columna B + fila 2 = B2; su contenido en el ejemplo es 4.",
 steps:["Observa la fila superior e identifica las letras A, B y C.","Busca el número 2 en el margen izquierdo de la cuadrícula.","Sigue la columna B hacia abajo hasta su intersección con la fila 2.","En el ejercicio interactivo selecciona B2 y comprueba que la barra de nombres indique B2.","Escribe VENTAS, presiona Enter y usa «Comprobar»."],
 check:["¿Qué representa la letra en B2? La columna.","¿Qué representa el número 2? La fila.","¿Por qué A2 no es correcto? Porque está en otra columna."],
 transfer:"En una lista de asistencia, ¿en qué celda escribirías un dato ubicado en la columna C y la fila 4? Respuesta: C4."
},
{
 heading:"Distinguir el tipo de información antes de calcular",
 concept:"Una celda puede almacenar etiquetas de texto, números, fechas o fórmulas. Las etiquetas describen un registro; los números permiten efectuar cálculos. Por ejemplo, la palabra «Cuaderno» identifica un producto y el número 4 representa una cantidad. El símbolo de moneda puede aplicarse como formato; el valor numérico subyacente sigue siendo 3500.",
 glossary:[["Texto","Palabras como producto, nombre o categoría"],["Número","Cantidad medible que participa en operaciones"],["Fórmula","Expresión iniciada por = que realiza un cálculo"],["Formato","Modo en que se presenta un dato, sin cambiar su valor"]],
 scenario:"Una papelería registra cuadernos y lápices. Una tabla bien organizada coloca cada tipo de información en la columna apropiada.",
 headers:["","A","B","C"],
 rows:[["1","Producto","Unidades","Precio COP"],["2","Cuaderno","4","3500"],["3","Lápiz","8","1200"]],
 focus:"A2",calculation:"A2 = Cuaderno (texto); B2 = 4 (número); C2 = 3500 (número).",
 steps:["Lee los encabezados A1 y B1: Producto y Cantidad.","Selecciona A2 y escribe exactamente Cuaderno.","Selecciona B2 y escribe 4, sin comillas ni letras.","Compara ambos datos: el texto identifica y el número puede sumarse.","Presiona «Comprobar» para validar la ubicación y el tipo de dato."],
 check:["¿Se puede sumar directamente «Cuaderno» y 4? No: el primero es texto.","¿Es mejor escribir 3500 o «$3.500» como texto? Escribir 3500 y aplicar formato monetario."],
 transfer:"Para registrar 12 borradores, escribe «Borrador» en una columna de producto y 12 en una columna de cantidad."
},
{
 heading:"La suma automática mediante referencias",
 concept:"Una fórmula comienza con el signo igual (=). El operador + suma dos cantidades, y una referencia como B2 indica a Excel dónde encontrar un valor. Una fórmula basada en celdas se actualiza cuando cambian los datos; escribir directamente el resultado 13 no conserva el procedimiento.",
 glossary:[["Operador +","Suma los valores de dos expresiones"],["Referencia de celda","Usa el contenido almacenado en una dirección"],["Resultado calculado","Número mostrado tras evaluar la fórmula"]],
 scenario:"En la papelería hay 8 lápices azules y 5 lápices rojos. Queremos determinar cuántos lápices hay en total.",
 headers:["","A","B","C"],
 rows:[["1","Artículo","Cantidad",""],["2","Lápices azules","8",""],["3","Lápices rojos","5",""],["4","Total","13",""]],
 focus:"B4",calculation:"En B4: =B2+B3 → 8+5 = 13.",
 steps:["Localiza B2: contiene 8 lápices azules.","Localiza B3: contiene 5 lápices rojos.","Selecciona B4, que será la celda del total.","Escribe =B2+B3 y presiona Enter.","Comprueba que la hoja muestra 13 y que la barra ƒx conserva la fórmula."],
 check:["¿Qué pasaría si B3 cambia a 7? El resultado será 15.","¿Por qué no basta con escribir 13? Porque se pierde el cálculo automático."],
 transfer:"Una clase reunió 12 libros el lunes y 9 el martes. Si están en B2 y B3, escribe en B4 =B2+B3; resultado 21."
},
{
 heading:"Resta para calcular existencias y saldos",
 concept:"El operador - permite calcular una diferencia. El orden importa: las existencias finales se obtienen restando lo vendido del inventario inicial. La fórmula =B2-B3 no significa lo mismo que =B3-B2. La resta ayuda a controlar inventarios, consumo de materiales y presupuestos.",
 glossary:[["Minuendo","Cantidad de partida: inventario inicial"],["Sustraendo","Cantidad que se retira: unidades vendidas"],["Diferencia","Resultado de la resta"]],
 scenario:"La tienda escolar comienza con 20 botellas de agua y vende 7 durante el descanso.",
 headers:["","A","B","C"],
 rows:[["1","Registro","Unidades",""],["2","Inventario inicial","20",""],["3","Vendidas","7",""],["4","Disponibles","13",""]],
 focus:"B4",calculation:"En B4: =B2-B3 → 20−7 = 13.",
 steps:["Identifica el inventario inicial: B2 = 20.","Identifica las unidades vendidas: B3 = 7.","Selecciona la celda B4.","Introduce =B2-B3, no =B3-B2.","Presiona Enter, interpreta 13 unidades disponibles y valida el ejercicio."],
 check:["¿El resultado puede ser negativo? Sí; señalaría un problema de datos o más ventas que inventario.","Si se venden 5 unidades adicionales, ¿qué valor esperarías? 8 disponibles."],
 transfer:"Un hogar dispone de 85000 COP y gasta 32000 COP. Para hallar el saldo, resta presupuesto menos gasto: 53000 COP."
},
{
 heading:"Multiplicación: calcular subtotales de una compra",
 concept:"En Excel, la multiplicación se escribe con asterisco (*), no con la letra x. El subtotal de una compra resulta de multiplicar cantidad por precio unitario: cantidad × precio. Si B2 contiene 4 y C2 contiene 3500, D2 debe guardar =B2*C2. El valor mostrado será 14000.",
 glossary:[["Cantidad","Número de unidades compradas"],["Precio unitario","Costo de una unidad"],["Subtotal","Cantidad multiplicada por el precio unitario"]],
 scenario:"Una papelería vende cuatro cuadernos a 3500 COP cada uno. Debemos calcular cuánto paga el cliente antes de descuentos.",
 headers:["","A","B","C","D"],
 rows:[["1","Producto","Cantidad","Precio","Subtotal"],["2","Cuaderno","4","3500","14000"]],
 focus:"D2",calculation:"En D2: =B2*C2 → 4×3500 = 14000 COP.",
 steps:["Comprueba B2 = 4: cantidad de cuadernos.","Comprueba C2 = 3500: precio por unidad.","Selecciona D2, la celda del subtotal.","Escribe =B2*C2, con asterisco entre las referencias.","Presiona Enter y verifica el resultado: 14000."],
 check:["Si la cantidad aumenta a 5, ¿cuál será el subtotal? 17500 COP.","¿Qué pasa si escribes =B2xC2? No es el operador de multiplicación correcto."],
 transfer:"Tres jugos a 4200 COP: coloca 3 en B2, 4200 en C2 y =B2*C2 en D2; total 12600 COP."
},
{
 heading:"División: costo por unidad y reparto",
 concept:"El operador / representa división. Dividir un costo total por la cantidad de unidades permite conocer el precio unitario. En Excel, intentar dividir por cero produce #DIV/0!, por lo que siempre hay que comprobar que el divisor sea distinto de cero. Cambiar el orden de los datos cambia el significado del resultado.",
 glossary:[["Dividendo","Cantidad total que se reparte"],["Divisor","Número de partes iguales"],["Cociente","Resultado de la división"],["#DIV/0!","Error al dividir por cero"]],
 scenario:"Tres estudiantes comparten una compra de bolígrafos que costó 12000 COP. Queremos saber cuánto corresponde a cada unidad.",
 headers:["","A","B","C","D"],
 rows:[["1","Artículo","Total COP","Unidades","COP/unidad"],["2","Bolígrafos","12000","3","4000"]],
 focus:"D2",calculation:"En D2: =B2/C2 → 12000÷3 = 4000 COP.",
 steps:["Localiza B2 = 12000 (precio total).","Localiza C2 = 3 (número de unidades).","Selecciona D2.","Escribe =B2/C2, presiona Enter y comprueba 4000.","Verifica que C2 no sea cero para evitar #DIV/0!."],
 check:["¿Qué ocurriría con 4 unidades? El precio unitario sería 3000 COP.","¿Por qué =C2/B2 no sirve? Porque invierte las unidades y el significado."],
 transfer:"Una caja de 6 borradores cuesta 18000 COP. La unidad vale 3000 COP."
},
{
 heading:"Función SUMA y rangos continuos",
 concept:"SUMA es una función de Excel: su nombre describe la operación y los argumentos van dentro de paréntesis. Un rango como B2:B4 incluye B2, B3 y B4. La fórmula =SUMA(B2:B4) permite sumar numerosas celdas sin encadenar muchos signos +. En Excel configurado en inglés, el equivalente suele ser =SUM(B2:B4).",
 glossary:[["Función","Cálculo incorporado con nombre y argumentos"],["Rango","Conjunto de celdas contiguas, como B2:B4"],["Dos puntos (: )","Delimitan el inicio y el final de un rango"]],
 scenario:"La tienda registra ventas de tres días: 10 unidades el lunes, 20 el martes y 30 el miércoles.",
 headers:["","A","B","C"],
 rows:[["1","Día","Unidades",""],["2","Lunes","10",""],["3","Martes","20",""],["4","Miércoles","30",""],["5","Total","60",""]],
 focus:"B5",calculation:"En B5: =SUMA(B2:B4) → 10+20+30 = 60.",
 steps:["Observa los valores B2 = 10, B3 = 20 y B4 = 30.","Selecciona B5.","Escribe =SUMA(B2:B4), con dos puntos y paréntesis.","Presiona Enter y comprueba 60.","Explica qué ocurrirá si cambias el valor de B3: la función recalculará el total."],
 check:["¿B2:B4 incluye B3? Sí, todos los valores intermedios.","¿Por qué SUMA(B2:B4) es útil? Permite ampliar y revisar rangos con facilidad."],
 transfer:"Para sumar cinco ventas registradas en C2:C6, utiliza =SUMA(C2:C6)."
}
];

function elem(tag,cl,text){
 const n=document.createElement(tag);
 if(cl)n.className=cl;
 if(text!==undefined)n.textContent=text;
 return n;
}
function makeSection(cl,eyebrow,heading){
 const section=elem("section",cl);
 if(eyebrow)section.append(elem("p","ped-kicker",eyebrow));
 if(heading)section.append(elem("h3","ped-h3",heading));
 return section;
}
function addParagraph(root,t){root.append(elem("p","ped-copy",t))}
function makeTable(headers,rows,focus){
 const wrap=elem("div","ped-table-wrap");
 const table=elem("table","ped-sheet");
 table.setAttribute("aria-label","Ejemplo de hoja de cálculo");
 const thead=elem("thead"),tr=elem("tr");
 headers.forEach(h=>tr.append(elem("th","",h)));
 thead.append(tr);table.append(thead);
 const body=elem("tbody");
 rows.forEach(row=>{
   const tr=elem("tr");
   row.forEach((val,col)=>{
     const cell=elem(col===0?"th":"td","",val);
     if(col>0 && headers[col]+row[0]===focus)cell.classList.add("ped-cell-focus");
     tr.append(cell);
   });
   body.append(tr);
 });
 table.append(body);wrap.append(table);
 return wrap;
}
function list(items,ordered){
 const root=elem(ordered?"ol":"ul","ped-list");
 items.forEach(item=>root.append(elem("li","",item)));
 return root;
}
function renderUnit1(index,root){
 if(!root)return;
 root.replaceChildren();
 const d=U1[index];if(!d)return;
 const header=makeSection("ped-intro","UNIDAD 01 · FUNDAMENTOS Y PROCEDIMIENTO","Teoría completa · "+d.heading);
 addParagraph(header,d.concept);
 root.append(header);
 const vocab=makeSection("ped-card","01 · CONCEPTOS CLAVE","Vocabulario que debes dominar");
 const dl=elem("dl","ped-glossary");
 d.glossary.forEach(([term,definition])=>{
   const pair=elem("div","ped-term");
   pair.append(elem("dt","",term),elem("dd","",definition));dl.append(pair);
 });
 vocab.append(dl);root.append(vocab);
 const example=makeSection("ped-card","02 · EJEMPLO CONTEXTUALIZADO","Situación real: tienda escolar / papelería");
 addParagraph(example,d.scenario);
 example.append(makeTable(d.headers,d.rows,d.focus));
 example.append(elem("p","ped-calculation",d.calculation));
 root.append(example);
 const practice=makeSection("ped-card","03 · HACEMOS Y COMPROBAMOS","Procedimiento guiado en la hoja interactiva");
 practice.append(list(d.steps,true));root.append(practice);
 const reflection=makeSection("ped-card","04 · VERIFICACIÓN DEL APRENDIZAJE","¿Entendiste el procedimiento?");
 reflection.append(list(d.check,false));
 const transfer=elem("p","ped-transfer");transfer.append(elem("strong","","Reto de transferencia: "),document.createTextNode(d.transfer));reflection.append(transfer);
 root.append(reflection);
}
const M2={
 intro:"Toda operación se escribe dentro de una celda y comienza por =. Excel primero interpreta las referencias (por ejemplo B2), recupera sus valores y ejecuta los operadores según su prioridad. Los paréntesis permiten cambiar el orden. Las operaciones son más confiables cuando los datos de entrada y sus unidades son correctos.",
 glossary:[
  ["=","Inicia una fórmula; sin él, la expresión no se calcula."],
  ["+ y −","Suma y resta cantidades."],
  ["* y /","Multiplica y divide; la división por cero es inválida."],
  ["( )","Determinan qué parte se calcula primero."],
  ["SUMA","Suma todas las cantidades del rango indicado."],
  ["Referencias","Permiten recalcular cuando cambia una celda."]
 ],
 cases:[
  {title:"Comida rápida · valor de un pedido",story:"En el restaurante escolar se venden hamburguesas a 14000 COP cada una. Queremos calcular el subtotal de 3 hamburguesas.",headers:["","A","B","C","D"],rows:[["1","Producto","Cantidad","Precio","Subtotal"],["2","Hamburguesa","3","14000","42000"]],focus:"D2",formula:"=B2*C2",expected:"3×14000 = 42000 COP",steps:["Escribe Producto, Cantidad, Precio y Subtotal en A1:D1.","Coloca Hamburguesa en A2, 3 en B2 y 14000 en C2.","Selecciona D2 e introduce =B2*C2.","Presiona Enter: la celda muestra 42000.","Cambia B2 a 4. El subtotal se convierte automáticamente en 56000."]},
  {title:"Inventario · saber cuántos productos quedan",story:"La papelería dispone de 50 cuadernos y vende 18. La fórmula debe representar existencias iniciales menos ventas.",headers:["","A","B","C"],rows:[["1","Registro","Unidades",""],["2","Inventario","50",""],["3","Vendidos","18",""],["4","Disponibles","32",""]],focus:"B4",formula:"=B2-B3",expected:"50−18 = 32 cuadernos",steps:["Registra 50 en B2 y 18 en B3.","En B4 escribe =B2-B3.","Confirma que el resultado es 32.","Si se venden 5 adicionales, actualiza B3 a 23.","Comprueba que el nuevo saldo es 27."]},
  {title:"Gastos de casa · sumar consumos",story:"Una familia registra gastos semanales de transporte, alimentos y materiales. El objetivo es calcular el gasto total.",headers:["","A","B","C"],rows:[["1","Categoría","COP",""],["2","Transporte","12000",""],["3","Alimentos","28000",""],["4","Materiales","10000",""],["5","Total","50000",""]],focus:"B5",formula:"=SUMA(B2:B4)",expected:"12000+28000+10000 = 50000 COP",steps:["Escribe las categorías en A2:A4 y los valores en B2:B4.","Selecciona B5.","Introduce =SUMA(B2:B4) y presiona Enter.","Verifica que el rango incluya todos los gastos.","Si B3 cambia de 28000 a 30000, el total pasa a 52000."]},
  {title:"Precio por unidad · reparto en partes iguales",story:"Una bolsa con 6 artículos cuesta 18000 COP. Queremos calcular cuánto cuesta cada artículo.",headers:["","A","B","C","D"],rows:[["1","Producto","Costo total","Unidades","COP/unidad"],["2","Borradores","18000","6","3000"]],focus:"D2",formula:"=B2/C2",expected:"18000÷6 = 3000 COP",steps:["Coloca 18000 en B2 y 6 en C2.","Selecciona D2 e introduce =B2/C2.","Presiona Enter y comprueba 3000.","Revisa el orden: costo total dividido entre cantidad.","Si C2 es 0, Excel muestra #DIV/0!: corrige la cantidad."]}
 ],
 exercises:[
 {title:"1. Subtotal de frutas",story:"En B2 hay 6 manzanas y en C2 el precio de 2500 COP por unidad. Calcula el subtotal en D2.",correct:"=B2*C2",result:15000,feedback:"Se multiplican las 6 unidades por 2500 COP. La respuesta es 15000."},
 {title:"2. Materiales restantes",story:"En B2 hay 45 unidades y en B3 se registran 17 unidades usadas. Calcula lo restante en B4.",correct:"=B2-B3",result:28,feedback:"45−17 = 28 unidades. El inventario va antes del consumo."},
 {title:"3. Total semanal",story:"En B2:B4 figuran 12000, 28000 y 10000 COP. Calcula el total en B5 utilizando una función.",correct:"=SUMA(B2:B4)",result:50000,feedback:"La función SUMA agrega todas las celdas del rango B2:B4: 50000."},
 {title:"4. Precio por borrador",story:"B2 contiene un costo total de 18000 COP y C2 contiene 6 borradores. Calcula el costo por unidad en D2.",correct:"=B2/C2",result:3000,feedback:"El precio unitario es costo total / cantidad: 18000÷6 = 3000."},
 {title:"5. Orden de operaciones",story:"B2 vale 8, C2 vale 3 y D2 vale 2. Calcula (B2+C2)*D2 y explica por qué hacen falta paréntesis.",correct:"=(B2+C2)*D2",result:22,feedback:"Los paréntesis fuerzan 8+3 primero; después 11×2 = 22."}
 ]
};
function normalizeFormula(str){return str.toUpperCase().replace(/\s+/g,"").replace(/^=SUM\(/,"=SUMA(");}
function renderModule2(root){
 if(!root)return;
 root.replaceChildren();
 const intro=makeSection("ped-intro","MÓDULO 02 · OPERACIONES Y FÓRMULAS","Aprende a calcular, interpretar y corregir");
 addParagraph(intro,M2.intro);
 const vocab=elem("dl","ped-glossary");
 M2.glossary.forEach(([k,v])=>{const p=elem("div","ped-term");p.append(elem("dt","",k),elem("dd","",v));vocab.append(p)});
 intro.append(vocab);root.append(intro);
 M2.cases.forEach((d,index)=>{
   const part=makeSection("ped-card","EJEMPLO "+String(index+1).padStart(2,"0")+" · SITUACIÓN REAL",d.title);
   addParagraph(part,d.story);
   part.append(makeTable(d.headers,d.rows,d.focus));
   part.append(elem("p","ped-calculation",d.formula+" → "+d.expected));
   part.append(elem("h4","ped-h4","Resuélvelo paso a paso"));
   part.append(list(d.steps,true));
   root.append(part);
 });
 const recap=makeSection("ped-card","ESTRATEGIA DE REVISIÓN","Antes de comprobar: cinco preguntas");
 recap.append(list(["¿El contenido empieza con =?","¿Las referencias corresponden a las celdas correctas?","¿Utilizaste *, /, + o − según el problema?","¿El orden de operaciones y los paréntesis son adecuados?","¿El resultado tiene sentido según la situación y sus unidades?"],true));
 root.append(recap);
 const quiz=makeSection("ped-card ped-interactive","PRACTICA SIN ARRIESGAR TU NOTA","Escribe fórmulas y recibe retroalimentación inmediata");
 addParagraph(quiz,"Este simulador formativo complementa los ejercicios del Excel Sandbox. Escribe las fórmulas como lo harías en Excel. El resultado no se almacena como nota institucional.");
 const selectRow=elem("div","ped-exercise-selector");
 const label=elem("label","ped-label","Ejercicio");
 const select=elem("select","ped-select");
 M2.exercises.forEach((e,i)=>{const o=elem("option","",e.title);o.value=String(i);select.append(o)});
 label.append(select);selectRow.append(label);quiz.append(selectRow);
 const prompt=elem("p","ped-prompt"),entry=elem("input","ped-input");
 entry.type="text";entry.autocomplete="off";entry.spellcheck=false;entry.placeholder="Escribe una fórmula, por ejemplo =B2*C2";
 entry.setAttribute("aria-label","Fórmula propuesta para el ejercicio");
 const buttons=elem("div","ped-actions");
 const verify=elem("button","ped-verify","Comprobar fórmula");verify.type="button";
 const hint=elem("button","ped-hint","Ver explicación");hint.type="button";
 buttons.append(verify,hint);
 const response=elem("p","ped-response","Completa una fórmula y presiona Comprobar.");
 response.setAttribute("role","status");response.setAttribute("aria-live","polite");
 const progress=elem("p","ped-progress","Prácticas completadas: 0 de "+M2.exercises.length);
 quiz.append(prompt,entry,buttons,response,progress);
 root.append(quiz);
 const passed=new Set();
 function show(){const i=Number(select.value),e=M2.exercises[i];prompt.textContent=e.story;entry.value="";response.textContent="Tu fórmula debe comenzar con = y emplear referencias de celda.";response.className="ped-response"}
 select.addEventListener("change",show);
 verify.addEventListener("click",()=>{
   const e=M2.exercises[Number(select.value)];
   const actual=normalizeFormula(entry.value);
   if(actual===normalizeFormula(e.correct)){
     passed.add(Number(select.value));
     response.textContent="✓ Correcto. "+e.feedback;
     response.className="ped-response ped-ok";
     progress.textContent="Prácticas completadas: "+passed.size+" de "+M2.exercises.length;
   }else{
     response.textContent=entry.value.trim()?"Revisa las referencias y el operador. Pista: "+e.story:"Escribe primero una fórmula para comprobarla.";
     response.className="ped-response ped-bad";
   }
 });
 hint.addEventListener("click",()=>{
   const e=M2.exercises[Number(select.value)];
   response.textContent="Ejemplo resuelto: "+e.correct+" → "+e.result+". "+e.feedback;
   response.className="ped-response";
 });
 entry.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();verify.click()}});
 show();
}
window.IJRPedagogy={renderUnit1,renderModule2,unit1Count:U1.length,module2Examples:M2.cases.length,module2Exercises:M2.exercises.length};
})();
