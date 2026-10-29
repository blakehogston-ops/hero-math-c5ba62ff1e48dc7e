/* Spider-Man Story Lab – ELA writing mode (PREVIEW). VA 2024 English SOL Gr 3 writing:
   complete sentences; paragraph w/ topic sentence + supporting details; capitals + end punctuation.
   Anxiety-safe: no timers, no score to lose, effort praise, every check is a friendly hint with a "fix it for me". */
(function(){'use strict';
var M=[
 {id:'bridge',em:'🕷️🌉🚌',title:'Bridge Rescue',cap:'A school bus is stuck on the bridge!',ideas:[
  {em:'🕸️',t:'Spidey webs the bus',s:'Spider-Man webbed the bus to the bridge.'},
  {em:'🧒',t:'Kids wave for help',s:'The kids waved and shouted for help.'},
  {em:'🚒',t:'A fire truck races in',s:'A red fire truck raced to the bridge.'}],
  bank:['bridge','bus','webs','rescue','strong','safe'],
  frame:{topic:['Spider-Man had a scary day.','This story is about a bus on a bridge.','This story is about a big rescue.','This story is about a brave hero.'],
   first:['the bus started to slip.','Spider-Man swung to the bridge.','the kids felt scared.'],
   next:['he shot webs to hold the bus.','the fire truck came to help.','the kids climbed out safely.'],
   end:['everyone was safe and happy.','the city cheered for Spider-Man.','the kids said thank you.']}},
 {id:'lego',em:'🧱🏙️✨',title:'LEGO City Build',cap:'You get a giant box of LEGO bricks!',ideas:[
  {em:'🏢',t:'Build a tall tower',s:'I built a tall tower for Spider-Man.'},
  {em:'🚁',t:'Build a hero jet',s:'I built a fast jet with red bricks.'},
  {em:'🏠',t:'Build Aunt May\u2019s house',s:'I built a cozy house for Aunt May.'}],
  bank:['bricks','build','tower','tall','colors','pieces'],
  frame:{topic:['I had the best idea ever!','This story is about my best LEGO build.','This story is about a giant LEGO city.','This story is about building with bricks.'],
   first:['I sorted all the bricks by color.','I read the steps in the book.','I built a strong base.'],
   next:['I stacked the walls up high.','I added windows and a door.','I put the minifigures inside.'],
   end:['my build was finished and I was proud.','I showed my dad my build.','I put it on my shelf.']}},
 {id:'suit',em:'🦸‍♂️🔴🔵',title:'New Suit Day',cap:'Peter tries on a brand new suit.',ideas:[
  {em:'🔴',t:'The suit is shiny red',s:'The new suit was shiny and red.'},
  {em:'👀',t:'The eyes can zoom',s:'The mask eyes could zoom far away.'},
  {em:'🕸️',t:'It shoots new webs',s:'The suit shot super sticky webs.'}],
  bank:['suit','mask','shiny','webs','zoom','gadget'],
  frame:{topic:['Peter could not believe his eyes!','This story is about a new hero suit.','This story is about Peter\u2019s cool suit.','This story is about suit gadgets.'],
   first:['Peter opened a big box.','he put on the mask.','he tested the web shooters.'],
   next:['the eyes zoomed across the city.','he swung between two buildings.','he showed the suit to Ned.'],
   end:['Peter loved his new suit.','he was ready to help the city.','he hung the suit up carefully.']}},
 {id:'museum',em:'🏛️🦖🌙',title:'Night at the Museum',cap:'A dinosaur bone goes missing!',ideas:[
  {em:'🔦',t:'Look for clues',s:'Spider-Man looked for clues with a flashlight.'},
  {em:'🐾',t:'Find big footprints',s:'He found big footprints on the floor.'},
  {em:'🦴',t:'The bone is found',s:'The guard found the bone behind a door.'}],
  bank:['museum','clues','dinosaur','bone','quiet','dark'],
  frame:{topic:['Something strange happened at the museum.','This story is about a museum mystery.','This story is about a missing bone.','This story is about solving a case.'],
   first:['the museum was dark and quiet.','Spider-Man found a clue.','he heard a strange noise.'],
   next:['he followed the footprints.','he used his spider-sense.','he looked behind a big door.'],
   end:['the bone was back where it belonged.','the mystery was solved.','the guard said thank you.']}},
 {id:'toys',em:'🧸📦⭐',title:'Collector Shelf',cap:'A new hero figure comes in the mail.',ideas:[
  {em:'📦',t:'Open the box slowly',s:'I opened the box very slowly.'},
  {em:'🦸',t:'Pose the figure',s:'I posed the figure on my shelf.'},
  {em:'📸',t:'Take a photo',s:'I took a photo of my new figure.'}],
  bank:['figure','shelf','careful','pose','details','collect'],
  frame:{topic:['The best box ever came in the mail!','This story is about my new hero figure.','This story is about my collection.','This story is about a special package.'],
   first:['the mail came to my house.','I opened the box carefully.','I looked at all the tiny details.'],
   next:['I gave him a cool hero pose.','I found the best spot on my shelf.','I took a picture to show my family.'],
   end:['it is my favorite figure now.','my shelf looks awesome.','I can\u2019t wait to get the next one.']}},
 {id:'school',em:'🏫🧪🎒',title:'Science Fair',cap:'Peter and Ned build a robot for the fair.',ideas:[
  {em:'🤖',t:'Build a robot',s:'Peter and Ned built a small robot.'},
  {em:'💡',t:'The robot lights up',s:'The robot lit up and beeped.'},
  {em:'🏆',t:'Show the class',s:'They showed the robot to the class.'}],
  bank:['robot','science','build','beeps','class','friends'],
  frame:{topic:['Peter and Ned had a big surprise.','This story is about a science fair robot.','This story is about two smart friends.','This story is about a cool invention.'],
   first:['Peter drew a plan for the robot.','Ned found wires and wheels.','they worked after school.'],
   next:['they tested the robot in the lab.','the robot rolled across the table.','they fixed a loose wire.'],
   end:['the class clapped for the robot.','Peter and Ned felt proud.','they want to build another one.']}}];
var ST_T=[['topic','Topic sentence','This story is about'],['first','Detail 1','Then,'],['next','Detail 2','After that,'],['end','Ending','Finally,']],
 ST_H=[['topic','Topic sentence','Here is how to'],['first','Step 1','First,'],['next','Step 2','Then,'],['end','Last step','Finally,']],
 ST_O=[['topic','My opinion','I think'],['first','Reason 1','One reason is that'],['next','Reason 2','Another reason is that'],['end','Conclusion','That is why']];
M.push(
 {id:'shooter',b2:1,kind:'howto',slots:ST_H,sol:'3.W.1.C',em:'',title:'Build a Web-Shooter',cap:'Build a LEGO web-shooter for your wrist!',ideas:[
  {t:'Pick red bricks',s:'Pick red and gray bricks.'},
  {t:'Make a wrist band',s:'Make a band to fit your wrist.'},
  {t:'Add a launcher',s:'Add a launcher on top.'}],
  bank:['bricks','wrist','launcher','snap','click','strong'],
  frame:{topic:['You can build your own web-shooter!','Here is how to build a LEGO web-shooter.'],
   first:['find a flat red brick for the base.','snap two gray bricks on each side.'],
   next:['add a round piece for the launcher.','fit the band around your wrist.'],
   end:['test it with a paper web.','show it to a friend.']}},
 {id:'snack',b2:1,kind:'howto',slots:ST_H,sol:'3.W.1.C',em:'',title:'Hero Fruit Snack',cap:'Make a red and blue fruit snack for the team.',ideas:[
  {t:'Wash the fruit',s:'Wash the berries in cold water.'},
  {t:'Make a pattern',s:'Make a red and blue pattern.'},
  {t:'Share with friends',s:'Share your snack with your friends.'}],
  bank:['berries','wash','pattern','plate','share','yummy'],
  frame:{topic:['You can make a snack fit for a hero!','Here is how to make a hero fruit snack.'],
   first:['wash the strawberries and blueberries.','ask a grown-up to help you.'],
   next:['put the fruit on a stick in a pattern.','line the sticks up on a plate.'],
   end:['share the snack with your friends.','enjoy every yummy bite.']}},
 {id:'best',b2:1,kind:'opinion',slots:ST_O,sol:'3.W.1.D',em:'',title:'The Best Hero Power',cap:'Web-swinging, wall-climbing, or spider-sense? Which power is best?',ideas:[
  {t:'Web-swinging',s:'I think web-swinging is the best power.'},
  {t:'Wall-climbing',s:'I think wall-climbing is the best power.'},
  {t:'Spider-sense',s:'I think spider-sense is the best power.'}],
  bank:['best','power','because','fast','safe','reason'],
  frame:{topic:[],first:[],next:[],end:[]},
  fr:[{topic:['I think web-swinging is the best power of all.'],first:['it is super fast.', 'he can get across the city in seconds.'],next:['he can catch people who fall.', 'it keeps Spider-Man high above danger.'],end:['web-swinging is the best power.','web-swinging is my pick for the best power.']},{topic:['I think wall-climbing is the best power of all.'],first:['he can climb any building.', 'he can hide on the ceiling.'],next:['he can sneak up on bad guys.', 'he can reach people stuck up high.'],end:['wall-climbing is the best power.','wall-climbing is my pick for the best power.']},{topic:['I think spider-sense is the best power of all.'],first:['it warns Spider-Man before danger comes.', 'he can dodge things without looking.'],next:['it keeps Spider-Man\u2019s friends safe too.', 'it helps Spider-Man in the dark.'],end:['spider-sense is the best power.','spider-sense is my pick for the best power.']}]},
 {id:'kitten',b2:1,kind:'story',slots:ST_T,sol:'3.W.1.B',em:'',title:'Rooftop Kitten',cap:'A kitten is stuck on a high fire escape!',ideas:[
  {t:'Spidey climbs up',s:'Spider-Man climbed up the brick wall.'},
  {t:'The kitten meows',s:'The little kitten meowed for help.'},
  {t:'A girl points up',s:'A girl pointed up at the kitten.'}],
  bank:['kitten','climb','high','gently','rescue','meow'],
  frame:{topic:['A tiny voice called for help.','This story is about a kitten rescue.'],
   first:['Spider-Man climbed the wall.','he heard a little meow.'],
   next:['he picked up the kitten gently.','he swung down to the street.'],
   end:['the kitten was safe with the girl.','the girl hugged her kitten.']}},
 {id:'park',b2:1,kind:'story',sol:'3.W.1.B',em:'',title:'Lost Puppy',cap:'A puppy runs away in the park!',ideas:[
  {t:'Spidey looks around',s:'Spider-Man looked all around the park.'},
  {t:'The puppy hides',s:'The puppy hid under a bench.'},
  {t:'A boy calls his dog',s:'A boy called for his lost dog.'}],
  bank:['puppy','park','search','bench','leash','happy'],
  frame:{topic:['Someone was missing at the park.','This story is about a lost puppy.'],
   first:['a boy lost his puppy.','Spider-Man looked in the trees.'],
   next:['he found the puppy under a bench.','he gave the puppy back to the boy.'],
   end:['the puppy licked the boy\u2019s face.','everyone at the park smiled.']}},
 {id:'pizza',b2:1,kind:'story',slots:ST_T,sol:'3.W.1.B',em:'',title:'Pizza Swing',cap:'Peter has to bring a pizza to Aunt May\u2019s party!',ideas:[
  {t:'Swing with the pizza',s:'Peter swung across town with the pizza.'},
  {t:'Rain starts to fall',s:'The rain started to fall on the city.'},
  {t:'Ring the doorbell',s:'Peter rang the doorbell just in time.'}],
  bank:['pizza','swing','party','hot','door','late'],
  frame:{topic:['Peter was almost late!','This story is about a pizza delivery.'],
   first:['Peter grabbed the hot pizza box.','he swung over the busy streets.'],
   next:['he kept the pizza flat and safe.','he landed on Aunt May\u2019s roof.'],
   end:['everyone cheered for the pizza.','Aunt May gave Peter a big hug.']}});

var PICS={"best_e1":[56,25,0],"best_e2":[63,30,0],"best_f1":[38,18,1],"best_f2":[49,15,1],"best_i1":[55,25,1],"best_i2":[48,15,1],"best_i3":[48,15,1],"best_n1":[45,52,1],"best_n2":[31,46,1],"best_t0":[55,30,0],"best_t1":[50,15,1],"bridge_e1":[55,60,1],"bridge_e2":[54,10,1],"bridge_e3":[31,28,1],"bridge_f1":[47,52,0],"bridge_f2":[48,18,1],"bridge_f3":[60,45,0],"bridge_i1":[29,14,1],"bridge_i2":[20,35,0],"bridge_i3":[57,52,0],"bridge_n1":[29,25,1],"bridge_n2":[62,40,0],"bridge_n3":[60,45,0],"bridge_t0":[37,15,1],"bridge_t1":[48,52,0],"bridge_t2":[12,70,0],"bridge_t3":[49,10,1],"kitten_e1":[35,30,1],"kitten_e2":[45,30,0],"kitten_f1":[50,25,1],"kitten_f2":[46,35,1],"kitten_i1":[49,30,1],"kitten_i2":[45,45,0],"kitten_i3":[44,35,0],"kitten_n1":[47,25,1],"kitten_n2":[58,18,1],"kitten_t0":[63,30,0],"kitten_t1":[54,15,1],"lego_e1":[40,35,0],"lego_e2":[45,30,0],"lego_e3":[50,30,0],"lego_f1":[62,25,0],"lego_f2":[45,25,0],"lego_f3":[60,30,0],"lego_i1":[50,20,0],"lego_i2":[35,45,0],"lego_i3":[46,60,0],"lego_n1":[85,25,0],"lego_n2":[50,40,0],"lego_n3":[50,30,0],"lego_t0":[40,25,0],"lego_t1":[52,22,0],"lego_t2":[57,22,0],"lego_t3":[50,20,0],"museum_e1":[50,40,0],"museum_e2":[40,30,1],"museum_e3":[42,30,1],"museum_f1":[50,40,0],"museum_f2":[55,20,1],"museum_f3":[38,18,1],"museum_i1":[42,20,1],"museum_i2":[50,50,0],"museum_i3":[45,15,0],"museum_n1":[41,13,1],"museum_n2":[59,28,1],"museum_n3":[55,25,1],"museum_t0":[50,40,0],"museum_t1":[33,30,1],"museum_t2":[79,25,1],"museum_t3":[46,22,1],"park_e1":[42,30,0],"park_e2":[42,30,0],"park_f1":[44,30,0],"park_f2":[56,18,1],"park_i1":[51,12,1],"park_i2":[48,45,0],"park_i3":[43,30,0],"park_n1":[57,25,1],"park_n2":[30,30,1],"park_t0":[50,30,0],"park_t1":[43,45,0],"pizza_e1":[41,30,0],"pizza_e2":[40,20,0],"pizza_f1":[33,30,0],"pizza_f2":[46,25,1],"pizza_i1":[47,25,1],"pizza_i2":[42,30,0],"pizza_i3":[40,25,0],"pizza_n1":[56,20,1],"pizza_n2":[57,15,1],"pizza_t0":[43,25,0],"pizza_t1":[50,30,0],"school_e1":[40,20,0],"school_e2":[40,20,0],"school_e3":[36,25,0],"school_f1":[50,15,0],"school_f2":[60,20,0],"school_f3":[48,38,0],"school_i1":[42,22,0],"school_i2":[50,40,0],"school_i3":[35,20,0],"school_n1":[40,20,0],"school_n2":[47,10,0],"school_n3":[30,30,0],"school_t0":[66,22,0],"school_t1":[50,40,0],"school_t2":[33,22,0],"school_t3":[50,40,0],"shooter_e1":[27,30,0],"shooter_e2":[45,35,0],"shooter_f1":[40,40,0],"shooter_f2":[45,25,0],"shooter_i1":[40,30,0],"shooter_i2":[60,25,0],"shooter_i3":[50,30,0],"shooter_n1":[50,25,0],"shooter_n2":[50,30,0],"shooter_t0":[55,30,0],"shooter_t1":[50,50,0],"snack_e1":[63,30,0],"snack_e2":[60,30,0],"snack_f1":[50,30,0],"snack_f2":[38,25,0],"snack_i1":[50,20,0],"snack_i2":[70,20,0],"snack_i3":[33,35,0],"snack_n1":[70,20,0],"snack_n2":[30,20,0],"snack_t0":[63,35,0],"snack_t1":[50,30,0],"suit_e1":[66,22,0],"suit_e2":[57,12,1],"suit_e3":[30,25,0],"suit_f1":[40,25,0],"suit_f2":[40,25,1],"suit_f3":[45,25,1],"suit_i1":[40,30,1],"suit_i2":[55,50,0],"suit_i3":[60,40,0],"suit_n1":[45,30,1],"suit_n2":[57,25,1],"suit_n3":[35,20,0],"suit_t0":[37,35,0],"suit_t1":[55,55,0],"suit_t2":[25,30,1],"suit_t3":[50,30,0],"toys_e1":[55,30,0],"toys_e2":[50,30,0],"toys_e3":[47,30,0],"toys_f1":[67,38,0],"toys_f2":[50,40,0],"toys_f3":[58,30,0],"toys_i1":[63,28,0],"toys_i2":[76,30,0],"toys_i3":[25,30,0],"toys_n1":[66,30,0],"toys_n2":[76,35,0],"toys_n3":[39,40,0],"toys_t0":[56,25,0],"toys_t1":[62,35,0],"toys_t2":[30,33,0],"toys_t3":[50,40,0]};window.SL_PICS=PICS;
var BASE=[['topic','Topic sentence','This story is about'],['first','Detail 1','First,'],['next','Detail 2','Next,'],['end','Ending','In the end,']],SLOTS=BASE;
var PRAISE=['You kept trying \u2013 that\u2019s what heroes do!','Great thinking!','Nice work sticking with it!','You chose that all by yourself!','Strong writing muscles!'];
var app=document.getElementById('app'),S={},start=0;
function done(){try{return JSON.parse(localStorage.getItem('hma_storylab_done')||'{}')}catch(e){return{}}}
function thumb(m){return m.b2?'assets/story/c_'+m.id+'_t1.jpg':'assets/story/'+m.id+'.jpg'}
function markDone(id){var d=done();d[id]=(d[id]||0)+1;try{localStorage.setItem('hma_storylab_done',JSON.stringify(d))}catch(e){}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function praise(){return PRAISE[Math.floor(Math.random()*PRAISE.length)]}
function speak(t){try{if(!window.speechSynthesis)return;speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.rate=.9;speechSynthesis.speak(u)}catch(e){}}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}

var COMMON='a about after again all also am an and any are as ask at away back bad be because bed been before best big bike bird blue book box boy brave bright brother bug but by call came can car cat city climb cold come cool could cry cut dad day did do does dog door down draw each eat end even ever every eyes fall far fast feel fell find fire first fix fly for found friend friends from fun funny game gave get girl give go goes going good got great green had happy has hat have he help her here hero hi high him his hold home hop hot house how hug i if in into is it its jump just keep kid kids kind know last let like little live look lost lot love made make man many may me mom more most my name need new next nice night no not now of off oh ok old on one only open or our out over park pet pick play please pull push put ran read red ride right room run sad said saw say school see she shot should show sky sleep slow small so some soon spider stop story street sun super sure swing swung take talk tell than thank that the their them then there they thing think this time to today too top toy tree try two under up us very wall want was water way we web webs well went were wet what when where who why will win with wow yay yes you your'.split(' ');
var DICT={};COMMON.forEach(function(w){DICT[w]=1});
function addDict(t){(t||'').toLowerCase().replace(/[\u2019']/g,"'").split(/[^a-z']+/).forEach(function(w){if(w)DICT[w.replace(/'s$/,'')]=1})}
M.forEach(function(m){addDict(m.title+' '+m.cap+' '+m.bank.join(' '));m.ideas.forEach(function(x){addDict(x.t+' '+x.s)});Object.keys(m.frame).forEach(function(k){m.frame[k].forEach(addDict)})});
function realWord(w){w=w.toLowerCase().replace(/[\u2019]/g,"'").replace(/[^a-z'-]/g,'');if(!w)return false;if(DICT[w])return true;
 var b=w.replace(/'(s|t|m|ll|re|ve|d)$/,'');if(DICT[b])return true;var sx=['s','es','ed','d','ing','er','ly','y','ies'];for(var i=0;i<sx.length;i++){var x=sx[i];if(w.length>x.length+1&&w.slice(-x.length)===x){var r=w.slice(0,-x.length);if(DICT[r]||DICT[r+'e']||DICT[r.replace(/(.)\1$/,'$1')])return true}}
 return w.split('-').length>1&&w.split('-').every(function(p){return DICT[p]})}
function realWords(t){return t.split(/\s+/).some(realWord)}
var JUNK='Hmm, I can\u2019t find a real word in there yet. Try writing real words \u2013 the word bank or the chips can help. You\u2019ve got this!';
function capOf(m,name){var x=name.slice(m.id.length+1),k=x.charAt(0),n=+x.slice(1);if(k==='t')return m.frame.topic[n];if(k==='i')return m.ideas[n-1]&&m.ideas[n-1].s;var key={f:'first',n:'next',e:'end'}[k];return m.frame[key]&&m.frame[key][n-1]}
var STOP={the:1,a:1,an:1,and:1,to:1,of:1,was:1,is:1,in:1,on:1,it:1,this:1,that:1,story:1,about:1,with:1,for:1,my:1,his:1,her:1,at:1,first:1,next:1,then:1,end:1,finally:1};
function stem(w){return w.toLowerCase().replace(/[^a-z]/g,'').replace(/(ing|ed|es|s)$/,'')}
var HEROW=/\b(spider-man|spidey|hero|he|him|his|webs?|webbed|swung|swing|swings|mask|suit)\b/i;
function bestPic(k,text){var m=S.m,pk=k==='topic'?'t':k.charAt(0),names=Object.keys(PICS).filter(function(n){return n.indexOf(m.id+'_')===0}),words={};
 text.split(/\s+/).forEach(function(w){w=stem(w);if(w.length>2&&!STOP[w])words[w]=1});
 var heroOnly=/\b(spider-man|spidey|hero)\b/i.test(text)||(HEROW.test(text)&&/\b(webs?|webbed|swung|swing|mask|suit)\b/i.test(text));
 var pool=heroOnly?names.filter(function(n){return PICS[n][2]}):names;if(!pool.length)pool=names;
 var best=null,bs=-1;pool.forEach(function(n){var c=capOf(m,n)||'',sc=0;c.split(/\s+/).forEach(function(w){if(words[stem(w)])sc+=2});if(n.split('_')[1].charAt(0)===pk)sc+=0.5;if(sc>bs){bs=sc;best=n}});
 return best}
function head(step){return '<div class="top"><button class="ghost" id="home">⬅ Missions</button><div class="steps">'+['1 Idea','2 Sentence','3 Paragraph'].map(function(s,i){return '<span class="'+(i+1===step?'on':'')+'">'+s+'</span>'}).join('')+'</div></div><h2>'+esc(S.m.title)+'</h2>'}
function bindHome(){var h=document.getElementById('home');if(h)h.onclick=menu}
// gentle mechanics check -> list of {msg,fix}
function check(t){var o=[],w=t.trim().split(/\s+/).filter(Boolean);
 if(w.length&&/^[a-z]/.test(t.trim()))o.push({msg:'Sentences start with a capital letter. Want me to make the first letter big?',fix:function(x){x=x.trim();return x.charAt(0).toUpperCase()+x.slice(1)}});
 if(w.length&&!/[.!?]["\u201d]?$/.test(t.trim()))o.push({msg:'Every sentence needs a stop sign at the end: . or ! or ?',fix:function(x){return x.trim()+'.'}});
 if(w.length&&w.length<3)o.push({msg:'Can you tell a little more? Who is doing what? (It\u2019s OK to keep it, too.)',fix:null});
 return o}
var POWERS=[['web-swinging',/\bweb[- ]?(swing|swinging|slinging|shoot|shooting|shooters?)\b|\bswing(ing)?\b|\bwebs?\b/i],['wall-climbing',/\b(wall[- ]?)?climb(ing|s)?\b|\bwall[- ]?crawl(ing)?\b|\bstick(s|ing)? to walls?\b/i],['spider-sense',/\bspider[- ]?sense\b|\bsense\b|\btingl/i],['super strength',/\bstrength\b|\bstrong(est)?\b/i],['speed',/\bspeed\b|\bfast(est)?\b/i],['flying',/\bfly(ing)?\b/i],['being invisible',/\binvisib/i]];
function powerOf(t){t=String(t||'');for(var i=0;i<POWERS.length;i++)if(POWERS[i][1].test(t))return i;return -1}
function powersIn(t){t=String(t||'');var f=[];for(var i=0;i<POWERS.length;i++){var r=new RegExp(POWERS[i][1].source,'gi'),x;while((x=r.exec(t))){f.push({i:i,at:x.index});if(!x[0])r.lastIndex++}}var seen={};return f.sort(function(a,b){return a.at-b.at}).filter(function(o){if(seen[o.i])return false;seen[o.i]=1;return true}).map(function(o){return o.i})}
// b4: the pick is read ONLY from the "I think ___" part. -1 = no power named anywhere (hint); -2 = unclear (accept, no hint)
function topicPower(t){t=String(t||'');var m=t.match(/\bI\s+(?:think|believe|say|pick|choose)\s+(?:that\s+)?(.*?)(?=\s+(?:is|are|was|would|will|has|because|since)\b|[.,!?;]|$)/i);
 if(m){var ps=powersIn(m[1]);if(ps.length===1)return ps[0];if(ps.length>1)return -2;return powersIn(t).length?-2:-1}
 var all=powersIn(t);if(!all.length)return -1;return all.length===1?all[0]:-2}
function opinionPic(){var m=S.m,pi=S.tpow,i=pi>=0&&pi<3?pi:(S.idx||0);return m.id+'_i'+(i+1)}
var IRR={made:'make',built:'build',put:'put',took:'take',got:'get',cut:'cut',mixed:'mix',chose:'choose',found:'find',gave:'give',held:'hold',laid:'lay',spread:'spread',stuck:'stick',set:'set',ate:'eat',drew:'draw',wrote:'write',began:'begin',made_:''};
var HVERB='add attach bake build choose clip color cut draw eat find fold get give glue hold lay line make mix open paint pick place pour press push put rinse scoop set slice snap spread stack stick stir take tape turn use wash wrap'.split(' ');
function baseOf(v){var l=v.toLowerCase();if(IRR.hasOwnProperty(l)&&IRR[l])return IRR[l];if(HVERB.indexOf(l)>=0)return l;if(!/ed$/.test(l))return null;var c=[l.slice(0,-2),l.slice(0,-1),l.slice(0,-3),l.slice(0,-3)+'y'];if(/ied$/.test(l))c.unshift(l.slice(0,-3)+'y');for(var i=0;i<c.length;i++)if(HVERB.indexOf(c[i])>=0)return c[i];return null}
// b4: {bad:true, fixed:'...'|null}. Only flags "I/we/he/she/they + past verb" or "I/we + a known how-to verb"; prefers missing some over wrong flags.
function cmdInfo(t){var tr=t.match(/^((?:First|Then|Next|Finally|Last),?\s*)?(.*)$/i),pre=tr[1]||'',w=tr[2].trim(),m=w.match(/^(I|we|he|she|they|you)\s+([A-Za-z]+)\b(.*)$/i);if(!m)return {bad:false};
 var sub=m[1].toLowerCase(),v=m[2].toLowerCase(),past=/ed$/.test(v)&&v.length>3||IRR.hasOwnProperty(v)&&IRR[v]&&v!==IRR[v],pres=(sub==='i'||sub==='we')&&HVERB.indexOf(v)>=0;
 if(v==='put'||v==='cut'||v==='set'||v==='spread')past=sub!=='you';if(sub==='you'&&!past)return {bad:false};if(!past&&!pres)return {bad:false};
 var b=past?baseOf(v):v;return {bad:true,fixed:b?(pre||'')+b+m[3]:null}}
function cmdCheck(t){return cmdInfo(t).bad}
function oneLine(v){return String(v||'').replace(/\s*[\r\n]+\s*/g,' ')}
var UNLOCK=['kitten','park','pizza','shooter','snack','best'];
function unlocks(){var n=0;try{n=+localStorage.getItem('hma_storylab_unlocks')||0}catch(e){}return n}
function isOpen(m){if(!m.b2)return true;var d=done();if(d[m.id])return true;var i=UNLOCK.indexOf(m.id);return i<0||i<unlocks()}
function unlockNext(){var nx=M.filter(function(m){return !isOpen(m)}).sort(function(a,b){return UNLOCK.indexOf(a.id)-UNLOCK.indexOf(b.id)})[0];if(!nx)return null;try{localStorage.setItem('hma_storylab_unlocks',String(UNLOCK.indexOf(nx.id)+1))}catch(e){}return nx}
function menu(){S={};var d=done();
 app.innerHTML='<div class="top"><button class="ghost" id="toHMA">⬅ Hero Math</button><button class="big" id="myComics">📚 My Comics'+(window.StoryComic?' ('+StoryComic.count()+')':'')+'</button></div><h1>🕷️ Spider-Man Story Lab</h1><p class="sub">Pick a mission. No timer, no rush \u2013 every story you write earns a LEGO brick for your wall.</p><div class="grid">'+M.map(function(m){var n=d[m.id]||0;if(!isOpen(m))return '<button class="mission locked" data-id="'+m.id+'" disabled aria-disabled="true"><img class="thumb" src="'+thumb(m)+'" alt=""><b>🔒 '+esc(m.title)+'</b><small>Make a comic to open this mission!</small><span>Coming soon</span></button>';return '<button class="mission" data-id="'+m.id+'"><img class="thumb" src="'+thumb(m)+'" alt=""><b>'+esc(m.title)+'</b><small>'+esc(m.cap)+'</small><span>'+(n?'<span class="brick" style="background:#e3000b"></span>Built '+n+'\u00d7':'New!')+'</span></button>'}).join('')+'</div>'+
 '<p class="sub" style="margin-top:22px">Brick wall: '+(Object.keys(d).reduce(function(a,k){return a+d[k]},0)?Object.keys(d).map(function(k){return new Array(d[k]+1).join('<span class="brick" style="background:#'+['e3000b','0055bf','f2cd37','237841'][k.length%4]+'"></span>')}).join(''):'(your first brick is one story away!)')+'</p>';
 document.getElementById('myComics').onclick=function(){window.StoryComic&&StoryComic.shelf()};
 document.getElementById('toHMA').onclick=function(){try{if(window.parent!==window&&parent.__closeStoryLab)return parent.__closeStoryLab()}catch(e){}location.href='index.html'};
 [].forEach.call(app.querySelectorAll('.mission:not(.locked)'),function(b){b.onclick=function(){open(b.dataset.id)}})}
function open(id){S={plays:done()[id]||0,m:M.filter(function(m){return m.id===id})[0],hints:0,first:0,checks:0,para:{}};start=Date.now();stepA()}
function stepA(){var m=S.m;
 app.innerHTML=head(1)+'<div class="scene"><img src="'+thumb(m)+'" alt="'+esc(m.cap)+'"><p>'+esc(m.cap)+'</p></div><p class="sub" style="margin-top:14px">What could happen next? Tap an idea \u2013 any one is a great choice. <button class="ghost" id="rd">🔊</button></p><div class="cards">'+m.ideas.map(function(x,i){return '<button class="card" data-i="'+i+'">'+(PICS[m.id+'_i'+(i+1)]?'<img class="cimg" src="assets/story/c_'+m.id+'_i'+(i+1)+'.jpg" alt="">':'<span class="em">'+x.em+'</span>')+esc(x.t)+'</button>'}).join('')+'</div><div id="fb"></div>';
 bindHome();document.getElementById('rd').onclick=function(){speak(m.cap+' What could happen next? '+m.ideas.map(function(x){return x.t}).join('. '))};
 [].forEach.call(app.querySelectorAll('.card'),function(b){b.onclick=function(){S.idx=+b.dataset.i;S.idea=m.ideas[S.idx];var ip=PICS[m.id+'_i'+(S.idx+1)],sc=app.querySelector('.scene img');if(ip&&sc)sc.src='assets/story/c_'+m.id+'_i'+(S.idx+1)+'.jpg';[].forEach.call(app.querySelectorAll('.card'),function(c){c.classList.remove('pick')});b.classList.add('pick');
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
function showTyped(v){document.getElementById('typed').innerHTML='<p class="sub" style="margin:12px 0 4px">Type here, or tap 🎙 on the iPad keyboard to talk. Spelling help is in the word bank.</p><textarea id="free" rows="2" enterkeyhint="done" autocapitalize="off" autocorrect="on" spellcheck="true"></textarea>';var f=document.getElementById('free');f.value=v;f.focus()}
function dictate(){var R=window.SpeechRecognition||window.webkitSpeechRecognition,fb=document.getElementById('fb');
 if(!R){showTyped('');fb.innerHTML='<div class="hint">🎙 Talking mode isn\u2019t on in this browser. Tap the box, then tap the <b>microphone on the iPad keyboard</b> and say your sentence.</div>';return}
 try{var r=new R();r.lang='en-US';r.interimResults=false;r.maxAlternatives=1;
  fb.innerHTML='<div class="praise">🎤 I\u2019m listening\u2026 say your sentence!</div>';
  r.onresult=function(e){var t=e.results[0][0].transcript;showTyped(t);fb.innerHTML='<div class="praise">I heard you! Check the words, then tap ✔.</div>'};
  r.onerror=function(){showTyped('');fb.innerHTML='<div class="hint">🎙 I couldn\u2019t hear that one. No problem \u2013 tap the box and use the keyboard microphone, or try 🎤 again.</div>'};
  r.start()}catch(e){showTyped('')}}
function checkFree(){var f=document.getElementById('free');f.value=oneLine(f.value);var t=f.value,fb=document.getElementById('fb');S.checks++;
 if(!t.trim()){fb.innerHTML='<div class="hint">💡 Your sentence box is empty. Try 🎤, or tap tiles instead!</div>';return}
 if(!realWords(t)){S.tries++;S.hints++;fb.innerHTML='<div class="hint">💡 '+JUNK+'</div>';return}
 var o=check(t);if(!o.length){if(!S.tries)S.first++;return good(t)}
 S.tries++;S.hints++;
 fb.innerHTML='<div class="hint">💡 '+o[0].msg+'</div><div class="row">'+(o[0].fix?'<button class="ghost" id="fix">✨ Fix it for me</button>':'')+'<button class="ghost" id="keep">Keep it like this</button></div>';
 var fx=document.getElementById('fix');if(fx)fx.onclick=function(){f.value=o[0].fix(f.value);checkFree()};
 document.getElementById('keep').onclick=function(){good(check(f.value).reduce(function(x,c){return c.fix?c.fix(x):x},f.value))}}
function good(t,lead){t=oneLine(t).trim();S.sentence=t;S.sh=S.hints;S.pf=0;document.getElementById('fb').innerHTML='<div class="praise">'+(lead||'⭐ '+praise())+' \u201c'+esc(t)+'\u201d is a complete sentence: capital letter at the start, stop sign at the end.</div><div class="row"><button class="ghost" id="rd2">🔊 Hear it</button><button class="big" id="go">Make it a paragraph ➜</button></div>';
 document.getElementById('rd2').onclick=function(){speak(t)};document.getElementById('go').onclick=stepC}
function stepC(){S.typedK={};S.tpow=undefined;if(S.m.fr)S.m.frame=S.m.fr[S.idx||0];SLOTS=S.m.slots||BASE;S.slot=0;S.para={};S.pics={};S.cred={};S.hist=[];S.fin=0;S.reveal={};drawC()}
function words(t){var o={};String(t).toLowerCase().replace(/[^a-z\s-]/g,'').split(/\s+/).forEach(function(w){w=w.replace(/(ed|ing|s)$/,'');if(w.length>2&&!/^(the|and|for|was|his|her|she|spider-man|spidey|then|first|after|that|finally)$/.test(w))o[w]=1});return o}
function similar(a,b){var x=words(a),y=words(b),k=Object.keys(x),i=k.filter(function(w){return y[w]}).length,u=k.length+Object.keys(y).length-i;return u&&i/u>=0.4}
var NAMES=/^(I|I'm|I\u2019m|I'll|Spider-Man|Spidey|Peter|Ned|Aunt|May|LEGO|MJ|Mr\.|Mrs\.)$/;
function lc(v){v=v.trim();var w=v.split(/\s+/)[0]||'';var core=w.replace(/[^A-Za-z.'\u2019-]/g,'');if(NAMES.test(core)||/[A-Z]/.test(core.slice(1)))return v;return v.charAt(0).toLowerCase()+v.slice(1)}
function full(k,v){var st=SLOTS.filter(function(s){return s[0]===k})[0][2];v=v.trim();if(k!=='topic'){var re=new RegExp('^'+st.replace(/,$/,'')+',?\\s*','i');v=v.replace(re,'')}
 if(k==='topic'){return v}// topic chips/typed are whole sentences
 return st+' '+lc(v)}
function drawC(){var m=S.m;
 var html=head(3)+'<p class="sub">Fill your paragraph one sentence at a time.@@CHIPTIP@@</p>';var tip=0;
 SLOTS.forEach(function(s,i){var k=s[0];
  if(S.para[k])html+='<div class="frame done"><div class="lab">'+s[1]+' ✔</div>'+esc(S.para[k])+(i===S.slot-1&&!S.fin?' <button class="ghost undo" id="undo">↩ Undo</button>':'')+'</div>';
  else if(i===S.slot){var all=m.frame[k],ch=[],js=[];var ex=(S.sentence&&k===(m.kind==='opinion'?'topic':'first'))?[S.sentence]:[];var fade=m.b2&&(S.plays||0)>=2&&!S.remix&&!ex.length&&!S.reveal[k];var n=fade?0:m.b2?Math.max(1,2-(S.plays||0)):all.length,r=(S.plays||0)+(S.remix||0)+(S.reveal[k]||0);
   var cand=[];for(var q=0;q<all.length;q++){var jj=(q+r)%all.length;if(ex.length&&similar(all[jj],ex[0]))continue;cand.push(jj)}cand.slice(0,Math.min(n,cand.length)).forEach(function(jj){ch.push(all[jj]);js.push(jj)});var pk=k==='topic'?'t':k.charAt(0),ix=S.idx||0;
   if(ex.length)tip=1;var pl=ex.map(function(){return m.id+'_i'+(ix+1)}).concat(js.map(function(j){return m.id+'_'+pk+(k==='topic'?j:j+1)}));
   html+='<div class="frame"><div class="lab">'+s[1]+'</div><b>'+(k==='topic'?(m.kind==='opinion'?'Pick or write your opinion:':'Pick or write your topic sentence:'):esc(s[2])+' \u2026')+'</b><div class="chips">'+ex.concat(ch).map(function(c,j){return '<button class="chip" data-p="'+pl[j]+'" data-v="'+esc(c)+'">'+esc(k==='topic'||(ex.length&&j===0&&k==='topic')?c:s[2]+' '+lc(c))+'</button>'}).join('')+
   '</div>'+(fade?'<p class="sub" style="margin:6px 0">Your turn to write this one! Start with <b>'+esc(s[2])+'</b> and use the word bank. <button class="ghost" id="reveal">💡 Show me an idea</button></p><div class="bank sbank"><b>Word bank:</b>'+m.bank.map(function(w){return '<button class="bw2">'+esc(w)+'</button>'}).join('')+'</div>':'')+'<div class="row"><input id="own"'+(fade?' value="'+esc(s[2])+' " data-st="'+esc(s[2])+'"':'')+' placeholder="'+(k==='topic'?esc(s[2])+'\u2026':fade?esc(s[2])+' \u2026':'or write your own\u2026')+'" autocorrect="on" enterkeyhint="done"><button class="say" id="mic2">🎤</button><button class="big" id="add">Add</button></div><div id="fb"></div></div>'}
  else html+='<div class="frame wait"><div class="lab">'+s[1]+'</div>'+esc(s[2])+' \u2026</div>'});
 if(S.slot>=SLOTS.length&&!S.fin)html+='<div class="praise">All four sentences are in! Read it over. Want to change the last one? Tap ↩ Undo. Happy with it? Tap Finish.</div><div class="row"><button class="ghost" id="rdp">🔊 Read it</button><button class="big" id="finish">✔ Finish my paragraph</button></div>';
 if(S.fin){var p=SLOTS.map(function(s){return S.para[s[0]]}).join(' ');S.paragraph=p;
  html='<div class="top"><button class="ghost" id="home">⬅ Missions</button><div class="steps"><span>1 Idea</span><span>2 Sentence</span><span class="on">3 Paragraph</span></div></div><h2>🎉 You wrote a whole paragraph!</h2><div class="para">'+esc(p)+'</div><div class="praise">'+(S.m.kind==='opinion'?'Your opinion ✔ &nbsp; Two real reasons ✔ &nbsp; Conclusion says your pick again ✔':S.m.kind==='howto'?'Topic sentence ✔ &nbsp; Steps in order ('+SLOTS.slice(1).map(function(x){return x[2].replace(',','')}).join(', ')+') ✔':'Topic sentence ✔ &nbsp; Two details ('+SLOTS[1][2].replace(',','')+', '+SLOTS[2][2].replace(',','')+') ✔ &nbsp; Ending ✔')+' &nbsp; Capitals and stop signs ✔<br>'+praise()+' You earned a LEGO brick! <span class="brick" style="background:#e3000b"></span></div><p class="sol">For grown-ups \u2013 VA English SOL Gr 3: paragraph frame 3.W.2.A (i, iii, iv, v); '+(S.m.kind==='opinion'?'opinion with reasons and a conclusion 3.W.1.D':S.m.kind==='howto'?'how-to steps in order 3.W.1.C':'story in order 3.W.1.B')+'; sentences 3.LU.1.A, 3.LU.1.B; capitals &amp; end marks 3.W.3.B, names 3.LU.2.C; word-bank spelling 3.LU.2.D.</p><div class="row"><button class="big" id="rd3">🔊 Read my paragraph</button><button class="ghost" id="again">Write another</button><button class="ghost" id="remix">🔀 Remix this story</button></div>'+(S.newM?'<div class="praise unlock">🔓 New mission unlocked: <b>'+esc(S.newM.title)+'</b>! Find it on the mission page.</div>':S.remixNoNew?'<p class="sub">Tip: in a remix, write one sentence yourself to unlock a new mission.</p>':'')+'<div class="row"><button class="big comicgo" id="mkComic">📖 Turn it into a comic!</button></div>'}
 html=html.replace('@@CHIPTIP@@',tip?' Your sentence from step 2 is a chip you can use!':'');app.innerHTML=html;bindHome();(function(){var o=document.getElementById('own');if(o&&o.dataset.st){var L=o.value.length;try{o.focus();o.setSelectionRange(L,L)}catch(e){}}})();
 if(S.fin){document.getElementById('rd3').onclick=function(){speak(S.paragraph)};document.getElementById('again').onclick=menu;if(!S.logged){S.logged=1;finish()}document.getElementById('remix').onclick=function(){S.remix=(S.remix||0)+1+Math.floor(Math.random()*3);S.logged=0;S.newM=null;stepC()};document.getElementById('mkComic').onclick=function(){StoryComic.edit(S.comicId)};return}
 [].forEach.call(app.querySelectorAll('.chip'),function(b){b.onclick=function(){add(b.dataset.v,true,b.dataset.p)}});var ud=document.getElementById('undo');if(ud)ud.onclick=function(){S.slot--;var k=SLOTS[S.slot][0];delete S.para[k];delete S.pics[k];if(S.typedK)delete S.typedK[k];delete S.cred[k];drawC()};
 if(S.slot>=SLOTS.length){document.getElementById('rdp').onclick=function(){speak(SLOTS.map(function(s){return S.para[s[0]]}).join(' '))};document.getElementById('finish').onclick=function(){S.fin=1;S.remixNoNew=S.remix&&!Object.keys(S.typedK||{}).length;S.newM=S.remixNoNew?null:unlockNext();S.plays=(S.plays||0)+1;drawC()};return}
 var rv=document.getElementById('reveal');if(rv)rv.onclick=function(){var k=SLOTS[S.slot][0];S.hints++;S.lastHint=1;S.reveal[k]=1+((S.plays||0)%Math.max(1,S.m.frame[k].length));drawC()};
 [].forEach.call(app.querySelectorAll('.bw2'),function(b){b.onclick=function(){var o=document.getElementById('own');o.value=(o.value.trim()?o.value.replace(/\s*$/,' '):'')+b.textContent;o.focus()}});
 document.getElementById('add').onclick=function(){add(document.getElementById('own').value,false)};
 document.getElementById('mic2').onclick=function(){var R=window.SpeechRecognition||window.webkitSpeechRecognition,o=document.getElementById('own');if(!R){o.focus();document.getElementById('fb').innerHTML='<div class="hint">🎙 Tap the box, then the microphone on the iPad keyboard.</div>';return}try{var r=new R();r.lang='en-US';r.onresult=function(e){o.value=e.results[0][0].transcript};r.onerror=function(){o.focus()};r.start()}catch(e){o.focus()}}}
function add(v,chip,pic){v=oneLine(v);S.typing=!chip;var k=SLOTS[S.slot][0],fb=document.getElementById('fb');S.checks++;
 var ow=document.getElementById('own');if(!chip&&ow&&ow.dataset.st&&v.trim().replace(/[.\u2026]+$/,'')===ow.dataset.st.trim())v='';
 if(!v||!v.trim()){fb.innerHTML='<div class="hint">💡 Tap an idea chip, or write your own \u2013 both are great!</div>';return}
  var s=full(k,v),o=check(s),m=S.m,must=0;
 if(m.kind==='opinion'&&k==='topic'&&topicPower(s)===-1){must=1;var pw=m.ideas[S.idx||0].t.toLowerCase();o.unshift({msg:'An opinion tells your pick! Say which power you think is best, like \u201cI think '+pw+' is the best power.\u201d',fix:function(){return 'I think '+pw+' is the best power.'}})}
 if(m.kind==='opinion'&&k==='end'&&S.tpow>=0&&!new RegExp(POWERS[S.tpow][1].source,'i').test(s)){must=1;var pn=POWERS[S.tpow][0];o.unshift({msg:'A conclusion says your pick again. Try naming '+pn+' in this sentence.',fix:function(){return 'That is why '+pn+' is the best power.'}})}
 if(m.kind==='howto'&&k!=='topic'&&cmdCheck(s)){must=1;var ci=cmdInfo(s);if(ci.fixed){var fxd=ci.fixed;o.unshift({msg:'How-to steps tell the reader what to do. Try starting with an action word, like \u201c'+esc(fxd.replace(/\s+$/,''))+'\u201d',fix:function(){return fxd}})}else o.unshift({msg:'How-to steps tell the reader what to do. Try an action word, like <i>make a band</i>.',fix:null})}
 if(!chip&&!realWords(v)){S.hints++;S.lastHint=1;fb.innerHTML='<div class="hint">💡 '+JUNK+'</div>';return}
 if(o.length&&(!chip||must)){S.hints++;S.lastHint=1;fb.innerHTML='<div class="hint">💡 '+o[0].msg+'</div><div class="row">'+(o[0].fix?'<button class="ghost" id="fix">✨ Fix it for me</button>':'')+(must?'':'<button class="ghost" id="keep">Keep it</button>')+'</div>';
  var fx=document.getElementById('fix');if(fx)fx.onclick=function(){var nv=o[0].fix(document.getElementById('own').value);document.getElementById('own').value=nv;add(nv,false)};
  if(must)return;document.getElementById('keep').onclick=function(){commit(k,o.reduce(function(x,c){return c.fix?c.fix(x):x},s),bestPic(k,s))};return}
 S.cred[k]=S.lastHint?0:1;commit(k,o.reduce(function(x,c){return c.fix?c.fix(x):x},s),pic||bestPic(k,s))}
function commit(k,s,pic){S.para[k]=s;if(S.m.kind==='opinion'&&k==='topic')S.tpow=topicPower(s);if(S.typing)S.typedK[k]=1;else delete S.typedK[k];if(S.m.kind==='opinion'){if(k==='topic')pic=S.m.id+'_t1';if(k==='end')pic=opinionPic()}S.pics[k]=pic;S.lastHint=0;S.slot++;drawC()}
function finish(){markDone(S.m.id);try{S.comicId=window.StoryComic?StoryComic.create(S.m,S.para,S.pics):null}catch(e){}var min=(Date.now()-start)/60000;
 try{if(window.HMA&&HMA.progress){
  HMA.progress.log({kid:'Samuel',mode:'writing',skill:'w-sentence',sol:'3.LU.1.A; 3.LU.1.B; 3.W.3.B; 3.LU.2.C; 3.LU.2.D',questions:1,firstTry:S.first>0?1:0,hints:S.sh||0,minutes:min,venom:S.m.id});
  HMA.progress.log({kid:'Samuel',mode:'writing',skill:'w-paragraph',sol:'3.W.2.A (i, iii, iv, v); '+(S.m.sol||'3.W.1.B'),questions:4,firstTry:Object.keys(S.cred).reduce(function(a,x){return a+S.cred[x]},0),hints:S.hints-(S.sh||0),minutes:0,venom:S.m.id});}}catch(e){}}
document.addEventListener('keydown',function(e){if(e.key!=='Enter'||e.shiftKey||e.isComposing)return;var id=e.target&&e.target.id,map={free:'chk',own:'add',bIn:'bChk'};if(map[id]){var b=document.getElementById(map[id]);if(b){e.preventDefault();b.click()}}});
window.StoryLab={pics:PICS,missions:M,realWords:realWords,menu:menu,open:open,check:check,lc:lc,speak:speak,esc:esc,praise:praise,app:app};menu()})();
