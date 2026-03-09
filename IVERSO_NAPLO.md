# IVERSO — Projekt Napló

> Utolsó frissítés: 2026.03.08

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
- **Emojik:** nincsenek sehol (kivéve Amelia)
- **Háttér:** "Ultra mély" gradient
- **Custom kurzor:** narancssárgás pont + trail (egész oldalon, mobilon nincs)

---

## Szövegírási stílus

- **Általános:** Semleges, tárgyilagos, hétköznapi nyelv. NEM sales, NEM személyeskedés, NEM kérdések, NEM feltételes mód, NEM manipuláció. Egyszerű bemutató ami leírja mi a dolog és mit csinál. Nem a látogató helyébe képzeli magát. Folyó szöveg, nem felsorolás.
- **Amelia:** Önirónia, saját helyzetéről mesél (nem a látogató felé személyeskedik). Színfalak mögötti bepillantás, pozitív hangulat, Norbi-t szidja szeretettel. Emojik csak arckifejezések (😂😅😌😤🙄🥲), csak mondatok végén. Tegez. Nem sales, nem manipulál.

---

## Tech stack

- **Framework:** Vite + React (SPA), TypeScript
- **Styling:** CSS Modules
- **Routing:** react-router-dom
- **i18n:** react-i18next (HU/DE/EN)
- **Hero:** Three.js (desktop) + Canvas 2D (mobil)
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
- ✅ Navbar végleges (flex + absolute menü + absolute nyelv)
- ✅ P23 tartalmi szövegek, P12 pozíció csere, P22 szín tompítás, P18 Amelia mondatok
- ✅ P24 "Let's build something" méretezés, P25 navbar, P27 preview fontok
- ⬜ P26: Preview szövegek vizuális beágyazás
- ⬜ P28: Amelia szekció vizuális újratervezés
- ⬜ P29: Kétoldalt üres — hiányzik az élet
- ⬜ P30: Háttér átdolgozás
- ⬜ P7: Építős szekció újratervezés
- ⬜ P8: Folyamat finomhangolás
- ⬜ P16: IVERSO parázs a CTA fölé — végére parkolva

### Réteg 5 — Aloldalak ⬜ vár
### Réteg 6 — Amelia ⬜ vár
### Réteg 7 — Polish ⬜ vár

---

## Hol tartunk most

**Repo:** github.com/iverso369/iverso — aktív
**Deploy:** iverso-orpin.vercel.app

**Amit most csinálunk:** Réteg 4 — navbar kész. Következő: P26-P30 design döntések.

---

## Döntések (03.06)

- **Font:** Playfair Display → Roboto 700
- **Navbar gomb:** E stílus (outline + tint + shadow)
- **P23 szövegek:** Semleges, tárgyilagos, hétköznapi nyelv. Preview kártyák alá.
- **"Folyamat" → "Tudnivalók"** — Route: /folyamat → /tudnivalok
- **Kapcsolat gomb:** solid narancs → E stílus
- **Amelia stílus:** Önirónia, saját helyzetéről mesél. 10 mondat HU/DE/EN.

## Döntések (03.08)

- **Navbar végleges:** flex sor + menüpontok absolute középen + nyelvváltó absolute jobb szélre
- **IVERSO navbar logó:** 2.3rem, #D96A08 (sötétebb narancs)
- **Menüpont keretek:** border körbe, hover narancs
- **Nyelvváltó:** 3 gomb (HU EN DE), dropdown megszűnt
- **Navbar responsive:** 1200px alatt hamburger

---

## Linkek

- **Domain:** iverso.info
- **GitHub:** github.com/iverso369/iverso
- **Vercel:** iverso-orpin.vercel.app
