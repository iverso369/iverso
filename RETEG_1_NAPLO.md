# Réteg 1 — Alap (Napló)

> Utolsó frissítés: 2026.03.02

---

## Mit tartalmaz ez a réteg

Projekt inicializálás — minden ami kell ahhoz hogy bármi megjelenjen.

| # | Feladat | Állapot |
|---|---------|---------|
| 1 | Vite + React + TypeScript projekt | ✅ kész |
| 2 | Mappa struktúra (CLAUDE.md szerint) | ✅ kész |
| 3 | react-router-dom (9 route, lazy loading előkészítve) | ⬜ |
| 4 | CSS változók (3 szín + szürke, fontok) | ⬜ |
| 5 | Syne + DM Sans fontok (self-hosted, woff2) | ⬜ |
| 6 | Global CSS (reset, háttér — teljes "ultra mély" gradient) | ⬜ |
| 7 | react-i18next váz (HU/DE/EN, namespace-es JSON, nyelv detekció + váltó) | ⬜ |
| 8 | Vercel config (SPA fallback) | ⬜ |

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

---

## Promptok

| # | Fájl | Feladatok | Állapot |
|---|------|-----------|---------|
| 01 | RETEG_1_PROMPT_01.md | 1-2 (projekt + mappa struktúra) | ✅ végrehajtva |

---

## Megbeszélendő

- (nincs nyitott kérdés)

---

## Megjegyzések

- 9 route: /, /dashboardok, /ai, /automatizacio, /weboldalak, /folyamat, /kapcsolat, /impressum, /adatvedelem
- A mappa struktúra részletesen a CLAUDE.md-ben van leírva
- i18n namespace-ek: nav, hero, dashboards, ai, automation, websites, process, contact, common (vagy hasonló bontás)
- Git nem trackeli az üres mappákat — lokálisan megvannak, GitHub-on a fájlokkal együtt jelennek meg
