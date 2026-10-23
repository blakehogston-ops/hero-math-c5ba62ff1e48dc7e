/* Hero Math Academy – extras round 2: Daily Globe, cards+binder, Venom call, gym, bedtime, web moves, combos, Spider-Sense, dad cameo, grown-up a11y settings */
'use strict';
(function(){
const VZ=window.__v;
if(S.mercy===undefined)S.mercy=30;S.cards=S.cards||[];S.gymHits=S.gymHits||0;if(S.big===undefined)S.big=false;if(S.bedtime===undefined)S.bedtime='auto';
// ---------- inline SVG helper (namespaces ids) ----------
const SV={};['bugle_front.svg','card_frame_common.svg','card_frame_rare.svg','card_frame_epic.svg','venom_call.svg','venom_punching_bag.svg','venom.svg','hero.svg','family/samuel_idle.svg','family/samuel_victory.svg'].forEach(n=>{try{fetch('assets/'+n).then(r=>r.ok?r.text():'').then(t=>SV[n]=t).catch(()=>{})}catch(e){}});
let uid=0;function inl(n,cls){const t=SV[n];if(!t)return '';const p='s'+(++uid)+'-';return t.replace(/<\?xml[^>]*>/,'').replace(/id="([^"]+)"/g,(m,i)=>`id="${p}${i}" data-id="${i}"`).replace(/url\(#([^)]+)\)/g,(m,i)=>`url(#${p}${i})`).replace(/href="#([^"]+)"/g,(m,i)=>`href="#${p}${i}"`).replace('<svg',`<svg class="${cls||''}"`)}
const esc=t=>String(t).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function setTxt(root,id,txt){const e=root.querySelector(`[data-id="${id}"]`);if(!e)return;if(e.tagName.toLowerCase()==='text'||e.tagName.toLowerCase()==='tspan')e.textContent=txt;else{const t=e.querySelector('text');if(t)t.textContent=txt}}
// ---------- settings ----------
function applySettings(){document.body.classList.toggle('big',!!S.big);const h=new Date().getHours();const bed=S.bedtime==='on'||(S.bedtime==='auto'&&(h>=19||h<6));document.documentElement.classList.toggle('bedtime',bed);document.body.classList.toggle('bed',bed);if(bed&&!S.calm)document.body.classList.add('calm')}
applySettings();setInterval(applySettings,60000);
const _par=parent;parent=function(){_par();const v=$('vset');if(!v||$('vset2'))return;const d=document.createElement('div');d.id='vset2';d.className='row';d.style.cssText='margin:0 0 14px;gap:14px';
 d.innerHTML=`<label class="tog"><input type="checkbox" id="setVoice" ${S.voice?'checked':''}> Read aloud</label><label class="tog"><input type="checkbox" id="setBig" ${S.big?'checked':''}> Bigger text</label>
 <label class="tog">Venom fight helper finishes after <select id="setMercy">${[20,30,45,60].map(n=>`<option ${S.mercy==n?'selected':''} value="${n}">${n}s</option>`).join('')}</select></label>
 <label class="tog">Bedtime mode <select id="setBed">${[['auto','Auto (7 pm–6 am)'],['on','On'],['off','Off']].map(([v,t])=>`<option ${S.bedtime==v?'selected':''} value="${v}">${t}</option>`).join('')}</select></label>`;
 v.parentNode.insertBefore(d,v.nextSibling);$('setVoice').onchange=e=>setVoice(e.target.checked);$('setBig').onchange=e=>{S.big=e.target.checked;save();applySettings()};$('setMercy').onchange=e=>{S.mercy=+e.target.value;save()};$('setBed').onchange=e=>{S.bedtime=e.target.value;save();applySettings()}};
// ---------- web moves (unlock by Venom wins) ----------
const MOVES=[{id:'shot',name:'Web Shot',at:0,ic:'🕸️'},{id:'bomb',name:'Web Bomb',at:2,ic:'💥',fx:'fx_web_bomb.svg'},{id:'kick',name:'Swing Kick',at:4,ic:'🦵',fx:'fx_swing_kick.svg'},{id:'net',name:'Web Net',at:6,ic:'🥅',fx:'fx_web_net.svg'},{id:'legs',name:'Iron Legs',at:9,ic:'🦿',fx:'fx_iron_legs.svg'}];
const unlocked=()=>MOVES.filter(m=>(S.venomWins||0)>=m.at);
VZ.MOVES=MOVES;
// special-move button in fight: charges every 5 web hits, pops one goo blob with the best unlocked move
function ensureSpecial(){if($('fSpecial'))return;const b=document.createElement('button');b.id='fSpecial';b.className='fbtn';b.setAttribute('aria-label','Special web move');$('fight').appendChild(b);
 b.addEventListener('click',()=>{const F=VZ.F&&VZ.F();if(!F||!F.special||F.finT>=0)return;F.special=0;const mv=unlocked().slice(-1)[0];F.blobs[F.blobs.findIndex(Boolean)]=0;F.blobHits=0;VZ.renderHud();VZ.sprite(mv.fx||'fx_impact.svg',VZ.venCenter(),Math.min(innerWidth,innerHeight)*.5,.8);VZ.prompt(`${mv.ic} ${mv.name.toUpperCase()}!`);say(mv.name+'!');try{HMA.finisher&&HMA.finisher()}catch(e){}if(!F.blobs.some(Boolean))VZ.startFinisher(false);updSpecial()})}
function updSpecial(){const F=VZ.F&&VZ.F();const b=$('fSpecial');if(!b||!F)return;const mv=unlocked().slice(-1)[0];b.innerHTML=`${mv.ic}<br><small>${F.special?mv.name:`${F.charge||0}/8`}</small>`;b.classList.toggle('ready',!!F.special)}
VZ.onHit=F=>{F.charge=(F.charge||0)+1;F.combo=(F.lastHitT&&F.t-F.lastHitT<1.2)?(F.combo||1)+1:1;F.lastHitT=F.t;if(F.combo>=3&&F.combo%3===0)VZ.prompt(`COMBO x${F.combo}! 🔥`);if(F.charge>=8&&!F.special&&unlocked().length>1){F.special=1;F.charge=0;VZ.prompt('⭐ Special move ready! Tap the glowing button!')}if(F.charge>=8)F.charge=0;updSpecial()};
VZ.onFightStart=F=>{ensureSpecial();F.charge=0;F.special=0;updSpecial();$('fSpecial').style.display=unlocked().length>1?'block':'none';cameoDone=false};
// dad mid-fight cameo (visual + line 18)
let cameoDone=false;VZ.onBlob=F=>{if(!cameoDone&&F.blobs.filter(Boolean).length===1){cameoDone=true;const c=document.createElement('div');c.className='cameo';c.innerHTML='<img src="assets/family/dad_cheer.svg" alt="Dad cheering" style="height:96px;vertical-align:bottom;margin-right:6px"><b>Dad:</b> Go '+heroName()+'! Web him up!';$('fight').appendChild(c);setTimeout(()=>c.remove(),3500)}};
// ---------- Venom phone call before rematches ----------
VZ.preFight=(rematch,go)=>{if(!rematch||!(window.HMA&&HMA.venomCall)){go();return}let gone=false;const g=()=>{if(!gone){gone=true;go()}};try{HMA.venomCall(g,{speak:!!S.voice}).then(g,g)}catch(e){g()}};
VZ.afterWin=(res,hood,mm)=>{let c=null;try{c=window.HMA&&HMA.awardCard?HMA.awardCard({tier:res.tier,power:res.power,hood:hood,skill:mm&&mm.id}):null}catch(e){}const it=$('rwItem');if(c&&HMA.cardHtml){const box=document.createElement('div');box.className='winrow';box.innerHTML=`<div><div style="font-size:18px">New card!</div>${HMA.cardHtml(c)}</div>`;it.prepend(box)}
 try{if(window.HMA&&HMA.showGlobe)HMA.showGlobe(heroName(),hood,{speak:!!S.voice})}catch(e){}};
// binder + gym buttons on map
const _bm=window.buildMap;window.buildMap=function(){_bm();const t=$('toColl');if(!t||$('toBinder'))return;const mk=(id,html,lab,fn)=>{const b=document.createElement('button');b.id=id;b.className='btn small pink';b.innerHTML=html;b.setAttribute('aria-label',lab);b.onclick=fn;t.parentNode.insertBefore(b,t.nextSibling)};
 mk('toGym','🥊 Gym','Hero gym',gymGate);mk('toBinder','📇 Cards','Card binder',()=>window.HMA&&HMA.openBinder&&HMA.openBinder())};buildMap=window.buildMap;
function screen(id,html){let s=$(id);if(!s){s=document.createElement('section');s.className='screen';s.id=id;$('app').appendChild(s)}s.innerHTML=html;show(id);return s}
const kidName=()=>window.GS_MODE?'Sadie':'Samuel';
const _ofmP=onFirstMiss;onFirstMiss=function(){_ofmP();if(M)M.hintN=(M.hintN||0)+1};
const _nextP=next;next=function(a,b){if(M&&!M.t0)M.t0=Date.now();return _nextP(a,b)};
const _finG=finish;finish=function(...a){try{if(M&&window.HMA&&HMA.progress)HMA.progress.log({kid:kidName(),mode:window.GS_MODE?'ghost-spider':'mission',skill:M.id,questions:M.i,firstTry:M.firsts||0,hints:M.hintN||0,minutes:(Date.now()-(M.t0||Date.now()))/60000,venom:'won',level:(S.skills[M.id]||{}).lvl||1,stuck:M.stuckN||0,sense:M.senseN||0})}catch(e){}S.gymPass=1;save();return _finG.apply(this,a)};
const GMAX=20;function gymGate(){if(!S.gymPass){const s0=screen('gymS',`<div class="top"><h2>🥊 Hero Gym</h2><button class="btn small ghost" id="gBack">⬅ Map</button></div><div class="gym"><div class="gymtxt">The gym opens after you finish a hero mission. Go save a neighborhood, then come back and train! 🕷️</div></div>`);$('gBack').onclick=()=>{buildMap();show('map')};return}
 if(!(window.HMA&&HMA.openGym))return;const gt0=Date.now();const root=HMA.openGym({onClose:r=>{try{HMA.progress&&HMA.progress.log({kid:kidName(),mode:'gym',skill:'facts',questions:r.punches,firstTry:r.correct,hints:0,minutes:(Date.now()-gt0)/60000,venom:''})}catch(e){}buildMap();show('map')}});const mo=new MutationObserver(()=>{const t=(root.querySelector('.gt-count')||{}).textContent||'';const n=+(t.match(/(\d+) punch/)||[])[1]||0;if(n>=GMAX){mo.disconnect();S.gymPass=0;save();setTimeout(()=>{const ans=root.querySelector('.gt-ans');if(ans)ans.innerHTML='';const f=root.querySelector('.gt-fact');if(f)f.textContent=`Great workout! ${GMAX} punches. Finish another mission to train again.`;},900)}});mo.observe(root,{subtree:true,childList:true,characterData:true})}
// ---------- streak combos + Spider-Sense hint (missions) ----------
let streak=0;const _oc=onCorrect;onCorrect=function(){const first=M&&M.tries===0;_oc();if(!M)return;if(first){streak++;if(streak>=3){const q=document.body.classList.contains('calm')||document.body.classList.contains('bed');if(streak%3===0)cheer(q?`${streak} in a row ✓`:`${streak} in a row! 🔥`);if(streak%3===0){M.power=Math.min(8,(M.power||0));}}}else streak=0};
const _next=next;next=function(a,b){_next(a,b);if(M&&M.i===0)streak=0;const h=$('hint');if(h&&!$('ssBtn')){}};
const _ofm=onFirstMiss;onFirstMiss=function(){_ofm();streak=0;setTimeout(()=>{if(!M||$('ssBtn'))return;const b=document.createElement('button');b.id='ssBtn';b.className='btn small blue';b.innerHTML='🕷️ Spider-Sense';b.setAttribute('aria-label','Spider-Sense: hide one wrong answer');
 b.onclick=()=>{const w=[...document.querySelectorAll('.ans')].filter(x=>x.textContent!==M.q.ans&&!x.classList.contains('tried'));if(w.length>1){const x=pick(w);x.classList.add('tried','sensed');x.setAttribute('aria-label',x.textContent+' (not it)')}say('Your spider-sense says: not that one!');b.remove();M.brave=1};$('hint').appendChild(b)},50)};
const _n2=next;next=function(a,b){const o=$('ssBtn');o&&o.remove();_n2(a,b)};
Object.assign(VZ,{gym:gymGate});
})();
// ---------- phones / narrow: compact map header; extra buttons move into a toolbar at the top of the scrollable map ----------
(function(){const KEEP=['calmM','voiceM','toTitle'];
function compact(){const row=document.querySelector('#map .top .row'),g=document.getElementById('grid');if(!row||!g)return;let tb=document.getElementById('mapMenuP');
 if(innerWidth>=1000){if(tb){[...tb.children].forEach(c=>row.insertBefore(c,document.getElementById('voiceM')));tb.remove()}const mh=document.getElementById('miniHero');if(mh)mh.style.display='';return}
 if(!tb){tb=document.createElement('div');tb.id='mapMenuP';tb.setAttribute('role','toolbar');tb.setAttribute('aria-label','More')}
 if(tb.parentNode!==g||g.firstChild!==tb)g.insertBefore(tb,g.firstChild);
 [...row.children].forEach(c=>{if(!KEEP.includes(c.id)&&c.id!=='miniHero')tb.appendChild(c)});const mh=document.getElementById('miniHero');if(mh)mh.style.display='none'}
const st=document.createElement('style');st.textContent='#mapMenuP{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:10px}#mapMenuP>*{flex:none}';document.head.appendChild(st);
const _b=buildMap;buildMap=function(){const tb0=document.getElementById('mapMenuP'),row0=document.querySelector('#map .top .row');if(tb0&&row0){[...tb0.children].forEach(c=>row0.appendChild(c));tb0.remove()}const r=_b.apply(this,arguments);compact();setTimeout(compact,0);return r};window.buildMap=buildMap;addEventListener('resize',()=>setTimeout(compact,0))})();
