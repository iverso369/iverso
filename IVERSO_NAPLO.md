# IVERSO — Projekt Napló

> Utolsó frissítés: 2026.03.09

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
- **Háttér:** Naplemente stílusú gradient (narancs fényoszlop közepén, barna mélység, vignette széleken) + Canvas 2D particle háttér (radial gradient sprite-ok, additív blending, hero szín szinkron)
- **Custom kurzor:** narancssárgás pont + trail (egész oldalon, mobilon nincs)

---

## Szövegírási stílus

- **Általános:** Semleges, tárgyilagos, hétköznapi nyelv. NEM sales, NEM személyeskedés, NEM kérdések, NEM feltételes mód, NEM manipuláció. Folyó szöveg, nem felsorolás.
- **Amelia:** Önirónia, saját helyzetéről mesél. Színfalak mögötti bepillantás, pozitív hangulat, Norbi-t szidja szeretettel. Emojik csak arckifejezések, csak mondatok végén. Tegez. Nem sales, nem manipulál.

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
- ✅ P23 tartalmi szövegek, P12 pozíció csere, P22 szín tompítás, P18 Amelia mondatok
- ✅ P24 "Let's build something" méretezés + responsive
- ✅ P25 navbar végleges
- ✅ P27 preview fontok
- ✅ P30 háttér gradient (naplemente stílus)
- ✅ Canvas 2D particle háttér (radial gradient sprite + additív blending + hero szín szinkron)
- ⬜ P26: Preview szövegek vizuális beágyazás
- ⬜ P28: Amelia szekció vizuális újratervezés
- ⬜ P29: Kétoldalt üres — nézd meg most a particle háttérrel
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

**Amit most csinálunk:** Réteg 4 — P26 szétbontva 3 promptra (A: háttér gradient, B: TextSection komponens, C: layout átstrukturálás). Claude Code végrehajtja, este gépen ellenőrzés. Layout döntés végleges: minden preview más forma (standard, split, fordított split, cinema overlay).

---

## Döntések (03.09)

- **Canvas 2D particle háttér:** Radial gradient sprite-ok + additív blending (`globalCompositeOperation: 'lighter'`). 600-800 részecske, nagyon alacsony opacity (0.03-0.15), átfedésnél fény összeadódik. Szín palette szinkronban a Three.js hero-val.
- **Particle megközelítés tanulság:** ctx.arc() + glow kör = konfetti. Radial gradient sprite + additív blending = parázs. A rajzolási technika számít, nem a paraméterek finomhangolása.
- **P26 szöveg szekciók:** V1 stílus — sötétítő zóna + bal accent vonal + irányított félvonalak. A szöveg nem dőlt, nem középre zárt, hanem bal oldalra igazított, max 640px.
- **Háttér gradient frissítés:** 3 rétegű radial gradient (narancs fényoszlop + vöröses mélység + barna szétterülés) — a HTML prototípusból átvéve.

## Nyitott ötletek (03.09 — még nem döntés!)

- **Preview sorrend:** Dashboard → AI → Weboldal → Automatizáció (Norbi preferencia)
- **Építős pozíció:** a 2. preview kártya (AI) után berakni — megtöri a monoton ritmust. Kérdés: "Let's build something" kontextus.
- **AutomationPreview:** újratervezés kell, a jelenlegi túl gyenge (4 node nyíllal, ennyi)
- **P28 Amelia szekció:** teljesen újratervezés, konkrét irány még nincs

---

## Linkek

- **Domain:** iverso.info
- **GitHub:** github.com/iverso369/iverso
- **Vercel:** iverso-orpin.vercel.app
