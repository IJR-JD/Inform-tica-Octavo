import {chromium} from "playwright";
import assert from "node:assert/strict";
const browser=await chromium.launch({headless:true});
const p=await browser.newPage({viewport:{width:1440,height:900}});
const origin="http://127.0.0.1:8765/";
const errors=[];p.on("pageerror",e=>errors.push(e.message));p.on("dialog",d=>d.accept());
async function select(k){const box=p.locator("#nameBox");await box.fill(k);await box.press("Enter")}
async function edit(k,formula){await select(k);const bar=p.locator("#formula");await bar.fill(formula);await bar.press("Enter")}
const value=k=>p.locator('td[data-cell="'+k+'"]').innerText();
try{
 await p.goto(origin+"excel-sandbox/?exercise=functions");
 assert.equal(await value("B2"),"12");
 const formulas=["=SUMA(B2:B6)","=PROMEDIO(B2:B6)","=MAX(B2:B6)","=MIN(B2:B6)","=CONTAR(B2:B6)","=CONTARA(A2:A6)",'=CONTAR.SI(C2:C6;"Útiles")','=SUMAR.SI(C2:C6;"Fruta";B2:B6)','=PROMEDIO.SI(C2:C6;"Fruta";B2:B6)','=SI(B2>=10;"ALTO";"BAJO")'];
 for(let i=0;i<formulas.length;i++)await edit("F"+(i+2),formulas[i]);
 await p.locator("#checkFunctions").click();assert.match(await p.locator("#functionsFeedback").innerText(),/10\/10/);
 await edit("H1","=$B$2+B3");await select("H1");await p.locator("#fillDown").click();assert.equal(await p.locator("#formula").inputValue(),"=$B$2+B4");assert.equal(await value("H2"),"27");
 await p.reload();assert.equal(await value("F3"),"10");assert.equal(await value("H2"),"27");
 await p.locator("#formulaLocale").selectOption("en");await edit("I1","=SUM(1,2)");assert.equal(await value("I1"),"3");await p.reload();assert.equal(await p.locator("#formulaLocale").inputValue(),"en");assert.equal(await value("I1"),"3");
 assert.deepEqual(errors,[]);console.log("PASS: ten optional challenges, live calculations, fill-down and locale persistence");
}finally{await browser.close()}