# CLAUDE.md — Iverso weboldal

## Te ki vagy

Te építed az Iverso weboldalt. Norbi ad utasításokat — csináld meg amit kér, se többet, se kevesebbet. Ha valami nem egyértelmű, kérdezz vissza mielőtt nekiállsz.

Az **IVERSO_STORYBOARD.md** a projekt bibliája — minden döntés ott van.

### Munkamódszer

Norbi két helyen dolgozik veled:
- **Claude webes felület** — tervezés, döntések, ötletelés, szövegírás. A storyboard és a napló itt frissül.
- **Claude Code (VS Code)** — implementáció, kódolás, debugolás.

A webes felületen született döntések bekerülnek a projekt fájlokba (storyboard, napló). Te a fájlokat olvasod — nem kell tudnod mi volt a beszélgetés, elég ami le van írva.

---

## A projekt

**Iverso** — Norbi side business (Nebengewerbe) weboldala.
**Domain:** iverso.info
**Lényeg:** Az oldal nem statikus — hanem **él**. Minden reagál: hover, kattintás, scroll, touch. A látogató úgy érezze: *"Hú, ilyet én is akarok a cégemnek."*

Nincs referencia szekció, nincs garancia, nincsenek számok. Az oldal minősége maga a bizalom.
Nincs személyes "rólam" rész — a munka beszél.

---

## Tech stack

```
Framework:      Vite + React (SPA)
Nyelv:          TypeScript
Styling:        CSS Modules
Routing:        react-router-dom
i18n:           react-i18next (HU/DE/EN)
Hero (gépen):   Three.js (3D parázs particle rendszer)
Hero (mobilon): CSS + Canvas 2D (könnyebb, ugyanaz a hangulat)
Scroll:         Intersection Observer API
Fontok:         Syne (display) + DM Sans (body) — Google Fonts
Deploy:         GitHub → Vercel (auto-deploy)
```

### Projekt struktúra
```
iverso/
├── public/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── ui/              # Közös építőkockák
│   │   │   ├── KpiCard.tsx
│   │   │   ├── KpiCard.module.css
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatBubble.module.css
│   │   │   ├── WorkflowNode.tsx
│   │   │   ├── WorkflowNode.module.css
│   │   │   ├── MiniWebsite.tsx
│   │   │   ├── MiniWebsite.module.css
│   │   │   ├── CompanySizeSlider.tsx
│   │   │   └── CompanySizeSlider.module.css
│   │   ├── hero/            # Parázs hero (Three.js + Canvas 2D)
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
│   │   └── SubpageLayout.tsx  # Közös aloldal keret
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
│   ├── hooks/
│   │   ├── useIsMobile.ts
│   │   ├── useIntersection.ts
│   │   └── useCanvas.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── hu.json
│   │   ├── de.json
│   │   └── en.json
│   ├── styles/
│   │   ├── global.css       # Reset, CSS változók, háttér gradient
│   │   └── fonts.css        # Font-face declarations
│   ├── utils/
│   ├── App.tsx              # Router + layout
│   └── main.tsx             # Entry point
├── CLAUDE.md
├── IVERSO_STORYBOARD.md
├── IVERSO_BUILD_PLAN.md
├── IVERSO_TRANSLATIONS.md
├── IVERSO_NAPLO.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── .gitignore
```

---

## Vizuális szabályok

### 3 szín — ennyi, semmi más
```css
--bg:      #0A0A0C;   /* fekete háttér */
--text:    #EDEDF0;   /* fehér szöveg */
--accent:  #F77F0A;   /* narancs akcentus */
--muted:   #88889A;   /* szürke másodlagos szöveg */
```

**NINCS más szín.** A szolgáltatásokat nem szín különbözteti meg, hanem az interaktív tartalom.

### Háttér
"Ultra mély" gradient — végig ugyanaz:
- Drámai narancs radial gradient felülről
- Több mélységi réteg, vignette, film grain, lélegző fény
- Közepes intenzitás, NEM reagál egérre

### Fontok
- **Syne** — display (címsorok, hero, CTA), weight: 600-800
- **DM Sans** — body (szövegtörzs), weight: 300-500
- IVERSO felirat: Syne, 800, narancs
- "Let's build something": Syne, 600, szürke — MINDIG angolul

### Ikonok
SVG thin line: 1.5px stroke, currentColor

### Emojik
**NINCSENEK** — sehol az oldalon, kivéve Amelia chat üzenetei (ő használhat)

---

## Komponens architektúra — 3 réteg

### 1. réteg: ui/ — Építőkockák (újrahasználható)
- `KpiCard` — többféle formátum (€, %, db, +/-), count-up animáció scroll-ra
- `ChatBubble` — bot (bal, sötét) / user (jobb, narancs), typing indicator (3 pulzáló pont)
- `WorkflowNode` — hover: tooltip, kattintás: kinyit, adat flow animáció (narancs glow)
- `MiniWebsite` — böngésző keret (macOS dot-ok), nyelvfüggő URL sáv
- `CompanySizeSlider` — húzós sáv, 4 szint, instant váltás (nincs animált átmenet)

### 2. réteg: demos/ — Főoldali előzetesek
- `DashboardPreview` → 2-3 KpiCard, gépen: folyamatos animáció, mobilon: statikus
- `AiChatPreview` → 1 ChatBubble + typing, gépen: loop, mobilon: statikus
- `AutomationPreview` → 3 WorkflowNode + adat flow, gépen: folyamatos, mobilon: statikus
- `WebsitePreview` → 1 MiniWebsite + progresszív betöltés

### 3. réteg: pages/ — Aloldalak
- `Dashboards` → KpiCard-ok + CompanySizeSlider + sidebar + táblázat
- `AI` → ChatBubble-ök + input + gyorsválasz gombok + beállítás panel
- `Automation` → WorkflowNode-ok + SVG vonalak + slider szintenként más node szám
- `Websites` → MiniWebsite + konfigurátor (4 tab: Alap, Tartalom, Layout, Effekt)

---

## Főoldal — 7 jelenet

1. **PARÁZS** — Three.js (gép) / Canvas 2D (mobil), hover+kattintás interakció
2. **IVERSO FELIRAT** — depth fade animáció, parázs halványul de marad
3. **4 DEMÓ ELŐZETES** — stagger rise, "Tovább →" morph animáció aloldalra
4. **FOLYAMAT** — 4 node (Beszélgetés→Tervezés→Építés→Átadás), node sequence animáció
5. **ÉPÍTŐS** — 8+ drag/tap blokk, morph → mini dashboard, block drop animáció
6. **CTA** — Amelia buborék (random mondat), glow reveal + bubble pop
7. **FOOTER** — Impressum + Adatvédelem + ©, simple fade

### Scroll animációk
- Intersection Observer, threshold 0.15, egyszer triggerelődik
- Visszagörgetésre NEM resetelődik
- Reduced motion: egyszerűsített animációk (prefers-reduced-motion)

### Navigáció
- Hero-nál: NINCS nav — csak nyelvváltó jobb felül
- Scrollra: nav besúszik felülről
- Visszagörgetés hero-hoz: nav eltűnik

---

## Aloldalak közös struktúrája

```
1. Sub-hero (tag badge + cím + alcím + radial gradient)
2. CompanySizeSlider (mind a 4 szolgáltatás aloldalon!)
3. Interaktív demó (böngésző keretben)
4. CTA ("Érdekel?" → /kapcsolat)
5. Footer
```

### Háttér — aloldalak
Ugyanaz a parázs rendszer mint a hero, de visszafogottabb (intensity paraméter).
- Gépen: Three.js (gyenge)
- Mobilon: Canvas 2D (gyenge)

### CompanySizeSlider szintek (mind a 4 aloldalon)
1. Egyedül
2. Kis csapat
3. Több részleg
4. Komoly szervezet

---

## Háromnyelvűség

- Alapnyelv: magyar (HU)
- Fordítások: német (DE) + angol (EN)
- Nyelvváltás: automatikus böngésző nyelv + váltó gomb
- "Let's build something" — MINDIG angolul
- Demók tartalma nyelvfüggő (cégnevek: HU/DE/EN)
- Fordítások: lásd IVERSO_TRANSLATIONS.md

---

## Amelia

Karakter, nem "chatbot". Főoldalon ízelítő (random mondat + gomb), /kapcsolat-on teljes chat.
- Személyiség: ironikus, szókimondó, "hatalmas forma"
- Először magáz, átvált tegezésre ha a látogató is tegez
- Valódi AI (API hívás) — provider még nem eldöntött
- Átadás Norbinak: email értesítés
- Részletek: IVERSO_STORYBOARD.md 6. jelenet

---

## Nyitott kérdések — NE dönts helyette!

- [ ] Amelia AI provider (OpenAI / Anthropic / más)
- [ ] Impressum + Adatvédelem tartalom
- [ ] Cookie-Banner implementáció

---

## Szabályaid

### MINDIG
1. Csináld amit Norbi kér — se többet, se kevesebbet
2. Ha nem egyértelmű → kérdezz vissza
3. `npm run build` hiba nélkül a végén
4. `npm run dev` → ellenőrizd hogy betölt, nincs console error
5. CSS Modules — minden komponensnek saját .module.css
6. TypeScript — típusok mindenhol
7. "Ne nyúlj hozzá" → NE nyúlj hozzá

### SOHA NE
1. Ne hagyj `console.log`-ot
2. Ne változtass fájlokat amit nem kértek
3. Ne telepíts dependency-t amit nem kértek
4. Ne használj emojit az oldalon (kivéve Amelia chat üzenetei)
5. Ne dönts a nyitott kérdésekben
6. Ne találj ki dolgokat amik nincsenek a storyboardban
7. Ne használj más színt mint a 3 (+szürke) megadott szín

---

## Implementációs sorrend

Lásd: IVERSO_BUILD_PLAN.md

① Alap → ② Háttér+Hero → ③ Komponensek → ④ Főoldal → ⑤ Aloldalak → ⑥ Amelia → ⑦ Polish

---

*Az IVERSO_STORYBOARD.md a projekt bibliája. Ha kérdésed van, ott a válasz. Ha ott sincs — kérdezd Norbit.*
