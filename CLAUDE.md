# CLAUDE.md — Iverso weboldal

## Te ki vagy

Te építed az Iverso weboldalt. Norbi ad utasításokat — csináld meg amit kér, se többet, se kevesebbet. Ha valami nem egyértelmű, kérdezz vissza mielőtt nekiállsz.

Az **IVERSO_STORYBOARD.md** a projekt bibliája — minden döntés ott van.

---

## A projekt

**Iverso** — Norbi side business (Nebengewerbe) weboldala.
**Domain:** iverso.info
**Lényeg:** Az oldal nem statikus — hanem **él**. Minden reagál: hover, kattintás, scroll, touch. A látogató úgy érezze: *"Hú, ilyet én is akarok a cégemnek."*

Nincs referencia szekció, nincs garancia, nincsenek számok. Az oldal minősége maga a bizalom.
Nincs személyes "rólam" rész — a munka beszél.

---

## Tech stack ✅ ELDÖNTVE

```
Framework:      Vite + React (SPA)
Nyelv:          TypeScript
Styling:        CSS Modules (vagy vanilla CSS — Norbi dönti el menet közben)
Routing:        react-router-dom (SPA routing + morph animációk)
i18n:           react-i18next (HU/DE/EN)
Animáció:       CSS + Canvas 2D (hero, effektek — Three.js NEM kell)
Scroll:         Intersection Observer API (natív)
Fontok:         Syne + DM Sans (Google Fonts)
Deploy:         Vercel (GitHub auto-deploy)
```

### Miért Vite + React?
- SPA = morph animációk demó → aloldal között natívan működnek
- Canvas 2D komponensek egyszerűen kezelhetők React-ben
- Könnyű struktúra — Claude Code telefonról is kezelhető
- Nincs SSR overhead (az oldal lényege kliens-oldali interaktivitás)

### Projekt struktúra
```
iverso/
├── public/
│   └── fonts/              # Ha self-hosted fontok kellenek
├── src/
│   ├── components/
│   │   ├── hero/            # Parázs hero (Canvas 2D)
│   │   ├── nav/             # Navigáció (scroll-aware)
│   │   ├── demos/           # 4 mini demó előzetes
│   │   ├── process/         # Folyamat szekció (node-ok)
│   │   ├── builder/         # Építős interaktív szekció
│   │   ├── cta/             # Amelia ízelítő
│   │   └── footer/          # Footer
│   ├── pages/
│   │   ├── Home.tsx         # Főoldal (7 jelenet scroll)
│   │   ├── Dashboards.tsx   # /dashboardok
│   │   ├── AI.tsx           # /ai
│   │   ├── Automation.tsx   # /automatizacio
│   │   ├── Websites.tsx     # /weboldalak
│   │   ├── Process.tsx      # /folyamat
│   │   ├── Contact.tsx      # /kapcsolat (Amelia)
│   │   ├── Impressum.tsx    # /impressum
│   │   └── Privacy.tsx      # /adatvedelem
│   ├── hooks/               # Custom hooks (useIntersection, useCanvas, stb.)
│   ├── i18n/
│   │   ├── hu.json
│   │   ├── de.json
│   │   └── en.json
│   ├── styles/
│   │   ├── global.css       # Reset, változók, háttér gradient
│   │   └── fonts.css        # Font-face declarations
│   ├── utils/               # Segédfüggvények
│   ├── App.tsx              # Router + layout
│   └── main.tsx             # Entry point
├── CLAUDE.md
├── IVERSO_STORYBOARD.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── .gitignore
```

---

## Vizuális szabályok

### 3 szín
```
Fekete:  #0A0A0C  (háttér)
Fehér:   #EDEDF0  (szöveg)
Narancs: #F77F0A  (akcentus)
```

Egyéb hivatkozott szín: #88889A (szürke — "Let's build something" felirat)

### Háttér
"Ultra mély" gradient — végig ugyanaz az egész oldalon:
- Drámai narancs radial gradient felülről
- Több mélységi réteg, vignette, film grain, lélegző fény
- Közepes intenzitás, NEM reagál egérre
- Referencia: iverso-gradient-v2.html, D verzió

### Fontok
- **Syne** — display font (címsorok, hero, CTA)
- **DM Sans** — body font (szövegtörzs)

IVERSO felirat: Syne, 800 weight, narancs (#F77F0A)
"Let's build something": Syne, 600 weight, szürke (#88889A) — MINDIG angolul, minden nyelven

### Ikonok
SVG thin line: 1.5px stroke, currentColor

### Emojik
**NINCSENEK** — sehol az oldalon

---

## Oldalstruktúra

### Főoldal — 7 jelenet (scroll élmény)

**1. PARÁZS (hero)** — NEM tűz!
- Teljes képernyős parázs particle effekt
- IVERSO felirat narancs gradienssel, körülötte izzó részecskék szállnak felfelé
- "Let's build something" fade-in 1.5 mp után
- Sok apró izzó részecske, pulzálnak, szállnak
- CSS + Canvas 2D — gépen ÉS mobilon (Three.js NEM kell)
- Touch támogatás beépítve
- Interakció: magától él + hover felerősödik + kattintás/tap szétrobban majd visszaáll
- Referencia prototípus: iverso-parazs-hero.html

**2. IVERSO + "LET'S BUILD SOMETHING"**
- Parázs halványul de NEM tűnik el — marad háttérben
- IVERSO felirat ráúszik
- Scroll animáció: Depth fade — elmosódásból élesedik, mélyből jön

**3. 4 MINI DEMÓ ELŐZETES**
- Parázs teljesen elhalványul, fekete háttér marad
- 4 nagy mini demó egymás alatt, egyforma vizuális súly
- Mindegyik: mini verzió a demóból + "Tovább →" → morph animációval aloldal
- Morph: gépen fancy expand, mobilon smooth slide-up
- Scroll animáció: Stagger rise — egymás után emelkednek fel, 0.12s késleltetés
- Sorrend nem fontossági — mind egyforma
- **Dashboard:** 2-3 KPI kártya előzetes
- **AI Chatbot:** egy chat buborék előzetes
- **Automatizáció:** workflow node-ok előzetes
- **Weboldalak:** egy mini weboldal előzetes

Előzetes animációk gépen (élnek amíg képernyőn vannak):
- Dashboard: számok felpörögnek + bar chart animálódik, folyamatosan
- AI Chat: beszélgetés lejátszódik (typing indicator → üzenetek), loop
- Automatizáció: adat végigfolyik a node-okon
- Weboldal: mini böngésző progresszíven "betöltődik"

Mobilon: belépő animáció (pl. számok felszámlálnak), utána statikusak.

**4. FOLYAMAT**
- 3-4 interaktív node: Beszélgetés → Tervezés → Építés → Átadás
- Kattintható node-ok, animált flow
- Scroll animáció: Node sequence — node-ok sorban kipattannak + összekötő vonal kitöltődik

**5. ÉPÍTŐS INTERAKTÍV SZEKCIÓ**
- "Let's build something" szó szerint megelevenedik
- 8+ blokk, szabadon rakhatók bárhova a rácsba
- Pattogó blokk tanítja ("Húzz be!") — ha nem interaktál, addig hívogatja
- Morph animáció időzítve indul (pár mp után magától, nem kell gomb)
- Morph eredmény: chat buborék + grafikon + KPI kártya + workflow node
- Mobilon: tap = lerakás, morph CSS + Canvas
- Scroll animáció: Block drop — fentről beesés, enyhe forgás

**6. CTA — AMELIA ÍZELÍTŐ**
- "Van egy ötleted? Építsük meg."
- Amelia chat buborék + "Beszéljünk →" gomb → /kapcsolat
- Főoldalon csak ízelítő
- Scroll animáció: Glow reveal + Bubble pop

**7. FOOTER**
- Impressum link + Adatvédelem link + © 2026 Iverso
- Scroll animáció: Simple fade

### Scroll animációk — közös szabályok
- Intersection Observer alapú
- Threshold: 0.15
- Egyszer triggerelődik
- Visszagörgetésre NEM resetelődik (csak teszteléskor)

### Aloldalak

| URL | Tartalom |
|-----|----------|
| `/dashboardok` | Interaktív dashboard demó + CompanySizeSlider (Egyedül → Kis csapat → Több részleg → Komoly szervezet) |
| `/ai` | AI chatbot demó — szolgáltatás bemutató |
| `/automatizacio` | 6 node-os workflow demó, kattintható, animálható |
| `/weboldalak` | Konfigurátor: stílus (modern/minimal/bold/classic), szín/téma, iparág, layout — élőben változik |
| `/folyamat` | Részletes folyamat, 4 lépés, több infó minden node-nál |
| `/kapcsolat` | Amelia teljes képernyős chat |
| `/impressum` | Kötelező — Nebengewerbe |
| `/adatvedelem` | Kötelező — Datenschutz |

---

## Navigáció

- **Hero-nál:** NAV NINCS — csak nyelvváltó gomb jobb felső sarokban
- **Scrollra:** diszkrét nav sáv besúszik felülről (menü linkek + nyelvváltó)
- **Visszagörgetés hero-hoz:** nav eltűnik, csak nyelvváltó marad

---

## Háromnyelvűség

- Alapnyelv: magyar (HU)
- Fordítások: német (DE) + angol (EN)
- Nyelvváltás: automatikus böngésző nyelv + váltó gomb
- "Let's build something" — MINDIG angolul, minden nyelven
- Demók tartalma nyelvfüggő:
  - HU → magyar cégek (Kovács Kft, Nagy Építő...)
  - DE → német cégek (Müller GmbH, Schmidt Bau...)
  - EN → angol/nemzetközi cégek

---

## Loading / Intro

- IVERSO logó halványan + narancs szikrák pattognak a képernyő alján
- Érintésre szikrázik
- Átmenet: szikrák felgyűlnek középre → IVERSO felirat kialakul belőlük → parázs hero indul
- 2 mp mindig (gyors neten is — intro animáció, nem fake loading)

---

## Amelia

Amelia az Iverso saját AI asszisztense — karakter, nem "chatbot".

- Nő, 20-as évek, fiatalos energia
- AI-generált realisztikus arc (avatár)
- Valódi AI (API hívás), NEM előre megírt válaszok
- Személyiség: ironikus, szókimondó, "hatalmas forma", vannak beszólásai
- Norbi-t szidja a háta mögött viccelődve, de komolyan is tud beszélni
- Először magáz → átvált tegezésre ha a látogató is tegez
- Bármiről beszél, de visszatereli az Iverso-ra
- Természetesen tereli Norbi felé amikor konkrét lesz
- Nyelvfüggő stílus
- Főoldalon: ízelítő (buborék + gomb)
- /kapcsolat: teljes képernyős chat
- AI provider: még nyitott
- Átadás módja: még nyitott

---

## Nyitott kérdések — NE dönts helyette, kérdezd meg Norbit!

- [ ] Impressum + Adatvédelem tartalom
- [ ] Amelia AI provider
- [ ] Amelia átadás módja
- [ ] Cookie-Banner + Analitika
- [ ] CSS Modules vs vanilla CSS vs Tailwind

---

## Szabályaid

### MINDIG
1. Csináld amit Norbi kér — se többet, se kevesebbet
2. Ha nem egyértelmű → kérdezz vissza
3. `npm run build` hiba nélkül a végén
4. `npm run dev` → ellenőrizd hogy betölt, nincs console error
5. "Ne nyúlj hozzá" → NE nyúlj hozzá

### SOHA NE
1. Ne hagyj `console.log`-ot
2. Ne változtass fájlokat amit nem kértek
3. Ne telepíts dependency-t amit nem kértek
4. Ne használj emojit az oldalon
5. Ne dönts a nyitott kérdésekben
6. Ne találj ki dolgokat amik nincsenek a storyboardban

---

*Az IVERSO_STORYBOARD.md a projekt bibliája. Ha kérdésed van, ott a válasz. Ha ott sincs — kérdezd Norbit.*
