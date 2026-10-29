/* Sadie (Ghost-Spider) only: Splat, a gentle, silly paint-mess maker replaces Venom.
   Teacher rules: never mean or scary, lines of 8 words or fewer, no laughing at mistakes. */
(function(){'use strict';
const L={intro:"Hi! I'm Splat. I made a mess!",
 taunts:["Uh-oh! My paint spilled!","Oops! Paint on the floor!","Oh no, a mess! Help clean it up!","I love pink paint. And teal!","Drip, drop! Oopsie!","Can you help me tidy up?"],
 win:"You fixed it! Thank you!",spidey:"All clean! Great job!"};
const CALL=["Ring ring! It's Splat! Hi!","I spilled paint again. Oops!","I am painting a rainbow!","Can you help me clean up?","I made a big paint puddle!","I lost my paintbrush. Silly me!","I got a new hat!","Bye bye! See you soon!"];
const FULL=[
 [/WE are Venom!.*crunchy!/,L.intro],[/REMATCH! WE have a new look!/,"I'm back! New paint colors!"],
 [/Too much math power!.*maybe!/,L.win],[/You did it! Venom.s the size of a jelly bean now!/,L.spidey],
 [/Venom's goo is spreading over the city!/,"Splat spilled paint on the city!"],[/Oh no, symbiote goo everywhere!/,"Oh no, paint everywhere!"],
 [/Venom is making a gooey mess!/,"Splat is making a messy splash!"],[/You beat Venom! I knew you could do it!/,"You helped Splat! I knew you could!"],
 [/Incoming call from Venom/,"Splat is calling!"],[/It.s just silly Venom calling\. No worries!/,"It's just silly Splat. Hi!"]];
let ci=0;const ALERT="Splat's paint is all over the city!";
function T(s){if(!s||!/Venom|WE |\bgoo|web him|Web him|symbiote/.test(s))return s;
 for(const [r,t] of FULL)if(r.test(s))return s.replace(r,t);
 if(/^\s*"?(WE |Is your refrigerator|Ring ring! WE|Hello\? It.s Venom)/.test(s))return CALL[(ci++)%CALL.length];
 return s.replace(/Venom says:/g,'Splat says:').replace(/Venom.s/g,"Splat's").replace(/Venom/g,'Splat').replace(/[Ww]eb him up!?/g,'Clean up the mess!').replace(/[Ww]eb him/g,'clean up').replace(/webbed up Splat/g,'cleaned up with Splat').replace(/symbiote goo/g,'paint').replace(/goo blobs?/g,'paint spots').replace(/gooey/g,'messy').replace(/\bgoo\b/g,'paint')}
window.__sadieLine=T;
function patchLines(){const V=window.__v;if(V&&V.LINES){Object.assign(V.LINES,L)}
 try{if(typeof STORY!=='undefined')STORY.splice(0,STORY.length,"Splat spilled paint on the city!","Oh no, paint everywhere!","Splat is making a messy splash!")}catch(e){}
 const A=window.__AS;if(A){['venom.svg','venom_hit.svg','venom_defeat.svg'].forEach(n=>{if(A[n]&&A[n]._splat)return;const i=new Image();i._splat=1;i.src='assets/splat.png';A[n]=i})}}
patchLines();document.addEventListener('DOMContentLoaded',patchLines);setTimeout(patchLines,500);
function walk(n){if(n.nodeType===3){const t=T(n.nodeValue);if(t!==n.nodeValue)n.nodeValue=t;return}
 if(n.nodeType!==1)return;if(n.tagName==='IMG'&&/venom/.test(n.getAttribute('src')||''))n.src=/call|head/.test(n.src)?'assets/splat_head.png':'assets/splat.png';
 if(n.classList&&(n.classList.contains('vh-face')||n.classList.contains('vface'))&&!n.querySelector('img.splat')){n.innerHTML='<img class="splat" src="assets/splat_head.png" alt="Splat">'}
 if(n.classList&&n.classList.contains('vtitle')&&n.textContent!==ALERT){n.textContent=ALERT;return}
 for(const k of [...n.childNodes])walk(k);
 if(n.getAttribute&&n.getAttribute('aria-label'))n.setAttribute('aria-label',T(n.getAttribute('aria-label')))}
new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')walk(m.target);else m.addedNodes.forEach(walk)}}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
if(window.speechSynthesis){const sp=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=u=>{try{u.text=T(u.text)}catch(e){}return sp(u)}}
const st=document.createElement('style');st.textContent='img.splat{width:100%;height:100%;object-fit:cover;border-radius:50%;display:block}';document.head.appendChild(st);
})();
