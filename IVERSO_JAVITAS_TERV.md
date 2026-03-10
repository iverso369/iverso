# IVERSO — Javítási terv

> 2026.03.03 — Első vizuális review után
> Frissítve: 2026.03.09

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
| 13 | Navbar teljes újratervezés | ✅ kész |
| 14 | Preview kártyák szélesség 85vw | ✅ kész |
| 15 | Font váltás (Roboto 700) | ✅ kész |
| 16 | IVERSO felirat a CTA szekció fölé | ⬜ végére parkolva |
| 17 | Kurzor + jobb klikk menü tiltás | ✅ kész |
| 18 | Amélia szekció: méret, igazítás, mondatok | ✅ kész |
| 19 | Építős: IVERSO parázs átlóg | ✅ megoldódott |
| 20 | Szolgáltatások dropdown | ✅ kész (megszűnt, kibontva) |
| 21 | Építős morph szöveg encoding bug | ✅ kész |
| 22 | WebsitePreview szín finomhangolás | ✅ kész |
| 23 | Főoldal tartalmi flow | ✅ kész |
| 24 | "Let's build something" méret + responsive | ✅ kész |
| 25 | Navbar végleges layout | ✅ kész |
| 27 | WebsitePreview + AiChatPreview fontok | ✅ kész |
| 30 | Háttér gradient (naplemente) | ✅ kész |
| 31 | Canvas 2D particle háttér | ✅ kész (radial gradient sprite + additív blending + hero szín szinkron) |

---

## Hátra maradt — megbeszélt sorrend

DemoCard újraépítés → P8 → P7 → P16

| Sorrend | # | Feladat | Állapot |
|---------|---|---------|---------|
| 1. | JAVITAS_01 | DemoCard preview kártyák teljes újraépítés (egységes split rendszer) | ✅ kész |
| 2. | P8 | Folyamat finomhangolás | ⬜ |
| 3. | P7 | Építős szekció újratervezés | ⬜ (legnagyobb falat) |
| 4. | P16 | IVERSO parázs a CTA fölé | ⬜ végére parkolva |

## Új ötletek (03.09 — átbeszélve, döntés este gépen)

| Ötlet | Leírás | Állapot |
|-------|--------|---------|
| Preview sorrend | Dashboard → AI → Weboldal → Automatizáció (Norbi preferencia) | ⬜ döntés kell |
| Építős pozíció | AI preview után berakni — megtöri a monoton ritmust | ⬜ döntés kell ("Let's build something" kontextus?) |
| AutomationPreview | Jelenlegi túl gyenge, újratervezés kell (nem csak finomhangolás) | ⬜ koncepció kell |

## Layout döntések (03.10 — VÉGLEGES)

Minden preview kártya SPLIT layout — egységes DemoCard wrapper, váltakozó demo pozíció:

| # | Preview | Info oldal | Demo oldal | Grid arány |
|---|---------|-----------|-----------|------------|
| 1 | Dashboard | BAL | JOBB | 1fr 2.2fr |
| 2 | Weboldal | JOBB | BAL | 1.6fr 1fr |
| 3 | AI Chat | BAL | JOBB | 1fr 1.6fr |
| 4 | Automatizáció | JOBB | BAL | 2.2fr 1fr |

Demo pozíció: JOBB → BAL → JOBB → BAL (váltakozik)
Leírás szöveg: mindig az info oldalon (cím+alcím+leírás+Tovább együtt)
TextSection: TÖRÖLVE — nincs szükség rá
Card-footer: TÖRÖLVE — a leírás az info blokkban van
Cinema overlay: TÖRÖLVE — az Automatizáció is split lett
Kártyák között: 70px gap
Egységes: border, border-radius 16px, box-shadow, padding
