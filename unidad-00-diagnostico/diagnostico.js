/* IJR · Módulo 00: diagnóstico formativo de competencias digitales.
   Los resultados son orientativos, locales y no equivalen a calificaciones
   ni a un diagnóstico de capacidades personales. No hay envíos a servidores.
 */
(()=>{
"use strict";
const data=window.IJRDiagnosticBank;
if(!data||!Array.isArray(data.questions)||!Array.isArray(data.domains))return;
const VERSION=data.version,STORE="ijr-ti8-diagnostic-v1";
const $=id=>document.getElementById(id),make=(tag,cl,t)=>{
 const el=document.createElement(tag);if(cl)el.className=cl;
 if(t!==undefined)el.textContent=t;return el;
};
const ids=new Set(data.questions.map(q=>q.id));
const domains=new Map(data.domains.map(d=>[d.id,d]));
const initial=()=>({version:VERSION,answers:{},code:"",submitted:false});
let state=initial();
try{
 const s=JSON.parse(localStorage.getItem(STORE)||"null");
 if(s&&s.version===VERSION&&s.answers&&typeof s.answers==="object"){
  const filtered={};
  for(const [id,value] of Object.entries(s.answers)){
   if(ids.has(id)&&(typeof value==="string"||typeof value==="number")&&String(value).length<=128)filtered[id]=String(value);
  }
  state={version:VERSION,answers:filtered,code:typeof s.code==="string"?s.code.slice(0,24):"",submitted:s.submitted===true};
 }
}catch{}
function save(){try{localStorage.setItem(STORE,JSON.stringify(state))}catch{}}
function normal(s){return String(s).trim().toUpperCase().replace(/\s+/g,"")}
function correct(q,raw){
 if(raw===undefined||String(raw).trim()==="")return false;
 if(q.kind==="choice")return Number(raw)===q.correct&&String(raw)===String(q.correct);
 if(q.kind==="cell")return normal(raw)===normal(q.correct);
 if(q.kind==="formula"){
  const actual=normal(raw),expected=normal(q.correct);
  return actual===expected || q.id==="e3"&&actual==="=C2*B2";
 }
 if(q.kind==="number"){
  const str=String(raw).trim().replace(",",".");
  if(!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(str))return false;
  return Number.isFinite(Number(str))&&Math.abs(Number(str)-q.correct)<1e-8;
 }
 return false;
}
function answerCount(){
 return data.questions.filter(q=>String(state.answers[q.id]??"").trim()!=="").length;
}
function points(){
 return data.questions.reduce((n,q)=>n+(correct(q,state.answers[q.id])?1:0),0);
}
function persistAnswer(id,value){
 state.answers[id]=String(value).slice(0,128);
 if(state.submitted){state.submitted=false;$("diagnosticResults").hidden=true;$("diagnosticResults").replaceChildren();}
 save();updateProgress();
}
function updateProgress(){
 const c=answerCount();
 $("answerCount").textContent=c+" / "+data.questions.length+" preguntas respondidas";
 $("answerProgress").style.width=(100*c/data.questions.length)+"%";
 $("submitDiagnostic").textContent=c===data.questions.length?"Evaluar y generar perfil":"Evaluar "+c+" respuestas y generar perfil";
 $("remainingMessage").textContent=c===data.questions.length?
 "Cuestionario completo. Puedes calcular el perfil.":
 "Quedan "+(data.questions.length-c)+" preguntas sin responder. Puedes finalizar, pero las respuestas vacías contarán como no acertadas.";
}
function renderQuestions(){
 const host=$("diagnosticQuestions");host.replaceChildren();
 const counts={};
 data.domains.forEach((domain,index)=>{
  const section=make("section","diag-domain");
  section.id="domain-"+domain.id;
  const heading=make("header","diag-domain-head");
  heading.append(make("span","diag-kicker","COMPETENCIA "+String(index+1).padStart(2,"0")+" / 06"),make("h2","",domain.title),make("p","",domain.description));
  section.append(heading);
  const list=make("div","diag-question-list");
  data.questions.filter(q=>q.domain===domain.id).forEach(q=>{
   counts[domain.id]=(counts[domain.id]||0)+1;
   const number=data.questions.indexOf(q)+1;
   const field=make("fieldset","diag-question");
   field.dataset.question=q.id;
   const legend=make("legend","diag-question-title",""+String(number).padStart(2,"0")+" · "+q.question);
   field.append(legend);
   if(q.kind==="choice"){
    const opts=make("div","diag-choice-grid");
    q.options.forEach((option,i)=>{
     const label=make("label","diag-option");
     const radio=make("input");radio.type="radio";radio.name="q-"+q.id;radio.value=String(i);
     radio.checked=state.answers[q.id]===String(i);
     radio.addEventListener("change",()=>{if(radio.checked)persistAnswer(q.id,String(i))});
     label.append(radio,make("span","",option));opts.append(label);
    });
    field.append(opts);
   }else{
    const label=make("label","diag-input-label",q.kind==="formula"?"Escribe la fórmula":q.kind==="cell"?"Referencia de celda":"Respuesta numérica");
    const input=make("input","diag-short");
    input.type="text";input.inputMode=q.kind==="number"?"decimal":"text";
    input.placeholder=q.placeholder||"";input.autocomplete="off";input.spellcheck=false;
    input.value=state.answers[q.id]||"";
    input.setAttribute("aria-label",q.question);
    input.addEventListener("input",()=>persistAnswer(q.id,input.value));
    label.append(input);field.append(label);
   }
   list.append(field);
  });
  section.append(list);host.append(section);
 });
}
function labelFor(score){
 if(score>=3)return {name:"Fortaleza inicial",className:"diag-positive",message:"Puede abordar actividades de aplicación y explicar procedimientos."};
 if(score===2)return {name:"En desarrollo",className:"diag-medium",message:"Conviene reforzar conceptos y practicar con ejemplos guiados."};
 return {name:"Requiere acompañamiento",className:"diag-needs",message:"Se recomienda comenzar con explicaciones básicas y prácticas acompañadas."};
}
function overallLabel(score){
 if(score>=19)return "Aplicación relativamente autónoma";
 if(score>=12)return "Competencias en consolidación";
 return "Punto de partida: refuerzo guiado";
}
function analyze(){
 const breakdown=data.domains.map(d=>{
  const subset=data.questions.filter(q=>q.domain===d.id);
  const score=subset.filter(q=>correct(q,state.answers[q.id])).length;
  return {domain:d,score,total:subset.length,label:labelFor(score)};
 });
 return {score:points(),total:data.questions.length,answered:answerCount(),breakdown,
  category:overallLabel(points()),date:new Date().toISOString().slice(0,10)};
}
function formatCorrect(q){
 return q.kind==="choice"?q.options[q.correct]:String(q.correct);
}
function exportReport(result){
 const out={
  schema:"IJR-DIAGNOSTICO-FORMATIVO-v1",timestamp:new Date().toISOString(),
  identifier:state.code||null,anonymous:!state.code,
  evaluation:{score:result.score,max:result.total,answered:result.answered,category:result.category},
  domains:result.breakdown.map(x=>({id:x.domain.id,title:x.domain.title,correct:x.score,total:x.total,level:x.label.name})),
  // Report is intentionally aggregate: does not export individual answers.
  privacy:"Resultados informativos locales; no constituye nota oficial ni perfil psicológico."
 };
 const blob=new Blob([JSON.stringify(out,null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob);const a=make("a");
 a.href=url;a.download="IJR-diagnostico-"+(state.code||"anonimo").replace(/[^a-zA-Z0-9_-]/g,"").slice(0,24)+".json";
 document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1500);
}
function renderReport(){
 const result=analyze(),host=$("diagnosticResults");
 host.hidden=false;host.replaceChildren();
 const hero=make("div","diag-result-hero");
 const score=make("div","diag-result-score");
 score.append(make("span","diag-kicker","RESULTADO ORIENTATIVO"),make("strong","",result.score+" / "+result.total),make("p","",result.category));
 const context=make("div","diag-result-context");
 context.append(make("h2","","Tu punto de partida"),make("p","",result.answered+" respuestas de "+result.total+" preguntas. El resultado identifica aspectos que conviene practicar; no mide inteligencia, capacidad personal ni determina la trayectoria académica."));
 hero.append(score,context);host.append(hero);
 const title=make("h3","diag-results-title","Perfil por competencias");host.append(title);
 const grid=make("div","diag-domain-results");
 result.breakdown.forEach(({domain,score,total,label})=>{
  const card=make("article","diag-result-domain");
  card.append(make("h4","",domain.title));
  const stat=make("div","diag-domain-stat");stat.append(make("strong","",score+" / "+total),make("span",label.className,label.name));card.append(stat);
  const track=make("div","diag-track"),fill=make("span");
  fill.style.width=(100*score/total)+"%";track.append(fill);card.append(track);
  card.append(make("p","",label.message));
  const target=make("a","diag-lesson-link","Repasar: "+domain.course+" →");target.href=domain.link;
  card.append(target);grid.append(card);
 });
 host.append(grid);
 const advice=make("div","diag-recommendations");
 advice.append(make("h3","","Ruta de acompañamiento sugerida"));
 const weak=result.breakdown.filter(x=>x.score<=2).sort((a,b)=>a.score-b.score);
 if(weak.length===0)advice.append(make("p","","Todas las áreas muestran resultados iniciales favorables. Avanza por los módulos y realiza proyectos que integren varias competencias."));
 else{
  advice.append(make("p","","Se recomienda dedicar primero sesiones cortas a estas competencias y repetir la evaluación después de trabajar los contenidos."));
  const ul=make("ul");weak.forEach(x=>ul.append(make("li","",x.domain.title+" · "+x.label.name+" · "+x.domain.course)));advice.append(ul);
 }
 host.append(advice);
 const review=make("details","diag-review");
 review.append(make("summary","","Revisar explicaciones y respuestas correctas"));
 const items=make("div","diag-review-items");
 data.questions.forEach((q,i)=>{
  const good=correct(q,state.answers[q.id]);
  const row=make("article","diag-review-question");
  row.append(make("h4","",String(i+1).padStart(2,"0")+" · "+q.question));
  row.append(make("p",good?"diag-good":"diag-incorrect",good?"✓ Respuesta acertada":"Respuesta sin acertar"));
  row.append(make("p","","Respuesta esperada: "+formatCorrect(q)));
  row.append(make("p","",q.explain));items.append(row);
 });
 review.append(items);host.append(review);
 const buttons=make("div","diag-report-buttons");
 const download=make("button","button button-dark","Exportar perfil anónimo (JSON)");
 download.type="button";download.onclick=()=>exportReport(result);
 const print=make("button","button button-light","Imprimir perfil");print.type="button";print.onclick=()=>window.print();
 buttons.append(download,print);host.append(buttons);
 const warning=make("p","diag-privacy","El perfil se calcula en tu dispositivo y no se envía a Supabase ni al colegio. Si el docente necesita conservarlo, puedes descargarlo y compartirlo por un canal institucional autorizado. No escribas nombres completos, correos ni documentos de identidad.");
 host.append(warning);
 host.scrollIntoView({block:"start",behavior:"smooth"});
}
$("submitDiagnostic").addEventListener("click",()=>{
 state.submitted=true;save();renderReport();
});
$("restartDiagnostic").addEventListener("click",()=>{
 if(!window.confirm("¿Quieres iniciar nuevamente el diagnóstico? Se borrarán las respuestas y el perfil de este navegador."))return;
 state=initial();save();$("diagnosticResults").hidden=true;$("diagnosticResults").replaceChildren();
 renderQuestions();updateProgress();window.scrollTo({top:0,behavior:"smooth"});
});
$("studentCode").value=state.code;
$("studentCode").addEventListener("input",e=>{
 const raw=String(e.target.value||"").replace(/[^a-zA-Z0-9_-]/g,"").slice(0,24);
 e.target.value=raw;state.code=raw;save();
});
renderQuestions();updateProgress();
if(state.submitted)renderReport();
})();