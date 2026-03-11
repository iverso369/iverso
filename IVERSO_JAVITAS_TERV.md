# IVERSO — Javítási terv

> 2026.03.03 — Első vizuális review után
> Frissítve: 2026.03.10

---

## Állapot

| # | Javítás | Állapot |
|---|---------|---------|
| 1 | Réteg 2 hero fix (#1-4) | ✅ kész |
| 2 | Egységes preview méret (DemoCard wrapper) | ✅ kész |
| 3 | DashboardPreview újra — sidebar + KPI + táblázat | ✅ kész |
| 4 | AiChatPreview — két panel, input, gyorsválasz | ✅ kész |
| 5 | WebsitePreview — v2 A világos krém pékség | ✅ kész + szín tompítva |
| 6 | AutomationPreview — node-ok mindig láthatók | ✅ kész + flex reszponzív (gépen OK) |
| 7 | Építős szekció javítás | ⬜ újratervezés lesz |
| 8 | Folyamat finomhangolás | ✅ ELTÁVOLÍTVA főoldalról → /tudnivalok (Réteg 5) |
| 9 | "Tovább" gombok beépítése | ✅ kész |
| 10 | Navbar mindig látható (gépen) | ✅ kész |
| 11 | Hero magasság ~50vh | ✅ kész |
| 12 | IVERSO ↔ "Let's build something" pozíció csere | ✅ kész |
| 13 | Navbar teljes újratervezés | ✅ kész |
| 14 | Preview kártyák szélesség 85vw | ✅ kész |
| 15 | Font váltás (Roboto 700) | ✅ kész |
| 16 | ~~IVERSO felirat a CTA szekció fölé~~ | ✅ TÖRÖLVE — a parázs földgömb (P7) helyettesíti |
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
| 32 | DemoCard teljes újraépítés (split rendszer, arányos, padding, keret) | ✅ kész |
| 33 | AutomationPreview flex reszponzív (node-ok zsugorodnak) | ✅ kész (gépen ellenőrizve, OK) |

---

## Hátra maradt — megbeszélt sorrend

DemoCard újraépítés → P8 → P7 → P16

| Sorrend | # | Feladat | Állapot |
|---------|---|---------|---------|
| 1. | JAVITAS_01 | DemoCard preview kártyák teljes újraépítés (egységes split rendszer) | ✅ kész |
| 1a. | JAVITAS_01_FINOM | Arányos méretezés (clamp), kártya keret, belső padding, demo bg | ✅ kész |
| 1b. | JAVITAS_01_AUTO | AutomationPreview flexibilis node-ok + connector gap | ✅ kész (gépen OK) |
| 2. | P8 | Folyamat szekció | ✅ DÖNTÉS: főoldalról eltávolítva. A /tudnivalok aloldalon lesz részletesen (Réteg 5). |
| 3. | P7 | Építős szekció újratervezés | ⬜ KONCEPCIÓ KÉSZ: parázs kockák → hálózat → 3D particle földgömb kontinensekkel |
| 4. | P16 | ~~IVERSO parázs a CTA fölé~~ | ✅ TÖRÖLVE — a földgömb helyettesíti |

## Régi ötletek (03.09) — LEZÁRVA

| Ötlet | Leírás | Állapot |
|-------|--------|---------|
| Preview sorrend | Dashboard → Weboldal → AI → Automatizáció | ✅ eldöntve |
| Építős pozíció | AI preview után berakni | ⬜ P7-nél döntjük el |
| AutomationPreview | Újratervezés → split layout lett | ✅ megoldva |

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
Kártyák között: clamp(50px, 5vw, 90px) gap
Egységes: border rgba(255,255,255,0.1), border-radius 16px, box-shadow, belső padding (.grid-en)
Kártya háttér: rgba(20, 20, 22, 0.9), demo háttér: transparent
Minden méret clamp() alapú (viewport-hoz arányos)
Reszponzív: böngésző ablak méretéhez igazodik. Telós asztali nézet NEM prioritás.
