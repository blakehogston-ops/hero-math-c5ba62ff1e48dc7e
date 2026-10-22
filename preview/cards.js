/* Hero Math Academy – Hero Trading Cards + Binder (cards.js)
 * Flavor text: /workspace/math-game-review/narrative_extras.md (Narrative Writer). Tiers keyed to TIERS in venom.js.
 *
 * API:
 *   HMA.awardCard(stats) -> card   Picks a card, saves it to localStorage (S.heroCards via game.js save()), returns it.
 *   HMA.openBinder(opts?)          Full-screen binder (10 slots). opts = { onClose?: fn }. Tap a card to see it big.
 *   HMA.closeBinder()
 *   HMA.getCards() -> card[]       Copy of all owned cards, oldest first.
 *
 * stats = the Venom fight result plus optional mission context (all optional):
 *   { tier:  0|1|2|3  index into venom.js TIERS (0 thin, 1 thick, 2 glow, 3 gold) = res.tier
 *     power: 0..8     mission power (res.power / M.power). Used for tier only if tier is missing:
 *                     0-2 thin, 3-5 thick, 6-7 glow, 8 gold (same bands as the writer's doc)
 *     hood:  string   neighborhood cleared (M.hood)
 *     skill: string   game.js skill id, e.g. 'mult' (M.id)
 *     time:  number   fight seconds (res.time) – stored only, never shown }
 *   Unknown fields are stored as-is in card.stats. Nothing is ever shown as a score or grade.
 *
 * Which card: the tier's card if not owned yet; else that tier's finisher move (TIERS[tier].fin) if not owned;
 *   else the next unowned web move; else a duplicate of the tier card (duplicates are fine and still celebrated).
 * Rarity / frame: thin+thick -> common, glow -> rare, gold -> epic.
 * card: { id, key, kind:'tier'|'move', tier, rar, name, text, t, stats }
 * Stored in S.heroCards (separate from hero.js's older S.cards so the two binders never clash).
 */
'use strict';
(function(){
const H=window.HMA=window.HMA||{};
const st=(typeof S!=='undefined')?S:null;if(st)st.heroCards=st.heroCards||[];
const LSK='hma_cards_v1';
let mem=[];if(!st){try{mem=JSON.parse(localStorage.getItem(LSK))||[]}catch(e){}}
const sv=()=>{try{if(typeof save==='function'&&st)save();else localStorage.setItem(LSK,JSON.stringify(mem))}catch(e){}};
const list=()=>st?st.heroCards:mem;
const talk=t=>{try{typeof say==='function'&&say(t)}catch(e){}};
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const CAT=[
 {key:'thin',kind:'tier',tier:0,name:'THIN WEB',text:'Every hero starts somewhere. Thwip!',emo:'🕸️'},
 {key:'thick',kind:'tier',tier:1,name:'THICK WEB',text:'Extra sticky, with sparkles on top!',emo:'✨'},
 {key:'glow',kind:'tier',tier:2,name:'GLOWING WEB',text:"So bright the moon said 'whoa.'",emo:'🌕'},
 {key:'gold',kind:'tier',tier:3,name:'GOLD WEB',text:'The shiniest web in the whole city!',emo:'🏆'},
 {key:'WEB SHOT',kind:'move',name:'WEB SHOT',text:'Tap, thwip, stick. Easy peasy!',emo:'🎯'},
 {key:'DODGE-JUMP',kind:'move',name:'DODGE-JUMP',text:'Swipe up and away! Missed me!',emo:'🦘'},
 {key:'WEB-WRAP!',kind:'move',name:'WEB-WRAP!',text:'Wrapped up like a burrito!',emo:'🌯'},
 {key:'SPIN WEB-WRAP!',kind:'move',name:'SPIN WEB-WRAP!',text:'Spin, spin, wrap! Dizzy Venom!',emo:'🌀'},
 {key:'THWIP COMBO!',kind:'move',name:'THWIP COMBO!',text:"Thwip-thwip-THWIP! Can't stop, won't stop!",emo:'💥'},
 {key:'SUPER WEB STORM!',kind:'move',name:'SUPER WEB STORM!',text:'A gold web tornado! Total hero power!',emo:'🌪️'}];
const FIN=['WEB-WRAP!','SPIN WEB-WRAP!','THWIP COMBO!','SUPER WEB STORM!'];// mirrors venom.js TIERS[].fin
const RAR=['common','common','rare','epic'];
const tierOf=s=>{const t=+s.tier;if(t>=0&&t<=3&&s.tier!==undefined&&s.tier!==null)return Math.floor(t);const p=+s.power||0;return p>=8?3:p>=6?2:p>=3?1:0};
const art=c=>`<span class="hc-emo">${(CAT.find(x=>x.key===c.key)||{}).emo||'🕷️'}</span>`;
H.awardCard=function(stats){const s=Object.assign({},stats||{});const tier=tierOf(s);const own=k=>list().some(x=>x.key===k);
 const tc=CAT[tier];let c=!own(tc.key)?tc:!own(FIN[tier])?CAT.find(x=>x.key===FIN[tier]):CAT.find(x=>x.kind==='move'&&!own(x.key))||tc;
 const card={id:'c'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),key:c.key,kind:c.kind,tier,rar:RAR[tier],name:c.name,text:c.text,t:Date.now(),stats:s};
 list().push(card);sv();return Object.assign({},card)};
H.getCards=()=>list().map(c=>Object.assign({},c));
function cardHtml(c,big){const stat='';
 return `<button class="hc-card ${c.rar}${big?' big':''}" data-id="${esc(c.id||c.t)}" aria-label="${esc(c.rar)} card: ${esc(c.name)}. ${esc(c.text||'')}"><img class="hc-fr" src="assets/card_frame_${esc(c.rar)}.svg" alt=""><div class="hc-name">${esc(c.name)}</div><div class="hc-art">${art(c)}</div><div class="hc-txt">${esc(c.text||'')}${stat}</div></button>`}
const css=`#binderT{position:fixed;inset:0;z-index:60;display:flex;flex-direction:column;background:linear-gradient(#2a1840,#0b0f1e);color:#fff;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)}
#binderT .bt-top{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;gap:10px}#binderT h2{margin:0;font-size:clamp(22px,4vw,34px)}
#binderT .bt-x{min-width:88px;min-height:88px;border:0;border-radius:22px;background:#ffffff22;color:#fff;font:inherit;font-size:24px;font-weight:700;padding:0 22px;cursor:pointer}
#binderT .bt-grid{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:16px;padding:6px 16px 24px;align-content:start;align-items:start}
.hc-card{position:relative;display:block;width:100%;height:auto;aspect-ratio:300/420;border:0;padding:0;background:none;cursor:pointer;min-width:88px;min-height:88px;font:inherit;color:#111;container-type:inline-size}
.hc-fr{position:absolute;inset:0;width:100%;height:100%}
.hc-name{position:absolute;left:7.3%;right:7.3%;top:4.3%;height:7.6%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:7.5cqw;color:#10131c;white-space:nowrap;overflow:hidden}
.hc-art{position:absolute;left:7.3%;right:7.3%;top:13.3%;height:54.8%;display:flex;align-items:center;justify-content:center;overflow:hidden}.hc-art svg{max-width:80%;max-height:90%}
.hc-emo{font-size:30cqw}
.hc-txt{position:absolute;left:7.3%;right:7.3%;top:70.5%;height:20%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:5.6cqw;line-height:1.15;padding:0 4%;text-align:center}
.hc-st{display:flex;gap:6%;margin-top:3%;font-weight:800;font-size:6cqw}
.hc-cell{position:relative;padding-bottom:140%}.hc-cell>*{position:absolute!important;inset:0;width:100%;height:100%}.hc-lock{box-sizing:border-box;border:3px dashed #ffffff44;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:28px;color:#ffffff88;text-align:center}
.hc-card.epic{filter:drop-shadow(0 0 10px #ffd23f88)}
#hcBig{position:fixed;inset:0;z-index:70;background:#000c;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px}
#hcBig .hc-card{width:min(78vw,52vh*300/420*1.4,420px)}
@media (max-height:500px){#hcBig .hc-card{width:min(48vh,300px)}}`;
let root=null,BO={};
function ensureCss(){if(document.getElementById('cardsCss'))return;const s=document.createElement('style');s.id='cardsCss';s.textContent=css;document.head.appendChild(s)}
function bigView(c){const o=document.createElement('div');o.id='hcBig';o.innerHTML=cardHtml(c,true)+'<button class="bt-x" style="min-width:160px;min-height:88px;border:0;border-radius:22px;background:#2f6fdf;color:#fff;font-size:24px;font-weight:700">Close</button>';o.onclick=e=>{if(e.target.closest('.bt-x')||e.target===o)o.remove()};document.body.appendChild(o);talk(`${c.name}. ${c.text||''}`)}
H.openBinder=function(opts){BO=opts||{};ensureCss();if(root)root.remove();const cat=CAT,own=list();const rk=r=>['epic','rare','common'].indexOf(r);
 const cells=cat.map((c,i)=>{const best=own.filter(x=>x.key===c.key).sort((a,b)=>rk(a.rar)-rk(b.rar))[0];return best?`<div class="hc-cell">${cardHtml(best)}</div>`:`<div class="hc-cell"><div class="hc-lock">🔒<br>${esc(c.kind==='move'?'Web move':'Web')}</div></div>`}).join('');
 const n=new Set(own.map(c=>c.key)).size;
 root=document.createElement('div');root.id='binderT';root.setAttribute('role','dialog');root.setAttribute('aria-label','Card binder');
 root.innerHTML=`<div class="bt-top"><h2>📇 My Hero Cards <small>${n}/${cat.length}</small></h2><button class="bt-x" aria-label="Close binder">⬅ Done</button></div><div class="bt-grid">${cells}</div>`;
 root.querySelector('.bt-x').onclick=()=>H.closeBinder();
 root.querySelector('.bt-grid').onclick=e=>{const b=e.target.closest('.hc-card');if(!b)return;const c=own.find(x=>String(x.id||x.t)===b.dataset.id);c&&bigView(c)};
 document.body.appendChild(root);talk(n?`You have ${n} hero card${n===1?'':'s'}!`:'Win missions to collect hero cards!');return root};
H.closeBinder=function(){if(!root)return;root.remove();root=null;if(typeof BO.onClose==='function')BO.onClose();else{try{typeof buildMap==='function'&&buildMap();typeof show==='function'&&show('map')}catch(e){}}};
H.cardHtml=c=>{ensureCss();return cardHtml(c)};
})();
