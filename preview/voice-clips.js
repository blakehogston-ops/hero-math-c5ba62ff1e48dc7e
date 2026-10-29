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
 const origSpeak=SS.speak.bind(SS),origCancel=SS.cancel.bind(SS);let cur=null,token=0;const live=new Set();
 window.HM_VOICE_STATS={clips:0,tts:0,last:null};
 // ONE voice channel: every clip and every iPad/browser-voice line goes through here. A new line (or cancel) stops whatever is
 // playing first, and every stale callback (play() rejection, onerror, onended, TTS fallback) is ignored, so two lines never overlap.
 const LOG=window.HM_VOICE_LOG=[];const lg=(ev,id)=>{LOG.push({t:Math.round(performance.now()),ev,id});if(LOG.length>500)LOG.shift()};
 // line tracking: HM_VOICE_ONEND(cb) fires when the current spoken line really ends (clip ended / TTS end / stopped),
 // or at a safety timeout = clip duration + 0.5 s (TTS: word-count estimate + 0.5 s)
 let line=null;const endLine=()=>{const l=line;if(!l||l.done)return;l.done=true;clearTimeout(l.st);lg('lineEnd','');l.cbs.splice(0).forEach(f=>{try{f()}catch(e){}})};
 const safety=(l,ms)=>{if(l.done)return;clearTimeout(l.st);l.st=setTimeout(()=>{if(line===l){lg('lineSafety','');endLine()}},ms)};
 window.HM_VOICE_ONEND=cb=>{if(line&&!line.done)line.cbs.push(cb);else cb()};
 function stopAll(){endLine();for(const a of live){try{a.pause();a.removeAttribute('src');a.load()}catch(e){}lg('stop',a.__id)}live.clear();cur=null}
 SS.cancel=function(){token++;stopAll();lg('cancel','');return origCancel()};
 try{const d=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(SS),'speaking');
  Object.defineProperty(SS,'speaking',{configurable:true,get(){return !!cur||(d&&d.get?d.get.call(SS):false)}})}catch(e){}
 const tts=(v,my,id)=>{const os=v.onstart,oe=v.onend,oer=v.onerror;v.onstart=e=>{if(my!==token)return;lg('play','tts:'+id);os&&os(e)};
  v.onend=e=>{lg('end','tts:'+id);if(my!==token)return;oe&&oe(e)};v.onerror=e=>{lg('end','tts:'+id);if(my!==token)return;(oer||oe)&&(oer||oe)(e)};HM_VOICE_STATS.tts++;origSpeak(v)};
 SS.speak=function(u){const txt=u.text||'';if(!txt.trim()){return origSpeak(u)} // silent priming utterance
  token++;stopAll();try{origCancel()}catch(e){}const my=token;const steps=plan(txt);const L=line={done:false,cbs:[]};
  const ttsMs=t=>(String(t).split(/\s+/).length/2.0)*1000/((u.rate||1))+500;
  if(!steps.some(s=>s.clip)){const oe=u.onend,oer=u.onerror;u.onend=e=>{if(line===L)endLine();oe&&oe.call(u,e)};u.onerror=e=>{if(line===L)endLine();(oer||oe)&&(oer||oe).call(u,e)};safety(L,ttsMs(txt)+1500);tts(u,my,txt.slice(0,40));return}
  let started=false;safety(L,ttsMs(txt)+4000); // until the first piece starts
  const fin=ok=>{cur=null;if(my!==token)return;if(line===L)endLine();try{(ok?u.onend:u.onerror||u.onend)&&(ok?u.onend:(u.onerror||u.onend)).call(u,{type:ok?'end':'error'})}catch(e){}};
  const step=k=>{if(my!==token)return;if(k>=steps.length){fin(true);return}const s=steps[k];
   const start=()=>{if(!started){started=true;try{u.onstart&&u.onstart.call(u,{type:'start'})}catch(e){}}};
   if(s.clip){const a=new Audio(s.clip);a.__id=s.clip.replace(/^.*\/|\.mp3$/g,'');a.volume=u.volume==null?1:u.volume;cur=a;live.add(a);HM_VOICE_STATS.clips++;HM_VOICE_STATS.last=s.clip;
    let done=false;const bad=()=>{if(done)return;done=true;live.delete(a);if(my!==token)return;cur=null;speakTTS(s.clip,k)};
    a.onplaying=()=>{if(my!==token){try{a.pause()}catch(e){}return}lg('play',a.__id);start();const rest=steps.slice(k+1).reduce((m,x)=>m+(x.tts?ttsMs(x.tts):3000),0);safety(L,(isFinite(a.duration)?(a.duration-a.currentTime)*1000:4000)+500+rest)};
    a.onended=()=>{done=true;live.delete(a);lg('end',a.__id);if(my!==token)return;cur=null;step(k+1)};
    a.onerror=bad;a.play().catch(bad)}
   else{const v=new SpeechSynthesisUtterance(s.tts);['lang','voice','rate','pitch','volume'].forEach(p=>{try{v[p]=u[p]}catch(e){}});
    v.onstart=()=>{start();safety(L,ttsMs(s.tts)+500)};v.onend=()=>step(k+1);v.onerror=()=>step(k+1);tts(v,my,s.tts.slice(0,40))}};
  // clip failed (missing file / autoplay block): read that piece with the browser voice instead (only if still the current line)
  const speakTTS=(clip,k)=>{if(my!==token)return;const txt=(Object.keys(HM_VOICE).find(t=>choose(HM_VOICE[t])===clip))||'';
   const v=new SpeechSynthesisUtterance(txt);['lang','voice','rate','pitch','volume'].forEach(p=>{try{v[p]=u[p]}catch(e){}});
   v.onend=()=>step(k+1);v.onerror=()=>step(k+1);tts(v,my,'fallback:'+clip)};
  step(0)};
})();
