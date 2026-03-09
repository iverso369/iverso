# Réteg 4 — Jelenetek (Napló)

> Utolsó frissítés: 2026.03.06

---

## Mit tartalmaz ez a réteg

Főoldal 7 jelenet kitöltése tartalommal + navigáció + scroll animációk.

| # | Feladat | Állapot |
|---|---------|---------|
| 1 | Nav + Nyelvváltó | ✅ implementálva |
| 2 | DashboardPreview (3. jelenet) | ✅ újratervezve, audit fix kész |
| 3 | AiChatPreview (3. jelenet) | ✅ újratervezve, kész |
| 4 | AutomationPreview (3. jelenet) | ✅ javítva, kész |
| 5 | WebsitePreview (3. jelenet) | ✅ újratervezve, szín tompítva |
| 6 | Folyamat szekció (4. jelenet) | ⚠️ implementálva, finomhangolás kell |
| 7 | Építős szekció (5. jelenet) | ⬜ újratervezés lesz |
| 8 | CTA + Footer (6-7. jelenet) | ✅ implementálva, Amelia mondatok frissítve |
| 9 | Home.tsx összeszerelés | ✅ implementálva |
| 10 | Navbar mindig látható (gépen) | ✅ kész |
| 11 | Hero magasság ~50vh | ✅ kész |

---

## Javítások

### Javítás #01 — DemoCard unifikálás ✅ kész

### Javítás #02 — AutomationPreview + AiChatPreview ✅ kész

### Javítás #03 — DashboardPreview újratervezés ✅ kész
- "A verzió" — sidebar + KPI kártyák + táblázat
- 5 oldalas ciklikus animáció (Áttekintés, Termékek, Rendelések, Naptár, Riportok)
- Pénznem nyelvfüggő (HU: Ft, DE/EN: €)
- Audit fix: Syne→var(--font-display), hardcoded fontok→CSS változók, EN $→€

### Javítás #04 — WebsitePreview újratervezés ✅ kész
- v2 A — világos krém/artisan pékség, saját paletta (NEM Iverso)
- Saját font (Lora), saját színek
- Animáció fix: timeout chain cleanup bug javítva
- Szín tompítás: #FAF5EE → #E8DFD2 (kevésbé kontrasztos)

### Javítás #10+11 — Navbar + Hero magasság ✅ kész
- Navbar gépen MINDIG látható (scroll-aware kikapcsolva)
- Hero magasság ~50vh, tartalom görgetés nélkül is látszódik

### Gyors fixek (03.05) ✅ kész
- P14: Preview kártyák szélesség — `width: 85vw` (a `max-width` nem volt elég, `width` kellett)
- P17: Jobb klikk context menu tiltás
- P20: "Weboldalak" hozzáadva a nav dropdown-hoz
- P21: Építős morph encoding bug javítva

### Navbar font váltás (03.06) ✅ kész
- Playfair Display → Roboto 700 mindenhol
- E stílusú Kontakt gomb (outline + tint + shadow)

### Navbar layout (03.06) ✅ kész
- B + V1 layout: logo nagyobb (1.35rem), szolgáltatások kibontva középen
- "Folyamat" → "Tudnivalók", ponttal elválasztva
- Route: /folyamat → /tudnivalok
- Kapcsolat gomb: solid narancs → E stílus
- Szolgáltatások dropdown megszűnt

### P12 — IVERSO ↔ "Let's build something" csere ✅ kész
- IVERSO parázs felülre, "Let's build something" alá
- "Let's build something" méret növelve (V elejétől S végéig)

### P23 — Tartalmi szövegek ✅ kész
- Semleges, tárgyilagos, hétköznapi nyelvű bemutató szövegek
- Preview kártyák ALÁ kerültek leírásként
- HU/DE/EN mind a 4 szolgáltatásnál

### P22 — WebsitePreview szín tompítás ✅ kész
- Háttér: #FAF5EE → #E8DFD2
- Termék sorok, borderek igazítva

### P18 — Amelia szekció ✅ kész
- Méret növelés + középre igazítás kész
- Amelia mondatok: 10 db, új stílus (önirónia, színfalak mögötti bepillantás)
- Amelia stílus döntés:
  - Saját helyzetéről mesél, nem a látogató felé személyeskedik
  - Norbi-t szidja szeretettel, pozitív hangulat
  - Emojik: csak arckifejezések (😂😅😌😤🙄🥲), csak mondatok végén
  - Tegez
  - Nem sales, nem manipulál

---

## Döntések

| Dátum | Döntés |
|-------|--------|
| 03.03 | DemoCard wrapper: egységes méret, "Tovább" kártyán belül |
| 03.04 | AiChatPreview: két panel, gyorsválasz gombok, input mező |
| 03.04 | DashboardPreview: "A verzió" — sidebar + KPI + táblázat |
| 03.04 | DashboardPreview: pénznem nyelvfüggő — HU: Ft, DE/EN: € |
| 03.05 | DashboardPreview: cégnevek pékség (Molnár Pékség / Bäckerei Müller / Baker & Sons) |
| 03.05 | WebsitePreview: v2 A — világos krém pékség, saját paletta+font |
| 03.05 | Navbar: gépen MINDIG látható |
| 03.05 | Hero magasság: ~50vh |
| 03.05 | Preview kártyák: width: 85vw (max-width nem elég, explicit width kell) |
| 03.05 | Jobb klikk: context menu letiltva |
| 03.06 | Font váltás: Playfair Display → Roboto 700 (prompt kész, implementáció folyamatban) |
| 03.06 | Navbar gomb: E stílus — outline + halvány narancs tint + shadow (kifelé + befelé) |
| 03.06 | P23: Főoldal tartalmi flow hiányosság azonosítva — kontextus kell a demók között |
| 03.06 | P23: Szövegek véglegesítve (HU/DE/EN) — semleges, tárgyilagos, hétköznapi nyelv, nem sales |
| 03.06 | P23: Szövegek a preview kártyák ALÁ kerülnek leírásként — elválasztja a kártyákat, teret ad |
| 03.06 | P13: Navbar-ra VISSZA KELL TÉRNI — font jó, de méret, menüpontok elhelyezkedése, nyelvváltó→gomb stílus, Kontakt gomb újratervezés kell |
| 03.06 | P13: Navbar layout B választva — logo nagyobb, szolgáltatások kibontva középen, nyelv jobbra |
| 03.06 | "Folyamat" menüpont átnevezve → **"Tudnivalók"** — az aloldal ki lesz bővítve (nem csak 4 lépés, hanem teljes bemutató: működés, lehetőségek, közös munka stb.). A tartalom Réteg 5-nél készül el. |
| 03.06 | Navbar layout: V1 választva — szolgáltatások kibontva + Tudnivalók ponttal elválasztva, Kapcsolat solid narancs, nyelvváltó E stílus, szeparátor vonal |
| 03.06 | Route változás: /folyamat → /tudnivalok |
| 03.06 | i18n: HU "Tudnivalók", DE "Wissenswertes", EN "Good to know" |
| 03.06 | Kapcsolat gomb: solid narancs → E stílus (outline + tint + shadow, mint a nyelvváltó) |
| 03.06 | Amelia stílus: önirónia, saját helyzetéről mesél, színfalak mögötti bepillantás, Norbi szidás szeretettel, emojik csak arckifejezések mondatok végén, tegez |
| 03.06 | Amelia mondatok: 10 db (5 helyett), HU/DE/EN |
| 03.06 | WebsitePreview szín: #FAF5EE → #E8DFD2 (tompább, kevésbé kontrasztos) |

---

## Mi van még hátra

- ✅ **P18: Amelia mondatok** — 10 db, önirónia stílus, kész
- ✅ **P24: "Let's build something"** — nagyobb, lejjebb
- ✅ **P27: WebsitePreview** — fontok nagyobb, animáció lassabb
- 🔄 **P25: Navbar** — méret, középre, menüpont kinézet — iteráció folyamatban
- 🔄 **P27b: AiChatPreview** — fix magasság + gap
- ⬜ **P26: Preview szövegek** — vizuális beágyazás az oldalba
- ⬜ **P28: Amelia szekció** — vizuális újratervezés
- ⬜ **P29: Oldalszélek** — üres, hiányzik az élet
- ⬜ **P30: Háttér** — átdolgozás
- ⬜ **P16: IVERSO parázs a CTA fölé** — végére parkolva
- ⬜ **Építős szekció újratervezés** — P7
- ⬜ **Folyamat finomhangolás** — P8
