/* IJR Informatica 8 · Exam-first diagnostic, v2
 * One question per view; 30 minute uninterrupted wall-clock countdown.
 * Answers persist on-device; informative, not institutional examination.
 * No answer key or feedback is presented until submission/timeout.
 */
(()=>{
"use strict";
const bank=window.IJRDiagnosticBank;
if(!bank||!Array.isArray(bank.questions)||bank.questions.length!==24)return;
const KEY="ijr-ti8-diagnostic-exam-v2",DURATION=30*60*1000;
const $=id=>document.getElementById(id);
const make=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
const validAnswers=Object.fromEntries(bank.questions.map(q=>[q.id,q]));
const now=()=>Date.now();
const blank=()=>({v:"exam-2026-11-19-v2",started:null,deadline:null,position:0,answers:{},code:"",status:"ready",submittedAt:null});
let state=blank();
try{
 const raw=JSON.parse(localStorage.getItem(KEY)||"null");
 if(raw&&raw.v===state.v&&["ready","active","submitted","expired"].includes(raw.status)){
  state={...blank(),...raw};
  state.answers={};
  for(const [id,val] of Object.entries(raw.answers||{})){
   if(Object.hasOwn(validAnswers,id)&&typeof val==="string"&&val.length<=100)state.answers[id]=val;
  }
  state.position=Number.isSafeInteger(raw.position)?Math.max(0,Math.min(23,raw.position)):0;
  state.code=typeof raw.code==="string"?raw.code.replace(/[^A-Za-z0-9_-]/g,"").slice(0,24):"";
  if(state.status!=="ready"&&(!Number.isFinite(state.deadline)||!Number.isFinite(state.started)))state=blank();
 }
}catch{}
let timerId=null,lastMinute=null;
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}
function normalized(v){return String(v).trim().toUpperCase().replace(/\s+/g,"")}
function correct(q,a){
 if(a===undefined||String(a).trim()==="")return false;
 if(q.kind==="choice")return a===String(q.correct);
 if(q.kind==="cell")return normalized(a)===normalized(q.correct);
 if(q.kind==="formula"){const v=normalized(a);return v===normalized(q.correct)||(q.id==="e3"&&v==="=C2*B2")}
 if(q.kind==="number"){
  const str=String(a).trim().replace(",",".");
  return /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(str)&&Math.abs(Number(str)-q.correct)<1e-8;
 }
 return false;
}
const answered=()=>bank.questions.filter(q=>String(state.answers[q.id]||"").trim()!=="").length;
const percent=()=>Math.round(answered()/24*100);
function timeString(ms){const t=Math.max(0,Math.ceil(ms/1000));return String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0")}
function updateTimer(){
 if(state.status!=="active"){if(timerId!==null){clearInterval(timerId);timerId=null}return}
 const remaining=state.deadline-now();
 if(remaining<=0){finish("expired");return}
 $("examClock").textContent=timeString(remaining);
 const urgent=remaining<=120000;
 $("examClock").classList.toggle("exam-urgent",urgent);
 $("examClock").setAttribute("aria-label","Tiempo restante: "+Math.ceil(remaining/60000)+" minutos");
 const minute=Math.ceil(remaining/60000);
 if(urgent&&minute!==lastMinute){lastMinute=minute;$("examLive").textContent=minute+" minutos o menos para finalizar el examen."}
}
function setProgress(){
 $("examAnswered").textContent=answered()+" de 24 respondidas";
 $("examProgressBar").style.width=percent()+"%";
 const nowQuestion=$("examQuestionCounter");if(nowQuestion)nowQuestion.textContent="PREGUNTA "+String(state.position+1).padStart(2,"0")+" / 24";
}
function start(){
 if(state.status!=="ready")return;
 state.started=now();state.deadline=state.started+DURATION;state.status="active";state.submittedAt=null;
 state.position=0;state.answers={};save();render();
}
function svgEl(tag,attrs,text){const n=document.createElementNS("http://www.w3.org/2000/svg",tag);for(const [k,v] of Object.entries(attrs||{}))n.setAttribute(k,String(v));if(text!==undefined)n.textContent=text;return n}
function illustrate(q){
 const fig=make("figure","exam-figure");
 const title=make("figcaption","exam-figure-title","");
 const body=make("div","exam-figure-body");
 const hint=make("p","exam-figure-note","");
 const id=q.id;
 if(id.startsWith("e")){
  title.textContent="HOJA DE CÁLCULO · EJEMPLO DE CUADRÍCULA";
  const grid=make("table","exam-mini-sheet"),head=make("thead"),r=make("tr");
  ["","A","B","C","D"].forEach(x=>r.append(make("th","",x)));head.append(r);grid.append(head);
  const tbody=make("tbody");
  const rows=id==="e3"||id==="e4"?[["1","Producto","Cantidad","Precio","Subtotal"],["2","Lápiz","6","2500","?"],["3","","","",""]]:[["1","Producto","Cantidad","Precio",""],["2","Cuaderno","4","3500",""],["3","Lápiz","8","1200",""],["4","","","",""]];
  for(const row of rows){const tr=make("tr");row.forEach((v,i)=>tr.append(make(i===0?"th":"td","",v)));tbody.append(tr)}grid.append(tbody);body.append(grid);
  hint.textContent="La fila se identifica con números y la columna con letras. Observa los encabezados antes de responder.";
 }else if(id.startsWith("d")){
  title.textContent="ANÁLISIS DE DATOS · REPRESENTACIÓN VISUAL";
  let data=id==="d2"?[["Lunes",12],["Martes",18],["Miércoles",10]]:id==="d4"?[["Equipo A",10],["Equipo B",20],["Equipo C",30]]:[["A",20],["B",35],["C",25]];
  const svg=svgEl("svg",{viewBox:"0 0 540 200",role:"img","aria-label":"Gráfico de barras con cantidades de ejemplo"});
  const max=Math.max(...data.map(x=>x[1]));
  data.forEach(([label,value],i)=>{const y=15+i*60;svg.append(svgEl("text",{x:5,y:y+27,"font-size":18,fill:"#222"},label),svgEl("rect",{x:130,y,width:345,height:32,fill:"#e5e5e5"}),svgEl("rect",{x:130,y,width:value/max*345,height:32,fill:"#242424"}),svgEl("text",{x:490,y:y+24,"font-size":18,fill:"#222"},String(value)))});
  body.append(svg);hint.textContent="Interpreta los valores, compara las barras y verifica las unidades. No basta con observar la longitud.";
 }else if(id.startsWith("a")){
  title.textContent="ORGANIZACIÓN DIGITAL · ARCHIVOS Y CARPETAS";
  const tree=make("div","exam-file-tree");
  ["📁 Actividades · 8.º","　📁 Periodo 1","　　📄 práctica_01","　　📄 práctica_02","　📁 Periodo 2","　　📄 actividad_final"].forEach(x=>tree.append(make("div","",x)));body.append(tree);
  hint.textContent="Los nombres y las carpetas permiten reconocer qué guardar, dónde encontrarlo y qué versión estás utilizando.";
 }else if(id.startsWith("o")){
  title.textContent="ENTORNO DIGITAL · SITUACIÓN COTIDIANA";
  const window=make("div","exam-browser");
  const toolbar=make("div","exam-browser-head");toolbar.append(make("span","","● ● ●"),make("span","","https://ejemplo-educativo.test"),make("span","","⋯"));window.append(toolbar);
  const screen=make("div","exam-browser-screen");screen.append(make("strong","","Proyecto escolar · Informática 8.º"),make("p","","Revisa la dirección, organiza tus pestañas y distingue las aplicaciones según su función."));window.append(screen);body.append(window);
  hint.textContent="Piensa qué herramienta y qué acción resultan adecuadas para resolver el problema planteado.";
 }else if(id.startsWith("l")){
  title.textContent="PENSAMIENTO COMPUTACIONAL · PASOS Y DECISIONES";
  const diagram=make("div","exam-flowchart");
  diagram.append(make("div","","INICIO"),make("span","","↓"),make("div","","LEER INFORMACIÓN"),make("span","","↓"),make("div","","EVALUAR Y ACTUAR"));body.append(diagram);
  hint.textContent="Una solución informática tiene pasos ordenados y puede incorporar condiciones o repeticiones.";
 }else{
  title.textContent="CIUDADANÍA DIGITAL · DECISIONES SEGURAS";
  const card=make("div","exam-safety-example");
  card.append(make("span","exam-safety-icon","✉"),make("strong","","Mensaje recibido"),make("p","","Antes de abrir enlaces o compartir información, evalúa la procedencia y las consecuencias."));body.append(card);
  hint.textContent="Reflexiona sobre privacidad, seguridad y responsabilidad en entornos digitales.";
 }
 fig.append(title,body,hint);return fig;
}
function renderQuestion(){
 const q=bank.questions[state.position],domain=bank.domains.find(d=>d.id===q.domain);
 const page=$("examQuestion");page.replaceChildren();
 const overline=make("div","exam-question-overline");
 overline.append(make("span","exam-domain-tag",domain.title),make("span","",String(state.position+1).padStart(2,"0")+" / 24"));
 page.append(overline,make("h2","exam-question-title",q.question),illustrate(q));
 const form=make("fieldset","exam-answer-box");form.append(make("legend","","TU RESPUESTA"));
 if(q.kind==="choice"){
  q.options.forEach((option,i)=>{
   const label=make("label","exam-option");
   const input=make("input");input.type="radio";input.name="exam-answer";input.value=String(i);input.checked=state.answers[q.id]===String(i);
   input.addEventListener("change",()=>{if(state.status!=="active")return;state.answers[q.id]=String(i);save();setProgress();updateQuestionNav();});
   label.append(input,make("span","",option));form.append(label);
  });
 }else{
  const input=make("input","exam-free-answer");
  input.type="text";input.inputMode=q.kind==="number"?"decimal":"text";
  input.placeholder=q.kind==="formula"?"=B2*C2":q.kind==="cell"?"Ej.: A1":"Escribe el valor numérico";
  input.autocomplete="off";input.spellcheck=false;input.value=state.answers[q.id]||"";
  input.setAttribute("aria-label","Respuesta de la pregunta "+(state.position+1));
  input.addEventListener("input",()=>{if(state.status!=="active")return;state.answers[q.id]=input.value.slice(0,100);save();setProgress();updateQuestionNav();});
  input.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();if(state.position<23)go(state.position+1)}});
  form.append(input);
 }
 page.append(form);
 $("examBack").disabled=state.position===0;
 $("examNext").textContent=state.position===23?"Revisar respuestas →":"Siguiente pregunta →";
 $("examNext").onclick=()=>state.position===23?review():go(state.position+1);
 setProgress();updateQuestionNav();
}
function updateQuestionNav(){
 const bar=$("examQuestionNav");bar.replaceChildren();
 for(let i=0;i<24;i++){
  const q=bank.questions[i],b=make("button","exam-nav-dot",String(i+1));
  b.type="button";b.classList.toggle("is-active",i===state.position);
  b.classList.toggle("is-answered",String(state.answers[q.id]||"").trim()!=="");
  b.setAttribute("aria-label","Ir a pregunta "+(i+1)+(String(state.answers[q.id]||"").trim()!==""?", respondida":", sin responder"));
  b.setAttribute("aria-current",i===state.position?"step":"false");b.onclick=()=>go(i);bar.append(b);
 }
}
function go(i){
 if(state.status!=="active")return;
 if(now()>=state.deadline){finish("expired");return}
 state.position=Math.min(23,Math.max(0,i));save();$("examReview").hidden=true;$("examQuestion").hidden=false;$("examActions").hidden=false;
 renderQuestion();$("examQuestion").scrollIntoView({block:"start"});
}
function review(){
 if(state.status!=="active")return;
 if(now()>=state.deadline){finish("expired");return}
 $("examQuestion").hidden=true;$("examReview").hidden=false;$("examActions").hidden=true;
 const review=$("examReview");review.replaceChildren();
 review.append(make("h2","","Revisa antes de entregar"));
 review.append(make("p","","Has respondido "+answered()+" de 24 preguntas. Las respuestas vacías contarán como no acertadas. El tiempo sigue corriendo hasta entregar."));
 const grid=make("div","exam-review-grid");
 bank.questions.forEach((q,i)=>{
  const b=make("button","exam-review-item",String(i+1).padStart(2,"0")+" · "+(String(state.answers[q.id]||"").trim()?"Respondida":"Sin responder"));
  b.type="button";b.onclick=()=>go(i);grid.append(b);
 });
 review.append(grid);
 const submit=make("button","exam-submit","Entregar examen y generar perfil");
 submit.type="button";submit.onclick=()=>{
  if(!window.confirm("¿Entregar el examen ahora? No podrás cambiar las respuestas después de la entrega."))return;
  finish("submitted");
 };
 review.append(submit);
 review.scrollIntoView({block:"start"});
}
function finish(status){
 if(state.status!=="active")return;
 if(status==="submitted"&&now()>=state.deadline)status="expired";
 state.status=status;state.submittedAt=now();save();render();
}
function report(){
 const root=$("examResults");root.replaceChildren();
 const n=bank.questions.reduce((acc,q)=>acc+(correct(q,state.answers[q.id])?1:0),0);
 const cat=n>=19?"Aplicación relativamente autónoma":n>=12?"Competencias en consolidación":"Punto de partida: refuerzo guiado";
 const hero=make("div","exam-score-card");
 hero.append(make("span","exam-kicker","PERFIL FORMATIVO · "+(state.status==="expired"?"TIEMPO AGOTADO":"ENTREGADO")),make("strong","exam-score",n+" / 24"),make("h2","",cat));
 hero.append(make("p","","Respondidas: "+answered()+" de 24. El resultado orienta apoyos educativos; no constituye una nota institucional."));
 root.append(hero);
 const group=make("div","exam-domain-results");
 const summary=[];
 bank.domains.forEach(domain=>{
  const qs=bank.questions.filter(q=>q.domain===domain.id);
  const hits=qs.filter(q=>correct(q,state.answers[q.id])).length;
  const level=hits>=3?"Fortaleza inicial":hits===2?"En desarrollo":"Requiere acompañamiento";
  summary.push({id:domain.id,title:domain.title,correct:hits,total:4,level});
  const card=make("article","exam-domain-card");
  card.append(make("h3","",domain.title),make("strong","",hits+" / 4"),make("span","",level));
  const track=make("div","exam-domain-bar");const fill=make("span");fill.style.width=hits*25+"%";track.append(fill);card.append(track);
  const advice=hits>=3?"Continúa con ejercicios de aplicación.":hits===2?"Refuerza los conceptos con ejemplos resueltos.":"Empieza por conceptos básicos y práctica guiada.";
  card.append(make("p","",advice));
  const a=make("a","", "Ir a "+domain.course+" →");a.href=domain.link;card.append(a);group.append(card);
 });
 root.append(make("h2","","Resultados por competencia"),group);
 const details=make("details","exam-solution-review");details.append(make("summary","","Ver explicaciones y respuestas correctas"));
 const list=make("div");
 bank.questions.forEach((q,i)=>{
  const good=correct(q,state.answers[q.id]);
  const line=make("article","exam-solution-item");
  line.append(make("h3","",String(i+1).padStart(2,"0")+" · "+q.question),make("p",good?"exam-answer-ok":"exam-answer-wrong",good?"✓ Respuesta correcta":"No acertada o sin respuesta"));
  line.append(make("p","","Respuesta esperada: "+(q.kind==="choice"?q.options[q.correct]:q.correct)),make("p","",q.explain));list.append(line);
 });details.append(list);root.append(details);
 const actions=make("div","exam-result-actions");
 const download=make("button","exam-primary","Exportar perfil (JSON)");download.type="button";
 download.onclick=()=>{
  const info={schema:"IJR-DIAGNOSTICO-EXAM-v2",timestamp:new Date(state.submittedAt).toISOString(),code:state.code||null,score:n,max:24,answered:answered(),category:cat,domains:summary,minutesAllowed:DURATION/60000,completion:state.status,privacy:"Resultados orientativos; no contiene respuestas individuales."};
  const file=new Blob([JSON.stringify(info,null,2)],{type:"application/json"});const url=URL.createObjectURL(file),a=make("a");a.href=url;a.download="IJR-diagnostico-"+(state.code||"anonimo")+".json";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
 };
 const redo=make("button","exam-secondary","Realizar un nuevo intento");redo.type="button";redo.onclick=()=>{if(!confirm("¿Iniciar un nuevo intento? Se reemplazarán el resultado y las respuestas de este navegador."))return;state=blank();save();render()};
 actions.append(download,redo);root.append(actions);
 root.append(make("p","exam-privacy","El informe se almacena únicamente en tu navegador. No envía datos al colegio ni permite calificación oficial antifraude."));
}
function render(){
 const ready=state.status==="ready",active=state.status==="active",done=!ready&&!active;
 $("examIntro").hidden=!ready;$("examRunner").hidden=!active;$("examResults").hidden=!done;
 $("examHeader").hidden=done;
 if(timerId!==null){clearInterval(timerId);timerId=null}
 if(ready){
  $("examDuration").textContent="30 minutos";
  $("examStart").onclick=start;
  $("examStudentCode").value=state.code;
  $("examStudentCode").oninput=e=>{state.code=e.target.value.replace(/[^A-Za-z0-9_-]/g,"").slice(0,24);e.target.value=state.code;save()};
 }else if(active){
  if(state.deadline<=now()){finish("expired");return}
  $("examReview").hidden=true;$("examQuestion").hidden=false;$("examActions").hidden=false;
  $("examBack").onclick=()=>go(state.position-1);
  $("examClock").textContent=timeString(state.deadline-now());
  renderQuestion();timerId=setInterval(updateTimer,1000);updateTimer();
 }else report();
}
document.addEventListener("visibilitychange",()=>{if(state.status==="active")updateTimer()});
window.addEventListener("pageshow",()=>{if(state.status==="active")updateTimer()});
render();
})();
