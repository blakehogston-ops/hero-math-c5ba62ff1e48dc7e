/* Hero Math Academy audio: 100% WebAudio-synthesised, original music, no files. */
(function(){
const LS='heroMath.audio';let P={music:true,sfx:true};try{Object.assign(P,JSON.parse(localStorage.getItem(LS)||'{}'))}catch(e){}
function persist(){try{localStorage.setItem(LS,JSON.stringify(P))}catch(e){}}
let ctx=null,mus,sfx,cur=null,want=null,timer=null,step=0,nextT=0;
const mtof=m=>440*Math.pow(2,(m-69)/12);
function build(c){ctx=c;const comp=c.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=3;comp.connect(c.destination);
 mus=c.createGain();mus.gain.value=P.music?0.16:0;mus.connect(comp);sfx=c.createGain();sfx.gain.value=P.sfx?0.5:0;sfx.connect(comp)}
function ensure(){if(!ctx){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;build(new A())}
 if(ctx.state==='suspended'&&!document.hidden)ctx.resume();return ctx}
// ---- voices ----
function tone(dest,f,t,d,{type='sine',v=.3,a=.01,r=null,det=0,cut=0}={}){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;o.detune.value=det;
 let n=o;if(cut){const fl=ctx.createBiquadFilter();fl.type='lowpass';fl.frequency.value=cut;o.connect(fl);n=fl}
 n.connect(g);g.connect(dest);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);
 g.gain.exponentialRampToValueAtTime(.0008,t+d+(r||d*.6));o.start(t);o.stop(t+d+(r||d*.6)+.05)}
function pad(dest,f,t,d,v){[-7,7].forEach(det=>{const o=ctx.createOscillator(),g=ctx.createGain(),fl=ctx.createBiquadFilter();o.type='triangle';o.frequency.value=f;o.detune.value=det;
 fl.type='lowpass';fl.frequency.value=900;o.connect(fl).connect(g).connect(dest);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+d*.4);g.gain.linearRampToValueAtTime(0,t+d);o.start(t);o.stop(t+d+.05)})}
let nb=null;function noise(dest,t,d,v,hp){if(!nb){nb=ctx.createBuffer(1,ctx.sampleRate*.5,ctx.sampleRate);const a=nb.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}
 const s=ctx.createBufferSource(),g=ctx.createGain(),f=ctx.createBiquadFilter();s.buffer=nb;f.type='highpass';f.frequency.value=hp;s.connect(f).connect(g).connect(dest);
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.start(t);s.stop(t+d+.02)}
function kick(dest,t,v){const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.22);o.connect(g).connect(dest);o.start(t);o.stop(t+.25)}
// ---- songs (original melodies) ----
// Map theme "Rooftop Heroes": D major, 116 bpm, 8th-note grid, 64 steps loop. 0 = rest.
const HERO={bpm:116,len:64,
 mel:[74,0,74,76,78,0,81,0, 79,78,76,0,74,0,0,0, 71,0,74,76,78,0,76,74, 76,0,0,0,0,0,0,0,
      74,0,74,76,78,0,81,0, 83,0,81,79,78,0,76,0, 79,78,76,74,76,0,78,0, 74,0,0,0,0,0,0,0],
 chords:[[50,62,66,69],[47,59,62,66],[43,55,59,62],[45,57,61,64],[50,62,66,69],[43,55,59,62],[45,57,61,64],[50,62,66,69]]};
// Focus loop "Quiet Thinking": F major, 70 bpm, sparse plucks over slow pads, 32 steps.
const FOCUS={bpm:70,len:32,
 mel:[72,0,0,0,69,0,0,0, 0,0,67,0,0,0,0,0, 69,0,0,0,72,0,0,0, 0,0,74,0,72,0,0,0],
 chords:[[53,60,65,69],[50,57,62,65],[46,53,58,62],[48,55,60,64]]};
function schedStep(song,s,t,dest){const sp=60/song.bpm/2;const bar=Math.floor(s/8)%song.chords.length,ch=song.chords[bar],m=song.mel[s];
 if(song===HERO){
  if(m)tone(dest,mtof(m),t,sp*.9,{type:'square',v:.09,cut:2600,r:.12});
  if(m)tone(dest,mtof(m+12),t,sp*.6,{type:'sine',v:.04});
  if(s%2===0)tone(dest,mtof(ch[0]-12+(s%4?7:0)),t,sp*.8,{type:'triangle',v:.28,r:.05});
  if(s%8===0)ch.slice(1).forEach(n=>pad(dest,mtof(n),t,sp*8,.035));
  if(s%4===0)kick(dest,t,.35); if(s%4===2)noise(dest,t,.06,.08,6000);
  if(s%8===4)noise(dest,t,.12,.12,1500);
 }else{
  if(s%8===0){ch.forEach(n=>pad(dest,mtof(n),t,sp*8.4,.05));tone(dest,mtof(ch[0]-12),t,sp*7,{v:.12,a:.3})}
  if(m)tone(dest,mtof(m),t,sp*2,{type:'sine',v:.10,a:.005,r:1.4});
  if(s%4===2)tone(dest,mtof(ch[1+(s>>2)%3]+12),t,sp,{type:'triangle',v:.03,r:.8});
 }}
function tick(){if(!ctx||!cur)return;const sp=60/cur.bpm/2;while(nextT<ctx.currentTime+.25){schedStep(cur,step%cur.len,nextT,mus);step++;nextT+=sp}}
function play(name){want=name;if(!ensure())return;const song=name==='map'?HERO:name==='focus'?FOCUS:null;if(song===cur)return;
 cur=song;step=0;nextT=ctx.currentTime+.1;if(timer)clearInterval(timer);timer=song?setInterval(tick,60):null;if(song)tick()}
// ---- SFX ----
const SFX={
 tap(){const t=ctx.currentTime;tone(sfx,880,t,.04,{type:'triangle',v:.15,r:.05})},
 correct(){const t=ctx.currentTime;[72,76,79,84].forEach((n,i)=>{tone(sfx,mtof(n),t+i*.07,.15,{v:.22,r:.5});tone(sfx,mtof(n+12),t+i*.07,.1,{v:.05,r:.3})})},
 soft(){const t=ctx.currentTime;tone(sfx,330,t,.08,{v:.06,a:.02,r:.12})}, // neutral, gentle "try again"
 brick(){const t=ctx.currentTime;tone(sfx,mtof(67),t,.05,{type:'square',v:.08,cut:1800,r:.06});tone(sfx,mtof(74),t+.09,.05,{type:'square',v:.08,cut:1800,r:.06});
  [79,83,86,91].forEach((n,i)=>tone(sfx,mtof(n),t+.2+i*.05,.1,{v:.12,r:.5}))},
 suit(){const t=ctx.currentTime;for(let i=0;i<10;i++)tone(sfx,mtof(74+[0,4,7,12,16,19,24,19,24,28][i]),t+i*.06,.12,{type:'triangle',v:.12,r:.4});
  noise(sfx,t+.6,.8,.05,7000)},
 fanfare(){const t=ctx.currentTime,b=.13;[[62,1],[66,1],[69,1],[74,3],[71,1],[74,5]].reduce((tt,[n,l])=>{
  [0,4,7].forEach((iv,k)=>tone(sfx,mtof(n-(k?12-iv:0)),t+tt,b*l*.9,{type:k?'triangle':'sawtooth',v:k?.06:.1,cut:2200,r:.2}));return tt+b*l},0);kick(sfx,t,.3);kick(sfx,t+b*3,.3)}
};
function fx(n){if(!P.sfx||!ensure())return;try{SFX[n]()}catch(e){}}
// ---- UI toggles ----
function ui(){const w=document.createElement('div');w.id='hmaAudio';w.innerHTML='<button id="hmaMus" aria-label="Music on or off"></button><button id="hmaSfx" aria-label="Sounds on or off"></button>';
 const st=document.createElement('style');st.textContent='#hmaAudio{position:fixed;left:10px;bottom:10px;z-index:50;display:flex;gap:10px}#hmaAudio button{min-width:64px;min-height:64px;font-size:30px;border-radius:18px;border:3px solid #fff;background:#2b2d42cc;color:#fff;touch-action:manipulation}#hmaAudio button.off{opacity:.55}';
 document.head.appendChild(st);document.body.appendChild(w);
 const r=()=>{const m=document.getElementById('hmaMus'),s=document.getElementById('hmaSfx');m.textContent=P.music?'🎵':'🔇';m.classList.toggle('off',!P.music);s.textContent=P.sfx?'🔔':'🔕';s.classList.toggle('off',!P.sfx)};r();
 document.getElementById('hmaMus').addEventListener('click',e=>{e.stopPropagation();P.music=!P.music;persist();r();if(ensure())mus.gain.setTargetAtTime(P.music?.16:0,ctx.currentTime,.1)});
 document.getElementById('hmaSfx').addEventListener('click',e=>{e.stopPropagation();P.sfx=!P.sfx;persist();r();if(ensure())sfx.gain.setTargetAtTime(P.sfx?.5:0,ctx.currentTime,.05);fx('tap')})}
// first-tap unlock (iOS) + tap sound for every button
function unlock(){const c=ensure();if(!c)return;const b=c.createBuffer(1,1,22050),s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(0);if(want&&!cur)play(want)}
document.addEventListener('pointerdown',unlock,{capture:true});document.addEventListener('touchend',unlock,{capture:true});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('button');if(b&&!b.closest('#hmaAudio')&&!b.classList.contains('ans'))fx('tap')},true);
document.addEventListener('visibilitychange',()=>{if(!ctx)return;if(document.hidden)ctx.suspend();else ctx.resume()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ui);else ui();
window.HMA={music(n){want=n;if(ctx)play(n)},fx,screen(id){this.music(id==='play'?'focus':id==='reward'?null:'map')},
 _render:{build,HERO,FOCUS,schedStep,SFX,get mus(){return mus},get sfx(){return sfx}}};
})();
