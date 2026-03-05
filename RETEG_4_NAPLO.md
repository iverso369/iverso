# Réteg 4 — Jelenetek (Napló)

> Utolsó frissítés: 2026.03.05

---

## Mit tartalmaz ez a réteg

Főoldal 7 jelenet kitöltése tartalommal + navigáció + scroll animációk.

| # | Feladat | Állapot |
|---|---------|---------|
| 1 | Nav + Nyelvváltó | ✅ implementálva |
| 2 | DashboardPreview (3. jelenet) | ✅ újratervezve, audit fix kész |
| 3 | AiChatPreview (3. jelenet) | ✅ újratervezve, kész |
| 4 | AutomationPreview (3. jelenet) | ✅ javítva, kész |
| 5 | WebsitePreview (3. jelenet) | ✅ újratervezve — szín finomhangolás később |
| 6 | Folyamat szekció (4. jelenet) | ⚠️ implementálva, finomhangolás kell |
| 7 | Építős szekció (5. jelenet) | ⚠️ implementálva, JAVÍTANDÓ |
| 8 | CTA + Footer (6-7. jelenet) | ✅ implementálva, finomhangolás később |
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

### Javítás #04 — WebsitePreview újratervezés ✅ kész (szín finomhangolás később)
- v2 A — világos krém/artisan pékség, saját paletta (NEM Iverso)
- Saját font (Lora), saját színek
- Animáció fix: timeout chain cleanup bug javítva
- Nyitott: szín tónus túl kontrasztos a sötét háttérrel

### Javítás #10+11 — Navbar + Hero magasság ✅ kész
- Navbar gépen MINDIG látható (scroll-aware kikapcsolva)
- Hero magasság ~50vh, tartalom görgetés nélkül is látszódik

### Gyors fixek (03.05) ✅ kész
- P14: Preview kártyák szélesség — `width: 85vw` (a `max-width` nem volt elég, `width` kellett)
- P17: Jobb klikk context menu tiltás
- P20: "Weboldalak" hozzáadva a nav dropdown-hoz
- P21: Építős morph encoding bug javítva

---

## Új problémák (03.05 második review)

Részletes lista: IVERSO_JAVITAS_TERV.md

| # | Probléma | Típus |
|---|----------|-------|
| P12 | IVERSO ↔ "Let's build something" pozíció csere | Design döntés |
| P13 | Navbar teljes újratervezés | Design döntés |
| P14 | Preview kártyák 75% szélesség | ✅ kész (85vw) |
| P15 | Font váltás (navbar + preview címek) | Design döntés |
| P16 | IVERSO felirat a CTA fölé | Design döntés |
| P17 | Kurzor + jobb klikk tiltás | ✅ kész |
| P18 | Amelia szekció: méret, igazítás, mondatok | Design döntés |
| P19 | Építős: parázs átlóg | VS Code fix |
| P20 | "Weboldalak" hiányzik a dropdown-ból | ✅ kész |
| P21 | Építős morph encoding bug | ✅ kész |
| P22 | WebsitePreview szín finomhangolás | Design döntés |

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
| 03.05 | WebsitePreview: szín tónus nyitott kérdés (túl kontrasztos) |
| 03.05 | Navbar: gépen MINDIG látható |
| 03.05 | Hero magasság: ~50vh |
| 03.05 | Preview kártyák: width: 85vw (max-width nem elég, explicit width kell) |
| 03.05 | Jobb klikk: context menu letiltva |

---

## Mi van még hátra

- ⬜ **Design döntések** — P12, P13, P15, P16, P18, P22 (opciók kellenek)
- ⬜ **Építős szekció** — P7, P19
- ⬜ **Folyamat finomhangolás** — P8
