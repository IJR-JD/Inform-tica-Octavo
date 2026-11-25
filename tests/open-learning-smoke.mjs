import assert from "node:assert/strict";
import {chromium} from "playwright";
import {mkdir} from "node:fs/promises";
const base=(process.env.TI8_BASE||"http://127.0.0.1:8765/").replace(/\/?$/,"/");
const release=process.env.TI8_RELEASE||"";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
await mkdir("qa-public",{recursive:true});
try{
 if(release){
  let seen="";for(let i=0;i<12;i++){try{const response=await fetch(base+"release.json?check="+release+"-"+i,{cache:"no-store"});if(response.ok){seen=(await response.json()).commit;if(seen===release)break}}catch{}await new Promise(r=>setTimeout(r,5000))}
  assert.equal(seen,release,"GitHub Pages must serve the exact deployed commit");
 }
 for(const n of [1,2,3,4]){
  const path="unidad-0"+n+"-excel/",count=n===1?7:5,lesson=n===1?"#lesson-":"#module-step-",fallback=n===1?"#unit1Fallback":"#moduleFallback";
  const context=await browser.newContext({viewport:{width:1366,height:900}});const page=await context.newPage();const errors=[];page.on("pageerror",e=>errors.push(e.message));
  const response=await page.goto(base+path+"?release="+(release||"local"),{waitUntil:"domcontentloaded"});assert.equal(response.status(),200);
  await page.locator('html[data-learning-ready="true"]').waitFor({state:"attached",timeout:20000});
  assert.equal(await page.locator("#lockedModule").count(),0);assert.equal(await page.locator(fallback).isVisible(),false);
  assert.match(await page.locator(n===1?"#percent":"#modulePercent").innerText(),/^0%$/);
  for(let i=1;i<=count;i++){assert.ok(await page.locator(lesson+i).isVisible(),"All lessons visible");assert.ok(await page.locator(lesson+i+" .live-spreadsheet").isVisible(),"All worksheets visible");}
  assert.equal(await page.locator(".study-video video").count(),count);
  assert.equal(await page.evaluate(()=>localStorage.getItem("ijr-ti8-excel-practice-v3")),null);
  if(n===1){assert.ok(await page.locator("#openPractice").isVisible());await page.locator("#openPractice").click();assert.equal(await page.locator("#steps button:enabled").count(),7)}
  await page.locator(lesson+count).scrollIntoViewIfNeeded();await page.screenshot({path:"qa-public/module-"+n+".png"});
  assert.deepEqual(errors,[]);await context.close();
  const offline=await browser.newContext({javaScriptEnabled:false});const plain=await offline.newPage();await plain.goto(base+path+"?plain="+(release||"local"));assert.ok(await plain.locator(fallback).isVisible());assert.equal(await plain.locator(fallback+" .ti8-static-lesson").count(),count);await offline.close();
  console.log("PASS module "+n+": "+count+" open lessons and worksheets, no prerequisites, static fallback");
 }
}finally{await browser.close()}