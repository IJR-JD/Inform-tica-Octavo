/* IJR Informática 8 · QA revision: learn by doing, no artificial video gates.
 * Seven readable explanations, seven real editable mini-spreadsheets,
 * non-blocking Full HD videos, single-check validation, optional final lab.
 * Does not modify the final lab's validation engine or any MP4 assets.
 */
(()=>{
"use strict";
const NAMES=[
 "Celdas y referencias","Tipos de datos","Suma con referencias",
 "Resta e inventarios","Multiplicación","División","Función SUMA"
];
const MEDIA=[
 "topic-01","u01-data","u01-addition","u01-subtraction",
 "u01-multiplication","u01-division","u01-sum"
];
const KEY="ijr-ti8-excel-practice-v3";
const ANSWERS_KEY="ijr-ti8-excel-answers-v1";
const $=id=>document.getElementById(id);
const host=$("journeyStage"),nav=$("journeyNav"),theory=$("theoryPhase"),lab=$("practicePhase");
if(!host||!nav||!window.IJRPedagogy||!Array.isArray(EX)||EX.length!==7)return;
const make=(tag,cls,text)=>{
 const node=document.createElement(tag);if(cls)node.className=cls;
 if(text!==undefined)node.textContent=text;
 return node;
};
let progress=Array(7).fill(false);
try{
 const parsed=JSON.parse(localStorage.getItem(KEY)||"null");
 if(Array.isArray(parsed)&&parsed.length===7)progress=parsed.map(v=>v===true);
}catch{}
// Each independently verified exercise is retained.
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}}
function getSavedAnswers(index){
 try{const all=JSON.parse(localStorage.getItem(ANSWERS_KEY)||"{}");
  return all&&typeof all==="object"&&all[index]&&typeof all[index]==="object"?all[index]:null
 }catch{return null}
}
function saveAnswers(index,cells){
 try{const all=JSON.parse(localStorage.getItem(ANSWERS_KEY)||"{}");
  all[index]={...cells};localStorage.setItem(ANSWERS_KEY,JSON.stringify(all))
 }catch{}
}
function recheckAfterEdit(index){
 if(progress[index]){progress[index]=false;save();showProgress()}
}
function showProgress(){
 const n=progress.filter(Boolean).length;
 $("percent").textContent=Math.round(100*n/7)+"%";
 $("progressLabel").textContent=n+" de 7 ejercicios registrados y aprobados";
 $("progressFill").style.width=(100*n/7)+"%";
 const summary=$("journeySummary");
 if(summary)summary.textContent=n===7?"✓ Todos los ejercicios fueron aprobados.":"Todos los conceptos están disponibles. Elige cualquier ejercicio y comprueba tu respuesta para registrar el avance.";
 nav.querySelectorAll("a[data-lesson]").forEach((a,i)=>{
  a.classList.toggle("is-done",progress[i]);a.classList.remove("is-locked");a.setAttribute("aria-disabled","false");a.tabIndex=0;a.href="#lesson-"+(i+1);a.title="Abrir concepto "+(i+1);
  const state=a.querySelector(".journey-status");if(state)state.textContent=progress[i]?"✓":"↗";
 });
 for(let i=0;i<7;i++){const section=$("lesson-"+(i+1));if(!section)continue;section.hidden=false;const next=section.querySelector(".study-next-link");if(next){next.hidden=false;next.setAttribute("aria-disabled","false");next.tabIndex=0}}
 const button=$("openPractice");if(button){button.hidden=false;button.disabled=false}
}
function cellValue(cells,k){const r=TI8Excel.evaluate(cells,k,{cols:5,rows:6});return typeof r.value==="boolean"?(r.value?"VERDADERO":"FALSO"):r.value}
function spreadsheet(ex,index){
 const shell=make("section","live-sheet");
 const head=make("div","live-sheet-head");
 head.append(make("strong","","HOJA DE EXCEL · TODAS LAS CELDAS SON EDITABLES"));
 head.append(make("small","","Las celdas con borde son las que se evaluarán · Enter confirma"));
 const bar=make("div","live-formula-bar");
 const address=make("output","live-cell-address",ex.editable[0]);
 address.setAttribute("aria-label","Dirección de la celda seleccionada");
 const fx=make("span","live-fx","ƒx");
 const formula=make("input","live-formula");
 formula.setAttribute("aria-label","Barra de fórmulas del ejercicio "+(index+1));
 formula.placeholder="Selecciona una celda para escribir";
 formula.autocomplete="off";formula.spellcheck=false;
 bar.append(address,fx,formula);
 const wrap=make("div","live-sheet-scroll");
 const table=make("table","live-spreadsheet");
 table.setAttribute("aria-label","Hoja editable del concepto "+(index+1));
 const columns=["A","B","C","D","E"];
 const thead=make("thead"),rowHead=make("tr");
 rowHead.append(make("th","",""));
 columns.forEach(col=>{const th=make("th","",col);th.scope="col";rowHead.append(th)});
 thead.append(rowHead);table.append(thead);
 const tbody=make("tbody");table.append(tbody);wrap.append(table);
 const actions=make("div","live-sheet-actions");
 const check=make("button","live-check","Comprobar mi hoja");check.type="button";
 const reset=make("button","live-reset","Reiniciar datos");reset.type="button";
 const feedback=make("div","live-feedback","Todas las celdas se pueden editar. Las celdas resaltadas son las que se comprobarán. Pulsa Enter para confirmar.");
 feedback.setAttribute("role","status");feedback.setAttribute("aria-live","polite");
 const computed=make("div","live-computed");
 computed.setAttribute("aria-live","polite");
 computed.textContent="Los resultados se calculan a partir de las referencias escritas.";
 actions.append(check,reset);
 shell.append(head,bar,wrap,computed,actions,feedback);
 // Only allow a previously saved worksheet to restore its own A1:E6 cells.
 // This avoids extraneous imported properties being interpreted as formulas.
 const restored=getSavedAnswers(index)||{};
 const cells={...ex.seed};
 for(const [ref,value] of Object.entries(restored)){
  if(/^[A-E][1-6]$/.test(ref)&&typeof value==="string"&&value.length<=500){
   cells[ref]=value;
  }
 }
 let selected=ex.editable[0],editor=null;
 const positions=new Map();
 for(let r=1;r<=6;r++){
  const tr=make("tr");
  const h=make("th","live-row-head",String(r));h.scope="row";tr.append(h);
  for(const col of columns){
   const key=col+r,editable=ex.editable.includes(key);
   const td=make("td",editable?"live-editable live-target":"live-editable");
   td.dataset.cell=key;td.tabIndex=0;td.setAttribute("role","gridcell");
   td.setAttribute("aria-label",key+(editable?", celda objetivo editable":", celda editable"));
   const view=make("span","live-cell-view");td.append(view);
   td.addEventListener("click",ev=>{if(ev.target.classList.contains("live-cell-editor"))return;select(key,true)});
   td.addEventListener("focus",()=>{if(!editor){selected=key;updateViews()}});
   td.addEventListener("keydown",ev=>{
    if(ev.target!==td)return;
    if(ev.key==="Enter"||ev.key==="F2"){ev.preventDefault();select(key,true);}
    if(ev.key.length===1&&!ev.ctrlKey&&!ev.altKey){
      ev.preventDefault();select(key,true);if(editor){editor.value=ev.key;editor.dispatchEvent(new Event("input",{bubbles:true}));}
    }
    const directions={ArrowRight:[0,1],ArrowLeft:[0,-1],ArrowDown:[1,0],ArrowUp:[-1,0]};
    if(directions[ev.key]){
     ev.preventDefault();const delta=directions[ev.key],rr=Math.min(6,Math.max(1,r+delta[0])),cc=Math.min(4,Math.max(0,columns.indexOf(col)+delta[1]));
     select(columns[cc]+rr,false);positions.get(columns[cc]+rr)?.focus();
    }
   });
   positions.set(key,td);tr.append(td);
  }
  tbody.append(tr);
 }
 function updateViews(){
  for(const [k,td] of positions){
   const view=td.querySelector(".live-cell-view");
   const val=cellValue(cells,k);
   view.textContent=val===""?"\u00a0":String(val);
   td.classList.toggle("live-selected",k===selected);
   td.classList.toggle("live-error",typeof val==="string"&&val.startsWith("#"));
  }
  formula.value=cells[selected]||"";
  address.textContent=selected;
  const v=cellValue(cells,selected);
  computed.textContent=selected+": "+(v===""?"sin dato":String(v))+
   (String(cells[selected]||"").startsWith("=")?" · Fórmula: "+cells[selected]:"");
 }
 function closeEditor(){
  if(!editor)return;
  // Clear ownership BEFORE detaching the focused input. Its blur handler
  // must not re-enter removal while the original editor is being detached.
  const input=editor;
  editor=null;
  if(input.isConnected)input.remove();
  updateViews();
 }
 function commit(raw){
  const previous=String(cells[selected]??"");
  cells[selected]=String(raw).trim();
  if(previous!==cells[selected])recheckAfterEdit(index);
  saveAnswers(index,cells);
  feedback.className="live-feedback";
  feedback.textContent="Dato registrado. Puedes corregirlo o comprobar la hoja.";
  updateViews();
 }
 function select(key,open){
  if(editor){const value=editor.value;closeEditor();commit(value);}
  selected=key;updateViews();
  if(open){
   const td=positions.get(key);
   const input=make("input","live-cell-editor");
   input.value=cells[key]||"";
   input.setAttribute("aria-label","Editar celda "+key);
   editor=input;td.append(input);
   input.addEventListener("input",()=>{formula.value=input.value;});
   input.addEventListener("keydown",ev=>{
    if(ev.key==="Enter"||ev.key==="Tab"){
     ev.preventDefault();const val=input.value;closeEditor();commit(val);
     if(ev.key==="Tab"){const next=ex.editable.indexOf(key)+1;if(ex.editable[next])select(ex.editable[next],true);}
     else td.focus();
    }else if(ev.key==="Escape"){ev.preventDefault();closeEditor();}
   });
   input.addEventListener("blur",()=>{if(editor===input){const val=input.value;closeEditor();commit(val);}});
   input.focus();input.select();
  }
 }
 formula.addEventListener("input",()=>{if(editor)editor.value=formula.value;});
 // Only save when the user actually edits the formula bar. A blur after merely
 // inspecting a cell must never invalidate an approved exercise.
 let formulaDirty=false,formulaReference=selected;
 formula.addEventListener("focus",()=>{
  formulaReference=selected;
  formulaDirty=false;
 });
 formula.addEventListener("input",()=>{
  formulaDirty=true;
  if(editor)editor.value=formula.value;
 });
 function formulaCommit(){
  if(!formulaDirty)return;
  const value=formula.value,target=formulaReference;
  formulaDirty=false;
  if(editor)closeEditor();
  selected=target;
  commit(value);
 }
 formula.addEventListener("keydown",ev=>{
  if(ev.key==="Enter"){
   ev.preventDefault();formulaCommit();
   positions.get(selected)?.focus();
  }else if(ev.key==="Escape"){
   ev.preventDefault();formulaDirty=false;updateViews();
   positions.get(selected)?.focus();
  }
 });
 formula.addEventListener("blur",()=>{if(formulaDirty)formulaCommit()});
 function verify(){
  if(editor){const val=editor.value;closeEditor();commit(val);}
  const missing=[];
  for(const [key,expected] of Object.entries(ex.check)){
   const raw=String(cells[key]||"").trim();
   const actual=cellValue(cells,key);
   if(!raw){missing.push("Completa "+key);continue;}
   if(ex.mustFormula?.includes(key)){
    if(!raw.startsWith("=")){missing.push(key+": debes escribir una fórmula que comience por =");continue;}
    const canonical=raw.replace(/\s+/g,"").toUpperCase().replace(/^=SUM\(/,"=SUMA(");
    const required=String(ex.formula||"").replace(/\s+/g,"").toUpperCase();
    if(canonical!==required){missing.push(key+": usa las referencias y el operador solicitados ("+ex.formula+")");continue;}
   }
   const target=typeof expected==="number"&&ex.mustFormula?.includes(key)&&ex.formula?
    cellValue({...cells,[key]:ex.formula},key):expected;
   const correct=typeof target==="number"?
    typeof actual==="number"&&Math.abs(actual-target)<1e-9:
    String(actual).trim().toLocaleUpperCase("es")===String(expected).trim().toLocaleUpperCase("es");
   if(!correct)missing.push(key+": revisa el valor o la fórmula");
  }
  if(missing.length){
   feedback.className="live-feedback live-feedback-error";
   feedback.textContent="Revisa tu respuesta: "+missing.join(" · ")+". "+ex.hint;
   return;
  }
  progress[index]=true;save();saveAnswers(index,cells);showProgress();
  feedback.className="live-feedback live-feedback-success";
  feedback.textContent="✓ Ejercicio registrado y aprobado. "+ex.worked+(progress.every(Boolean)?" ¡Completaste los siete conceptos!":" Puedes practicar cualquier concepto.");
  const next=document.getElementById("lesson-"+(index+2));
  if(next)next.querySelector(".live-sheet")?.classList.add("live-next-available");
 }
 check.onclick=verify;
 reset.onclick=()=>{
  if(editor)closeEditor();
  formulaDirty=false;
  Object.keys(cells).forEach(key=>delete cells[key]);
  Object.assign(cells,ex.seed);
  selected=ex.editable[0];updateViews();
  progress[index]=false;
  save();saveAnswers(index,cells);showProgress();
  feedback.className="live-feedback";feedback.textContent="Hoja reiniciada. Intenta de nuevo.";
 };
 updateViews();
 return shell;
}
function buildNav(){
 nav.replaceChildren();
 NAMES.forEach((name,i)=>{
  const a=make("a","journey-nav-item");
  a.dataset.lesson=String(i+1);
  a.append(make("span","journey-num",String(i+1).padStart(2,"0")));
  a.append(make("span","journey-nav-text",name));
  a.append(make("span","journey-status",progress[i]?"✓":"↗"));
  nav.append(a);
 });
}
function assembleLesson(i){
 const ex=EX[i];
 const sections=make("div");
 window.IJRPedagogy.renderUnit1(i,sections);
 const parts=[...sections.children];
 const article=make("article","study-lesson");
 article.id="lesson-"+(i+1);
 const header=make("header","study-lesson-head");
 header.append(make("span","study-index","CONCEPTO "+String(i+1).padStart(2,"0")+" / 07"));
 header.append(make("h2","",NAMES[i]));
 header.append(make("p","",ex.summary));
 article.append(header);
 const foundation=make("div","study-foundation");
 if(parts[0])foundation.append(parts[0]);
 if(parts[1])foundation.append(parts[1]);
 article.append(foundation);
 const videoPanel=make("section","study-video");
 const videoHeader=make("div","study-video-header");
 videoHeader.append(make("h3","","Observa cómo se hace"),make("span","","VIDEO FULL HD · OPCIONAL"));
 const video=document.createElement("video");
 video.controls=true;video.muted=true;video.defaultMuted=true;video.playsInline=true;video.loop=true;video.preload="metadata";
 
 video.src="../assets/videos/"+MEDIA[i]+".mp4";
 video.setAttribute("aria-label","Video de "+NAMES[i]);
 const videoNote=make("p","study-video-note","Puedes reproducir, pausar o ampliar desde los controles del video. No es obligatorio verlo completo para practicar.");
 const type=["cell","data","addition","subtraction","multiplication","division","sum"][i];
 const figure=make("details","studio-vector-detail");const summary=make("summary","","Explorar figura vectorial · paso a paso");const vector=make("div","studio-vector-host");figure.append(summary,vector);
 figure.addEventListener("toggle",()=>{if(figure.open&&!vector.dataset.ready&&window.AnimatedExcelFigures){window.AnimatedExcelFigures.render(type,vector);vector.dataset.ready="true"}});
 videoPanel.append(videoHeader,figure,video,videoNote);
 article.append(videoPanel);
 if(parts[2])article.append(parts[2]);
 if(parts[3]){
  const guide=make("details","study-steps");guide.open=true;
  const summary=make("summary","","Ver instrucciones del ejemplo paso a paso");
  guide.append(summary,parts[3]);
  article.append(guide);
 }
 const exercise=make("section","study-activity");
 exercise.append(make("div","study-activity-head","APRENDE HACIENDO · EDITA LAS CELDAS"));
 exercise.append(make("h3","","Ahora inténtalo en Excel"));
 exercise.append(make("p","",ex.task));
 exercise.append(spreadsheet(ex,i));
 article.append(exercise);
 if(parts[4]){
  const deep=make("details","study-review");
  deep.append(make("summary","","Preguntas de repaso y reto adicional"),parts[4]);
  article.append(deep);
 }
 if(i<6){
  const continueRow=make("div","study-continue");
  const a=make("a","study-next-link","Siguiente: "+NAMES[i+1]+" →");
  a.href="#lesson-"+(i+2);a.hidden=true;

  continueRow.append(a);article.append(continueRow);
 }
 return article;
}
try{
 if(!window.TI8Excel)throw Error("Motor de cálculo no disponible");
 const lessons=document.createDocumentFragment();for(let i=0;i<7;i++)lessons.append(assembleLesson(i));
 buildNav();host.replaceChildren(lessons);showProgress();$("unit1Fallback").hidden=true;document.documentElement.dataset.learningReady="true";
}catch(error){console.error("TI8 interactive unit 1:",error);host.replaceChildren();nav.replaceChildren();$("unit1Fallback").hidden=false;return;}
$("openPractice").hidden=false;
$("openPractice").textContent="Abrir laboratorio final de 7 retos →";
$("openPractice").onclick=()=>{

 lab.hidden=false;
 if(typeof window.startPractice==="function")window.startPractice();
 lab.scrollIntoView({behavior:"smooth",block:"start"});
};
$("restartTheory").onclick=()=>{
 lab.hidden=true;
 theory.scrollIntoView({behavior:"smooth",block:"start"});
};
})();