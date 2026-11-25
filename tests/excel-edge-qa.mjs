/* Additional senior QA: formula bar, keyboard, data persistence, failure modes.
 * Browser-driven tests against deployed-source static site.
 */
import assert from "node:assert/strict";
import {chromium} from "playwright";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
let assertions=0;
const check=(test,msg)=>{assert.ok(test,msg);assertions++;console.log("PASS:",msg)};
try{
 const page=await browser.newPage({viewport:{width:1366,height:900}});
 const errors=[];page.on("pageerror",e=>errors.push(String(e)));
 await page.goto("http://127.0.0.1:8765/unidad-01-excel/?qa=edge",{waitUntil:"domcontentloaded"});
 await page.locator("#lesson-1 .live-sheet").waitFor();
 const td=(lesson,key)=>page.locator("#lesson-"+lesson+' td[data-cell="'+key+'"]');
 async function edit(lesson,key,value){
  await td(lesson,key).click();
  const input=td(lesson,key).locator("input.live-cell-editor");
  await input.fill(value);await input.press("Enter");
 }
 await edit(1,"B2","VENTAS");
 await page.locator("#lesson-1 .live-check").click();
 check((await page.locator("#progressLabel").innerText()).includes("1 de 7"),"Pass lesson 1");
 // Focus and blur the formula bar without editing. It must not mutate approved records.
 const fx1=page.locator("#lesson-1 .live-formula");
 await fx1.focus();
 await fx1.blur();
 check((await page.locator("#progressLabel").innerText()).includes("1 de 7"),"Untouched formula bar blur preserves verified progress");
 check((await td(1,"B2").locator(".live-cell-view").innerText())==="VENTAS","Untouched formula bar does not clear cell");
 // Type a replacement in the formula bar and commit using Enter.
 await td(1,"B2").click();
 await td(1,"B2").locator(".live-cell-editor").press("Escape");
 await fx1.fill("VENTAS");
 await fx1.press("Enter");
 check((await td(1,"B2").locator(".live-cell-view").innerText())==="VENTAS","Formula bar Enter commits original value");
 check((await page.locator("#progressLabel").innerText()).includes("1 de 7"),"Re-entering unchanged value does not revoke completion");
 // Keyboard F2 and Enter.
 await td(2,"A2").focus();
 await td(2,"A2").press("F2");
 await td(2,"A2").locator(".live-cell-editor").fill("Cuaderno");
 await td(2,"A2").locator(".live-cell-editor").press("Enter");
 check((await td(2,"A2").locator(".live-cell-view").innerText())==="Cuaderno","F2 keyboard editing writes a real cell");
 await edit(2,"B2","4");
 await page.locator("#lesson-2 .live-check").click();
 check((await page.locator("#progressLabel").innerText()).includes("2 de 7"),"Lesson 2 completed with keyboard editing");
 // Formula bar should commit a new formula and calculate.
 await td(3,"B4").focus();
 const fx3=page.locator("#lesson-3 .live-formula");
 await fx3.fill("=B2+B3");
 await fx3.press("Enter");
 check((await td(3,"B4").locator(".live-cell-view").innerText())==="13","Formula bar evaluates B2+B3 correctly");
 await page.locator("#lesson-3 .live-check").click();
 check((await page.locator("#progressLabel").innerText()).includes("3 de 7"),"Formula-bar answer accepted for lesson 3");
 // Any modification to a verified calculation revokes it and later lessons.
 await fx3.focus();
 await fx3.blur();
 check((await page.locator("#progressLabel").innerText()).includes("3 de 7"),"Blur without input does not regress calculated result");
 await edit(3,"B2","9");
 check((await page.locator("#progressLabel").innerText()).includes("2 de 7"),"Changing source values invalidates previously verified result");
 check(await page.locator("#lesson-4").isVisible(),"Next lesson remains visible after source change");
 await page.locator("#lesson-3 .live-check").click();
 check((await page.locator("#progressLabel").innerText()).includes("3 de 7"),"Rechecking recalculated formula restores lesson 4");
 // Repair malformed persistence, must not crash.
 await page.evaluate(()=>{
  localStorage.setItem("ijr-ti8-excel-answers-v1",JSON.stringify({"0":{"B2":"VENTAS","malicious":"x","E8":"invalid"}}));
 });
 await page.reload({waitUntil:"domcontentloaded"});
 await page.locator("#lesson-3 .live-sheet").waitFor();
 check((await page.locator("#progressLabel").innerText()).includes("3 de 7"),"Progress still available after malformed answer data");
 check((await td(1,"B2").locator(".live-cell-view").innerText())==="VENTAS","Validated B2 reloads despite junk keys");
 // Mobile usability, media, semantic controls.
 await page.setViewportSize({width:375,height:812});
 check(await page.locator("#lesson-1 .live-sheet").isVisible(),"Mobile worksheet visible");
 const scroll=await page.locator("#lesson-1 .live-sheet-scroll").evaluate(e=>e.scrollWidth>e.clientWidth);
 check(scroll,"Worksheet scrolls internally instead of stretching mobile viewport");
 check((await page.locator(".study-video video").count())===7,"Seven videos retained");
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 check(overflow<12,"No horizontal page overflow at 375px ("+overflow+"px)");
 check(errors.length===0,"No unhandled browser exceptions: "+errors.join(" | "));
 console.log("EDGE QA SUCCESS",assertions,"checks");
}finally{await browser.close()}
