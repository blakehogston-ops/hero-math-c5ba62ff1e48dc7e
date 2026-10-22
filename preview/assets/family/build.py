# Family look-alike pack for Hero Math Academy. Original code-drawn art, styled to match ../hero.svg.
# Each SVG: viewBox 0 0 400 500, anchor bottom-center (200,470), face in <g id="face">.
import cairosvg
from PIL import Image, ImageDraw
RIM='stroke="#a8c8ff" stroke-width="2" stroke-linejoin="round"'
def defs(c):
    return f'''<defs>
<linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c['a'][0]}"/><stop offset=".5" stop-color="{c['a'][1]}"/><stop offset="1" stop-color="{c['a'][2]}"/></linearGradient>
<linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c['b'][0]}"/><stop offset=".5" stop-color="{c['b'][1]}"/><stop offset="1" stop-color="{c['b'][2]}"/></linearGradient>
<linearGradient id="k" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c['k'][0]}"/><stop offset="1" stop-color="{c['k'][1]}"/></linearGradient>
<radialGradient id="sk" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#f8dcc6"/><stop offset=".7" stop-color="#e9b998"/><stop offset="1" stop-color="#c98f6e"/></radialGradient>
<linearGradient id="hr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c['h'][0]}"/><stop offset="1" stop-color="{c['h'][1]}"/></linearGradient>
<linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="sd" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".4"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="tsh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".05"/><stop offset=".6" stop-color="#000" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>
<pattern id="tex" width="14" height="14" patternUnits="userSpaceOnUse">{c['tex']}</pattern>
</defs>'''
def P(d,f,tex=True,rim=True):
    s=f'<path fill="{f}" d="{d}"/>'
    if tex: s+=f'<path fill="url(#tex)" d="{d}"/>'
    if rim: s+=f'<path fill="none" {RIM} d="{d}"/>'
    return s
def arm(side,pose):
    # side -1 left(viewer), 1 right
    x=200+side*48
    if pose=='down':
        d=f"M{x} 145 Q{x+side*37} 160 {x+side*40} 220 Q{x+side*42} 260 {x+side*32} 280 L{x+side*14} 276 Q{x+side*20} 240 {x+side*12} 210 Q{x+side*2} 180 {x-side*13} 165Z"
        h=(x+side*24,285)
    elif pose=='up':
        d=f"M{x} 150 Q{x+side*40} 130 {x+side*52} 80 Q{x+side*58} 50 {x+side*56} 30 L{x+side*38} 28 Q{x+side*38} 50 {x+side*32} 75 Q{x+side*22} 110 {x-side*8} 160Z"
        h=(x+side*47,22)
    else: # wave: elbow out, hand up by head
        d=f"M{x} 150 Q{x+side*50} 160 {x+side*62} 120 Q{x+side*66} 95 {x+side*60} 70 L{x+side*44} 72 Q{x+side*46} 95 {x+side*42} 112 Q{x+side*30} 140 {x-side*8} 165Z"
        h=(x+side*52,62)
    return d,h
def fist(h,f,r=13,ext=''):
    return f'<circle cx="{h[0]}" cy="{h[1]}" r="{r}" fill="{f}"/><circle cx="{h[0]}" cy="{h[1]}" r="{r}" fill="none" {RIM}/>'+ext
def body(c,pose):
    o=['<ellipse cx="200" cy="472" rx="80" ry="12" fill="url(#sd)"/>']
    L="M156 272 Q150 370 158 455 L190 458 Q192 370 200 285Z M244 272 Q250 370 242 455 L210 458 Q208 370 200 285Z"
    o.append(P(L,'url(#a)'))
    o.append(P("M156 272 Q150 370 158 455 L168 456 Q162 370 172 278Z M244 272 Q250 370 242 455 L232 456 Q238 370 228 278Z",'url(#b)'))
    o.append(P("M152 410 L192 414 L190 462 L150 462Q140 456 152 410Z M248 410 L208 414 L210 462 L250 462Q260 456 248 410Z",'url(#k)'))
    if c.get('jeans'): o.append('<path d="M200 290 V440" stroke="#0a1a3a" stroke-width="2" opacity=".5"/>')
    arms=c['poses'][pose]
    for side,ap in ((-1,arms[0]),(1,arms[1])):
        d,h=arm(side,ap); g=P(d,'url(#a)' if not c.get('sleeve') else c['sleeve'])+fist(h,c['hand'])
        o.append(g if side<0 else f'<g id="armR">{g}</g>')
    T="M150 140 Q200 122 250 140 L242 250 Q200 264 158 250Z"
    o.append(P(T,'url(#a)'))
    o.append(P("M150 140 Q140 190 158 250 L172 278 Q160 190 168 145Z M250 140 Q260 190 242 250 L228 278 Q240 190 232 145Z",'url(#b)'))
    o.append(P("M158 250 Q200 264 242 250 L246 275 Q200 290 154 275Z",c['belt'],tex=False))
    o.append(f'<path d="{T}" fill="url(#tsh)"/>')
    o.append(c['chest'])
    o.append('<path d="M188 118 h24 v24 h-24z" fill="url(#sk)"/>')
    o.append(c['head'])
    o.append('<ellipse cx="180" cy="170" rx="10" ry="26" fill="url(#hl)" transform="rotate(15 180 170)"/>')
    if c.get('mask'):
        o.append(f'<g id="mask" style="display:{MASKSHOW[0]}">{c["mask"]}</g>')
        o.append(f'<g id="peelarm" style="display:none"><path id="peelpath" d="M248 150 L285 140 L222 118" fill="none" stroke="#14161c" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" opacity=".25"/><path id="peelpath2" d="M248 150 L285 140 L222 118" fill="none" stroke="{c["peelc"]}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/><circle id="peelhand" cx="222" cy="118" r="13" fill="{c["peelc"]}" stroke="#a8c8ff" stroke-width="2"/></g>')
    return ''.join(o)
def face(eye,mouth,extra=''):
    # neutral-geometry stylized face centered (200,80)
    e=''.join(f'<ellipse cx="{x}" cy="80" rx="8" ry="7" fill="#fff"/><circle cx="{x}" cy="81" r="5" fill="{eye}"/><circle cx="{x}" cy="81" r="2.4" fill="#111"/><circle cx="{x-2}" cy="79" r="1.4" fill="#fff"/>' for x in (184,216))
    return (f'<g id="face"><ellipse cx="200" cy="82" rx="36" ry="42" fill="url(#sk)"/>'
            '<ellipse cx="164" cy="86" rx="5" ry="8" fill="#e3a585"/><ellipse cx="236" cy="86" rx="5" ry="8" fill="#e3a585"/>'
            +e+'<path d="M176 69 q8-5 16-1 M208 68 q8-4 16 1" stroke="#7a5236" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
            '<path d="M200 84 q-3 9 0 12 q3 1 5-1" stroke="#c48a6a" stroke-width="2" fill="none"/>'
            '<ellipse cx="180" cy="98" rx="7" ry="4" fill="#f09a8a" opacity=".45"/><ellipse cx="220" cy="98" rx="7" ry="4" fill="#f09a8a" opacity=".45"/>'
            +extra+mouth+'</g>')
BIG='<path d="M184 103 Q200 120 216 103 Z" fill="#7a1e24"/><path d="M186 104 h28 l-2 4 h-24z" fill="#fff"/>'
SOFT='<path d="M188 104 Q200 112 212 104" stroke="#c0505a" stroke-width="3" fill="none" stroke-linecap="round"/>'
DADM='<path d="M187 106 Q200 116 213 106 Z" fill="#fff" stroke="#7a3a2a" stroke-width="1.5"/>'
WEBTEX='<path d="M0 0L14 14M14 0L0 14" stroke="#3a0408" stroke-width=".8" opacity=".5"/>'
SPIDER='<path fill="#14161c" d="M200 160 q-4 8-3 16 q-16-6-24-16 q8 14 24 20 q-14 4-20 14 q12-8 23-8 q-6 14-6 26 q5-14 6-20 q1 6 6 20 q0-12-6-26 q11 0 23 8 q-6-10-20-14 q16-6 24-20 q-8 10-24 16 q1-8-3-16z"/>'
SAM=dict(a=('#f04848','#c41a26','#6a0a12'),b=('#3d6ad8','#1c3a9a','#0a1648'),k=('#f04848','#6a0a12'),h=('#c9a070','#8a6238'),
  tex=WEBTEX,hand='url(#a)',belt='url(#a)',chest=SPIDER,
  head=face('#4a86c8',BIG)+'<g id="hair"><path fill="url(#hr)" d="M162 76 Q160 34 200 34 Q242 34 238 76 Q232 56 222 52 Q214 62 194 60 Q182 64 170 58 Q164 64 162 76Z"/><path d="M178 44 q20-6 40 4" stroke="#e8c898" stroke-width="2" fill="none" opacity=".7"/></g>',
  poses={'idle':('down','down'),'victory':('down','up')})
SAD=dict(a=('#ffffff','#e8ecf2','#a8b0c0'),b=('#ff6fb5','#e0388a','#8a1050'),k=('#3ee0d0','#0f8a80'),h=('#fbecc0','#d8b878'),
  tex='<path d="M0 0L14 14" stroke="#9ab" stroke-width=".5" opacity=".3"/>',hand='url(#b)',belt='url(#k)',
  chest='<path d="M200 166 l8 14 l-8 6 l-8 -6z" fill="#14161c"/><path d="M200 172 l-18 -10 M200 172 l18 -10 M200 180 l-16 10 M200 180 l16 10" stroke="#14161c" stroke-width="3" stroke-linecap="round"/>',
  head='<g id="hood"><path fill="url(#a)" d="M152 90 Q148 26 200 24 Q252 26 248 90 Q246 128 200 130 Q154 128 152 90Z"/><path fill="url(#b)" d="M156 70 Q164 30 200 28 Q236 30 244 70 Q232 44 200 44 Q168 44 156 70Z"/><path fill="none" '+RIM+' d="M152 90 Q148 26 200 24 Q252 26 248 90 Q246 128 200 130 Q154 128 152 90Z"/></g>'
      +face('#5a9ad8',SOFT)+'<g id="hair"><path fill="url(#hr)" d="M164 80 Q166 46 200 46 Q234 46 236 80 Q228 60 200 60 Q176 60 164 80Z M162 78 q-4 30 4 46 l6-2 q-6-20-4-40z M238 78 q4 30-4 46 l-6-2 q6-20 4-40z"/></g>',
  poses={'idle':('down','down'),'victory':('down','up')})
DAD=dict(a=('#f08a6a','#d8604a','#7a2a20'),b=('#7a9ad0','#4a6aa8','#22386a'),k=('#e8e8e8','#8a8a90'),h=('#8a5a34','#4e3018'),
  tex='<path d="M0 3H14M0 10H14" stroke="#3a4a8a" stroke-width="2" opacity=".35"/><path d="M4 0V14M11 0V14" stroke="#fff" stroke-width="1.2" opacity=".25"/>',
  hand='url(#sk)',belt='#5a3a24',chest='<path d="M200 135 V250" stroke="#fff" stroke-width="2" opacity=".5"/><circle cx="200" cy="170" r="2" fill="#fff"/><circle cx="200" cy="200" r="2" fill="#fff"/><circle cx="200" cy="230" r="2" fill="#fff"/>',
  jeans=1,
  head=face('#5a7a9a',DADM,'<g id="beard"><path fill="url(#hr)" d="M164 82 Q164 132 200 134 Q236 132 236 82 Q232 104 222 104 Q212 98 200 100 Q188 98 178 104 Q168 104 164 82Z M184 100 Q200 94 216 100 Q206 98 200 102 Q194 98 184 100Z"/></g>')
      +'<g id="hair"><path fill="url(#hr)" d="M162 76 Q158 38 200 36 Q242 38 238 76 Q234 54 200 52 Q170 54 162 76Z"/></g>',
  poses={'cheer':('up','up'),'wave':('down','wave')})
SAM['peelc']='#c41a26'; SAD['peelc']='#e0388a'
LENS=lambda rim:f'<path fill="#f4f8fc" stroke="{rim}" stroke-width="4" d="M168 74 Q180 60 194 82 Q180 94 170 88Z M232 74 Q220 60 206 82 Q220 94 230 88Z"/><ellipse cx="186" cy="62" rx="12" ry="5" fill="url(#hl)" transform="rotate(-20 186 62)"/>'
SAM['mask']=('<ellipse cx="200" cy="78" rx="41" ry="50" fill="url(#a)"/><ellipse cx="200" cy="78" rx="41" ry="50" fill="url(#tex)"/>'
  '<g stroke="#3a0408" stroke-width="1.2" opacity=".55" fill="none"><path d="M200 28 V128 M159 78 H241 M170 42 Q200 60 230 42 M162 100 Q200 84 238 100 M168 116 Q200 100 232 116"/><path d="M175 34 Q190 78 172 120 M225 34 Q210 78 228 120"/></g>'
  '<ellipse cx="200" cy="78" rx="41" ry="50" fill="none" stroke="#a8c8ff" stroke-width="2"/>'+LENS('#111'))
SAD['mask']=('<ellipse cx="200" cy="84" rx="38" ry="44" fill="url(#a)"/><path d="M200 42 V128 M164 84 H236" stroke="#c0c8d8" stroke-width="1" opacity=".6"/>'
  '<ellipse cx="200" cy="84" rx="38" ry="44" fill="none" stroke="#a8c8ff" stroke-width="2"/>'+LENS('#e0388a'))
# dad legs = jeans
DAD['a_legs']=1
MASKSHOW=['none']
def svg(c,pose):
    b=body(c,pose)
    if c is DAD:  # repaint legs as jeans after body: simple overlay
        jl=P("M156 272 Q150 370 158 455 L190 458 Q192 370 200 285Z M244 272 Q250 370 242 455 L210 458 Q208 370 200 285Z",'#3a5a8a',tex=False)
        b=b.replace('<ellipse cx="200" cy="472" rx="80" ry="12" fill="url(#sd)"/>','<ellipse cx="200" cy="472" rx="80" ry="12" fill="url(#sd)"/>',1)
        i=b.find('<path fill="url(#a)" d="M156 272'); j=b.find('<path fill="url(#k)"')
        b=b[:i]+jl+b[j:]
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">{defs(c)}{b}</svg>'
outs=[]
for name,c in (('samuel',SAM),('sadie',SAD),('dad',DAD)):
    for pose in c['poses']:
        for mk in ([False,True] if c.get('mask') else [False]):
            MASKSHOW[0]='inline' if mk else 'none'
            n=f'{name}_{pose}'+('_masked' if mk else ''); open(n+'.svg','w').write(svg(c,pose)); cairosvg.svg2png(url=n+'.svg',write_to=n+'.png'); outs.append(n)
# trading-card composites (preview only): frame art from ../card_frame_rare.svg is 300x420; here simple 600x840 preview cards
sheet=Image.new('RGBA',(len(outs)*300,420),(24,28,40,255)); d=ImageDraw.Draw(sheet)
for i,n in enumerate(outs):
    im=Image.open(n+'.png').convert('RGBA').resize((300,375)); sheet.alpha_composite(im,(i*300,10)); d.text((i*300+110,395),n,fill=(255,215,106))
sheet.save('preview.png')
