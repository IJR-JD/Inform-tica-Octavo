/* Instituto Jorge Robledo · Informática 8 · módulos 02–04
 * Interactive sequential Excel practice, accessible cells and responsive chart.
 * Local pedagogical progress only; never authoritative institutional grades.
 */
(()=>{
"use strict";
const moduleNo=Number(document.documentElement.dataset.excelModule||0);
const config=window.IJRExcelModuleContent?.[moduleNo];
if(!config||![2,3,4].includes(moduleNo))return;
const count=config.items.length;
const $=id=>document.getElementById(id);
const node=(tag,className,value)=>{
 const x=document.createElement(tag);
 if(className)x.className=className;
 if(value!==undefined)x.textContent=String(value);
 return x;
};
const key="ijr-ti8-module-"+moduleNo+"-progress-v1";
const dataKey="ijr-ti8-module-"+moduleNo+"-cells-v1";
function loadJson(k,fallback){try{const v=JSON.parse(localStorage.getItem(k));return v??fallback}catch{return fallback}}
let progress=loadJson(key,Array(count).fill(false));
if(!Array.isArray(progress)||progress.length!==count)progress=Array(count).fill(false);
progress=progress.map(v=>v===true);
for(let i=1;i<count;i++)if(!progress[i-1])progress[i]=false;
let cache=loadJson(dataKey,{});
if(!cache||typeof cache!=="object"||Array.isArray(cache))cache={};
const save=()=>{try{localStorage.setItem(key,JSON.stringify(progress));localStorage.setItem(dataKey,JSON.stringify(cache))}catch{}};
function predecessorComplete(){
 if(moduleNo===2){const v=loadJson("ijr-ti8-excel-practice-v3",[]);return Array.isArray(v)&&v.length===7&&v.every(x=>x===true)}
 const v=loadJson("ijr-ti8-module-"+(moduleNo-1)+"-progress-v1",[]);
 return Array.isArray(v)&&v.length===window.IJRExcelModuleContent[moduleNo-1].items.length&&v.every(x=>x===true);
}
// Prior module completion is a recommendation, not a condition of access.
const predecessorPending=!predecessorComplete();
function frontier(){const idx=progress.indexOf(false);return idx===-1?count:idx}
function sync(){
 const f=frontier(),correct=progress.filter(Boolean).length;
 $("modulePercent").textContent=Math.round(100*correct/count)+"%";
 $("moduleProgress").textContent=correct+" de "+count+" ejercicios registrados";
 $("moduleProgressBar").style.width=(100*correct/count)+"%";
 $("moduleFeedback").textContent=f===count?
 "✓ Módulo completado. Continúa al siguiente módulo.":"Ejercicio "+(f+1)+" de "+count+" · Completa la hoja y presiona «Comprobar» para continuar.";
 document.querySelectorAll("[data-module-link]").forEach((a,i)=>{
  const disabled=i>f;
  a.classList.toggle("is-locked",disabled);
  a.classList.toggle("is-done",progress[i]);
  a.setAttribute("aria-disabled",String(disabled));
  if(disabled){a.removeAttribute("href");a.tabIndex=-1}else{a.href="#module-step-"+(i+1);a.tabIndex=0}
  a.querySelector(".module-state").textContent=progress[i]?"✓":disabled?"🔒":"Ahora";
 });
 document.querySelectorAll(".module-lesson").forEach((x,i)=>{
  x.hidden=i>f;
  const next=x.querySelector(".module-next");
  if(next)next.hidden=!progress[i];
 });
 const finish=$("finishModule");finish.hidden=f!==count;
}
function evaluate(cells,ref){const r=TI8Excel.evaluate(cells,ref,{cols:5,rows:6});return typeof r.value==="boolean"?(r.value?"VERDADERO":"FALSO"):r.value}
function sheet(item,i){
 const shell=node("div","module-sheet");
 const head=node("div","live-sheet-head");
 head.append(node("strong","","HOJA INTERACTIVA · TODAS LAS CELDAS EDITABLES"),node("small","","Celdas sombreadas = respuestas que debes comprobar"));
 const fx=node("div","live-formula-bar"),address=node("output","live-cell-address","");
 const marker=node("span","live-fx","ƒx"),bar=node("input","live-formula");
 bar.autocomplete="off";bar.spellcheck=false;bar.setAttribute("aria-label","Barra de fórmulas");
 fx.append(address,marker,bar);
 const scroller=node("div","live-sheet-scroll"),table=node("table","live-spreadsheet");
 table.setAttribute("aria-label","Hoja de cálculo del ejercicio "+(i+1));
 const header=node("thead"),hdr=node("tr");
 hdr.append(node("th","live-row-head",""));for(const c of "ABCDE")hdr.append(node("th","",c));
 header.append(hdr);table.append(header);
 const tbody=node("tbody");table.append(tbody);scroller.append(table);
 const saved=cache[i]||{},cells={...item.seed};
 for(const [k,v] of Object.entries(saved)){if(/^[A-E][1-6]$/.test(k)&&typeof v==="string"&&v.length<=500)cells[k]=v}
 let selected=Object.keys(item.targets)[0],editor=null,barDirty=false,barSelection=selected;
 const map=new Map();
 function visual(){
  for(const [k,td] of map){
   const v=evaluate(cells,k);
   td.querySelector(".live-cell-view").textContent=v===""?"\u00a0":String(v);
   td.classList.toggle("live-selected",k===selected);
   td.classList.toggle("live-error",typeof v==="string"&&v.startsWith("#"));
  }
  address.textContent=selected;bar.value=cells[selected]||"";
  result.textContent=selected+": "+String(evaluate(cells,selected)||"sin dato");
  if(item.chart)drawChart();
 }
 function invalidate(){
  if(progress[i]){for(let j=i;j<count;j++)progress[j]=false;sync()}
 }
 function commit(value){
  const after=String(value).trim(),old=String(cells[selected]??"");
  cells[selected]=after;if(after!==old)invalidate();
  cache[i]={...cells};save();
  feedback.className="live-feedback";
  feedback.textContent="Valor guardado. Comprueba el ejercicio cuando esté completo.";
  visual();
 }
 function detachEditor(){
  if(!editor)return;
  const old=editor;editor=null;
  if(old.isConnected)old.remove();
  visual();
 }
 function focusCell(k,edit=false){
  if(editor){const val=editor.value;detachEditor();commit(val)}
  selected=k;visual();
  if(!edit)return;
  const td=map.get(k);editor=node("input","live-cell-editor");
  editor.value=cells[k]||"";editor.setAttribute("aria-label","Editar celda "+k);
  td.append(editor);
  const inp=editor;
  inp.addEventListener("input",()=>{bar.value=inp.value});
  inp.addEventListener("keydown",e=>{
   if(e.key==="Enter"||e.key==="Tab"){
    e.preventDefault();const v=inp.value;detachEditor();commit(v);
    if(e.key==="Tab"){const keys=[...map.keys()];const next=keys[keys.indexOf(k)+1];if(next)focusCell(next,true)}
    else td.focus();
   }else if(e.key==="Escape"){e.preventDefault();detachEditor()}
  });
  inp.addEventListener("blur",()=>{if(editor===inp){const v=inp.value;detachEditor();commit(v)}});
  inp.focus();inp.select();
 }
 for(let row=1;row<=6;row++){
  const tr=node("tr"),th=node("th","live-row-head",row);th.scope="row";tr.append(th);
  for(const col of "ABCDE"){
   const ref=col+row,td=node("td",Object.hasOwn(item.targets,ref)?"live-editable live-target":"live-editable");
   td.dataset.cell=ref;td.tabIndex=0;td.setAttribute("role","gridcell");
   td.setAttribute("aria-label","Celda "+ref+", editable");
   td.append(node("span","live-cell-view","\u00a0"));
   td.addEventListener("click",e=>{if(e.target.classList.contains("live-cell-editor"))return;focusCell(ref,true)});
   td.addEventListener("focus",()=>{if(!editor){selected=ref;visual()}});
   td.addEventListener("keydown",e=>{
    if(e.target!==td)return;
    if(e.key==="Enter"||e.key==="F2"){e.preventDefault();focusCell(ref,true)}
    else if(e.key.length===1&&!e.ctrlKey&&!e.altKey){e.preventDefault();focusCell(ref,true);if(editor){editor.value=e.key;editor.dispatchEvent(new Event("input"))}}
   });
   map.set(ref,td);tr.append(td);
  }
  tbody.append(tr);
 }
 bar.addEventListener("focus",()=>{barDirty=false;barSelection=selected});
 bar.addEventListener("input",()=>{barDirty=true;if(editor)editor.value=bar.value});
 function barCommit(){
  if(!barDirty)return;
  const value=bar.value,ref=barSelection;barDirty=false;
  if(editor)detachEditor();
  selected=ref;commit(value);
 }
 bar.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();barCommit();map.get(selected)?.focus()}
  else if(e.key==="Escape"){e.preventDefault();barDirty=false;visual();map.get(selected)?.focus()}});
 bar.addEventListener("blur",()=>{if(barDirty)barCommit()});
 const result=node("div","live-computed",""),actions=node("div","live-sheet-actions"),check=node("button","live-check","Comprobar ejercicio"),reset=node("button","live-reset","Reiniciar hoja");
 check.type="button";reset.type="button";actions.append(check,reset);
 const feedback=node("div","live-feedback","Escribe directamente en las celdas resaltadas y presiona Enter.");
 feedback.setAttribute("role","status");feedback.setAttribute("aria-live","polite");
 const chartHost=node("div","module-chart");if(!item.chart)chartHost.hidden=true;
 function drawChart(){
  chartHost.replaceChildren();
  const title=node("h4","","Gráfico de barras · unidades por producto");
  const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("viewBox","0 0 540 270");svg.setAttribute("role","img");svg.setAttribute("aria-label","Gráfico de barras actualizado con los valores de la hoja");
  const values=[2,3,4].map(r=>({label:String(cells["A"+r]||"Producto "+r),value:evaluate(cells,"B"+r)}));
  const max=Math.max(1,...values.map(x=>typeof x.value==="number"?Math.max(0,x.value):0));
  const add=(tag,attrs,txt)=>{
   const el=document.createElementNS("http://www.w3.org/2000/svg",tag);
   for(const [k,v] of Object.entries(attrs))el.setAttribute(k,String(v));
   if(txt!==undefined)el.textContent=String(txt);
   svg.append(el);return el;
  };
  values.forEach((d,j)=>{
   const y=25+j*79,width=typeof d.value==="number"?Math.max(0,d.value)/max*350:0;
   add("text",{x:5,y:y+24,"font-size":16,fill:"#222"},d.label.substring(0,12));
   add("rect",{x:132,y:y,width:350,height:34,fill:"#eee"});
   add("rect",{x:132,y:y,width,height:34,fill:"#222","data-chart-row":j+2});
   add("text",{x:Math.min(500,142+width),y:y+23,"font-size":16,fill:"#222"},typeof d.value==="number"?d.value:"—");
  });
  chartHost.append(title,svg);
 }
 check.onclick=()=>{
  if(editor){const value=editor.value;detachEditor();commit(value)}
  const faults=[];
  for(const [ref,target] of Object.entries(item.targets)){
   const input=String(cells[ref]||"").trim(),v=evaluate(cells,ref);
   if(!input){faults.push(ref+": falta completar");continue}
   if(target.formula){
    const canonical=x=>String(x).toUpperCase().replace(/\s+/g,"").replace(/^=SUM\(/,"=SUMA(");
    if(canonical(input)!==canonical(target.formula)){faults.push(ref+": revisa la fórmula ("+target.formula+")");continue}
   }
   const ok=typeof target.result==="number"?typeof v==="number"&&Math.abs(v-target.result)<1e-9:
    typeof target.value==="number"?typeof v==="number"&&Math.abs(v-target.value)<1e-9:
    String(v).trim().toLocaleUpperCase("es-CO")===String(target.value).trim().toLocaleUpperCase("es-CO");
   if(!ok)faults.push(ref+": el resultado no coincide");
  }
  if(faults.length){
   feedback.className="live-feedback live-feedback-error";
   feedback.textContent="Revisa: "+faults.join(" · ")+". "+item.hint;
   return;
  }
  progress[i]=true;cache[i]={...cells};save();sync();
  feedback.className="live-feedback live-feedback-success";
  feedback.textContent="✓ Ejercicio registrado y aprobado. "+(i+1<count?"Ya puedes pasar al siguiente concepto.":"Has completado el módulo.");
 };
 reset.onclick=()=>{
  if(editor)detachEditor();
  barDirty=false;
  for(const k of Object.keys(cells))delete cells[k];
  Object.assign(cells,item.seed);selected=Object.keys(item.targets)[0];
  for(let j=i;j<count;j++)progress[j]=false;
  cache[i]={...cells};save();sync();visual();
  feedback.className="live-feedback";feedback.textContent="Hoja reiniciada. Comprueba otra vez para continuar.";
 };
 shell.append(head,fx,scroller,result,chartHost,actions,feedback);
 visual();
 return shell;
}
function render(){
 $("lockedModule").hidden=true;$("moduleContent").hidden=false;
 $("moduleTitle").textContent=config.title;
 $("moduleIntro").textContent=config.intro;
 if(predecessorPending){const note=node("p","module-description","Puedes comenzar este módulo directamente. Si necesitas repasar, consulta el módulo anterior; no es obligatorio terminarlo.");const link=node("a",""," Repasar módulo "+(moduleNo-1)+" →");link.href="../unidad-0"+(moduleNo-1)+"-excel/";note.append(link);$("moduleIntro").after(note)}
 const nav=$("moduleNav"),container=$("moduleLessons");
 nav.replaceChildren();container.replaceChildren();
 config.items.forEach((item,i)=>{
  const a=node("a","journey-nav-item");
  a.dataset.moduleLink=String(i+1);
  a.append(node("span","journey-num",String(i+1).padStart(2,"0")),node("span","journey-nav-text",item.title),node("span","journey-status module-state","🔒"));
  nav.append(a);
  const lesson=node("article","study-lesson module-lesson");lesson.id="module-step-"+(i+1);
  const head=node("header","study-lesson-head");
  head.append(node("span","study-index","MÓDULO "+String(moduleNo).padStart(2,"0")+" · CONCEPTO "+String(i+1).padStart(2,"0")+" / "+String(count).padStart(2,"0")),node("h2","",item.title),node("p","",item.concept));
  lesson.append(head);
  const concepts=node("section","module-concepts ped-card");
  const glossary=node("dl","ped-glossary");
  item.glossary.forEach(([term,desc])=>{const d=node("div","ped-term");d.append(node("dt","",term),node("dd","",desc));glossary.append(d)});
  concepts.append(node("h3","ped-h3","Conceptos esenciales"),glossary);
  lesson.append(concepts);
  const videoPanel=node("section","study-video");
  const video=document.createElement("video");
  video.controls=true;video.muted=true;video.defaultMuted=true;video.playsInline=true;video.loop=true;video.preload="metadata";
  video.src="../assets/videos/"+item.video+".mp4";
  video.setAttribute("aria-label","Video Full HD de "+item.title);
  videoPanel.append(node("h3","","Observa la demostración · video opcional"));
  if(window.TI8ExerciseFigure)videoPanel.append(window.TI8ExerciseFigure(item));
  videoPanel.append(video);
  lesson.append(videoPanel);
  const worked=node("section","ped-card module-worked");
  worked.append(node("p","ped-kicker","EJEMPLO CONTEXTUALIZADO"),node("h3","ped-h3","Situación cotidiana"),node("p","ped-copy",item.scenario));
  const steps=node("ol","ped-list");item.steps.forEach(v=>steps.append(node("li","",v)));
  worked.append(node("h4","ped-h4","Procedimiento paso a paso"),steps);
  lesson.append(worked);
  const practice=node("section","study-activity");
  practice.append(node("p","study-activity-head","APRENDE HACIENDO · HOJA EDITABLE"),node("h3","","Resuelve en Excel"),node("p","",item.task),sheet(item,i));
  lesson.append(practice);
  if(i<count-1){
   const row=node("div","study-continue"),next=node("a","study-next-link module-next","Siguiente: "+config.items[i+1].title+" →");
   next.href="#module-step-"+(i+2);next.hidden=true;row.append(next);lesson.append(row);
  }
  container.append(lesson);
 });
 $("moduleNo").textContent="THEORY "+String(moduleNo).padStart(2,"0")+" · EXCEL LEARNING PATH";
 $("moduleIndexTitle").textContent="Conceptos del módulo "+moduleNo;
 $("finishModule").href=moduleNo===4?"../":"../unidad-0"+(moduleNo+1)+"-excel/";
 $("finishModule").textContent=moduleNo===4?"✓ Módulo 04 completado · Volver al Learning Hub":"Continuar al módulo "+(moduleNo+1)+" →";
 sync();
}
render();
})();