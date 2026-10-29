/* Polish pass (preview): labels for emoji-only buttons, Show me how beside I'm stuck. Layout only. */
(function(){const L={calmM:'🫧 Breathe',calmP:'🫧 Breathe',voiceM:'🔊 Sound',toTitle:'🏠 Home'};
function fix(){for(const id in L){const b=document.getElementById(id);if(b&&b.dataset.lab!=='1'){b.textContent=L[id];b.dataset.lab='1'}}
 const h=document.getElementById('how'),r=document.getElementById('helpRow');if(h&&r&&h.parentNode!==r)r.appendChild(h)}
new MutationObserver(fix).observe(document.documentElement,{childList:true,subtree:true});document.addEventListener('DOMContentLoaded',fix);fix()})();
