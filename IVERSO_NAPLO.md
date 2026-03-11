# IVERSO — Projekt Napló

> Utolsó frissítés: 2026.03.10

---

## Mi az Iverso?

Norbi side business (Nebengewerbe) weboldala. Dashboard fejlesztés, AI chatbotok, automatizáció, weboldal készítés — elsősorban magyar cégeknek.

**Domain:** iverso.info

---

## Az oldal koncepciója

Az oldal **él**. Nem statikus weboldal — minden reagál: hover, kattintás, scroll, touch. A látogató úgy érezze: *"Hú, ilyet én is akarok a cégemnek."*

Az oldal minősége maga a bizalom — nincs referencia szekció, nincs garancia, nincsenek számok. Ha az oldal brutál, az elég.

---

## Vizuális szabályok

- **3 szín — ennyi, semmi más:**
  - Fekete: #0A0A0C (háttér)
  - Fehér: #EDEDF0 (szöveg)
  - Narancs: #F77F0A (akcentus)
- **Szürke:** #88889A (másodlagos szöveg)
- **Fontok:** Roboto 700 (display/címek), DM Sans 400/500 (body) — self-hosted woff2
- **Ikonok:** SVG thin line (1.5px stroke, currentColor)
- **Emojik:** nincsenek sehol (kivéve Amélia)
- **Háttér:** Naplemente stílusú gradient (narancs fényoszlop közepén, barna mélység, vignette széleken) + Canvas 2D particle háttér (radial gradient sprite-ok, additív blending, hero szín szinkron)
- **Custom kurzor:** narancssárgás pont + trail (egész oldalon, mobilon nincs)

---

## Szövegírási stílus

- **Általános:** Semleges, tárgyilagos, hétköznapi nyelv. NEM sales, NEM személyeskedés, NEM kérdések, NEM feltételes mód, NEM manipuláció. Folyó szöveg, nem felsorolás.
- **Amélia:** Önirónia, saját helyzetéről mesél. Színfalak mögötti bepillantás, pozitív hangulat, Norbi-t szidja szeretettel. Emojik csak arckifejezések, csak mondatok végén. Tegez. Nem sales, nem manipulál.

---

## Tech stack

- **Framework:** Vite + React (SPA), TypeScript
- **Styling:** CSS Modules
- **Routing:** react-router-dom
- **i18n:** react-i18next (HU/DE/EN)
- **Hero:** Three.js (desktop) + Canvas 2D (mobil)
- **Háttér particlek:** Canvas 2D (radial gradient sprite + additív blending)
- **Scroll:** Intersection Observer API
- **Deploy:** GitHub → Vercel (auto-deploy)
- **Fontok:** Roboto 700 + DM Sans 400/500, self-hosted woff2 (GDPR)

---

## Build plan — 7 réteg

### Réteg 1 — Alap ✅ KÉSZ
### Réteg 2 — Háttér + Hero ✅ KÉSZ
### Réteg 3 — Építőkockák ✅ KÉSZ

### Réteg 4 — Jelenetek 🔄 FOLYAMATBAN
- ✅ Minden preview komponens kész (Dashboard, AI, Automation, Website)
- ✅ Navbar végleges
- ✅ P23 tartalmi szövegek, P12 pozíció csere, P22 szín tompítás, P18 Amélia mondatok
- ✅ P24 "Let's build something" méretezés + responsive
- ✅ P25 navbar végleges
- ✅ P27 preview fontok
- ✅ P30 háttér gradient (naplemente stílus)
- ✅ Canvas 2D particle háttér (radial gradient sprite + additív blending + hero szín szinkron)
- ✅ P26: Preview layout átstrukturálás (4 különböző layout, sorrend csere, TextSection→kártyán belüli szöveg)
- ✅ P28: Amélia CTA szekció (V1 chat ablak, 10 set × 3 buborék, Noto emoji)
- ✅ P29: Oldalszélek megoldva (particle háttér)
- ✅ Noto emoji 73 SVG self-hosted
- ✅ Automatizáció cinema overlay → megoldva DemoCard split-tel
- ✅ Dashboard/Automatizáció card-footer → megoldva (leírás info blokkban)
- ✅ Weboldal split Tovább gomb pozíció → megoldva (egységes info blokk)
- ✅ P8: Folyamat szekció → ELTÁVOLÍTVA a főoldalról, /tudnivalok aloldalra kerül (Réteg 5)
- ⬜ P7: Építős szekció újratervezés — KONCEPCIÓ KÉSZ: parázs kockák → hálózat → 3D particle földgömb kontinensekkel. Bal klikk rombol, jobb klikk szétrobban.
- ~~⬜ P16: IVERSO parázs a CTA fölé~~ → TÖRÖLVE, a parázs földgömb helyettesíti
- ⬜ Új menüpont a folyamatnak (Réteg 5-nél döntjük el)

### Réteg 5 — Aloldalak ⬜ vár
### Réteg 6 — Amélia ⬜ vár
### Réteg 7 — Polish ⬜ vár

---

## Hol tartunk most

**Repo:** github.com/iverso369/iverso — aktív
**Deploy:** iverso-orpin.vercel.app

**Amit most csinálunk:** Réteg 4 — DemoCard preview kártyák ✅ KÉSZ. AutomationPreview ✅ gépen OK. Folyamat szekció ✅ döntés: eltávolítva a főoldalról. Következő: P8_TORLES prompt (folyamat szekció törlése Home.tsx-ből), P7 Építős szekció újratervezés.

---

## Döntések (03.10)

- **Amélia ékezettel:** A karakter neve AMÉLIA (nem Amelia). Minden projekt fájlban és kódbázisban javítva.
- **DemoCard preview kártyák:** Teljes újraépítés. Mind a 4 kártya split layout, egységes vizuális rendszer.
  - Sorrend: Dashboard → Weboldal → AI → Automatizáció
  - Demo pozíció: JOBB → BAL → JOBB → BAL (váltakozik)
  - Dashboard + Automatizáció: szélesebb demo (2.2fr)
  - AI + Weboldal: normál demo (1.6fr)
  - Leírás szöveg mindig az info blokkban (cím+alcím+leírás+Tovább együtt)
  - TextSection: TÖRÖLVE
  - Card-footer: TÖRÖLVE
  - Cinema overlay: TÖRÖLVE
  - Kártyák között: clamp(50px, 5vw, 90px) gap
  - Egységes: border, border-radius 16px, box-shadow, belső padding (.grid-en)
  - Demo háttér: transparent (nincs #0d0d0f)
  - Kártya háttér: rgba(20, 20, 22, 0.9), border: rgba(255,255,255,0.1)
  - Minden méret clamp() alapú (viewport-hoz arányos)
- **Noto emoji:** 73 SVG self-hosted (`public/emojis/`), Google Noto Color Emoji (WhatsApp stílus). `parseEmojis` utility function. GDPR tiszta, nincs CDN.
- **P28 Amélia CTA:** V1 chat ablak, 10 set × 3 buborék × 3 nyelv, Noto emojikkal
- **Reszponzív szabály:** Minden elem reszponzív legyen a böngésző ablak méretéhez. Ha kicsinyítve van az ablak, az oldal igazodjon hozzá. Telós asztali nézet NEM prioritás. A desktop (böngésző ablak) és a későbbi mobil nézet (Réteg 7) a fontos.

## Ismert problémák (03.10)

- ~~Automatizáció cinema overlay~~ → ✅ megoldva (DemoCard split rendszer)
- ~~Dashboard card-footer kontraszt~~ → ✅ megoldva (card-footer törölve, leírás info blokkban)
- ~~Weboldal split Tovább gomb pozíció~~ → ✅ megoldva (egységes info blokk)
- **~~AutomationPreview telón asztali nézetben:~~** → ✅ flex fix kész, gépen OK. Telón asztali nézetben elfogadható.
- **~~Folyamat szekció (P8):~~** → ELTÁVOLÍTVA a főoldalról. A tartalom a /tudnivalok aloldalra kerül (Réteg 5). Új menüpont kell.
- **Építős szekció (P7):** KONCEPCIÓ KÉSZ — parázs kockák → hálózat → 3D particle földgömb kontinensekkel. Implementáció következik.

---

## Linkek

- **Domain:** iverso.info
- **GitHub:** github.com/iverso369/iverso
- **Vercel:** iverso-orpin.vercel.app
