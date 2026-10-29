/* Hero Math: play a recorded ElevenLabs clip for any spoken line that has one; iPad/browser voice for everything else.
   Hooks speechSynthesis.speak, so every speaking path (say(), dad(), call, globe, Story Lab) is covered. */
(function(){
 const SS=window.speechSynthesis;if(!SS||!window.HM_VOICE)return;
 const norm=t=>String(t).toLowerCase().replace(/&nbsp;/g,' ').replace(/[’‘]/g,"'").replace(/[^a-z0-9' ]+/g,' ').replace(/\s+/g,' ').trim();
 const IDX={};for(const k in HM_VOICE)IDX[norm(k)]=HM_VOICE[k];
 const sadie=()=>!!window.GS_MODE;
 function choose(list){if(!list)return null;
  const want=sadie()?['G','B']:['S','B'];let c=list.filter(x=>want.includes(x[2]));if(!c.length)c=list;
  if(sadie()){const g=c.filter(x=>x[1]!=='Spidey');if(g.length)c=g}else{const s=c.filter(x=>x[1]!=='Ghost');if(s.length)c=s}
  const b=c.find(x=>x[1]==='Blake');return 'audio/voice/'+(b||c[0])[0]+'.mp3'}
 function aliases(n){const a=[n];if(sadie()){
   a.push(n.replace(/\bsadie\b(?! grace| poo)/g,'sadie grace'),n.replace(/\bsweetie\b/g,'sadie grace'),n.replace(/\bsweetie\b/g,'sadie poo'),n.replace(/\bsadie\b(?! grace| poo)/g,'sadie poo'))}
  return a}
 function find(t){const n=norm(t);if(!n)return null;for(const x of aliases(n)){if(IDX[x])return choose(IDX[x])}return null}
 window.HM_VOICE_FIND=find;
 // split into sentences, then greedily take the longest run of sentences that has a clip
 function plan(text){const parts=String(text).match(/[^.!?…]+[.!?…]*\s*/g)||[String(text)];const out=[];let i=0;
  while(i<parts.length){let hit=null,j;for(j=parts.length;j>i;j--){const f=find(parts.slice(i,j).join(''));if(f){hit=f;break}}
   if(hit){out.push({clip:hit});i=j}else{const s=parts[i];if(out.length&&out[out.length-1].tts!=null)out[out.length-1].tts+=s;else out.push({tts:s});i++}}
  return out.filter(p=>p.clip||norm(p.tts))}
 const origSpeak=SS.speak.bind(SS),origCancel=SS.cancel.bind(SS);let cur=null,token=0;
 window.HM_VOICE_STATS={clips:0,tts:0,last:null};
 SS.cancel=function(){token++;if(cur){try{cur.pause()}catch(e){}cur=null}return origCancel()};
 try{const d=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(SS),'speaking');
  Object.defineProperty(SS,'speaking',{configurable:true,get(){return !!cur||(d&&d.get?d.get.call(SS):false)}})}catch(e){}
 SS.speak=function(u){const steps=plan(u.text||'');
  if(!steps.some(s=>s.clip)){HM_VOICE_STATS.tts++;return origSpeak(u)}
  const my=++token;let started=false;
  const fin=ok=>{cur=null;if(my!==token)return;try{(ok?u.onend:u.onerror||u.onend)&&(ok?u.onend:(u.onerror||u.onend)).call(u,{type:ok?'end':'error'})}catch(e){}};
  const step=k=>{if(my!==token)return;if(k>=steps.length){fin(true);return}const s=steps[k];
   const start=()=>{if(!started){started=true;try{u.onstart&&u.onstart.call(u,{type:'start'})}catch(e){}}};
   if(s.clip){const a=new Audio(s.clip);a.volume=u.volume==null?1:u.volume;cur=a;HM_VOICE_STATS.clips++;HM_VOICE_STATS.last=s.clip;
    a.onplaying=start;a.onended=()=>{cur=null;step(k+1)};
    a.onerror=()=>{cur=null;speakTTS(s.clip,k)};a.play().catch(()=>{cur=null;speakTTS(s.clip,k)})}
   else{const v=new SpeechSynthesisUtterance(s.tts);['lang','voice','rate','pitch','volume'].forEach(p=>{try{v[p]=u[p]}catch(e){}});
    v.onstart=start;v.onend=()=>step(k+1);v.onerror=()=>step(k+1);HM_VOICE_STATS.tts++;origSpeak(v)}};
  // clip failed (missing file / autoplay block): read that piece with the browser voice instead
  const speakTTS=(clip,k)=>{const txt=(Object.keys(HM_VOICE).find(t=>choose(HM_VOICE[t])===clip))||'';
   const v=new SpeechSynthesisUtterance(txt);['lang','voice','rate','pitch','volume'].forEach(p=>{try{v[p]=u[p]}catch(e){}});
   v.onend=()=>step(k+1);v.onerror=()=>step(k+1);HM_VOICE_STATS.tts++;origSpeak(v)};
  step(0)};
})();
