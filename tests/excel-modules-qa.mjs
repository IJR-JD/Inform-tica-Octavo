/* IJR · Senior QA for all four Excel modules: 15 new real-cell exercises.
 * Module 01 validated in the existing excel-ux-qa.mjs and excel-edge-qa.mjs.
 * This file checks independent module access, sequential exercise verification, formulas and charts.
 */
import assert from "node:assert/strict";
import {chromium} from "playwright";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const ORIGIN="http://127.0.0.1:8765";
let tests=0;
const ok=(value,label)=>{assert.ok(value,label);tests++;console.log("PASS:",label)};
const root=(n)=>ORIGIN+"/unidad-0"+n+"-excel/";
const td=(p,i,ref)=>p.locator("#module-step-"+i+' td[data-cell="'+ref+'"]');
async function edit(p,i,ref,value){
 const c=td(p,i,ref);
 await c.click();
 const input=c.locator("input.live-cell-editor");
 await input.waitFor({state:"visible"});
 await input.fill(value);
 await input.press("Enter");
}
async function value(p,i,ref){
 return (await td(p,i,ref).locator(".live-cell-view").innerText()).trim();
}
async function verify(p,i,shouldPass=true){
 await p.locator("#module-step-"+i+" .live-check").click();
 const text=await p.locator("#module-step-"+i+" .live-feedback").innerText();
 ok(shouldPass?text.includes("registrado y aprobado"):text.includes("Revisa"),"Exercise "+i+": "+(shouldPass?"accepted":"rejected")+" "+text.slice(0,90));
}
async function lock(p,i){
 ok(await p.locator("#module-step-"+i).isVisible(),"Exercise "+i+" remains available");
 const nav=p.locator('#moduleNav [data-module-link="'+i+'"]');
 ok(await nav.getAttribute("href")==="#module-step-"+i,"Direct link to exercise "+i);
}
async function visible(p,i){
 ok(await p.locator("#module-step-"+i).isVisible(),"Exercise "+i+" accessible");
}
async function launch(p,n){
 const r=await p.goto(root(n),{waitUntil:"domcontentloaded"});
 ok(r?.status()===200,"Module "+n+" HTTP 200");
 await p.locator("#moduleLessons .module-lesson").first().waitFor({state:"visible"});
 ok(await p.locator("#moduleLessons .module-lesson").count()===5,"Module "+n+" has 5 editable lessons");
 ok(await p.locator(".study-video video").count()===5,"Module "+n+" retains 5 HD videos");
 ok(await p.locator(".module-sheet").count()===5,"Module "+n+" uses 5 working spreadsheets");
 ok(await p.locator("#modulePercent").innerText()==="0%","Module "+n+" initially at 0%");
 await visible(p,1);
 for(let i=2;i<=5;i++)await lock(p,i);
}
const page=await browser.newPage({viewport:{width:1440,height:960}});
const errors=[];
page.on("pageerror",e=>errors.push(String(e)));
try{
 await page.goto(ORIGIN+"/");
 await page.evaluate(()=>localStorage.clear());
 // A fresh browser can independently access each module without falsifying completion.
 for(const n of [2,3,4]){
  await launch(page,n);
  ok(await page.locator("#lockedModule").count()===0,"Module "+n+" contains no prerequisite wall");
  ok(await page.locator("#moduleContent").isVisible(),"Module "+n+" content is accessible");
  ok(await page.locator("#module-step-1 .module-sheet").isVisible(),"Module "+n+" first practice is editable");
 }
 ok(await page.evaluate(()=>localStorage.getItem("ijr-ti8-excel-practice-v3"))===null,"Opening later modules does not fabricate Module 1 progress");
 await page.goto(ORIGIN+"/");
 for(let i=0;i<4;i++)ok((await page.locator(".hub-topic-card").nth(i).locator(".hub-topic-status").innerText()).includes("AVAILABLE"),"Hub module "+(i+1)+" is available");
 await launch(page,2);
 await edit(page,5,"D4","=B2*C2+B3*C3");await verify(page,5);
 ok(await page.locator("#modulePercent").innerText()==="20%","Exercise 5 verified before exercise 1");
 await page.reload();ok(await page.locator("#modulePercent").innerText()==="20%","Out-of-order approval persists");
 await page.evaluate(()=>{localStorage.removeItem("ijr-ti8-module-2-progress-v1");localStorage.removeItem("ijr-ti8-module-2-cells-v1");localStorage.setItem("ijr-ti8-excel-practice-v3",JSON.stringify(Array(7).fill(true)))});
 await launch(page,2);
 await verify(page,1,false);
 await edit(page,1,"B4","=B2+B3");
 ok(await value(page,1,"B4")==="13","Module 2 addition computes 13");
 await verify(page,1);
 await visible(page,2);
 await edit(page,2,"B4","=B2-B3");ok(await value(page,2,"B4")==="17","Module 2 subtraction computes 17");
 await verify(page,2);
 await visible(page,3);
 await edit(page,3,"D2","=B2*C2");ok(await value(page,3,"D2")==="14000","Module 2 multiplication computes 14000");
 await verify(page,3);
 await visible(page,4);
 await edit(page,4,"D2","=B2/C2");ok(await value(page,4,"D2")==="4000","Module 2 division computes 4000");
 await verify(page,4);
 await visible(page,5);
 await edit(page,5,"D4","=B2*C2+B3*C3");ok(await value(page,5,"D4")==="17500","Module 2 precedence computes 17500");
 await verify(page,5);
 ok(await page.locator("#modulePercent").innerText()==="100%","Module 2 registers 5/5 exercises");
 ok(await page.locator("#finishModule").isVisible(),"Module 3 link available after 5/5");
 await page.reload({waitUntil:"domcontentloaded"});
 await page.locator("#module-step-5 .module-sheet").waitFor({state:"visible"});
 ok(await page.locator("#modulePercent").innerText()==="100%","Module 2 persists progress after reload");
 ok(await value(page,5,"D4")==="17500","Module 2 persists entered formulas");

 await launch(page,3);
 ok(await value(page,1,"C2")==="#DIV/0!","Module 3 starts with genuine division-by-zero error");
 await verify(page,1,false);
 await edit(page,1,"B3","2");ok(await value(page,1,"C2")==="5","Module 3 corrects divisor without deleting formula");
 await verify(page,1);
 await visible(page,2);
 ok(await value(page,2,"D2")==="16","Module 3 incorrect reference yields wrong total 16");
 await edit(page,2,"D2","=B2+B3");ok(await value(page,2,"D2")==="12","Module 3 corrected reference yields 12");
 await verify(page,2);
 await visible(page,3);
 ok((await value(page,3,"D2")).startsWith("#"),"Module 3 malformed multiplication reports formula error");
 await edit(page,3,"D2","=B2*C2");ok(await value(page,3,"D2")==="7500","Module 3 operator correction yields 7500");
 await verify(page,3);
 await visible(page,4);
 ok((await value(page,4,"D2")).startsWith("#"),"Module 3 text in numeric field reports error");
 await edit(page,4,"B2","4");ok(await value(page,4,"D2")==="12000","Module 3 text-to-number correction yields 12000");
 await verify(page,4);
 await visible(page,5);
 ok(await value(page,5,"C2")==="#CIRCULAR!","Module 3 identifies circular reference");
 await edit(page,5,"C2","=B2+D2");ok(await value(page,5,"C2")==="15","Module 3 circular reference resolved");
 await verify(page,5);
 ok(await page.locator("#modulePercent").innerText()==="100%","Module 3 registers 5/5 exercises");

 await launch(page,4);
 const chart=page.locator("#module-step-1 .module-chart svg");
 ok(await chart.isVisible(),"Module 4 renders bar chart");
 const bar=chart.locator('[data-chart-row="3"]');
 const initialWidth=Number(await bar.getAttribute("width"));
 ok(initialWidth>0,"Module 4 bar chart displays quantitative values");
 await edit(page,1,"B5","=SUMA(B2:B4)");ok(await value(page,1,"B5")==="80","Module 4 sum is 80");
 await verify(page,1);
 await visible(page,2);
 await edit(page,2,"D2","Pera");await verify(page,2);
 await visible(page,3);
 const oldWidth=Number(await page.locator('#module-step-3 .module-chart [data-chart-row="2"]').getAttribute("width"));
 await edit(page,3,"B3","40");
 await edit(page,3,"B5","=SUMA(B2:B4)");
 ok(await value(page,3,"B5")==="85","Module 4 totals 85 after updated sales");
 const changedWidth=Number(await page.locator('#module-step-3 .module-chart [data-chart-row="2"]').getAttribute("width"));
 ok(changedWidth<oldWidth,"Module 4 bars recompute proportionally when source data changes");
 await verify(page,3);
 await visible(page,4);
 await edit(page,4,"D2","=B3-B2");ok(await value(page,4,"D2")==="15","Module 4 category difference is 15");
 await verify(page,4);
 await visible(page,5);
 await edit(page,5,"B5","=SUMA(B2:B4)");
 await edit(page,5,"D2","Ventas semanales");
 await edit(page,5,"D3","Pera");
 await verify(page,5);
 ok(await page.locator("#modulePercent").innerText()==="100%","Module 4 registers 5/5 exercises");
 ok(await page.locator("#finishModule").isVisible(),"Four-module milestone unlocked");
 await page.goto(ORIGIN+"/",{waitUntil:"domcontentloaded"});
 await page.locator(".hub-topic-card").first().waitFor();
 for(let index=0;index<4;index++){
  const card=page.locator(".hub-topic-card").nth(index);
  ok((await card.locator(".hub-topic-status").innerText()).includes("COMPLETED"),"Learning Hub card "+(index+1)+" reflects verified completion");
  ok((await card.locator(".hub-topic-progress strong").innerText()).includes("100%"),"Learning Hub card "+(index+1)+" shows 100%");
 }
 await page.locator(".hub-topic-card").nth(3).locator(".theory-action").click();
 ok(page.url().includes("/unidad-04-excel/"),"Hub fourth module card routes to working fourth module");
 await page.locator("#module-step-5 .module-sheet").waitFor({state:"visible"});
 await page.reload({waitUntil:"domcontentloaded"});
 await page.locator("#module-step-5 .module-sheet").waitFor({state:"visible"});
 ok(await page.locator("#modulePercent").innerText()==="100%","Module 4 progress persists");
 await edit(page,3,"B3","39");
 await lock(page,4);
 ok(await page.locator("#modulePercent").innerText()==="80%","Only edited exercise approval is revoked");
 await edit(page,3,"B3","40");
 await verify(page,3);
 await visible(page,4);
 await page.setViewportSize({width:375,height:812});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 ok(overflow<12,"All modules mobile layout avoids page overflow: "+overflow+"px");
 ok(errors.length===0,"No uncaught browser errors: "+errors.join("; "));
 console.log("MODULES 02–04 SENIOR QA PASS:",tests,"assertions");
}finally{await browser.close()}
