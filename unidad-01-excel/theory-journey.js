/* IJR Informática 8 · Secuencia didáctica por descubrimiento.
   La teoría se completa antes de habilitar los ejercicios prácticos.
   Videos Full HD originales, sin reprocesamiento. */
(()=>{
"use strict";
const LESSONS=[
 {name:"La hoja de cálculo y sus celdas",video:"topic-01",question:"¿Qué representa la referencia B2?",answers:["Columna B, fila 2","Fila B, columna 2","Dos hojas de cálculo"],correct:0,why:"Una referencia combina primero la letra de columna y después el número de fila."},
 {name:"Texto, números y formatos",video:"u01-data",question:"¿Qué valor puede utilizarse directamente en una operación?",answers:["La etiqueta «Cuaderno»","La cantidad 4","El encabezado «Producto»"],correct:1,why:"Los números participan en cálculos; el texto describe los productos."},
 {name:"Sumar usando referencias",video:"u01-addition",question:"Si B2 vale 8 y B3 vale 5, ¿qué fórmula devuelve 13?",answers:["=B2+B3","=B2-B3","B2+B3"],correct:0,why:"El signo = inicia la fórmula y + suma los valores de ambas celdas."},
 {name:"Resta e inventarios",video:"u01-subtraction",question:"Con 20 unidades iniciales y 7 vendidas, ¿qué fórmula calcula 13 disponibles?",answers:["=B3-B2","=B2-B3","=B2+B3"],correct:1,why:"Restamos las unidades vendidas del inventario inicial, en ese orden."},
 {name:"Multiplicación y subtotales",video:"u01-multiplication",question:"Para multiplicar cantidad B2 por precio C2, escribe:",answers:["=B2xC2","=B2+C2","=B2*C2"],correct:2,why:"Excel utiliza el asterisco (*) como operador de multiplicación."},
 {name:"División y costos unitarios",video:"u01-division",question:"¿Qué fórmula obtiene el costo por unidad si B2 es el costo total y C2 la cantidad?",answers:["=B2/C2","=C2/B2","=B2*C2"],correct:0,why:"Costo unitario = costo total dividido entre número de unidades."},
 {name:"Función SUMA y rangos",video:"u01-sum",question:"¿Qué fórmula agrega los valores de B2, B3 y B4?",answers:["=SUMA(B2:B4)","=SUMA(B2;B4)","=SUMA(B2-B4)"],correct:0,why:"El rango B2:B4 incluye todas las celdas entre ambos extremos."}
];
const KEY="ijr-ti8-excel-theory-v2";
const storageRead=()=>{try{return Math.max(0,Math.min(LESSONS.length,parseInt(localStorage.getItem(KEY)||"0",10)||0))}catch{return 0}};
const storageWrite=v=>{try{localStorage.setItem(KEY,String(v))}catch{}};
const $=id=>document.getElementById(id);
const e=(tag,cls,content)=>{const element=document.createElement(tag);if(cls)element.className=cls;if(content!==undefined)element.textContent=content;return element};
let unlocked=storageRead(),active=Math.min(unlocked,LESSONS.length-1),stage=0,watched=false,stepIndex=0,lessonSections=[],video=null,videoTimeHandler=null,dialogHandler=null;
const theory=$("theoryPhase"),practice=$("practicePhase"),nav=$("journeyNav"),stageRoot=$("journeyStage");
if(!theory||!practice||!nav||!stageRoot||!window.IJRPedagogy)return;
const total=LESSONS.length;
const stages=["Comprende","Observa el video","Resuelve el ejemplo","Comprueba"];
const summary=$("journeySummary"),percent=$("percent"),progressLabel=$("progressLabel"),progressFill=$("progressFill");
function renderProgress(){
 const n=unlocked;
 summary.textContent=n===total?"Teoría completada. Continúa con el laboratorio.":"Etapa "+(Math.min(active+1,total))+" de "+total+" · "+stages[stage];
 percent.textContent=Math.round(100*n/total)+"%";
 progressLabel.textContent=n+" de "+total+" conceptos estudiados";
 progressFill.style.width=(100*n/total)+"%";
}
function progressButtons(){
 nav.replaceChildren();
 LESSONS.forEach((item,i)=>{
  const b=e("button","journey-nav-item",""),done=i<unlocked;
  b.type="button";b.disabled=i>unlocked;b.classList.toggle("is-current",i===active);b.classList.toggle("is-done",done);
  b.innerHTML='<span class="journey-num">'+String(i+1).padStart(2,"0")+'</span><span class="journey-nav-text"></span><span class="journey-status"></span>';
  b.querySelector(".journey-nav-text").textContent=item.name;
  b.querySelector(".journey-status").textContent=done?"✓":i===active?"Ahora":"·";
  b.onclick=()=>showLesson(i);
  nav.append(b);
 });
}
function cleanup(){
 if(video){
  video.pause();
  video.removeAttribute("src");
  video.load();
  video=null;
 }
 if(dialogHandler){
  const dialog=$("figureDialog");dialog.removeEventListener("close",dialogHandler);
  dialogHandler=null;
 }
}
function renderHeader(){
 const h=e("div","journey-heading");
 h.append(e("p","journey-overline","TEORÍA GUIADA · CONCEPTO "+String(active+1).padStart(2,"0")+" / "+total),e("h2","",LESSONS[active].name));
 h.append(e("p","journey-lead","Primero comprende, observa y resuelve cada ejemplo. La hoja de práctica se habilita después de completar las siete explicaciones."));
 stageRoot.append(h);
 const bar=e("div","journey-stage-bar");
 stages.forEach((title,i)=>{
  const pill=e("span","journey-stage-pill",String(i+1).padStart(2,"0")+" · "+title);
  pill.classList.toggle("is-current",stage===i);
  pill.classList.toggle("is-past",stage>i);
  bar.append(pill);
 });
 stageRoot.append(bar);
}
function navFooter(label,cb,disabled=false){
 const box=e("div","journey-action-row");
 const aside=e("small","journey-action-hint",stage===1?"La reproducción se registra al alcanzar al menos el 85 % del video.":"Lee y completa cada parte en el orden propuesto.");
 const button=e("button","journey-next",label);
 button.type="button";button.disabled=disabled;button.onclick=cb;
 box.append(aside,button);stageRoot.append(box);
 return {button,aside};
}
function extractLesson(){
 const temporary=e("div");
 window.IJRPedagogy.renderUnit1(active,temporary);
 return [...temporary.children];
}
function showLesson(i){
 if(i>unlocked)return;
 cleanup();active=i;stage=0;watched=false;stepIndex=0;
 render();
}
function nextStage(){stage=Math.min(3,stage+1);render()}
function renderIntro(){
 const container=e("div","journey-intro-grid");
 const intro=e("div","journey-extract");
 intro.append(lessonSections[0],lessonSections[1]);
 container.append(intro);
 const note=e("aside","journey-context");
 note.append(e("p","journey-overline","ANTES DEL VIDEO"),e("h3","","Objetivo de aprendizaje"),e("p","","Identifica los conceptos principales de esta etapa. En el siguiente paso observarás cómo se aplican en una situación cotidiana."));
 const btn=e("button","journey-text-link","Releer la explicación");
 btn.type="button";btn.onclick=()=>intro.scrollIntoView({block:"start",behavior:"smooth"});
 note.append(btn);container.append(note);
 stageRoot.append(container);
 navFooter("He comprendido · Ver demostración →",nextStage);
}
function watchVideo(){
 const panel=e("section","journey-video-panel");
 const videoBlock=e("div","journey-video-block");
 const v=document.createElement("video");
 video=v;v.controls=true;v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.preload="metadata";
 v.src="../assets/videos/"+LESSONS[active].video+".mp4";
 v.setAttribute("aria-label","Demostración Full HD de "+LESSONS[active].name);
 videoBlock.append(v);
 const tools=e("div","journey-video-tools");
 const status=e("span","journey-watch-status","● Video pendiente de observación");
 const expand=e("button","journey-expand","⛶ Ver video ampliado");expand.type="button";
 tools.append(status,expand);videoBlock.append(tools);
 const context=e("div","journey-example");context.append(lessonSections[2]);
 panel.append(videoBlock,context);
 stageRoot.append(panel);
 const foot=navFooter("Video observado · Resolver ejemplo →",nextStage,true);
 function watchedEnough(){
   if(!v.duration||!Number.isFinite(v.duration))return;
   if(v.currentTime/v.duration>=.85 && !watched){
      watched=true;status.textContent="✓ Demostración observada";foot.button.disabled=false;
   }
 }
 videoTimeHandler=watchedEnough;
 v.addEventListener("timeupdate",videoTimeHandler);
 v.addEventListener("ended",()=>{watched=true;status.textContent="✓ Demostración observada";foot.button.disabled=false},{once:true});
 const dlg=$("figureDialog");
 const openBig=()=>{
   if(dlg.open)return;
   const body=$("figureDialogBody");body.replaceChildren();
   const big=document.createElement("video");big.className="excel-fullhd-video excel-fullhd-large";
   big.controls=true;big.muted=true;big.loop=true;big.playsInline=true;big.autoplay=true;
   big.src=v.src;big.currentTime=v.currentTime;
   big.addEventListener("timeupdate",()=>{if(big.duration&&big.currentTime/big.duration>=.85){watched=true;status.textContent="✓ Demostración observada";foot.button.disabled=false}});
   body.append(big);
   $("figureDialogTitle").textContent=LESSONS[active].name+" · Full HD";
   v.pause();dlg.showModal();big.play().catch(()=>{});
   dialogHandler=()=>{big.pause();v.currentTime=big.currentTime;body.replaceChildren();dialogHandler=null;v.play().catch(()=>{})};
   dlg.addEventListener("close",dialogHandler,{once:true});
 };
 expand.onclick=openBig;
 v.play().catch(()=>{});
}
function guidedSteps(){
 const p=lessonSections[3];const list=p.querySelector("ol");
 stageRoot.append(p);
 const steps=list?[...list.children]:[];
 steps.forEach((li,i)=>{li.hidden=i>stepIndex;li.classList.toggle("is-guided-active",i===stepIndex)});
 const answer=e("div","journey-step-feedback");
 const paragraph=e("p","",stepIndex<steps.length-1?"Realiza o interpreta esta instrucción antes de revelar la siguiente.":"Has llegado al último paso. Comprueba que puedes explicar el resultado.");
 answer.append(paragraph);
 stageRoot.append(answer);
 navFooter(stepIndex<steps.length-1?"Entendido · Siguiente paso →":"Pasos revisados · Comprobar →",()=>{
   if(stepIndex<steps.length-1){stepIndex++;render()}
   else nextStage();
 });
}
function knowledgeCheck(){
 stageRoot.append(lessonSections[4]);
 const item=LESSONS[active];
 const section=e("section","journey-check");
 section.append(e("p","journey-overline","PREGUNTA DE COMPRENSIÓN"),e("h3","",item.question));
 const form=e("form","journey-choices");
 const result=e("p","journey-result","Selecciona una respuesta para continuar.");result.setAttribute("role","status");result.setAttribute("aria-live","polite");
 const next=e("button","journey-next",active===total-1?"Terminar teoría · Abrir laboratorio →":"Continuar al siguiente concepto →");next.type="button";next.disabled=true;
 item.answers.forEach((answer,i)=>{
  const label=e("label","journey-answer");
  const input=e("input");input.type="radio";input.name="knowledge";input.value=String(i);
  label.append(input,e("span","",answer));form.append(label);
 });
 const check=e("button","journey-check-button","Comprobar respuesta");check.type="submit";
 form.append(check);
 form.onsubmit=ev=>{
  ev.preventDefault();
  const selected=form.querySelector('input[name="knowledge"]:checked');
  if(!selected){result.textContent="Elige una de las opciones antes de comprobar.";return}
  const correct=Number(selected.value)===item.correct;
  result.className="journey-result "+(correct?"is-ok":"is-error");
  result.textContent=correct?"✓ Correcto. "+item.why:"Revisa la explicación y prueba nuevamente.";
  next.disabled=!correct;
 };
 next.onclick=()=>{
  unlocked=Math.max(unlocked,active+1);storageWrite(unlocked);
  if(unlocked>=total){completeTheory();}
  else{active=active+1;stage=0;stepIndex=0;watched=false;render();}
 };
 section.append(form,result,next);
 stageRoot.append(section);
}
function render(){
 cleanup();
 stageRoot.replaceChildren();
 lessonSections=extractLesson();renderHeader();
 if(stage===0)renderIntro();
 else if(stage===1)watchVideo();
 else if(stage===2)guidedSteps();
 else knowledgeCheck();
 progressButtons();renderProgress();
}
function completeTheory(){
 cleanup();
 unlocked=total;storageWrite(unlocked);
 theory.hidden=true;practice.hidden=false;
 $("practiceIntro").textContent="Teoría completada. Ahora resuelve los siete retos prácticos utilizando referencias y fórmulas reales.";
 $("openPractice").hidden=true;
 $("percent").textContent="100%";
 $("progressLabel").textContent="Teoría completada · 7 de 7";
 $("progressFill").style.width="100%";
 if(typeof window.startPractice==='function')window.startPractice();
 practice.scrollIntoView({block:"start",behavior:"smooth"});
}
$("openPractice").onclick=()=>completeTheory();
$("restartTheory").onclick=()=>{
 practice.hidden=true;theory.hidden=false;
 active=0;stage=0;stepIndex=0;watched=false;
 render();
 theory.scrollIntoView({block:"start",behavior:"smooth"});
};
if(unlocked>=total)completeTheory();else render();
})();