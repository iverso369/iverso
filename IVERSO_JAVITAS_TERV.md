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
| 18 | Amelia szekció: méret, igazítás, mondatok | ✅ kész |
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

P26 → P28 → P8 → P7 → P16

| Sorrend | # | Feladat | Állapot |
|---------|---|---------|---------|
| 1. | P26/A | Háttér gradient frissítés (3 rétegű radial) | 📋 prompt kész |
| 1. | P26/B | TextSection komponens (sötétítő zóna + accent vonal) | 📋 prompt kész |
| 1. | P26/C | Preview layout átstrukturálás + sorrend csere | 📋 prompt kész |
| 2. | P28 | Amelia szekció vizuális újratervezés | ⬜ koncepció kell |
| 3. | P8 | Folyamat finomhangolás | ⬜ |
| 4. | P7 | Építős szekció újratervezés | ⬜ (legnagyobb falat) |
| 5. | P16 | IVERSO parázs a CTA fölé | ⬜ végére parkolva |

## Új ötletek (03.09 — átbeszélve, döntés este gépen)

| Ötlet | Leírás | Állapot |
|-------|--------|---------|
| Preview sorrend | Dashboard → AI → Weboldal → Automatizáció (Norbi preferencia) | ⬜ döntés kell |
| Építős pozíció | AI preview után berakni — megtöri a monoton ritmust | ⬜ döntés kell ("Let's build something" kontextus?) |
| AutomationPreview | Jelenlegi túl gyenge, újratervezés kell (nem csak finomhangolás) | ⬜ koncepció kell |

## Layout döntések (03.09 — VÉGLEGES)

Minden preview kártya MÁS layout — megtöri a monotonságot:

| Preview | Layout | Leírás |
|---------|--------|--------|
| Dashboard | Standard teljes szélesség | Marad mint most — 5 oldalas animáció teret igényel |
| AI Chat | Split: szöveg bal, demo jobb | Szöveg+alcím+gomb bal oldalon, demo jobb oldalon |
| Weboldal | Fordított split: demo bal, szöveg jobb | Demo bal, szöveg+alcím+gomb jobb oldalon |
| Automatizáció | Cinema overlay | Demo kitölti az EGÉSZ kártyát, cím+alcím overlay fent sötétedő gradienttel |

Közöttük mindenhol V1 szöveg szekció (sötétítő zóna + bal accent vonal).
