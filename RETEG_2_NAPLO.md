# Réteg 2 — Háttér + Hero (Napló)

> Utolsó frissítés: 2026.03.03

---

## Mit tartalmaz ez a réteg

Az első amit a látogató lát — az identitás. Ha ez nem működik, semmi más nem számít.

| # | Feladat | Állapot |
|---|---------|---------|
| 1 | Parázs particle rendszer — Three.js (desktop) | 🔄 implementálva, javítás #2 folyamatban |
| 2 | Parázs particle rendszer — Canvas 2D (mobil) | ⬜ |
| 3 | useIsMobile hook + automatikus váltás | ⬜ |
| 4 | Intensity paraméter (hero: erős, aloldalak: gyenge) | ⬜ |
| 5 | IVERSO felirat + "Let's build something" (fade-in 1.5 mp) | ✅ benne van |
| 6 | Hover interakció (parázs felerősödik) | ✅ működik (finomhangolás kell) |
| 7 | Bal klikk destroy + jobb klikk szúnyog | ✅ működik (finomhangolás kell) |
| 8 | Scroll → háttér effekt → visszaáll | 🔄 működik, de nem organikus — javítás #2-ben |
| 9 | Custom kurzor (narancssárgás pont + trail) | 🔄 javítás #2-ben |
| 10 | Loading intro (2 mp szikrás animáció → hero) | ⬜ |

---

## Javítás #1 — Teljes újraírás (03.03)

**Prompt:** RETEG_2_HERO_FIX.md

**Mi történt:**
- A korábbi EmberHero BUGOS volt — canvas position: fixed átlógott mindenen, z-index szétcsúszva
- Teljes újraírás nulláról
- Canvas: position: fixed, z-index: 0 — tartalom fölötte scrollozik (z-index: 1)
- Pixel sampling Syne 800 fonttal, document.fonts.ready
- 50k részecske, vegyes méret, narancs szín skála
- Hover: lokális felizzás
- Bal klikk: destroy area szétrobbanás + visszaépülés
- Jobb klikk: szúnyog mód
- Scroll: IVERSO → szétoszlik háttér effektté → lap alján visszaáll

**Eredmény:** Alaprendszer működik, z-index rend megoldva. DE vizuálisan még nem elég jó.

---

## Javítás #2 — Vizuális finomhangolás (03.03)

**Prompt:** RETEG_2_HERO_FIX_02.md

**Azonosított problémák az első teszt után:**
1. Felirat a viewport közepén van — fentebb kell (35-40%)
2. Felirat statikus/halott — alapállapotban is élnie kell (pulzálás, szikrák, lélegzés)
3. Felirat olvashatatlan — élesebb kontúrok, sűrűbb részecskék kellenek (referencia képek alapján)
4. Destroy 12 mp + nem lehet folyamatosan kattintani — 10 mp-re csökkenteni, folyamatos kattintás engedélyezve
5. Scroll részecskék "scriptes" pályán mozognak — organikus, random szétszóródás kell (velocity + friction)
6. Custom kurzor hiányzik — narancssárgás pont + trail, egész oldalon

**Állapot:** ✅ végrehajtva

---

## Javítás #3 — Élő szétszórt részecskék + felirat kinézet (03.03)

**Prompt:** RETEG_2_HERO_FIX_03.md

**Azonosított problémák a #2 teszt után:**
1. Szétszórt részecskék statikusan lebegnek — élniük kell (lassú sodródás, pulzálás, random mozgás)
2. Felirat túl egyenletes sárga — mélyebb kontraszt kell: sötét vöröses belső + fényes narancs kontúr + glow (referencia képek alapján)

**Állapot:** ✅ végrehajtva

---

## Javítás #4 — Particle viselkedés + font váltás (03.04)

**Prompt:** RETEG_2_HERO_FIX_04.md

**Azonosított problémák a #3 teszt után:**
1. Destroy area túl nagy — 40%-kal csökkenteni, center pontosan az egéren
2. Részecskék még mindig statikusak (alapállapot, háttér, destroy után) — mindenhol mozogniuk kell
3. Alapállapot kaotikus — letisztultabb kell, betűk formája egyértelmű, kevesebb szétszórt szikra
4. Destroy: részecskék felfelé szállnak — 360° random irányba kell
5. Szín: túl egyenletes sárga — vulkáni láva érzés kell (sötét vöröses mag + narancs szélek)
6. Háttér módban nem interaktív — kattintás hasson a részecskékre (de csak háttérre kattintva)
7. Font váltás: Syne → Playfair Display 900 mindenhol

**Állapot:** 📋 prompt kész, implementáció következik

---

## Döntések

| Dátum | Döntés |
|-------|--------|
| 03.02 | Particle szám: 50k (PARTICLE_COUNT paraméterként) |
| 03.02 | Szín: random keveredés: sötét narancs → narancs (#F77F0A) → sárga → fehéres |
| 03.02 | Mozgás: finom, visszafogott pulzálás + enyhe felfelé sodródás |
| 03.02 | Részecske méret: vegyes — 70% apró, 25% közepes, 5% nagy glow folt |
| 03.02 | Hover: instant, ~1 betűnyi sugár, lokális felizzás |
| 03.02 | Kattintás/destroy: ~2-3 betűnyi destroy area, random robbanás |
| 03.02 | Font sampling: document.fonts.ready szükséges (self-hosted woff2) |
| 03.03 | Scroll viselkedés: IVERSO → háttér effektté szétoszlik → lap alján visszaáll (régi projekt módszer) |
| 03.03 | Canvas: position: fixed, z-index: 0 — tartalom fölötte z-index: 1 |
| 03.03 | Felirat pozíció: viewport 35-40%-ánál (fentről), nem a közepén |
| 03.03 | Felirat élő: pulzálás + szikrák + lélegzés alapállapotban is |
| 03.03 | Destroy: 10 mp ciklus, folyamatos kattintás engedélyezve, független destroy area-k |
| 03.03 | Scroll szétszóródás: organikus (velocity + friction), nem előre megírt pályák |
| 03.03 | Custom kurzor: narancssárgás pont + trail, egész oldalon, mobilon nincs |
| 03.03 | A storyboard tartalma marad — csak a parázs viselkedése jön a régi projektből |
| 03.03 | Szétszórt részecskék: lassú random sodródás + pulzálás scattered módban is (nem statikus) |
| 03.03 | Felirat szín rétegzés: sötét vöröses belső + fényes narancs kontúr + glow (pixel sampling alapú szél/belső detekció) |
| 03.03 | Display font váltás: Syne TÖRÖLVE → Playfair Display 900 mindenhol (hero, nav, címsorok, "Let's build something", stb.). Self-hosted woff2. |
| 03.04 | Destroy area: 40%-kal kisebb, center pontosan az egéren |
| 03.04 | Részecskék: SEHOL nem statikusak — alapállapot, háttér, destroy után mind mozognak |
| 03.04 | Alapállapot: letisztult (betűk alakja egyértelmű, szikrák csak szélekről) |
| 03.04 | Destroy irány: 360° random (nem felfelé) |
| 03.04 | Szín: vulkáni láva (40% sötét vöröses, 35% narancs, 20% élénk narancs, 5% sárga) |
| 03.04 | Háttér mód interaktív: kattintás hat részecskékre (de csak háttérre, nem tartalomra) |

---

## Referencia képek

A repo gyökerében:
- `Képernyőkép 2026-02-12 221638.png` — régi hero hover
- `Képernyőkép 2026-02-12 222141.png` — régi hero alap
- `Képernyőkép 2026-02-12 222147.png` — régi hero alap (másik)
- `Képernyőkép 2026-02-12 222152.png` — régi hero scroll

Ezek az irányadók a vizuális minőséghez — a felirat éles kontúrú, olvasható, izzó parázs hatás.

---

## Megjegyzések

- A mobil Canvas 2D verzió, useIsMobile hook, loading intro, intensity paraméter — mind később jön (külön promptok)
- A Réteg 2 nem blokkolja a Réteg 4 javításokat — a preview-k újratervezése párhuzamosan mehet
