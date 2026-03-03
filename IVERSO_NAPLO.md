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
- **Szürke:** #88889A (másodlagos szöveg, pl. "Let's build something")
- **Fontok:** Syne (display/címek), DM Sans (body/szövegtörzs)
- **Ikonok:** SVG thin line (1.5px stroke, currentColor)
- **Emojik:** nincsenek sehol az oldalon (kivéve Amelia chat üzenetei)
- **Háttér:** "Ultra mély" gradient — narancs radial gradient felülről, vignette, film grain, lélegző fény. Nem reagál egérre. Finomhangolás gépen.

**FONTOS:** Korábban volt 4 külön szolgáltatás szín (cyan, kék, lila, narancs) — ezek **TÖRÖLVE**. Az egész oldal egységesen a 3 alapszínt használja.

---

## Főoldal — 7 jelenet (scroll élmény)

| # | Jelenet | Lényeg |
|---|---------|--------|
| 1 | Parázs hero | Teljes képernyős parázs particle effekt. NEM tűz — parázs. |
| 2 | IVERSO + "Let's build something" | Parázs halványul, felirat megjelenik. |
| 3 | 4 mini demó előzetes | Dashboard, AI, Automatizáció, Weboldalak — egyforma súllyal. |
| 4 | Folyamat | 4 interaktív node: Beszélgetés → Tervezés → Építés → Átadás |
| 5 | Építős szekció | Drag/tap blokkok → morph → mini dashboard. |
| 6 | CTA (Amelia ízelítő) | Chat buborék + "Beszéljünk →" gomb → /kapcsolat |
| 7 | Footer | Minimális: Impressum + Adatvédelem + (c) |

---

## Aloldalak

| Útvonal | Tartalom |
|---------|----------|
| /dashboardok | Interaktív dashboard demó + CompanySizeSlider |
| /ai | Chat felület demó + gyorsválasz gombok (6 kérdés-válasz pár) |
| /automatizacio | Workflow demó + CompanySizeSlider (node szám változik szintenként) |
| /weboldalak | CompanySizeSlider + weboldal konfigurátor |
| /folyamat | 4 lépés részletesen |
| /kapcsolat | Amelia teljes chat |
| /impressum | Kötelező (Nebengewerbe) |
| /adatvedelem | Kötelező (Datenschutz) |

---

## Közös építőkockák (ui/ komponensek)

| Komponens | Főoldalon | Aloldalon |
|-----------|-----------|-----------|
| KpiCard | 2-3 db, kis méret | 8-10 db, nagy, slider változtatja |
| ChatBubble | 1 db, typing animáció | Sok db, teljes chat |
| WorkflowNode | 3 db, adat flow animáció | 3-10+ db, slider változtatja |
| MiniWebsite | 1 db, loader animáció | 1 db, konfigurátor változtatja |
| CompanySizeSlider | NINCS | Van (mind a 4 szolgáltatás aloldalon) |

---

## Tech stack

- **Framework:** Vite + React (SPA)
- **Nyelv:** TypeScript
- **Routing:** react-router-dom
- **i18n:** react-i18next (HU/DE/EN)
- **Hero:** Three.js (desktop) + Canvas 2D (mobil)
- **Scroll:** Intersection Observer API
- **Deploy:** GitHub → Vercel (auto-deploy)
- **Styling:** CSS Modules
- **Fontok:** Syne + DM Sans, self-hosted woff2 (GDPR)

---

## Build plan — 7 réteg

---

### Réteg 1 — Alap ✅ IMPLEMENTÁLVA

Projekt, routing, színek, fontok, háttér, i18n váz.

**Részletek:** RETEG_1_NAPLO.md

---

### Réteg 2 — Háttér + Hero 🔄 GÉPEN FOLYAMATBAN

Three.js parázs particle rendszer (desktop), prompt 01 kész. Mobil verzió, useIsMobile, intensity, felirat, loading intro következik.

**Részletek:** RETEG_2_NAPLO.md

---

### Réteg 3 — Építőkockák ✅ IMPLEMENTÁLVA

5 újrahasználható ui/ komponens — mind az 5 implementálva és pusholva.

**KpiCard:** Ikon + szám + label + változás jelző (piros/zöld kivétel) + donut progress ring. Count-up animáció, sötétebb fekete (#111) háttér.

**ChatBubble:** Bot (bal, sötét háttér, typing indicator) + User (jobb, narancs). Avatár slot (SVG ikon VAGY kép). Lekerekített sarkak.

**WorkflowNode:** n8n stílus, lekerekített téglalap, ikon + cím. Inaktív (szürke) / aktív (narancs glow). Hover tooltip, kattintás kinyit. Connection pontok.

**MiniWebsite:** Böngésző keret wrapper (macOS dot-ok, HTTPS lakat, nyelvfüggő domain). Children-ként kapja a tartalmat — minden demóhoz használjuk.

**CompanySizeSlider:** Húzós slider sáv, 4 snap pont. Narancs kitöltődő sáv, szint neve felette. onChange callback.

**Részletek:** RETEG_3_NAPLO.md

---

### Réteg 4 — Jelenetek 🔄 FOLYAMATBAN

Főoldal 7 jelenet kitöltése tartalommal + navigáció.

**Kész:**
- ✅ Nav + Nyelvváltó (scroll-aware, hamburger mobilon, dropdown gépen)
- ✅ DashboardPreview (3 KpiCard MiniWebsite keretben, count-up loop gépen)
- ✅ AiChatPreview (3 üzenetes chat demó, szekvenciális lejátszás, loop gépen)
- ✅ AutomationPreview (4 WorkflowNode, SVG vonalak, adat flow animáció loop)

**Folyamatban:**
- 📋 WebsitePreview (prompt kész, implementáció folyamatban)

**Következik:**
- Folyamat szekció, Építős szekció, CTA + Footer
- Home.tsx összeszerelés (scroll animációk, Intersection Observer)

Komponensek NEM kötődnek be Home.tsx-be menet közben — prompt 09-ben áll össze minden.

**Részletek:** RETEG_4_NAPLO.md

---

### Réteg 5 — Aloldalak ✅ Átbeszélve

Részletes szolgáltatás oldalak.

**Eldöntve:**
- Nyelvfüggő cégnevek a demókban (HU: Kovács Kft, DE: Müller GmbH, EN: Smith Co)
- "Mire jó — mire nem" szöveges szekciók TÖRÖLVE — a demó magáért beszél
- /ai demó chatbot: 6 kérdés-válasz pár megírva (storyboardban)
- /folyamat: 4 lépés bővített szövege kész — semleges, tárgyilagos hangnem
- /automatizacio alcím: n8n referencia törölve
- Sub-hero címek/alcímek véglegesítve

---

### Réteg 6 — Amelia ✅ Átbeszélve

AI chat integráció. Amelia átadás: email értesítés. AI provider: később döntjük el.

---

### Réteg 7 — Polish ✅ Átbeszélve

Loading/Intro, Cookie-Banner, Impressum/Adatvédelem tartalom, Performance, Accessibility, OG meta tags, fordítások véglegesítése.

---

## Hol tartunk most

**Repo:** github.com/iverso369/iverso — aktív

**Amit most csinálunk:** Réteg 4 (Jelenetek) — főoldal 7 jelenet kitöltése tartalommal

**Implementáció állapota:**
- ✅ Réteg 1 (Alap) — IMPLEMENTÁLVA
- 🔄 Réteg 2 (Háttér + Hero) — gépen folyamatban
- ✅ Réteg 3 (Építőkockák) — IMPLEMENTÁLVA
- 🔄 Réteg 4 (Jelenetek) — FOLYAMATBAN (Nav ✅, Dashboard ✅, AiChat ✅, Automation ✅, Website 📋)
- ⬜ Réteg 5 (Aloldalak)
- ⬜ Réteg 6 (Amelia)
- ⬜ Réteg 7 (Polish)

---

## Munkamódszer

Norbi vizuálisan gondolkodik. Claude mutat opciókat, Norbi reagál. Nem szavakkal tervez, hanem mutatásból választ. **Ötletelés > magyarázat.**

---

## Linkek

- **Domain:** iverso.info
- **GitHub:** github.com/iverso369/iverso
