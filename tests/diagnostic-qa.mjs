/* IJR Module 00: real Playwright browser QA for one-question timed exam.
 * Test response flow, 24 answer keys, illustrations, deadline persistence,
 * submission lock, privacy and mobile regression. */
import assert from "node:assert/strict";
import {chromium} from "playwright";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
let assertions=0;
function ok(cond,message){assert.ok(cond,message);assertions++;console.log("PASS:",message)}
const ORIGIN="http://127.0.0.1:8765";
const page=await browser.newPage({viewport:{width:1366,height:900},acceptDownloads:true});
const exceptions=[];page.on("pageerror",e=>exceptions.push(String(e)));
async function fresh(){await page.goto(ORIGIN+"/unidad-00-diagnostico/?qa=exam-v2",{waitUntil:"domcontentloaded"});await page.evaluate(()=>localStorage.removeItem("ijr-ti8-diagnostic-exam-v2"));await page.reload({waitUntil:"domcontentloaded"})}
async function go(i){await page.locator("#examQuestionNav button").nth(i).click()}
async function answer(i,val){
 await go(i);
 const q=bank.questions[i];
 if(q.kind==="choice")await page.locator('#examQuestion input[type="radio"][value="'+val+'"]').check();
 else await page.locator("#examQuestion input.exam-free-answer").fill(String(val));
}
async function correctAnswers(n){
 for(let i=0;i<bank.questions.length;i++){
  const q=bank.questions[i],right=i<n;
  let v;
  if(q.kind==="choice")v=String(right?q.correct:(q.correct+1)%q.options.length);
  else if(right)v=String(q.correct);
  else v=q.kind==="number"?"-999":"respuesta incorrecta";
  await answer(i,v);
 }
}
try{
 await fresh();
 const bank=await page.evaluate(()=>window.IJRDiagnosticBank);
 ok(bank.questions.length===24&&bank.domains.length===6,"Bank retains 24 items and 6 domains");
 ok(await page.locator("#examIntro").isVisible(),"Instructions appear before start");
 ok(await page.locator("#examRunner").isHidden(),"No questions are visible until starting");
 ok(await page.locator("#examClock").count()===1,"Exam timer present");
 ok(await page.locator("#examStudentCode").count()===1,"Optional student code available");
 await page.locator("#examStudentCode").fill("G8-009");
 await page.reload({waitUntil:"domcontentloaded"});
 ok((await page.locator("#examStudentCode").inputValue())==="G8-009","Optional code persists on reload before starting");
 await page.locator("#examStart").click();
 ok(await page.locator("#examRunner").isVisible(),"Start opens exam");
 ok(await page.locator("#examIntro").isHidden(),"Instructions removed during exam");
 ok(await page.locator("#examQuestion").isVisible(),"Single question appears");
 ok(await page.locator("#examQuestion fieldset").count()===1,"Exactly one answer group shown");
 ok(await page.locator("#examQuestionNav button").count()===24,"Twenty-four numbered direct navigation controls");
 ok(await page.locator("#examQuestion figure").count()===1,"Practical illustration appears for question");
 const remaining=await page.locator("#examClock").innerText();
 ok(/^\d\d:\d\d$/.test(remaining),"Countdown formatted as MM:SS");
 const state1=await page.evaluate(()=>JSON.parse(localStorage.getItem("ijr-ti8-diagnostic-exam-v2")));
 ok(Number.isFinite(state1.deadline)&&state1.deadline-state1.started===30*60*1000,"Timer deadline is fixed thirty minutes");
 await page.locator('#examQuestion input[type="radio"]').first().check();
 ok((await page.locator("#examAnswered").innerText()).includes("1 de 24"),"Answer immediately counted");
 await page.locator("#examNext").click();
 ok((await page.locator("#examQuestionCounter").innerText()).includes("02 / 24"),"Next advances one question");
 await page.locator("#examBack").click();
 ok((await page.locator("#examQuestionCounter").innerText()).includes("01 / 24"),"Previous goes back one question");
 const originalDeadline=(await page.evaluate(()=>JSON.parse(localStorage.getItem("ijr-ti8-diagnostic-exam-v2")))).deadline;
 await page.reload({waitUntil:"domcontentloaded"});
 const currentDeadline=(await page.evaluate(()=>JSON.parse(localStorage.getItem("ijr-ti8-diagnostic-exam-v2")))).deadline;
 ok(currentDeadline===originalDeadline,"Reload does not reset exam clock");
 ok((await page.locator("#examAnswered").innerText()).includes("1 de 24"),"Answer persists after reload");
 // Check visual figures in the existing domain contexts.
 for(const [id,kind] of [["a1",".exam-file-tree"],["e1",".exam-mini-sheet"],["d1",".exam-figure svg"],["l1",".exam-flowchart"],["s1",".exam-safety-example"]]){
  const i=bank.questions.findIndex(q=>q.id===id);
  await go(i);
  ok(await page.locator("#examQuestion "+kind).count()===1,"Practical visual exists for "+id);
 }
 await correctAnswers(12);
 ok((await page.locator("#examAnswered").innerText()).includes("24 de 24"),"All answers registered");
 await go(23);await page.locator("#examNext").click();
 ok(await page.locator("#examReview").isVisible(),"Last question leads to review without revealing key");
 ok(await page.locator("#examActions").isHidden(),"Previous/Next controls hidden during review");
 ok(await page.locator(".exam-review-item").count()===24,"Review lists every answered/unanswered question");
 ok(await page.locator("#examResults").isHidden(),"Score not exposed before submission");
 await page.locator(".exam-review-item").first().click();
 ok(await page.locator("#examQuestion").isVisible(),"Review can return to question");
 await go(23);await page.locator("#examNext").click();
 page.once("dialog",d=>d.accept());
 await page.locator(".exam-submit").click();
 ok(await page.locator("#examResults").isVisible(),"Submission reveals the report");
 ok((await page.locator(".exam-score").innerText()).includes("12 / 24"),"Half-correct examination gives exact score 12");
 ok((await page.locator(".exam-score-card").innerText()).includes("Competencias en consolidación"),"Middle competency band shown");
 ok(await page.locator(".exam-domain-card").count()===6,"Six individual competency profiles render");
 ok(await page.locator("#examRunner").isHidden(),"Editing is unavailable after final submission");
 await page.reload({waitUntil:"domcontentloaded"});
 ok((await page.locator(".exam-score").innerText()).includes("12 / 24"),"Submitted report persists across reload");
 // Export only aggregate information.
 const event=page.waitForEvent("download");
 await page.locator(".exam-result-actions button").first().click();
 const dl=await event;
 ok(dl.suggestedFilename().includes("G8-009"),"Optional code is included in filename");
 const fs=await import("node:fs/promises");
 const parsed=JSON.parse(await fs.readFile(await dl.path(),"utf8"));
 ok(parsed.score===12&&parsed.domains.length===6,"JSON export accurately reflects score and six domains");
 ok(!Object.hasOwn(parsed,"answers"),"Export excludes individual responses");
 // Retake, all correct keys, then timeout test in a separate attempt.
 page.once("dialog",d=>d.accept());
 await page.locator(".exam-result-actions button").nth(1).click();
 ok(await page.locator("#examIntro").isVisible(),"Retake returns to introductory instructions");
 await page.locator("#examStart").click();
 await correctAnswers(24);
 await go(23);await page.locator("#examNext").click();
 page.once("dialog",d=>d.accept());
 await page.locator(".exam-submit").click();
 ok((await page.locator(".exam-score").innerText()).includes("24 / 24"),"All 24 correct answers are achievable");
 ok(await page.locator(".exam-domain-card").count()===6,"Perfect score retains six domain cards");
 page.once("dialog",d=>d.accept());
 await page.locator(".exam-result-actions button").nth(1).click();
 await page.locator("#examStart").click();
 await answer(0,String(bank.questions[0].correct));
 await page.evaluate(()=>{
  const key="ijr-ti8-diagnostic-exam-v2";
  const s=JSON.parse(localStorage.getItem(key));
  s.deadline=Date.now()-1;
  localStorage.setItem(key,JSON.stringify(s));
 });
 await page.reload({waitUntil:"domcontentloaded"});
 ok(await page.locator("#examResults").isVisible(),"Expired session is automatically graded on reopen");
 ok((await page.locator(".exam-score-card").innerText()).includes("TIEMPO AGOTADO"),"Time-out identified clearly");
 ok((await page.locator(".exam-score").innerText()).includes("1 / 24"),"Time-out evaluates only saved answers");
 ok(await page.locator("#examRunner").isHidden(),"Expired exam is not editable");
 // Mobile
 await page.setViewportSize({width:375,height:812});
 ok(await page.locator(".exam-score-card").isVisible(),"Scorecard visible on 375px viewport");
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 ok(overflow<12,"Mobile horizontal overflow stays under 12px ("+overflow+"px)");
 await page.goto(ORIGIN+"/",{waitUntil:"domcontentloaded"});
 ok(await page.locator('#diagnosticModule a[href="unidad-00-diagnostico/"]').count()===1,"Learning Hub routes to exam");
 ok(exceptions.length===0,"No uncaught browser JavaScript errors: "+exceptions.join(" | "));
 console.log("MODULE 00 EXAM QA SUCCESS —",assertions,"assertions");
}finally{await browser.close()}
