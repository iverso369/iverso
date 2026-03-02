# Réteg 1 — Alap (Napló)

> Utolsó frissítés: 2026.03.02

---

## Mit tartalmaz ez a réteg

Projekt inicializálás — minden ami kell ahhoz hogy bármi megjelenjen.

| # | Feladat | Állapot |
|---|---------|---------|
| 1 | Vite + React + TypeScript projekt | ✅ kész |
| 2 | Mappa struktúra (CLAUDE.md szerint) | ✅ kész |
| 3 | react-router-dom (9 route, lazy loading előkészítve) | ✅ kész |
| 4 | CSS változók (3 szín + szürke, fontok) | ✅ kész |
| 5 | Syne + DM Sans fontok (self-hosted, woff2) | ✅ kész |
| 6 | Global CSS (reset, háttér — teljes "ultra mély" gradient) | ✅ kész |
| 7 | react-i18next váz (HU/DE/EN, namespace-es JSON, nyelv detekció + váltó) | ✅ kész |
| 8 | Vercel config (SPA fallback) | ✅ kész |

**✅ RÉTEG 1 KÉSZ — minden feladat végrehajtva, build hibátlan.**

---

## Döntések

| Dátum | Döntés |
|-------|--------|
| 03.02 | Fontok: self-hosted (nem Google Fonts CDN) — GDPR kompatibilis, gyorsabb |
| 03.02 | Routing: React.lazy + Suspense már most előkészítve (nem a 7. rétegben) |
| 03.02 | i18n: namespace-ekre bontott JSON fájlok (nav, hero, dashboards, ai, stb.) — könnyebb karbantartás, később lazy loadolható |
| 03.02 | CSS háttér: teljes "ultra mély" gradient most bekerül (radial gradient, vignette, film grain, lélegző fény) — finomhangolás később gépen, de a struktúra most |
| 03.02 | Font weight-ek: Syne 600/700/800, DM Sans 400/500 — összesen 5 fájl, woff2 formátum, font-display: swap |
| 03.02 | DM Sans 300 kihagyva — nincs rá konkrét használat a storyboardban, ha kell, 2 perc hozzáadni |
| 03.02 | Mappa struktúra: teljes struktúra most létrejön (CLAUDE.md alapján), de csak az 1. réteghez szükséges mappákba kerül kód — a többi üres mappa, kész a 2-3. rétegre |
| 03.02 | Prompt csoportosítás: 02=routing, 03=CSS+fontok+háttér, 04=i18n+Vercel |
| 03.02 | i18n JSON: egy fájl per nyelv (hu/de/en.json), namespace kulcsokkal belül — nem szétbontva külön fájlokra, ennyi fordításnál felesleges |
| 03.02 | i18n cache: kikapcsolva (detection.caches: []) — GDPR, nem ment localStorage-ba/cookie-ba |

---

## Promptok

### Prompt 01 — Projekt + mappa struktúra ✅ végrehajtva
- Vite + React + TypeScript projekt scaffoldolva a repo gyökerében (`npm create vite@latest . -- --template react-ts`)
- Boilerplate kitakarítva (App.css, index.css, assets/, vite.svg törölve)
- App.tsx → üres div, main.tsx → nincs CSS import
- Teljes mappa struktúra létrehozva CLAUDE.md szerint:
  - src/components/{ui, hero, nav, demos, process, builder, cta, footer}
  - src/{layouts, pages, hooks, i18n, styles, utils}
  - public/fonts/
- npm install, npm run build + dev ellenőrizve

### Prompt 02 — Routing ✅ végrehajtva
- react-router-dom telepítve (v7.13.1)
- 9 placeholder page komponens létrehozva (src/pages/):
  - Home.tsx (/), Dashboards.tsx (/dashboardok), AI.tsx (/ai), Automation.tsx (/automatizacio), Websites.tsx (/weboldalak), Process.tsx (/folyamat), Contact.tsx (/kapcsolat), Impressum.tsx (/impressum), Privacy.tsx (/adatvedelem)
- App.tsx átírva: BrowserRouter + Routes + React.lazy + Suspense (üres fragment fallback)
- Build: minden route külön chunk-ra splittelődik (lazy loading működik)

### Prompt 03 — CSS + fontok + háttér ✅ végrehajtva
- Font fájlok beszerzése: @fontsource csomagokból woff2 kinyerése → public/fonts/ (5 fájl: syne-600/700/800, dm-sans-400/500), csomagok utána eltávolítása
- src/styles/fonts.css: 5 @font-face deklaráció, font-display: swap
- src/styles/global.css: CSS változók (--bg, --text, --accent, --muted, --font-display, --font-body), reset, "ultra mély" háttér gradient (3 rétegű narancs radial gradient + vignette + film grain SVG + lélegző fény animáció)
- main.tsx: fonts.css + global.css import hozzáadása

### Prompt 04 — i18n + Vercel ✅ végrehajtva
- react-i18next + i18next + i18next-browser-languagedetector telepítve
- 3 JSON fordítás fájl (src/i18n/hu.json, de.json, en.json) — nav + common namespace kulcsokkal
- src/i18n/index.ts: konfiguráció (fallback: hu, böngésző nyelv detekció, GDPR-kompatibilis cache nélkül)
- main.tsx: i18n import hozzáadása (CSS importok elé)
- vercel.json: SPA fallback (minden route → index.html)

---

## Megbeszélendő

- (nincs nyitott kérdés — réteg lezárva)

---

## Megjegyzések

- 9 route: /, /dashboardok, /ai, /automatizacio, /weboldalak, /folyamat, /kapcsolat, /impressum, /adatvedelem
- A mappa struktúra részletesen a CLAUDE.md-ben van leírva
- i18n namespace-ek egyelőre: nav, common — a többi (hero, dashboards, ai, stb.) a későbbi rétegekben kerül hozzá
- Git nem trackeli az üres mappákat — lokálisan megvannak, GitHub-on a fájlokkal együtt jelennek meg
