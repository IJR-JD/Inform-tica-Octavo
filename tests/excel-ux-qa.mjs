/* Senior functional QA: real 7/7 progression and Excel editing in Chromium.
 * Every lesson must be solvable; no skipping before verification.
 */
import assert from "node:assert/strict";
import { chromium } from "playwright";

const ORIGIN="http://127.0.0.1:8765";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const errors=[];
let count=0;
function check(condition,description){
 assert.ok(condition,description);count++;
 console.log("PASS:",description);
}
function cell(page,lesson,reference){
 return page.locator("#lesson-"+lesson+' td[data-cell="'+reference+'"]');
}
async function edit(page,lesson,reference,value){
 const td=cell(page,lesson,reference);
 await td.click();
 const input=td.locator(".live-cell-editor");
 await input.waitFor({state:"visible"});
 await input.fill(value);
 await input.press("Enter");
}
async function testFeedback(page,i,expectSuccess=true){
 await page.locator("#lesson-"+i+" .live-check").click();
 const content=await page.locator("#lesson-"+i+" .live-feedback").innerText();
 check(expectSuccess?content.includes("Ejercicio registrado y aprobado"):content.includes("Revisa"),
  "Lesson "+i+": "+(expectSuccess?"correct solution registered":"incorrect solution rejected")+" ("+content.slice(0,100)+")");
}
async function unlocked(page,i){
 check(await page.locator("#lesson-"+i).isVisible(),"Lesson "+i+" is unlocked and visible");
 const link=page.locator('#journeyNav a[data-lesson="'+i+'"]');
 check((await link.getAttribute("aria-disabled"))==="false","Navigation lesson "+i+" enabled");
}
async function locked(page,i){
 check(await page.locator("#lesson-"+i).isHidden(),"Lesson "+i+" is hidden while locked");
 const link=page.locator('#journeyNav a[data-lesson="'+i+'"]');
 check((await link.getAttribute("aria-disabled"))==="true","Navigation lesson "+i+" disabled");
 check(await link.getAttribute("href")===null,"Lesson "+i+" has no bypass hyperlink");
}
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 page.on("pageerror",e=>errors.push(String(e)));
 const res=await page.goto(ORIGIN+"/unidad-01-excel/?qa=seq-v4",{waitUntil:"domcontentloaded"});
 check(res?.status()===200,"Unit 01 returns HTTP 200");
 await page.locator("#lesson-1 .live-sheet").waitFor({state:"visible",timeout:18000});
 check(await page.locator(".study-lesson").count()===7,"Seven real lessons are rendered");
 check(await page.locator(".study-video video").count()===7,"Seven Full HD videos retained");
 check(await page.locator(".live-spreadsheet").count()===7,"Seven real editable spreadsheets created");
 check(await page.locator("#practicePhase").isHidden(),"Final lab initially closed");
 check(await page.locator("#openPractice").isHidden(),"Final lab remains locked until all exercises are registered");
 for(let i=2;i<=7;i++)await locked(page,i);
 await unlocked(page,1);
 check(await page.locator("#lesson-1 .study-steps").evaluate(el=>el.open),"Worked examples available without click");
 check((await page.locator("#lesson-1 td.live-editable").count())===30,"All 30 cells in the first spreadsheet editable");
 const font=await page.locator("#lesson-1 .study-lesson-head p").evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
 check(font>=17,"Reading font enlarged to at least 17px (actual "+font+"px)");
 const cellHeight=await cell(page,1,"B2").evaluate(el=>el.getBoundingClientRect().height);
 check(cellHeight>=58,"Practical Excel cell height at least 58px");
 const mp4=await page.request.head(ORIGIN+"/assets/videos/u01-addition.mp4");
 check(mp4.status()===200,"Original Full HD videos accessible");
 await page.locator('#journeyNav a[data-lesson="7"]').evaluate(el=>el.click());
 await locked(page,7);
 await testFeedback(page,1,false);
 await edit(page,1,"B2","VENTAS");
 check((await cell(page,1,"B2").locator(".live-cell-view").innerText())==="VENTAS","Lesson 1 writes VENTAS to actual B2 cell");
 await testFeedback(page,1);
 await unlocked(page,2);await locked(page,3);
 check(await page.locator("#lesson-1 .study-next-link").isVisible(),"Next lesson link appears only after registration");

 await edit(page,2,"A2","Cuaderno");
 await edit(page,2,"B2","4");
 await testFeedback(page,2);
 await unlocked(page,3);await locked(page,4);
 await edit(page,3,"B4","=B2-B3");
 await testFeedback(page,3,false);
 await locked(page,4);
 await edit(page,3,"B2","10");
 await edit(page,3,"B4","=B2+B3");
 check((await cell(page,3,"B4").locator(".live-cell-view").innerText())==="15","Lesson 3 sum recalculates when source changes");
 await testFeedback(page,3);
 await unlocked(page,4);
 await edit(page,4,"B4","=B2-B3");
 check((await cell(page,4,"B4").locator(".live-cell-view").innerText())==="13","Lesson 4 inventory subtraction is 13");
 await testFeedback(page,4);
 await unlocked(page,5);
 await edit(page,5,"D2","=B2*C2");
 check((await cell(page,5,"D2").locator(".live-cell-view").innerText())==="14000","Lesson 5 multiplication is 14000");
 await testFeedback(page,5);
 await unlocked(page,6);
 await edit(page,6,"C2","0");
 await edit(page,6,"D2","=B2/C2");
 check((await cell(page,6,"D2").locator(".live-cell-view").innerText())==="#DIV/0!","Division by zero raises Excel error");
 await testFeedback(page,6,false);
 await locked(page,7);
 await edit(page,6,"C2","3");
 check((await cell(page,6,"D2").locator(".live-cell-view").innerText())==="4000","Division recalculates after correction");
 await testFeedback(page,6);
 await unlocked(page,7);
 await edit(page,7,"B5","=SUMA(B2:B4)");
 check((await cell(page,7,"B5").locator(".live-cell-view").innerText())==="60","SUMA computes correct full range");
 await testFeedback(page,7);
 check((await page.locator("#progressLabel").innerText()).includes("7 de 7"),"Progress reaches seven verified registrations");
 check(await page.locator("#openPractice").isVisible(),"Optional final laboratory unlocks after 7/7 verified");
 await page.locator("#openPractice").click();
 check(await page.locator("#practicePhase").isVisible(),"Original 7-question lab opens");
 check(await page.locator("#steps button").count()===7,"Legacy lab retains all seven tasks");
 await page.locator("#restartTheory").click();
 check(await page.locator("#practicePhase").isHidden(),"Return to theory closes lab");
 await page.reload({waitUntil:"domcontentloaded"});
 await page.locator("#lesson-7 .live-sheet").waitFor({state:"visible"});
 check((await page.locator("#progressLabel").innerText()).includes("7 de 7"),"Verified progress persists across reload");
 check((await cell(page,7,"B5").locator(".live-cell-view").innerText())==="60","Spreadsheet contents persist across reload");
 await edit(page,3,"B4","=B2-B3");
 check((await page.locator("#progressLabel").innerText()).includes("2 de 7"),"Changing an approved answer revokes its and downstream approvals");
 await locked(page,4);
 check(await page.locator("#openPractice").isHidden(),"Final lab re-locks after changing completed answer");
 await edit(page,3,"B4","=B2+B3");
 await testFeedback(page,3);
 await unlocked(page,4);
 await page.locator("#lesson-3 .live-reset").click();
 check((await page.locator("#progressLabel").innerText()).includes("2 de 7"),"Reset invalidates exercise completion");
 await locked(page,4);
 await page.setViewportSize({width:390,height:844});
 check(await page.locator("#lesson-1 .live-sheet").isVisible(),"Workbook works at 390px mobile viewport");
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 check(overflow<12,"No page-level mobile horizontal overflow ("+overflow+"px)");
 check(errors.length===0,"No uncaught Chromium JavaScript exceptions: "+errors.join(" | "));
 console.log("SENIOR SEQUENTIAL QA PASS —",count,"assertions");
}finally{await browser.close()}
