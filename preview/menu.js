/* gentle parallax on the title background: pointer (desktop) or device tilt is NOT used (avoids motion sickness); max 10px, slow ease */
(function(){const t=document.getElementById('title');if(!t||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const bg=t.querySelector('.mBg');if(!bg)return;
 let raf=0;t.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const x=(e.clientX/innerWidth-.5)*-10,y=(e.clientY/innerHeight-.5)*-6;bg.style.setProperty('--px',x+'px');bg.style.setProperty('--py',y+'px')})})})();
/* player cards: navigation starts once; taps before the page is ready, or after a card was picked, are ignored.
   Crossing to the other kid's page carries ?go=1 so that page opens straight onto the map (no second title screen). */
(function(){let done=false;const ready=()=>document.readyState==='complete';
 document.addEventListener('click',e=>{const c=e.target.closest&&e.target.closest('#pickS,#pickG');if(!c)return;
  if(done||!ready()){e.stopImmediatePropagation();e.preventDefault();return}
  const cross=(c.id==='pickG')!==!!window.GS_MODE;done=true;document.body.classList.add('mGoing');
  if(cross){e.stopImmediatePropagation();e.preventDefault();location.href=(window.GS_MODE?'index.html':'ghost.html')+'?go=1';return}
  setTimeout(()=>{done=false;document.body.classList.remove('mGoing')},1500)},true);
 if(/[?&]go=1\b/.test(location.search)){const go=()=>{try{history.replaceState(null,'',location.pathname)}catch(e){}const b=document.getElementById(window.GS_MODE?'pickG':'pickS');
   const t=document.getElementById('title');if(b&&t&&t.classList.contains('on'))b.click()};if(ready())setTimeout(go,0);else addEventListener('load',()=>setTimeout(go,0))}})();
/* Mask button: mask.js docks it into #title .mRow while the title screen is up */
(function(){const t=document.getElementById('title'),row=t&&t.querySelector('.mRow');if(!row)return;
 const place=()=>{const b=document.getElementById('maskBtn');if(!b)return;const on=t.classList.contains('on');
  if(on&&b.parentNode!==row)row.appendChild(b);else if(!on&&b.parentNode===row)document.body.appendChild(b)};
 new MutationObserver(place).observe(t,{attributes:true,attributeFilter:['class']});new MutationObserver(place).observe(document.body,{childList:true});place()})();
