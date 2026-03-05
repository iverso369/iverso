# IVERSO — Build Plan (Implementáció)

> Utolsó frissítés: 2026.02.28

---

## Alapelv

Minden fázis önmagában működik. Ha megállunk bármelyik után, van valami ami fut.
Ami másnak a függősége, az készül először.

---

## ① ALAP

**Mit:** Projekt inicializálás, minden ami kell ahhoz hogy bármi megjelenjen.

**Tartalmazza:**
- Vite + React + TypeScript projekt
- react-router-dom (routing: /, /dashboardok, /ai, /automatizacio, /weboldalak, /folyamat, /kapcsolat, /impressum, /adatvedelem)
- CSS változók (3 szín + szürke, fontok)
- Syne + DM Sans fontok betöltése
- react-i18next váz (HU/DE/EN, JSON fájlok, böngésző nyelv detekció + váltó)
- Global CSS (reset, háttér szín, alapok)
- Mappa struktúra (components/, pages/, layouts/, hooks/, i18n/, styles/, utils/)
- Vercel config (SPA fallback)

**Miért először:** Minden erre épül.

**Eredmény:** Üres oldal ami routol, van színe és fontja.

---

## ② HÁTTÉR + HERO

**Mit:** Az első amit a látogató lát.

**Tartalmazza:**
- "Ultra mély" gradient háttér (radial gradient, vignette, film grain, lélegző fény)
- Parázs particle rendszer:
  - Gépen: Three.js
  - Mobilon: Canvas 2D
  - Automatikus váltás (useIsMobile hook)
  - Intensity paraméter (hero: erős, aloldalak: gyenge)
- IVERSO felirat + "Let's build something"
- Hover/kattintás/tap interakciók
- Loading intro (2 mp szikrás animáció → hero)

**Miért másodszor:** Ez az identitás — ha ez nem működik, semmi más nem számít.

**Eredmény:** Teljes képernyős parázs hero ami él és reagál.

---

## ③ KÖZÖS KOMPONENSEK (ui/)

**Mit:** Az építőkockák amiket mindenhol használunk.

**Tartalmazza:**
- KpiCard (számformátumok, count-up animáció)
- ChatBubble (bot/user, typing indicator, avatár)
- WorkflowNode (tooltip, kinyit, adat flow animáció)
- MiniWebsite (böngésző keret, macOS dot-ok, nyelvfüggő domain)
- CompanySizeSlider (húzós sáv, 4 szint, instant váltás)

**Miért harmadszor:** A főoldal ÉS az aloldalak is ezekből épülnek — ha ezek készek, mindkettő gyorsabban megy.

**Eredmény:** 5 újrahasználható komponens, tesztelve különböző méretekben.

---

## ④ FŐOLDAL (7 jelenet)

**Mit:** A teljes scroll élmény.

**Tartalmazza:**
- Nav (scroll-aware: nincs hero-nál, megjelenik scrollra, eltűnik vissza)
- Nyelvváltó gomb
- 7 jelenet komponensei:
  1. Parázs hero (②-ből megvan)
  2. IVERSO felirat (depth fade animáció)
  3. 4 mini demó előzetes (③ komponenseiből, stagger rise)
  4. Folyamat 4 node (node sequence animáció)
  5. Építős szekció (drag/tap blokkok, morph, block drop)
  6. CTA/Amelia ízelítő (glow reveal, bubble pop)
  7. Footer (simple fade)
- Intersection Observer scroll animációk (threshold 0.15, egyszer)
- Morph animáció demó → aloldal átmenet

**Miért negyedszer:** Ez a fő élmény. Ha ez kész, van egy működő főoldal.

**Eredmény:** Teljes scroll élmény, 7 jelenet, animációkkal.

---

## ⑤ ALOLDALAK

**Mit:** A részletes szolgáltatás oldalak + jogi + folyamat.

**Tartalmazza:**
- SubpageLayout (közös keret: gradient háttér, nav, vissza, particles)
- /dashboardok (sidebar, KPI kártyák, táblázat, slider szintek)
- /ai (chat felület, 6 előre megírt válasz, gyorsválasz gombok, beállítás panel)
- /automatizacio (workflow vizualizáció, SVG vonalak, slider szintenként más node szám)
- /weboldalak (konfigurátor: 4 tab, iparág, preview, slider)
- /folyamat (4 lépés részletesen, interaktív node-ok)
- /kapcsolat (Amelia placeholder — teljes chat UI, de még nincs AI mögötte)
- /impressum + /adatvedelem (egyszerű szöveges oldalak, tartalom később)

**Miért ötödször:** A főoldalról nyílnak, a közös komponensek már megvannak.

**Eredmény:** Teljes weboldal, minden aloldal működik (Amelia még placeholder).

---

## ⑥ AMELIA

**Mit:** Az AI chat integráció.

**Tartalmazza:**
- AI provider integráció (API hívás — provider később döntjük el)
- Amelia személyiség/system prompt
- Nyelvfüggő stílus (HU tegez/magáz, DE/EN)
- Email értesítés Norbinak ha konkrét az érdeklődő
- Főoldali random Amelia mondatok

**Miért hatodszor:** API kell hozzá, ez a legkomplexebb — a weboldal nélküle is működik.

**Eredmény:** Amelia él, beszélget, terel, értesít.

---

## ⑦ POLISH

**Mit:** Ráncfelvarrás a működő oldalra.

**Tartalmazza:**
- Performance (lazy loading, code splitting, WebP, font preload)
- Accessibility (aria labels, keyboard nav, skip to content, reduced motion)
- OG meta tags (nyelvfüggő, parázs hero screenshot)
- Cookie-Banner (ha analitika bekapcsolva)
- Impressum + Adatvédelem tartalom véglegesítése
- i18n fordítások véglegesítése (IVERSO_TRANSLATIONS.md alapján)
- Háttér gradient + animáció finomhangolás

**Miért utoljára:** Működő oldalra kerül, nem félkészre.

**Eredmény:** Kész, deployolható, profi weboldal.

---

## Fájlok

| Fájl | Tartalom |
|------|----------|
| IVERSO_STORYBOARD.md | A teljes terv — MIT csinálunk (a projekt bibliája) |
| IVERSO_NAPLO.md | Projekt állapot — HOL tartunk |
| IVERSO_TRANSLATIONS.md | Fordítások — HU/DE/EN szövegek |
| IVERSO_BUILD_PLAN.md | Ez a fájl — HOGYAN és MIKOR építjük |
| CLAUDE.md | Claude Code utasítások — implementációs guide |
