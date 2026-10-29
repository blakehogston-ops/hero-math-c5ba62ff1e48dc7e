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
function create(m,para,pics){pics=pics||{};var P=L().pics||{};
 var c={id:'c'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),m:m.id,title:m.title,ts:Date.now(),
  p:[['topic',''],['first','_2'],['next','_3'],['end','_4']].map(function(k,i){var n=pics[k[0]],img=n&&P[n]?'assets/story/c_'+n+'.jpg':'assets/story/'+m.id+(i?k[1]:'')+'.jpg';
   return{img:img,sp:n&&P[n]?[P[n][0],P[n][1]]:[50,30],cap:clean(para[k[0]]||''),b:''}})};
 put(c);return c.id}
function page(c,edit){
 return (edit?'<div class="bbar"><b>💬 Speech bubbles (optional):</b>'+c.p.map(function(p,i){return '<button class="addb" data-i="'+i+'">'+(p.b?'✏️ Panel '+(i+1):'💬 Panel '+(i+1))+'</button>'}).join('')+'</div>':'')+
  '<div class="comic" id="comicPage">'+c.p.map(function(p,i){
  var sp=p.sp||[50,30];
  return '<div class="panel p'+(i+1)+'" data-sx="'+sp[0]+'" data-sy="'+sp[1]+'"><img src="'+p.img+'" alt="">'+
   '<div class="'+(i===0?'titlecap':'cap')+'">'+esc(p.cap)+'</div>'+
   (p.b?'<svg class="tail t0"></svg><div class="bubble">'+esc(p.b)+'</div><svg class="tail t1"></svg>':'')+'</div>'}).join('')+
  '<div class="credit">A Hero Math Comic by Samuel \u00b7 '+esc(c.title)+'</div></div>'}
// ---- bubble placement: near the speaker, never over the caption or the speaker's face; tail points at the speaker
function inter(a,b){return a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h}
function layout(root){[].forEach.call((root||document).querySelectorAll('.panel'),function(pn){var bu=pn.querySelector('.bubble');if(!bu)return;
 var W=pn.clientWidth,H=pn.clientHeight;if(!W)return;var cp=pn.querySelector('.cap,.titlecap'),cr={x:cp.offsetLeft-8,y:cp.offsetTop-8,w:cp.offsetWidth+16,h:cp.offsetHeight+16};
 bu.style.maxWidth=Math.round(W*0.46)+'px';var bw=bu.offsetWidth,bh=bu.offsetHeight,sx=+pn.dataset.sx*W/100,sy=+pn.dataset.sy*H/100,face={x:sx-H*0.13,y:sy-H*0.15,w:H*0.26,h:H*0.3};
 var best=null,bs=1e9;for(var gx=0;gx<=10;gx++)for(var gy=0;gy<=8;gy++){var r={x:8+(W-bw-16)*gx/10,y:8+(H-bh-16)*gy/8,w:bw,h:bh};var sc=0;
  if(inter(r,cr))continue;if(inter(r,face))sc+=H*2;var cx=Math.max(r.x,Math.min(r.x+bw,sx)),cy=Math.max(r.y,Math.min(r.y+bh,sy));var d=Math.hypot(cx-sx,cy-sy);sc+=Math.abs(d-H*0.2);if(r.y+bh/2>sy+H*0.08)sc+=H*0.6;if(sc<bs){bs=sc;best=r}}
 if(!best)best={x:W-bw-8,y:8};bu.style.left=best.x+'px';bu.style.top=best.y+'px';bu.style.right='auto';bu.style.bottom='auto';
 var bx=best.x,by=best.y,base,dirY=sy>by+bh;var tw=Math.max(14,Math.min(22,bw*0.18));
 if(dirY){var ux=Math.max(bx+bw*0.22,Math.min(bx+bw*0.78,sx));base=[ux,by+bh-3];}else if(sy<by){var ux2=Math.max(bx+bw*0.22,Math.min(bx+bw*0.78,sx));base=[ux2,by+3]}else{base=[sx<bx?bx+3:bx+bw-3,by+bh/2]}
 var dx=sx-base[0],dy=sy-base[1],len=Math.hypot(dx,dy)||1,tl=Math.min(len-H*0.07,H*0.2);if(tl<12)tl=12;var tip=[base[0]+dx/len*tl,base[1]+dy/len*tl];
 var nx=-dy/len,ny=dx/len,h=tw/2,A=[base[0]+nx*h,base[1]+ny*h],B=[base[0]-nx*h,base[1]-ny*h];
 var inX=-dx/len*7,inY=-dy/len*7,A2=[base[0]+nx*(h-3)+inX,base[1]+ny*(h-3)+inY],B2=[base[0]-nx*(h-3)+inX,base[1]-ny*(h-3)+inY];
 var f=function(a){return a.map(function(q){return q[0].toFixed(1)+','+q[1].toFixed(1)}).join(' ')};
 var t0=pn.querySelector('.tail.t0'),t1=pn.querySelector('.tail.t1');[t0,t1].forEach(function(t){t.setAttribute('viewBox','0 0 '+W+' '+H);t.setAttribute('width',W);t.setAttribute('height',H)});
 t0.innerHTML='<polygon points="'+f([A,tip,B])+'" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/>';
 t1.innerHTML='<polygon points="'+f([A2,tip,B2])+'" fill="#fff" transform="translate(0,0)"/><polygon points="'+f([A,tip,B])+'" fill="none" stroke="#111" stroke-width="3" stroke-linejoin="round" clip-path="none" style="display:none"/>';
 pn.dataset.tail=JSON.stringify([A,tip,B]);bu.style.visibility='visible'})}
function relayout(){var r=document.getElementById('comicPage');if(!r)return;var imgs=[].slice.call(r.querySelectorAll('img'));var go=function(){layout(r)};
 (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){go();imgs.forEach(function(i){if(!i.complete)i.addEventListener('load',go)})})}
window.addEventListener('resize',function(){clearTimeout(relayout.t);relayout.t=setTimeout(relayout,120)});
// ---- export: a printed-comic-page PNG (share sheet on iPad, file download on a computer)
function wrap(ctx,t,maxW){var w=t.split(/\s+/),lines=[],cur='';w.forEach(function(x){var tr=cur?cur+' '+x:x;if(ctx.measureText(tr).width>maxW&&cur){lines.push(cur);cur=x}else cur=tr});if(cur)lines.push(cur);return lines}
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function exportPNG(c,num){var pg=document.getElementById('comicPage'),one=pg&&getComputedStyle(pg).gridTemplateColumns.split(' ').length<2;
 if(!one)return exportPNG0(c,num);
 // narrow screens show 1 column; lay the page out 2x2 just for the picture, then put it back
 pg.classList.add('exp2');return new Promise(function(r){layout(pg);requestAnimationFrame(function(){requestAnimationFrame(r)})}).then(function(){return exportPNG0(c,num)}).then(function(b){pg.classList.remove('exp2');layout(pg);return b},function(e){pg.classList.remove('exp2');layout(pg);throw e})}
function exportPNG0(c,num){return (document.fonts?document.fonts.ready:Promise.resolve()).then(function(){
 var pg=document.getElementById('comicPage'),pr=pg.getBoundingClientRect(),PW=2000,k=(PW-160)/pr.width,HEAD=190,FOOT=110,PH=Math.round(pr.height*k)+HEAD+FOOT+80;
 var cv=document.createElement('canvas');cv.width=PW;cv.height=PH;var x=cv.getContext('2d');
 x.fillStyle='#fbf6e6';x.fillRect(0,0,PW,PH);
 // halftone border dots
 x.fillStyle='rgba(200,30,40,0.10)';for(var yy=0;yy<PH;yy+=18)for(var xx=0;xx<PW;xx+=18){if(xx>50&&xx<PW-50&&yy>50&&yy<PH-50)continue;x.beginPath();x.arc(xx+((yy/18)%2?9:0),yy,4,0,7);x.fill()}
 // masthead
 x.fillStyle='#d4121e';x.fillRect(80,60,PW-160,HEAD-80);x.strokeStyle='#111';x.lineWidth=8;x.strokeRect(80,60,PW-160,HEAD-80);
 x.fillStyle='#ffd23f';x.font='400 84px Bangers, Impact, sans-serif';x.textBaseline='middle';x.fillText('HERO MATH COMICS',112,118);
 x.fillStyle='#fff';x.font='400 52px Bangers, Impact, sans-serif';x.textAlign='right';x.fillText((num?'#'+num+'  ':'')+c.title.toUpperCase(),PW-112,120);x.textAlign='left';
 var ox=80-pr.left*k,oy=HEAD+20-pr.top*k;function R(el){var r=el.getBoundingClientRect();return{x:r.left*k+ox,y:r.top*k+oy,w:r.width*k,h:r.height*k}}
 [].forEach.call(pg.querySelectorAll('.panel'),function(pn){var r=R(pn),im=pn.querySelector('img');
  x.fillStyle='#111';x.fillRect(r.x,r.y,r.w,r.h);var bw=4*k;
  try{var iw=im.naturalWidth,ih=im.naturalHeight,ar=(r.w-2*bw)/(r.h-2*bw),sw=iw,sh=iw/ar;if(sh>ih){sh=ih;sw=ih*ar}x.drawImage(im,(iw-sw)/2,(ih-sh)/2,sw,sh,r.x+bw,r.y+bw,r.w-2*bw,r.h-2*bw)}catch(e){}
  var cap=pn.querySelector('.cap,.titlecap');if(cap){var q=R(cap),cs=getComputedStyle(cap),fs=parseFloat(cs.fontSize)*k,title=cap.classList.contains('titlecap');
   x.save();if(title){x.translate(q.x+q.w/2,q.y+q.h/2);x.rotate(-1.2*Math.PI/180);x.translate(-(q.x+q.w/2),-(q.y+q.h/2))}
   x.fillStyle='rgba(0,0,0,.55)';x.fillRect(q.x+4*k,q.y+4*k,q.w,q.h);x.fillStyle=title?'#ffd23f':'#fff3b0';x.fillRect(q.x,q.y,q.w,q.h);x.lineWidth=3*k;x.strokeStyle='#111';x.strokeRect(q.x,q.y,q.w,q.h);
   x.fillStyle='#111';x.font='700 '+fs+'px "Comic Neue", sans-serif';x.textBaseline='top';var padX=parseFloat(cs.paddingLeft)*k,padY=parseFloat(cs.paddingTop)*k,lh=parseFloat(cs.lineHeight)*k||fs*1.2;
   wrap(x,cap.textContent,q.w-2*padX+2).forEach(function(l,i){x.fillText(l,q.x+padX,q.y+padY+i*lh)});x.restore()}
  var bu=pn.querySelector('.bubble');if(bu){var b=R(bu),bs=getComputedStyle(bu),bf=parseFloat(bs.fontSize)*k,pr2=pn.getBoundingClientRect(),t=JSON.parse(pn.dataset.tail||'null');
   var T=t&&t.map(function(p){return[(pr2.left+p[0])*k+ox,(pr2.top+p[1])*k+oy]});x.lineJoin='round';x.lineWidth=3*k;x.strokeStyle='#111';x.fillStyle='#fff';
   if(T){x.beginPath();x.moveTo(T[0][0],T[0][1]);x.lineTo(T[1][0],T[1][1]);x.lineTo(T[2][0],T[2][1]);x.closePath();x.fill();x.stroke()}
   rr(x,b.x,b.y,b.w,b.h,24*k);x.fill();x.stroke();
   if(T){x.beginPath();var mx=(T[0][0]+T[2][0])/2,my=(T[0][1]+T[2][1])/2,dx=T[1][0]-mx,dy=T[1][1]-my,l=Math.hypot(dx,dy)||1,s2=4*k;x.moveTo(T[0][0]-dx/l*s2+(mx-T[0][0])*0.18,T[0][1]-dy/l*s2+(my-T[0][1])*0.18);x.lineTo(T[1][0]-dx/l*3*k,T[1][1]-dy/l*3*k);x.lineTo(T[2][0]-dx/l*s2+(mx-T[2][0])*0.18,T[2][1]-dy/l*s2+(my-T[2][1])*0.18);x.closePath();x.fill()}
   x.fillStyle='#111';x.font='700 '+bf+'px "Comic Neue", sans-serif';x.textAlign='center';x.textBaseline='top';var lh2=parseFloat(bs.lineHeight)*k||bf*1.2,ls=wrap(x,bu.textContent,b.w-2*parseFloat(bs.paddingLeft)*k+2),ty=b.y+(b.h-ls.length*lh2)/2;
   ls.forEach(function(l,i){x.fillText(l,b.x+b.w/2,ty+i*lh2)});x.textAlign='left'}});
 x.fillStyle='#111';x.font='400 46px Bangers, Impact, sans-serif';x.textBaseline='middle';x.fillText('WRITTEN BY SAMUEL',80,PH-FOOT/2-20);x.textAlign='right';x.font='700 32px "Comic Neue", sans-serif';x.fillText(new Date(c.ts).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}),PW-80,PH-FOOT/2-20);x.textAlign='left';
 return new Promise(function(res){cv.toBlob(res,'image/png')})})}
function savePic(c,num,fb){exportPNG(c,num).then(function(blob){var name='hero-comic-'+c.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'.png';
 var touch=window.matchMedia&&matchMedia('(pointer:coarse)').matches,file;try{file=new File([blob],name,{type:'image/png'})}catch(e){}
 if(touch&&file&&navigator.canShare&&navigator.canShare({files:[file]})){navigator.share({files:[file],title:c.title}).then(function(){fb&&(fb.innerHTML='<div class="praise">📸 Saved! Look for it in your Photos.</div>')}).catch(function(){});return}
 var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},4000);
 window.__lastExport={name:name,size:blob.size};fb&&(fb.innerHTML='<div class="praise">💾 Downloaded <b>'+esc(name)+'</b> \u2013 look in your Downloads folder.</div>')})}
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
 '<h2 class="ctitle">📖 Your comic is ready!</h2><p class="sub">Want to make your heroes talk? Tap a <b>💬 Panel</b> button just above the comic. It\u2019s totally optional.</p>'+page(c,true)+'<div id="bedit"></div>';
 bind();relayout();if(E.slot>=0)openB(E.slot,msg)}
function bind(){var app=L().app;
 document.getElementById('cHome').onclick=function(){logB();L().menu()};
 document.getElementById('cDone').onclick=function(){logB();shelf(E.c.id)};
 document.getElementById('cRead').onclick=function(){L().speak(readText(E.c))};
 [].forEach.call(app.querySelectorAll('.addb'),function(b){b.onclick=function(){E.slot=+b.dataset.i;E.tries=0;[].forEach.call(app.querySelectorAll('.addb'),function(x){x.classList.toggle('on',x===b)});openB(E.slot);document.getElementById('bedit').scrollIntoView({behavior:'smooth',block:'start'})}})}
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
 if(!chip&&L().realWords&&!L().realWords(v)){E.tries++;E.h++;fb.innerHTML='<div class="hint">💡 Hmm, I can\u2019t find a real word yet. Try real words, or tap a bubble idea above!</div>';return}
 var o=bcheck(v);
 if(!o.length){if(!E.tries)E.ft++;E.q++;place(v.trim());return}
 E.tries++;E.h++;
 fb.innerHTML='<div class="hint">💡 '+o[0].msg+'</div><div class="row"><button class="ghost" id="bFix">✨ Fix it for me</button></div>';
 document.getElementById('bFix').onclick=function(){var n=document.getElementById('bIn');n.value=o[0].fix(n.value.trim()?n.value:v);var r=bcheck(n.value);if(!r.length){E.q++;place(n.value.trim())}else attempt(n.value,false)}}
function place(t){E.c.p[E.slot].b=t;put(E.c);var i=E.slot;E.slot=-1;E.tries=0;drawEdit();
 document.getElementById('bedit').innerHTML='<div class="praise">⭐ '+L().praise()+' Your bubble has a capital letter and an end mark. <button class="hear" id="bHear">🔊 Hear it</button></div>';
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
 app.innerHTML='<div class="top"><button class="ghost" id="rBack">⬅ My Comics</button><div class="row" style="margin:0"><button class="ghost" id="rPrev"'+(i>0?'':' disabled')+'>◀ Newer</button><span class="pg">'+(i+1)+' / '+a.length+'</span><button class="ghost" id="rNext"'+(i<a.length-1?'':' disabled')+'>Older ▶</button><button class="big" id="rRead">🔊 Read it to me</button></div></div>'+page(c,false)+'<div class="row"><button class="ghost" id="rEdit">💬 Add or change bubbles</button><button class="big" id="rSave">'+((window.matchMedia&&matchMedia("(pointer:coarse)").matches)?'📸 Save to Photos':'💾 Download picture')+'</button></div><div id="rfb"></div>';relayout();
 document.getElementById('rBack').onclick=function(){shelf()};
 document.getElementById('rRead').onclick=function(){L().speak(readText(c))};
 document.getElementById('rEdit').onclick=function(){edit(c.id)};document.getElementById('rSave').onclick=function(){savePic(c,a.length-i,document.getElementById('rfb'))};
 if(i>0)document.getElementById('rPrev').onclick=function(){reader(a[i-1].id)};
 if(i<a.length-1)document.getElementById('rNext').onclick=function(){reader(a[i+1].id)}}
window.StoryComic={create:create,edit:edit,shelf:shelf,reader:reader,count:function(){return load().length},bcheck:bcheck,_all:load,exportPNG:exportPNG,layout:relayout};
})();
