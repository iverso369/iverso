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
Framework:        Vite + React (SPA)
Nyelv:            TypeScript
Styling:          CSS Modules
Routing:          react-router-dom
i18n:             react-i18next (HU/DE/EN)
Hero (gépen):     Three.js (3D parázs particle rendszer)
Hero (mobilon):   Canvas 2D (könnyebb, ugyanaz a hangulat)
Háttér particlek: Canvas 2D (radial gradient sprite + additív blending)
Scroll:           Intersection Observer API
Fontok:           Roboto 700 (display) + DM Sans 400/500 (body) — self-hosted woff2 (GDPR)
Deploy:           GitHub → Vercel (auto-deploy)
```

### Projekt struktúra
```
iverso/
├── public/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── ui/              # Közös építőkockák
│   │   │   ├── KpiCard.tsx (+.module.css)
│   │   │   ├── ChatBubble.tsx (+.module.css)
│   │   │   ├── WorkflowNode.tsx (+.module.css)
│   │   │   ├── MiniWebsite.tsx (+.module.css)
│   │   │   ├── CompanySizeSlider.tsx (+.module.css)
│   │   │   └── DemoCard.tsx (+.module.css)
│   │   ├── hero/            # Parázs hero (Three.js)
│   │   ├── background/      # BackgroundParticles (Canvas 2D, mindig fut)
│   │   ├── nav/             # Navigáció (gépen mindig látható)
│   │   ├── demos/           # 4 mini demó előzetes (főoldal)
│   │   │   ├── DashboardPreview.tsx
│   │   │   ├── AiChatPreview.tsx
│   │   │   ├── AutomationPreview.tsx
│   │   │   └── WebsitePreview.tsx
│   │   ├── process/         # Folyamat szekció (node-ok)
│   │   ├── builder/         # Építős interaktív szekció
│   │   ├── cta/             # Amélia ízelítő
│   │   └── footer/          # Footer
│   ├── layouts/
│   │   └── SubpageLayout.tsx  # Közös aloldal keret
│   ├── pages/
│   │   ├── Home.tsx         # Főoldal (7 jelenet scroll)
│   │   ├── Dashboards.tsx   # /dashboardok
│   │   ├── AI.tsx           # /ai
│   │   ├── Automation.tsx   # /automatizacio
│   │   ├── Websites.tsx     # /weboldalak
│   │   ├── GoodToKnow.tsx   # /tudnivalok (korábban /folyamat)
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
├── IVERSO_JAVITAS_TERV.md
├── RETEG_1_NAPLO.md
├── RETEG_2_NAPLO.md
├── RETEG_3_NAPLO.md
├── RETEG_4_NAPLO.md
├── Képernyőkép_*.png        # Régi projekt referencia képek (nem az aktuális oldal!)
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
Naplemente stílusú gradient:
- Narancs fényoszlop középen (a kártyák szélességében)
- Barna mélység mögötte, széles szétterülés
- Vignette a széleken (75%-tól halványodik, 93%-nál fekete)
- background-attachment: fixed
- NEM reagál egérre

Canvas 2D particle háttér felette:
- BackgroundParticles.tsx — position: fixed, z-index: 1, pointer-events: none
- Radial gradient sprite-ok + additív blending (globalCompositeOperation: 'lighter')
- Szín szinkronban a Three.js hero palettájával
- Mindig fut, minden oldalon

### Fontok
- **Roboto 700** — display (címsorok, hero, CTA, nav)
- **DM Sans** — body (szövegtörzs), weight: 400-500
- IVERSO felirat: Three.js parázs particle rendszer (nem CSS font)
- "Let's build something": Roboto 700, szürke — MINDIG angolul
- IVERSO navbar logó: 2.3rem, #D96A08 (sötétebb narancs)

### Ikonok
SVG thin line: 1.5px stroke, currentColor

### Emojik
**NINCSENEK** — sehol az oldalon, kivéve Amélia chat üzenetei (ő használhat)

---

## Komponens architektúra — 3 réteg

### 1. réteg: ui/ — Építőkockák (újrahasználható)
- `KpiCard` — többféle formátum (€, %, db, +/-), count-up animáció scroll-ra
- `ChatBubble` — bot (bal, sötét) / user (jobb, narancs), typing indicator (3 pulzáló pont)
- `WorkflowNode` — hover: tooltip, kattintás: kinyit, adat flow animáció (narancs glow)
- `MiniWebsite` — böngésző keret (macOS dot-ok), nyelvfüggő URL sáv
- `CompanySizeSlider` — húzós sáv, 4 szint, instant váltás (nincs animált átmenet)
- `DemoCard` — egységes preview kártya keret (split grid layout, info blokk: cím+alcím+leírás+Tovább, demo blokk, váltakozó pozíció, 4 variáció: info-left/right + wide-demo/normal)

### 2. réteg: demos/ — Főoldali előzetesek
- `DashboardPreview` → sidebar + KPI kártyák + táblázat, 5 oldalas ciklikus animáció
- `AiChatPreview` → két panel (külső + belső chatbot), gyorsválasz gombok, input
- `AutomationPreview` → 4 WorkflowNode + adat flow animáció
- `WebsitePreview` → világos krém pékség téma (saját paletta, Lora font)

### 3. réteg: pages/ — Aloldalak
- `Dashboards` → KpiCard-ok + CompanySizeSlider + sidebar + táblázat
- `AI` → ChatBubble-ök + input + gyorsválasz gombok + beállítás panel
- `Automation` → WorkflowNode-ok + SVG vonalak + slider szintenként más node szám
- `Websites` → MiniWebsite + konfigurátor (4 tab: Alap, Tartalom, Layout, Effekt)

---

## Főoldal — 6 jelenet

1. **PARÁZS** — Three.js (gép) / Canvas 2D (mobil), hover+kattintás interakció
2. **IVERSO FELIRAT** — depth fade animáció, parázs halványul de marad
3. **4 DEMÓ ELŐZETES** — DemoCard split layout, sorrend: Dashboard→Weboldal→AI→Automatizáció, demo pozíció: JOBB→BAL→JOBB→BAL
4. **ÉPÍTŐS** — Parázs kockák behúzása rácsba → kockák pontokká → hálózat terjeszkedés (új kockák közben) → középről kifelé 3D parázs particle FÖLDGÖMB (kontinensek!). Bal klikk: rombolódik. Jobb klikk: szétrobban. Ha nem interaktál: automatikusan lefut.
5. **CTA** — Amélia buborék (random mondat), glow reveal + bubble pop (közvetlenül a földgömb alatt)
6. **FOOTER** — Impressum + Adatvédelem + ©, simple fade

### Scroll animációk
- Intersection Observer, threshold 0.15, egyszer triggerelődik
- Visszagörgetésre NEM resetelődik
- Reduced motion: egyszerűsített animációk (prefers-reduced-motion)

### Navigáció
- **Gépen: MINDIG látható** (scroll-aware kikapcsolva)
- Menüpontok: Dashboardok · AI · Automatizáció · Weboldalak · Tudnivalók | Kapcsolat | HU EN DE
- Szolgáltatások kibontva (nincs dropdown)
- Kapcsolat gomb: E stílus (outline + halvány narancs tint + shadow)
- Nyelvváltó: 3 külön gomb (HU EN DE), nem dropdown
- **1350px alatt:** hamburger menü (fullscreen overlay)
- Mobilon: hamburger → overlay (menüpontok + nyelvváltó)

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
Canvas 2D particle háttér + naplemente gradient (ugyanaz mint a főoldalon).

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

## Amélia

Karakter, nem "chatbot". Főoldalon ízelítő (random mondat + gomb), /kapcsolat-on teljes chat.
- Személyiség: ironikus, szókimondó, "hatalmas forma"
- Önirónia, saját helyzetéről mesél, színfalak mögötti bepillantás
- Norbi-t szidja szeretettel, pozitív hangulat
- Emojik: csak arckifejezések (😂😅😌😤🙄🥲), csak mondatok végén
- Tegez
- Nem sales, nem manipulál
- Először magáz, átvált tegezésre ha a látogató is tegez
- Valódi AI (API hívás) — provider még nem eldöntött
- Átadás Norbinak: email értesítés
- 10 véletlenszerű mondat HU/DE/EN (lásd AMELIA_MONDATOK.md)
- Részletek: IVERSO_STORYBOARD.md 6. jelenet

---

## Szövegírási stílus

- **Általános:** Semleges, tárgyilagos, hétköznapi nyelv. NEM sales, NEM személyeskedés, NEM kérdések, NEM feltételes mód, NEM manipuláció. Folyó szöveg, nem felsorolás. "Lexikonszerű de nem száraz."
- **Amélia:** Lásd fent.

---

## Nyitott kérdések — NE dönts helyette!

- [ ] Amélia AI provider (OpenAI / Anthropic / más)
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
8. Minden elem reszponzív legyen a böngésző ablak méretéhez — ha kicsinyítve van az ablak, az oldal igazodjon hozzá. Fix pixel méretek helyett használj clamp(), vw, %, flex-shrink, min-width: 0 megoldásokat.

### SOHA NE
1. Ne hagyj `console.log`-ot
2. Ne változtass fájlokat amit nem kértek
3. Ne telepíts dependency-t amit nem kértek
4. Ne használj emojit az oldalon (kivéve Amélia chat üzenetei)
5. Ne dönts a nyitott kérdésekben
6. Ne találj ki dolgokat amik nincsenek a storyboardban
7. Ne használj más színt mint a 3 (+szürke) megadott szín

---

## Referencia képek

A repo gyökerében lévő `Képernyőkép_*.png` fájlok a **régi projektből** származnak. Ezek vizuális referenciaként szolgálnak — az IVERSO parázs felirat, az izzó hatás, a hover interakció kinézetéhez. **NEM a jelenlegi oldal képernyőképei.**

---

## Implementációs sorrend

Lásd: IVERSO_BUILD_PLAN.md

① Alap → ② Háttér+Hero → ③ Komponensek → ④ Főoldal → ⑤ Aloldalak → ⑥ Amélia → ⑦ Polish

---

*Az IVERSO_STORYBOARD.md a projekt bibliája. Ha kérdésed van, ott a válasz. Ha ott sincs — kérdezd Norbit.*
