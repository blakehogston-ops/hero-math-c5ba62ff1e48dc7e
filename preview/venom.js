/* Hero Math Academy – Venom layer: mission power + web attacks, post-mission Venom fight, map headline, calm motion. */
'use strict';
(function(){
const VZ={};window.__v=VZ;
const reduce=()=>document.body.classList.contains('calm');
const H=window.HMA||{};const hm=(f,...a)=>{try{H[f]&&H[f](...a)}catch(e){}};
// ---------- settings ----------
if(S.calm===undefined)S.calm=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
if(S.autoDodge===undefined)S.autoDodge=false;if(!S.hearV2){S.hear=false;S.hearV2=1}S.stickers=S.stickers||0;S.venomWins=S.venomWins||0;
function applyCalm(){document.body.classList.toggle('calm',!!S.calm)}applyCalm();
// ---------- story ----------
const HOODS=['Midtown','Harlem','Chelsea','the Lower East Side','Brooklyn','Queens'];const HOOD_IDS=['n-midtown','n-harlem','n-chelsea','n-lowereast','n-brooklyn','n-queens'];
const hood=()=>HOODS[S.log.length%HOODS.length];
const isRematch=()=>S.log.length%3===2;
STORY.splice(0,STORY.length,"Venom's goo is spreading over the city!","Oh no, symbiote goo everywhere!","Venom is making a gooey mess!");
const LINES={intro:"WE are Venom! And WE ate all the numbers... they were crunchy!",
 taunts:["WE love snacks! Chocolate! Tater tots! NOT broccoli!","Our tongue is SO long. Look! ...Okay, don't look.","WE are big and gooey. Mostly gooey.","WE forgot to brush our teeth. For a year.","Stop being so smart! It makes our goo wobble!","WE are not scared! ...Is that a loud noise? Eek!"],
 win:"Too much math power! WE are shrinking! I'll be back... maybe!",spidey:"You did it! Venom's the size of a jelly bean now!"};
VZ.LINES=LINES;
const LOOKS=['','partyhat','shades','bowtie','chef'];const LOOKNAME={'':'',partyhat:'in a party hat',shades:'in cool sunglasses',bowtie:'in a fancy bow tie',chef:'in a chef hat'};
const lookFor=()=>{const r=Math.floor((S.log.length+1)/3);return r<1?'':LOOKS[1+(r-1)%(LOOKS.length-1)]};
// ---------- assets (Art Director) with fallbacks ----------
const AS={};['family/samuel_idle.svg','family/samuel_victory.svg','family/sadie_idle.svg','family/sadie_victory.svg','venom.svg','venom_hit.svg','venom_defeat.svg','hero.svg','hero_swing.svg','bg_rooftops_night.svg','bg_rooftops_dusk.svg','bg_goo_city.svg','fx_web_shot.svg','fx_web_net.svg','fx_impact.svg','fx_goo_splat.svg','fx_goo_drip.svg','fx_web_bomb.svg','fx_iron_legs.svg','fx_swing_kick.svg'].forEach(n=>{const i=new Image();i.onerror=()=>{i.bad=1};i.onload=()=>{try{const d=DIM[n]||[i.naturalWidth,i.naturalHeight],k=Math.min(1,1024/Math.max(d[0],d[1]))*Math.min(2,window.devicePixelRatio||1),c=document.createElement('canvas');c.width=Math.round(d[0]*k);c.height=Math.round(d[1]*k);c.getContext('2d').drawImage(i,0,0,c.width,c.height);c.src=i.src;c.complete=true;c.naturalWidth=d[0];AS[n]=c}catch(e){}};i.src='assets/'+n;AS[n]=i});window.__AS=AS;
const ok=n=>AS[n]&&AS[n].complete&&!AS[n].bad&&(AS[n].naturalWidth>0||DIM[n]);VZ.assetOk=ok;
const DIM={'samuel_idle.svg':[400,500],'samuel_victory.svg':[400,500],'family/samuel_idle.svg':[400,500],'family/sadie_idle.svg':[400,500],'family/sadie_victory.svg':[400,500],'sadie_idle.svg':[400,500],'sadie_victory.svg':[400,500],'family/samuel_victory.svg':[400,500],'venom.svg':[400,500],'venom_hit.svg':[400,500],'venom_defeat.svg':[400,500],'hero.svg':[400,500],'hero_swing.svg':[400,500],'bg_rooftops_night.svg':[1600,900],'bg_rooftops_dusk.svg':[1600,900],'bg_goo_city.svg':[1600,900],'fx_web_shot.svg':[400,100],'fx_web_net.svg':[400,400],'fx_impact.svg':[400,400],'fx_goo_splat.svg':[400,400],'fx_web_bomb.svg':[400,400],'fx_iron_legs.svg':[500,400],'fx_swing_kick.svg':[500,300]};
const dimOf=img=>{const n=img.src.split('/').pop();return DIM[n]||[img.naturalWidth||100,img.naturalHeight||100]};
function drawImgBox(img,x,y,w,h){const[nw,nh]=dimOf(img);const r=Math.min(w/nw,h/nh),iw=nw*r,ih=nh*r;ctx.drawImage(img,x+(w-iw)/2,y+h-ih,iw,ih)}
function drawCentered(n,cx,cy,sz,a){if(!ok(n))return false;const[nw,nh]=DIM[n];const r=sz/Math.max(nw,nh);ctx.save();ctx.globalAlpha=a==null?1:a;ctx.drawImage(AS[n],cx-nw*r/2,cy-nh*r/2,nw*r,nh*r);ctx.restore();return true}
// ---------- venom face svg for DOM ----------
function venomFace(sz,look){look=look||'';const hat=look==='partyhat'?'<path d="M38 14L50-14L62 14Z" fill="#ff5fa2" stroke="#fff" stroke-width="2"/><circle cx="50" cy="-14" r="5" fill="#ffd23f"/>':look==='chef'?'<path d="M28 16Q24-6 40 0Q50-14 60 0Q76-6 72 16Z" fill="#fff" stroke="#ccc"/>':'';
 const sh=look==='shades'?'<rect x="16" y="34" width="30" height="14" rx="5" fill="#111" stroke="#4ff" stroke-width="2"/><rect x="54" y="34" width="30" height="14" rx="5" fill="#111" stroke="#4ff" stroke-width="2"/><path d="M46 40h8" stroke="#4ff" stroke-width="3"/>':'<path d="M16 38Q30 20 46 42Q34 54 20 52Z M84 38Q70 20 54 42Q66 54 80 52Z" fill="#fff"/><circle cx="34" cy="44" r="3" fill="#222"/><circle cx="66" cy="44" r="3" fill="#222"/>';
 const bt=look==='bowtie'?'<path d="M36 92L50 86L64 92L64 80L50 86L36 80Z" fill="#e63946"/>':'';
 return `<svg viewBox="0 -20 100 120" width="${sz}" height="${sz*1.2}"><defs><radialGradient id="vf" cx="40%" cy="30%"><stop offset="0" stop-color="#4b5170"/><stop offset="1" stop-color="#050508"/></radialGradient></defs><ellipse cx="50" cy="50" rx="40" ry="42" fill="url(#vf)"/>${hat}${sh}<path d="M30 66Q50 84 70 66Q50 74 30 66Z" fill="#fff"/><path d="M48 72Q46 90 56 96Q62 92 56 84" fill="#ff6fa0"/>${bt}</svg>`}
VZ.venomFace=venomFace;
// ---------- mission: Venom goo bar + power ----------
bossFor=function(){return null};
const QMAX=()=>QN;
bossUI=function(){const bb=$('bossBar');bb.className='on vbar';M.power=0;M.hood=hood();
 bb.innerHTML=`<div id="bossFig" class="vface">${venomFace(64,lookFor())}</div><div style="flex:1;min-width:0"><div class="vtitle">Venom's goo is over <b>${M.hood}</b>!</div><div class="pbar" id="pbar" role="img" aria-label="Power 0 of 8">${[...Array(8)].map(()=>'<i></i>').join('')}<span id="ptxt">POWER 0/8</span></div></div><div id="vBubble" class="vbubble"></div>`};
const pfmt=n=>(n%1?Math.floor(n)+'½':n);function setPower(){const n=Math.min(8,M.power);const segs=document.querySelectorAll('#pbar i');segs.forEach((s,i)=>{s.classList.toggle('on',i<Math.floor(n));s.classList.toggle('half',i===Math.floor(n)&&n%1>0)});const t=$('ptxt');if(t)t.textContent=`POWER ${pfmt(n)}/8`;const pb=$('pbar');if(pb)pb.setAttribute('aria-label',`Power ${n} of 8`)}
function bubble(el,t,ms){const b=$(el);if(!b)return;b.textContent=t;b.classList.add('on');clearTimeout(b._t);b._t=setTimeout(()=>b.classList.remove('on'),ms||4200)}
// web attack on each right answer
function webAttack(){const f=$('bossFig');if(!f)return;const r=f.getBoundingClientRect();const tx=r.left+r.width/2,ty=r.top+r.height/2;
 const sx=Math.max(20,r.left-140),sy=ty+40;const L=document.createElement('div');L.className='webfx';
 L.innerHTML=`<svg width="100%" height="100%"><line x1="${sx}" y1="${sy}" x2="${tx}" y2="${ty}" stroke="#fff" stroke-width="4" stroke-linecap="round" class="wline"/><circle cx="${tx}" cy="${ty}" r="10" class="wimp" fill="none" stroke="#fff" stroke-width="5"/></svg>`;
 document.body.appendChild(L);setTimeout(()=>L.remove(),700);
 f.classList.remove('hit','glow');void f.offsetWidth;f.classList.add(reduce()?'glow':'hit');
 if(!reduce()){const p=$('play');p.classList.remove('shake');void p.offsetWidth;p.classList.add('shake')}}
const _oc=onCorrect;onCorrect=function(){const first=M&&M.tries===0;_oc();if(!M)return;M.power=Math.min(8,(M.power||0)+(first?1:.5));setPower();if(!first)bubble('vBubble','Still powering up! ⚡',2500);webAttack()};
heroSwing=function(){};
// taunts between problems
const _next=next;next=function(pre,noRead){if(M&&M.i>0&&M.i%3===0&&!pre){const t=LINES.taunts[(S.log.length+M.i/3)%LINES.taunts.length|0];pre=`Venom says: ${t} `;_next(pre,noRead);bubble('vBubble',t);return}_next(pre,noRead)};
// ---------- finish -> fight -> reward ----------
const _finish=finish;
finish=function(){const pw=Math.min(8,M.power||0),re=isRematch(),hd=M.hood||hood(),mm=M;$('ov').classList.remove('on');
 const go=()=>fight(pw,re,(res)=>{M=mm;window.__afterFight=1;_finish();window.__afterFight=0;S.venomWins++;if(res.tier===3)S.stickers++;save();
  $('rwTitle').textContent=`${hd.toUpperCase()} CLEARED!`;
  $('rwText').textContent=`You webbed up Venom${re?' in the big rematch':''} and cleared the goo from ${hd}, ${heroName()}!`+(res.tier===3?' SUPER MOVE bonus sticker! ⭐':'');if(!res.left&&VZ.afterWin)VZ.afterWin(res,hd,mm)});VZ.preFight?VZ.preFight(re,go):go()};
// ---------- the fight ----------
let cv,ctx,W=0,Hh=0,raf=0,F=null,DPR=1;
function ensureDom(){if($('fight'))return;const s=document.createElement('section');s.className='screen';s.id='fight';
 s.innerHTML=`<canvas id="fc"></canvas>
 <button id="fPause" class="fbtn" aria-label="Pause (hold)">⏸</button>
 <div id="fPower" class="fbar" role="img" aria-label="Power"></div>
 <div id="fHp" class="fbar" role="img" aria-label="Venom goo left"></div>
 <div id="fPrompt"></div>
 <div id="fZone" aria-label="Tap Venom to web him" role="button"></div>
 <div id="fBubble" class="vbubble"></div>
 <div id="fHand">👆</div>
 <button id="fJump" class="fbtn" aria-label="Jump">⬆<br><small>JUMP</small></button>
 <div id="fBars"><i></i><i></i></div>
 <div id="fSuper"></div>
 <div id="fMenu"><div class="panel" style="text-align:center"><h2>Paused</h2><div class="row" style="justify-content:center;gap:24px"><button class="btn blue" id="fResume">▶ Keep fighting</button><button class="btn ghost" id="fFinish">⭐ Finish the fight</button><button class="btn ghost" id="fHome">🏠 Map</button></div></div></div>
 <button id="fDone" class="btn">Continue ▶</button>`;
 $('app').appendChild(s);cv=$('fc');ctx=cv.getContext('2d',{alpha:false});
 // input
 let sx=0,sy=0,st=0,pid=null;
 s.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;pid=e.pointerId;sx=e.clientX;sy=e.clientY;st=performance.now();e.preventDefault()},{passive:false});
 s.addEventListener('pointerup',e=>{if(e.target.closest('button')||pid===null)return;pid=null;const dy=e.clientY-sy,dx=e.clientX-sx;
  if(dy<-40&&Math.abs(dy)>Math.abs(dx))return dodge('swipe');
  const z=$('fZone').getBoundingClientRect();const inZ=e.clientX>=z.left&&e.clientX<=z.right&&e.clientY>=z.top&&e.clientY<=z.bottom;
  if(F&&F.wind>0&&!inZ)return dodge('tap');if(inZ)shoot();else if(F&&F.wind>0)dodge('tap')});
 s.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
 $('fJump').addEventListener('click',()=>dodge('button'));
 let ph=0;const pd=()=>{ph=setTimeout(()=>{if(F){F.paused=true;$('fMenu').classList.add('on')}},500)},pu=()=>clearTimeout(ph);
 $('fPause').addEventListener('pointerdown',pd);$('fPause').addEventListener('pointerup',pu);$('fPause').addEventListener('pointerleave',pu);
 $('fResume').addEventListener('click',()=>{F.paused=false;F.last=performance.now();$('fMenu').classList.remove('on')});
 $('fFinish').addEventListener('click',()=>{F.paused=false;$('fMenu').classList.remove('on');F.blobs.fill(0);F.blobHits=0;startFinisher(true)});
 $('fHome').addEventListener('click',()=>{if(!F)return;const cb=F.cb,res={tier:F.tier,power:F.power,time:F.t,left:1};stopFight();stopVoice();cb(res);buildMap();show('map');stopVoice()});
 $('fDone').addEventListener('click',()=>{if(!F||!F.done)return;const cb=F.cb,res={tier:F.tier,power:F.power,time:F.t};stopFight();cb(res)});
 addEventListener('resize',()=>{if(F)size()})}
const PX_BUDGET=2.4e6;function size(){W=innerWidth;Hh=innerHeight;const d=Math.max(1,Math.min(2,devicePixelRatio||1,Math.sqrt(PX_BUDGET/Math.max(1,W*Hh))));DPR=d;cv.width=W*d;cv.height=Hh*d;cv.style.width=W+'px';cv.style.height=Hh+'px';ctx.setTransform(d,0,0,d,0,0);F&&(F.bgc=null)}
const TIERS=[{taps:10,name:'thin',fin:'WEB-WRAP!'},{taps:8,name:'thick',fin:'SPIN WEB-WRAP!'},{taps:7,name:'glow',fin:'THWIP COMBO!'},{taps:6,name:'gold',fin:'SUPER WEB STORM!'}];
const tierOf=p=>p>=8?3:p>=6?2:p>=3?1:0;VZ.pfmt=pfmt;
function fight(power,rematch,cb){ensureDom();stopVoice();clearTimeout(hintT);
 F={power,rematch,cb,tier:tierOf(power),t:0,last:performance.now(),blobs:[1,1,1],blobHits:0,hits:0,webs:[],parts:[],wind:0,nextWind:4.5,strike:0,hero:{jump:0,knock:0},vhit:0,shrink:0,finT:-1,done:false,lastTap:0,look:rematch?lookFor():'',shake:0,stun:0,cheered:false,dodges:0,bumps:0};
 F.tapsPer=TIERS[F.tier].taps;show('fight');size();hm('fightStart');hm('setFight',true);
 $('fDone').classList.remove('on');$('fMenu').classList.remove('on');$('fSuper').className='';$('fBars').className='';
 renderHud();VZ.onFightStart&&VZ.onFightStart(F);
 const first=!S.venomSeen;S.venomSeen=1;save();
 const intro=first?LINES.intro:(rematch?`Venom is back${F.look?' '+LOOKNAME[F.look]:''}! It's a REMATCH!`:'Venom is here! Web him up!');
 bubble('fBubble',first?LINES.intro:(rematch?'REMATCH! WE have a new look!':pick(LINES.taunts)),5000);
 prompt(`POWER ${pfmt(power)}/8! Tap Venom to web him!`);
 setTimeout(()=>{hm('venomGrowl')},400);
 if(!dad('venom',intro+' Tap Venom to web him!'))0;
 cancelAnimationFrame(raf);raf=requestAnimationFrame(loop)}
VZ.fight=fight;
function stopFight(){cancelAnimationFrame(raf);if(F&&!F.done)hm('fightEnd',false);hm('setFight',false);F=null;const m=$('fMenu');m&&m.classList.remove('on')}
VZ.stop=stopFight;
function prompt(t){const p=$('fPrompt');p.textContent=t;p.classList.add('on')}
function renderHud(){if(!F)return;$('fPower').innerHTML=`<span class="lbl">⚡</span>${[...Array(8)].map((_,i)=>`<i class="${i<Math.floor(F.power)?'on':i===Math.floor(F.power)&&F.power%1?'half':''}"></i>`).join('')}<span class="lbl">${pfmt(F.power)}/8</span>`;$('fPower').setAttribute('aria-label',`Power ${F.power} of 8`);
 const left=F.blobs.filter(Boolean).length;$('fHp').innerHTML=`<span class="lbl">VENOM</span>`+F.blobs.map((b,i)=>`<span class="blob ${b?'':'pop'}" title="goo blob ${i+1}">${b?'●':'✕'}</span>`).join('')+`<span class="lbl">${left}/3 goo</span>`;$('fHp').setAttribute('aria-label',`Venom has ${left} of 3 goo blobs left`)}
// geometry from Level Designer (percent boxes)
const box=(x,y,w,h)=>({x:x*W,y:y*Hh,w:w*W,h:h*Hh});
const port=()=>W<Hh*.8;const heroBox=()=>port()?box(.04,.5,.34,.32):box(.08,.38,.22,.42),venBox=()=>port()?box(.46,.3,.48,.46):box(.58,.26,.26,.50);
function heroHand(){const b=heroBox();return{x:b.x+b.w*.8,y:b.y+b.h*.35-F.hero.jump}}
function venCenter(){const b=venBox();return{x:b.x+b.w/2,y:b.y+b.h*.45}}
function shoot(){if(!F||F.finT>=0||F.paused)return;F.lastTap=F.t;$('fHand').classList.remove('on');const a=heroHand(),b=venCenter();F.webs.push({x0:a.x,y0:a.y,x1:b.x,y1:b.y,t:0});hm('thwip')}
function dodge(how){if(!F||F.finT>=0||F.paused)return;F.lastTap=F.t;if(F.hero.jump<=0){F.hero.jumpT=0.75;F.dodgeOK=F.wind>0}}
function landHit(){F.hits++;VZ.onHit&&VZ.onHit(F);F.vhit=.3;F.stun=.6;hm('hit',F.tier>=2);burst(venCenter(),F.tier);if(!reduce())F.shake=Math.max(F.shake,.18);
 const i=F.blobs.findIndex(Boolean);if(i<0)return;F.blobHits++;const popped=3-F.blobs.filter(Boolean).length,minT=(popped+1)*(5+(8-F.power)*.5);if(F.blobHits>=F.tapsPer&&F.t<minT){F.blobHits=F.tapsPer-1;if(Math.random()<.25)prompt(pick(['He\'s wobbling! Keep webbing!','Goo is stretching… keep going!','Almost! Keep tapping!']))}if(F.blobHits>=F.tapsPer){F.blobs[i]=0;F.blobHits=0;gooSplat(venCenter());renderHud();VZ.onBlob&&VZ.onBlob(F);
  if(F.blobs.filter(Boolean).length===1&&!F.cheered){F.cheered=true;dad('fightcheer',`Go ${heroName()}! Web him up!`)}
  if(!F.blobs.some(Boolean))startFinisher(false)}}
function sprite(n,p,sz,life){F.spr=F.spr||[];F.spr.push({n,x:p.x,y:p.y,sz,life,t:0})}
function burst(p,tier){sprite('fx_impact.svg',p,Math.min(W,Hh)*(.22+tier*.04),.35);const n=reduce()?6:14+tier*6;const col=['#fff','#cfe8ff','#7fe3ff','#ffd23f'][tier];for(let i=0;i<n;i++){const a=Math.random()*6.28,s=80+Math.random()*220;F.parts.push({x:p.x,y:p.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.5+Math.random()*.3,c:col,r:2+Math.random()*3})}}
function gooSplat(p){sprite('fx_goo_splat.svg',p,Math.min(W,Hh)*.35,.6);for(let i=0;i<(reduce()?6:18);i++){const a=Math.random()*6.28,s=60+Math.random()*160;F.parts.push({x:p.x,y:p.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-60,life:.8,c:'#1b1030',r:6+Math.random()*8,g:1})}}
function startFinisher(mercy){if(F.finT>=0)return;F.finT=0;F.wind=0;F.strike=0;F.mercy=mercy;$('fHand').classList.remove('on');F.blobs.fill(0);renderHud();
 const fin=TIERS[F.tier].fin;prompt(mercy?'Hero power! '+fin:fin);hm('finisher');
 if(F.tier===3){$('fSuper').className='on';$('fBars').className='on';$('fSuper').textContent='SUPER WEB STORM!'}
 say(mercy?`Hero power! ${fin}`:fin)}
function loop(now){if(!F)return;let dt=Math.min(.05,(now-F.last)/1000)*(VZ.speed||1);F.last=now;if(F.paused){draw();raf=requestAnimationFrame(loop);return}F.t+=dt;
 const h=F.hero;if(h.jumpT>0){h.jumpT-=dt;h.jump=Math.sin(Math.max(0,h.jumpT)/.75*Math.PI)*Hh*.16}else h.jump=0;h.knock=Math.max(0,h.knock-dt*2.5);
 if(F.finT<0){
  // mercy after ~45s
  if(F.t>=(S.mercy||30))startFinisher(true);
  // idle ghost hand
  if(F.t-F.lastTap>5&&F.wind<=0)$('fHand').classList.add('on');
  // Venom windup -> tendril
  if(F.wind<=0&&F.strike<=0&&F.t>=F.nextWind){F.wind=1.3;F.dodgeOK=false;hm('venomGrowl');prompt(S.autoDodge?'Venom winds up… your spider-sense will jump!':'❗ Venom winds up! Swipe up, tap JUMP, or tap anywhere to dodge!');}
  if(F.wind>0){F.wind-=dt;if(S.autoDodge&&F.wind<.4&&h.jump<=0)dodge('auto');if(F.wind<=0){F.strike=.45;F.struck=false}}
  if(F.strike>0){F.strike-=dt;if(!F.struck&&F.strike<.25){F.struck=true;if(h.jump>Hh*.04||F.dodgeOK){F.dodges++;prompt('Nice dodge! 🕷️ Now web him!');}else{F.bumps++;h.knock=1;prompt('Whoa! Bounce back… you’re okay! Web him!');hm('hit',false)}}if(F.strike<=0){F.nextWind=F.t+4+Math.random()*2.5}}
 }else{F.finT+=dt;const dur=F.tier===3?3.4:2.2;
  if(F.tier>=2&&Math.random()<dt*10){const a=heroHand(),b=venCenter();F.webs.push({x0:a.x,y0:a.y,x1:b.x+(Math.random()-.5)*80,y1:b.y+(Math.random()-.5)*80,t:0,fin:1})}
  if(F.finT>dur&&F.shrink===0){F.shrink=.001;$('fSuper').className='';$('fBars').className='';hm('venomRoar');bubble('fBubble',LINES.win,5200);const fid=F;say(LINES.win,false,()=>{if(F===fid&&$('fight').classList.contains('on'))say(LINES.spidey)})}
  if(F.shrink>0){F.shrink+=dt;if(F.shrink>2.6&&!F.done){F.done=true;hm('fightEnd',true);hm('victory');dad('venomwin',LINES.spidey);prompt(`Venom ran away! ${F.dodges?F.dodges+' great dodges! ':''}You saved ${hood()}!`);$('fDone').classList.add('on');if(F.tier===3)bubble('fBubble','⭐ Bonus sticker! SUPER MOVE!',5000)}}}
 // webs
 F.webs.forEach(w=>{w.t+=dt/.25;if(w.t>=1&&!w.hit){w.hit=1;if(!w.fin)landHit();else burst({x:w.x1,y:w.y1},F.tier)}});F.webs=F.webs.filter(w=>w.t<1.4);
 (F.spr||[]).forEach(o=>o.t+=dt);F.spr=(F.spr||[]).filter(o=>o.t<o.life);F.parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(p.g?500:200)*dt;p.life-=dt});F.parts=F.parts.filter(p=>p.life>0);
 F.vhit=Math.max(0,F.vhit-dt);F.stun=Math.max(0,F.stun-dt);F.shake=Math.max(0,F.shake-dt);
 draw();raf=requestAnimationFrame(loop)}
// ---------- drawing ----------
function bgCache(){const c=document.createElement('canvas');c.width=Math.round(W*DPR);c.height=Math.round(Hh*DPR);const x=c.getContext('2d',{alpha:false});x.scale(DPR,DPR);const dusk=F.rematch;const bgn=dusk?'bg_rooftops_dusk.svg':'bg_rooftops_night.svg';
 if(ok(bgn)){const i=AS[bgn],r=Math.max(W/1600,Hh/900);x.drawImage(i,(W-1600*r)/2,Hh*.82-820*r,1600*r,900*r);if(Hh*.82+80*r<Hh){x.fillStyle='#0b0d14';x.fillRect(0,Hh*.82+80*r,W,Hh)}return c}
 const g=x.createLinearGradient(0,0,0,Hh*.82);if(dusk){g.addColorStop(0,'#3a1450');g.addColorStop(.5,'#c2185b');g.addColorStop(1,'#ff9a3c')}else{g.addColorStop(0,'#070b1f');g.addColorStop(.6,'#1d1f4a');g.addColorStop(1,'#3b2a62')}x.fillStyle=g;x.fillRect(0,0,W,Hh);
 const vb=venBox();if(!dusk){const mg=x.createRadialGradient(vb.x+vb.w*.6,vb.y+vb.h*.25,10,vb.x+vb.w*.6,vb.y+vb.h*.25,Math.min(W,Hh)*.28);mg.addColorStop(0,'#fffbe8');mg.addColorStop(.45,'#e8e2c8');mg.addColorStop(.5,'rgba(232,226,200,.25)');mg.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=mg;x.fillRect(0,0,W,Hh)}
 let s=11;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
 [[.62,dusk?'#5a1d4a':'#141a38'],[.7,dusk?'#3a1236':'#0c1028']].forEach(([b,col])=>{let X=0;while(X<W){const bw=30+rnd()*60,bh=Hh*(.12+rnd()*.3);const top=Hh*b-bh+Hh*.1;x.fillStyle=col;x.fillRect(X,top,bw,Hh-top);for(let yy=top+6;yy<Hh*.8;yy+=11)for(let xx=X+4;xx<X+bw-4;xx+=9)if(rnd()<.3){x.fillStyle=dusk?'rgba(255,220,150,.55)':'rgba(255,214,130,.6)';x.fillRect(xx,yy,4,5)}X+=bw+3}});
 if(dusk){// billboard frame behind venom
  x.fillStyle='#120818';x.fillRect(W*.45,Hh*.18,W*.53,Hh*.5);}
 // roof
 const ry=Hh*.82;const rg=x.createLinearGradient(0,ry,0,Hh);rg.addColorStop(0,dusk?'#3b2433':'#232838');rg.addColorStop(1,'#0b0d14');x.fillStyle=rg;x.fillRect(0,ry,W,Hh-ry);
 x.fillStyle=dusk?'#5b3346':'#394056';x.fillRect(0,ry-10,W,12);
 for(let i=0;i<220;i++){x.fillStyle='rgba(255,255,255,'+(rnd()*.08)+')';x.fillRect(rnd()*W,ry+rnd()*(Hh-ry),2,2)}
 if(!dusk){// water tower left + AC unit
  const cx=W*.06,bt=ry-10,s2=Math.min(W,Hh)/700;x.fillStyle='#2b1d14';x.fillRect(cx-30*s2,bt-150*s2,60*s2,70*s2);x.fillStyle='#1a120c';x.beginPath();x.moveTo(cx-36*s2,bt-150*s2);x.lineTo(cx,bt-185*s2);x.lineTo(cx+36*s2,bt-150*s2);x.fill();x.strokeStyle='#120c08';x.lineWidth=4*s2;x.beginPath();x.moveTo(cx-24*s2,bt);x.lineTo(cx-24*s2,bt-80*s2);x.moveTo(cx+24*s2,bt);x.lineTo(cx+24*s2,bt-80*s2);x.stroke();
  x.fillStyle='#4a5063';x.fillRect(W*.36,ry-50*s2,90*s2,40*s2);x.fillStyle='#2c3040';for(let i=0;i<5;i++)x.fillRect(W*.36+8*s2+i*16*s2,ry-44*s2,8*s2,28*s2)}
 else{x.strokeStyle='#1a0d1c';x.lineWidth=5;x.beginPath();x.moveTo(W*.04,ry-10);x.lineTo(W*.04,Hh*.12);x.stroke();x.fillStyle='#ffd23f';x.beginPath();x.arc(W*.04,Hh*.12,5,0,6.3);x.fill()}
 return c}
function drawBillboard(){if(!F.rematch||ok('bg_rooftops_dusk.svg'))return;const t=F.t,stun=F.stun>0;const cols=['#ff3fa4','#3fd0ff','#ffd23f','#7cff6b'];const cw=W*.53/6,ch=Hh*.5/3;
 for(let i=0;i<6;i++)for(let j=0;j<3;j++){const k=reduce()?(i+j)%4:(i+j+Math.floor(t*(stun?2.5:.8)))%4;ctx.globalAlpha=reduce()?.3:stun?.55:.25;ctx.fillStyle=cols[k];ctx.fillRect(W*.45+i*cw+3,Hh*.18+j*ch+3,cw-6,ch-6)}ctx.globalAlpha=1}
function drawHero(){const b=heroBox(),h=F.hero,glow=F.power/8;const x=b.x-h.knock*W*.06,y=b.y-h.jump;
 const HI=VZ.heroImg||'family/samuel_idle.svg',HV=VZ.heroWin||'family/samuel_victory.svg';const img=F.shrink>0&&ok(HV)?AS[HV]:h.jump>0&&ok('hero_swing.svg')?AS['hero_swing.svg']:ok(HI)?AS[HI]:ok('hero.svg')?AS['hero.svg']:null;
 if(glow>0){ctx.save();ctx.globalAlpha=.25+glow*.35;const gg=ctx.createRadialGradient(x+b.w/2,y+b.h/2,10,x+b.w/2,y+b.h/2,b.h*.6);gg.addColorStop(0,F.tier===3?'#ffd23f':'#7fe3ff');gg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gg;{const R=b.h*.6,gx=x+b.w/2,gy=y+b.h/2,x0=Math.max(x-b.w,gx-R),y0=Math.max(y-b.h*.2,gy-R),x1=Math.min(x+b.w*2,gx+R),y1=Math.min(y+b.h*1.2,gy+R);ctx.fillRect(x0,y0,x1-x0,y1-y0)}ctx.restore()}
 if(img){drawImgBox(img,x,y,b.w,b.h);return}
 const s=Math.min(b.w/120,b.h/230),cx=x+b.w/2,top=y+b.h-230*s;const red=S.hero==='G'?'#f4f4f8':'#c1121f',blu=S.hero==='G'?'#111':'#1d3f8f',acc=S.hero==='G'?'#ff5fa2':'#c1121f';
 ctx.save();ctx.translate(cx,top);ctx.scale(s,s);
 ctx.fillStyle=blu;ctx.fillRect(-26,120,22,95);ctx.fillRect(4,120,22,95);ctx.fillStyle=acc;ctx.fillRect(-28,200,26,16);ctx.fillRect(2,200,26,16);
 const tg=ctx.createLinearGradient(-40,0,40,0);tg.addColorStop(0,red);tg.addColorStop(.5,shadeC(red));tg.addColorStop(1,red);ctx.fillStyle=tg;ctx.beginPath();ctx.moveTo(-34,58);ctx.lineTo(34,58);ctx.lineTo(28,128);ctx.lineTo(-28,128);ctx.fill();
 ctx.fillStyle=blu;ctx.fillRect(-48,62,14,56);ctx.save();ctx.translate(40,66);ctx.rotate(-1.1+(F.webs.length?-.3:0));ctx.fillRect(-7,0,14,56);ctx.restore();
 ctx.strokeStyle='#000';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-12,78);ctx.lineTo(0,70);ctx.lineTo(12,78);ctx.moveTo(0,70);ctx.lineTo(0,100);ctx.stroke();
 const hg=ctx.createRadialGradient(-8,14,4,0,24,34);hg.addColorStop(0,'#fff');hg.addColorStop(.25,red);hg.addColorStop(1,shadeC(red));ctx.fillStyle=hg;ctx.beginPath();ctx.ellipse(0,26,28,34,0,0,6.3);ctx.fill();
 ctx.fillStyle='#fff';ctx.strokeStyle='#111';ctx.lineWidth=3;[[-1,1],[1,-1]].forEach(([d])=>{ctx.beginPath();ctx.moveTo(d*4,24);ctx.quadraticCurveTo(d*20,6,d*24,24);ctx.quadraticCurveTo(d*16,38,d*4,24);ctx.fill();ctx.stroke()});
 ctx.restore()}
function shadeC(c){return c==='#f4f4f8'?'#b9b6cc':c==='#c1121f'?'#6d0a12':'#333'}
function drawVenom(){const b=venBox();let sc=1,dx=0,dy=0;const t=F.t;
 if(F.shrink>0){sc=Math.max(.12,1-F.shrink*.9);dx=F.shrink>1?(F.shrink-1)*W*.5:0}
 const wob=reduce()?0:Math.sin(t*3)*.03;const lean=F.wind>0?-.12:0;
 const img=F.shrink>0&&ok('venom_defeat.svg')?AS['venom_defeat.svg']:F.vhit>0&&ok('venom_hit.svg')?AS['venom_hit.svg']:ok('venom.svg')?AS['venom.svg']:null;
 ctx.save();const cx=b.x+b.w/2+dx,base=b.y+b.h;ctx.translate(cx,base);ctx.rotate(lean);ctx.scale(sc*(1+wob)*(F.vhit>0?1.06:1),sc*(1-wob)*(F.vhit>0?.92:1));
 if(img){ctx.translate(-b.w/2,-b.h);drawImgBox(img,0,0,b.w,b.h);if(F.look&&F.shrink<=0){const r=Math.min(b.w/400,b.h/500),k=r*500/300;ctx.save();const ih=500*r,hTop=b.h-ih+ih*(VZ.headF==null?.135:VZ.headF);ctx.translate(b.w/2,hTop+282*k);ctx.scale(k,k);lookProps(F.look);ctx.restore()}if(F.vhit>0){ctx.globalAlpha=.18;ctx.fillStyle='#fff';ctx.fillRect(0,0,b.w,b.h);ctx.globalAlpha=1}ctx.restore();venomExtras(b,cx,base,sc);return}
 const s=Math.min(b.w/220,b.h/300);ctx.scale(s,s);
 // body
 const bg=ctx.createRadialGradient(-30,-200,10,0,-140,190);bg.addColorStop(0,'#59607f');bg.addColorStop(.35,'#1a1c2b');bg.addColorStop(1,'#020205');ctx.fillStyle=bg;
 ctx.beginPath();ctx.moveTo(-80,0);ctx.quadraticCurveTo(-120,-120,-70,-170);ctx.quadraticCurveTo(-90,-280,0,-290);ctx.quadraticCurveTo(90,-280,70,-170);ctx.quadraticCurveTo(120,-120,80,0);ctx.closePath();ctx.fill();
 // tendrils (goofy wiggles)
 ctx.strokeStyle='#0b0b12';ctx.lineWidth=14;ctx.lineCap='round';for(let k=0;k<4;k++){const a=t*2+k;ctx.beginPath();ctx.moveTo(k<2?-70:70,-150+k*20);ctx.quadraticCurveTo((k<2?-150:150)+Math.sin(a)*20,-200+k*30,(k<2?-130:130),-260+k*40+Math.cos(a)*15);ctx.stroke()}
 // white spider
 ctx.fillStyle='#e9ecf5';ctx.beginPath();ctx.moveTo(0,-160);ctx.quadraticCurveTo(-40,-150,-70,-90);ctx.quadraticCurveTo(-30,-120,0,-120);ctx.quadraticCurveTo(30,-120,70,-90);ctx.quadraticCurveTo(40,-150,0,-160);ctx.fill();
 // eyes (big, goofy)
 const blink=(Math.floor(t*0.5)%5===0&&(t*0.5%1)<.1);ctx.fillStyle='#fff';[-1,1].forEach(d=>{ctx.beginPath();ctx.moveTo(d*8,-240);ctx.quadraticCurveTo(d*60,-280,d*64,blink?-238:-226);ctx.quadraticCurveTo(d*40,-200,d*8,-240);ctx.fill()});
 // grin + tongue
 ctx.fillStyle='#f6f6f6';ctx.beginPath();ctx.moveTo(-46,-196);ctx.quadraticCurveTo(0,-160,46,-196);ctx.quadraticCurveTo(0,-178,-46,-196);ctx.fill();
 ctx.fillStyle='#ff6fa0';ctx.beginPath();ctx.moveTo(-6,-186);ctx.quadraticCurveTo(-14+Math.sin(t*4)*10,-140,6+Math.sin(t*4)*14,-120);ctx.quadraticCurveTo(18,-140,8,-186);ctx.fill();
 lookProps(F.look);
 if(F.vhit>0){ctx.globalAlpha=.25;ctx.fillStyle='#fff';ctx.fillRect(-120,-300,240,300);ctx.globalAlpha=1}
 ctx.restore();venomExtras(b,cx,base,sc)}
function lookProps(L){ctx.save();ctx.translate(0,290-290);if(L==='partyhat'){ctx.fillStyle='#ff5fa2';ctx.beginPath();ctx.moveTo(-30,-282);ctx.lineTo(0,-360);ctx.lineTo(30,-282);ctx.fill();ctx.fillStyle='#ffd23f';ctx.beginPath();ctx.arc(0,-362,9,0,6.3);ctx.fill()}
 if(L==='shades'){ctx.fillStyle='#111';ctx.strokeStyle='#4ff';ctx.lineWidth=4;ctx.fillRect(-66,-252,56,28);ctx.strokeRect(-66,-252,56,28);ctx.fillRect(10,-252,56,28);ctx.strokeRect(10,-252,56,28)}
 if(L==='bowtie'){ctx.fillStyle='#e63946';ctx.beginPath();ctx.moveTo(-34,-150);ctx.lineTo(0,-138);ctx.lineTo(34,-150);ctx.lineTo(34,-122);ctx.lineTo(0,-134);ctx.lineTo(-34,-122);ctx.fill()}
 if(L==='chef'){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-24,-300,22,0,6.3);ctx.arc(0,-314,26,0,6.3);ctx.arc(24,-300,22,0,6.3);ctx.fill();ctx.fillRect(-36,-296,72,20)}
 ctx.restore()}
function venomExtras(b,cx,base,sc){ // windup "!" and tendril strike
 if(F.wind>0&&F.finT<0){const y=b.y-10;ctx.fillStyle='#ffd23f';ctx.strokeStyle='#000';ctx.lineWidth=4;ctx.font=`900 ${Math.max(40,b.h*.16)}px system-ui`;ctx.textAlign='center';ctx.strokeText('!',cx,y+20);ctx.fillText('!',cx,y+20);
  const hb=heroBox();ctx.fillStyle='#ffe066';ctx.font=`800 ${Math.max(18,hb.h*.07)}px system-ui`;ctx.fillText('〰 spider-sense 〰',hb.x+hb.w/2,hb.y-6-F.hero.jump)}
 if(F.strike>0){const p=1-F.strike/.45;const hb=heroBox();const tx=hb.x+hb.w*.7,ty=hb.y+hb.h*.55;const vx=b.x+b.w*.15,vy=b.y+b.h*.5;const ex=vx+(tx-vx)*Math.min(1,p*1.6),ey=vy+(ty-vy)*Math.min(1,p*1.6);
  ctx.strokeStyle='#0b0b12';ctx.lineWidth=Math.max(10,b.w*.07);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(vx,vy);ctx.quadraticCurveTo((vx+ex)/2,vy-b.h*.35,ex,ey);ctx.stroke();ctx.strokeStyle='#59607f';ctx.lineWidth=3;ctx.stroke()}}
function drawWebs(){const col=['#ffffff','#e8f4ff','#9ff0ff','#ffd23f'][F.tier],lw=[3,6,7,8][F.tier];F.webs.forEach(w=>{const p=Math.min(1,w.t);const ex=w.x0+(w.x1-w.x0)*p,ey=w.y0+(w.y1-w.y0)*p;
  ctx.save();if(F.tier>=2){ctx.save();ctx.strokeStyle=col;ctx.globalAlpha=.25;ctx.lineWidth=lw*3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(w.x0,w.y0);ctx.lineTo(ex,ey);ctx.stroke();ctx.restore()}ctx.strokeStyle=col;ctx.globalAlpha=w.t>1?Math.max(0,1.4-w.t)/.4:1;ctx.lineWidth=lw;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(w.x0,w.y0);ctx.lineTo(ex,ey);ctx.stroke();
  if(ok('fx_web_shot.svg')&&p<1){const ang=Math.atan2(w.y1-w.y0,w.x1-w.x0),L=Math.min(W,Hh)*.16;ctx.translate(ex,ey);ctx.rotate(ang);ctx.drawImage(AS['fx_web_shot.svg'],-L,-L/8,L,L/4)}else{ctx.fillStyle=col;ctx.beginPath();ctx.arc(ex,ey,lw*1.4,0,6.3);ctx.fill()}
  if(F.tier>=1&&p<1&&Math.random()<.5)F.parts.push({x:ex,y:ey,vx:(Math.random()-.5)*60,vy:(Math.random()-.5)*60,life:.3,c:'#fff',r:2});ctx.restore()})}
function drawFinisher(){if(F.finT<0)return;const b=venBox(),c=venCenter();const p=Math.min(1,F.finT/1.6);ctx.save();ctx.strokeStyle=F.tier===3?'#ffd23f':'#fff';ctx.lineWidth=3;ctx.globalAlpha=.9;
 const rings=F.tier===0?5:9;for(let i=0;i<rings*p;i++){const a=(F.tier>=1?F.finT*2:0)+i*.7;ctx.beginPath();ctx.ellipse(c.x,c.y,b.w*.42,b.h*.12+i*4,a,0,6.3);ctx.stroke()}
 if(p>.5)drawCentered('fx_web_net.svg',c.x,c.y,Math.max(b.w,b.h)*.9,p);
 if(F.tier===1&&F.finT<1.2)drawCentered('fx_web_bomb.svg',c.x,c.y,Math.max(b.w,b.h)*(.4+F.finT*.5),1-F.finT/1.2);
 if(F.tier===2){const hb=heroBox();drawCentered('fx_swing_kick.svg',(hb.x+c.x)/2,c.y,Math.abs(c.x-hb.x)*1.1,Math.min(1,F.finT*2)*(F.finT<1.6?1:0))}
 if(F.tier===3){const hb=heroBox();drawCentered('fx_iron_legs.svg',hb.x+hb.w/2,hb.y+hb.h*.25,hb.w*1.6,Math.min(1,F.finT*1.5))}
 if(F.tier===3&&!reduce()){ctx.globalAlpha=.25;ctx.fillStyle='#ffd23f';ctx.beginPath();for(let i=0;i<12;i++){const a=i/12*6.28+F.finT;ctx.moveTo(c.x,c.y);ctx.arc(c.x,c.y,Math.max(W,Hh),a,a+.12);ctx.closePath()}ctx.fill()}
 ctx.restore()}
function draw(){if(!F||!ctx)return;if(!F.bgc)F.bgc=bgCache();ctx.save();if(F.shake>0&&!reduce()){const m=4;ctx.translate((Math.random()-.5)*m,(Math.random()-.5)*m)}
 ctx.drawImage(F.bgc,-8,-8,W+16,Hh+16);drawBillboard();
 if(!F.rematch&&!reduce()){ctx.strokeStyle='rgba(180,200,255,.18)';ctx.lineWidth=1;ctx.beginPath();for(let i=0;i<40;i++){const x=(i*97+F.t*60)%W,y=(i*53+F.t*500)%(Hh*.8);ctx.moveTo(x,y);ctx.lineTo(x-3,y+12)}ctx.stroke()}
 drawVenom();drawHero();drawWebs();drawFinisher();
 (F.spr||[]).forEach(o=>{const k=o.t/o.life;drawCentered(o.n,o.x,o.y,o.sz*(.7+.5*k),1-k)});
 F.parts.forEach(p=>{ctx.globalAlpha=Math.min(1,p.life*2);ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.3);ctx.fill()});ctx.globalAlpha=1;
 ctx.restore()}
// ---------- map headline ----------
let MAPSVG='',GOOSVG='';try{fetch('assets/map_nyc.svg').then(r=>r.ok?r.text():'').then(t=>{MAPSVG=t;if($('map').classList.contains('on'))buildMap()}).catch(()=>{});fetch('assets/map_goo_overlay.svg').then(r=>r.ok?r.text():'').then(t=>{GOOSVG=t;if($('map').classList.contains('on'))buildMap()}).catch(()=>{})}catch(e){}
function miniMap(cleared){if(!MAPSVG)return '';const n=cleared%6||(cleared&&cleared%6===0?0:0);const done=HOOD_IDS.slice(0,cleared%6);
 const goo=GOOSVG.replace(/<svg/,'<svg class="mm-goo"').replace(/id="(n-[a-z]+)"/g,(m,id)=>done.includes(id)?`id="g-${id}" style="display:none"`:`id="g-${id}"`);
 return `<div class="mm">${MAPSVG.replace(/<svg/,'<svg class="mm-base"')}${goo}</div>`}
const _bm=window.buildMap;window.buildMap=function(){_bm();const g=$('grid');if(!g)return;let hd=$('venomHead');if(hd)hd.remove();hd=document.createElement('div');hd.id='venomHead';
 const cleared=S.venomWins||0,inWave=cleared%6,toRe=3-(S.log.length%3);
 hd.innerHTML=`<div class="vh-face">${venomFace(86,lookFor())}</div>${miniMap(cleared)}<div class="vh-txt"><div class="vh-t">⚠ VENOM ALERT!</div><div class="vh-s">Venom's goo is spreading over the city. Every mission powers up your web-shooters, then you fight Venom!</div>
 <div class="vh-hoods" aria-label="${inWave} of 6 neighborhoods cleared">${HOODS.map((n,i)=>`<span class="${i<inWave?'ok':''}" title="${n}">${i<inWave?'✔':'●'}</span>`).join('')} <small>${inWave}/6 neighborhoods clean</small></div>
 <div class="vh-s"><b>${cleared}</b> Venom fights won · ${toRe===3?'<b>REMATCH next fight!</b>':`Big REMATCH in ${toRe} mission${toRe>1?'s':''}`}</div></div>`;
 const x=document.createElement('button');x.id='vhClose';x.setAttribute('aria-label',window.__vhMin?'Show Venom alert':'Hide Venom alert');x.textContent=window.__vhMin?'⚠':'✕';x.onclick=()=>{window.__vhMin=!window.__vhMin;buildMap()};hd.appendChild(x);if(window.__vhMin)hd.classList.add('min');
 g.insertBefore(hd,g.firstChild)};
window.buildMap=window.buildMap;buildMap=window.buildMap;
// ---------- grown-up settings ----------
const _par=parent;parent=function(){_par();const w=$('week');if(!w||$('vset'))return;const d=document.createElement('div');d.id='vset';d.className='row';d.style.cssText='margin:0 0 14px;gap:14px';
 d.innerHTML=`<label class="tog"><input type="checkbox" id="setCalm" ${S.calm?'checked':''}> Calm motion (no shake, zoom or pulse)</label><label class="tog"><input type="checkbox" id="setAuto" ${S.autoDodge?'checked':''}> Auto-dodge in Venom fights</label><label class="tog"><input type="checkbox" id="setHear" ${S.hear!==false?'checked':''}> Hear an answer before picking (tap twice)</label>`;
 w.parentNode.insertBefore(d,w);$('setCalm').onchange=e=>{S.calm=e.target.checked;save();applyCalm()};$('setAuto').onchange=e=>{S.autoDodge=e.target.checked;save()};$('setHear').onchange=e=>{S.hear=e.target.checked;save()}};
const _show=show;show=function(id){if(id!=='fight'&&F){stopFight()}_show(id)};
Object.assign(VZ,{F:()=>F,renderHud,sprite:(n,p,sz,l)=>F&&sprite(n,p,sz,l),venCenter,prompt,startFinisher:m=>F&&startFinisher(m)});
Object.assign(window.__g,{fight,venom:VZ});
})();
