const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/../dist/index.html','utf8'),src=fs.readFileSync(__dirname+'/../dist/app.js','utf8');
for(const m of src.matchAll(/\$\('([^']+)'\)/g))assert.ok(html.includes('id="'+m[1]+'"'),'missing '+m[1]);
const els={},drawn=[],timers=[];let fetchCount=0;
function el(id){return els[id]??={value:id==='brightness'?'0':'',style:{},checked:false,disabled:false,hidden:false,open:false,classList:{toggle(){}},parentElement:{style:{}},replaceChildren(){},showModal(){this.open=true},close(){this.open=false}}}
function canvas(){const c={width:0,height:0,toBlob(fn){fn(new Blob(['jpeg'],{type:'image/jpeg'}))}};c.getContext=()=>({canvas:c,drawImage(){},measureText:t=>({width:t.length*8}),fillText(t){drawn.push(t)},fillRect(){},createLinearGradient:()=>({addColorStop(){}}),getImageData:()=>({data:new Uint8ClampedArray(48*48*4).fill(120)}),putImageData(){}});return c}
const c={Date,Math,Number,Promise,URL,URLSearchParams,AbortController,Set,Uint32Array,Blob,File,JejakGeo:require('../dist/geo.js'),navigator:{canShare:()=>false},document:{hidden:true,getElementById:el,addEventListener(){},createElement:tag=>tag==='canvas'?canvas():{click(){},remove(){}},body:{append(){}}},localStorage:{getItem:()=>'',setItem(){}},sessionStorage:{getItem:()=>null,setItem(){}},setInterval(){},setTimeout(fn){timers.push(fn);return timers.length},clearTimeout(){},indexedDB:{open(){const req={};queueMicrotask(()=>req.onerror());return req}},fetch:async()=>{fetchCount++;return {ok:true,json:async()=>({address:{road:'Jalan Uji',municipality:'Kota Uji',state:'Provinsi Uji'}})}}};
vm.createContext(c);vm.runInContext(src,c);
(async()=>{
 assert.equal(el('start').hidden,false);
 assert.equal(el('flip').disabled,true);
 c.document.hidden=false;
 vm.runInContext('receivePosition({timestamp:Date.now(),coords:{latitude:-6.2,longitude:106.8,accuracy:12}})',c);
 await new Promise(r=>setImmediate(r));
 assert.ok(el('addressStatus').textContent.includes('Kota Uji'));
 assert.ok(el('addressInfo').textContent.includes('kode pos'));
 assert.equal(fetchCount,1);
 await vm.runInContext('reverse(gps,true)',c);assert.equal(fetchCount,1,'rate limited');
 await vm.runInContext('take({},1200,1600)',c);
 assert.ok(drawn.some(t=>t.includes('ID foto: JF-')));
 assert.ok(drawn.some(t=>t.includes('Kota Uji')));
 assert.equal(el('result').open,true);
 await vm.runInContext('take({},1600,900,"import")',c);
 assert.ok(drawn.some(t=>t.includes('Foto impor')));
 await el('share').onclick();assert.match(el('saveStatus').textContent,/Tekan lama/);
 vm.runInContext('gps.timestamp=Date.now()-61000;update()',c);
 assert.match(el('gpsStatus').textContent,/kedaluwarsa/);
 assert.equal(el('addressStatus').textContent,'Alamat otomatis belum tersedia');
 assert.equal(el('map').hidden,true);
 console.log('PASS: DOM references, camera controls, address response, missing fields, throttling, photo export, imported-photo label, sharing fallback and stale GPS');
})().catch(e=>{console.error(e);process.exit(1)});
