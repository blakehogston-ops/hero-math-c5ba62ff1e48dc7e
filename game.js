'use strict';
const $=id=>document.getElementById(id);
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fmt=n=>n.toLocaleString('en-US');
const money=c=>'$'+(c/100).toFixed(2);
// ---------- save ----------
const KEY=window.GS_MODE?'heroMath.sadie.v1':'heroMath.v1';
const SK=[
 {id:'place',ic:'🏙️',name:'Place Value Patrol',sub:'Digits & rounding',sol:'3.NS.1, 3.CE.1b'},
 {id:'compare',ic:'⚖️',name:'Bigger or Smaller?',sub:'Compare numbers',sol:'3.NS.2'},
 {id:'addsub',ic:'➕',name:'Add & Subtract Rescue',sub:'Within 1,000',sol:'3.CE.1'},
 {id:'mult',ic:'✖️',name:'Multiply Mission',sub:'Facts 0–10',sol:'3.CE.2'},
 {id:'div',ic:'➗',name:'Share the Bricks',sub:'Division facts',sol:'3.CE.2'},
 {id:'frac',ic:'🍕',name:'Fraction Fix-Up',sub:'Parts of a whole',sol:'3.NS.3'},
 {id:'money',ic:'🪙',name:'Money Missions',sub:'Coins & bills',sol:'3.NS.4'},
 {id:'time',ic:'🕒',name:'Clock Tower',sub:'Telling time',sol:'3.MG.3'},
 {id:'geo',ic:'📐',name:'Shape & Measure Lab',sub:'Shapes, area, perimeter',sol:'3.MG.1, 3.MG.2, 3.MG.4'},
 {id:'data',ic:'📊',name:'Data Detective',sub:'Bar graphs',sol:'3.PS.1'},
 {id:'pattern',ic:'🔁',name:'Pattern Power',sub:'What comes next?',sol:'3.PFA.1'},
];
if(window.GS_MODE&&window.GS){SK.length=0;SK.push(...GS.SK)}
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S)S={hero:'S',voice:true,bricks:[],skills:{},log:[]};
SK.forEach(k=>{if(!S.skills[k.id])S.skills[k.id]={lvl:1,streak:0,miss:0,q:0,first:0,missions:0,last:0}});
SK.forEach(k=>{const s=S.skills[k.id];s.best=Math.max(s.best||1,s.lvl)});if(S.cap===undefined)S.cap=3;S.brave=S.brave||0;
let sess={n:0,t0:Date.now()};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
// ---------- speech & sound ----------
function spoken(t){t=String(t);const W={'>':'greater than','<':'less than','=':'equals'};if(W[t.trim()])return W[t.trim()];return t.replace(/&nbsp;/g,' ').replace(/ ___ /g,' blank ').replace(/ &gt; | > /g,' greater than ').replace(/ &lt; | < /g,' less than ').replace(/<[^>]+>/g,' ').replace(/×/g,' times ').replace(/÷/g,' divided by ').replace(/−/g,' minus ').replace(/ - /g,' minus ').replace(/\+/g,' plus ').replace(/ = /g,' equals ').replace(/ \? /g,' what ').replace(/_+/g,' blank ').replace(/(\d+)\/(\d+)/g,(m,a,b)=>a+' '+({2:'half',3:'third',4:'fourth',5:'fifth',6:'sixth',8:'eighth',10:'tenth',12:'twelfth'}[b]||('over '+b))+(a=='1'?'':'s'))}
let enVoice=null,sayT=0,sayW=0,primed=false;
function pickVoice(){try{const v=speechSynthesis.getVoices();enVoice=v.find(x=>/en-US/i.test(x.lang)&&/Samantha|Google US|Aaron|Nicky/i.test(x.name))||v.find(x=>/en-US/i.test(x.lang))||v.find(x=>/^en/i.test(x.lang))||null}catch(e){}}
if(window.speechSynthesis){pickVoice();try{speechSynthesis.addEventListener('voiceschanged',pickVoice)}catch(e){}}
function primeSpeech(){if(primed||!window.speechSynthesis)return;primed=true;try{const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}catch(e){}}
document.addEventListener('pointerdown',primeSpeech,{capture:true,once:true});
function stopVoice(){clearTimeout(sayT);clearTimeout(sayW);try{if(typeof dadAudio!=='undefined'&&dadAudio)dadAudio.pause()}catch(e){}try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}}
function say(t,force,onend){stopVoice();if(!(S.voice||force)||!window.speechSynthesis){onend&&onend();return}
 const wasBusy=speechSynthesis.speaking||speechSynthesis.pending;
 const go=()=>{try{const u=new SpeechSynthesisUtterance(spoken(t));u.lang='en-US';if(enVoice)u.voice=enVoice;u.rate=window.GS_MODE?.85:.92;u.pitch=1.05;let st=false;u.onstart=()=>{st=true};if(onend){u.onend=onend;u.onerror=onend}speechSynthesis.speak(u);
  sayW=setTimeout(()=>{if(!st&&!speechSynthesis.speaking){const b=$('say');b&&b.classList.add('pulse')}},1000)}catch(e){onend&&onend()}};
 if(wasBusy)sayT=setTimeout(go,60);else go()}
const sents=t=>String(t).match(/[^.!?]+[.!?]*(\s|$)/g).map(s=>s.trim()).filter(Boolean);
let AC;function chime(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;[523,659,784,1047].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t+i*.08);g.gain.linearRampToValueAtTime(.12,t+i*.08+.02);g.gain.exponentialRampToValueAtTime(.001,t+i*.08+.5);o.connect(g).connect(AC.destination);o.start(t+i*.08);o.stop(t+i*.08+.55)})}catch(e){}}
// ---------- sky ----------
function sky(){const c=$('sky'),w=innerWidth,h=innerHeight,d=Math.min(2,devicePixelRatio||1);c.width=w*d;c.height=h*d;c.style.width=w+'px';c.style.height=h+'px';const x=c.getContext('2d');x.scale(d,d);
 const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1630');g.addColorStop(.55,'#24406e');g.addColorStop(.8,'#e08a5c');g.addColorStop(1,'#f3c17a');x.fillStyle=g;x.fillRect(0,0,w,h);
 let s=7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
 for(let i=0;i<120;i++){x.fillStyle='rgba(255,255,255,'+(rnd()*.6)+')';x.fillRect(rnd()*w,rnd()*h*.45,1.3,1.3)}
 [[.55,'#1d2c4a',.5],[.7,'#121c31',.75],[.85,'#0a1020',1]].forEach(([base,col,sc])=>{let X=-10;while(X<w){const bw=(30+rnd()*70)*sc,bh=h*(.12+rnd()*.35)*sc;const top=h-bh*(base>.8?1:1.25)-(1-base)*h*.2;
  const bg=x.createLinearGradient(X,0,X+bw,0);bg.addColorStop(0,col);bg.addColorStop(1,'#000');x.fillStyle=bg;x.fillRect(X,top,bw,h-top);
  if(rnd()<.25){x.fillRect(X+bw/2-2,top-30*sc,4,30*sc)}
  for(let yy=top+8;yy<h-6;yy+=10*sc)for(let xx=X+5;xx<X+bw-5;xx+=9*sc)if(rnd()<.28){x.fillStyle='rgba(255,'+(200+rnd()*55|0)+',140,'+(.35+rnd()*.5)+')';x.fillRect(xx,yy,4*sc,5*sc)}
  X+=bw+2}});
 const v=x.createRadialGradient(w/2,h/2,h*.3,w/2,h/2,h);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=v;x.fillRect(0,0,w,h)}
function layout(){document.body.classList.toggle('port',innerHeight>innerWidth);sky()}
addEventListener('resize',layout);
// ---------- SVG models ----------
const svg=(w,h,b)=>`<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" font-family="Avenir Next,Arial" font-weight="700">${b}</svg>`;
const T=(x,y,t,s=22,f='#14213d',a='middle')=>`<text x="${x}" y="${y}" font-size="${s}" fill="${f}" text-anchor="${a}">${t}</text>`;
function stud(x,y,r,c){return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="#0003" stroke-width="2"/><circle cx="${x-r*.3}" cy="${y-r*.3}" r="${r*.35}" fill="#fff6"/>`}
function blocks(n,label){ // base-ten blocks, n<=9999
 const th=Math.floor(n/1000),h=Math.floor(n/100)%10,t=Math.floor(n/10)%10,o=n%10;let x=10,b='';const H=170;
 for(let i=0;i<th;i++){b+=`<g transform="translate(${x},40)"><rect width="60" height="60" fill="#2f6fdf" stroke="#0e2350" stroke-width="2"/><path d="M0 0l16-16h60l-16 16zM60 0l16-16v60l-16 16z" fill="#5b8ff0" stroke="#0e2350" stroke-width="2"/></g>`;x+=84}
 if(th)x+=8;for(let i=0;i<h;i++){b+=`<g transform="translate(${x},30)"><rect width="50" height="100" rx="3" fill="#e63946" stroke="#5c0b0e" stroke-width="2"/>${[...Array(9)].map((_,k)=>`<line x1="0" x2="50" y1="${(k+1)*10}" y2="${(k+1)*10}" stroke="#5c0b0e55"/><line y1="0" y2="100" x1="${(k+1)*5}" x2="${(k+1)*5}" stroke="#5c0b0e33"/>`).join('')}</g>`;x+=(h>5?30:56)}
 if(h)x+=30;for(let i=0;i<t;i++){b+=`<g transform="translate(${x},30)"><rect width="12" height="100" rx="2" fill="#ffb703" stroke="#7a5200" stroke-width="2"/>${[...Array(9)].map((_,k)=>`<line x1="0" x2="12" y1="${(k+1)*10}" y2="${(k+1)*10}" stroke="#7a520088"/>`).join('')}</g>`;x+=16}
 if(t)x+=12;for(let i=0;i<o;i++){b+=`<rect x="${x+(i%3)*15}" y="${100+Math.floor(i/3)*-15}" width="12" height="12" rx="2" fill="#2fbf71" stroke="#0a5" stroke-width="2"/>`}
 if(o)x+=50;
 b+=T(Math.max(x,200)/2,160,label||`${th?th+' thousands, ':''}${h} hundreds, ${t} tens, ${o} ones`,18);
 return svg(Math.max(x,200)+10,H,b)}
function pvChart(n,hi){const s=String(n),names=['ones','tens','hundreds','thousands','ten thousands','hundred thousands'];const L=s.length,cw=110;let b='';
 for(let i=0;i<L;i++){const p=L-1-i,x=i*cw+5,on=hi===p;b+=`<rect x="${x}" y="5" width="${cw-6}" height="120" rx="12" fill="${on?'#ffd23f':'#e8eef9'}" stroke="#14213d33" stroke-width="2"/>`+T(x+cw/2-3,34,names[p],p>3?13:16,'#334')+T(x+cw/2-3,100,s[i],52)}
 return svg(L*cw+10,130,b)}
function numLine(a,b0,step,marks,lab){const W=640,pad=40,n=(b0-a)/step;let b=`<line x1="${pad}" x2="${W-pad}" y1="80" y2="80" stroke="#14213d" stroke-width="4"/>`;const X=v=>pad+(v-a)/(b0-a)*(W-2*pad);
 for(let i=0;i<=n;i++){const v=a+i*step;b+=`<line x1="${X(v)}" x2="${X(v)}" y1="68" y2="92" stroke="#14213d" stroke-width="3"/>`+(n<=10||i%2==0||i==n?T(X(v),120,fmt(v),n>10?14:18):'')}
 (marks||[]).forEach(m=>{b+=`<circle cx="${X(m.v)}" cy="80" r="11" fill="${m.c||'#e63946'}" stroke="#fff" stroke-width="3"/>`+(m.t?T(X(m.v),45,m.t,20,m.c||'#e63946'):'')});
 (lab||[]).forEach(j=>{const x1=X(j[0]),x2=X(j[1]);b+=`<path d="M${x1} 66 Q${(x1+x2)/2} ${0} ${x2} 66" fill="none" stroke="#2f6fdf" stroke-width="3"/>`+(j[2]?T((x1+x2)/2,14,j[2],16,'#2f6fdf'):'')});
 return svg(W,135,`<g transform="translate(0,6)">${b}</g>`).replace('viewBox="0 0 640 135"','viewBox="0 -4 640 145"')}
function array(r,c,col){const s=Math.min(46,Math.floor(380/Math.max(r,c,1)));let b='';const W=c*s+20,H=r*s+50;
 b+=`<rect x="6" y="6" width="${c*s+8}" height="${r*s+8}" rx="8" fill="${col||'#e63946'}" stroke="#0004" stroke-width="2"/>`;
 for(let i=0;i<r;i++)for(let j=0;j<c;j++)b+=stud(10+j*s+s/2,10+i*s+s/2,s*.36,col||'#e63946');
 b+=T(W/2,H-8,`${r} row${r==1?'':'s'} of ${c} stud${c==1?'':'s'}`,18);return svg(Math.max(W,200),H,b)}
function groups(g,each,total){ // division: g groups
 const cols=Math.min(g,5),gw=120,gh=110;let b='';const rows=Math.ceil(g/cols);const colors=['#e63946','#2f6fdf','#ffb703','#2fbf71','#9b5de5'];
 for(let k=0;k<g;k++){const gx=(k%cols)*gw+8,gy=Math.floor(k/cols)*gh+8;b+=`<rect x="${gx}" y="${gy}" width="${gw-12}" height="${gh-14}" rx="16" fill="#eef3fb" stroke="#14213d33" stroke-width="2"/>`;
  for(let i=0;i<each;i++){const bx=gx+10+(i%4)*24,by=gy+12+Math.floor(i/4)*26;b+=`<rect x="${bx}" y="${by}" width="20" height="16" rx="3" fill="${colors[k%5]}"/><rect x="${bx+3}" y="${by-5}" width="6" height="5" fill="${colors[k%5]}"/><rect x="${bx+11}" y="${by-5}" width="6" height="5" fill="${colors[k%5]}"/>`}}
 const W=cols*gw+10,H=rows*gh+36;b+=T(W/2,H-8,`${total} bricks shared into ${g} group${g==1?'':'s'} = ${each} in each`,17);return svg(W,H,b)}
function fracBar(n,d,y0,lab,col){let b='';const W=520,w=W/d;for(let i=0;i<d;i++)b+=`<rect x="${10+i*w}" y="${y0}" width="${w}" height="56" fill="${i<n?(col||'#e63946'):'#fff'}" stroke="#14213d" stroke-width="3"/>`;
 if(lab)b+=T(W+40,y0+38,lab,26);return b}
function fracModel(n,d){return svg(600,80,fracBar(n,d,10,''))}
function fracCircle(n,d){let b='';const cx=110,cy=110,r=95;for(let i=0;i<d;i++){const a1=i/d*2*Math.PI-Math.PI/2,a2=(i+1)/d*2*Math.PI-Math.PI/2;b+=`<path d="M${cx} ${cy}L${cx+r*Math.cos(a1)} ${cy+r*Math.sin(a1)}A${r} ${r} 0 0 1 ${cx+r*Math.cos(a2)} ${cy+r*Math.sin(a2)}Z" fill="${i<n?'#ffb703':'#fff'}" stroke="#7a3d00" stroke-width="3"/>`}return svg(220,220,`<circle cx="110" cy="110" r="100" fill="#d98c3f"/>`+b)}
const COINS={1:{n:'penny',r:24,c:'#c77b3b'},5:{n:'nickel',r:28,c:'#b8bcc4'},10:{n:'dime',r:21,c:'#c9cdd4'},25:{n:'quarter',r:32,c:'#c4c8cf'},100:{n:'$1 bill'},500:{n:'$5 bill'}};
function coinsSvg(list,labels,face){let x=10,b='';list.forEach(v=>{const k=COINS[v];if(v>=100){b+=`<rect x="${x}" y="30" width="120" height="60" rx="6" fill="#cfe3c2" stroke="#3d6b2c" stroke-width="3"/><ellipse cx="${x+60}" cy="60" rx="18" ry="22" fill="#a9c79a"/>`+T(x+16,52,v/100,18,'#2d5020')+T(x+104,84,v/100,18,'#2d5020')+(labels?T(x+60,118,'$'+v/100,18):'');x+=132}
  else{const g=`c${v}`;b+=`<defs><radialGradient id="${g}" cx="35%" cy="30%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${k.c}"/><stop offset="1" stop-color="#555"/></radialGradient></defs><circle cx="${x+k.r}" cy="60" r="${k.r}" fill="url(#${g})" stroke="#333" stroke-width="2"/><circle cx="${x+k.r}" cy="60" r="${k.r-5}" fill="none" stroke="#0003" stroke-width="2"/>`+(face?T(x+k.r,67,v+'¢',k.r>25?18:15,'#222'):'')+(labels?T(x+k.r,118,v+'¢',18):'');x+=k.r*2+12}});
 return svg(Math.max(x,200),labels?130:100,b)}
function clock(h,m){let b=`<circle cx="120" cy="120" r="112" fill="#2b2d42"/><circle cx="120" cy="120" r="102" fill="#fdfcf7"/>`;
 for(let i=0;i<60;i++){const a=i/60*2*Math.PI,l=i%5?6:14;b+=`<line x1="${120+96*Math.sin(a)}" y1="${120-96*Math.cos(a)}" x2="${120+(96-l)*Math.sin(a)}" y2="${120-(96-l)*Math.cos(a)}" stroke="#2b2d42" stroke-width="${i%5?2:4}"/>`}
 for(let i=1;i<=12;i++){const a=i/12*2*Math.PI;b+=T(120+70*Math.sin(a),128-70*Math.cos(a),i,24,'#2b2d42')}
 const ma=m/60*2*Math.PI,ha=((h%12)+m/60)/12*2*Math.PI;
 b+=`<line x1="120" y1="120" x2="${120+50*Math.sin(ha)}" y2="${120-50*Math.cos(ha)}" stroke="#2b2d42" stroke-width="9" stroke-linecap="round"/><line x1="120" y1="120" x2="${120+86*Math.sin(ma)}" y2="${120-86*Math.cos(ma)}" stroke="#e63946" stroke-width="5" stroke-linecap="round"/><circle cx="120" cy="120" r="8" fill="#e63946"/>`;
 return svg(240,240,b)}
function clockHelp(h,m){let b='';for(let i=0;i<12;i++){const a=i/12*2*Math.PI;b+=T(120+138*Math.sin(a),126-138*Math.cos(a),i*5,17,'#2f6fdf')}return svg(320,322,`<g transform="translate(40,40)">${clock(h,m).replace(/<\/?svg[^>]*>/g,'')}${b}</g>`)}
function polySvg(n,lab){const cx=130,cy=120,r=95;const p=[...Array(n)].map((_,i)=>{const a=i/n*2*Math.PI-Math.PI/2+(n==4?Math.PI/4:0);return[cx+r*Math.cos(a),cy+r*Math.sin(a)]});
 let b=`<polygon points="${p.map(q=>q.join(',')).join(' ')}" fill="#2f6fdf" fill-opacity=".85" stroke="#0e2350" stroke-width="5" stroke-linejoin="round"/>`;
 if(lab)p.forEach((q,i)=>{const q2=p[(i+1)%n];b+=`<circle cx="${(q[0]+q2[0])/2}" cy="${(q[1]+q2[1])/2}" r="15" fill="#ffd23f" stroke="#7a5200" stroke-width="2"/>`+T((q[0]+q2[0])/2,(q[1]+q2[1])/2+7,i+1,18)});return svg(260,240,b)}
function gridRect(w,h,num,sides){const s=Math.min(44,Math.floor(320/Math.max(w,h)));let b='';
 for(let i=0;i<h;i++)for(let j=0;j<w;j++){const k=i*w+j+1;b+=`<rect x="${40+j*s}" y="${30+i*s}" width="${s}" height="${s}" fill="#9fd3ff" stroke="#14213d" stroke-width="2"/>`+(num?T(40+j*s+s/2,30+i*s+s/2+6,k,14):'')}
 if(sides)b+=T(40+w*s/2,22,w+' units',18)+T(30,30+h*s/2+6,h,18,'#14213d','end')+T(40+w*s/2,30+h*s+24,w,18)+T(48+w*s,30+h*s/2+6,h,18,'#14213d','start');
 return svg(w*s+100,h*s+70,b)}
function barGraph(data,hl){const W=560,H=280,max=Math.max(...data.map(d=>d[1]))+1,bw=(W-80)/data.length;const Y=v=>H-40-(v/max)*(H-70);let b='';
 for(let v=0;v<=max;v++){b+=`<line x1="50" x2="${W-10}" y1="${Y(v)}" y2="${Y(v)}" stroke="#14213d22"/>`+T(40,Y(v)+6,v,14,'#14213d','end')}
 data.forEach((d,i)=>{const x=60+i*bw;b+=`<rect x="${x+8}" y="${Y(d[1])}" width="${bw-16}" height="${H-40-Y(d[1])}" rx="6" fill="${d[2]}" ${hl&&hl.includes(i)?'stroke="#ffd23f" stroke-width="6"':''}/>`+T(x+bw/2,H-14,d[0],15)});
 return svg(W,H,`<line x1="50" x2="50" y1="20" y2="${H-40}" stroke="#14213d" stroke-width="3"/><line x1="50" x2="${W-10}" y1="${H-40}" y2="${H-40}" stroke="#14213d" stroke-width="3"/>`+b)}
function stack(a,b2){ // LEGO stacks of tens for add
 return blocks(a,'')}
// ---------- question makers ----------
function opts(ans,cands){const s=new Set([String(ans)]);const ok=c=>c!==undefined&&!/NaN|^-|\$-/.test(String(c));cands.forEach(c=>{if(s.size<4&&ok(c))s.add(String(c))});let k=1;while(s.size<4&&k<40){const n=Number(ans);const c=isNaN(n)?null:n+Math.ceil(k/2)*(k%2?1:-1);if(c!==null&&c>=0)s.add(String(c));k++}return shuf([...s])}
const near=(a,list)=>list.map(d=>a+d).filter(v=>v>=0);
const G={
 place(l){
  if(Math.random()<.4){ // rounding
   const to=l==1?10:l==2?pick([10,100]):pick([100,1000]);const n=l==1?R(11,99):l==2?R(101,999):R(1001,9999);const lo=Math.floor(n/to)*to,hi=lo+to,ans=n-lo>=to/2?hi:lo;
   return{text:`Round ${fmt(n)} to the nearest ${fmt(to)}.`,choices:opts(fmt(ans),[fmt(ans===lo?hi:lo),fmt(lo-to),fmt(hi+to)]),ans:fmt(ans),
    pic:null,help:numLine(lo,hi,to/10,[{v:n,t:fmt(n)}]),work:`${fmt(n)} sits between ${fmt(lo)} and ${fmt(hi)}. Which one is it closer to? (Halfway, ${fmt(lo+to/2)}, rounds up.)`,hint:`Find the two ${fmt(to)}s that ${fmt(n)} sits between. Is it closer to the lower one or the higher one? Halfway rounds up.`,how:`Find the two ${fmt(to)}s around the number, ${fmt(lo)} and ${fmt(hi)}. Put the number on the line and see which end is closer. If it is exactly in the middle, we round up.`}}
  const n=l==1?R(102,999):l==2?R(1002,9999):R(10002,Math.random()<.25?999999:99999);const s=String(n);const cand=[...s].map((c,k)=>k).filter(k=>s[k]!=='0'&&s.split(s[k]).length===2);if(!cand.length)return G.place(l);let i=pick(cand);const p=s.length-1-i,d=+s[i],val=d*10**p;
  const names=['ones','tens','hundreds','thousands','ten thousands','hundred thousands'];
  const fs=fmt(n);let di=-1,cnt=0;for(let k=0;k<fs.length;k++){if(/\d/.test(fs[k])){if(cnt===i){di=k;break}cnt++}}const shown=fs.slice(0,di)+`<span style="color:#ffd23f;text-decoration:underline;text-underline-offset:6px">${fs[di]}</span>`+fs.slice(di+1);
  return{text:`What is the value of the ${d} in <span style="font-size:1.25em">${shown}</span>?`,speakText:`What is the value of the ${d} in ${fmt(n)}? Look for the yellow ${d}.`,choices:opts(fmt(val),[fmt(d),fmt(d*10**(p+1)),fmt(p>0?d*10**(p-1):d*100)]),ans:fmt(val),
   pic:n<1000?blocks(n):null,help:pvChart(n,p),work:`The ${d} is in the ${names[p]} place. ${d} ${names[p]} is worth ${fmt(val)}.`,hint:`Which place is the ${d} in? What is each of those worth?`,how:`Put each digit in the place value chart. Find the ${d}. Look at the name of its place. That tells you what it is worth.`}},
 compare(l){const mx=l==1?999:l==2?9999:9999;let a=R(l==1?100:1000,mx),b=Math.random()<.15?a:(l==3?a+pick([-1,1])*pick([1,10,100,90,9]):R(l==1?100:1000,mx));if(b<0)b=a+10;
  const ans=a>b?'>':a<b?'<':'=';let k=0;const sa=String(a),sb=String(b);while(k<sa.length&&sa[k]===sb[k])k++;
  return{text:`Which sign makes this true?<br><span style="font-size:1.3em">${fmt(a)} ___ ${fmt(b)}</span>`,speakText:`Which sign makes this true? ${fmt(a)}, blank, ${fmt(b)}. Greater than, less than, or equal?`,choices:['>','<','='],ans,
   pic:null,help:pvChart(a,sa.length===sb.length&&k<sa.length?sa.length-1-k:undefined)+pvChart(b,sa.length===sb.length&&k<sa.length?sa.length-1-k:undefined),work:ans==='='?'Every digit matches. They are equal!':`Start at the biggest place. The first place where the digits are different decides it. The open side of the sign eats the bigger number!`,hint:ans==='='?'Check each place, starting with the biggest. Are any digits different?':`Start at the biggest place. The first place where the digits are different decides it. The open side of the sign eats the bigger number!`,how:`Line the numbers up in a place value chart. Compare from the left. The first digit that's different tells which number is bigger. The alligator mouth > or < opens toward the bigger number.`}},
 addsub(l){const add=Math.random()<.55;let a,b;
  if(l==1){a=R(11,88);b=add?R(1,9-a%10)+10*R(0,8-Math.floor(a/10)):R(1,a%10||1);if(!add&&b>a)b=a%10}
  else if(l==2){a=R(25,299);b=R(13,99);if(!add&&b>a)[a,b]=[b,a]}
  else{a=R(150,700);b=R(105,1000-a);if(!add){a=R(400,1000);b=R(105,a-20)}}
  const ans=add?a+b:a-b,op=add?'+':'−';
  return{text:`${fmt(a)} ${op} ${fmt(b)} = ?`,choices:opts(ans,near(ans,[10,-10,1,-1,100,-100]).slice(R(0,2))),ans:String(ans),
   pic:a+b<=999&&add?blocks(a,'')+'':null,help:add?(a<1000&&b<1000&&a+b<10000?blocks(a,`${fmt(a)} …`)+blocks(b,`… plus ${fmt(b)}`):''):(b<=10?numLine(Math.max(0,a-10),Math.max(0,a-10)+10,1,[{v:a,t:fmt(a)},{v:ans,c:'#2fbf71',t:'?'}],[[a,ans,'back '+b]]):numLine(Math.floor(ans/10)*10-10>=0?Math.floor(ans/10)*10-10:0,Math.ceil(a/10)*10+10,Math.ceil((Math.ceil(a/10)*10+20-Math.floor(ans/10)*10)/100)*10||10,[{v:a,t:fmt(a)},{v:ans,c:'#2fbf71',t:'?'}],[[a,ans,'back '+b]])),
   hint:add?`Add the ones first, then the tens, then the hundreds. If a place makes 10 or more, trade 10 for 1 in the next place.`:`Start at ${fmt(a)} and jump back ${fmt(b)}. Take away hundreds, then tens, then ones. If you need more ones, trade a ten for 10 ones.`,
   how:add?`Stack the numbers by place: ones under ones, tens under tens. Add ones: ${a%10} + ${b%10} = ${a%10+b%10}. ${a%10+b%10>9?'That is 10 or more, so trade 10 ones for one ten.':''} Then add the tens and hundreds.`:`Break ${fmt(b)} into hundreds, tens and ones. Jump back from ${fmt(a)} one part at a time on the number line.`}},
 mult(l){const pool=l==1?[0,1,2,5,10]:l==2?[2,3,4,5,10]:[3,4,6,7,8,9];let a=pick(pool),b=R(l==1?1:2,10);if(Math.random()<.5)[a,b]=[b,a];const ans=a*b;
  const story=Math.random()<.35&&a>0&&b>0;
  return{text:story?`Spidey builds ${a} LEGO wall${a>1?'s':''}. Each wall has ${b} brick${b>1?'s':''}. How many bricks?`:`${a} × ${b} = ?`,choices:opts(ans,[a*(b+1),a*(b-1),(a+1)*b,a+b]),ans:String(ans),
   pic:null,help:a&&b?array(a,b):svg(400,80,T(200,50,a===0?`0 rows of ${b} = nothing at all!`:`${a} row${a==1?'':'s'} of 0 = nothing at all!`,22)),work:a&&b?`${a} row${a==1?'':'s'} with ${b} in each row. Count by ${b}s: ${[...Array(Math.min(a,10))].map((_,i)=>(i+1)*b).join(', ')}.`:'Anything times 0 is 0!',hint:a&&b?`Look at the picture: ${a} row${a==1?'':'s'}, with ${b} in each row. Try skip counting by ${b}s, one row at a time.`:'Think: how many are in rows that have nothing in them?',
   how:`Multiplying means equal groups. ${a} × ${b} means ${a} group${a==1?'':'s'} of ${b}. Make ${a} row${a==1?'':'s'} of ${b} stud${b==1?'':'s'} and skip-count by ${b}.`}},
 div(l){const pool=l==1?[1,2,5,10]:l==2?[2,3,4,5]:[3,4,6,7,8,9];const d=pick(pool),q=R(1,10),n=d*q;const story=Math.random()<.35;
  return{text:story&&d>1?`Sadie puts ${n} LEGO bricks into ${d} bins equally. How many bricks go in each bin?`:`${n} ÷ ${d} = ?`,choices:opts(q,[q+1,q-1,d,q+2]),ans:String(q),
   pic:null,help:groups(d,q,n),hint:`Share ${n} brick${n==1?"":"s"} into ${d} equal group${d==1?"":"s"}. Or think: ${d} × what = ${n}?`,how:`Division is fair sharing. Put one brick in each of the ${d} group${d==1?'':'s'} again and again until all ${n} are used. Count one group. You can also use a times fact: ${d} × ${q} = ${n}.`}},
 frac(l){if(l<3){const d=l==1?pick([2,3,4]):pick([2,3,4,5,6,8]),n=R(1,d-1+(l==2?1:0));const circle=Math.random()<.5;
   const f=n+'/'+d;return{text:circle?`What fraction of the pizza is cheese (yellow)?`:`What fraction of the bar is shaded red?`,choices:opts(f,[(d-n||1)+'/'+d,d+'/'+n,n+'/'+(d+1),(n+1)+'/'+d].filter(x=>!x.startsWith('0'))),ans:f,
    pic:circle?fracCircle(n,d):fracModel(n,d),help:circle?fracCircle(n,d):fracModel(n,d),work:`Count ALL the equal parts: ${d}. That's the bottom number. Count the colored parts: ${n}. That's the top number.`,hint:`Count ALL the equal parts. That goes on the bottom. Then count the colored parts. That goes on top.`,how:`The bottom number (denominator) is how many equal parts in all. The top number (numerator) is how many parts we're talking about. Here: ${n} out of ${d}.`}}
  const same=Math.random()<.5;let a,b,c,d;if(same){d=c=pick([3,4,6,8]);a=R(1,d);b=R(1,d)}else{a=b=R(1,3);c=pick([2,3,4,6,8]);d=pick([2,3,4,6,8]);if(a>=c)c=a+1;if(b>=d)d=b+2}
  const ans=a/c>b/d?'>':a/c<b/d?'<':'=';
  return{text:`Which sign makes this true?<br><span style="font-size:1.3em">${a}/${c} ___ ${b}/${d}</span>`,speakText:`Which sign makes this true? ${a}/${c}, blank, ${b}/${d}. Greater than, less than, or equal?`,choices:['>','<','='],ans,pic:null,help:svg(620,150,fracBar(a,c,10,a+'/'+c)+fracBar(b,d,84,b+'/'+d,'#2f6fdf')),
   hint:same?`Same-size pieces! The one with more pieces is bigger.`:`Same number of pieces, but bigger pieces when the bottom number is smaller. Look at the bars!`,how:`Draw both fractions as bars the same length. The bar with more color is the bigger fraction.`}},
 money(l){if(l<3){const set=l==1?[1,5,10,25]:[1,5,10,25,100];const list=[];const n=l==1?R(2,5):R(3,6);for(let i=0;i<n;i++)list.push(pick(set));list.sort((a,b)=>b-a);const tot=list.reduce((a,b)=>a+b,0);
   const cents=l==1&&tot+10<100;const show=v=>cents?v+'¢':money(v);
   return{text:`How much money is this?`,choices:opts(show(tot),[show(tot+5),show(Math.max(1,tot-5)),show(tot+10),show(tot+1)]),ans:show(tot),pic:coinsSvg(list,false,l<3),help:coinsSvg(list,true,true),
    work:`Start with the biggest one and count on: ${(()=>{let s=0;return list.map(v=>(s+=v,s<100?s+'¢':money(s))).join(', ')})()}.`,hint:`Start with the biggest coin. Say its value, then count on for each coin after it.`,how:`Quarter = 25¢, dime = 10¢, nickel = 5¢, penny = 1¢, a dollar bill = 100¢. Line them up from biggest to smallest and count on.`}}
  const cost=R(105,495),ch=500-cost;return{text:`A LEGO minifigure costs ${money(cost)}. You pay with a $5 bill. How much change do you get?`,choices:opts(money(ch),[money(ch+10),money(ch-10>0?ch-10:ch+25),money(ch+100)]),ans:money(ch),
   pic:coinsSvg([500]),help:numLine(Math.floor(cost/100)*100,500,50,[{v:cost,t:money(cost)},{v:500,c:'#2fbf71',t:'$5.00'}],[[cost,500,'count up']]),hint:`Count up from ${money(cost)} to $5.00. Go to the next dollar first, then add the dollars.`,how:`Change means: how much more to get from the price up to what you paid. Count up from ${money(cost)} to ${money(Math.ceil(cost/100)*100)}, then on to $5.00.`}},
 time(l){const two=n=>String(n).padStart(2,'0');
  if(l<3){const h=R(1,12),m=l==1?R(0,11)*5:R(0,59);const f=(H,M)=>`${H}:${two(M)}`;
   return{text:`What time does the clock show?`,choices:opts(f(h,m),[f(h%12+1,m),f(h,(m+5)%60),f(h,(m+30)%60),f(m/5||12,h*5%60)]),ans:f(h,m),pic:clock(h,m),help:clockHelp(h,m),
    work:(m>=40?`The short hand is almost at ${h%12+1}, but it hasn't got there yet, so it's still ${h} o'clock time.`:`The short hand is the hour: it's at (or just past) ${h}.`)+` The long red hand is the minutes: count by 5s around the edge.`,hint:`Look at the short hand first: which number has it passed? Then count by 5s with the long red hand.`,how:`First look at the short hand: that is the hour. Then the long red hand: count by fives from the 12. 1 is 5, 2 is 10, 3 is 15...${l==2?' then count on by ones for the little marks.':''}`}}
  const h=R(1,8),m=pick([0,30]),dh=R(1,4),dm=pick([0,30]);let eh=h+dh,em=m+dm;if(em>=60){em-=60;eh++}const f=(H,M)=>`${(H-1)%12+1}:${two(M)}`;
  const ev=pick(['Hero training','A LEGO build','Soccer practice','The movie']);
  return{text:`${ev} starts at ${f(h,m)}. It lasts ${dh} hour${dh>1?'s':''}${dm?' and 30 minutes':''}. What time does it end?`,choices:opts(f(eh,em),[f(eh+1,em),f(eh,(em+30)%60),f(eh-1,em)]),ans:f(eh,em),pic:clock(h,m),
   help:numLine(h,h+6,1,[{v:h+m/60,t:f(h,m)},{v:eh+em/60,c:'#2fbf71',t:'?'}],[[h+m/60,eh+em/60,`+${dh}${dm?'½':''} h`]]).replace(/>(\d+)<\/text>/g,(x,n)=>'>'+((n-1)%12+1)+':00</text>'),
   hint:`Start at ${f(h,m)}. Jump ${dh} hour${dh>1?'s':''} forward${dm?', then 30 more minutes':''}.`,how:`Elapsed time: start at the beginning time and jump forward on a timeline. Jump whole hours first, then the extra minutes.`}},
 geo(l){if(l==1){const n=pick([3,4,5,6,8]);const nm={3:'triangle',4:'quadrilateral',5:'pentagon',6:'hexagon',8:'octagon'};
   return{text:`What is the name of this shape?`,choices:shuf(shuf(['triangle','quadrilateral','pentagon','hexagon','octagon'].filter(x=>x!==nm[n])).slice(0,3).concat(nm[n])),ans:nm[n],pic:polySvg(n),help:polySvg(n,1),
    work:`Count the sides: it has ${n}. Tri = 3, quad = 4, penta = 5, hexa = 6, octo = 8 (like an octopus!).`,hint:`Touch each straight side and count them. The number of sides tells you the shape's name.`,how:`Count the straight sides. The number of sides gives the shape its name. 3 triangle, 4 quadrilateral, 5 pentagon, 6 hexagon, 8 octagon.`}}
  const w=R(2,l==2?5:8),h=R(2,l==2?4:6);
  if(l==2||Math.random()<.4)return{text:`Each square is 1 square unit. What is the area of the rectangle?`,choices:opts(w*h,[w*h+w,w+h,2*(w+h),w*h-1]),ans:String(w*h),pic:gridRect(w,h),help:gridRect(w,h,1),
   work:`Count the squares, or: ${h} row${h==1?'':'s'} of ${w} = ${h} × ${w}.`,hint:`Count the squares, or count the rows and how many squares are in each row.`,how:`Area is how many squares cover the shape. Count them, or multiply rows × squares in each row.`};
  return{text:`A LEGO base is ${w} units long and ${h} units wide. What is its perimeter?`,choices:opts(2*(w+h),[w*h,w+h,2*(w+h)+2]),ans:String(2*(w+h)),pic:gridRect(w,h,0,1),help:gridRect(w,h,0,1),
   hint:`Perimeter is the walk all the way around: ${w} + ${h} + ${w} + ${h}.`,how:`Perimeter is the distance around the outside. Add up all four sides: ${w} + ${h} + ${w} + ${h} = ${2*(w+h)}.`}},
 data(l){const names=shuf(['Spidey','Ghost-Spider','Iron Man','Miles','Hulk']).slice(0,4),cols=['#e63946','#ff5fa2','#ffb703','#2f6fdf'];const data=names.map((n,i)=>[n,R(1,l==1?6:9),cols[i]]);
  const i=R(0,3);let j=R(0,3);while(j===i||data[j][1]===data[i][1]){j=(j+1)%4;if(data[0][1]===data[1][1]&&data[1][1]===data[2][1]){data[j][1]++}}
  if(l==1)return{text:`Kids voted for their favorite hero. How many votes did ${names[i]} get?`,choices:opts(data[i][1],[data[i][1]+1,data[i][1]-1,data[j][1]]),ans:String(data[i][1]),pic:barGraph(data),help:barGraph(data,[i]),
   hint:`Find the ${names[i]} bar. Slide your finger from the top of the bar to the numbers on the left.`,how:`Find the bar, go to its top, and read across to the number on the side.`};
  if(l==2){const[a,b]=data[i][1]>data[j][1]?[i,j]:[j,i];const d=data[a][1]-data[b][1];return{text:`How many MORE votes did ${names[a]} get than ${names[b]}?`,choices:opts(d,[d+1,data[a][1],data[a][1]+data[b][1]]),ans:String(d),pic:barGraph(data),help:barGraph(data,[a,b]),
   hint:`${names[a]} has ${data[a][1]}. ${names[b]} has ${data[b][1]}. How far from ${data[b][1]} up to ${data[a][1]}?`,how:`"How many more" means subtract: the bigger bar minus the smaller bar.`}}
  const t=data.reduce((s,d)=>s+d[1],0);return{text:`How many kids voted in all?`,choices:opts(t,[t+1,t-2,t+3]),ans:String(t),pic:barGraph(data),help:barGraph(data,[0,1,2,3]),hint:`Add every bar: ${data.map(d=>d[1]).join(' + ')}.`,how:`"In all" means add them together. Read each bar and add.`}},
 pattern(l){const st=l==1?pick([2,5,10]):l==2?pick([3,4,6,25,100]):pick([-2,-5,-10,7,9,50]);const a=st<0?R(60,120):R(0,30);const seq=[0,1,2,3,4].map(k=>a+k*st);const ans=seq[4];
  return{text:`What comes next? &nbsp; ${seq.slice(0,4).join(', ')}, ___`,choices:opts(ans,[ans+1,ans-1,seq[3]+st*2,ans+(st>0?-2:2)]),ans:String(ans),pic:null,
   help:numLine(Math.min(...seq),Math.max(...seq),Math.abs(st),seq.slice(0,4).map(v=>({v,t:''})).concat([{v:ans,c:'#2fbf71',t:'?'}]),[[seq[2],seq[3],(st>0?'+':'−')+Math.abs(st)]]),
   hint:`From ${seq[0]} to ${seq[1]} is ${st>0?'+':'−'}${Math.abs(st)}. Do it one more time to ${seq[3]}.`,how:`Find the rule: how much does it change each time? Here it ${st>0?'adds':'takes away'} ${Math.abs(st)}. Use the same rule for the next number.`}},
};
// ---------- rewards ----------
const BRICK=['#e63946','#2f6fdf','#ffb703','#2fbf71','#ff5fa2','#9b5de5','#f4f4f8','#1d1d1d'];
const SUITS=[['Classic Suit','#c1121f','#1d3f8f'],['Ghost-Spider Suit','#f4f4f8','#ff5fa2'],['Stealth Suit','#222','#3a3'],['Iron Spider Suit','#b3121b','#d4a017'],['Upgraded Suit','#e63946','#111'],['Homemade Suit','#c33','#3456a8'],['Winter Suit','#e9f2ff','#3b6fd8'],['Golden Hero Suit','#d4a017','#7a5200'],['Night Patrol Suit','#14213d','#00e5ff'],['LEGO Master Suit','#ffb703','#e63946']];
function suitSvg(s,sz){return `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}"><defs><radialGradient id="s${s[0].length}${s[1].slice(1)}" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".3" stop-color="${s[1]}"/><stop offset="1" stop-color="${s[2]}"/></radialGradient></defs><ellipse cx="50" cy="52" rx="38" ry="45" fill="url(#s${s[0].length}${s[1].slice(1)})"/><use href="#web"/><path d="M22 44Q30 30 46 46Q40 62 24 56Z" fill="url(#eye)" stroke="#111" stroke-width="3"/><path d="M78 44Q70 30 54 46Q60 62 76 56Z" fill="url(#eye)" stroke="#111" stroke-width="3"/></svg>`}
if(window.GS_MODE&&window.GS){Object.keys(G).forEach(k=>delete G[k]);Object.assign(G,GS.G)}
const PRAISE=['Amazing work, hero!','You got it!','Web-tastic!','You kept trying!','Way to go!','You\'re a math hero!','Nailed it!','Awesome thinking!'];
const AGAIN=['Good try! Let\'s look at the picture.','That\'s okay, heroes practice!','Nice effort! Let\'s look together.','Brave try! The picture can help.'];
const STORY=['Help save the city!','A crane is stuck downtown!','The subway lights went out!','Bricks fell off the bridge!','The museum needs a hero!','A cat is stuck on a roof!'];
// ---------- screens ----------
let tapLock=0;['pointerdown','touchstart','click','touchend','pointerup'].forEach(ev=>document.addEventListener(ev,e=>{if(Date.now()<tapLock){e.stopPropagation();if(e.cancelable&&ev!=='touchstart'&&ev!=='pointerdown')e.preventDefault()}},true));
function show(id){tapLock=Date.now()+400;window.HMA&&HMA.screen(id);document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));if(window.speechSynthesis&&id!=='play')speechSynthesis.cancel()}
const heroName=()=>S.hero==='G'?'Sadie':'Samuel';
function voiceBtns(){$('voiceT').textContent=(S.voice?'🔊':'🔇')+' Read to me: '+(S.voice?'ON':'OFF');$('voiceM').textContent=S.voice?'🔊':'🔇';$('voiceM').setAttribute('aria-label','Read aloud '+(S.voice?'on':'off'));$('voiceM').setAttribute('aria-pressed',S.voice);
 const b=$('say');if(b){b.innerHTML=S.voice?'🔊 Read: ON':'🔇 Read: OFF';b.setAttribute('aria-pressed',S.voice);b.setAttribute('aria-label','Read aloud '+(S.voice?'on, tap to turn off':'off, tap to turn on'));b.classList.toggle('voff',!S.voice);if(!S.voice)b.classList.remove('pulse')}
 const c=document.getElementById('setVoice');if(c)c.checked=!!S.voice;document.querySelectorAll('.ans.armed').forEach(x=>x.classList.remove('armed'))}
function setVoice(on){S.voice=!!on;save();if(!S.voice){stopVoice();armed=null}voiceBtns()}
function buildMap(){$('hello').textContent=`Pick a mission, ${S.hero==='G'?'Sadie':'Samuel'}!`;const g=$('grid');g.innerHTML='';
 SK.forEach(k=>{const st=S.skills[k.id];const b=document.createElement('button');b.className='mission';b.innerHTML=`<span class="ic">${k.ic}</span><span class="stars">${'⭐'.repeat(st.best)}${'☆'.repeat(3-st.best)}</span><b>${k.name}</b><small>${k.sub}</small>`;b.onclick=()=>start(k.id);g.appendChild(b)})}
let M=null;const QN=8;
function start(id){stopAll();if(S.cap&&sess.n>=S.cap){restScreen();return}M={id,i:0,q:null,tries:0,firsts:0,brave:0,boss:bossFor(id)};show('play');const k=SK.find(s=>s.id===id);bossUI();const intro=M.boss?`Boss battle! ${M.boss.name} is attacking the city! Every right answer knocks him back. `:`${pick(STORY)} ${k.name}. ${heroName()}, let's go! `;dad(M.boss?'boss':'intro',intro,()=>readQ(),()=>next(intro),true)}
function choiceList(){const c=M.q.choices.map(spoken);return ' The choices are: '+c.slice(0,-1).join(', ')+', or '+c[c.length-1]+'.'}
function readQ(pre){const b=$('say');b.classList.add('pulse');say((pre||'')+(M.q.speakText||M.q.text)+choiceList(),false,()=>b.classList.remove('pulse'));if(!S.voice)b.classList.remove('pulse')}
let hintT=0;function next(pre,noRead){armed=null;clearTimeout(hintT);const st=S.skills[M.id];M.q=G[M.id](st.lvl);M.tries=0;
 if(M.q.choices.indexOf(M.q.ans)<0){M.q.choices[0]=M.q.ans;M.q.choices=shuf(M.q.choices)}
 $('qtext').innerHTML=M.q.text;$('hint').className='';$('hintTxt').textContent='';$('nextStep').style.display='none';
 $('model').innerHTML=M.q.pic||`<div style="color:#14213d;font-size:22px;padding:20px;text-align:center">Need help? Tap <b>💡 Show me how</b></div>`;
 const A=$('answers');A.innerHTML='';A.style.gridTemplateColumns=M.q.choices.length===3?'1fr 1fr 1fr':'1fr 1fr';
 M.q.choices.forEach(c=>{const b=document.createElement('button');b.className='ans';b.textContent=c;b.onclick=()=>answer(b,c);A.appendChild(b)});
 $('prog').innerHTML=[...Array(QN)].map((_,i)=>`<i class="${i<M.i?'d':''}" style="${i<M.i?'background:'+BRICK[i%BRICK.length]:''}"></i>`).join('');
 if(!noRead)readQ(pre)}
let cheerT=0;function cheer(t){const c=$('cheer');clearTimeout(cheerT);c.textContent=t;c.classList.add('on');cheerT=setTimeout(()=>c.classList.remove('on'),1000)}
let busy=false,advT=0;
function stopAll(){clearTimeout(advT);clearTimeout(hintT);busy=false;try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}if(typeof dadAudio!=='undefined'&&dadAudio)try{dadAudio.pause()}catch(e){}if(typeof calmT!=='undefined')calmT.forEach(clearTimeout);if($('calm'))$('calm').classList.remove('on')}
let armed=null;function answer(b,c){if(busy||b.classList.contains('tried'))return;
 if(S.hear!==false&&S.voice&&armed!==b){document.querySelectorAll('.ans.armed').forEach(x=>x.classList.remove('armed'));armed=b;b.classList.add('armed');say(spoken(c)+'. Tap again to pick it.');return}armed=null;b.classList.remove('armed');const st=S.skills[M.id];
 clearTimeout(hintT);if(c===M.q.ans){busy=true;b.classList.add('good');window.HMA?(HMA.charge?HMA.charge():HMA.fx('correct')):chime();const p=pick(PRAISE);cheer(p);dad('cheer',spoken(c)+'! '+p);onCorrect();
  if(M.tries===0){M.firsts++;st.first++;st.streak++;st.miss=0;if(st.streak>=3&&st.lvl<3){st.lvl++;st.streak=0;if(st.lvl>(st.best||1)){st.best=st.lvl;setTimeout(()=>{if(M){cheer('LEVEL UP! ⭐');dad('levelup','Level up! You are getting stronger every day.')}},1650)}}}
  st.q++;st.last=Date.now();save();M.i++;const mm=M;advT=setTimeout(()=>{busy=false;if(M!==mm||!document.getElementById('play').classList.contains('on'))return;M.i>=QN?finish():next()},1500)}
 else{M.tries++;b.classList.add('tried');window.HMA&&HMA.fx('soft');if(M.tries===1){st.streak=0;st.miss++;if(st.miss>=2&&st.lvl>1){st.lvl--;st.miss=0}}save();
  const f=pick(AGAIN);showHint(f);if(M.q.help)$('model').innerHTML=M.q.help;dad('again',spoken(c)+'? '+f);M.brave=1;if(M.tries===1)onFirstMiss();
  hintT=setTimeout(()=>{showHint(f+' '+sents(M.q.hint)[0]);say(M.q.hint)},3000);
  if(M.tries>=2){clearTimeout(hintT);[...$('answers').children].forEach(x=>{if(x.textContent===M.q.ans){x.style.boxShadow='0 0 0 6px #ffd23f,0 7px 0 #8a96ad';}});const gt=(M.q.work?M.q.work+' ':'')+'The glowing one is the answer. Tap it, hero!';hintT=setTimeout(()=>{showHint(gt);say(gt)},1200)}}}
function showHint(t,steps){$('hintTxt').textContent=t;$('hint').className='on';$('nextStep').style.display=steps?'inline-block':'none'}
let howS=[],howI=0;function howStep(){showHint('💡 '+howS[howI],howI<howS.length-1);say(howS[howI]);howI++}
function restScreen(){$('restTxt').textContent=`You finished ${sess.n} missions today, ${heroName()}! Amazing!`;show('rest');dad('rest',`Hero rest! You finished ${sess.n} missions. Amazing! Even heroes rest.`)}
let restUnlock=false;
function finish(){$('ov').classList.remove('on');const st=S.skills[M.id];st.missions++;sess.n++;if(M.brave)S.brave++;st.best=Math.max(st.best||1,st.lvl);const col=BRICK[S.bricks.length%BRICK.length];S.bricks.push(col);S.log.push({t:Date.now(),s:M.id,f:M.firsts,n:QN,l:st.best,b:M.brave?1:0});if(S.log.length>200)S.log.shift();save();
 const unlocked=S.bricks.length%3===0?SUITS[(S.bricks.length/3-1)%SUITS.length]:null;
 $('rwText').textContent=`You helped the city, ${heroName()}! You earned a new LEGO brick.`;
 $('rwItem').innerHTML=`<span class="brick" style="background:${col};transform:scale(1.6)"></span>`+(M.brave?`<div style="font-size:22px;margin:6px">🏅 Brave Try sticker! You used a clue like a real hero. (${S.brave} so far)</div>`:'')+(unlocked?`<div style="font-size:24px;margin-top:14px">NEW SUIT UNLOCKED!</div>${suitSvg(unlocked,140)}<div style="font-size:22px">${unlocked[0]}</div>`:`<div style="font-size:20px;margin-top:10px">${3-S.bricks.length%3} more brick${3-S.bricks.length%3>1?'s':''} until a new suit!</div>`);
if(M.boss){$('rwTitle').textContent=`${M.boss.name.toUpperCase()} DEFEATED!`;$('rwText').textContent=`You knocked ${M.boss.name} out of the city, ${heroName()}! Boss bonus brick earned.`}else $('rwTitle').textContent='MISSION COMPLETE!';
 show('reward');if(window.HMA){HMA.fx(window.__afterFight?'brick':'fanfare');setTimeout(()=>HMA.fx(unlocked?'suit':'brick'),1300);setTimeout(()=>HMA.music('map'),3200)}else chime();dad(M.boss?'bosswin':'complete',`${M.boss?'You beat '+M.boss.name+'!':'Mission complete! You helped the city!'} ${unlocked?'You unlocked the '+unlocked[0]+'!':'You earned a new brick.'}`)}
function buildColl(){$('bricks').innerHTML=S.bricks.length?S.bricks.map(c=>`<span class="brick" style="background:${c}"></span>`).join(''):'<div style="font-size:20px">No bricks yet. Finish a mission to earn one!</div>';
 const n=Math.floor(S.bricks.length/3);$('suits').innerHTML=SUITS.map((s,i)=>`<div class="suit ${i<n?'':'lock'}">${suitSvg(s,110)}<div>${i<n?s[0]:'🔒 '+(i+1)*3+' bricks'}</div></div>`).join('')}
// gate
let gateA=0;function gate(){const a=R(12,19),b=R(3,9);gateA=a*b;$('gateQ').textContent=`To continue, type the answer: ${a} × ${b}`;$('gateIn').value='';$('gateMsg').textContent='';show('gate')}
function parent(){const rows=SK.map(k=>{const s=S.skills[k.id];const pct=s.q?Math.round(s.first/s.q*100):null;return`<tr><td>${k.ic} ${k.name}<br><small style="opacity:.7">VA SOL ${k.sol}</small></td><td>Now ${s.lvl}/3<br><small style="opacity:.7">best ${s.best||1}</small></td><td>${s.q} questions<br>${s.missions} missions</td><td>${pct===null?'not yet':pct+'% first try'}<div class="bar"><i style="width:${pct||0}%"></i></div></td><td>${s.last?new Date(s.last).toLocaleDateString():'—'}</td></tr>`}).join('');
 $('parTab').innerHTML='<tr><th>Skill</th><th>Level</th><th>Practice</th><th>Accuracy</th><th>Last</th></tr>'+rows;
 const tq=SK.reduce((a,k)=>a+S.skills[k.id].q,0),tf=SK.reduce((a,k)=>a+S.skills[k.id].first,0);const ms=S.log.length;
 const weak=SK.filter(k=>S.skills[k.id].q>=4&&S.skills[k.id].first/S.skills[k.id].q<.6).map(k=>k.name);
 $('cap').value=String(S.cap);$('parSum').innerHTML=`<b>${ms}</b> missions, <b>${tq}</b> questions, <b>${tq?Math.round(tf/tq*100):0}%</b> right on the first try. Bricks: ${S.bricks.length}. Brave Try stickers (used a clue): ${S.brave}.`+(weak.length?`<br>Could use extra practice together: ${weak.join(', ')}.`:'');show('parent')}
// wire
const on=(id,f)=>$(id).addEventListener('click',f);
on('pickS',()=>{if(window.GS_MODE){location.href='index.html';return}S.hero='S';save();buildMap();show('map');dad('hello',"Hi Samuel! Pick a mission.")});
on('pickG',()=>{if(!window.GS_MODE){return}S.hero='G';save();buildMap();show('map');say("Hi Sadie! Pick a mission.")});
const tv=()=>{setVoice(!S.voice);if(S.voice)say('Okay! I will read to you.',true)};
on('voiceT',tv);on('voiceM',tv);
on('toTitle',()=>show('title'));on('toColl',()=>{buildColl();show('coll')});on('collBack',()=>{buildMap();show('map')});on('rwColl',()=>{buildColl();show('coll')});
on('again',()=>{if(S.cap&&sess.n>=S.cap)restScreen();else{buildMap();show('map')}});on('quit',()=>{if(!M||M.i>=QN)return;$('ov').classList.add('on')});on('ovKeep',()=>$('ov').classList.remove('on'));on('ovLeave',()=>{$('ov').classList.remove('on');stopAll();M=null;buildMap();show('map')});
on('restColl',()=>{buildColl();show('coll')});on('restHome',()=>show('title'));on('restMore',()=>{restUnlock=true;gate()});
on('cap',()=>{});$('cap').addEventListener('change',e=>{S.cap=+e.target.value;save()});
on('say',()=>{if(S.voice){setVoice(false)}else{setVoice(true);if(M&&M.q)say((M.q.speakText||M.q.text)+choiceList(),true)}});on('how',()=>{clearTimeout(hintT);howS=sents(M.q.how);howI=0;if(M.q.help)$('model').innerHTML=M.q.help;M.brave=1;howStep()});on('nextStep',()=>{if(howI<howS.length)howStep()});
on('grownT',gate);on('gateBack',()=>{restUnlock=false;show('title')});on('gateGo',()=>{if(+$('gateIn').value===gateA){if(restUnlock){restUnlock=false;sess.n=0;buildMap();show('map')}else parent()}else $('gateMsg').textContent='Not quite. Ask a grown-up!'});
on('parBack',()=>show('title'));on('reset',()=>{if(confirm('Reset all progress and bricks?')){localStorage.removeItem(KEY);location.reload()}});
voiceBtns();layout();
window.__g={get sess(){return sess},S,G,start,answer,finish,show,parent,gate,buildColl,next,get M(){return M}};
