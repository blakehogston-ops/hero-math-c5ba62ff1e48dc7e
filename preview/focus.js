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
document.getElementById('slowGo').onclick=()=>{sm.classList.remove('on');try{if(M&&M.q)readQ&&S.voice&&readQ('')}catch(e){}};
const skillLvl=id=>S.skills[id];
// helper row: I'm stuck + Spider-Sense cross-out (before answering)
function helpRow(){let r=document.getElementById('helpRow');if(!r){r=document.createElement('div');r.id='helpRow';const q=document.getElementById('qtext');q.parentNode.insertBefore(r,q.nextSibling)}
 r.innerHTML='<button class="btn small ghost" id="stuckBtn" aria-label="I\'m stuck, show a hint">🤔 I\'m stuck</button><button class="btn small blue" id="senseBtn" aria-label="Spider-Sense: cross out one wrong answer">🕷️ Spider-Sense</button>';
 r.querySelector('#stuckBtn').onclick=()=>{if(!M||!M.q)return;M.brave=1;M.stuck=1;const h=sents(M.q.hint)[0]||M.q.hint;showHint('💡 '+h);if(M.q.help)$('model').innerHTML=M.q.help;say(M.q.hint)};
 r.querySelector('#senseBtn').onclick=e=>{if(!M||!M.q)return;const w=[...document.querySelectorAll('#answers .ans')].filter(x=>x.textContent!==M.q.ans&&!x.classList.contains('tried')&&!x.classList.contains('sensed'));if(w.length>1){const x=pick(w);x.classList.add('tried','sensed');x.setAttribute('aria-label',x.textContent+' (not it)');say('Your spider-sense says: not that one!')}e.currentTarget.remove()}}
const _next=next;next=function(a,b){if(M&&M.yourTurn){M.yourTurn=0;M.inTurn=1}else if(M)M.inTurn=0;
 const r=_next(a,b);if(!M)return r;lastT=Date.now();M.qT=lastT;paused=false;$('answers').classList.remove('fpause');helpRow();
 if(M.inTurn){$('qtext').innerHTML='<span style="color:#ffd23f">Your turn!</span> '+$('qtext').innerHTML;cheer('Your turn! 🕷️');say('Your turn! Try this one.',false)}
 if(M.modelFirst&&M.q.help)$('model').innerHTML=M.q.help;return r};
const _ans=answer;answer=function(b,c){if(paused||!M||!M.q)return;if(typeof busy!=='undefined'&&busy)return;
 const before=M.tries,right=c===M.q.ans,now=Date.now(),dt=now-lastT,wasArmed=b.classList.contains('armed')||!(S.hear!==false&&S.voice);
 _ans(b,c);if(!M)return;if(M.tries===before&&!right)return; // only armed (hear-then-pick)
 lastT=Date.now();
 if(right){if(M.tries===0&&dt>=6000&&(M.rushed>0||Math.random()<.34))setTimeout(()=>cheer('You took your time, that\'s real hero focus!'),700);
  if(before>=2){M.yourTurn=1;M.i=Math.max(0,M.i-1)} // fresh similar question, mission length unchanged
  M.fastRun=0;return}
 // wrong
 paused=true;$('answers').classList.add('fpause');setTimeout(()=>{paused=false;lastT=Date.now();$("answers")&&$("answers").classList.remove("fpause")},PAUSE);
 if(dt<FAST){M.fastRun=(M.fastRun||0)+1;M.rushed=(M.rushed||0)+1;rushSess[M.id]=(rushSess[M.id]||0)+1;
  if(rushSess[M.id]>=3&&!M.modelFirst){M.modelFirst=1;const s=skillLvl(M.id);if(s&&s.lvl>1){s.lvl--;save()}}
  if(M.fastRun>=3&&!M.slowShown){M.slowShown=1;setTimeout(()=>{sm.classList.add('on');say('Slow-mo Spidey-Sense. Heroes slow down to see clearly. Breathe in, and out.')},600)}}
 else M.fastRun=0;
 if(M.tries>=2){setTimeout(()=>{try{const h=document.getElementById('how');h&&h.click()}catch(e){}},PAUSE)}};
// e) log rushed answers per skill
const _fin=finish;finish=function(){try{if(M&&M.rushed&&window.HMA&&HMA.progress)HMA.progress.log({kid:window.GS_MODE?'Sadie':'Samuel',mode:'rushed answers',skill:M.id,questions:M.rushed,firstTry:0,hints:0,minutes:0,venom:''})}catch(e){}return _fin.apply(this,arguments)};
window.__focus={get paused(){return paused}};
})();
