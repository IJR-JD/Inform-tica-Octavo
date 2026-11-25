/* Exact exercise illustrations, generated from the lesson seed and editable targets.
 * Never insert expected answer formulas or target results into the figure. */
(()=>{
"use strict";
const ns="http://www.w3.org/2000/svg";
const el=(tag,attrs={},parent)=>{const n=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);if(parent)parent.append(n);return n};
const txt=(parent,x,y,value,attrs={})=>{const t=el("text",{x,y,...attrs},parent);t.textContent=String(value);return t};
const html=(tag,cls,value)=>{const n=document.createElement(tag);n.className=cls;if(value!==undefined)n.textContent=value;return n};
window.TI8ExerciseFigure=item=>{
 const root=html("figure","studio-exercise-figure"),svg=el("svg",{viewBox:"0 0 800 450",role:"img","aria-label":"Hoja de datos del ejercicio: "+item.title},root);
 const title=el("title",{},svg);title.textContent=item.title;
 const refs=[...Object.keys(item.seed||{}),...Object.keys(item.targets||{})].filter(k=>/^[A-Z][1-9][0-9]*$/.test(k));
 const cols=Math.max(3,...refs.map(k=>k.charCodeAt(0)-64)),rows=Math.max(4,...refs.map(k=>Number(k.slice(1))));
 const left=50,top=93,width=700,height=284,rh=height/(rows+1),cw=(width-42)/cols;
 el("rect",{x:0,y:0,width:800,height:450,rx:8,fill:"#f7f8fa"},svg);
 txt(svg,50,38,"DATOS DEL EJERCICIO",{fill:"#4b5563","font-size":12,"font-weight":750,"letter-spacing":2});
 txt(svg,50,68,item.title,{"font-size":23,"font-weight":750,fill:"#17202b",...(item.title.length>49?{textLength:690,lengthAdjust:"spacingAndGlyphs"}:{})});
 el("rect",{x:left,y:top,width,height,rx:4,fill:"#fff",stroke:"#cbd2da"},svg);
 for(let c=0;c<cols;c++){const x=left+42+c*cw;el("rect",{x,y:top,width:cw,height:rh,fill:"#e9edf1",stroke:"#cbd2da"},svg);txt(svg,x+cw/2,top+rh/2+5,String.fromCharCode(65+c),{"text-anchor":"middle","font-size":15,"font-weight":700,fill:"#4b5563"})}
 for(let r=1;r<=rows;r++){const y=top+r*rh;el("rect",{x:left,y,width:42,height:rh,fill:"#e9edf1",stroke:"#cbd2da"},svg);txt(svg,left+21,y+rh/2+5,r,{"text-anchor":"middle","font-size":14,fill:"#4b5563"});
  for(let c=0;c<cols;c++){const k=String.fromCharCode(65+c)+r,x=left+42+c*cw,target=Object.hasOwn(item.targets||{},k),raw=item.seed?.[k]??"",v=String(raw);
   el("rect",{x,y,width:cw,height:rh,fill:target?"#e5f3eb":"#fff",stroke:target?"#245f45":"#d9dfe5","stroke-width":target?2:1},svg);
   if(v){const label=txt(svg,x+7,y+rh/2+5,v,{"font-size":Math.min(16,Math.max(10,(cw-14)/Math.max(1,v.length)*1.65)),fill:v.startsWith("=")?"#245f45":"#17202b","font-family":v.startsWith("=")?"monospace":"sans-serif"});if(v.length*8>cw-14){label.setAttribute("textLength",cw-14);label.setAttribute("lengthAdjust","spacingAndGlyphs")}}
  }
 }
 el("rect",{x:50,y:404,width:14,height:14,fill:"#e5f3eb",stroke:"#245f45","stroke-width":2},svg);txt(svg,74,416,"Celdas objetivo · completa o corrige en la hoja editable",{"font-size":15,fill:"#374151"});
 root.append(html("figcaption","studio-figure-caption","Figura vectorial vinculada a los datos reales de esta actividad. Las celdas verdes son las que debes resolver."));
 return root;
};
})();