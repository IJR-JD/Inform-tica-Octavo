/* Interactive SVG tutorials for Informatics 8, first unit.
   Source SVG, timing and captions are fully editable; no libraries required. */
(()=>{
"use strict";
let token=0,timer=null;
const C=["A","B","C","D","E"];
const X=92, Y=60, W=76, H=41, LABEL=43;
function svgText(x,y,s,cl="axis-label",anchor="middle"){return '<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" class="'+cl+'">'+s+'</text>'}
function rect(x,y,w,h,cls,id=""){return '<rect '+(id?'id="'+id+'" ':'')+'x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" class="'+cls+'"/>'}
function pos(cell){const match=/^([A-E])([1-5])$/.exec(cell);return {x:X+C.indexOf(match[1])*W,y:Y+(Number(match[2])-1)*H}}
function diagram(type){
 const data={
 cell:{col:"B",row:2,refs:["B2"],values:[],formula:"B2",result:"VENTAS"},
 data:{col:"A",row:2,refs:["A2","B2"],values:[["A2","Cuaderno"],["B2","4"]],formula:"Texto + número",result:"A2 · B2"},
 addition:{col:"B",row:4,refs:["B2","B3","B4"],values:[["B2","8"],["B3","5"],["B4","13"]],formula:"=B2+B3",result:"8 + 5 = 13"},
 subtraction:{col:"B",row:4,refs:["B2","B3","B4"],values:[["B2","20"],["B3","7"],["B4","13"]],formula:"=B2-B3",result:"20 − 7 = 13"},
 multiplication:{col:"D",row:2,refs:["B2","C2","D2"],values:[["B2","4"],["C2","3500"],["D2","14000"]],formula:"=B2*C2",result:"4 × 3500 = 14000"},
 division:{col:"D",row:2,refs:["B2","C2","D2"],values:[["B2","12000"],["C2","3"],["D2","4000"]],formula:"=B2/C2",result:"12000 ÷ 3 = 4000"},
 sum:{col:"B",row:5,refs:["B2","B3","B4","B5"],values:[["B2","10"],["B3","20"],["B4","30"],["B5","60"]],formula:"=SUMA(B2:B4)",result:"10 + 20 + 30 = 60"}
 }[type]||null;
 if(!data)return null;
 let out='<svg viewBox="0 0 640 360" role="img" aria-label="Demostración animada de Excel: '+type+'"><defs><marker id="diagram-arrow-tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#176440"/></marker></defs>';
 out+=rect(X-LABEL,Y-LABEL,W*5+LABEL,H*5+LABEL,"frame");
 out+=rect(X,Y-LABEL,W*5,LABEL,"sheet-header")+rect(X-LABEL,Y,LABEL,H*5,"sheet-header");
 for(let i=1;i<5;i++){const x=X+i*W,y=Y+i*H;out+='<line x1="'+x+'" y1="'+(Y-LABEL)+'" x2="'+x+'" y2="'+(Y+5*H)+'" class="line"/><line x1="'+(X-LABEL)+'" y1="'+y+'" x2="'+(X+W*5)+'" y2="'+y+'" class="line"/>'}
 for(let i=0;i<5;i++){out+=svgText(X+W*(i+.5),Y-15,C[i]);out+=svgText(X-LABEL/2,Y+H*(i+.5)+6,String(i+1))}
 // overlays deliberately added after the grid for clear reading
 const columnIdx=C.indexOf(data.col);
 out+=rect(X+columnIdx*W,Y-LABEL,W,5*H+LABEL,"column-glow animated-item","anim-column");
 out+=rect(X-LABEL,Y+(data.row-1)*H,W*5+LABEL,H,"row-glow animated-item","anim-row");
 const target=pos(data.col+data.row);
 out+=rect(target.x,target.y,W,H,"target-cell animated-item","anim-target");
 for(let i=0;i<5;i++)out+=svgText(X+W*(i+.5),Y-15,C[i]);
 for(let i=0;i<5;i++)out+=svgText(X-LABEL/2,Y+H*(i+.5)+6,String(i+1));
 data.values.forEach(([cell,v],i)=>{const p=pos(cell);out+=svgText(p.x+W/2,p.y+26,v,"highlight-label animated-item","middle").replace('class="highlight-label animated-item"','id="value-'+i+'" class="highlight-label animated-item"')});
 out+='<path id="anim-arrow" class="arrow animated-item" marker-end="url(#diagram-arrow-tip)" d="M '+(target.x+W/2)+' '+(target.y+H/2)+' C 512 '+(target.y+H/2)+', 502 156, 553 156"/>';
 out+=rect(479,116,144,79,"operation-box");
 out+=svgText(550,139,"BARRA ƒx","figure-side-title");
 out+=svgText(550,168,data.formula.length>12?data.formula.slice(0,12):data.formula,"formula-text animated-item").replace('class="formula-text animated-item"','id="anim-formula" class="formula-text animated-item"');
 out+=svgText(550,215,"RESULTADO","figure-side-title");
 out+=svgText(550,244,data.result.length>15?data.result.slice(0,15):data.result,"step-caption animated-item").replace('class="step-caption animated-item"','id="anim-result" class="step-caption animated-item"');
 out+='<path id="anim-pointer" class="pointer animated-item" d="M '+(target.x+W-13)+' '+(target.y+H-12)+' l-12 -22 l-4 11 l-9 3 z" fill="#111" stroke="#fff" stroke-width="1.8"/>';
 out+='</svg>';return {svg:out,data};
}
function captions(type){
 const c={
 cell:["Observa las letras de las columnas. Busca la letra B en la parte superior.","Ahora localiza la fila número 2 en el borde izquierdo.","Sigue mentalmente la columna B hacia abajo y la fila 2 hacia la derecha: se cruzan en B2.","Haz clic en B2 en el ejercicio práctico. Escribe VENTAS y presiona Enter.","Has ubicado correctamente la celda. Ahora puedes completar y comprobar el ejercicio."],
 data:["Observa los encabezados de la hoja.","La columna A guarda el nombre del producto: Cuaderno.","La columna B almacena una cantidad numérica: 4.","En la cuadrícula práctica escribe Cuaderno en A2 y 4 en B2.","Revisa ambas direcciones antes de comprobar."],
 addition:["Identifica los valores de B2 y B3: 8 y 5.","Recuerda que el símbolo + representa una suma.","En la barra de fórmulas escribe =B2+B3.","El resultado calculado es 13. Excel conserva la fórmula aunque muestre el valor.","Ahora resuelve el ejercicio en la hoja de la derecha."],
 subtraction:["El inventario inicial se encuentra en B2: 20.","En B3 está la cantidad vendida: 7.","Para saber lo que queda, resta: =B2-B3.","La celda B4 debe mostrar 13.","Escribe esa fórmula y comprueba el resultado."],
 multiplication:["La cantidad está en B2: 4 unidades.","El precio unitario está en C2: 3500.","La multiplicación en Excel usa *: escribe =B2*C2.","El subtotal calculado es 14000.","Reproduce la operación en D2."],
 division:["En B2 está el costo total: 12000.","En C2 está el número de unidades: 3.","La división se escribe con /: utiliza =B2/C2.","El precio unitario resultante es 4000.","Escribe esa fórmula en D2 y valídala."],
 sum:["Observa las tres cantidades: 10, 20 y 30.","Selecciona mentalmente el intervalo B2:B4, incluidas ambas celdas.","La función SUMA recibe un rango: =SUMA(B2:B4).","El total de 10 + 20 + 30 es 60.","Introduce la función en B5 y completa la unidad."]
 };return c[type]||c.cell;
}
function render(type,root){
  token++;
  const generation=token;
  if(timer!==null){clearTimeout(timer);timer=null}
  root.replaceChildren();
  const visual=diagram(type);
  if(!visual)return;
  const wrapper=document.createElement("div");
  wrapper.className="motion-stage";
  wrapper.innerHTML=visual.svg;
  const description=document.createElement("div");
  description.className="motion-explanation";
  description.setAttribute("role","status");
  description.setAttribute("aria-live","off");
  const controls=document.createElement("div");
  controls.className="motion-controls";
  const back=document.createElement("button");back.type="button";back.textContent="← Anterior";
  const play=document.createElement("button");play.type="button";play.className="motion-primary";play.textContent="❚❚ Pausar";
  const forward=document.createElement("button");forward.type="button";forward.textContent="Siguiente →";
  const expand=document.createElement("button");expand.type="button";expand.className="motion-expand";expand.textContent="⛶ Ampliar explicación";
  const count=document.createElement("span");count.className="motion-count";
  controls.append(back,play,forward,expand,count);
  root.append(wrapper,controls,description);
  const texts=captions(type);
  const reduceMotion=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const svg=wrapper.querySelector("svg");
  let step=0,isPlaying=!reduceMotion,expanded=false;
  function toggle(id,yes){const e=svg.querySelector("#"+id);if(e)e.classList.toggle("visible",yes)}
  function paint(n){
    step=Math.max(0,Math.min(texts.length-1,n));
    ["anim-column","anim-row","anim-target","anim-arrow","anim-pointer","anim-formula","anim-result",...visual.data.values.map((_,i)=>"value-"+i)].forEach(x=>toggle(x,false));
    if(type==="cell"){
      toggle("anim-column",step>=0);toggle("anim-row",step>=1);toggle("anim-target",step>=2);
      toggle("anim-pointer",step>=3);toggle("anim-arrow",step>=3);
      toggle("anim-formula",step>=2);toggle("anim-result",step>=3);
    }else{
      toggle("anim-column",step>=0);toggle("anim-row",step>=1);toggle("anim-target",step>=2);
      visual.data.values.forEach((_,i)=>toggle("value-"+i,step>=Math.min(3,i+1)));
      toggle("anim-pointer",step>=3);toggle("anim-arrow",step>=3);
      toggle("anim-formula",step>=2);toggle("anim-result",step>=3);
    }
    description.replaceChildren();
    const strong=document.createElement("strong");
    strong.textContent="Paso "+(step+1)+" de "+texts.length+". ";
    description.append(strong,document.createTextNode(texts[step]));
    count.textContent=(step+1)+" / "+texts.length+" · LOOP";
    back.disabled=step===0;forward.disabled=step===texts.length-1;
    play.textContent=isPlaying?"❚❚ Pausar":"▶ Reproducir";
  }
  function stop(){
    isPlaying=false;
    if(timer!==null){clearTimeout(timer);timer=null}
  }
  function schedule(){
    if(!isPlaying||generation!==token||expanded)return;
    // Hold the final result for comprehension, then restart like a looping GIF.
    const wait=step===texts.length-1?2600:2400;
    timer=setTimeout(()=>{
      if(generation!==token||expanded||!isPlaying)return;
      timer=null;
      paint(step===texts.length-1?0:step+1);
      schedule();
    },wait);
  }
  back.onclick=()=>{stop();paint(step-1)};
  forward.onclick=()=>{stop();paint(step+1)};
  play.onclick=()=>{
    if(isPlaying){stop();paint(step)}
    else{isPlaying=true;paint(step);schedule()}
  };
  expand.onclick=()=>{
    expanded=true;
    if(timer!==null){clearTimeout(timer);timer=null}
    const dialog=document.getElementById("figureDialog");
    const target=document.getElementById("figureDialogBody");
    const title=document.getElementById("figureDialogTitle");
    if(!dialog||!target||!title){expanded=false;if(isPlaying)schedule();return}
    title.textContent="Demostración ampliada · "+(document.getElementById("stepTitle")?.textContent||"Excel");
    // The large figure has its own playback so the inline and enlarged views
    // never compete for timers or DOM targets.
    target.replaceChildren();
    const large=diagram(type);
    const bigStage=document.createElement("div");
    bigStage.className="motion-stage";
    bigStage.innerHTML=large.svg;
    const bigDescription=document.createElement("p");
    bigDescription.className="motion-fullscreen-caption";
    bigDescription.setAttribute("aria-live","off");
    target.append(bigStage,bigDescription);
    const bigSvg=bigStage.querySelector("svg");
    let bigStep=0,bigTimer=null,active=true;
    const bigPaint=n=>{
      bigStep=n;
      const ids=["anim-column","anim-row","anim-target","anim-arrow","anim-pointer","anim-formula","anim-result",...large.data.values.map((_,i)=>"value-"+i)];
      ids.forEach(id=>bigSvg.querySelector("#"+id)?.classList.remove("visible"));
      const on=id=>bigSvg.querySelector("#"+id)?.classList.add("visible");
      if(type==="cell"){
        if(n>=0)on("anim-column");if(n>=1)on("anim-row");if(n>=2){on("anim-target");on("anim-formula")}
        if(n>=3){on("anim-pointer");on("anim-arrow");on("anim-result")}
      }else{
        on("anim-column");if(n>=1)on("anim-row");
        if(n>=2){on("anim-target");on("anim-formula")}
        large.data.values.forEach((_,i)=>{if(n>=Math.min(3,i+1))on("value-"+i)});
        if(n>=3){on("anim-pointer");on("anim-arrow");on("anim-result")}
      }
      bigDescription.textContent="Paso "+(n+1)+" / "+texts.length+" · "+texts[n];
    };
    const tick=()=>{
      if(!active)return;
      bigTimer=setTimeout(()=>{if(!active)return;bigStep=(bigStep+1)%texts.length;bigPaint(bigStep);tick()},bigStep===texts.length-1?2600:2400);
    };
    const cleanup=()=>{
      active=false;
      if(bigTimer!==null)clearTimeout(bigTimer);
      dialog.removeEventListener("close",cleanup);
      target.replaceChildren();
      expanded=false;
      // Resume the inline infinite loop when the large view is closed.
      if(generation===token&&isPlaying)schedule();
    };
    dialog.addEventListener("close",cleanup);
    bigPaint(reduceMotion?texts.length-1:0);
    if(!reduceMotion)tick();
    if(typeof dialog.showModal==="function")dialog.showModal();
    else{dialog.setAttribute("open","");dialog.focus()}
  };
  paint(reduceMotion?texts.length-1:0);
  if(isPlaying)schedule();
}
window.AnimatedExcelFigures={render,source:"unidad-01-excel/animated-figures.js"};
})();