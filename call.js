/* call.js — goofy (never scary) Venom phone call before a rematch.
   Hook: HMA.venomCall(done, opts?) -> Promise<'answered'|'declined'>; done(result) is called once.
   opts: { sound:false (no ring), speak:false (no voice), taunt:'custom line' } */
(function(){
'use strict';
const H = window.HMA = window.HMA || {};
const ASSET = 'assets/venom_call.svg';
/* verbatim from math-game-review/narrative_extras.md (Narrative Writer) */
const TAUNTS = [
"Hello? It's Venom. WE lost our sock. Have you seen it?",
"WE are coming back! Right after our nap.",
"WE ordered a pizza... with goo on top. It was yucky.",
"Ring ring! WE are making a new goo puddle. A BIG one!",
"WE got a new hat! You will NEVER recognize us!",
"WE are not scared of you! ...Okay, a little bit.",
"Is your refrigerator running? WE ate it. Burp!",
"WE are practicing our scary face. Mirror says it's cute."
];
let cache = null, actx = null;

function css(){
  if (document.getElementById('hma-call-css')) return;
  const s = document.createElement('style'); s.id = 'hma-call-css';
  s.textContent = `
#hmaCall{position:fixed;inset:0;z-index:9001;display:flex;align-items:center;justify-content:center;gap:16px;box-sizing:border-box;
 background:radial-gradient(circle at 50% 35%,#6d4bd8,#2a1d5e 70%);font-family:system-ui,sans-serif;color:#fff;
 padding:max(12px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left));flex-direction:column}
#hmaCall .hc-phone{flex:1 1 auto;min-height:0;aspect-ratio:1/2;max-width:100%;display:flex;align-items:center;justify-content:center}
#hmaCall .hc-phone svg,#hmaCall .hc-fb{height:100%;width:auto;max-width:100%;filter:drop-shadow(0 10px 24px #0008)}
#hmaCall.ringing .hc-phone{animation:hcShake 1.1s ease-in-out infinite}
#hmaCall.ringing .hc-phone svg #answer{animation:hcPulse .9s ease-in-out infinite;transform-origin:265px 600px;transform-box:view-box}
#hmaCall .hc-side{display:flex;flex-direction:column;align-items:center;gap:14px;flex:0 0 auto;max-width:520px;width:100%}
#hmaCall .hc-bubble{display:none;background:#fff;color:#2a1d5e;border-radius:24px;padding:14px 18px;font-size:clamp(18px,2.6vw,24px);font-weight:700;line-height:1.3;
 box-shadow:0 6px 0 #0003;position:relative;text-align:center}
#hmaCall.talking .hc-bubble{display:block;animation:hcPop .35s cubic-bezier(.2,1.6,.4,1)}
#hmaCall .hc-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
#hmaCall button{min-width:150px;min-height:88px;padding:0 22px;font-size:24px;font-weight:800;border:0;border-radius:44px;cursor:pointer;color:#fff;touch-action:manipulation}
#hmaCall .hc-ans,#hmaCall .hc-go{background:#2fcf6b;box-shadow:0 5px 0 #188a43}
#hmaCall .hc-dec{background:#ff6b6b;box-shadow:0 5px 0 #b83b3b}
#hmaCall .hc-go{display:none;background:#ffd93b;color:#2a1d5e;box-shadow:0 5px 0 #b8901a}
#hmaCall.talking .hc-ans,#hmaCall.talking .hc-dec{display:none}
#hmaCall.talking .hc-go{display:inline-block}
#hmaCall .hc-fb{aspect-ratio:1/2;border-radius:36px;background:#141826;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:28px;font-weight:800;gap:10px}
#hmaCall .hc-fb .hc-face{font-size:90px}
#hmaCall button:active{transform:translateY(3px)}
@media (orientation:landscape){#hmaCall{flex-direction:row}#hmaCall .hc-phone{height:100%}#hmaCall .hc-side{max-width:min(520px,55vw)}}
@keyframes hcShake{0%,40%,100%{transform:rotate(0)}5%,15%,25%,35%{transform:rotate(-4deg)}10%,20%,30%{transform:rotate(4deg)}}
@keyframes hcPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
@keyframes hcPop{from{transform:scale(.3);opacity:0}to{transform:scale(1);opacity:1}}
@media (prefers-reduced-motion:reduce){#hmaCall.ringing .hc-phone,#hmaCall.ringing .hc-phone svg #answer{animation:none}}`;
  document.head.appendChild(s);
}
function loadSvg(){
  if (cache !== null) return Promise.resolve(cache);
  return fetch(ASSET).then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(t => (cache = t)).catch(e => { console.warn('[HMA call] asset missing, using fallback:', ASSET, e); return (cache = ''); });
}
/* soft, friendly two-tone "brring" via WebAudio — no asset files */
function ringer(){
  let stop = false, t = null;
  try {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return () => {};
    actx = actx || new AC(); if (actx.state === 'suspended') actx.resume().catch(() => {});
    const burst = () => {
      if (stop) return; const now = actx.currentTime;
      for (let i = 0; i < 2; i++){
        const o = actx.createOscillator(), g = actx.createGain(), s0 = now + i * .45;
        o.type = 'sine'; o.frequency.setValueAtTime(i ? 660 : 784, s0);
        g.gain.setValueAtTime(0, s0); g.gain.linearRampToValueAtTime(.08, s0 + .03); g.gain.linearRampToValueAtTime(0, s0 + .35);
        o.connect(g).connect(actx.destination); o.start(s0); o.stop(s0 + .4);
      }
      t = setTimeout(burst, 1800);
    };
    burst();
  } catch (e) {}
  return () => { stop = true; clearTimeout(t); };
}
function speak(text, onEnd){
  try {
    if (!window.speechSynthesis) return false;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.rate = .95; u.pitch = .7; // goofy-deep, not scary
    if (onEnd) u.onend = onEnd; speechSynthesis.speak(u); return true;
  } catch (e) { return false; }
}

H.venomCall = function(done, opts){
  opts = opts || {};
  css();
  const prev = document.getElementById('hmaCall'); if (prev) prev.remove();
  return loadSvg().then(txt => new Promise(resolve => {
    const o = document.createElement('div'); o.id = 'hmaCall'; o.className = 'ringing';
    o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', 'Incoming call from Venom');
    const ph = document.createElement('div'); ph.className = 'hc-phone';
    let svg = null;
    if (txt){ const d = document.createElement('div'); d.innerHTML = txt; svg = d.querySelector('svg'); }
    if (svg){ svg.setAttribute('aria-hidden', 'true'); ph.appendChild(svg); }
    else ph.innerHTML = '<div class="hc-fb" aria-hidden="true"><div>INCOMING CALL</div><div class="hc-face">😜</div><div>VENOM</div><div style="font-size:18px;opacity:.7">ringing…</div></div>';
    const side = document.createElement('div'); side.className = 'hc-side';
    side.innerHTML = '<div class="hc-bubble" aria-live="polite"></div><div class="hc-btns">' +
      '<button type="button" class="hc-dec" aria-label="Decline call">✖ Decline</button>' +
      '<button type="button" class="hc-ans" aria-label="Answer call">📞 Answer</button>' +
      '<button type="button" class="hc-go" aria-label="Hang up and let\'s go">Let\'s go! 🕷️</button></div>';
    o.append(ph, side); document.body.appendChild(o);
    const stopRing = opts.sound === false ? () => {} : ringer();
    try { H.fx && H.fx('soft'); } catch (e) {}
    let fin = false;
    const finish = res => {
      if (fin) return; fin = true; stopRing();
      try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
      o.remove(); try { typeof done === 'function' && done(res); } catch (e) { console.warn(e); } resolve(res);
    };
    const answer = () => {
      if (o.classList.contains('talking')) return;
      stopRing(); o.classList.remove('ringing'); o.classList.add('talking');
      const line = opts.taunt || TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
      side.querySelector('.hc-bubble').textContent = line;
      if (opts.speak !== false) speak(line);
      side.querySelector('.hc-go').focus({preventScroll: true});
    };
    side.querySelector('.hc-ans').onclick = answer;
    side.querySelector('.hc-dec').onclick = () => finish('declined');
    side.querySelector('.hc-go').onclick = () => finish('answered');
    if (svg){                                   // the drawn phone buttons work too
      const a = svg.querySelector('#answer'), d = svg.querySelector('#decline');
      if (a){ a.style.cursor = 'pointer'; a.addEventListener('click', answer); }
      if (d){ d.style.cursor = 'pointer'; d.addEventListener('click', () => { if (!o.classList.contains('talking')) finish('declined'); }); }
    }
    side.querySelector('.hc-ans').focus({preventScroll: true});
  }));
};
H.venomCall.TAUNTS = TAUNTS;
})();
