import assert from "node:assert/strict";
import "../excel-core.js";
const {evaluate,translate}=globalThis.TI8Excel;
const data={B2:"10",B3:"texto",B4:"20",C2:"Fruta",C3:"Útiles",C4:"Fruta",D2:"-10",D4:"-20",E2:"0",E3:"=1/0"};
const cases=[
["=SUMA(B2:B4)",30],["=PROMEDIO(B2:B5)",15],["=CONTAR(B2:B5)",2],["=CONTARA(B2:B5)",3],["=CONTAR.BLANCO(B2:B5)",1],["=MIN(D2:D5)",-20],["=MAX(D2:D5)",-10],["=PROMEDIO(H2:H5)","#DIV/0!"],["=SI(E2=0;0;10/E2)",0],['=SI(B2>0;"Muy alto";"Bajo")',"Muy alto"],["=SI.ERROR(E3;5)",5],["=2^3",8],["=20%",0.2],["=SUMA(1;2)",3],["=SUM(1,2)",3,"en"],["=SUMA($B$2:$B$4)",30],["=CONTAR(E2:E3)",1],["=SUMA(E2:E3)","#DIV/0!"],['=CONTAR.SI(C2:C4;"Fruta")',2],['=SUMAR.SI(C2:C4;"Fruta";B2:B4)',30],['=PROMEDIO.SI(C2:C4;"Fruta";B2:B4)',15],['=CONTAR.SI(C2:C4;"F*")',2],["=REDONDEAR(2,675;2)",2.68],["=REDONDEAR(-2,5;0)",-3],["=MEDIANA(B2:B4)",15],["=PRODUCTO(B2:B4)",200],["=Y(B2>0;B4>0)",true],["=O(B2<0;B4>0)",true],["=NO(FALSO)",true],["=ABS(-3)",3],["=RAIZ(9)",3],["=POTENCIA(2;4)",16],['=CONCATENAR("Hola";" mundo")',"Hola mundo"],['=LARGO("Hola mundo")',10],['=MAYUSC("hola")',"HOLA"],['=MINUSC("HOLA")',"hola"],["=B2*C2","#¡VALOR!"],["=Z1","#¡REF!"],["=A1","#CIRCULAR!"],["=2+3*4",14],["=(2+3)*4",20],["=1,5+2,5",4],["=B2+B4",30],["=B5",0],["=DESCONOCIDA(1)","#¿NOMBRE?"]];
for(const [formula,expected,locale="es"] of cases)assert.equal(evaluate({...data,A1:formula},"A1",{locale}).value,expected,formula);
assert.equal(translate("=$B$1*A2",1,0),"=$B$1*A3");
assert.equal(translate("=B$2+$C3",1,1),"=C$2+$C4");
assert.equal(translate('=SI(A1>0;"A1";B2)',1,0),'=SI(A2>0;"A1";B3)');
console.log("PASS "+(cases.length+3)+" Excel core cases");