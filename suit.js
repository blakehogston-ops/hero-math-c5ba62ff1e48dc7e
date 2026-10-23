/* Suit picker (Samuel): tap an unlocked suit to wear it. Recolors the fight/victory hero art, map hero and title portrait. Saved in S.suit. */
(function(){if(window.GS_MODE)return;const g=window.__g;if(!g)return;const S=g.S;
const mix=(h,t,a)=>{const n=parseInt(h.replace('#','').padEnd(6,h.slice(-1)).slice(0,6),16),r=n>>16,G=n>>8&255,b=n&255,m=t?255:0;const f=x=>Math.round(x+(m-x)*a).toString(16).padStart(2,'0');return '#'+f(r)+f(G)+f(b)};
const full=h=>h.length===4?'#'+h[1]+h[1]+h[2]+h[2]+h[3]+h[3]:h;
const css=document.createElement('style');css.textContent='.suit.pick{cursor:pointer;min-height:88px;touch-action:manipulation;border:4px solid transparent!important}.suit.sel{border-color:#ffd23f!important;box-shadow:0 0 0 4px #ffd23f55}.suit svg{width:100px!important;height:120px!important;display:block;margin:0 auto 6px}#miniHero svg{width:64px!important;height:76px!important}.suit .wear{font-weight:800;color:#ffd23f;margin-top:4px}';document.head.appendChild(css);
function cur(){const n=Math.floor(S.bricks.length/3);return (S.suit!=null&&S.suit<n)?SUITS[S.suit]:null}
const _bc=buildColl;buildColl=function(){const r=_bc.apply(this,arguments);const su=document.getElementById('suits');if(su&&!document.getElementById('suitTip'))su.insertAdjacentHTML('beforebegin','<div id="suitTip" style="font-size:22px;font-weight:800;margin:10px 0">👆 Tap a suit to wear it!</div>');const n=Math.floor(S.bricks.length/3);const sel=S.suit!=null&&S.suit<n?S.suit:0;
 [...document.querySelectorAll('#suits .suit')].forEach((el,i)=>{if(i>=n)return;el.classList.add('pick');el.setAttribute('role','button');el.setAttribute('aria-pressed',i===sel);el.classList.toggle('sel',i===sel);if(i===sel&&!el.querySelector('.wear'))el.insertAdjacentHTML('beforeend','<div class="wear">✓ Wearing</div>');
  el.onclick=()=>{S.suit=i;g.S.suit=i;save();try{window.HMA&&HMA.fx('suit')}catch(e){}buildColl();apply()}});return r};window.buildColl=buildColl;if(g)g.buildColl=buildColl;
const done={};function recolor(key,s){const nk=key+'#suit'+S.suit;const A=window.__AS;if(A[nk])return nk;if(done[nk])return null;done[nk]=1;
 fetch('assets/'+key).then(r=>r.text()).then(t=>{const p=full(s[1]),q=full(s[2]);const map={'#f04848':mix(p,1,.25),'#c41a26':p,'#6a0a12':mix(p,0,.55),'#3a0408':mix(p,0,.75),'#3d6ad8':mix(q,1,.25),'#1c3a9a':q,'#0a1648':mix(q,0,.55)};for(const k in map)t=t.split(k).join(map[k]);const i=new Image();i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(t);A[nk]=i});return null}
function apply(){const V=window.__v,A=window.__AS,s=cur();
 if(V&&A)['heroImg','heroWin'].forEach(k=>{let n=V[k];if(!n)return;const base=n.split('#')[0];if(!s||S.suit===0){if(n!==base)V[k]=base;return}if(n===base+'#suit'+S.suit)return;const nk=recolor(base,s);if(nk)V[k]=nk});
 const m=document.getElementById('miniHero');if(m&&s&&m.dataset.suit!=String(S.suit)){m.innerHTML=suitSvg(s,80);m.dataset.suit=S.suit}
 const pt=document.querySelector('#pickS .portrait-hero');if(pt&&s&&pt.dataset.suit!=String(S.suit)){const d=document.createElement('div');d.innerHTML=suitSvg(s,120);const sv=d.firstElementChild;sv.classList.add('portrait-hero');sv.dataset.suit=S.suit;pt.replaceWith(sv)}}
setInterval(apply,400);apply();window.__suit={apply,cur};
const _rh=window.renderHero;if(typeof renderHero==='function'){renderHero=function(){const r=_rh.apply(this,arguments);const m=document.getElementById('miniHero');if(m)delete m.dataset.suit;apply();return r}}
})();
