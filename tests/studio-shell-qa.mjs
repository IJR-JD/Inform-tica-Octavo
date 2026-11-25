import { chromium } from "playwright";
import assert from "node:assert/strict";
const browser=await chromium.launch({headless:true});
const paths=["","unidad-00-diagnostico/","unidad-01-excel/","unidad-02-excel/","unidad-03-excel/","unidad-04-excel/","excel-sandbox/"];
const origin="http://127.0.0.1:8765/";
try{
 for(const width of [375,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const path of paths){
   const response=await page.goto(origin+path);
   assert.equal(response.status(),200,path);
   const nav=page.locator(".studio-nav");
   assert.equal(await nav.locator("a").count(),7,path+" nav");
   assert.equal(await nav.locator('[aria-current="page"]').count(),1,path+" active");
   const hrefs=await nav.locator("a").evaluateAll(as=>as.map(a=>a.href));
   assert.deepEqual(hrefs,paths.map(p=>origin+p));
   assert.equal(await nav.locator('[aria-current="page"]').evaluate(a=>a.href),origin+path);
   assert.ok(await page.evaluate(()=>[...document.styleSheets].some(s=>s.href?.includes("studio-shell.css"))),path+" stylesheet");
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),path+" overflow at "+width);
   if(!path){assert.match(await page.locator("#diagnosticModule").innerText(),/30 minutos/);assert.match(await page.locator("#diagnosticModule").innerText(),/Correo institucional obligatorio/);}
   console.log("PASS",width,path||"home");
  }
  await page.close();
 }
}finally{await browser.close();}
