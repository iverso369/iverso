# IVERSO — Építési terv (fázisok)

## Alapelv

Minden szekció **önálló komponens** — saját mappában, saját stílusokkal.
Ha az egyiket módosítod, a többi nem törik el.

### Három réteg

```
src/
├── components/
│   ├── ui/                  ← ÉPÍTŐKOCKÁK (újrahasználható mindenhol)
│   │   ├── KpiCard.tsx              ← 1 KPI kártya
│   │   ├── ChatBubble.tsx           ← 1 chat buborék
│   │   ├── WorkflowNode.tsx         ← 1 workflow node
│   │   ├── MiniWebsite.tsx          ← 1 mini weboldal frame
│   │   └── CompanySizeSlider.tsx    ← "Mekkora a vállalkozásod?" slider
│   │
│   ├── hero/                ← főoldal hero (önálló)
│   ├── demos/               ← főoldal előzetesek
│   │   ├── DashboardPreview.tsx   ← 2-3 KpiCard + animáció
│   │   ├── AiChatPreview.tsx      ← 1 ChatBubble + typing
│   │   ├── AutomationPreview.tsx  ← 3 WorkflowNode + flow
│   │   └── WebsitePreview.tsx     ← 1 MiniWebsite + loader
│   ├── process/
│   ├── builder/
│   ├── cta/
│   └── footer/
│
├── layouts/
│   └── SubpageLayout.tsx    ← közös aloldal keret (gradient, nav, vissza)
│
├── pages/                   ← OLDALAK (összerakják a komponenseket)
│   ├── Home.tsx                 ← főoldal (7 szekció)
│   ├── Dashboards.tsx           ← sok KpiCard + CompanySizeSlider + sidebar
│   ├── AI.tsx                   ← sok ChatBubble + input + beállítás panel
│   ├── Automation.tsx           ← 6 WorkflowNode + SVG vonalak + animáció
│   ├── Websites.tsx             ← MiniWebsite + konfigurátor
│   ├── Process.tsx              ← 4 node részletesen
│   ├── Contact.tsx              ← Amelia teljes chat
│   ├── Impressum.tsx
│   └── Privacy.tsx
│
└── hooks/
    ├── useIsMobile.ts       ← mobil/desktop detektálás
    └── useIntersectionObserver.ts  ← scroll animációkhoz
```

### Hogyan működik a három réteg?

**ui/** — az építőkockák. Egy KpiCard, egy ChatBubble, stb.
Ezekből rakja össze a főoldali előzetes a maga 2-3 darabot,
és az aloldal a maga 10 darabot. Ugyanaz a komponens, más kontextus.

```
KpiCard.tsx (1 kártya — szín, szám, label, animáció)
    │
    ├── DashboardPreview.tsx (főoldal) → 2-3 KpiCard, kis méret
    │
    └── Dashboards.tsx (aloldal) → 8-10 KpiCard + CompanySizeSlider
```

Ha módosítod a KpiCard kinézetét → mindenhol frissül.
Ha módosítod a Dashboard aloldalt → az előzetes nem törik el.

### SubpageLayout — közös aloldal keret

Minden aloldal ugyanazt a keretet kapja, de az akcentus szín más:

```tsx
<SubpageLayout accentColor="--ai">    ← lila radial gradient
<SubpageLayout accentColor="--dash">  ← kék radial gradient
<SubpageLayout accentColor="--web">   ← cyan radial gradient
<SubpageLayout accentColor="--auto">  ← narancs radial gradient
```

**"Fading Ember" elv:** Aloldalak NEM kapnak particle effekteket.
Radial gradient az adott szolgáltatás színében, felülről.

### Főoldal összerakás

```tsx
<Hero />
<Intro />
<DemoPreviews />
<Process />
<Builder />
<CTA />
<Footer />
```

---

## Mobil vs Desktop — nem két oldal, hanem okos komponensek

```
┌─────────────────────────────────────────────────┐
│  EGY kódbázis                                   │
│                                                 │
│  Komponens                                      │
│    ├── közös logika (mindig ugyanaz)             │
│    ├── desktop viselkedés (hover, több particle) │
│    └── mobil viselkedés (touch, egyszerűbb)      │
│                                                 │
│  Eszközök:                                      │
│    • CSS: mobile-first + @media (min-width)     │
│    • Hook: useIsMobile() → true/false           │
│    • Canvas: particleCount = isMobile ? 80 : 200│
└─────────────────────────────────────────────────┘
```

### Mi más mobilon vs gépen? (storyboard alapján)

| Elem | Gép | Mobil |
|------|-----|-------|
| Hero parázs | Hover erősödik + kattintás robban | Touch/tap robban |
| Hero részecskék | Több, nagyobb | Kevesebb, kisebb |
| Demó előzetesek | Folyamatosan élnek (animálódnak) | Belépő animáció, utána statikus |
| Demó → aloldal | Fancy expand morph | Smooth slide-up |
| Építős szekció | Drag & drop | Tap = lerakás |
| Nav | Scroll-ra besúszik | Hamburger menü |

---

## Fázisok

### 0. fázis — ALAP (már kész ✅)
- [x] Vite + React + TypeScript
- [x] Router (9 route)
- [x] i18n alap (hu/de/en üres JSON-ok)
- [x] Projekt struktúra
- [x] GitHub + Vercel

### 1. fázis — GLOBÁLIS ALAP
**Mit:** Ami az egész oldalon végig ugyanaz.
**Miért először:** Minden más erre épül.

- [ ] Global CSS reset + változók (3 szín + szolgáltatás színek, fontok)
- [ ] Google Fonts betöltés (Syne + DM Sans)
- [ ] "Ultra mély" gradient háttér (az egész oldal mögött)
- [ ] useIsMobile() hook (breakpoint: 768px)
- [ ] useIntersectionObserver() hook (scroll animációkhoz)
- [ ] SubpageLayout komponens (radial gradient háttér szolgáltatás színben, nav, vissza gomb)

**Eredmény:** Üres fekete oldal, gradient háttérrel, jó fontokkal, aloldal keret kész.

### 2. fázis — HERO (parázs)
**Mit:** A teljes hero szekció — az első amit a látogató lát.
**Miért másodszor:** Ez az oldal arca, ezen áll vagy bukik az első benyomás.

- [ ] Canvas 2D parázs részecske rendszer
- [ ] IVERSO felirat + "Let's build something" fade-in
- [ ] Interakciók: hover erősödés, kattintás/tap robbanás
- [ ] Mobil optimalizáció (kevesebb particle, touch)
- [ ] Scroll-ra parázs halványul (2. jelenet átmenet)

**Eredmény:** Megnyitod az oldalt → parázs hero él, reagál.

### 3. fázis — INTRO + NAVIGÁCIÓ
**Mit:** A 2. jelenet (IVERSO felirat depth fade) + scroll-aware nav.

- [ ] 2. jelenet: IVERSO + "Let's build something" — depth fade animáció
- [ ] Nav: hero-nál rejtett, scroll-ra besúszik, visszagörgetésre eltűnik
- [ ] Nyelvváltó gomb (hero-nál egyedül, nav-ban is)
- [ ] Mobil nav (hamburger)

**Eredmény:** Scrollozva az IVERSO felirat megjelenik, nav besúszik.

### 4. fázis — UI ÉPÍTŐKOCKÁK
**Mit:** A közös komponensek amiket a főoldal ÉS az aloldalak is használnak.
**Miért itt:** Az 5. és 6. fázis (előzetesek + aloldalak) mindkettő ezeket használja.

- [ ] KpiCard komponens (szám, label, szín, animáció props)
- [ ] ChatBubble komponens (bot/user, tartalom, typing state)
- [ ] WorkflowNode komponens (ikon, cím, aktív state, popup)
- [ ] MiniWebsite komponens (böngésző keret, 3 dot, URL sáv, tartalom slot)
- [ ] CompanySizeSlider komponens (4 szint, onChange callback)

**Eredmény:** Minden építőkocka kész, tesztelve önmagában.

### 5. fázis — 4 MINI DEMÓ ELŐZETES (főoldal)
**Mit:** A 4 demó kártya a főoldalon — az ui/ kockákat használják.

- [ ] DashboardPreview (2-3 KpiCard + szám animáció + bar chart)
- [ ] AiChatPreview (ChatBubble + typing indicator, loop)
- [ ] AutomationPreview (3 WorkflowNode + adat flow animáció)
- [ ] WebsitePreview (MiniWebsite + progresszív betöltés)
- [ ] Stagger rise scroll animáció
- [ ] "Tovább →" gomb mindegyiken (egyelőre sima link, morph később)
- [ ] Mobil: belépő animáció, utána statikus
- [ ] Gép: folyamatos animáció amíg látható

**Eredmény:** Scrollozva 4 élő kártya jelenik meg, mindegyik kattintható.

### 6. fázis — FOLYAMAT + ÉPÍTŐS + CTA + FOOTER
**Mit:** A maradék 4 szekció a főoldalon.

- [ ] Folyamat: 4 node (Beszélgetés → Tervezés → Építés → Átadás)
- [ ] Építős: drag/tap blokkok + morph animáció
- [ ] CTA: Amelia ízelítő buborék + gomb
- [ ] Footer: Impressum + Adatvédelem linkek
- [ ] Scroll animációk mindegyikhez

**Eredmény:** A teljes főoldal scrollozható, minden szekció él.

### 7. fázis — ALOLDALAK (egyenként)
**Mit:** A szolgáltatás aloldalak, az ui/ kockákat használva.
**Fontos:** Egyszerre EGYET csinálunk, nem mind a 4-et!

Minden aloldal ugyanazt a struktúrát követi:
1. Sub-hero (tag + cím + alcím + radial gradient)
2. CompanySizeSlider / konfigurátor
3. Interaktív demó (böngésző keretben)
4. Szöveges szekció
5. CTA + Footer

Sorrend:
- [ ] /dashboardok — KpiCard-ok + CompanySizeSlider (4 szint) + sidebar + táblázat
- [ ] /ai — ChatBubble-ök + gyorsválasz gombok + beállítás panel (iparág, hangnem, nyelv)
- [ ] /automatizacio — 6 WorkflowNode + SVG vonalak + "Workflow indítása" animáció
- [ ] /weboldalak — konfigurátor (stílus/szín/iparág/layout) + élőben változó MiniWebsite
- [ ] /folyamat — 4 node részletesen kifejtve
- [ ] Morph animáció: főoldal előzetes → aloldal átmenet

### 8. fázis — AMELIA
**Mit:** A /kapcsolat oldal teljes AI chat.

- [ ] Chat felület
- [ ] Amelia karakter (avatár, személyiség)
- [ ] AI API bekötés
- [ ] Gyorsválasz gombok + szabad input

### 9. fázis — LOADING + INTRO
**Mit:** A 2 mp-es intro animáció.
**Miért utoljára:** Nem blokkolja a fejlesztést, és kell hogy a hero kész legyen hozzá.

- [ ] IVERSO logó + szikrák
- [ ] Szikrák → felgyűlnek → IVERSO felirat → hero átmenet

### 10. fázis — i18n + JOGI
**Mit:** Fordítások + kötelező oldalak.

- [ ] Magyar szövegek véglegesítése
- [ ] Német fordítás
- [ ] Angol fordítás
- [ ] Demó tartalmak nyelvenként (magyar cégek, német cégek, angol cégek)
- [ ] /impressum tartalom (Nebengewerbe)
- [ ] /adatvedelem tartalom (Datenschutz)

### 11. fázis — POLISHING
- [ ] Performance optimalizáció (lazy loading, code splitting)
- [ ] Accessibility alap (aria labels, keyboard nav)
- [ ] iverso.info domain bekötés
- [ ] OG meta tags (social sharing)
- [ ] Final tesztelés (mobil + gép + több böngésző)

---

## Szabályok a fejlesztéshez

### Egy fázist TELJESEN befejezni mielőtt a következőre lépsz
- Nem ugrálunk fázisok között
- Minden fázis végén: `npm run build` hiba nélkül + mobil teszt

### Minden komponens önálló
```
src/components/hero/
  ├── Hero.tsx              ← a komponens
  ├── Hero.module.css       ← csak a hero stílusai
  ├── useParticles.ts       ← csak a hero hook-ja
  └── particles.ts          ← csak a hero segédfüggvénye
```
Ha a hero-t módosítod, CSAK ebben a mappában dolgozol.

### Claude Code-nak mindig mondd el melyik fázisban vagy
```
"4. fázisban vagyunk (UI építőkockák). Csak az ui/ mappával foglalkozz."
```
Ez megakadályozza hogy más fájlokhoz nyúljon.

---

## A legfontosabb: mikor mit hol csinálj

| Feladat | Hol csináld |
|---------|------------|
| Hero parázs fejlesztés | VS Code (gépen kell látni) |
| Canvas finomhangolás | VS Code |
| Drag & drop építős | VS Code |
| Mobil tesztelés | Vercel preview + telefon böngésző |
| Szöveg/szín/spacing fix | Claude Code telefonról OK |
| i18n fordítások | Claude Code telefonról OK |
| CSS kisebb módosítások | Claude Code telefonról OK |
| Új üres komponens | Claude Code telefonról OK |
| UI építőkockák logika | Claude Code telefonról OK |
| Aloldal struktúra/layout | Claude Code telefonról OK (ha nem vizuális) |
