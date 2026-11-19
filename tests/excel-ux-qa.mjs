/* Real browser QA for Instituto Jorge Robledo · Informática 8.
 * Runs on GitHub Actions against the exact checked-out static site.
 * Fails on JS exceptions, broken assets, failed cell editing,
 * inaccurate calculations, progress regression or broken original lab.
 */
import assert from "node:assert/strict";
import { chromium } from "playwright";

const ORIGIN="http://127.0.0.1:8765";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const errors=[];
let assertions=0;
function check(value,message){assert.ok(value,message);assertions++;console.log("PASS:",message)}
async function editCell(page,lesson,cell,value){
  const target=page.locator("#lesson-"+lesson+' td[data-cell="'+cell+'"]');
  await target.click();
  const editor=target.locator(".live-cell-editor");
  await editor.waitFor({state:"visible"});
  await editor.fill(value);
  await editor.press("Enter");
  await page.waitForTimeout(80);
}
async function feedback(page,lesson){
 return (await page.locator("#lesson-"+lesson+" .live-feedback").innerText()).trim();
}
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 page.on("pageerror",err=>errors.push(String(err)));
 const response=await page.goto(ORIGIN+"/unidad-01-excel/?qa=1",{waitUntil:"domcontentloaded"});
 check(response?.status()===200,"Unit 01 HTML returns 200");
 await page.locator("#lesson-7 .live-sheet").waitFor({state:"visible",timeout:15000});
 check((await page.locator(".study-lesson").count())===7,"Seven theory sections render without mandatory clicks");
 check((await page.locator(".study-video video").count())===7,"Seven corresponding Full HD videos embedded");
 check((await page.locator("#journeyNav a[data-lesson]").count())===7,"Named lesson navigation links render");
 check(await page.locator("#practicePhase").isHidden(),"Legacy final lab remains separate and optional");
 check(await page.locator("#lesson-1 .live-spreadsheet").isVisible(),"Functional worksheet shown immediately for first lesson");
 check((await page.locator("#lesson-1 td.live-editable").count())===30,"Every cell in learning grid is editable");
 check(await page.locator("#lesson-1 .study-steps").evaluate(el=>el.open),"Example instructions are expanded without extra clicks");
 const videoSrcs=await page.locator(".study-video video").evaluateAll(nodes=>nodes.map(n=>n.getAttribute("src")));
 check(videoSrcs.length===7&&videoSrcs.every(x=>x.endsWith(".mp4")),"Original MP4s referenced, without GIF recompression");
 for(const path of ["/assets/videos/topic-01.mp4","/assets/videos/u01-addition.mp4"]){
  const resp=await page.request.head(ORIGIN+path);
  check(resp.status()===200,"Full HD asset exists: "+path);
 }
 await editCell(page,1,"B2","VENTAS");
 check((await page.locator('#lesson-1 td[data-cell="B2"] .live-cell-view').innerText())==="VENTAS","Single click and typing updates live cell B2");
 await page.locator("#lesson-1 .live-check").click();
 check((await feedback(page,1)).includes("¡Bien hecho!"),"Cell address exercise validates correctly");
 check((await page.locator("#progressLabel").innerText()).includes("1 de 7"),"Progress updates after one verified exercise");
 await editCell(page,2,"A2","Cuaderno");await editCell(page,2,"B2","4");
 await page.locator("#lesson-2 .live-check").click();
 check((await feedback(page,2)).includes("¡Bien hecho!"),"Text and numeric data validate in real cells");
 await editCell(page,3,"B2","10");
 await editCell(page,3,"B4","=B2-B3");
 await page.locator("#lesson-3 .live-check").click();
 check((await feedback(page,3)).includes("Revisa"),"Incorrect reference operation is rejected");
 await editCell(page,3,"B4","=B2+B3");
 check((await page.locator('#lesson-3 td[data-cell="B4"] .live-cell-view').innerText())==="15","Formula recalculates dynamically after source edit (10+5=15)");
 await page.locator("#lesson-3 .live-check").click();
 check((await feedback(page,3)).includes("¡Bien hecho!"),"Equivalent correct formula validates against edited data");
 await editCell(page,6,"C2","0");
 await editCell(page,6,"D2","=B2/C2");
 check((await page.locator('#lesson-6 td[data-cell="D2"] .live-cell-view').innerText())==="#DIV/0!","Zero division shows appropriate spreadsheet error");
 await page.locator("#lesson-6 .live-check").click();
 check((await feedback(page,6)).includes("Revisa"),"Division by zero cannot pass validation");
 await editCell(page,6,"C2","3");
 check((await page.locator('#lesson-6 td[data-cell="D2"] .live-cell-view').innerText())==="4000","Dependent formula recomputes after fixing divisor");
 await page.locator("#lesson-6 .live-check").click();
 check((await feedback(page,6)).includes("¡Bien hecho!"),"Corrected division passes verification");
 await editCell(page,7,"B5","=SUMA(B2:B4)");
 check((await page.locator('#lesson-7 td[data-cell="B5"] .live-cell-view').innerText())==="60","SUMA evaluates entire contiguous range correctly");
 await page.locator("#lesson-7 .live-check").click();
 check((await feedback(page,7)).includes("¡Bien hecho!"),"SUMA passes verification");
 await page.reload({waitUntil:"domcontentloaded"});
 await page.locator("#lesson-7 .live-sheet").waitFor();
 check((await page.locator("#progressLabel").innerText()).includes("5 de 7"),"Verified progress survives page reload");
 await page.locator("#lesson-1 .live-reset").click();
 check((await page.locator("#progressLabel").innerText()).includes("4 de 7"),"Reset removes stale completion state");
 await page.locator("#openPractice").click();
 check(await page.locator("#practicePhase").isVisible(),"Original seven-question Excel lab opens on demand");
 check(await page.locator("#theoryPhase").isVisible(),"Theory stays available while lab is open");
 check((await page.locator("#steps button").count())===7,"Original final lab still has seven graded tasks");
 await page.locator("#restartTheory").click();
 check(await page.locator("#practicePhase").isHidden(),"Return-to-theory control closes optional final lab");
 await page.setViewportSize({width:390,height:844});
 check(await page.locator("#lesson-1 .live-sheet").isVisible(),"Editable spreadsheet remains visible on mobile viewport");
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 check(overflow<12,"Mobile viewport has no unintended page-level horizontal overflow ("+overflow+"px)");
 check(errors.length===0,"No uncaught browser JavaScript exceptions: "+errors.join(" | "));
 console.log("SENIOR QA SUCCESS",assertions,"assertions");
}finally{await browser.close();}
