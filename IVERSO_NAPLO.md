# IVERSO — Projekt Napló

> Utolsó frissítés: 2026.03.05

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
### Réteg 2 — Háttér + Hero ✅ KÉSZ
### Réteg 3 — Építőkockák ✅ KÉSZ

### Réteg 4 — Jelenetek 🔄 JAVÍTÁS FOLYAMATBAN
- ✅ Nav, DashboardPreview, AiChatPreview, AutomationPreview, WebsitePreview, CTA, Footer
- ✅ Navbar mindig látható + Hero magasság ~50vh
- ✅ Audit fixek (EN $→€, Syne CSS, package.json name)
- ✅ Preview kártyák szélesség (85vw), jobb klikk tiltás, Weboldalak dropdown fix, encoding fix
- ⬜ Design döntések: Navbar újratervezés, font váltás, IVERSO↔LBS csere, Amelia szekció, WebsitePreview szín
- ⬜ Építős szekció, Folyamat finomhangolás
- Részletek: IVERSO_JAVITAS_TERV.md

### Réteg 5 — Aloldalak ⬜ vár
### Réteg 6 — Amelia ⬜ vár
### Réteg 7 — Polish ⬜ vár

---

## Hol tartunk most

**Repo:** github.com/iverso369/iverso — aktív
**Deploy:** iverso-orpin.vercel.app

**Amit most csinálunk:** Réteg 4 — gyors fixek kész, következő a 2. kör: design döntések (navbar újratervezés + font, IVERSO↔LBS pozíció csere, IVERSO felirat CTA fölé, Amelia szekció, WebsitePreview szín).

---

## Audit (2026.03.05)

- Build ✅, TypeScript ✅, 238 i18n kulcs szinkronban (HU/DE/EN)
- ✅ EN pénznem $→€ javítva
- ✅ DashboardPreview CSS Syne maradék + hardcoded fontok javítva
- ✅ package.json name javítva
- **Döntés:** Dashboard demó cégnevek maradnak pékségként (Molnár Pékség / Bäckerei Müller / Baker & Sons)

---

## Linkek

- **Domain:** iverso.info
- **GitHub:** github.com/iverso369/iverso
- **Vercel:** iverso-orpin.vercel.app
