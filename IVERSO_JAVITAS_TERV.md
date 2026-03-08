# IVERSO — Javítási terv

> 2026.03.03 — Első vizuális review után
> Frissítve: 2026.03.06

---

## Állapot

| # | Javítás | Állapot |
|---|---------|---------|
| 1 | Réteg 2 hero fix (#1-4) | ✅ kész |
| 2 | Egységes preview méret (DemoCard wrapper) | ✅ kész |
| 3 | DashboardPreview újra — sidebar + KPI + táblázat | ✅ kész |
| 4 | AiChatPreview — két panel, input, gyorsválasz | ✅ kész |
| 5 | WebsitePreview — v2 A világos krém pékség | ✅ kész + szín tompítva |
| 6 | AutomationPreview — node-ok mindig láthatók | ✅ kész |
| 7 | Építős szekció javítás | ⬜ újratervezés lesz |
| 8 | Folyamat finomhangolás | ⬜ |
| 9 | "Tovább" gombok beépítése | ✅ kész |
| 10 | Navbar mindig látható (gépen) | ✅ kész |
| 11 | Hero magasság ~50vh | ✅ kész |
| 12 | IVERSO ↔ "Let's build something" pozíció csere | ✅ kész |
| 13 | Navbar teljes újratervezés | ✅ kész (Roboto 700, B+V1 layout, Tudnivalók, E stílusú gombok) |
| 14 | Preview kártyák szélesség 85vw | ✅ kész |
| 15 | Font váltás (Roboto 700) | ✅ kész |
| 16 | IVERSO felirat a CTA szekció fölé | ⬜ végére parkolva (parázs effekt) |
| 17 | Kurzor + jobb klikk menü tiltás | ✅ kész |
| 18 | Amelia szekció: méret, igazítás, mondatok | ✅ kész |
| 19 | Építős: IVERSO parázs átlóg | ✅ megoldódott (építős újratervezés) |
| 20 | Szolgáltatások dropdown: "Weboldalak" hiányzik | ✅ kész (dropdown megszűnt, kibontva) |
| 21 | Építős morph szöveg encoding bug | ✅ kész |
| 22 | WebsitePreview szín finomhangolás | ✅ kész (#FAF5EE → #E8DFD2) |
| 23 | Főoldal tartalmi flow — szövegek a preview kártyák alatt | ✅ kész |

---

## Javasolt sorrend

### 1. kör — Gyors kód fixek ✅ KÉSZ
- ~~P14: Preview kártyák szélesség~~ ✅
- ~~P17: Jobb klikk tiltás + kurzor~~ ✅
- ~~P20: "Weboldalak" hiányzik a nav dropdown-ból~~ ✅
- ~~P21: Encoding bug az építős szekcióban~~ ✅

### 2. kör — Design döntések ✅ KÉSZ
- ~~P13+P15: Navbar újratervezés + font választás~~ ✅
- ~~P12: IVERSO ↔ "Let's build something" csere~~ ✅
- ~~P18: Amelia szekció újratervezés + mondatok~~ ✅
- ~~P22: WebsitePreview szín tónus~~ ✅
- ~~P23: Főoldal tartalmi flow~~ ✅

### 3. kör — Hátra maradt
- **P16:** IVERSO parázs a CTA fölé — végére parkolva
- **P7:** Építős szekció újratervezés
- **P8:** Folyamat finomhangolás

---

## Részletek

### P12 — IVERSO ↔ "Let's build something" csere ✅ KÉSZ
- IVERSO parázs felülre, "Let's build something" alá, nagyobb méretben

### P13 — Navbar teljes újratervezés ✅ KÉSZ
- Roboto 700 logo (1.35rem), DM Sans linkek
- B + V1 layout: szolgáltatások kibontva középen, Tudnivalók ponttal elválasztva
- Szolgáltatások dropdown megszűnt
- "Folyamat" → "Tudnivalók", route `/folyamat` → `/tudnivalok`
- Kapcsolat gomb: E stílus (outline + tint + shadow)
- Nyelvváltó: E stílus
- Szeparátor vonal Kapcsolat és nyelvváltó között

### P14 — Preview kártyák 85vw ✅ KÉSZ
- Home.module.css .demosSection → width: 85vw
- Tanulság: `max-width` csak limitál, `width` kényszerít

### P15 — Font váltás ✅ KÉSZ
- Playfair Display → Roboto 700 mindenhol
- Self-hosted woff2, latin + latin-ext
- var(--font-display) globális csere

### P16 — IVERSO felirat a CTA fölé ⬜ PARKOLVA
- Ugyanaz a parázs effekt mint a hero-ban
- Scroll-ra szétoszlik, oldal alján összeáll
- A végére marad mert az oldal pozíciói még változhatnak

### P17 — Kurzor + jobb klikk ✅ KÉSZ

### P18 — Amelia szekció ✅ KÉSZ
- Méret növelés + középre igazítás
- Mondatok: 5 → 10 db, új stílus (önirónia, színfalak mögötti bepillantás)
- **Amelia stílus döntés (végleges):**
  - Önirónia, saját helyzetéről mesél (NEM a látogató felé személyeskedik)
  - Színfalak mögötti bepillantás, pozitív hangulat
  - Norbi-t szidja szeretettel
  - Emojik: CSAK arckifejezések (😂😅😌😤🙄🥲), CSAK mondatok végén
  - Tegez
  - Nem sales, nem manipulál

### P19 — Parázs átlógás ✅ MEGOLDÓDOTT

### P20 — Szolgáltatások dropdown ✅ KÉSZ (dropdown megszűnt, linkek kibontva)

### P21 — Encoding bug ✅ KÉSZ

### P22 — WebsitePreview szín ✅ KÉSZ
- Háttér: #FAF5EE → #E8DFD2 (tompább krém)
- Terméklista, borderek igazítva

### P23 — Főoldal tartalmi flow ✅ KÉSZ
- Semleges, tárgyilagos, hétköznapi nyelvű bemutató szövegek
- Preview kártyák ALÁ kerültek leírásként
- HU/DE/EN mind a 4 szolgáltatásnál
- Szövegírási stílus: nem sales, nem személyeskedés, nem kérdések, nem feltételes mód
