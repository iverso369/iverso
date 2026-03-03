# IVERSO — Projekt Napló

> Utolsó frissítés: 2026.03.03

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
- **Fontok:** Syne (display/címek), DM Sans (body/szövegtörzs)
- **Ikonok:** SVG thin line (1.5px stroke, currentColor)
- **Emojik:** nincsenek sehol (kivéve Amelia)
- **Háttér:** "Ultra mély" gradient

---

## Tech stack

- **Framework:** Vite + React (SPA), TypeScript
- **Styling:** CSS Modules
- **Routing:** react-router-dom
- **i18n:** react-i18next (HU/DE/EN)
- **Hero:** Three.js (desktop) + Canvas 2D (mobil)
- **Scroll:** Intersection Observer API
- **Deploy:** GitHub → Vercel (auto-deploy)
- **Fontok:** Syne + DM Sans, self-hosted woff2 (GDPR)

---

## Build plan — 7 réteg

### Réteg 1 — Alap ✅ KÉSZ
Projekt, routing, színek, fontok, háttér, i18n váz.

### Réteg 2 — Háttér + Hero ⚠️ JAVÍTANDÓ
Three.js parázs particle rendszer — a másik beszélgetésben implementálva, de problémás. A javítás itt folytatódik (ebben a projekt chatben).

### Réteg 3 — Építőkockák ✅ KÉSZ
5 ui/ komponens (KpiCard, ChatBubble, WorkflowNode, MiniWebsite, CompanySizeSlider).

### Réteg 4 — Jelenetek ⚠️ IMPLEMENTÁLVA, JAVÍTANDÓ
Minden jelenet implementálva és összeszerelve, DE az első review után komoly problémák:
- Preview-k vizuálisan gyengék, nem adják az "élő demó" érzést
- Méretek nem egységesek
- Építős szekció nem interaktív eléggé
- Részletek: RETEG_4_NAPLO.md

### Réteg 5 — Aloldalak ⬜ vár
### Réteg 6 — Amelia ⬜ vár
### Réteg 7 — Polish ⬜ vár

---

## Hol tartunk most

**Repo:** github.com/iverso369/iverso — aktív

**Amit most csinálunk:** Réteg 2 + Réteg 4 javítása — visszatérés az eredeti vízióhoz. A preview-k, az építős szekció és a parázs hero újratervezése.

**Implementáció állapota:**
- ✅ Réteg 1 (Alap) — KÉSZ
- ⚠️ Réteg 2 (Háttér + Hero) — JAVÍTANDÓ (itt folytatjuk, nem a másik chatben)
- ✅ Réteg 3 (Építőkockák) — KÉSZ
- ⚠️ Réteg 4 (Jelenetek) — IMPLEMENTÁLVA, JAVÍTANDÓ
- ⬜ Réteg 5 (Aloldalak)
- ⬜ Réteg 6 (Amelia)
- ⬜ Réteg 7 (Polish)

---

## Linkek

- **Domain:** iverso.info
- **GitHub:** github.com/iverso369/iverso
