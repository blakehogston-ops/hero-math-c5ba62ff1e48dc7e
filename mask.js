/* Hero Math Academy (preview): Mask on/off toggle with a peel animation. Uses assets/family/*.svg.
   Swaps the fight sprite (window.__AS['hero.svg'], exposed by venom.js) to the family figure for the picked hero. */
'use strict';
(function(){
const KEY='hma_mask',D='assets/family/';
let on=localStorage.getItem(KEY)!=='off';
const who=()=>window.GS_MODE?'sadie':'samuel';
const reduce=()=>(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)||document.body.classList.contains('calm');
const cache={};
function load(n){return cache[n]||(cache[n]=fetch(D+n).then(r=>r.ok?r.text():'').catch(()=>''))}
// venom.js draws VZ.heroImg / VZ.heroWin (keys into its AS cache, exposed as window.__AS).
function sprite(){const V=window.__v,A=window.__AS;if(!V)return;const sfx=on?'_masked':'';
 [['heroImg','idle'],['heroWin','victory']].forEach(([k,p])=>{const n=`family/${who()}_${p}${sfx}.svg`;
  if(A&&!A[n]){const i=new Image();i.onerror=()=>{i.bad=1};i.src='assets/'+n;A[n]=i}V[k]=n})}
const css=document.createElement('style');css.textContent=`
#maskBtn{position:fixed;left:14px;bottom:14px;z-index:60;min-width:120px;min-height:88px;padding:10px 18px;border-radius:32px;border:4px solid #fff;background:#c41a26;color:#fff;font:bold 22px system-ui,sans-serif;box-shadow:0 4px 12px #0006;touch-action:manipulation}
#maskBtn.off{background:#1c3a9a}
#maskFx{position:fixed;inset:0;z-index:59;display:flex;align-items:center;justify-content:center;background:#0008;pointer-events:none}
#maskFx svg{width:min(70vw,420px);height:auto}
.mspark{position:absolute;font-size:34px;animation:msp .7s ease-out forwards}@keyframes msp{from{transform:scale(.2);opacity:1}to{transform:scale(1.4) translateY(-30px);opacity:0}}`;
document.head.appendChild(css);
const b=document.createElement('button');b.id='maskBtn';b.setAttribute('aria-label','Mask on or off');
const label=()=>{b.textContent=on?'🎭 Mask off':'🦸 Mask on';b.classList.toggle('off',!on)};
document.body.appendChild(b);label();sprite();
const ez=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
async function play(toOff){
  const t=await load(`${who()}_idle_masked.svg`);if(!t||reduce())return;
  const fx=document.createElement('div');fx.id='maskFx';
  fx.innerHTML=t.replace(/id="([^"]+)"/g,'id="mk-$1"').replace(/url\(#([^)]+)\)/g,'url(#mk-$1)');document.body.appendChild(fx);
  const q=i=>fx.querySelector('#mk-'+i),m=q('mask'),arm=q('armR'),pa=q('peelarm'),p1=q('peelpath'),p2=q('peelpath2'),h=q('peelhand');
  if(arm)arm.style.display='none';pa.style.display='inline';m.style.display='inline';
  const sx=248,sy=150,chin=[222,124],top=[218,20];
  await new Promise(res=>{const T0=performance.now(),DUR=800;
    (function f(now){let u=Math.min(1,(now-T0)/DUR);const k=toOff?u:1-u;// k: 0 masked+hand down, 1 peeled
      const reach=Math.min(1,k/.3),peel=ez(Math.max(0,(k-.3)/.7));
      const rest=[262,250];let hx=rest[0]+(chin[0]-rest[0])*ez(reach),hy=rest[1]+(chin[1]-rest[1])*ez(reach);
      hx+=(top[0]-chin[0])*peel;hy+=(top[1]-chin[1])*peel;
      const ex=sx+38,ey=(sy+hy)/2+20,d=`M${sx} ${sy} L${ex} ${ey} L${hx} ${hy}`;p1.setAttribute('d',d);p2.setAttribute('d',d);h.setAttribute('cx',hx);h.setAttribute('cy',hy);
      m.setAttribute('transform',`translate(0 ${-110*peel}) rotate(${-10*peel} 220 120) translate(200 120) scale(${1+.05*peel} ${1-.25*peel}) translate(-200 -120)`);
      m.style.opacity=peel>.8?String(1-(peel-.8)*5):'1';
      if(u<1)requestAnimationFrame(f);else res()})(T0)});
  if(toOff)for(let i=0;i<5;i++){const s=document.createElement('span');s.className='mspark';s.textContent='✨';s.style.left=(40+Math.random()*20)+'%';s.style.top=(25+Math.random()*15)+'%';s.style.animationDelay=(i*60)+'ms';fx.appendChild(s)}
  await new Promise(r=>setTimeout(r,500));fx.remove();
}
b.onclick=async()=>{if(b.disabled)return;b.disabled=true;const toOff=on;await play(toOff);on=!toOff;try{localStorage.setItem(KEY,on?'on':'off')}catch(e){}label();sprite();b.disabled=false};
['pickS','pickG'].forEach(id=>{const e=document.getElementById(id);e&&e.addEventListener('click',()=>setTimeout(sprite,0))});
window.HMA_MASK={play,get on(){return on},sprite};
})();
/* Builder: dock the mask button into the current screen's top bar (never over answers); hidden during the Venom fight on phones */
(function(){const b=document.getElementById('maskBtn');if(!b)return;const st=document.createElement('style');
st.textContent='#maskBtn.docked{position:static;min-width:88px;min-height:88px;font-size:18px;padding:8px 12px;border-width:3px;border-radius:22px;box-shadow:0 4px 10px #0006}@media (max-width:600px),(max-height:500px){#maskBtn.docked{font-size:16px}body.vfight #maskBtn{display:none}}';document.head.appendChild(st);
function dock(){const fight=document.getElementById('fight');const inFight=fight&&fight.classList.contains('on');document.body.classList.toggle('vfight',!!inFight);
 const mp=document.getElementById('mapMenuP');const host=(innerWidth<1000&&mp&&document.getElementById('map').classList.contains('on'))?mp:document.querySelector('.screen.on .top');
 if(host&&!inFight){if(b.parentNode!==host||(host.id!=='mapMenuP'&&b.previousElementSibling!==host.firstElementChild))(host.id==='mapMenuP'?host.appendChild(b):host.insertBefore(b,host.firstElementChild?host.firstElementChild.nextSibling:null));if(!b.classList.contains('docked'))b.classList.add('docked')}else{if(b.parentNode!==document.body)document.body.appendChild(b);if(b.classList.contains('docked'))b.classList.remove('docked')}}
let qd=0;const sched=()=>{if(qd)return;qd=1;requestAnimationFrame(()=>{qd=0;dock()})};const mo=new MutationObserver(sched);const watch=()=>document.querySelectorAll('.screen,#fight').forEach(el=>mo.observe(el,{attributes:true,attributeFilter:['class']}));watch();setInterval(()=>{watch();sched()},1500);dock()})();
