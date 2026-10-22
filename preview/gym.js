/* Hero Math Academy – Times-Table Gym (gym.js)
 * Endless, no-pressure times-table practice on the Venom punching bag.
 * Every right answer lands a punch. Wrong answers: soft sound, gentle hint, try again.
 * No timer, no score to lose, no end screen. Exit any time.
 *
 * API:
 *   HMA.openGym(opts?)  opts = { tables?: number[] (default [2,3,4,5,10] then all 0-10 as he grows),
 *                                onClose?: function({punches, correct}) }
 *   HMA.closeGym()      returns to opts.onClose or the map.
 * Saves lifetime punches to S.gymHits (shared with hero.js) and S.gymFacts (count of right answers).
 */
'use strict';
(function(){
const H=window.HMA=window.HMA||{};
const st=(typeof S!=='undefined')?S:null;if(st){st.gymHits=st.gymHits||0;st.gymFacts=st.gymFacts||0}
const sv=()=>{try{typeof save==='function'&&save()}catch(e){}};
const talk=t=>{try{typeof say==='function'&&say(t)}catch(e){}};
const snd=(f,...a)=>{try{H[f]&&H[f](...a)}catch(e){}};
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const PRAISE=['POW!','Nice punch!','You got it!','Super strong!','THWACK!','Hero power!','Great thinking!'];
const css=`#gymT{position:fixed;inset:0;z-index:60;display:flex;flex-direction:column;background:linear-gradient(#1b2340,#0b0f1e);color:#fff;font-family:inherit;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);overflow:hidden}
#gymT .gt-top{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;gap:10px}
#gymT h2{margin:0;font-size:clamp(22px,4vw,34px)}
#gymT .gt-btn{min-width:88px;min-height:88px;border:0;border-radius:22px;font:inherit;font-size:24px;font-weight:700;cursor:pointer;touch-action:manipulation}
#gymT .gt-exit{background:#ffffff22;color:#fff;padding:0 22px}
#gymT .gt-body{flex:1;display:flex;align-items:center;justify-content:center;gap:3vw;min-height:0;padding:0 14px 14px}
#gymT .gt-bagw{flex:0 0 auto;height:100%;max-height:62vh;display:flex;justify-content:center;transform-origin:50% 0}
#gymT .gt-bagw img{height:100%;width:auto;max-width:40vw}
#gymT .gt-bagw.punch{animation:gtSwing .7s cubic-bezier(.2,.8,.3,1)}
body.calm #gymT .gt-bagw.punch{animation:gtGlow .7s}
@keyframes gtSwing{0%{transform:rotate(0)}25%{transform:rotate(-14deg)}55%{transform:rotate(7deg)}80%{transform:rotate(-3deg)}100%{transform:rotate(0)}}
@keyframes gtGlow{50%{filter:drop-shadow(0 0 24px #7fd3ff)}}
#gymT .gt-pow{position:absolute;font-size:clamp(34px,7vw,64px);font-weight:900;color:#ffd23f;text-shadow:3px 3px 0 #c2185b;pointer-events:none;animation:gtPow .9s forwards}
@keyframes gtPow{0%{transform:scale(.4);opacity:0}30%{transform:scale(1.15);opacity:1}100%{transform:scale(1) translateY(-30px);opacity:0}}
#gymT .gt-q{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:560px;width:100%}
#gymT .gt-fact{font-size:clamp(44px,9vw,84px);font-weight:900;letter-spacing:2px}
#gymT .gt-ans{display:grid;grid-template-columns:repeat(2,minmax(120px,1fr));gap:14px;width:100%}
#gymT .gt-a{background:#2f6fdf;color:#fff;font-size:clamp(30px,6vw,46px)}
#gymT .gt-a.tried{background:#3a4258;color:#aab}
#gymT .gt-a.good{background:#2fae5b}
#gymT .gt-hint{min-height:1.4em;font-size:clamp(18px,3vw,24px);color:#bfe3ff;text-align:center}
#gymT .gt-count{font-size:20px;opacity:.85}
@media (orientation:portrait){#gymT .gt-body{flex-direction:column}#gymT .gt-bagw{height:34vh;max-height:34vh}#gymT .gt-bagw img{max-width:60vw}}
@media (max-height:500px){#gymT .gt-bagw{max-height:70vh}#gymT .gt-fact{font-size:40px}#gymT .gt-q{gap:8px}#gymT .gt-ans{grid-template-columns:repeat(4,minmax(88px,1fr))}}`;
let root=null,cur=null,O={},sessPunch=0,sessRight=0,level=0;
function ensureCss(){if(document.getElementById('gymCss'))return;const s=document.createElement('style');s.id='gymCss';s.textContent=css;document.head.appendChild(s)}
function pool(){if(O.tables&&O.tables.length)return O.tables;return level<8?[2,3,4,5,10]:level<20?[0,1,2,3,4,5,10]:[0,1,2,3,4,5,6,7,8,9,10]}
function newQ(){let a=rnd(pool()),b=Math.floor(Math.random()*11);if(Math.random()<.5)[a,b]=[b,a];const ans=a*b;const opts=new Set([ans]);
 const near=[ans+a,ans-a,ans+b,ans-b,ans+1,ans-1,ans+2,a+b].filter(n=>n>=0&&n!==ans);while(opts.size<4){opts.add(near.length?near.splice(Math.floor(Math.random()*near.length),1)[0]:ans+opts.size*3)}
 return{a,b,ans,opts:[...opts].sort(()=>Math.random()-.5),tries:0}}
function hint(q){if(q.a===0||q.b===0)return'Anything times 0 is 0. Zero groups = nothing!';if(q.a===1||q.b===1)return`1 group of ${Math.max(q.a,q.b)} is just ${Math.max(q.a,q.b)}.`;
 const s=Math.min(q.a,q.b),l=Math.max(q.a,q.b);if(s===10||l===10)return`Times 10: put a 0 on the end of ${s===10?l:s}.`;if(s===2)return`Times 2 is doubles: ${l} + ${l}.`;if(s===5)return`Count by 5s, ${l} times: 5, 10, 15…`;
 return`Think ${s} groups of ${l}. Skip-count by ${l}: ${Array.from({length:Math.min(s,3)},(_,i)=>l*(i+1)).join(', ')}…`}
function render(){cur=newQ();const q=cur;root.querySelector('.gt-fact').textContent=`${q.a} × ${q.b}`;root.querySelector('.gt-hint').textContent='';
 const box=root.querySelector('.gt-ans');box.innerHTML='';q.opts.forEach(n=>{const b=document.createElement('button');b.className='gt-btn gt-a';b.textContent=n;b.setAttribute('aria-label',String(n));b.onclick=()=>answer(b,n);box.appendChild(b)});
 talk(`${q.a} times ${q.b}?`)}
function answer(b,n){const q=cur;if(!q||q.done||b.classList.contains('tried'))return;
 if(n===q.ans){q.done=1;b.classList.add('good');punch();level++;sessRight++;if(st){st.gymFacts++;}sv();setTimeout(render,850)}
 else{q.tries++;b.classList.add('tried');b.setAttribute('aria-label',n+' (try another)');snd('fx','soft');const h=hint(q);root.querySelector('.gt-hint').textContent='💡 '+h+' Try again!';talk(h)}}
function punch(){sessPunch++;if(st)st.gymHits++;const w=root.querySelector('.gt-bagw');w.classList.remove('punch');void w.offsetWidth;w.classList.add('punch');
 snd('thwip');setTimeout(()=>snd('hit',sessPunch%5===0),160);
 const p=document.createElement('div');p.className='gt-pow';p.textContent=rnd(PRAISE);const r=w.getBoundingClientRect();p.style.left=(r.left+r.width*.1)+'px';p.style.top=(r.top+r.height*.4)+'px';root.appendChild(p);setTimeout(()=>p.remove(),950);
 root.querySelector('.gt-count').textContent=`🥊 ${sessPunch} punch${sessPunch===1?'':'es'} today${st?` · ${st.gymHits} all-time`:''}`;if(sessPunch%10===0)talk(rnd(['Strong!','Great form, hero!','Wow, ten more punches!']))}
H.openGym=function(opts){O=opts||{};ensureCss();if(root)root.remove();sessPunch=0;sessRight=0;level=(st&&st.gymFacts)||0;
 root=document.createElement('div');root.id='gymT';root.setAttribute('role','dialog');root.setAttribute('aria-label','Times-table gym');
 root.innerHTML=`<div class="gt-top"><h2>🥊 Times-Table Gym</h2><button class="gt-btn gt-exit" aria-label="Leave the gym">⬅ Done</button></div>
 <div class="gt-body"><div class="gt-bagw"><img src="assets/venom_punching_bag.svg" alt="Venom punching bag"></div>
 <div class="gt-q"><div class="gt-count">Answer to punch! No rush, no timer.</div><div class="gt-fact" aria-live="polite"></div><div class="gt-ans"></div><div class="gt-hint" aria-live="polite"></div></div></div>`;
 root.querySelector('.gt-exit').onclick=()=>H.closeGym();document.body.appendChild(root);render();return root};
H.closeGym=function(){if(!root)return;root.remove();root=null;cur=null;sv();try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}
 const res={punches:sessPunch,correct:sessRight};if(typeof O.onClose==='function')O.onClose(res);else{try{typeof buildMap==='function'&&buildMap();typeof show==='function'&&show('map')}catch(e){}}return res};
})();
