/* Story Lab – Comic Book mode (PREVIEW). Each finished paragraph becomes a 4-panel comic page.
   Optional speech bubbles: capital + end mark, no quotation marks, contractions need apostrophes
   (VA SOL 3.LU.2.B, 3.W.3.B). Comics are saved on this device and never deleted. */
(function(){'use strict';
var KEY='hma_storylab_comics_v1',SOL='3.LU.2.B; 3.W.3.B';
function L(){return window.StoryLab}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')||[]}catch(e){return[]}}
function save(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
function get(id){return load().filter(function(c){return c.id===id})[0]}
function put(c){var a=load(),i=a.map(function(x){return x.id}).indexOf(c.id);if(i<0)a.push(c);else a[i]=c;save(a)}
function esc(t){return L().esc(t)}
function clean(t){var o=L().check(t);return o.reduce(function(x,c){return c.fix?c.fix(x):x},t)}
var STARTERS={bridge:'Don\u2019t worry, kids!',lego:'Let\u2019s build it!',suit:'It\u2019s a perfect fit!',museum:'I see a clue!',toys:'Look at my new figure!',school:'It works!'};
var FULL=['Hold on!','I\u2019m on my way!','Let\u2019s go!','We did it!','Thank you!','Wow, look at that!'];
var FRAG=['I\u2019m','Let\u2019s','Don\u2019t','We can','Wow,'];
function create(m,para){
 var c={id:'c'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),m:m.id,title:m.title,ts:Date.now(),
  p:[['topic',''],['first','_2'],['next','_3'],['end','_4']].map(function(k,i){return{img:'assets/story/'+m.id+(i?k[1]:'')+'.jpg',cap:clean(para[k[0]]||''),b:''}})};
 put(c);return c.id}
function page(c,edit){
 return '<div class="comic" id="comicPage">'+c.p.map(function(p,i){
  return '<div class="panel p'+(i+1)+'"><img src="'+p.img+'" alt="">'+
   '<div class="'+(i===0?'titlecap':'cap')+'">'+esc(p.cap)+'</div>'+
   (p.b?'<div class="bubble">'+esc(p.b)+'</div>':'')+
   (edit?'<button class="addb" data-i="'+i+'">'+(p.b?'✏️ Change bubble':'💬 Add a bubble')+'</button>':'')+'</div>'}).join('')+
  '<div class="credit">A Hero Math Comic by Samuel \u00b7 '+esc(c.title)+'</div></div>'}
function readText(c){return c.p.map(function(p){return p.cap+(p.b?' '+p.b:'')}).join(' ')}
// ---- bubble check: one friendly hint at a time
function bcheck(t){var o=[],s=t.trim();
 if(/["\u201c\u201d]/.test(s))o.push({msg:'Speech bubbles don\u2019t need quotation marks \u2013 the bubble already shows who is talking. Want me to take them out?',fix:function(x){return x.replace(/["\u201c\u201d]/g,'').trim()}});
 var C={im:'I\u2019m',dont:'don\u2019t',cant:'can\u2019t',ive:'I\u2019ve',youre:'you\u2019re',thats:'that\u2019s',isnt:'isn\u2019t',didnt:'didn\u2019t',wont:'won\u2019t'};
 var re=/\b(im|dont|cant|ive|youre|thats|isnt|didnt|wont)\b/i,lm=/\blets (go|do|try|build|fix|look|find|help|swing|see|get|play|save)\b/i;
 if(re.test(s)||lm.test(s)){var w=(s.match(re)||s.match(lm))[0];o.push({msg:'A contraction needs an apostrophe (\u2019) to show missing letters, like <b>I\u2019m</b> = I am and <b>let\u2019s</b> = let us. Want me to add it?',fix:function(x){x=x.replace(/\b(im|dont|cant|ive|youre|thats|isnt|didnt|wont)\b/gi,function(a){var r=C[a.toLowerCase()];return a.charAt(0)===a.charAt(0).toUpperCase()?r.charAt(0).toUpperCase()+r.slice(1):r});return x.replace(/\blets (?=(go|do|try|build|fix|look|find|help|swing|see|get|play|save)\b)/gi,function(a){return (a.charAt(0)==='L'?'L':'l')+'et\u2019s '})}})}
 if(/(^|\s)i(\s|\u2019|'|$)/.test(s))o.push({msg:'When you talk about yourself, <b>I</b> is always a capital letter. Want me to fix it?',fix:function(x){return x.replace(/(^|\s)i(?=\s|\u2019|'|$)/g,'$1I')}});
 L().check(s).forEach(function(c){if(c.fix)o.push({msg:/capital/.test(c.msg)?'Bubbles start with a capital letter, just like sentences. Want me to make it big?':'Bubbles need an end mark: . or ! or ? (Try ! for excited words!)',fix:c.fix})});
 return o}
var E=null;// edit state
function edit(id){var c=get(id);if(!c)return shelf();E={c:c,q:0,ft:0,h:0,tries:0,slot:-1,logged:false};drawEdit()}
function drawEdit(msg){var c=E.c,app=L().app;
 app.innerHTML='<div class="top"><button class="ghost" id="cHome">⬅ Missions</button><div class="row" style="margin:0"><button class="ghost" id="cRead">🔊 Read my comic</button><button class="big" id="cDone">✅ Save to My Comics</button></div></div>'+
 '<h2 class="ctitle">📖 Your comic is ready!</h2><p class="sub">Want to make your heroes talk? Tap <b>💬 Add a bubble</b> on any panel. It\u2019s totally optional.</p>'+page(c,true)+'<div id="bedit"></div>';
 bind();if(E.slot>=0)openB(E.slot,msg)}
function bind(){var app=L().app;
 document.getElementById('cHome').onclick=function(){logB();L().menu()};
 document.getElementById('cDone').onclick=function(){logB();shelf(E.c.id)};
 document.getElementById('cRead').onclick=function(){L().speak(readText(E.c))};
 [].forEach.call(app.querySelectorAll('.addb'),function(b){b.onclick=function(){E.slot=+b.dataset.i;E.tries=0;openB(E.slot);document.getElementById('bedit').scrollIntoView({behavior:'smooth',block:'start'})}})}
function openB(i,msg){var be=document.getElementById('bedit'),st=[STARTERS[E.c.m]].concat(FULL);
 be.innerHTML='<div class="frame"><div class="lab">Speech bubble \u2013 panel '+(i+1)+'</div><b>Tap a bubble, or start one and finish it yourself:</b>'+
 '<div class="chips">'+st.map(function(t){return '<button class="chip bfull">'+esc(t)+'</button>'}).join('')+'</div>'+
 '<div class="chips">'+FRAG.map(function(t){return '<button class="chip bfrag">'+esc(t)+' \u2026</button>'}).join('')+'</div>'+
 '<div class="row"><input id="bIn" maxlength="60" placeholder="Type what they say\u2026" autocorrect="on" autocapitalize="sentences"><button class="big" id="bChk">✔ Check</button><button class="ghost" id="bX">Close</button></div><div id="bfb">'+(msg||'')+'</div></div>';
 [].forEach.call(be.querySelectorAll('.bfull'),function(b){b.onclick=function(){attempt(b.textContent,true)}});
 [].forEach.call(be.querySelectorAll('.bfrag'),function(b){b.onclick=function(){var n=document.getElementById('bIn');n.value=b.textContent.replace(/ \u2026$/,'')+' ';n.focus()}});
 document.getElementById('bChk').onclick=function(){attempt(document.getElementById('bIn').value,false)};
 document.getElementById('bX').onclick=function(){E.slot=-1;be.innerHTML=''}}
function attempt(v,chip){var fb=document.getElementById('bfb');
 if(!v||!v.trim()){fb.innerHTML='<div class="hint">💡 Tap a bubble idea, or write your own \u2013 both are great!</div>';return}
 var o=bcheck(v);
 if(!o.length){if(!E.tries)E.ft++;E.q++;place(v.trim());return}
 E.tries++;E.h++;
 fb.innerHTML='<div class="hint">💡 '+o[0].msg+'</div><div class="row"><button class="ghost" id="bFix">✨ Fix it for me</button></div>';
 document.getElementById('bFix').onclick=function(){var n=document.getElementById('bIn');n.value=o[0].fix(n.value.trim()?n.value:v);var r=bcheck(n.value);if(!r.length){E.q++;place(n.value.trim())}else attempt(n.value,false)}}
function place(t){E.c.p[E.slot].b=t;put(E.c);var i=E.slot;E.slot=-1;E.tries=0;drawEdit();
 document.getElementById('bedit').innerHTML='<div class="praise">⭐ '+L().praise()+' Your bubble has a capital letter and an end mark. <button class="ghost" id="bHear">🔊 Hear it</button></div>';
 document.getElementById('bHear').onclick=function(){L().speak(t)}}
function logB(){if(!E||E.logged||!E.q)return;E.logged=true;
 try{HMA.progress.log({kid:'Samuel',mode:'writing',skill:'w-dialogue',sol:SOL,questions:E.q,firstTry:E.ft,hints:E.h,minutes:0,venom:E.c.m})}catch(e){}}
// ---- shelf + reader
function shelf(openId){var a=load(),app=L().app;E=null;
 app.innerHTML='<div class="top"><button class="ghost" id="sHome">⬅ Missions</button></div><h1>📚 My Comics</h1>'+
 (a.length?'<p class="sub">You made '+a.length+' comic'+(a.length>1?'s':'')+'! Tap one to read it.</p><div class="shelf">'+a.slice().reverse().map(function(c,k){return '<button class="cover" data-id="'+c.id+'"><img src="'+c.p[0].img+'" alt=""><span class="ctag">HERO MATH COMICS #'+(a.length-k)+'</span><span class="cname">'+esc(c.title)+'</span><small>'+new Date(c.ts).toLocaleDateString('en-US',{month:'short',day:'numeric'})+'</small></button>'}).join('')+'</div>':'<p class="sub">Your first comic is one story away! Finish a mission to make one.</p>');
 document.getElementById('sHome').onclick=function(){L().menu()};
 [].forEach.call(app.querySelectorAll('.cover'),function(b){b.onclick=function(){reader(b.dataset.id)}});
 if(openId)reader(openId)}
function reader(id){var a=load().slice().reverse(),i=a.map(function(c){return c.id}).indexOf(id),c=a[i],app=L().app;if(!c)return shelf();
 app.innerHTML='<div class="top"><button class="ghost" id="rBack">⬅ My Comics</button><div class="row" style="margin:0"><button class="ghost" id="rPrev"'+(i>0?'':' disabled')+'>◀ Newer</button><span class="pg">'+(i+1)+' / '+a.length+'</span><button class="ghost" id="rNext"'+(i<a.length-1?'':' disabled')+'>Older ▶</button><button class="big" id="rRead">🔊 Read it to me</button></div></div>'+page(c,false)+'<div class="row"><button class="ghost" id="rEdit">💬 Add or change bubbles</button></div>';
 document.getElementById('rBack').onclick=function(){shelf()};
 document.getElementById('rRead').onclick=function(){L().speak(readText(c))};
 document.getElementById('rEdit').onclick=function(){edit(c.id)};
 if(i>0)document.getElementById('rPrev').onclick=function(){reader(a[i-1].id)};
 if(i<a.length-1)document.getElementById('rNext').onclick=function(){reader(a[i+1].id)}}
window.StoryComic={create:create,edit:edit,shelf:shelf,reader:reader,count:function(){return load().length},bcheck:bcheck,_all:load};
})();
