/* Instituto Jorge Robledo — Module 00 diagnostic: acceptance and senior QA.
 * Real Chromium tests: every item, scoring tiers, domain profiling,
 * accessibility basics, persistence, reset, anonymous JSON export and mobile.
 */
import assert from "node:assert/strict";
import {chromium} from "playwright";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
let passed=0;
function ok(condition,label){assert.ok(condition,label);passed++;console.log("PASS:",label)}
const BASE="http://127.0.0.1:8765";
try{
 const page=await browser.newPage({viewport:{width:1366,height:900},acceptDownloads:true});
 const exceptions=[],badRequests=[];
 page.on("pageerror",e=>exceptions.push(String(e)));
 page.on("requestfailed",r=>{const reason=r.failure()?.errorText||"";if(r.url().startsWith(BASE)&&!(reason.includes("ERR_ABORTED")&&r.url().endsWith(".mp4")))badRequests.push(r.url()+" "+reason)});
 const response=await page.goto(BASE+"/unidad-00-diagnostico/?qa=full",{waitUntil:"domcontentloaded"});
 ok(response?.status()===200,"Diagnostic page serves HTTP 200");
 await page.locator("#diagnosticQuestions .diag-question").first().waitFor();
 ok(await page.locator(".diag-domain").count()===6,"All six domains visible");
 ok(await page.locator(".diag-question").count()===24,"All 24 questions render");
 ok(await page.locator(".diag-question input[type=radio]").count()>=60,"Real selectable answers render");
 ok(await page.locator(".diag-question input[type=text]").count()===6,"Cell, formula and numeric response inputs render");
 ok(await page.locator("#diagnosticResults").isHidden(),"Results hidden until user submits");
 ok((await page.locator("#answerCount").innerText()).includes("0 / 24"),"Initial progress is zero");
 const bank=await page.evaluate(()=>window.IJRDiagnosticBank);
 ok(bank.questions.length===24&&bank.domains.length===6,"Question bank is consistent");
 const freq=bank.domains.map(d=>bank.questions.filter(q=>q.domain===d.id).length);
 ok(freq.every(n=>n===4),"Every competency has 4 questions");
 const ids=bank.questions.map(q=>q.id);
 ok(new Set(ids).size===24,"Question IDs are unique");
 // Submission without answers is permitted and scored as zero.
 await page.locator("#submitDiagnostic").click();
 ok(await page.locator("#diagnosticResults").isVisible(),"Incomplete diagnostic may be evaluated");
 ok((await page.locator(".diag-result-score strong").innerText()).includes("0 / 24"),"Blank answers score zero");
 ok((await page.locator(".diag-result-domain").count())===6,"Zero-score report has six domain profiles");
 ok((await page.locator(".diag-domain-stat .diag-needs").count())===6,"Zero score correctly recommends support in all domains");
 // Editing invalidates stale report.
 const first=bank.questions[0];
 await page.locator('.diag-question[data-question="'+first.id+'"] input[value="'+first.correct+'"]').check();
 ok(await page.locator("#diagnosticResults").isHidden(),"Editing after submission invalidates stale report");
 ok((await page.locator("#answerCount").innerText()).includes("1 / 24"),"Progress tracks answers immediately");
 // Data saved locally and restored.
 await page.reload({waitUntil:"domcontentloaded"});
 ok(await page.locator('.diag-question[data-question="'+first.id+'"] input[value="'+first.correct+'"]').isChecked(),"Choice is restored after reload");
 // Fill exactly 12 correct and 12 wrong to assess mid-tier.
 for(let i=0;i<bank.questions.length;i++){
  const q=bank.questions[i],container=page.locator('.diag-question[data-question="'+q.id+'"]');
  const shouldBeRight=i<12;
  if(q.kind==="choice"){
   await container.locator('input[value="'+(shouldBeRight?q.correct:(q.correct+1)%q.options.length)+'"]').check();
  }else{
   const value=shouldBeRight?String(q.correct):q.kind==="number"?"-999":"respuesta-incorrecta";
   await container.locator("input.diag-short").fill(value);
  }
 }
 ok((await page.locator("#answerCount").innerText()).includes("24 / 24"),"24 answers registered");
 await page.locator("#submitDiagnostic").click();
 ok((await page.locator(".diag-result-score strong").innerText()).includes("12 / 24"),"Half-correct profile scores exactly 12/24");
 ok((await page.locator(".diag-result-score").innerText()).includes("Competencias en consolidación"),"Middle category assigned correctly");
 ok((await page.locator(".diag-result-domain").count())===6,"All domain feedback remains visible");
 const counters=await page.locator(".diag-domain-stat strong").allInnerTexts();
 ok(counters.slice(0,3).every(x=>x==="4 / 4")&&counters.slice(3).every(x=>x==="0 / 4"),"Domain-level classifications reflect each competency independently");
 await page.reload({waitUntil:"domcontentloaded"});
 ok((await page.locator(".diag-result-score strong").innerText()).includes("12 / 24"),"Submitted score persists after reload");
 // Fill all with correct answers, including typed reference and formula.
 for(const q of bank.questions){
  const c=page.locator('.diag-question[data-question="'+q.id+'"]');
  if(q.kind==="choice")await c.locator('input[value="'+q.correct+'"]').check();
  else await c.locator("input.diag-short").fill(String(q.correct));
 }
 await page.locator("#studentCode").fill("G8-001");
 await page.locator("#submitDiagnostic").click();
 ok((await page.locator(".diag-result-score strong").innerText()).includes("24 / 24"),"All 24 answer keys are achievable");
 ok((await page.locator(".diag-result-score").innerText()).includes("Aplicación relativamente autónoma"),"High-score category assigned correctly");
 ok((await page.locator(".diag-domain-stat .diag-positive").count())===6,"All domains have high-level profile when all correct");
 ok(await page.locator(".diag-review summary").count()===1,"Explanations are available after evaluation");
 await page.locator(".diag-review summary").click();
 ok(await page.locator(".diag-review-question").count()===24,"24 transparent answer explanations rendered");
 const dlPromise=page.waitForEvent("download");
 await page.locator(".diag-report-buttons button").first().click();
 const download=await dlPromise;
 ok(download.suggestedFilename().includes("G8-001"),"Export names only authorized student code");
 const file=await download.path();
 const fs=await import("node:fs/promises");
 const exported=JSON.parse(await fs.readFile(file,"utf8"));
 ok(exported.evaluation.score===24&&exported.domains.length===6,"Export has accurate profile and 6 competencies");
 ok(!("answers" in exported)&&!JSON.stringify(exported).includes("password"),"Export does not contain individual student answers or passwords");
 ok(exported.identifier==="G8-001","Export includes only optional code");
 // Public homepage includes module 0.
 await page.goto(BASE+"/",{waitUntil:"domcontentloaded"});
 ok(await page.locator('#diagnosticModule a[href="unidad-00-diagnostico/"]').count()===1,"Homepage has diagnostic entry");
 // The module 1 remains accessible without diagnostic; diagnostic not a gate.
 await page.goto(BASE+"/unidad-01-excel/",{waitUntil:"domcontentloaded"});
 ok((await page.locator("#lesson-1 .live-sheet").count())===1,"Module 01 remains independently accessible");
 await page.goto(BASE+"/unidad-00-diagnostico/",{waitUntil:"domcontentloaded"});
 // Test numerical and formula alternative acceptance.
 await page.locator('.diag-question[data-question="e3"] input.diag-short').fill("=C2 * B2");
 await page.locator('.diag-question[data-question="e4"] input.diag-short').fill("15.000");
 await page.locator("#submitDiagnostic").click();
 const partial=Number((await page.locator(".diag-result-score strong").innerText()).split("/")[0].trim());
 ok(partial===23,"Commutative formula accepted and malformed grouping numeric input rejected");
 await page.locator('.diag-question[data-question="e4"] input.diag-short').fill("15000");
 await page.locator("#submitDiagnostic").click();
 ok((await page.locator(".diag-result-score strong").innerText()).includes("24 / 24"),"Correcting numeric input restores full score");
 // Mobile & accessibility basics.
 await page.setViewportSize({width:375,height:812});
 ok(await page.locator(".diag-domain").first().isVisible(),"Questionnaire visible on narrow mobile viewport");
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 ok(overflow<12,"No page-wide horizontal overflow at 375 px ("+overflow+"px)");
 const labels=await page.locator(".diag-question").evaluateAll(nodes=>nodes.every(e=>e.querySelector("legend")));
 ok(labels,"All question groups use a semantic legend");
 ok(await page.locator("#answerCount").getAttribute("aria-live")==="polite","Answer progress announced accessibly");
 ok(exceptions.length===0,"No uncaught browser JS exceptions: "+exceptions.join(" | "));
 ok(badRequests.length===0,"No failed local network requests: "+badRequests.join(" | "));
 // Reset clears state; confirm dialog is explicit.
 page.once("dialog",d=>d.accept());
 await page.locator("#restartDiagnostic").click();
 ok((await page.locator("#answerCount").innerText()).includes("0 / 24"),"Explicit retake clears all previous responses");
 ok(await page.locator("#diagnosticResults").isHidden(),"Retake hides outdated report");
 console.log("MODULE 00 DIAGNOSTIC QA SUCCESS —",passed,"assertions");
}finally{await browser.close()}
