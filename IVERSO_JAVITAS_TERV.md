# IVERSO — Javítási terv

> 2026.03.03 — Első vizuális review után
> Frissítve: 2026.03.05

---

## Állapot

| # | Javítás | Állapot |
|---|---------|---------|
| 1 | Réteg 2 hero fix (#1-4) | ✅ kész |
| 2 | Egységes preview méret (DemoCard wrapper) | ✅ kész |
| 3 | DashboardPreview újra — sidebar + KPI + táblázat | ✅ kész |
| 4 | AiChatPreview — két panel, input, gyorsválasz | ✅ kész |
| 5 | WebsitePreview — v2 A világos krém pékség | ✅ kész — szín finomhangolás később |
| 6 | AutomationPreview — node-ok mindig láthatók | ✅ kész |
| 7 | Építős szekció javítás | ⬜ |
| 8 | Folyamat finomhangolás | ⬜ |
| 9 | "Tovább" gombok beépítése | ✅ kész |
| 10 | Navbar mindig látható (gépen) | ✅ kész |
| 11 | Hero magasság ~50vh | ✅ kész |
| 12 | IVERSO ↔ "Let's build something" pozíció csere + méretezés | ⬜ döntés kell |
| 13 | Navbar teljes újratervezés (megjelenés + font) | ⬜ döntés kell |
| 14 | Preview kártyák szélesség 85vw | ✅ kész |
| 15 | Font váltás (navbar IVERSO + preview címek) | ⬜ döntés kell |
| 16 | IVERSO felirat a CTA szekció fölé | ⬜ |
| 17 | Kurzor + jobb klikk menü tiltás | ✅ kész |
| 18 | Amelia szekció: méret, igazítás, mondatok | ⬜ döntés kell |
| 19 | Építős: IVERSO parázs átlóg | ⬜ |
| 20 | Szolgáltatások dropdown: "Weboldalak" hiányzik | ✅ kész |
| 21 | Építős morph szöveg encoding bug | ✅ kész |
| 22 | WebsitePreview szín finomhangolás | ⬜ döntés kell |

---

## Javasolt sorrend

### 1. kör — Gyors kód fixek ✅ KÉSZ
- ~~P14: Preview kártyák szélesség~~ ✅
- ~~P17: Jobb klikk tiltás + kurzor~~ ✅
- ~~P20: "Weboldalak" hiányzik a nav dropdown-ból~~ ✅
- ~~P21: Encoding bug az építős szekcióban~~ ✅

### 2. kör — Design döntések (opciók mutatása, webes Claude)
- **P13+P15:** Navbar újratervezés + font választás → HTML prototípok
- **P12:** IVERSO ↔ "Let's build something" pozíció csere + "Let's build something" szélesítés
- **P16:** IVERSO felirat a CTA fölé
- **P18:** Amelia szekció újratervezés + mondatok felülvizsgálat
- **P22:** WebsitePreview szín tónus

### 3. kör — Nehezebb fixek (VS Code)
- **P19:** Parázs átlógás az építős szekcióba
- **P7:** Építős szekció interaktivitás
- **P8:** Folyamat finomhangolás

---

## Részletek

### P12 — IVERSO ↔ "Let's build something" csere
- Jelenleg: felül "Let's build something", alatta IVERSO parázs
- Elvárt: felül IVERSO parázs, alatta "Let's build something"
- A "Let's build something" méretben a parázs V elejétől az S végéig érjen
- Érinti: Home.module.css, EmberHero.tsx

### P13 — Navbar teljes újratervezés
- Megjelenés, font, stílus — komplett áttervezés
- HTML prototípokat kell mutatni

### P14 — Preview kártyák 85vw ✅ KÉSZ
- Home.module.css .demosSection → width: 85vw
- Tanulság: `max-width` csak limitál, `width` kényszerít

### P15 — Font váltás
- Navbar "IVERSO" felirat fontja nem jó
- Preview kártyák címe fontja sem jó
- Opciók kellenek

### P16 — IVERSO felirat a CTA fölé
- "Van egy ötleted?" fölé egy IVERSO felirat
- Kérdés: sima szöveg vagy parázs? Mekkora?

### P17 — Kurzor + jobb klikk ✅ KÉSZ
- Jobb klikk context menu tiltás (nem jogi probléma)
- Custom kurzor stabilizálás

### P18 — Amelia szekció
- Méret növelés + középre igazítás
- Amelia mondatok felülvizsgálata

### P19 — Parázs átlógás
- Az IVERSO parázs a canvas position: fixed miatt átlóg az építős szekcióba
- Z-index / overflow rendezés kell

### P20 — "Weboldalak" hiányzik a dropdown-ból ✅ KÉSZ
- Nav.tsx serviceLinks tömb — ellenőrzés

### P21 — Encoding bug ✅ KÉSZ
- BuilderSection morph szövegek: "\u00E1s" karakter megjelenik
- i18n kulcs vagy hardcoded szöveg probléma
