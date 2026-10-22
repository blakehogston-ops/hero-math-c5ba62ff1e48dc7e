# Family look-alike pack (PREVIEW ONLY)
Stylized, kid-friendly look-alikes drawn in code by build.py from Blake's reference photos (ref/). They match ../hero.svg: viewBox 0 0 400 500, anchor bottom-center (200,470), the same torso, leg and arm geometry, gradients and the #a8c8ff rim line.

| File | Use |
|---|---|
| samuel_idle.svg / samuel_victory.svg | Samuel unmasked in the hero suit. Victory raises his right fist to about (295,22). Trading card and Daily Globe photo. |
| sadie_idle.svg / sadie_victory.svg | Sadie in a white hooded suit with pink and teal, a simple homage with no official logo. |
| dad_cheer.svg / dad_wave.svg | Blake as the rooftop dad cameo in a plaid shirt and jeans. Cheer has both arms up; wave has one hand up. |

Groups: `face` (skin, eyes, mouth, plus `beard` for dad), `hair`, and `hood` for Sadie. Swap faces by editing `face()` and the head strings in build.py, then run `python3 build.py`.
Nothing is wired into the game yet. To use these, a dev can swap 'hero.svg' for 'family/samuel_idle.svg' in preview hero.js or venom.js. Live ../hero.svg is unchanged.
