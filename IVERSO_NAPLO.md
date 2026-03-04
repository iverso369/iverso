# IVERSO — Projekt Napló

> Utolsó frissítés: 2026.03.04

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
- **Fontok:** Playfair Display 900 (display/címek), DM Sans 400/500 (body) — self-hosted woff2
- **Ikonok:** SVG thin line (1.5px stroke, currentColor)
- **Emojik:** nincsenek sehol (kivéve Amelia)
- **Háttér:** "Ultra mély" gradient
- **Custom kurzor:** narancssárgás pont + trail (egész oldalon, mobilon nincs)

---

## Tech stack

- **Framework:** Vite + React (SPA), TypeScript
- **Styling:** CSS Modules
- **Routing:** react-router-dom
- **i18n:** react-i18next (HU/DE/EN)
- **Hero:** Three.js (desktop) + Canvas 2D (mobil)
- **Scroll:** Intersection Observer API
- **Deploy:** GitHub → Vercel (auto-deploy)
- **Fontok:** Playfair Display 900 + DM Sans 400/500, self-hosted woff2 (GDPR)

---

## Build plan — 7 réteg

### Réteg 1 — Alap ✅ KÉSZ
Projekt, routing, színek, fontok, háttér, i18n váz.

### Réteg 2 — Háttér + Hero ✅ KÉSZ
Three.js parázs particle rendszer — 4 javítási körön át.
- Javítás #1: teljes újraírás (canvas z-index fix) ✅
- Javítás #2: vizuális finomhangolás (pozíció, élő hatás, custom kurzor) ✅
- Javítás #3: élő szétszórt részecskék + felirat kontraszt ✅
- Javítás #4: particle viselkedés + Syne → Playfair Display 900 font váltás ✅

### Réteg 3 — Építőkockák ✅ KÉSZ
5 ui/ komponens (KpiCard, ChatBubble, WorkflowNode, MiniWebsite, CompanySizeSlider).

### Réteg 4 — Jelenetek 🔄 JAVÍTÁS FOLYAMATBAN
Minden jelenet implementálva, vizuális review után javítások zajlanak.
- Javítás #01: DemoCard unifikálás, egységes méretek, "Tovább" kártyán belül ✅
- Javítás #02: AutomationPreview node-ok fix + AiChatPreview teljes újratervezés ✅
- Javítás #03: DashboardPreview újratervezés — "A verzió" (sidebar + KPI + táblázat) 📋 prompt kész
- Még hátra: WebsitePreview újratervezés, Építős szekció, Folyamat finomhangolás
- Részletek: RETEG_4_NAPLO.md + IVERSO_JAVITAS_TERV.md

### Réteg 5 — Aloldalak ⬜ vár
### Réteg 6 — Amelia ⬜ vár
### Réteg 7 — Polish ⬜ vár

---

## Hol tartunk most

**Repo:** github.com/iverso369/iverso — aktív
**Deploy:** iverso-orpin.vercel.app

**Amit most csinálunk:** Réteg 4 javítások — DashboardPreview újratervezés (sidebar + KPI kártyák + táblázat). Prompt kész, implementáció Claude Code-ban következik.

---

## Linkek

- **Domain:** iverso.info
- **GitHub:** github.com/iverso369/iverso
- **Vercel:** iverso-orpin.vercel.app
