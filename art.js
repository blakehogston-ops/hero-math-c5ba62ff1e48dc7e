/* Hero Math Academy - realistic art layer (Art Director pass).
   Loaded after game.js. Only overrides drawing functions (sky, suitSvg) and decorates
   map/reward DOM after the game builds it. No game logic, no sound code. All art drawn in code. */
'use strict';
(function(){
const rng=seed=>{let s=seed;return()=>(s=(s*16807)%2147483647)/2147483647};
const lerp=(a,b,t)=>a+(b-a)*t;
function shade(hex,f){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const m=v=>Math.max(0,Math.min(255,Math.round(f<0?v*(1+f):v+(255-v)*f)));return'rgb('+m(r)+','+m(g)+','+m(b)+')'}

// ---------- background: NYC rooftops at night ----------
function waterTower(x,cx,base,s,rim){ // classic wooden rooftop tank
 const w=34*s,h=30*s,legH=26*s,top=base-legH-h;
 x.strokeStyle='#07090f';x.lineWidth=2.2*s;x.beginPath();
 [[-.42,-.36],[.42,.36],[-.14,-.12],[.14,.12]].forEach(([a,b])=>{x.moveTo(cx+a*w,base);x.lineTo(cx+b*w,base-legH)});
 x.moveTo(cx-.4*w,base-legH*.45);x.lineTo(cx+.4*w,base-legH*.45);x.moveTo(cx-.38*w,base-legH*.45);x.lineTo(cx+.38*w,base);x.moveTo(cx+.38*w,base-legH*.45);x.lineTo(cx-.38*w,base);x.stroke();
 const g=x.createLinearGradient(cx-w/2,0,cx+w/2,0);g.addColorStop(0,rim);g.addColorStop(.35,'#2a2019');g.addColorStop(1,'#0b0907');
 x.fillStyle=g;x.fillRect(cx-w/2,top,w,h);
 x.strokeStyle='rgba(0,0,0,.45)';x.lineWidth=1;for(let i=1;i<9;i++){x.beginPath();x.moveTo(cx-w/2+i*w/9,top);x.lineTo(cx-w/2+i*w/9,top+h);x.stroke()}
 x.strokeStyle='#0d0d10';x.lineWidth=1.6*s;[.22,.55,.85].forEach(t=>{x.beginPath();x.moveTo(cx-w/2,top+h*t);x.lineTo(cx+w/2,top+h*t);x.stroke()});
 const rg=x.createLinearGradient(cx-w/2,0,cx+w/2,0);rg.addColorStop(0,rim);rg.addColorStop(.4,'#1d1a1c');rg.addColorStop(1,'#08080b');
 x.fillStyle=rg;x.beginPath();x.moveTo(cx-w/2-2*s,top+1);x.lineTo(cx,top-15*s);x.lineTo(cx+w/2+2*s,top+1);x.closePath();x.fill();
 x.fillStyle='#0a0a0d';x.fillRect(cx-1*s,top-19*s,2*s,5*s);
}
function windows(x,r,X,top,bw,bot,cw,chh,p,dim){
 for(let yy=top+chh*.8;yy<bot-chh;yy+=chh*1.6)for(let xx=X+cw*.8;xx<X+bw-cw*1.4;xx+=cw*1.9){
  const v=r();if(v<p){const warm=r()<.82;const a=(.35+r()*.5)*dim;
   x.fillStyle=warm?`rgba(255,${190+r()*45|0},${110+r()*50|0},${a})`:`rgba(150,190,255,${a*.8})`;x.fillRect(xx,yy,cw,chh);
   if(r()<.3){x.fillStyle=`rgba(40,25,15,${.35*dim})`;x.fillRect(xx,yy,cw*(.3+r()*.4),chh)}}
  else{x.fillStyle=`rgba(8,10,18,${.5*dim})`;x.fillRect(xx,yy,cw,chh)}}
}
function haze(x,w,h,y0,y1,a){const g=x.createLinearGradient(0,y0,0,y1);g.addColorStop(0,'rgba(70,82,112,0)');g.addColorStop(.6,`rgba(70,82,112,${a})`);g.addColorStop(1,`rgba(92,90,112,${a*1.2})`);x.fillStyle=g;x.fillRect(0,y0,w,y1-y0)}
function sky(){const c=document.getElementById('sky'),w=innerWidth,h=innerHeight,d=Math.min(2,devicePixelRatio||1);
 c.width=w*d;c.height=h*d;c.style.width=w+'px';c.style.height=h+'px';const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);
 const r=rng(20261022),hor=h*.66,u=Math.max(.55,Math.min(1.3,Math.min(w,h*1.5)/900));
 // sky
 let g=x.createLinearGradient(0,0,0,hor);g.addColorStop(0,'#04070f');g.addColorStop(.55,'#0b1428');g.addColorStop(.88,'#1e2840');g.addColorStop(1,'#3b3a4c');x.fillStyle=g;x.fillRect(0,0,w,h);
 for(let i=0;i<90;i++){const sy=r()*hor*.6;x.fillStyle=`rgba(225,232,255,${(.15+r()*.45)*(1-sy/(hor*.6))})`;const s=r()<.08?1.6:1;x.fillRect(r()*w,sy,s,s)}
 // moon with soft glow
 const mx=w*.8,my=h*.15,mr=Math.max(14,22*u);g=x.createRadialGradient(mx,my,mr*.8,mx,my,mr*7);g.addColorStop(0,'rgba(200,210,235,.20)');g.addColorStop(1,'rgba(200,210,235,0)');x.fillStyle=g;x.fillRect(0,0,w,h);
 g=x.createRadialGradient(mx-mr*.3,my-mr*.3,mr*.1,mx,my,mr);g.addColorStop(0,'#f4f1e6');g.addColorStop(1,'#bdb9ad');x.fillStyle=g;x.beginPath();x.arc(mx,my,mr,0,7);x.fill();
 x.fillStyle='rgba(120,115,105,.25)';[[-.3,-.1,.22],[.25,.2,.16],[.05,-.4,.1]].forEach(([a,b,s])=>{x.beginPath();x.arc(mx+a*mr,my+b*mr,s*mr,0,7);x.fill()});
 // city glow on low clouds
 g=x.createLinearGradient(0,hor*.7,0,hor);g.addColorStop(0,'rgba(150,110,100,0)');g.addColorStop(1,'rgba(170,125,105,.28)');x.fillStyle=g;x.fillRect(0,hor*.7,w,hor*.3);
 // far skyline (with a couple of generic spires)
 let X=-5;while(X<w){const bw=(14+r()*34)*u,bh=(30+r()*130)*u*(r()<.1?1.8:1),top=hor-bh;x.fillStyle='#2a3149';x.fillRect(X,top,bw,h-top);
  if(r()<.12){x.beginPath();x.moveTo(X+bw*.3,top);x.lineTo(X+bw/2,top-bh*.35);x.lineTo(X+bw*.7,top);x.fill()}
  windows(x,r,X,top,bw,hor+20,1.6*u,2*u,.22,.6);X+=bw+r()*3}
 haze(x,w,h,hor-160*u,hor+40,.55);
 // middle layer
 const mid=h*.78;X=-10;while(X<w){const bw=(40+r()*70)*u,bh=(60+r()*170)*u,top=mid-bh;
  const bg=x.createLinearGradient(X,0,X+bw,0);bg.addColorStop(0,'#232a3e');bg.addColorStop(.25,'#171c2c');bg.addColorStop(1,'#10131e');x.fillStyle=bg;x.fillRect(X,top,bw,h-top);
  if(r()<.4){const sb=bw*(.2+r()*.2);x.fillRect(X+sb,top-24*u,bw-2*sb,24*u);}
  windows(x,r,X,top+6*u,bw,h,3*u,4*u,.3,.8);
  if(r()<.45)waterTower(x,X+bw*(.25+r()*.5),top,.6*u,'#4b4650');
  X+=bw+r()*6*u}
 haze(x,w,h,mid-120*u,h,.32);
 // near rooftops: brick, parapets, cornices, water towers, HVAC
 const near=h*.86;X=-20;while(X<w+20){const bw=(110+r()*140)*u,top=near-(r()*60)*u,brick=['#3a2420','#2f2a28','#3b2b22','#2a2626'][r()*4|0];
  const bg=x.createLinearGradient(X,0,X+bw,0);bg.addColorStop(0,shade(brick,.12));bg.addColorStop(.2,brick);bg.addColorStop(1,shade(brick,-.55));x.fillStyle=bg;x.fillRect(X,top,bw,h-top);
  x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=1;for(let yy=top+8*u;yy<h;yy+=5*u){x.beginPath();x.moveTo(X,yy);x.lineTo(X+bw,yy);x.stroke()}
  x.fillStyle='#4d4a50';x.fillRect(X-3*u,top-6*u,bw+6*u,6*u);x.fillStyle='rgba(205,215,240,.25)';x.fillRect(X-3*u,top-6*u,bw+6*u,1.5*u);
  windows(x,r,X+4*u,top+16*u,bw-8*u,h,7*u,10*u,.38,1);
  // rooftop props
  if(r()<.7)waterTower(x,X+bw*(.25+r()*.5),top-6*u,1.15*u,'#6b5b55');
  else{x.fillStyle='#202229';x.fillRect(X+bw*.2,top-26*u,bw*.3,20*u);x.fillStyle='rgba(200,210,235,.18)';x.fillRect(X+bw*.2,top-26*u,bw*.3,2*u)}
  if(r()<.5){x.fillStyle='#1a1416';x.fillRect(X+bw*.78,top-30*u,10*u,24*u)}
  X+=bw+(r()*14-4)*u}
 // ground mist & vignette (calm, no motion)
 g=x.createLinearGradient(0,h*.82,0,h);g.addColorStop(0,'rgba(20,26,40,0)');g.addColorStop(1,'rgba(20,26,40,.55)');x.fillStyle=g;x.fillRect(0,h*.82,w,h*.18);
 g=x.createRadialGradient(w/2,h*.45,h*.35,w/2,h/2,Math.max(w,h)*.85);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.5)');x.fillStyle=g;x.fillRect(0,0,w,h)}
window.sky=sky;

// ---------- hero portraits: original masked heroes (no licensed designs) ----------
let pid=0;
function hero(c1,c2,acc,lens,sz){const i='h'+(pid++);
 return `<svg viewBox="0 0 100 100" width="${sz||100}" height="${sz||100}" class="hp" aria-hidden="true"><defs>
 <radialGradient id="${i}bg" cx="50%" cy="40%" r="65%"><stop offset="0" stop-color="#2c3a5c"/><stop offset="1" stop-color="#0a0f1c"/></radialGradient>
 <radialGradient id="${i}h" cx="38%" cy="28%" r="80%"><stop offset="0" stop-color="${shade(c1,.35)}"/><stop offset=".45" stop-color="${c1}"/><stop offset="1" stop-color="${shade(c1,-.75)}"/></radialGradient>
 <linearGradient id="${i}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(c2,.25)}"/><stop offset=".5" stop-color="${c2}"/><stop offset="1" stop-color="${shade(c2,-.7)}"/></linearGradient>
 <linearGradient id="${i}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="${lens}"/><stop offset="1" stop-color="${shade(lens,-.55)}"/></linearGradient>
 <clipPath id="${i}c"><circle cx="50" cy="50" r="48"/></clipPath></defs>
 <circle cx="50" cy="50" r="48" fill="url(#${i}bg)"/>
 <g clip-path="url(#${i}c)">
  <path d="M8 104Q10 74 34 68L50 72L66 68Q90 74 92 104Z" fill="url(#${i}s)"/>
  <path d="M34 68L50 84L66 68L60 66L50 74L40 66Z" fill="${acc}" opacity=".9"/>
  <path d="M41 60h18v12H41z" fill="${shade(c1,-.6)}"/>
  <path d="M50 12C30 12 25 28 26 42C27 56 36 66 50 67C64 66 73 56 74 42C75 28 70 12 50 12Z" fill="url(#${i}h)"/>
  <path d="M50 14C50 30 50 50 50 66" stroke="${shade(c1,-.5)}" stroke-width="1" opacity=".5"/>
  <path d="M27 37Q50 29 73 37L72 48Q50 44 28 48Z" fill="#0b0d12"/>
  <path d="M29 39Q50 32 71 39L70 46Q50 42.5 30 46Z" fill="url(#${i}l)"/>
  <path d="M33 39.5Q50 35 67 39.5" stroke="#fff" stroke-width="1.3" opacity=".75" fill="none"/>
  <path d="M44 56Q50 59 56 56" stroke="${shade(c1,-.6)}" stroke-width="1.5" fill="none" opacity=".6"/>
  <path d="M50 16l3.5 7 7.5.6-5.7 4.8 1.8 7.3L50 31.8l-7.1 3.9 1.8-7.3-5.7-4.8 7.5-.6z" fill="${acc}" opacity=".85" transform="translate(0,-3) scale(1) "/>
  <ellipse cx="40" cy="24" rx="10" ry="5" fill="#fff" opacity=".18" transform="rotate(-20 40 24)"/>
  <path d="M26 42Q24 30 32 20" stroke="#fff" stroke-width="1.2" opacity=".15" fill="none"/>
 </g>
 <circle cx="50" cy="50" r="47" fill="none" stroke="#ffffff" stroke-opacity=".22" stroke-width="2"/></svg>`}
window.heroPortrait=hero;
// keep game.js suit names; draw each suit as an original helmeted hero in the suit's colors
window.suitSvg=(s,sz)=>hero(s[1],s[2],shade(s[2],.3),s[1]==='#f4f4f8'||s[1]==='#e9f2ff'?'#7fd3ff':'#e8f2ff',sz);

// ---------- rewards: realistic metal stars & badges ----------
function starSvg(on,sz){const i='st'+(pid++);return `<svg viewBox="0 0 24 24" width="${sz}" height="${sz}" aria-hidden="true"><defs><linearGradient id="${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3c4"/><stop offset=".35" stop-color="#f2c14e"/><stop offset=".7" stop-color="#b9831d"/><stop offset="1" stop-color="#7a5310"/></linearGradient></defs><path d="M12 1.8l3 6.4 7 .8-5.2 4.8 1.4 6.9L12 17.2l-6.2 3.5 1.4-6.9L2 9l7-.8z" fill="${on?`url(#${i})`:'rgba(255,255,255,.08)'}" stroke="${on?'#5a3d0a':'rgba(255,255,255,.35)'}" stroke-width="1"/>${on?'<path d="M12 4.5l1.6 3.6" stroke="#fff" stroke-opacity=".7" stroke-width="1"/>':''}</svg>`}
function badgeSvg(sz){const i='bd'+(pid++);return `<svg viewBox="0 0 120 140" width="${sz}" height="${sz*1.17}" class="badge" aria-hidden="true"><defs>
 <linearGradient id="${i}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1bf"/><stop offset=".3" stop-color="#e5b24a"/><stop offset=".65" stop-color="#a8741c"/><stop offset="1" stop-color="#6b470c"/></linearGradient>
 <linearGradient id="${i}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1b3f8f"/><stop offset=".5" stop-color="#2f6fdf"/><stop offset="1" stop-color="#14306d"/></linearGradient>
 <radialGradient id="${i}f" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#3a5aa8"/><stop offset="1" stop-color="#0f1d40"/></radialGradient></defs>
 <path d="M38 70L26 136L46 124L58 138L62 76Z" fill="url(#${i}r)"/><path d="M82 70L94 136L74 124L62 138L58 76Z" fill="url(#${i}r)"/>
 <path d="M44 70l-8 52M76 70l8 52" stroke="#c9302c" stroke-width="5"/>
 <circle cx="60" cy="58" r="50" fill="url(#${i}g)" stroke="#5a3d0a" stroke-width="2"/>
 ${[...Array(36)].map((_,k)=>{const a=k/36*Math.PI*2;return`<line x1="${60+44*Math.cos(a)}" y1="${58+44*Math.sin(a)}" x2="${60+48*Math.cos(a)}" y2="${58+48*Math.sin(a)}" stroke="#7a5310" stroke-width="1.2"/>`}).join('')}
 <circle cx="60" cy="58" r="38" fill="url(#${i}f)" stroke="#f5d27a" stroke-width="2.5"/>
 <path d="M60 32l7 15 16 1.8-12 11 3.3 16L60 68l-14.3 8 3.3-16-12-11 16-1.8z" fill="url(#${i}g)" stroke="#5a3d0a" stroke-width="1.2"/>
 <ellipse cx="42" cy="30" rx="16" ry="7" fill="#fff" opacity=".22" transform="rotate(-30 42 30)"/></svg>`}
window.starSvg=starSvg;window.badgeSvg=badgeSvg;

// ---------- mission map: city-block map with route markers ----------
const ICONS={place:'M4 20V9l5-3v14M9 20V4h7v16M16 20v-9h4v9M2 20h20',compare:'M12 3v18M5 21h14M4 7h16M4 7l-3 6h6zM20 7l-3 6h6z',addsub:'M12 5v14M5 12h14',mult:'M6 6l12 12M18 6L6 18',div:'M5 12h14M12 6.5v.1M12 17.5v.1',frac:'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 3v9h9',money:'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 7v10M15 9.5c-.8-1.2-5.5-1.5-5.5 1s5.5 1 5.5 3.5-4.7 2.5-6 .5',time:'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 7v5l3.5 2',geo:'M3 20h18L3 4zM7 20v-4h4',data:'M4 20V4M4 20h16M8 17v-5M12 17V8M16 17v-8',pattern:'M4 12a4 4 0 1 0 8 0a4 4 0 1 0 8 0'};
function icon(id){return `<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#f4e3b0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONS[id]||ICONS.place}"/></svg>`}
const bm=window.buildMap;
window.buildMap=function(){bm();const btns=[...document.querySelectorAll('#grid .mission')];
 btns.forEach((b,n)=>{const k=SK[n],st=S.skills[k.id];
  b.querySelector('.ic').innerHTML=`<span class="pin">${icon(k.id)}</span><span class="num">${n+1}</span>`;
  b.querySelector('.stars').innerHTML=[0,1,2].map(j=>starSvg(j<st.lvl,22)).join('');
  b.classList.toggle('done',st.missions>0)})};
// reward screen: add a medal above the brick
const fin=window.finish;
window.finish=function(){fin();document.getElementById('reward').scrollTop=0;const it=document.getElementById('rwItem');if(it&&!it.querySelector('.badge'))it.insertAdjacentHTML('afterbegin',`<div class="medal">${badgeSvg(120)}</div>`)};
// title portraits
function portraits(){const a=document.querySelector('#pickS .portrait-hero'),b=document.querySelector('#pickG .portrait-hero');
 if(a)a.outerHTML=hero('#b3121b','#1d3f8f','#d9a441','#e8f2ff',120).replace('class="hp"','class="hp portrait-hero"');
 if(b)b.outerHTML=hero('#eef0f6','#2a2f45','#ff5fa2','#7fd3ff',120).replace('class="hp"','class="hp portrait-hero"')}
if(window.__g){__g.finish=window.finish}
portraits();sky();
})();
