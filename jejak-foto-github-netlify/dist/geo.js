(function(root){
  'use strict';
  const clean=v=>typeof v==='string'?v.trim():'';
  function distance(a,b){const r=x=>x*Math.PI/180;const q=Math.sin(r(b.latitude-a.latitude)/2)**2+Math.cos(r(a.latitude))*Math.cos(r(b.latitude))*Math.sin(r(b.longitude-a.longitude)/2)**2;return 6371000*2*Math.atan2(Math.sqrt(q),Math.sqrt(Math.max(0,1-q)))}
  function valid(p,now=Date.now()){const c=p?.coords;return !!c&&Number.isFinite(c.latitude)&&Math.abs(c.latitude)<=90&&Number.isFinite(c.longitude)&&Math.abs(c.longitude)<=180&&Number.isFinite(c.accuracy)&&c.accuracy>0&&Number.isFinite(p.timestamp)&&now-p.timestamp>=-5000&&now-p.timestamp<=60000}
  function choose(samples,p,now=Date.now()){
    if(!valid(p,now))return {samples,position:null};
    let list=samples.filter(x=>valid(x,now)&&now-x.timestamp<=15000);
    const previous=list.at(-1);
    if(previous&&p.timestamp<previous.timestamp)return {samples:list,position:null};
    if(previous&&distance(previous.coords,p.coords)>Math.max(30,previous.coords.accuracy+p.coords.accuracy))list=[];
    list.push(p);list=list.slice(-15);
    return {samples:list,position:list.reduce((a,b)=>b.coords.accuracy<=a.coords.accuracy?b:a)};
  }
  function address(data){
    const a=data?.address||{},fields={};
    // Keep every supplied administrative level. Do not guess local equivalents.
    for(const k of ['house_number','road','pedestrian','residential','footway','neighbourhood','hamlet','quarter','village','suburb','city_district','district','borough','municipality','city','town','county','state_district','state','postcode','country'])if(clean(a[k]))fields[k]=clean(a[k]);
    const values=[],seen=new Set();
    const add=v=>{const t=clean(v),key=t.toLocaleLowerCase('id-ID');if(t&&!seen.has(key)){seen.add(key);values.push(t)}};
    const road=fields.road||fields.pedestrian||fields.residential||fields.footway;
    add(road?road+(fields.house_number?' No. '+fields.house_number:''):'');
    for(const k of ['neighbourhood','hamlet','quarter','village','suburb','city_district','district','borough','municipality','city','town','county','state_district','state','postcode','country'])add(fields[k]);
    return {text:values.join(', ')||clean(data?.display_name),fields,missing:[!road?'nama jalan':null,!(fields.city||fields.town||fields.county||fields.municipality)?'kota/kabupaten':null,!fields.postcode?'kode pos':null].filter(Boolean)};
  }
  const api={distance,valid,choose,address};root.JejakGeo=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
