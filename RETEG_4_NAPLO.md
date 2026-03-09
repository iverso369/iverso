# Réteg 4 — Jelenetek (Napló)

> Utolsó frissítés: 2026.03.09

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
| 12 | Canvas 2D particle háttér | ✅ kész (radial gradient sprite + additív blending + hero szín szinkron) |

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

### P30 — Háttér gradient ✅ kész
- Naplemente stílus — narancs fényoszlop középen, barna mélység, vignette szélek

### P31 — Canvas 2D particle háttér ✅ kész
- BackgroundParticles.tsx — position: fixed, z-index: 1, pointer-events: none
- V1: ctx.arc() + glow kör → konfetti kinézet, ROSSZ
- V2: Radial gradient sprite-ok + additív blending (`globalCompositeOperation: 'lighter'`) → parázs kinézet, JÓ
- Szín szinkron: Three.js hero palettájából átvéve
- 600-800 részecske, nagyon alacsony opacity (0.03-0.15), átfedésnél fény összeadódik
- P29 (oldalszélek üresek) is megoldódott ezzel

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
| 03.09 | Canvas 2D particle háttér: radial gradient sprite + additív blending (ctx.arc glow nem működött — konfetti maradt) |
| 03.09 | Particle szín: Three.js hero palettájából szinkronizálva |
| 03.09 | P29 megoldódott: a particle háttér kitölti az oldalsó üres területeket |
| 03.09 | P26 prompt kész: háttér gradient frissítés (3 rétegű radial) + V1 szöveg szekció (sötétítő zóna + bal accent vonal) — implementálva, este gépen ellenőrzés |
| 03.09 | Háttér gradient: a HTML prototípus 3 rétegű gradientje tetszett — az kerül az oldalra |
| 03.09 | ÖTLET: Preview sorrend változtatás — Dashboard → AI → Weboldal → Automatizáció (Norbi preferencia alapján) |
| 03.09 | ÖTLET: Építős szekció berakása a 2. preview kártya (AI) és szövege UTÁN — megtöri a monoton kártya-kártya-kártya ritmust. Kérdés: a "Let's build something" kontextus hogyan oldódik meg |
| 03.09 | AutomationPreview: jelenlegi verzió túl gyenge (4 node nyíllal, ennyi) — újratervezés kell, nem csak finomhangolás |
| 03.09 | P28 Amelia szekció: V1 chat ablak választva — 3 buborékos animált beszélgetés, Amelia fejléc (avatár + Online), alul nagy CTA gomb. 10 set HU/DE/EN. |
| 03.09 | LAYOUT DÖNTÉS: Preview kártyák NEM monoton — minden szekció más layout! |
| 03.09 | Dashboard: marad teljes szélességű standard kártya (5 oldalas animáció teret igényel) |
| 03.09 | AI Chat: split layout — szöveg+gomb BAL, demo JOBB |
| 03.09 | Weboldal: fordított split — demo BAL, szöveg+gomb JOBB |
| 03.09 | Automatizáció: cinema stílus — demo kitölti az egész kártyát, cím overlay-ként fent sötétedő gradienttel |
| 03.09 | Preview sorrend (előzetes): Dashboard → AI → Weboldal → Automatizáció |

---

## Mi van még hátra

- ✅ **P18: Amelia mondatok** — 10 db, önirónia stílus, kész
- ✅ **P24: "Let's build something"** — nagyobb, lejjebb
- ✅ **P25: Navbar** — végleges
- ✅ **P27: WebsitePreview** — fontok nagyobb, animáció lassabb
- ✅ **P27b: AiChatPreview** — fix magasság + gap
- ✅ **P29: Oldalszélek** — particle háttér megoldotta
- ✅ **P30: Háttér** — naplemente gradient kész
- ✅ **P31: Canvas 2D particle háttér** — kész
- ⬜ **P26/A: Háttér gradient** — 3 rétegű radial, prompt kész
- ⬜ **P26/B: TextSection komponens** — sötétítő zóna + bal accent vonal, prompt kész
- ⬜ **P26/C: Layout átstrukturálás** — 4 különböző layout + sorrend csere, prompt kész
- ⬜ **P28: Amelia szekció** — vizuális újratervezés, koncepció kell
- ⬜ **P16: IVERSO parázs a CTA fölé** — végére parkolva
- ⬜ **Építős szekció újratervezés** — P7
- ⬜ **Folyamat finomhangolás** — P8
