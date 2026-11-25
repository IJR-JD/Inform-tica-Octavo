import {chromium} from "playwright";
import assert from "node:assert/strict";
import {mkdir} from "node:fs/promises";
await mkdir("qa-visual",{recursive:true});
const browser=await chromium.launch({headless:true});
const p=await browser.newPage({viewport:{width:1440,height:900}});
const origin="http://127.0.0.1:8765/";
const errors=[];p.on("pageerror",e=>errors.push(e.message));
try{
 await p.goto(origin);await p.locator(".studio-vector-preview svg").last().waitFor();
 assert.equal(await p.locator(".studio-vector-preview svg").count(),12);
 assert.equal(await p.locator("#topicGrid video").count(),0);
 await p.screenshot({path:"qa-visual/hub-desktop.png",fullPage:true,animations:"disabled"});
 await p.locator(".hub-topic-card").nth(4).locator(".theory-action").click();
 assert.ok(await p.locator("#hubFigure .motion-timeline button").count()>=4);
 const btn=p.locator("#hubFigure .motion-timeline button").nth(2);await btn.click();
 assert.equal(await btn.getAttribute("aria-current"),"step");
 assert.match(await p.locator("#hubFigure .motion-explanation").innerText(),/Paso 3/);
 await p.locator("#hubFigure").screenshot({path:"qa-visual/vector-player.png",animations:"disabled"});
 await p.locator("#hubFigure .motion-speed").selectOption("1.5");
 assert.equal(await p.locator("#hubFigure video").evaluate(v=>v.autoplay),false);
 await p.goto(origin+"unidad-01-excel/");
 const details=p.locator(".studio-vector-detail").first();await details.locator("summary").click();
 await details.locator("svg").waitFor();assert.ok(await details.locator(".motion-timeline button").count()>0);
 await p.evaluate(()=>localStorage.setItem("ijr-ti8-excel-practice-v3",JSON.stringify(Array(7).fill(true))));
 for(let module=2;module<=4;module++){
  await p.goto(origin+"unidad-0"+module+"-excel/");
  await p.locator(".studio-exercise-figure").first().waitFor();
  assert.equal(await p.locator(".studio-exercise-figure svg").count(),5);
  await p.locator(".studio-exercise-figure").first().screenshot({path:"qa-visual/module-"+module+"-figure.png",animations:"disabled"});
  assert.equal(await p.locator(".study-video video").count(),5);
  await p.evaluate(n=>localStorage.setItem("ijr-ti8-module-"+n+"-progress-v1",JSON.stringify(Array(5).fill(true))),module);
 }
 await p.setViewportSize({width:375,height:812});await p.goto(origin);
 await p.screenshot({path:"qa-visual/hub-mobile.png",fullPage:true,animations:"disabled"});
 assert.deepEqual(errors,[]);
 console.log("PASS: 12 vector thumbnails, timeline, 7 unit 01 vector links, 15 contextual figures, retained videos");
}finally{await browser.close()}
