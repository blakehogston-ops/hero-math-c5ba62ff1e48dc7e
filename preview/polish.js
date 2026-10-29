/* Polish pass (preview): labels for emoji-only buttons, Show me how beside I'm stuck. Layout only. */
(function(){const L={calmM:'🫧 Breathe',calmP:'🫧 Breathe',voiceM:'🔊 Sound',toTitle:'🏠 Home'};
function fix(){for(const id in L){const b=document.getElementById(id);if(b&&b.dataset.lab!=='1'){b.textContent=L[id];b.dataset.lab='1'}}
}
new MutationObserver(fix).observe(document.documentElement,{childList:true,subtree:true});document.addEventListener('DOMContentLoaded',fix);fix()})();
/* Map top bar: 5 labeled buttons (blue = go somewhere, teal = helpers); the rest under "More". Buttons are only hidden, never moved, so their handlers stay intact. */
(function(){function add(){const row=document.querySelector('#map .top .row');if(!row||document.getElementById('mapMore'))return;
 const b=document.createElement('button');b.id='mapMore';b.className='btn small';b.textContent='⋯ More';b.setAttribute('aria-expanded','false');
 b.onclick=()=>{const m=document.getElementById('map');const o=m.classList.toggle('more-open');b.textContent=o?'✕ Less':'⋯ More';b.setAttribute('aria-expanded',String(o))};
 const home=document.getElementById('toTitle');row.insertBefore(b,home||null)}
new MutationObserver(add).observe(document.documentElement,{childList:true,subtree:true});document.addEventListener('DOMContentLoaded',add);add()})();
(function(){function tag(){document.querySelectorAll('.vh-face').forEach(e=>e.dataset.slot='villain-head');const m=document.getElementById('miniHero');if(m)m.dataset.slot='hero-portrait'}
new MutationObserver(tag).observe(document.documentElement,{childList:true,subtree:true});tag()})();
/* Help row order (Samuel): I'm stuck, Show me how, then Spider-Sense below. Sadie: one "Help" button in steps (nudge first, then Show me how). */
(function(){const G=()=>!!window.GS_MODE;
function fix(){const r=document.getElementById('helpRow'),h=document.getElementById('how');if(!r)return;
 let w=document.getElementById('helpWrap');if(!w){w=document.createElement('div');w.id='helpWrap';r.parentNode.insertBefore(w,r)}if(r.parentNode!==w)w.appendChild(r);
 if(h&&h.parentNode!==w)w.appendChild(h);
 if(G()){const sy=document.getElementById('say');if(sy&&sy.parentNode!==w)w.insertBefore(sy,w.firstChild);const s=document.getElementById('stuckBtn');if(s&&s.dataset.one!=='1'){s.dataset.one='1';s.textContent='🙋 Help';s.setAttribute('aria-label','Help')}}}
new MutationObserver(fix).observe(document.documentElement,{childList:true,subtree:true});fix();
let lastQ=null;document.addEventListener('click',e=>{if(!G())return;const s=e.target.closest&&e.target.closest('#stuckBtn');if(!s)return;const q=window.__g&&__g.M&&__g.M.q;
 if(q&&q===lastQ){e.stopImmediatePropagation();e.preventDefault();const h=document.getElementById('how');h&&h.click();setTimeout(()=>{const n=document.getElementById('nextStep')||document.getElementById('hint');n&&n.scrollIntoView({block:'end',behavior:'smooth'})},250)}else lastQ=q},true);
/* praise: findable + measurable */
function tagP(){document.querySelectorAll('#cheer,#reward .panel,.bubble').forEach(x=>{x.classList.add('hma-praise');x.dataset.testid='praise'})}
new MutationObserver(tagP).observe(document.documentElement,{childList:true,subtree:true});tagP()})();
(function(){function lead(){const q=document.getElementById('qtext');if(!q||q.querySelector('.qlead'))return;const h=q.innerHTML,m=h.match(/^((?:<span[^>]*>Your turn!<\/span>\s*)?)(What comes next\?|What number is missing\?)(\s|&nbsp;)*/);if(m)q.innerHTML=m[1]+'<span class="qlead">'+m[2]+'</span>'+h.slice(m[0].length)}
new MutationObserver(lead).observe(document.documentElement,{childList:true,subtree:true,characterData:true});lead()})();

(function(){const L={hmaMus:'Music',hmaSfx:'Effects'};function f(){for(const id in L){const b=document.getElementById(id);if(b){const t=b.textContent.trim();if(t&&!/[A-Za-z]/.test(t))b.textContent=t+' '+L[id]}}}
new MutationObserver(f).observe(document.documentElement,{childList:true,subtree:true});f()})();
/* Sadie number tiles (sequence + missing-number strips): number ~45% of tile height, max 40px on screen, always inside its tile */
(function(){function fit(){if(!window.GS_MODE)return;document.querySelectorAll('#play svg').forEach(sv=>{const m=sv.getScreenCTM&&sv.getScreenCTM();const k=m&&m.a;if(!k)return;
 sv.querySelectorAll('text').forEach(t=>{const r=t.previousElementSibling;if(!r||r.tagName!=='rect'||!(t.textContent||'').trim())return;const rw=+r.getAttribute('width'),rh=+r.getAttribute('height'),rx=+r.getAttribute('x'),ry=+r.getAttribute('y');if(!rw||!rh)return;
  const tx=+t.getAttribute('x');if(tx<rx||tx>rx+rw)return;const len=t.textContent.trim().length;let u=Math.min(rh*0.45,40/k,(rw-8)/(0.62*len));
  if(t.dataset.fit!==u.toFixed(1)){t.dataset.fit=u.toFixed(1);t.dataset.fs0=t.dataset.fs0||t.getAttribute('font-size');t.setAttribute('font-size',u.toFixed(1));t.setAttribute('y',(ry+rh/2+u*0.36).toFixed(1))}})})}
new MutationObserver(()=>requestAnimationFrame(fit)).observe(document.documentElement,{childList:true,subtree:true});addEventListener('resize',fit)})();

/* LEVEL UP / cheer: centred just above the answer grid; if that would touch the question, strip or answers, float over the top bar area instead */
(function(){function place(){const c=document.getElementById('cheer'),A=document.getElementById('answers');if(!c||!A||!A.offsetParent)return;
 const T=[...A.querySelectorAll('.ans')].map(e=>e.getBoundingClientRect()).filter(r=>r.width);const a=T.length?{left:Math.min(...T.map(r=>r.left)),right:Math.max(...T.map(r=>r.right)),top:Math.min(...T.map(r=>r.top))}:A.getBoundingClientRect();a.width=a.right-a.left;c.style.whiteSpace='nowrap';c.style.fontSize='';c.style.setProperty('transform','translate(-50%,-50%)','important');
 const vis=e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'};
 const obs=[...document.querySelectorAll('button,a,[role=button],#bossBar,#venomHead,#qtext,#model,#helpWrap,#hint.on,#answers .ans')].filter(e=>!c.contains(e)&&vis(e)).map(e=>e.getBoundingClientRect());
 const hit=b=>obs.some(r=>!(r.right<=b.left||r.left>=b.right||r.bottom<=b.top||r.top>=b.bottom));
 let fs=Math.min(parseFloat(getComputedStyle(c).fontSize)||60,60),ok=null;
 for(let i=0;i<30&&fs>=14;i++,fs*=0.9){c.style.setProperty('font-size',fs+'px','important');const w=c.offsetWidth,h=c.offsetHeight;if(w>a.width)continue;
  const cx=a.left+a.width/2;for(let t=a.top-6-h;t>=4;t-=4){const b={left:cx-w/2,right:cx+w/2,top:t,bottom:t+h};if(!hit(b)){ok={x:cx,y:t+h/2};break}}if(ok)break}
 if(ok){c.style.setProperty('left',ok.x+'px','important');c.style.setProperty('top',ok.y+'px','important');c.dataset.fit='1'}
 else{c.dataset.fit='0';c.style.setProperty('left','50%','important');c.style.setProperty('top','50%','important')}}
const go=()=>{if(typeof window.cheer!=='function'||window.cheer._p)return;const o=window.cheer;const f=function(){const r=o.apply(this,arguments);try{place()}catch(e){}return r};f._p=1;window.cheer=f;try{cheer=f}catch(e){}};go();document.addEventListener('DOMContentLoaded',go);setTimeout(go,500);
const mo=new MutationObserver(()=>{const c=document.getElementById('cheer');if(c&&c.classList.contains('on'))place()});const w=()=>{const c=document.getElementById('cheer');if(c)mo.observe(c,{attributes:true,attributeFilter:['class']});else setTimeout(w,300)};w()})();
