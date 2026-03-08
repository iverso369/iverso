# IVERSO — Projekt Napló

> Utolsó frissítés: 2026.03.06

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

### Réteg 4 — Jelenetek 🔄 JAVÍTÁS FOLYAMATBAN
- ✅ Nav, DashboardPreview, AiChatPreview, AutomationPreview, WebsitePreview, CTA, Footer
- ✅ Navbar mindig látható + Hero magasság ~50vh
- ✅ Audit fixek (EN $→€, Syne CSS, package.json name)
- ✅ Preview kártyák szélesség (85vw), jobb klikk tiltás, Weboldalak dropdown fix, encoding fix
- ✅ Navbar font váltás (Roboto 700, E stílusú gomb) — de layout/méret/gombok még újra kell
- ✅ Navbar layout újratervezés (B+V1, Tudnivalók, E stílusú gombok, Kapcsolat gomb E stílus)
- ✅ P23: Tartalmi szövegek a preview kártyák alá (HU/DE/EN)
- ✅ P12: IVERSO ↔ "Let's build something" pozíció csere
- ✅ P22: WebsitePreview szín tompítás (#FAF5EE → #E8DFD2)
- ✅ P18: Amelia szekció méret + igazítás + mondatok (10 db, önirónia stílus)
- ⬜ P16: IVERSO parázs a CTA fölé — végére parkolva
- ⬜ Építős szekció újratervezés
- ⬜ Folyamat finomhangolás
- Részletek: IVERSO_JAVITAS_TERV.md

### Réteg 5 — Aloldalak ⬜ vár
### Réteg 6 — Amelia ⬜ vár
### Réteg 7 — Polish ⬜ vár

---

## Hol tartunk most

**Repo:** github.com/iverso369/iverso — aktív
**Deploy:** iverso-orpin.vercel.app

**Amit most csinálunk:** Réteg 4 — összes javítás kész, push + teljes review következik. Hátra: Építős újratervezés (P7), Folyamat finomhangolás (P8), IVERSO parázs CTA fölé (P16 — végére parkolva).

---

## Audit (2026.03.05)

- Build ✅, TypeScript ✅, 238 i18n kulcs szinkronban (HU/DE/EN)
- ✅ EN pénznem $→€ javítva
- ✅ DashboardPreview CSS Syne maradék + hardcoded fontok javítva
- ✅ package.json name javítva
- **Döntés:** Dashboard demó cégnevek maradnak pékségként (Molnár Pékség / Bäckerei Müller / Baker & Sons)

## Döntések (03.06)

- **Font:** Playfair Display → Roboto 700 (display font mindenhol)
- **Navbar gomb:** E stílus — outline + halvány narancs háttér tint + shadow (kifelé + befelé)
- **Tartalmi gap:** Azonosítva hogy a főoldal vizuálisan lenyűgöző de a látogató nem kap elég kontextust a demók között — megbeszélés kell (P23)
- **P23 szövegek:** Véglegesítve — semleges, tárgyilagos, hétköznapi nyelv. Nem sales, nem személyeskedés, nem kérdések. Tényszerű bemutató ami leírja mi az adott dolog és mit csinál. HU/DE/EN fordítások kész.
- **P23 elhelyezés:** Preview kártyák ALÁ kerülnek leírásként
- **Navbar layout:** B+V1 — logo nagyobb (1.35rem), szolgáltatások kibontva középen, Tudnivalók ponttal elválasztva, Kapcsolat E stílus, nyelvváltó E stílus, szeparátor vonal
- **"Folyamat" → "Tudnivalók"** — az aloldal ki lesz bővítve (nem csak 4 lépés, hanem teljes bemutató: működés, lehetőségek, közös munka stb.)
- **Route:** /folyamat → /tudnivalok
- **Kapcsolat gomb:** solid narancs → E stílus (outline + tint + shadow, mint a nyelvváltó)
- **Amelia stílus:** Önirónia, saját helyzetéről mesél, színfalak mögötti bepillantás, Norbi-t szidja szeretettel. Emojik csak arckifejezések, csak mondatok végén. Tegez. 10 mondat HU/DE/EN.

---

## Linkek

- **Domain:** iverso.info
- **GitHub:** github.com/iverso369/iverso
- **Vercel:** iverso-orpin.vercel.app
