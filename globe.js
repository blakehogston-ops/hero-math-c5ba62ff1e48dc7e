/* globe.js — Daily Globe front page after a fight win.
   Hook: HMA.showGlobe(name, hood, opts?) -> Promise (resolves when Continue is tapped)
   opts: { onContinue(fn), headline, subhead (override the random pick), asset(url), speak:false } */
(function(){
'use strict';
const H = window.HMA = window.HMA || {};           // extend, never clobber
const ASSET = 'assets/bugle_front.svg';
const NS = 'http://www.w3.org/2000/svg';
/* verbatim from math-game-review/narrative_extras.md (Narrative Writer) */
const LINES = [
[
"{NAME} SAVES {HOOD}!",
"\"Just a normal Tuesday,\" says hero"
],
[
"GOO-BE GONE! {NAME} CLEANS UP {HOOD}",
"Sidewalks sparkly again, pigeons cheer"
],
[
"VENOM RUNS HOME CRYING!",
"Says {HOOD} is \"too heroic\""
],
[
"{HOOD} THROWS PARTY FOR {NAME}!",
"Pizza for everyone, extra cheese"
],
[
"HERO ALERT: {NAME} IS SUPER SMART!",
"Scientists say \"Wow\""
],
[
"{NAME} WEBS UP TROUBLE IN {HOOD}!",
"Bad guys stuck like gum on a shoe"
],
[
"VENOM SPOTTED HIDING IN TRASH CAN!",
"{NAME} says \"Come out, we can see you\""
],
[
"{HOOD} DOG GIVES {NAME} HIGH FIVE!",
"Experts: \"Very good boy\""
],
[
"GOOEY GUY GETS GOT!",
"{NAME} saves the day in {HOOD}"
],
[
"{NAME} SWINGS INTO THE RECORD BOOKS!",
"Coolest hero in {HOOD} history"
],
[
"ICE CREAM SAVED! {NAME} STOPS GOO ATTACK",
"Sprinkles safe in {HOOD}"
],
[
"VENOM SHRINKS TO JELLY BEAN SIZE!",
"\"I'll be back... maybe,\" he squeaks"
],
[
"KIDS OF {HOOD} VOTE {NAME} \"BEST HERO EVER\"",
"Vote was not close"
],
[
"{NAME} TO THE RESCUE, AGAIN!",
"{HOOD} grandmas send cookies"
],
[
"GOO GONE, SUN OUT IN {HOOD}!",
"Weather report: 100% awesome"
],
[
"VENOM'S NEW LOOK FAILS AGAIN!",
"{NAME} not fooled by silly hat"
],
[
"{NAME} SAVES CAT FROM GOO TREE!",
"Cat says \"meow,\" which means thanks"
],
[
"THWIP! THWIP! HOORAY!",
"{NAME} webs the day away in {HOOD}"
],
[
"{HOOD} MAKES {NAME} A GIANT TROPHY!",
"It's shaped like a pizza"
],
[
"EXTRA! EXTRA! {NAME} DID IT!",
"Whole city does a happy dance"
]
];
let svgCache = null;

function css(){
  if (document.getElementById('hma-globe-css')) return;
  const s = document.createElement('style'); s.id = 'hma-globe-css';
  s.textContent = `
#hmaGlobe{position:fixed;inset:0;z-index:9000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;
 background:radial-gradient(circle at 50% 30%,#3b6fd8,#1b2a5c);box-sizing:border-box;
 padding:max(12px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left));
 font-family:system-ui,sans-serif;animation:hgIn .35s ease-out}
#hmaGlobe .hg-page{flex:1 1 auto;min-height:0;max-width:100%;aspect-ratio:3/4;display:flex;align-items:center;justify-content:center}
#hmaGlobe .hg-page svg,#hmaGlobe .hg-page .hg-fb{max-width:100%;max-height:100%;width:auto;height:100%;border-radius:6px;box-shadow:0 8px 30px rgba(0,0,0,.45);transform:rotate(-1.5deg);animation:hgSpin .6s cubic-bezier(.2,1.4,.4,1)}
#hmaGlobe .hg-btns{display:flex;gap:14px;flex:0 0 auto;flex-wrap:wrap;justify-content:center}
#hmaGlobe button{min-width:150px;min-height:88px;padding:0 22px;font-size:24px;font-weight:800;border:0;border-radius:44px;cursor:pointer;
 background:#ffd93b;color:#1b2a5c;box-shadow:0 5px 0 #b8901a;touch-action:manipulation}
#hmaGlobe button.hg-go{background:#3be37a;box-shadow:0 5px 0 #1d9a4c}
#hmaGlobe button:active{transform:translateY(3px);box-shadow:0 2px 0 #0003}
#hmaGlobe .hg-fb{aspect-ratio:3/4;background:#f3ecd6;color:#14120e;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:Georgia,serif;padding:20px;box-sizing:border-box}
@media (orientation:landscape){#hmaGlobe{flex-direction:row}#hmaGlobe .hg-page{height:100%}#hmaGlobe .hg-btns{flex-direction:column}}
@keyframes hgIn{from{opacity:0}to{opacity:1}}
@keyframes hgSpin{from{transform:rotate(-200deg) scale(.1)}to{transform:rotate(-1.5deg) scale(1)}}
@media (prefers-reduced-motion:reduce){#hmaGlobe,#hmaGlobe .hg-page svg{animation:none}}`;
  document.head.appendChild(s);
}
function loadSvg(url){
  if (svgCache !== null) return Promise.resolve(svgCache);
  return fetch(url).then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(t => (svgCache = t)).catch(e => { console.warn('[HMA globe] asset missing, using fallback:', url, e); return (svgCache = ''); });
}
function el(tag, at, txt){ const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (txt) e.textContent = txt; return e; }

function pickLines(name, hood){
  const n = String(name || '').trim() || 'Hero';
  const h = String(hood || '').trim() || 'the City';
  const L = LINES[Math.floor(Math.random() * LINES.length)];
  const sub = (s, up) => s.replace(/\{NAME\}/g, up ? n.toUpperCase() : n).replace(/\{HOOD\}/g, up ? h.toUpperCase() : h);
  return { head: sub(L[0], true), sub: sub(L[1], false) };
}
function fill(svg, head, sub){
  const t = svg.querySelector('#headline-text');
  if (t){
    t.textContent = '';
    const words = head.split(' '); let lines = [head];
    if (head.length > 20){ let best = 1, bd = 1e9; for (let i = 1; i < words.length; i++){ const d = Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length); if (d < bd){ bd = d; best = i; } } lines = [words.slice(0, best).join(' '), words.slice(best).join(' ')]; }
    const longest = Math.max(...lines.map(l => l.length));
    const fs = lines.length > 1 ? Math.min(36, Math.round(50 * 19 / longest)) : Math.min(50, Math.round(50 * 18 / longest));
    t.setAttribute('font-size', fs);
    lines.forEach((l, i) => { const ts = el('tspan', {x: 300, y: lines.length > 1 ? (i ? 225 : 188) : 215}, l); if (l.length * fs * .62 > 530){ ts.setAttribute('textLength', 530); ts.setAttribute('lengthAdjust', 'spacingAndGlyphs'); } t.appendChild(ts); });
  }
  svg.querySelectorAll('text').forEach(x => { if (/bugle/i.test(x.textContent)) x.textContent = 'DAILY GLOBE'; });
  const ph = svg.querySelector('#photo');          // swap placeholder for a cheerful "photo"
  if (ph){
    ph.querySelectorAll('text').forEach(x => x.remove());
    ph.appendChild(el('text', {x: 300, y: 440, 'text-anchor': 'middle', 'font-size': 150}, '🕷️'));
    ph.appendChild(el('text', {x: 140, y: 330, 'text-anchor': 'middle', 'font-size': 70}, '🕸️'));
    ph.appendChild(el('text', {x: 470, y: 330, 'text-anchor': 'middle', 'font-size': 60}, '⭐'));
  }
  svg.appendChild(el('rect', {x: 36, y: 568, width: 528, height: 46, fill: '#f3ecd6'}));
  svg.appendChild(el('text', {x: 300, y: 600, 'text-anchor': 'middle', 'font-family': 'Georgia,serif', 'font-style': 'italic', 'font-size': 24, fill: '#2a2620'}, sub));
}
function fallbackSvg(head, sub){                 // drawn in code if the asset is missing
  const s = el('svg', {xmlns: NS, viewBox: '0 0 600 800'});
  s.appendChild(el('rect', {width: 600, height: 800, fill: '#f3ecd6'}));
  s.appendChild(el('text', {x: 300, y: 92, 'text-anchor': 'middle', 'font-family': 'Georgia,serif', 'font-weight': 'bold', 'font-size': 72}, 'DAILY GLOBE'));
  s.appendChild(el('rect', {x: 30, y: 120, width: 540, height: 4}));
  s.appendChild(el('text', {id: 'headline-text', x: 300, y: 215, 'text-anchor': 'middle', 'font-family': 'Georgia,serif', 'font-weight': 'bold', 'font-size': 50}, ''));
  const g = el('g', {id: 'photo'}); g.appendChild(el('rect', {x: 40, y: 252, width: 520, height: 290, fill: '#8fa6c8'})); s.appendChild(g);
  fill(s, head, sub); return s;
}
function toPng(svg){
  return new Promise((res, rej) => {
    const xml = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => { try {
      const c = document.createElement('canvas'); c.width = 1200; c.height = 1600;
      const g = c.getContext('2d'); g.fillStyle = '#f3ecd6'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(b => b ? res(b) : rej(new Error('toBlob failed')), 'image/png');
    } catch (e) { rej(e); } };
    img.onerror = () => rej(new Error('svg render failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
  });
}
async function savePicture(svg, fname, btn){
  const old = btn.textContent; btn.textContent = '⏳ …';
  try {
    const blob = await toPng(svg);
    const file = (typeof File === 'function') ? new File([blob], fname, {type: 'image/png'}) : null;
    if (file && navigator.canShare && navigator.canShare({files: [file]}) && navigator.share){
      try { await navigator.share({files: [file], title: 'Daily Globe'}); btn.textContent = '✅ Shared!'; return; }
      catch (e) { if (e && e.name === 'AbortError') { btn.textContent = old; return; } }
    }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fname;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    btn.textContent = '✅ Saved!';
  } catch (e) { console.warn('[HMA globe] save failed', e); btn.textContent = '🙂 Try again'; }
  setTimeout(() => { btn.textContent = old; }, 2200);
}

H.showGlobe = function(name, hood, opts){
  opts = opts || {};
  css();
  const old = document.getElementById('hmaGlobe'); if (old) old.remove();
  const pk = pickLines(name, hood);
  const head = opts.headline || pk.head;
  const sub = opts.subhead || pk.sub;
  return loadSvg(opts.asset || ASSET).then(txt => new Promise(resolve => {
    const o = document.createElement('div'); o.id = 'hmaGlobe'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', 'Daily Globe front page: ' + head);
    const page = document.createElement('div'); page.className = 'hg-page';
    let svg = null;
    if (txt){ const d = document.createElement('div'); d.innerHTML = txt; svg = d.querySelector('svg'); }
    if (svg) fill(svg, head, sub); else svg = fallbackSvg(head, sub);
    svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', head);
    page.appendChild(svg);
    const btns = document.createElement('div'); btns.className = 'hg-btns';
    btns.innerHTML = '<button class="hg-save" type="button" aria-label="Save picture">📸 Save picture</button><button class="hg-go" type="button" aria-label="Continue">Continue ➜</button>';
    o.append(page, btns); document.body.appendChild(o);
    const fname = 'daily-globe-' + head.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.png';
    btns.querySelector('.hg-save').onclick = e => savePicture(svg, fname, e.currentTarget);
    btns.querySelector('.hg-go').onclick = () => { o.remove(); try { opts.onContinue && opts.onContinue(); } catch (e) { console.warn(e); } resolve(); };
    try { H.fx && H.fx('fanfare'); } catch (e) {}
    try { if (window.speechSynthesis && opts.speak !== false){ speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(head.toLowerCase()); u.rate = .95; u.pitch = 1.15; speechSynthesis.speak(u); } } catch (e) {}
    btns.querySelector('.hg-go').focus({preventScroll: true});
  }));
};
H.showGlobe.LINES = LINES;
})();
