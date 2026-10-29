/* Spider-Man Story Lab – ELA writing mode (PREVIEW). VA 2024 English SOL Gr 3 writing:
   complete sentences; paragraph w/ topic sentence + supporting details; capitals + end punctuation.
   Anxiety-safe: no timers, no score to lose, effort praise, every check is a friendly hint with a "fix it for me". */
(function(){'use strict';
var M=[
 {id:'bridge',em:'🕷️🌉🚌',title:'Bridge Rescue',cap:'A school bus is stuck on the bridge!',ideas:[
  {em:'🕸️',t:'Spidey webs the bus',s:'Spider-Man webs the bus to the bridge.'},
  {em:'🧒',t:'Kids wave for help',s:'The kids wave and shout for help.'},
  {em:'🚒',t:'A fire truck races in',s:'A red fire truck races to the bridge.'}],
  bank:['bridge','bus','webs','rescue','strong','safe'],
  frame:{topic:['Spider-Man had a scary day.','This story is about a bus on a bridge.','This story is about a big rescue.','This story is about a brave hero.'],
   first:['the bus started to slip.','Spider-Man swung to the bridge.','the kids felt scared.'],
   next:['he shot webs to hold the bus.','the fire truck came to help.','the kids climbed out safely.'],
   end:['everyone was safe and happy.','the city cheered for Spider-Man.','the kids said thank you.']}},
 {id:'lego',em:'🧱🏙️✨',title:'LEGO City Build',cap:'You get a giant box of LEGO bricks!',ideas:[
  {em:'🏢',t:'Build a tall tower',s:'I build a tall tower for Spider-Man.'},
  {em:'🚁',t:'Build a hero jet',s:'I build a fast jet with red bricks.'},
  {em:'🏠',t:'Build Aunt May\u2019s house',s:'I build a cozy house for Aunt May.'}],
  bank:['bricks','build','tower','tall','colors','pieces'],
  frame:{topic:['I had the best idea ever!','This story is about my best LEGO build.','This story is about a giant LEGO city.','This story is about building with bricks.'],
   first:['I sorted all the bricks by color.','I read the steps in the book.','I built a strong base.'],
   next:['I stacked the walls up high.','I added windows and a door.','I put the minifigures inside.'],
   end:['my build was finished and I was proud.','I showed my dad my build.','I put it on my shelf.']}},
 {id:'suit',em:'🦸‍♂️🔴🔵',title:'New Suit Day',cap:'Peter tries on a brand new suit.',ideas:[
  {em:'🔴',t:'The suit is shiny red',s:'The new suit is shiny and red.'},
  {em:'👀',t:'The eyes can zoom',s:'The mask eyes can zoom far away.'},
  {em:'🕸️',t:'It shoots new webs',s:'The suit shoots super sticky webs.'}],
  bank:['suit','mask','shiny','webs','zoom','gadget'],
  frame:{topic:['Peter could not believe his eyes!','This story is about a new hero suit.','This story is about Peter\u2019s cool suit.','This story is about suit gadgets.'],
   first:['Peter opened a big box.','he put on the mask.','he tested the web shooters.'],
   next:['the eyes zoomed across the city.','he swung between two buildings.','he showed the suit to Ned.'],
   end:['Peter loved his new suit.','he was ready to help the city.','he hung the suit up carefully.']}},
 {id:'museum',em:'🏛️🦖🌙',title:'Night at the Museum',cap:'A dinosaur bone goes missing!',ideas:[
  {em:'🔦',t:'Look for clues',s:'Spider-Man looks for clues with a flashlight.'},
  {em:'🐾',t:'Find big footprints',s:'He finds big footprints on the floor.'},
  {em:'🦴',t:'The bone is found',s:'The guard finds the bone behind a door.'}],
  bank:['museum','clues','dinosaur','bone','quiet','dark'],
  frame:{topic:['Something strange happened at the museum.','This story is about a museum mystery.','This story is about a missing bone.','This story is about solving a case.'],
   first:['the museum was dark and quiet.','Spider-Man found a clue.','he heard a strange noise.'],
   next:['he followed the footprints.','he used his spider-sense.','he looked behind a big door.'],
   end:['the bone was back where it belonged.','the mystery was solved.','the guard said thank you.']}},
 {id:'toys',em:'🧸📦⭐',title:'Collector Shelf',cap:'A new hero figure comes in the mail.',ideas:[
  {em:'📦',t:'Open the box slowly',s:'I open the box very slowly.'},
  {em:'🦸',t:'Pose the figure',s:'I pose the figure on my shelf.'},
  {em:'📸',t:'Take a photo',s:'I take a photo of my new figure.'}],
  bank:['figure','shelf','careful','pose','details','collect'],
  frame:{topic:['The best box ever came in the mail!','This story is about my new hero figure.','This story is about my collection.','This story is about a special package.'],
   first:['the mail came to my house.','I opened the box carefully.','I looked at all the tiny details.'],
   next:['I gave him a cool hero pose.','I found the best spot on my shelf.','I took a picture to show my family.'],
   end:['it is my favorite figure now.','my shelf looks awesome.','I can\u2019t wait to get the next one.']}},
 {id:'school',em:'🏫🧪🎒',title:'Science Fair',cap:'Peter and Ned build a robot for the fair.',ideas:[
  {em:'🤖',t:'Build a robot',s:'Peter and Ned build a small robot.'},
  {em:'💡',t:'The robot lights up',s:'The robot lights up and beeps.'},
  {em:'🏆',t:'Show the class',s:'They show the robot to the class.'}],
  bank:['robot','science','build','beeps','class','friends'],
  frame:{topic:['Peter and Ned had a big surprise.','This story is about a science fair robot.','This story is about two smart friends.','This story is about a cool invention.'],
   first:['Peter drew a plan for the robot.','Ned found wires and wheels.','they worked after school.'],
   next:['they tested the robot in the lab.','the robot rolled across the table.','they fixed a loose wire.'],
   end:['the class clapped for the robot.','Peter and Ned felt proud.','they want to build another one.']}}];
var SLOTS=[['topic','Topic sentence','This story is about'],['first','Detail 1','First,'],['next','Detail 2','Next,'],['end','Ending','In the end,']];
var PRAISE=['You kept trying \u2013 that\u2019s what heroes do!','Great thinking!','Nice work sticking with it!','You chose that all by yourself!','Strong writing muscles!'];
var app=document.getElementById('app'),S={},start=0;
function done(){try{return JSON.parse(localStorage.getItem('hma_storylab_done')||'{}')}catch(e){return{}}}
function markDone(id){var d=done();d[id]=(d[id]||0)+1;try{localStorage.setItem('hma_storylab_done',JSON.stringify(d))}catch(e){}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function praise(){return PRAISE[Math.floor(Math.random()*PRAISE.length)]}
function speak(t){try{if(!window.speechSynthesis)return;speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.rate=.9;speechSynthesis.speak(u)}catch(e){}}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function head(step){return '<div class="top"><button class="ghost" id="home">⬅ Missions</button><div class="steps">'+['1 Idea','2 Sentence','3 Paragraph'].map(function(s,i){return '<span class="'+(i+1===step?'on':'')+'">'+s+'</span>'}).join('')+'</div></div><h2>'+esc(S.m.title)+'</h2>'}
function bindHome(){var h=document.getElementById('home');if(h)h.onclick=menu}
// gentle mechanics check -> list of {msg,fix}
function check(t){var o=[],w=t.trim().split(/\s+/).filter(Boolean);
 if(w.length&&/^[a-z]/.test(t.trim()))o.push({msg:'Sentences start with a capital letter. Want me to make the first letter big?',fix:function(x){x=x.trim();return x.charAt(0).toUpperCase()+x.slice(1)}});
 if(w.length&&!/[.!?]["\u201d]?$/.test(t.trim()))o.push({msg:'Every sentence needs a stop sign at the end: . or ! or ?',fix:function(x){return x.trim()+'.'}});
 if(w.length&&w.length<3)o.push({msg:'Can you tell a little more? Who is doing what? (It\u2019s OK to keep it, too.)',fix:null});
 return o}
function menu(){S={};var d=done();
 app.innerHTML='<div class="top"><button class="ghost" id="toHMA">⬅ Hero Math</button></div><h1>🕷️ Spider-Man Story Lab</h1><p class="sub">Pick a mission. No timer, no rush \u2013 every story you write earns a LEGO brick for your wall.</p><div class="grid">'+M.map(function(m){var n=d[m.id]||0;return '<button class="mission" data-id="'+m.id+'"><img class="thumb" src="assets/story/'+m.id+'.jpg" alt=""><b>'+esc(m.title)+'</b><small>'+esc(m.cap)+'</small><span>'+(n?'<span class="brick" style="background:#e3000b"></span>Built '+n+'\u00d7':'New!')+'</span></button>'}).join('')+'</div>'+
 '<p class="sub" style="margin-top:22px">Brick wall: '+(Object.keys(d).reduce(function(a,k){return a+d[k]},0)?Object.keys(d).map(function(k){return new Array(d[k]+1).join('<span class="brick" style="background:#'+['e3000b','0055bf','f2cd37','237841'][k.length%4]+'"></span>')}).join(''):'(your first brick is one story away!)')+'</p>';
 document.getElementById('toHMA').onclick=function(){try{if(window.parent!==window&&parent.__closeStoryLab)return parent.__closeStoryLab()}catch(e){}location.href='index.html'};
 [].forEach.call(app.querySelectorAll('.mission'),function(b){b.onclick=function(){open(b.dataset.id)}})}
function open(id){S={m:M.filter(function(m){return m.id===id})[0],hints:0,first:0,checks:0,para:{}};start=Date.now();stepA()}
function stepA(){var m=S.m;
 app.innerHTML=head(1)+'<div class="scene"><img src="assets/story/'+m.id+'.jpg" alt="'+esc(m.cap)+'"><p>'+esc(m.cap)+'</p></div><p class="sub" style="margin-top:14px">What could happen next? Tap an idea \u2013 any one is a great choice. <button class="ghost" id="rd">🔊</button></p><div class="cards">'+m.ideas.map(function(x,i){return '<button class="card" data-i="'+i+'"><span class="em">'+x.em+'</span>'+esc(x.t)+'</button>'}).join('')+'</div><div id="fb"></div>';
 bindHome();document.getElementById('rd').onclick=function(){speak(m.cap+' What could happen next? '+m.ideas.map(function(x){return x.t}).join('. '))};
 [].forEach.call(app.querySelectorAll('.card'),function(b){b.onclick=function(){S.idea=m.ideas[+b.dataset.i];[].forEach.call(app.querySelectorAll('.card'),function(c){c.classList.remove('pick')});b.classList.add('pick');
  document.getElementById('fb').innerHTML='<div class="praise">'+praise()+' \u201c'+esc(S.idea.t)+'\u201d is a cool idea.</div><div class="row"><button class="big" id="go">Build my sentence ➜</button></div>';document.getElementById('go').onclick=stepB}})}
function stepB(){var m=S.m,target=S.idea.s.replace(/([.!?])$/,' $1').split(' ');S.target=target;S.picked=[];S.tiles=shuffle(target.map(function(w,i){return{w:w,i:i}}));S.tries=0;
 app.innerHTML=head(2)+'<p class="sub">Build a sentence about <b>'+esc(lc(S.idea.t))+'</b>. Tap tiles, say it, or type it.</p><div class="strip" id="strip"></div><div class="tiles" id="tiles"></div>'+
 '<div class="row"><button class="big" id="chk">✔ Check my sentence</button><button class="say" id="mic">🎤 Say it</button><button class="ghost" id="kb">⌨️ Type it</button><button class="ghost" id="rd">🔊 Read it</button></div><div id="typed"></div>'+
 '<div class="bank"><b>Word bank:</b>'+m.bank.concat(S.idea.s.replace(/[.!?]/,'').split(' ').filter(function(w){return w.length>3})).filter(function(w,i,a){return a.indexOf(w)===i}).map(function(w){return '<button class="bw">'+esc(w)+'</button>'}).join('')+'</div><div id="fb"></div>';
 bindHome();drawTiles();
 [].forEach.call(app.querySelectorAll('.bw'),function(b){b.onclick=function(){if(!document.getElementById('free'))showTyped('');var f=document.getElementById('free');f.value=(f.value.trim()?f.value.replace(/\s*$/,' '):'')+b.textContent;f.focus()}});
 document.getElementById('chk').onclick=checkTiles;
 document.getElementById('rd').onclick=function(){speak(curText()||S.idea.s)};
 document.getElementById('kb').onclick=function(){showTyped('')};
 document.getElementById('mic').onclick=dictate}
function curText(){var t=document.getElementById('free');return t?t.value:S.picked.map(function(p){return p.w}).join(' ').replace(/ ([.!?])/,'$1')}
function drawTiles(){var st=document.getElementById('strip'),tl=document.getElementById('tiles');
 st.innerHTML=S.picked.map(function(p,k){return '<button class="tile" data-k="'+k+'">'+esc(p.w)+'</button>'}).join('');
 tl.innerHTML=S.tiles.map(function(p,k){var u=S.picked.indexOf(p)>=0;return '<button class="tile'+(u?' used':'')+'" data-k="'+k+'"'+(u?' disabled':'')+'>'+esc(p.w)+'</button>'}).join('');
 [].forEach.call(st.querySelectorAll('.tile'),function(b){b.onclick=function(){S.picked.splice(+b.dataset.k,1);drawTiles()}});
 [].forEach.call(tl.querySelectorAll('.tile'),function(b){b.onclick=function(){S.picked.push(S.tiles[+b.dataset.k]);drawTiles()}})}
function checkTiles(){var fr=document.getElementById('free');if(fr&&(fr.value.trim()||!S.picked.length))return checkFree();var fb=document.getElementById('fb'),p=S.picked.map(function(x){return x.w}),t=S.target;S.checks++;
 if(p.join(' ')===t.join(' ')){if(!S.tries)S.first++;return good(curText())}
 if(!p.length){fb.innerHTML='<div class="hint">\ud83d\udca1 Tap the word tiles, or tap \u2328\ufe0f Type it and write your own \u2013 start with the word that has a capital letter!</div>';return}
 S.tries++;S.hints++;var msg;
 if(false)msg='Start with the tile that has a <b>capital letter</b> \u2013 that\u2019s how sentences begin.';
 else if(p[0]!==t[0])msg='Hmm, try starting with <b>'+esc(t[0])+'</b>. It has a capital letter, so it goes first!';
 else if(p.length<t.length)msg='Great start! There are still tiles left \u2013 a sentence needs its whole idea and a <b>.</b> at the end.';
 else msg='So close! Read it out loud \u2013 does every word sound in the right spot? (Tap a word in the strip to move it back.)';
 fb.innerHTML='<div class="hint">💡 '+msg+'</div><div class="row"><button class="ghost" id="show">Show me how</button></div>';
 document.getElementById('show').onclick=function(){S.hints++;S.picked=S.target.map(function(w,i){return S.tiles.filter(function(x){return x.i===i})[0]});drawTiles();good(curText(),'Here it is! Read it with me.')}}
function showTyped(v){document.getElementById('typed').innerHTML='<p class="sub" style="margin:12px 0 4px">Type here, or tap 🎙 on the iPad keyboard to talk. Spelling help is in the word bank.</p><textarea id="free" rows="2" autocapitalize="off" autocorrect="on" spellcheck="true"></textarea>';var f=document.getElementById('free');f.value=v;f.focus()}
function dictate(){var R=window.SpeechRecognition||window.webkitSpeechRecognition,fb=document.getElementById('fb');
 if(!R){showTyped('');fb.innerHTML='<div class="hint">🎙 Talking mode isn\u2019t on in this browser. Tap the box, then tap the <b>microphone on the iPad keyboard</b> and say your sentence.</div>';return}
 try{var r=new R();r.lang='en-US';r.interimResults=false;r.maxAlternatives=1;
  fb.innerHTML='<div class="praise">🎤 I\u2019m listening\u2026 say your sentence!</div>';
  r.onresult=function(e){var t=e.results[0][0].transcript;showTyped(t);fb.innerHTML='<div class="praise">I heard you! Check the words, then tap ✔.</div>'};
  r.onerror=function(){showTyped('');fb.innerHTML='<div class="hint">🎙 I couldn\u2019t hear that one. No problem \u2013 tap the box and use the keyboard microphone, or try 🎤 again.</div>'};
  r.start()}catch(e){showTyped('')}}
function checkFree(){var f=document.getElementById('free'),t=f.value,fb=document.getElementById('fb');S.checks++;
 if(!t.trim()){fb.innerHTML='<div class="hint">💡 Your sentence box is empty. Try 🎤, or tap tiles instead!</div>';return}
 var o=check(t);if(!o.length){if(!S.tries)S.first++;return good(t)}
 S.tries++;S.hints++;
 fb.innerHTML='<div class="hint">💡 '+o[0].msg+'</div><div class="row">'+(o[0].fix?'<button class="ghost" id="fix">✨ Fix it for me</button>':'')+'<button class="ghost" id="keep">Keep it like this</button></div>';
 var fx=document.getElementById('fix');if(fx)fx.onclick=function(){f.value=o[0].fix(f.value);checkFree()};
 document.getElementById('keep').onclick=function(){good(check(f.value).reduce(function(x,c){return c.fix?c.fix(x):x},f.value))}}
function good(t,lead){S.sentence=t;S.sh=S.hints;S.pf=0;document.getElementById('fb').innerHTML='<div class="praise">'+(lead||'⭐ '+praise())+' \u201c'+esc(t)+'\u201d is a complete sentence: capital letter at the start, stop sign at the end.</div><div class="row"><button class="ghost" id="rd2">🔊 Hear it</button><button class="big" id="go">Make it a paragraph ➜</button></div>';
 document.getElementById('rd2').onclick=function(){speak(t)};document.getElementById('go').onclick=stepC}
function stepC(){S.slot=0;S.para={};drawC()}
var NAMES=/^(I|I'm|I\u2019m|I'll|Spider-Man|Spidey|Peter|Ned|Aunt|May|LEGO|MJ|Mr\.|Mrs\.)$/;
function lc(v){v=v.trim();var w=v.split(/\s+/)[0]||'';var core=w.replace(/[^A-Za-z.'\u2019-]/g,'');if(NAMES.test(core)||/[A-Z]/.test(core.slice(1)))return v;return v.charAt(0).toLowerCase()+v.slice(1)}
function full(k,v){var st=SLOTS.filter(function(s){return s[0]===k})[0][2];v=v.trim();if(k!=='topic'){var re=new RegExp('^'+st.replace(/,$/,'')+',?\\s*','i');v=v.replace(re,'')}
 if(k==='topic'){return v}// topic chips/typed are whole sentences
 return st+' '+lc(v)}
function drawC(){var m=S.m;
 var html=head(3)+'<p class="sub">Fill your paragraph one sentence at a time. Your sentence from step 2 is a chip you can use!</p>';
 SLOTS.forEach(function(s,i){var k=s[0];
  if(S.para[k])html+='<div class="frame done"><div class="lab">'+s[1]+' ✔</div>'+esc(S.para[k])+'</div>';
  else if(i===S.slot){var ch=m.frame[k].slice();if(k!=='topic')ch=ch;else ch=ch;
   var extra=(k==='first'&&S.sentence)?[S.sentence]:[];
   html+='<div class="frame"><div class="lab">'+s[1]+'</div><b>'+(k==='topic'?'Pick or write your topic sentence:':esc(s[2])+' \u2026')+'</b><div class="chips">'+extra.concat(ch).map(function(c,j){return '<button class="chip" data-v="'+esc(c)+'">'+esc(k==='topic'?c:s[2]+' '+lc(c))+'</button>'}).join('')+
   '</div><div class="row"><input id="own" placeholder="'+(k==='topic'?'This story is about\u2026':'or write your own\u2026')+'" autocorrect="on"><button class="say" id="mic2">🎤</button><button class="big" id="add">Add</button></div><div id="fb"></div></div>'}
  else html+='<div class="frame wait"><div class="lab">'+s[1]+'</div>'+esc(s[2])+' \u2026</div>'});
 if(S.slot>=SLOTS.length){var p=SLOTS.map(function(s){return S.para[s[0]]}).join(' ');S.paragraph=p;
  html='<div class="top"><button class="ghost" id="home">⬅ Missions</button><div class="steps"><span>1 Idea</span><span>2 Sentence</span><span class="on">3 Paragraph</span></div></div><h2>🎉 You wrote a whole paragraph!</h2><div class="para">'+esc(p)+'</div><div class="praise">Topic sentence ✔ &nbsp; Two details (First, Next) ✔ &nbsp; Ending ✔ &nbsp; Capitals and stop signs ✔<br>'+praise()+' You earned a LEGO brick! <span class="brick" style="background:#e3000b"></span></div><p class="sol">For grown-ups \u2013 VA English SOL Gr 3: paragraph frame 3.W.2.A (i, iii, iv, v); story in order 3.W.1.B; sentences 3.LU.1.A, 3.LU.1.B; capitals &amp; end marks 3.W.3.B, names 3.LU.2.C; word-bank spelling 3.LU.2.D.</p><div class="row"><button class="big" id="rd3">🔊 Read my paragraph</button><button class="ghost" id="again">Write another</button></div>'}
 app.innerHTML=html;bindHome();
 if(S.slot>=SLOTS.length){document.getElementById('rd3').onclick=function(){speak(S.paragraph)};document.getElementById('again').onclick=menu;finish();return}
 [].forEach.call(app.querySelectorAll('.chip'),function(b){b.onclick=function(){add(b.dataset.v,true)}});
 document.getElementById('add').onclick=function(){add(document.getElementById('own').value,false)};
 document.getElementById('mic2').onclick=function(){var R=window.SpeechRecognition||window.webkitSpeechRecognition,o=document.getElementById('own');if(!R){o.focus();document.getElementById('fb').innerHTML='<div class="hint">🎙 Tap the box, then the microphone on the iPad keyboard.</div>';return}try{var r=new R();r.lang='en-US';r.onresult=function(e){o.value=e.results[0][0].transcript};r.onerror=function(){o.focus()};r.start()}catch(e){o.focus()}}}
function add(v,chip){var k=SLOTS[S.slot][0],fb=document.getElementById('fb');S.checks++;
 if(!v||!v.trim()){fb.innerHTML='<div class="hint">💡 Tap an idea chip, or write your own \u2013 both are great!</div>';return}
  var s=full(k,v),o=check(s);
 if(o.length&&!chip){S.hints++;S.lastHint=1;fb.innerHTML='<div class="hint">💡 '+o[0].msg+'</div><div class="row">'+(o[0].fix?'<button class="ghost" id="fix">✨ Fix it for me</button>':'')+'<button class="ghost" id="keep">Keep it</button></div>';
  var fx=document.getElementById('fix');if(fx)fx.onclick=function(){var nv=o[0].fix(document.getElementById('own').value);document.getElementById('own').value=nv;add(nv,false)};
  document.getElementById('keep').onclick=function(){commit(k,o.reduce(function(x,c){return c.fix?c.fix(x):x},s))};return}
 if(!S.lastHint)S.pf++;commit(k,o.reduce(function(x,c){return c.fix?c.fix(x):x},s))}
function commit(k,s){S.para[k]=s;S.lastHint=0;S.slot++;drawC()}
function finish(){markDone(S.m.id);var min=(Date.now()-start)/60000;
 try{if(window.HMA&&HMA.progress){
  HMA.progress.log({kid:'Samuel',mode:'writing',skill:'w-sentence',sol:'3.LU.1.A; 3.LU.1.B; 3.W.3.B; 3.LU.2.C; 3.LU.2.D',questions:1,firstTry:S.first>0?1:0,hints:S.sh||0,minutes:min,venom:S.m.id});
  HMA.progress.log({kid:'Samuel',mode:'writing',skill:'w-paragraph',sol:'3.W.2.A (i, iii, iv, v); 3.W.1.B',questions:4,firstTry:S.pf,hints:S.hints-(S.sh||0),minutes:0,venom:S.m.id});}}catch(e){}}
window.StoryLab={missions:M,menu:menu,open:open};menu()})();
