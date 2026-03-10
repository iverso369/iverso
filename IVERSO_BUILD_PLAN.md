# IVERSO — Build Plan (Implementáció)

> Utolsó frissítés: 2026.03.09

---

## Alapelv

Minden fázis önmagában működik. Ha megállunk bármelyik után, van valami ami fut.
Ami másnak a függősége, az készül először.

---

## ① ALAP ✅ KÉSZ

**Mit:** Projekt inicializálás, minden ami kell ahhoz hogy bármi megjelenjen.

**Tartalmazza:**
- Vite + React + TypeScript projekt
- react-router-dom (routing: /, /dashboardok, /ai, /automatizacio, /weboldalak, /tudnivalok, /kapcsolat, /impressum, /adatvedelem)
- CSS változók (3 szín + szürke, fontok)
- Roboto 700 + DM Sans 400/500 fontok betöltése (self-hosted woff2, GDPR)
- react-i18next váz (HU/DE/EN, JSON fájlok, böngésző nyelv detekció + váltó)
- Global CSS (reset, háttér szín, alapok)
- Mappa struktúra (components/, pages/, layouts/, hooks/, i18n/, styles/, utils/)
- Vercel config (SPA fallback)

**Eredmény:** Üres oldal ami routol, van színe és fontja.

---

## ② HÁTTÉR + HERO ✅ KÉSZ

**Mit:** Az első amit a látogató lát.

**Tartalmazza:**
- Naplemente stílusú gradient háttér (narancs fényoszlop középen, barna mélység, vignette széleken)
- Canvas 2D particle háttér (radial gradient sprite + additív blending, mindig fut)
- Parázs particle rendszer (Three.js hero — gépen)
- IVERSO felirat + "Let's build something"
- Hover/kattintás/tap interakciók
- Custom kurzor (narancssárgás pont + trail)

**Eredmény:** Teljes képernyős parázs hero ami él és reagál + atmoszférikus háttér.

---

## ③ KÖZÖS KOMPONENSEK (ui/) ✅ KÉSZ

**Mit:** Az építőkockák amiket mindenhol használunk.

**Tartalmazza:**
- KpiCard (számformátumok, count-up animáció)
- ChatBubble (bot/user, typing indicator, avatár)
- WorkflowNode (tooltip, kinyit, adat flow animáció)
- MiniWebsite (böngésző keret, macOS dot-ok, nyelvfüggő domain)
- CompanySizeSlider (húzós sáv, 4 szint, instant váltás)
- DemoCard (egységes preview kártya keret)

**Eredmény:** 6 újrahasználható komponens, tesztelve különböző méretekben.

---

## ④ FŐOLDAL (6 jelenet) 🔄 FOLYAMATBAN

**Mit:** A teljes scroll élmény.

**Tartalmazza:**
- Nav (gépen mindig látható, 1350px alatt hamburger)
- Nyelvváltó (3 gomb: HU EN DE)
- 6 jelenet komponensei:
  1. Parázs hero (②-ből megvan)
  2. IVERSO felirat (depth fade animáció)
  3. 4 mini demó előzetes (③ komponenseiből, stagger rise)
  4. Építős szekció (drag/tap blokkok, morph, block drop)
  5. CTA/Amélia ízelítő (glow reveal, bubble pop)
  6. Footer (simple fade)
- Intersection Observer scroll animációk (threshold 0.15, egyszer)
- Tartalmi szövegek HU/DE/EN (preview kártyák alatt)

**Eredmény:** Teljes scroll élmény, 6 jelenet, animációkkal.

---

## ⑤ ALOLDALAK ⬜

**Mit:** A részletes szolgáltatás oldalak + jogi + tudnivalók.

**Tartalmazza:**
- SubpageLayout (közös keret: gradient háttér, nav, vissza, particles)
- /dashboardok (sidebar, KPI kártyák, táblázat, slider szintek)
- /ai (chat felület, 6 előre megírt válasz, gyorsválasz gombok, beállítás panel)
- /automatizacio (workflow vizualizáció, SVG vonalak, slider szintenként más node szám)
- /weboldalak (konfigurátor: 4 tab, iparág, preview, slider)
- /tudnivalok (kibővített bemutató: működés, lehetőségek, közös munka)
- /kapcsolat (Amélia placeholder — teljes chat UI, de még nincs AI mögötte)
- /impressum + /adatvedelem (egyszerű szöveges oldalak, tartalom később)

**Eredmény:** Teljes weboldal, minden aloldal működik (Amélia még placeholder).

---

## ⑥ AMELIA ⬜

**Mit:** Az AI chat integráció.

**Tartalmazza:**
- AI provider integráció (API hívás — provider később döntjük el)
- Amélia személyiség/system prompt
- Nyelvfüggő stílus (tegez, önirónia, Norbi-t szidja szeretettel)
- Email értesítés Norbinak ha konkrét az érdeklődő
- Főoldali random Amelia mondatok (10 db HU/DE/EN, lásd AMELIA_MONDATOK.md)

**Eredmény:** Amélia él, beszélget, terel, értesít.

---

## ⑦ POLISH ⬜

**Mit:** Ráncfelvarrás a működő oldalra.

**Tartalmazza:**
- Performance (lazy loading, code splitting, WebP, font preload)
- Accessibility (aria labels, keyboard nav, skip to content, reduced motion)
- OG meta tags (nyelvfüggő, parázs hero screenshot)
- Cookie-Banner (ha analitika bekapcsolva)
- Impressum + Adatvédelem tartalom véglegesítése
- i18n fordítások véglegesítése (IVERSO_TRANSLATIONS.md alapján)
- Mobil Canvas 2D hero (useIsMobile hook + automatikus váltás)
- Loading intro (2 mp szikrás animáció → hero)

**Eredmény:** Kész, deployolható, profi weboldal.

---

## Fájlok

| Fájl | Tartalom |
|------|----------|
| IVERSO_STORYBOARD.md | A teljes terv — MIT csinálunk (a projekt bibliája) |
| IVERSO_NAPLO.md | Projekt állapot — HOL tartunk |
| IVERSO_TRANSLATIONS.md | Fordítások — HU/DE/EN szövegek |
| IVERSO_BUILD_PLAN.md | Ez a fájl — HOGYAN és MIKOR építjük |
| IVERSO_JAVITAS_TERV.md | Javítási feladatok és státuszuk |
| CLAUDE.md | Claude Code utasítások — implementációs guide |
| AMELIA_MONDATOK.md | Amelia random mondatok (10 db, HU/DE/EN) |
| P23_SZOVEGEK_HU.md | Főoldal tartalmi szövegek (HU) |
| P23_SZOVEGEK_DE_EN.md | Főoldal tartalmi szövegek (DE + EN) |
| RETEG_*_NAPLO.md | Rétegenkénti részletes naplók |
| Képernyőkép_*.png | Régi projekt referencia képek (NEM a jelenlegi oldal!) |
