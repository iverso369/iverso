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
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── ui/              # Közös építőkockák (KpiCard, ChatBubble, WorkflowNode, MiniWebsite, CompanySizeSlider)
│   │   ├── hero/            # Parázs hero (Canvas 2D)
│   │   ├── nav/             # Navigáció (scroll-aware)
│   │   ├── demos/           # 4 mini demó előzetes (főoldal)
│   │   │   ├── DashboardPreview.tsx
│   │   │   ├── AiChatPreview.tsx
│   │   │   ├── AutomationPreview.tsx
│   │   │   └── WebsitePreview.tsx
│   │   ├── process/         # Folyamat szekció (node-ok)
│   │   ├── builder/         # Építős interaktív szekció
│   │   ├── cta/             # Amelia ízelítő
│   │   └── footer/          # Footer
│   ├── layouts/
│   │   └── SubpageLayout.tsx  # Közös aloldal keret (gradient, nav, vissza)
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
│   ├── hooks/               # Custom hooks (useIntersection, useCanvas, useIsMobile stb.)
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
├── IVERSO_BUILD_PLAN.md
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

### Szolgáltatás színek
```
--web:   #22B8CF   ← cyan (weboldalak)
--dash:  #4D8EFF   ← kék (dashboardok)
--ai:    #A855F7   ← lila (AI)
--auto:  #F77F0A   ← narancs (automatizáció)
```

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

## Komponens architektúra — 3 réteg

### 1. réteg: ui/ — Építőkockák (újrahasználható)
Kis, önálló komponensek amiket mindenhol használunk:
- `KpiCard.tsx` — 1 KPI kártya (szám + label + szín)
- `ChatBubble.tsx` — 1 chat buborék (bot/user)
- `WorkflowNode.tsx` — 1 workflow node (ikon + cím + popup)
- `MiniWebsite.tsx` — 1 mini weboldal frame (böngésző keret)
- `CompanySizeSlider.tsx` — "Mekkora a vállalkozásod?" slider (4 szint)

### 2. réteg: demos/ — Főoldali előzetesek
A főoldalon megjelenő mini demók — az ui/ építőkockákat használják:
- `DashboardPreview.tsx` → 2-3 KpiCard, kis méret, animált
- `AiChatPreview.tsx` → 1 ChatBubble + typing indicator, loop
- `AutomationPreview.tsx` → 3 WorkflowNode + adat flow animáció
- `WebsitePreview.tsx` → 1 MiniWebsite + progresszív betöltés

### 3. réteg: pages/ — Aloldalak
Az aloldalak is az ui/ építőkockákat használják, de több belőlük, interaktívabban:
- `Dashboards.tsx` → 8-10 KpiCard + CompanySizeSlider + sidebar + táblázat
- `AI.tsx` → sok ChatBubble + input + gyorsválasz gombok + beállítás panel
- `Automation.tsx` → 6 WorkflowNode + SVG vonalak + popup-ok + animáció
- `Websites.tsx` → 1 MiniWebsite + konfigurátor (stílus/szín/iparág/layout)

### Miért jó ez?
- Ha módosítod a KpiCard-ot → mindenhol frissül
- Ha módosítod a Dashboard aloldalt → az előzetes nem törik el

---

## SubpageLayout — Közös aloldal keret

Minden aloldal ugyanazt a keretet kapja, de az akcentus szín más.

**"Fading Ember" elv:** Az aloldalak NEM kapnak particle effekteket.
Ehelyett: radial gradient az adott szolgáltatás színében, felülről.

A SubpageLayout tartalma:
- Radial gradient háttér (szín a props-ból)
- Nav (mindig látszik)
- Vissza gomb
- {children} — aloldal tartalma

---

## Aloldalak közös struktúrája

Minden szolgáltatás aloldal ezt a mintát követi:
1. **Sub-hero** — Tag badge (szolgáltatás szín) + Cím + Alcím + radial gradient háttér
2. **CompanySizeSlider** — "Mekkora a vállalkozásod?" 4 szint (kivéve /weboldalak → konfigurátor)
3. **Interaktív demó** — böngésző keretben, élő, kattintható, slider szint befolyásolja
4. **Szöveges szekció** — "Mire jó — mire nem"
5. **CTA** — "Érdekel?" + gomb → /kapcsolat
6. **Footer**

CompanySizeSlider 4 szintje: Egyedül → Kis csapat → Több részleg → Komoly szervezet
A demó tartalma (funkciók, KPI-k, leírások) változik szintenként.

Részletek aloldalanként: lásd IVERSO_STORYBOARD.md "ALOLDALAK — Részletes felépítés" szekció.

---

## Főoldal — 7 jelenet (scroll élmény)

**1. PARÁZS (hero)** — NEM tűz!
- Teljes képernyős parázs particle effekt
- CSS + Canvas 2D — gépen ÉS mobilon (Three.js NEM kell)
- Touch támogatás beépítve
- Interakció: magától él + hover felerősödik + kattintás/tap szétrobban

**2. IVERSO + "LET'S BUILD SOMETHING"**
- Parázs halványul de NEM tűnik el
- Scroll animáció: Depth fade

**3. 4 MINI DEMÓ ELŐZETES**
- 4 nagy mini demó egymás alatt, egyforma vizuális súly
- "Tovább →" → morph animáció → aloldal
- Gépen: folyamatos animáció; Mobilon: belépő animáció, utána statikus
- Scroll animáció: Stagger rise

**4. FOLYAMAT**
- 4 interaktív node: Beszélgetés → Tervezés → Építés → Átadás
- Scroll animáció: Node sequence

**5. ÉPÍTŐS INTERAKTÍV SZEKCIÓ**
- 8+ drag/tap blokk → morph → mini dashboard
- Scroll animáció: Block drop

**6. CTA — AMELIA ÍZELÍTŐ**
- Buborék + "Beszéljünk →" gomb → /kapcsolat
- Scroll animáció: Glow reveal + Bubble pop

**7. FOOTER**
- Impressum + Adatvédelem + ©
- Scroll animáció: Simple fade

### Scroll animációk — közös
- Intersection Observer, threshold 0.15, egyszer triggerelődik
- Visszagörgetésre NEM resetelődik

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
- Demók tartalma nyelvfüggő (HU/DE/EN cégnevek)

---

## Loading / Intro
- IVERSO logó + narancs szikrák → felgyűlnek → IVERSO felirat → parázs hero
- 2 mp mindig (intro animáció, nem fake loading)

---

## Amelia

Karakter, nem "chatbot". Főoldalon ízelítő, /kapcsolat-on teljes chat.
Részletek: IVERSO_STORYBOARD.md 6. jelenet.

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
