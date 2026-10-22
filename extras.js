'use strict';
// ===== 1) Dad voice lines: audio/dad/NN.mp3 if listed in audio/dad/manifest.json, else TTS =====
const DAD=[
 [1,'intro',"Hey buddy, it's Dad. Let's save the city together!"],[2,'intro',"Hero time! I'm right here with you."],[3,'intro',"New mission! Take your time, there's no rush."],
 [4,'cheer',"Yes! That's my boy!"],[5,'cheer',"Amazing work, buddy!"],[6,'cheer',"You got it! I'm so proud of you."],[7,'cheer',"Web-tastic!"],[8,'cheer',"Look at that big brain go!"],[9,'cheer',"Nailed it, hero!"],[10,'cheer',"High five! Boom!"],
 [11,'again',"Good try, buddy. Let's look at the picture together."],[12,'again',"That's okay. Mistakes help our brains grow."],[13,'again',"You've got this. Give it another try."],[14,'again',"Brave try! Let's figure it out together."],[15,'again',"No rush. Take a breath and look again."],
 [16,'complete',"Mission complete! You saved the city!"],[17,'complete',"That was awesome. You worked so hard."],
 [18,'boss',"Uh oh, a villain! Every right answer knocks him back. You can do this."],[19,'bosswin',"You beat the boss! I knew you could do it!"],
 [20,'levelup',"Level up! You're getting stronger every day."],[21,'calm',"Let's take a hero breath together. Breathe in... and out."],[22,'calmdone',"Feeling better? Let's keep going whenever you're ready."],
 [23,'rest',"Hero rest! You did so much today. I'm proud of you."],[24,'build',"Another brick for your LEGO hero!"],[25,'hello',"Hi Samuel! Ready to be a math hero?"]];
const dadFile=n=>'audio/dad/'+String(n).padStart(2,'0')+'.mp3';
let dadHave=new Set();
try{fetch('audio/dad/manifest.json',{cache:'no-store'}).then(r=>r.ok?r.json():[]).then(a=>{dadHave=new Set((a||[]).map(Number))}).catch(()=>{})}catch(e){}
let dadAudio=null;
function dad(cat,fallback,afterAudio,before,isIntro){
 const lines=DAD.filter(d=>d[1]===cat&&dadHave.has(d[0]));
 if(!S.voice||!lines.length){if(before)before();else say(fallback);return false}
 const d=pick(lines);if(isIntro)next('',true);
 try{speechSynthesis&&speechSynthesis.cancel();if(dadAudio)dadAudio.pause();dadAudio=new Audio(dadFile(d[0]));dadAudio.onended=()=>afterAudio&&afterAudio();
  dadAudio.onerror=()=>{dadHave.delete(d[0]);say(isIntro?fallback+(M.q.speakText||M.q.text):fallback)};
  dadAudio.play().catch(()=>dadAudio.onerror())}catch(e){say(fallback)}return true}
// ===== 2) Build-your-own LEGO hero =====
const HERO_ART=[ // top -> bottom, 9 wide
 '..RRRRR..','.RRRRRRR.','.RWWRWWR.','.RWKRKWR.','.RRRRRRR.','..RRRRR..',
 'BBRRKRRBB','BRRRKRRRB','RBRKKKRBR','RBRRKRRBR','..BBBBB..','..BBRBB..','..BB.BB..','..RR.RR..'];
const PALETTES=[{R:'#c1121f',B:'#1d3f8f',W:'#f4f4f8',K:'#111'},{R:'#f4f4f8',B:'#ff5fa2',W:'#9fe6ff',K:'#c2185b'},{R:'#222',B:'#1b5e20',W:'#e8f5e9',K:'#66bb6a'},{R:'#b3121b',B:'#d4a017',W:'#fff8d6',K:'#111'}];
const SLOTS=[];HERO_ART.forEach((row,y)=>[...row].forEach((c,x)=>{if(c!=='.')SLOTS.push({x,y,c})}));SLOTS.sort((a,b)=>b.y-a.y||a.x-b.x);// build from the feet up
if(S.build===undefined)S.build=0;if(S.heroesDone===undefined)S.heroesDone=0;
function heroSvg(sz){const pal=PALETTES[S.heroesDone%PALETTES.length],n=S.build,w=9*20,h=HERO_ART.length*16+8;let b='';
 SLOTS.forEach((s,i)=>{const X=s.x*20,Y=s.y*16+6;if(i<n)b+=`<rect x="${X+1}" y="${Y}" width="18" height="15" rx="2" fill="${pal[s.c]}" stroke="#0005"/><rect x="${X+4}" y="${Y-4}" width="5" height="4" fill="${pal[s.c]}"/><rect x="${X+11}" y="${Y-4}" width="5" height="4" fill="${pal[s.c]}"/>`;
  else b+=`<rect x="${X+2}" y="${Y+1}" width="16" height="13" rx="2" fill="none" stroke="#ffffff40" stroke-dasharray="3 2"/>`});
 return `<svg viewBox="-4 -4 ${w+8} ${h+8}" width="${sz*w/h}" height="${sz}">${b}</svg>`}
function renderHero(){const m=$('miniHero');if(m)m.innerHTML=heroSvg(80);const B=$('bigHero');if(B)B.innerHTML=heroSvg(280);const t=$('heroTxt');if(t)t.textContent=`${S.build} of ${SLOTS.length} bricks${S.heroesDone?` · ${S.heroesDone} hero${S.heroesDone>1?'es':''} finished!`:''}`}
// ===== 3) Boss battles: every 3rd mission of a skill =====
const BOSSES=[{id:'goblin',name:'Green Goblin'},{id:'ock',name:'Doc Ock'},{id:'venom',name:'Venom'}];
function bossFor(id){const st=S.skills[id];return st.missions%3===2?BOSSES[Math.min(2,(st.best||1)-1)]:null}
function bossArt(id){
 if(id==='goblin')return `<svg viewBox="0 0 100 100" width="84" height="84"><defs><radialGradient id="gb" cx="40%" cy="35%"><stop offset="0" stop-color="#b6e36b"/><stop offset="1" stop-color="#2e5e12"/></radialGradient></defs><path d="M10 40L24 6L40 30H60L76 6L90 40Z" fill="#5b2a86"/><ellipse cx="50" cy="56" rx="34" ry="38" fill="url(#gb)"/><path d="M18 44L4 30L22 40M82 44L96 30L78 40" fill="#3d7a1a" stroke="#2e5e12" stroke-width="3"/><path d="M28 48Q38 40 46 50L30 56Z M72 48Q62 40 54 50L70 56Z" fill="#ffd23f" stroke="#111" stroke-width="2"/><path d="M30 72Q50 88 70 72Q50 80 30 72Z" fill="#111"/></svg>`;
 if(id==='ock')return `<svg viewBox="0 0 100 100" width="84" height="84"><path d="M10 90Q2 60 22 66M90 90Q98 60 78 66M4 50Q10 30 26 50M96 50Q90 30 74 50" stroke="#777" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="52" rx="27" ry="32" fill="#e8b48a"/><path d="M22 44Q24 16 50 16Q76 16 78 44Q66 30 50 32Q34 30 22 44Z" fill="#2b1a0e"/><circle cx="39" cy="50" r="10" fill="#c62828" stroke="#333" stroke-width="4"/><circle cx="61" cy="50" r="10" fill="#c62828" stroke="#333" stroke-width="4"/><path d="M49 50h2" stroke="#333" stroke-width="4"/><path d="M38 72Q50 66 62 72" stroke="#5a2e1a" stroke-width="3" fill="none"/></svg>`;
 return `<svg viewBox="0 0 100 100" width="84" height="84"><defs><radialGradient id="vn" cx="40%" cy="30%"><stop offset="0" stop-color="#3a3f55"/><stop offset="1" stop-color="#050508"/></radialGradient></defs><ellipse cx="50" cy="50" rx="40" ry="44" fill="url(#vn)"/><path d="M16 38Q30 22 46 44Q34 54 20 52Z M84 38Q70 22 54 44Q66 54 80 52Z" fill="#fff"/><path d="M26 66Q50 92 74 66Q50 76 26 66Z" fill="#fff"/><path d="M28 67l4 7l4-6l4 8l4-8l4 9l4-9l4 8l4-8l4 6l4-7" stroke="#111" stroke-width="2" fill="none"/></svg>`}
function bossUI(){const bb=$('bossBar');if(!M.boss){bb.className='';bb.innerHTML='';return}bb.className='on';
 bb.innerHTML=`<div id="bossFig">${bossArt(M.boss.id)}</div><div style="flex:1"><div style="font-weight:800;font-size:20px">BOSS: ${M.boss.name}</div><div class="hp"><i id="bossHp" style="width:100%"></i></div></div>`}
// ===== hooks used by game.js =====
let missRun=0;
function onCorrect(){if(M.tries===0)missRun=0;document.querySelectorAll('.calmOffer').forEach(x=>x.remove());S.build++;if(S.build>=SLOTS.length){S.build=0;S.heroesDone++;setTimeout(()=>cheer('LEGO HERO COMPLETE! 🦸'),700)}save();renderHero();
 if(M.boss){const f=$('bossFig');f.classList.remove('hit');void f.offsetWidth;f.classList.add('hit');const hp=$('bossHp');if(hp)hp.style.width=Math.max(0,100*(1-(M.i+1)/QN))+'%'}}
function onFirstMiss(){missRun++;if(missRun>=3){missRun=0;setTimeout(()=>{const h=$('hint');if(!h.querySelector('.calmOffer')){const d=document.createElement('div');d.className='calmOffer';d.style.marginTop='10px';d.innerHTML='Tricky ones today! Want a quick hero breath? <button class="btn small blue">🫧 Breathe</button>';d.querySelector('button').onclick=calm;h.appendChild(d)}},3200)}}
// ===== 5) Calm-down breathing (30 s) =====
let calmT=[];
function calm(){clearTimeout(hintT);calmT.forEach(clearTimeout);calmT=[];$('calm').classList.add('on');const t0=Date.now();
 const step=k=>{if(k>=8){$('breathTxt').textContent='Great breathing, hero!';$('breathLeft').textContent='';return}const inn=k%2===0;$('breathTxt').textContent=inn?'Breathe in… 🌬️':'Breathe out… 😌';$('breathLeft').textContent=`${Math.max(0,Math.ceil(30-(Date.now()-t0)/1000))} seconds`;
  if(k===0){if(!dad('calm','Let\'s take a hero breath together, like Spidey before a big swing. Breathe in...'))0}else say(inn?'Breathe in, slowly...':'And breathe out...');calmT.push(setTimeout(()=>step(k+1),k===0?4000:3700))};
 $('breathBall').style.animation='none';void $('breathBall').offsetWidth;$('breathBall').style.animation='';step(0)}
function calmDone(){calmT.forEach(clearTimeout);$('calm').classList.remove('on');dad('calmdone',"Feeling better? Let's keep going whenever you're ready.")}
$('calmP').addEventListener('click',calm);$('calmM').addEventListener('click',calm);$('calmDone').addEventListener('click',calmDone);
// ===== 4) Real-life word problems =====
const _add=G.addsub,_time=G.time,_mult=G.mult;
G.addsub=l=>{if(l===1||Math.random()<.6)return _add(l);
 if(l===3){const toys=shuf([['Spider-Man',R(23,32)*10+R(0,9)],['Iron Man',R(25,34)*10],['Iron Spider',R(26,33)*10+5],['Miles Morales',R(22,30)*10+9]]);
  if(Math.random()<.5){const[a,b]=[toys[0],toys[1]];const ans=a[1]+b[1];if(ans<=1000)return{text:`A Hot Toys ${a[0]} figure costs $${a[1]}. A Hot Toys ${b[0]} costs $${b[1]}. How much for both?`,choices:opts('$'+ans,['$'+(ans+10),'$'+(ans-10),'$'+(ans+100)]),ans:'$'+ans,pic:null,help:blocks(a[1],'$'+a[1])+blocks(b[1],'+ $'+b[1]),hint:`Add the hundreds, then the tens, then the ones.`,how:`Line up the prices by place. Add ones, then tens, then hundreds. Trade 10 ones for a ten if you need to.`}}
  const have=R(5,9)*100,c=toys[0];const ans=have-c[1];return{text:`Dad saved $${have}. A Hot Toys ${c[0]} figure costs $${c[1]}. How much money is left?`,choices:opts('$'+ans,['$'+(ans+10),'$'+(ans-10),'$'+(ans+100)]),ans:'$'+ans,pic:null,help:numLine(Math.floor(c[1]/100)*100,have,100,[{v:c[1],t:'$'+c[1]},{v:have,c:'#2fbf71',t:'$'+have}],[[c[1],have,'count up']]),hint:`Count up from $${c[1]} to $${have}.`,how:`"Left" means subtract: $${have} take away $${c[1]}. You can count up from the price to $${have}.`}}
 const sets=shuf([['police station',R(4,7)*100+R(10,99)],['Spider-Man bridge',R(3,5)*100+R(10,99)],['race car',R(1,2)*100+R(10,99)],['tree house',R(2,4)*100+R(10,99)]]);
 const[a,b]=[sets[0],sets[1]];if(Math.random()<.5&&a[1]+b[1]<=1000){const ans=a[1]+b[1];return{text:`A LEGO ${a[0]} has ${a[1]} pieces. A LEGO ${b[0]} has ${b[1]} pieces. How many pieces in all?`,choices:opts(ans,near(ans,[10,-10,100,1])),ans:String(ans),pic:null,help:blocks(a[1],a[1]+' pieces')+blocks(b[1],'+ '+b[1]),hint:`"In all" means add. Ones, then tens, then hundreds.`,how:`Stack the numbers by place and add ones, tens, then hundreds.`}}
 const big=Math.max(a[1],b[1]),sm=Math.min(a[1],b[1]),ans=big-sm;const bs=big===a[1]?a[0]:b[0],ss=big===a[1]?b[0]:a[0];
 return{text:`The LEGO ${bs} has ${big} pieces. The ${ss} has ${sm}. How many MORE pieces does the ${bs} have?`,choices:opts(ans,near(ans,[10,-10,100,1])),ans:String(ans),pic:null,help:numLine(Math.floor(sm/100)*100,Math.ceil(big/100)*100,100,[{v:sm,t:String(sm)},{v:big,c:'#2fbf71',t:String(big)}],[[sm,big,'how far?']]),hint:`"How many more" means subtract: ${big} − ${sm}.`,how:`Find the difference. Count up from ${sm} to ${big}, or subtract.`}};
G.time=l=>{if(l===1||Math.random()<.65)return _time(l);
 if(l===2){const d=R(3,18),today=19-d;return{text:`Samuel's birthday is June 19! Today is June ${today}. How many days until his birthday?`,choices:opts(d,[d+1,d-1,19+today]),ans:String(d),pic:null,help:numLine(today,19,1,[{v:today,t:'today'},{v:19,c:'#2fbf71',t:'🎂'}],[[today,19,'count on']]),hint:`Count on from June ${today} to June 19.`,how:`Put your finger on ${today} and count each jump to 19. Or subtract: 19 − ${today}.`}}
 const may=R(20,30),d=31-may+19;return{text:`Today is May ${may}. Samuel's birthday is June 19. May has 31 days. How many days until his birthday?`,choices:opts(d,[d+1,d-1,19+may-31>0?19:d+2]),ans:String(d),pic:null,help:numLine(0,d,d>20?5:1,[{v:31-may,t:'May 31'},{v:d,c:'#2fbf71',t:'June 19'}],[[0,31-may,'+'+(31-may)],[31-may,d,'+19']]),hint:`From May ${may} to May 31 is ${31-may} days. Then 19 more days in June.`,how:`Break it into two jumps: to the end of May (${31-may} days), then 19 days in June. Add them: ${31-may} + 19.`}};
G.mult=l=>{if(Math.random()<.8)return _mult(l);const a=l===1?pick([2,5,10]):R(3,9),b=R(2,l===1?5:9),ans=a*b;
 return{text:`Each LEGO minifigure pack has ${b} figures. Samuel gets ${a} packs. How many minifigures is that?`,choices:opts(ans,[a*(b+1),a*(b-1),a+b]),ans:String(ans),pic:null,help:array(a,b),hint:`${a} packs of ${b}. Count by ${b}s.`,how:`${a} equal groups of ${b}: ${a} × ${b}. Skip-count by ${b}.`}};
// ===== 6) Weekly note for the parent =====
function weekly(){const now=Date.now(),D=864e5,wk=S.log.filter(e=>e.t>now-7*D),prev=S.log.filter(e=>e.t<=now-7*D&&e.t>now-14*D);
 const pct=(arr,k)=>{const a=arr.filter(e=>e.s===k);const n=a.reduce((s,e)=>s+e.n,0);return n?Math.round(a.reduce((s,e)=>s+e.f,0)/n*100):null};
 const nm=k=>SK.find(s=>s.id===k).name;const kid=S.hero==='G'?'Sadie':'Samuel';
 const skills=[...new Set(wk.map(e=>e.s))];const improved=[],levels=[];
 skills.forEach(k=>{const a=pct(wk,k),b=pct(prev,k);if(b!==null&&a>b)improved.push(`${nm(k)} (${b}% → ${a}% first try)`);const first=wk.find(e=>e.s===k),last=[...wk].reverse().find(e=>e.s===k);if(first&&last&&last.l>first.l)levels.push(nm(k))});
 const braves=wk.filter(e=>e.b).length,qs=wk.reduce((s,e)=>s+e.n,0);
 const praise=[];if(braves)praise.push(`"I saw you use clues ${braves} time${braves>1?'s':''} this week. Asking for help is what smart heroes do."`);
 if(improved.length)praise.push(`"You're getting faster at ${improved[0].split(' (')[0].replace(/^[^A-Za-z]+/,'')}! All that practice is paying off."`);
 if(levels.length)praise.push(`"You leveled up in ${levels[0]}! I'm so proud of how hard you worked."`);
 if(wk.length)praise.push(`"You did ${wk.length} mission${wk.length>1?'s':''} this week. That's real hero effort."`);
 if(!wk.length)praise.push(`"Want to do a math mission together today? I'll sit with you."`);
 const text=`${kid}'s Hero Math week: ${wk.length} missions, ${qs} questions, ${skills.length} skill${skills.length===1?"":"s"} practiced${skills.length?' ('+skills.map(nm).join(', ')+')':''}.`+(improved.length?`\nImproved: ${improved.join('; ')}.`:'')+(levels.length?`\nLeveled up: ${levels.join(', ')}.`:'')+`\nBrave tries (used a clue): ${braves}.\nThings to say:\n- ${praise.join('\n- ')}`;
 $('week').innerHTML=`<div style="background:#ffffff12;border-radius:16px;padding:14px;margin-bottom:14px"><div class="top"><h2 style="margin:0">This week</h2><button class="btn small blue" id="copyWeek">📋 Copy note</button></div><pre id="weekTxt" style="white-space:pre-wrap;font-size:19px;line-height:1.4;font-family:inherit;margin:8px 0 0"></pre><div id="copyMsg" style="font-size:16px"></div></div>`;
 $('weekTxt').textContent=text;$('copyWeek').onclick=()=>{const done=()=>$('copyMsg').textContent='Copied!';
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(done,fb);else fb();
  function fb(){const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();try{document.execCommand('copy');done()}catch(e){$('copyMsg').textContent='Press and hold the text to copy.'}t.remove()}}}
const _parent=parent;parent=function(){_parent();weekly()};
const _buildMap=buildMap;buildMap=function(){_buildMap();renderHero()};
const _buildColl=buildColl;buildColl=function(){_buildColl();renderHero()};
renderHero();
Object.assign(window.__g,{calm,weekly,bossFor,DAD,heroSvg,SLOTS,dad});
// keep Audio Director's music/SFX toggles out of the play area: dock them in the map's top bar
(function dockAudio(){const a=$('hmaAudio');if(!a){setTimeout(dockAudio,300);return}a.style.cssText='position:static;display:flex;gap:14px';a.querySelectorAll('button').forEach(b=>{b.style.minWidth='88px';b.style.minHeight='88px'});$('toColl').parentNode.prepend(a)})();
// hero swing animation on each correct answer
(function(){const st=document.createElement('style');st.textContent=`#swing{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:8;overflow:hidden}#swing .h{position:absolute;top:22%;left:-140px;width:110px;height:110px;animation:swingX 1.3s cubic-bezier(.3,.1,.3,1) forwards}#swing .h svg{width:100%;height:100%;filter:drop-shadow(0 8px 10px #0008)}#swing .w{position:absolute;top:-10px;width:3px;background:linear-gradient(#fff0,#fff);transform-origin:top}
@keyframes swingX{0%{left:-140px;top:10%;transform:rotate(-30deg)}50%{top:34%;transform:rotate(0)}100%{left:calc(100% + 140px);top:6%;transform:rotate(30deg)}}
@media (prefers-reduced-motion:reduce){#swing .h{animation:fadeH 1s forwards;left:45%}@keyframes fadeH{0%,100%{opacity:0}50%{opacity:1}}}`;document.head.appendChild(st);
 const d=document.createElement('div');d.id='swing';document.body.appendChild(d)})();
function heroSwing(){const d=$('swing');d.innerHTML=`<div class="h"><svg viewBox="0 0 100 100"><use href="#${S.hero==='G'?'maskWhite':'maskRed'}"/></svg></div>`;clearTimeout(heroSwing.t);heroSwing.t=setTimeout(()=>d.innerHTML='',1400)}
const _oc=onCorrect;onCorrect=function(){_oc();heroSwing()};
