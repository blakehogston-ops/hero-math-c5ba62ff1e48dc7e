/* Hero Math Academy – extras round 2: Daily Globe, cards+binder, Venom call, gym, bedtime, web moves, combos, Spider-Sense, dad cameo, grown-up a11y settings */
'use strict';
(function(){
const VZ=window.__v;
if(S.mercy===undefined)S.mercy=30;S.cards=S.cards||[];S.gymHits=S.gymHits||0;if(S.big===undefined)S.big=false;if(S.bedtime===undefined)S.bedtime='auto';
// ---------- inline SVG helper (namespaces ids) ----------
const SV={};['bugle_front.svg','card_frame_common.svg','card_frame_rare.svg','card_frame_epic.svg','venom_call.svg','venom_punching_bag.svg','venom.svg','hero.svg'].forEach(n=>{try{fetch('assets/'+n).then(r=>r.ok?r.text():'').then(t=>SV[n]=t).catch(()=>{})}catch(e){}});
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
let cameoDone=false;VZ.onBlob=F=>{if(!cameoDone&&F.blobs.filter(Boolean).length===1){cameoDone=true;const c=document.createElement('div');c.className='cameo';c.innerHTML='📱 <b>Dad:</b> Go Samuel! Web him up!';$('fight').appendChild(c);setTimeout(()=>c.remove(),3500)}};
// ---------- Venom phone call before rematches ----------
VZ.preFight=(rematch,go)=>{if(!rematch||!SV['venom_call.svg']){go();return}const o=document.createElement('div');o.id='vcall';o.innerHTML=`<div class="vc-ph">${inl('venom_call.svg','vc-svg')}<div class="vc-btns"><button class="btn" id="vcDecline" aria-label="Decline">✖ Decline</button><button class="btn blue" id="vcAnswer" aria-label="Answer">📞 Answer</button></div></div>`;document.body.appendChild(o);
 try{HMA.venomGrowl&&HMA.venomGrowl()}catch(e){}say('Incoming call... from Venom!');const done=(t)=>{o.remove();say(t);setTimeout(go,50)};
 $('vcAnswer').onclick=()=>done("Hello? It's US! We got a new look. Come to the roof for a rematch!");$('vcDecline').onclick=()=>done("Venom called back anyway! He's on the roof. Rematch time!")};
// ---------- trading cards + Daily Globe after each win ----------
const CARDS=[['Venom','Big, gooey, and loves tater tots.'],['Web Shot','THWIP! The classic.'],['Midtown Rooftop','Water towers and a big moon.'],['Spider-Sense','Tingles when Venom winds up.'],['Web Bomb','A sticky surprise!'],['Party Hat Venom','WE are celebrating!'],['Swing Kick','Swing in, kick goo out.'],['Times Square','Bright lights, big billboard.'],['Web Net','Venom gets caught!'],['Cool Shades Venom','Too cool for goo.'],['Iron Legs','Four golden legs of power.'],['Chef Venom','Cooking up tater tots.'],['Bow Tie Venom','Very fancy goo.'],['Jelly Bean Venom','So tiny after a win!'],['Math Hero','Every right answer = more power.']];
function cardFor(tier){const rar=tier>=3?'epic':tier>=2?'rare':'common';const next=CARDS.find((c,i)=>!S.cards.some(x=>x.i===i));const i=next?CARDS.indexOf(next):Math.floor(Math.random()*CARDS.length);return{i,rar,t:Date.now()}}
function cardSvg(c,cls){const n='card_frame_'+c.rar+'.svg';const sv=inl(n,cls||'card');if(!sv)return `<div class="card fb ${c.rar}"><b>${esc(CARDS[c.i][0])}</b><br>${esc(CARDS[c.i][1])}</div>`;
 const d=document.createElement('div');d.innerHTML=sv;const s=d.firstElementChild;setTxt(s,'name',CARDS[c.i][0]);setTxt(s,'text',CARDS[c.i][1]);
 const art=s.querySelector('[data-id="art"]');if(art){const b=art.getBBox?null:null;const g=document.createElementNS('http://www.w3.org/2000/svg','foreignObject');}
 return `<div class="cardw ${c.rar}">${d.innerHTML}<div class="cart">${/Venom/.test(CARDS[c.i][0])?VZ.venomFace(90,/Party/.test(CARDS[c.i][0])?'partyhat':/Shades/.test(CARDS[c.i][0])?'shades':/Chef/.test(CARDS[c.i][0])?'chef':/Bow/.test(CARDS[c.i][0])?'bowtie':''):`<span style="font-size:64px">${['🕸️','🏙️','〰️','💥','🦵','🌆','🥅','🦿','🦸'][c.i%9]}</span>`}</div></div>`}
function globe(hood,tier){const sv=inl('bugle_front.svg','globe');const name=S.hero==='G'?'SADIE':'SAMUEL';const head=`${name} WEBS VENOM! ${hood.toUpperCase().replace('THE ','')} GOO-FREE!`;
 if(!sv)return `<div class="globe fb"><div class="gt">THE DAILY GLOBE</div><div class="gh">${esc(head)}</div></div>`;const d=document.createElement('div');d.innerHTML=sv;const s=d.firstElementChild;setTxt(s,'headline-text',head);setTxt(s,'headline',head);
 s.querySelectorAll('text').forEach(t=>{if(/bugle/i.test(t.textContent))t.textContent=t.textContent.replace(/daily bugle|bugle/ig,'DAILY GLOBE')});return `<div class="globew">${d.innerHTML}<div class="gphoto">${VZ.venomFace(70,'')}<span>🕸️</span></div></div>`}
VZ.afterWin=(res,hood)=>{const c=cardFor(res.tier);S.cards.push(c);save();const it=$('rwItem');const box=document.createElement('div');box.className='winrow';
 box.innerHTML=`<button class="globebtn" aria-label="Daily Globe front page">${globe(hood,res.tier)}</button><div><div style="font-size:18px">New ${c.rar.toUpperCase()} card!</div>${cardSvg(c)}</div>`;it.prepend(box);
 box.querySelector('.globebtn').onclick=()=>{const o=document.createElement('div');o.className='bigview';o.innerHTML=globe(hood,res.tier)+'<button class="btn blue">Close</button>';o.querySelector('button').onclick=()=>o.remove();document.body.appendChild(o)};
 say(`Extra! Extra! The Daily Globe says: ${heroName()} webs Venom! You got a new ${c.rar} card: ${CARDS[c.i][0]}.`)};
// binder + gym buttons on map
const _bm=window.buildMap;window.buildMap=function(){_bm();const t=$('toColl');if(!t||$('toBinder'))return;const mk=(id,html,lab,fn)=>{const b=document.createElement('button');b.id=id;b.className='btn small pink';b.innerHTML=html;b.setAttribute('aria-label',lab);b.onclick=fn;t.parentNode.insertBefore(b,t.nextSibling)};
 mk('toGym','🥊 Gym','Hero gym',gym);mk('toBinder','📇 Cards','Card binder',binder)};buildMap=window.buildMap;
function screen(id,html){let s=$(id);if(!s){s=document.createElement('section');s.className='screen';s.id=id;$('app').appendChild(s)}s.innerHTML=html;show(id);return s}
function binder(){const owned=S.cards;const rows=CARDS.map((c,i)=>{const mine=owned.filter(x=>x.i===i);const best=mine.sort((a,b)=>'epic rare common'.indexOf(a.rar)-'epic rare common'.indexOf(b.rar))[0];return best?cardSvg(best,'card'):`<div class="cardw lock"><div class="cl">🔒<br>${i+1}</div></div>`}).join('');
 const s=screen('binderS',`<div class="top"><h2>📇 Card Binder <small>${new Set(owned.map(c=>c.i)).size}/${CARDS.length}</small></h2><button class="btn small ghost" id="bBack">⬅ Map</button></div><div class="moves">Web moves: ${MOVES.map(m=>`<span class="${(S.venomWins||0)>=m.at?'on':''}">${m.ic} ${m.name}${(S.venomWins||0)>=m.at?'':` (win ${m.at})`}</span>`).join('')}</div><div class="binder">${rows}</div>`);
 $('bBack').onclick=()=>{buildMap();show('map')}}
function gym(){const s=screen('gymS',`<div class="top"><h2>🥊 Hero Gym</h2><button class="btn small ghost" id="gBack">⬅ Map</button></div><div class="gym"><div class="gymtxt">Practice your web moves on the Venom punching bag! Tap the bag.</div><button id="bag" aria-label="Punching bag">${inl('venom_punching_bag.svg','bagsvg')||VZ.venomFace(160,'')}</button><div class="gymcount" id="gcount">${S.gymHits} punches</div><div class="moves" id="gmoves">${unlocked().map(m=>`<span class="on">${m.ic} ${m.name}</span>`).join('')}</div></div>`);
 let k=0;$('bag').onclick=()=>{S.gymHits++;k++;save();const b=$('bag');b.classList.remove('hit','glow');void b.offsetWidth;b.classList.add(document.body.classList.contains('calm')?'glow':'hit');const m=unlocked()[k%unlocked().length];$('gcount').textContent=`${S.gymHits} punches · ${m.ic} ${m.name}!`;try{HMA.thwip&&HMA.thwip();setTimeout(()=>HMA.hit&&HMA.hit(k%5===0),180)}catch(e){}if(k%10===0)say(pick(['Strong!','Pow!','Great form, hero!']))};
 $('gBack').onclick=()=>{buildMap();show('map')}}
// ---------- streak combos + Spider-Sense hint (missions) ----------
let streak=0;const _oc=onCorrect;onCorrect=function(){const first=M&&M.tries===0;_oc();if(!M)return;if(first){streak++;if(streak>=3){cheer(`COMBO x${streak}! 🔥`);if(streak%3===0){M.power=Math.min(8,(M.power||0));}}}else streak=0};
const _next=next;next=function(a,b){_next(a,b);if(M&&M.i===0)streak=0;const h=$('hint');if(h&&!$('ssBtn')){}};
const _ofm=onFirstMiss;onFirstMiss=function(){_ofm();streak=0;setTimeout(()=>{if(!M||$('ssBtn'))return;const b=document.createElement('button');b.id='ssBtn';b.className='btn small blue';b.innerHTML='🕷️ Spider-Sense';b.setAttribute('aria-label','Spider-Sense: hide one wrong answer');
 b.onclick=()=>{const w=[...document.querySelectorAll('.ans')].filter(x=>x.textContent!==M.q.ans&&!x.classList.contains('tried'));if(w.length>1){const x=pick(w);x.classList.add('tried','sensed');x.setAttribute('aria-label',x.textContent+' (not it)')}say('Your spider-sense says: not that one!');b.remove();M.brave=1};$('hint').appendChild(b)},50)};
const _n2=next;next=function(a,b){const o=$('ssBtn');o&&o.remove();_n2(a,b)};
Object.assign(VZ,{binder,gym,globe,CARDS});
})();
