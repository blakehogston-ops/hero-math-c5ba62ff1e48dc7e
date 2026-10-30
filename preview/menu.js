/* gentle parallax on the title background: pointer (desktop) or device tilt is NOT used (avoids motion sickness); max 10px, slow ease */
(function(){const t=document.getElementById('title');if(!t||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const bg=t.querySelector('.mBg');if(!bg)return;
 let raf=0;t.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const x=(e.clientX/innerWidth-.5)*-10,y=(e.clientY/innerHeight-.5)*-6;bg.style.setProperty('--px',x+'px');bg.style.setProperty('--py',y+'px')})})})();
