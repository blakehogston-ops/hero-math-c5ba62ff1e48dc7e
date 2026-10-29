/* focus.js: anti-guessing (teacher-approved). Loaded after hero.js in index.html and ghost.html.
   a) 2s soft pause after a miss  b) 2nd miss -> Show me how, tap the glowing answer (no power), then a "Your turn!" question
   c) no power after 2nd miss, never shown as loss  d) 3 fast wrong taps -> Slow-mo Spidey-Sense (once per mission)
   e) progress log "rushed answers"  f) 3+ rushed in a session -> quietly down one level + model up front
   g) "I'm stuck" hint before answering (not a miss)  h) Spider-Sense cross-out before answering  i) praise taking time */
(function(){
const FAST=1500,PAUSE=2000;let paused=false,lastT=0,rushSess={};
const st=document.createElement('style');st.textContent=`
#answers{transition:opacity .45s}#answers.fpause{opacity:.4;pointer-events:none}
#helpRow{display:flex;gap:12px;flex-wrap:wrap;margin:6px 0}#helpRow .btn{min-height:88px;min-width:88px}
#slowmo{position:fixed;inset:0;z-index:35;background:#06102aee;display:none;align-items:center;justify-content:center}#slowmo.on{display:flex}
#slowmo .panel{text-align:center;max-width:620px}#slowmo h2{margin:4px 0 10px}#slowmo .orb{width:120px;height:120px;margin:10px auto;border-radius:50%;background:radial-gradient(#7fe3ff,#1b3f8f);animation:smb 6s ease-in-out infinite}
@keyframes smb{50%{transform:scale(1.35)}}body.calm #slowmo .orb{animation:none}
#slowmo .btn{min-height:88px}.ans.sensed{opacity:.35;text-decoration:line-through}`;document.head.appendChild(st);
const sm=document.createElement('div');sm.id='slowmo';sm.innerHTML='<div class="panel"><h2>🕷️ Slow-mo Spidey-Sense</h2><div class="orb" aria-hidden="true"></div><div style="font-size:22px;margin:8px 0 16px">Heroes slow down to see clearly.<br>Breathe in… and out. Read it one more time.</div><button class="btn blue" id="slowGo">I\'m ready ✔</button></div>';document.body.appendChild(sm);
const smOff=()=>{sm.classList.remove('on');clearTimeout(sm._t);paused=false;const A=document.getElementById('answers');A&&A.classList.remove('fpause')};sm.addEventListener('click',e=>{if(e.target===sm)smOff()});document.getElementById('slowGo').onclick=()=>{smOff();try{if(M&&M.q)readQ&&S.voice&&readQ('')}catch(e){}};
const skillLvl=id=>S.skills[id];
// helper row: I'm stuck + Spider-Sense cross-out (before answering)
function helpRow(){let r=document.getElementById('helpRow');if(!r){r=document.createElement('div');r.id='helpRow';const q=document.getElementById('qtext');q.parentNode.insertBefore(r,q.nextSibling)}
 r.innerHTML='<button class="btn small ghost" id="stuckBtn" aria-label="I\'m stuck, show a hint">🤔 I\'m stuck</button><button class="btn small blue" id="senseBtn" aria-label="Spider-Sense: cross out one wrong answer">🕷️ Spider-Sense</button>';
 r.querySelector('#stuckBtn').onclick=()=>{if(!M||!M.q)return;M.brave=1;M.stuck=1;M.stuckN=(M.stuckN||0)+1;const h=sents(M.q.hint)[0]||M.q.hint;showHint('💡 '+h);if(M.q.help)$('model').innerHTML=M.q.help;say(M.q.hint)};
 r.querySelector('#senseBtn').onclick=e=>{if(!M||!M.q)return;M.senseN=(M.senseN||0)+1;M.sensed=1; /* help used: no first-try credit, half power; tries untouched so the nudge still comes first */const w=[...document.querySelectorAll('#answers .ans')].filter(x=>x.textContent!==M.q.ans&&!x.classList.contains('tried')&&!x.classList.contains('sensed'));if(w.length>1){const x=pick(w);x.classList.add('tried','sensed');x.setAttribute('aria-label',x.textContent+' (not it)');say('Your spider-sense says: not that one!')}e.currentTarget.remove()}}
const _next=next;next=function(a,b){if(M&&M.yourTurn){M.yourTurn=0;M.inTurn=1}else if(M)M.inTurn=0;
 const r=_next(a,b);if(!M)return r;lastT=Date.now();M.qT=lastT;paused=false;$('answers').classList.remove('fpause');if(sm.classList.contains('on')&&M.slowShown&&Date.now()-(sm._at||0)>12000)smOff();helpRow();
 if(M.inTurn){$('qtext').innerHTML='<span style="color:#ffd23f">Your turn!</span> '+$('qtext').innerHTML;cheer('Your turn! 🕷️');say('Your turn! Try this one.',false)}
 if(M.modelFirst&&M.q.help)$('model').innerHTML=M.q.help;return r};
function factOf(q){if(q.fact)return String(q.fact);const t=String(q.text||'').replace(/<[^>]+>/g,'').replace(/^\s*Your turn!\s*/,'');const m=t.match(/(\d+)\s*([+\-−×x÷])\s*(\?|\d+)/);if(m)return m[1]+({'−':'-','×':'x','÷':'/'}[m[2]]||m[2])+m[3];return t.replace(/\s+/g,' ').trim().slice(0,40)}
function logAns(before,lv0){if(!window.HMA||!HMA.progress||!HMA.progress.answer||!M||!M.q)return;const type=M.inTurn?'yourturn':M.q.review?'review':(M.i<2?'warmup':'normal');HMA.progress.answer({kid:window.GS_MODE?'Sadie':'Samuel',skill:M.q.skill||M.id,fact:factOf(M.q),firstTryRight:before===0&&!M.stuck&&!M.sensed?1:0,rightSecondOrAfterHint:before>0||M.stuck||M.sensed?1:0,type,level:M.q.lvl||lv0||1})}
const _qn=next;next=function(){if(M){M.stuck=0;M.sensed=0}return _qn.apply(this,arguments)};
function slowMo(){if(!M||M.slowShown)return;M.slowShown=1;setTimeout(()=>{if(typeof hintT!=='undefined')clearTimeout(hintT);
 const h=sm.querySelector('h2');if(h)h.textContent=window.GS_MODE?'👻 Slow-mo Ghost-Sense':'🕷️ Slow-mo Spidey-Sense';
 sm.classList.add('on');sm._at=Date.now();clearTimeout(sm._t);sm._t=setTimeout(smOff,12000);
 // Sadie gets Dad's neutral "Breathe in, slowly..." clip (s04_16), never Samuel's Spidey-Sense clip
 const t0=Date.now();(function w(){if(!sm.classList.contains('on'))return;if(speechSynthesis.speaking&&Date.now()-t0<4000){setTimeout(w,150);return} // let Dad's calm line finish first
  smSay=1;say(window.GS_MODE?'Breathe in, slowly...':'Slow-mo Spidey-Sense. Heroes slow down to see clearly. Breathe in, and out.');smSay=0})()},600)}
// while the slow-mo screen is up, nothing else (hints, Show me how) may talk over its calm line
let smSay=0;const _say0=say;say=function(t,f,o){if(sm.classList.contains('on')&&!smSay){o&&o();return}return _say0.apply(this,arguments)};
const _ans=answer;answer=function(b,c){if(paused||!M||!M.q)return;if(typeof busy!=='undefined'&&busy)return;
 const lv0=(S.skills[M.id]||{}).lvl,before=M.tries,right=c===M.q.ans,now=Date.now(),dt=now-lastT,wasArmed=b.classList.contains('armed')||!(S.hear!==false&&S.voice);
 _ans(b,c);if(!M)return;if(M.tries===before&&!right)return; // only armed (hear-then-pick)
 if(right&&typeof busy!=='undefined'&&!busy)return; // right answer only armed, not yet picked
 lastT=Date.now();
 if(right){try{logAns(before,lv0)}catch(e){}if(M.tries===0&&!M.sensed&&dt>=6000&&(M.rushed>0||Math.random()<.34))setTimeout(()=>cheer('You took your time, that\'s real hero focus!'),700);
  if(before>=2&&!M.inTurn&&(M.turnN||0)<2){M.turnN=(M.turnN||0)+1;M.yourTurn=1;M.i=Math.max(0,M.i-1)} // at most 2 extra per mission, so it always ends // fresh similar question, mission length unchanged
  M.fastRun=0;return}
 // wrong
 paused=true;$('answers').classList.add('fpause');setTimeout(()=>{paused=false;lastT=Date.now();$("answers")&&$("answers").classList.remove("fpause")},PAUSE);
 // Sadie (teacher ruling): 3 wrong picks (confirmed taps) within 20s -> Slow-mo, no speed requirement
 if(window.GS_MODE){M.wrongT=(M.wrongT||[]).filter(t=>now-t<20000).concat(now);if(M.wrongT.length>=3)slowMo()}
 if(dt<FAST){M.fastT=(M.fastT||[]).filter(t=>now-t<20000).concat(now);M.fastRun=Math.max((M.fastRun||0)+1,M.fastT.length);M.rushed=(M.rushed||0)+1;rushSess[M.id]=(rushSess[M.id]||0)+1;
  if(rushSess[M.id]>=3&&!M.modelFirst){M.modelFirst=1;const s=skillLvl(M.id);if(s&&s.lvl>1){s.lvl--;save()}}
  if(M.fastRun>=3)slowMo()}
 else M.fastRun=0;
 if(M.tries>=2){const q=M.q;setTimeout(function w(t0){t0=t0||Date.now();if(!M||M.q!==q||busy)return;if(speechSynthesis.speaking&&Date.now()-t0<4000){setTimeout(()=>w(t0),150);return} // let Dad's calm line finish before Show me how talks
  try{const h=document.getElementById('how');h&&h.click()}catch(e){}},PAUSE)}};
// e) log rushed answers per skill
const _fin=finish;finish=function(){try{if(M&&M.rushed&&window.HMA&&HMA.progress)HMA.progress.log({kid:window.GS_MODE?'Sadie':'Samuel',mode:'rushed answers',skill:M.id,questions:M.rushed,firstTry:0,hints:0,minutes:0,venom:''})}catch(e){}return _fin.apply(this,arguments)};
window.__focus={get paused(){return paused}};
})();
/* Samuel spaced review: first-try miss returns ~1h later, then ~3 days later (saved in S.rev) */
(function(){if(window.GS_MODE)return;const GG=window.__g.G,_G=Object.assign({},GG);
Object.keys(_G).forEach(id=>{GG[id]=function(l){if(M&&M.i>=1&&!M.inTurn&&!M.yourTurn){const due=(S.rev||[]).filter(r=>r.due<=Date.now()&&r.id!==id&&_G[r.id]);if(due.length&&Math.random()<.4){const r=due[Math.floor(Math.random()*due.length)];if(r.stage===0){r.stage=1;r.due=Date.now()+3*864e5}else S.rev.splice(S.rev.indexOf(r),1);save();const rl=(S.skills[r.id]||{lvl:1}).lvl,q=_G[r.id](rl);q.review=1;q.skill=r.id;q.lvl=rl;return q}}return _G[id](l)}});
const _o=onFirstMiss;onFirstMiss=function(){_o();S.rev=S.rev||[];if(M&&!S.rev.some(r=>r.id===M.id&&r.stage===0))S.rev.push({id:M.id,due:Date.now()+36e5,stage:0});save()}})();
/* only one Spider-Sense button (#senseBtn in help row) */
(function(){const s=document.createElement('style');s.textContent='#ssBtn{display:none!important}';document.head.appendChild(s)})();
