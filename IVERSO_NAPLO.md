# IVERSO — Projekt Napló

> Utolsó frissítés: 2026.02.28

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

**FONTOS:** Korábban volt 4 külön szolgáltatás szín (cyan, kék, lila, narancs) — ezek **TÖRÖLVE**. Az egész oldal egységesen a 3 alapszínt használja. A szolgáltatásokat nem szín különbözteti meg, hanem az interaktív tartalom maga.

---

## Főoldal — 7 jelenet (scroll élmény)

| # | Jelenet | Lényeg |
|---|---------|--------|
| 1 | Parázs hero | Teljes képernyős parázs particle effekt. NEM tűz — parázs. |
| 2 | IVERSO + "Let's build something" | Parázs halványul, felirat megjelenik. |
| 3 | 4 mini demó előzetes | Dashboard, AI, Automatizáció, Weboldalak — egyforma súllyal, egymás alatt. |
| 4 | Folyamat | 4 interaktív node: Beszélgetés → Tervezés → Építés → Átadás |
| 5 | Építős szekció | Drag/tap blokkok → morph → mini dashboard. "Let's build something" megelevenedik. |
| 6 | CTA (Amelia ízelítő) | Chat buborék + "Beszéljünk →" gomb → /kapcsolat |
| 7 | Footer | Minimális: Impressum + Adatvédelem + © |

### Hero technológia
- **Gépen:** Three.js — teljes 3D parázs particle rendszer
- **Mobilon:** CSS + Canvas 2D — ugyanaz a hangulat, könnyebb
- **Automatikus váltás** eszköz alapján

### Scroll animációk (eldöntve a storyboardban)
- Intersection Observer, threshold 0.15, egyszer triggerelődik
- 2. jelenet: Depth fade (elmosódásból élesedik)
- 3. jelenet: Stagger rise (egymás után emelkednek, 0.12s késleltetéssel)
- 4. jelenet: Node sequence (node-ok sorban kipattannak + vonal kitöltődik)
- 5. jelenet: Block drop (blokkok fentről beesnek forgással)
- 6. jelenet: Glow reveal + Bubble pop
- 7. jelenet: Simple fade
- **Vizuális finomhangolás gépen** — a konkrét értékek (easing, duration, stb.)

### Navigáció
- Hero-nál: **nincs nav**, csak nyelvváltó gomb jobb felső sarokban
- Scrollra: diszkrét nav sáv besúszik felülről
- Visszagörgetés hero-hoz: nav eltűnik, csak nyelvváltó marad

### Nav formátum
```
IVERSO    Szolgáltatások▾    Folyamat    Kapcsolat    HU▾
```
- Szolgáltatások dropdown: Dashboardok, AI, Automatizáció, Weboldalak
- Folyamat = "hogyan dolgozom" (nem szolgáltatás, külön menüpont)
- Mobilon: hamburger menü (fullscreen overlay)

---

## Aloldalak

| Útvonal | Tartalom |
|---------|----------|
| /dashboardok | Interaktív dashboard demó + CompanySizeSlider |
| /ai | Chat felület demó + gyorsválasz gombok |
| /automatizacio | Workflow demó + CompanySizeSlider (node szám és komplexitás változik szintenként) |
| /weboldalak | CompanySizeSlider (komplexitás) + weboldal konfigurátor |
| /folyamat | 4 lépés részletesen (Beszélgetés → Tervezés → Építés → Átadás) |
| /kapcsolat | Amelia teljes chat |
| /impressum | Kötelező (Nebengewerbe) |
| /adatvedelem | Kötelező (Datenschutz) |

### Aloldal közös struktúra
1. Sub-hero (tag badge + cím + alcím + narancs radial gradient háttér)
2. CompanySizeSlider — 4 szint (mind a 4 szolgáltatás aloldalon)
3. Interaktív demó (böngésző keretben)
4. CTA + Footer

### Háttér effekt — mindenhol él
- **Gépen:** Three.js mindenhol (hero intenzív, aloldalak visszafogott)
- **Mobilon:** Canvas 2D mindenhol (hero intenzív, aloldalak visszafogott)
- Egy parázs rendszer, "intensity" paraméterrel — nem különböző tech, csak intenzitás különbség
- A háttér lélegzik, van mélysége, nem "halott" — aloldalakon visszafogottabb, tartalom van előtérben

---

## Háromnyelvűség

- **Alapnyelv:** magyar
- **Fordítások:** német + angol
- **"Let's build something"** — MINDIG angolul, minden nyelven
- **Demók tartalma nyelvfüggő:** HU → magyar cégek, DE → német cégek, EN → angol cégek
- **Nyelvváltás:** automatikus böngésző nyelv + váltó gomb

---

## Amelia (CTA karakter)

- **Főoldalon:** ízelítő (egy mondat + gomb)
- **/kapcsolat oldalon:** teljes chat
- **Személyiség:** ironikus, szókimondó, "hatalmas forma", vannak beszólásai, de tud komoly is lenni
- Norbi-val: szidja viccelődve a háta mögött ("ő meg biztos valahol kényelmesen pihenget...")
- **Először magáz**, átvált tegezésre ha a látogató is tegez
- **Valódi AI** mögötte (API hívás), nem előre megírt válaszok
- Bármiről beszél, de visszatereli Iverso-ra
- Nincs üzenet limit, de természetesen terel Norbi felé ha konkrét lesz
- **Nő, 20-as évek**, AI-generált realisztikus avatár
- **Nyelvfüggő stílus**

---

## Közös építőkockák (ui/ komponensek)

Ezek az újrahasználható komponensek amikből a főoldali előzetesek ÉS az aloldalak is épülnek:

| Komponens | Főoldalon | Aloldalon |
|-----------|-----------|-----------|
| KpiCard | 2-3 db, kis méret | 8-10 db, nagy, slider változtatja |
| ChatBubble | 1 db, typing animáció | Sok db, teljes chat |
| WorkflowNode | 3 db, adat flow animáció | 3-10+ db, slider változtatja (egyedül: kevés, nagyvállalat: komplex hálózat) |
| MiniWebsite | 1 db, loader animáció | 1 db, konfigurátor változtatja |
| CompanySizeSlider | NINCS | Van (mind a 4 szolgáltatás aloldalon) |

---

## Tech stack

- **Framework:** Vite + React (SPA)
- **Nyelv:** TypeScript
- **Routing:** react-router-dom
- **i18n:** react-i18next
- **Hero:** Three.js (desktop) + Canvas 2D (mobil)
- **Scroll:** Intersection Observer API
- **Deploy:** GitHub → Vercel (auto-deploy)
- **Styling:** CSS Modules (minden komponens saját CSS-e, nevek nem ütköznek)

---

## Build plan — 7 fázis

"Lassan de biztosan" — nem csinálunk semmit kétszer.

---

### Réteg 1 — Alap ✅ Átbeszélve

Projekt, routing, színek, fontok, háttér, i18n váz, hooks.

**Nincs nyitott kérdés.**

---

### Réteg 2 — Keretek ✅ Átbeszélve

Nav, SubpageLayout, főoldal/aloldal vázak, háttér effekt stratégia.

**Nincs nyitott kérdés.**

---

### Réteg 3 — Építőkockák ✅ Átbeszélve

5 újrahasználható ui/ komponens — logika eldöntve, vizuális design gépen.

**KpiCard:**
- Többféle számformátum: €, %, db, +/-
- Count-up animáció csak első megjelenéskor (scroll-ra)
- Slider váltáskor más KPI típusok jelennek meg (nem csak számok nőnek, új kártyák is jönnek)

**ChatBubble:**
- Bot: bal oldalt, sötétebb háttér
- User: jobb oldalt, narancs árnyalat
- Typing indicator: 3 pulzáló pont + bot neve felette látszódik
- Avatár: Ameliánál igen (realisztikus arc), demó chatbotban ikon vagy nincs

**WorkflowNode:**
- Hover-re: tooltip (rövid leírás)
- Kattintásra: kinyit (részletes leírás)
- Aktív/inaktív: mindkettő — kattintható ÉS animált adat flow is van
- "Workflow indítása" gombra adat végigszalad a node-okon sorban (narancs glow + fénypont a vonalon)

**MiniWebsite:**
- Böngésző keret: színes dot-ok (piros/sárga/zöld, klasszikus macOS)
- URL sáv: nyelvfüggő fiktív domain (HU: kovacs-kft.hu, DE: mueller-gmbh.de, EN: smith-co.com)

**MiniWebsite konfigurátor (/weboldalak aloldalon):**
- CompanySizeSlider MÉGIS VAN — először slider (cég méret → komplexitás szint), aztán konfigurátor
- Slider szintek: Egyedül (landing page) → Kis csapat (céges oldal) → Több részleg (komplex) → Komoly szervezet (enterprise)
- Vezérlők: tab rendszer (Alap | Tartalom | Layout | Effekt)
- Mobilon: fent preview (~60%), alul tab-os vezérlők (~40%)
- Gépen: fent tab-ok egy sorban, alatta nagy preview
- Konfigurátor lehetőségek:
  - Sötét/világos mód
  - Stílus/téma (modern, minimal, bold, classic)
  - Színvilág (meleg, hűvös, élénk, pasztell)
  - Iparág — ikonos gombok (kés-villa=étterem, olló=fodrász, stb.), minden szinten elérhető, 5-6 iparág
  - Font választó
  - Layout (hero pozíció, oszlopok, menü helye)
  - Szekciók ki-be kapcsolása (toggle-ök)
  - Animáció stílus (fade, slide, zoom — élőben látja)
  - CTA gomb szöveg szerkesztés (átírja → egyből változik)
  - Eszköz váltó (desktop/tablet/mobil nézet)
- Preview élőben reagál minden váltásra (nincs Apply gomb)
- Végén CTA: "Tetszik? Beszéljünk róla!" → Ameliához, beállítások átmennek

**CompanySizeSlider:**
- Slider (húzós sáv) — nem gombok/tabok
- 4 szint: Egyedül → Kis csapat → Több részleg → Komoly szervezet
- Váltáskor: instant (nincs animált átmenet a tartalomban)
- 4 aloldalon van: /dashboardok, /ai, /automatizacio, /weboldalak (mind a 4!)

**Még nyitott:** vizuális design gépen (méret, spacing, konkrét ikonok)

---

### Réteg 4 — Jelenetek ✅ Átbeszélve

Főoldal 7 jelenet kitöltése tartalommal.

**1-2. jelenet (Parázs + IVERSO felirat):** Kész a storyboardban, vizuális finomhangolás gépen.

**3. jelenet (4 mini demó előzetes):**
- Minden kártya: cím + 1 mondatos leírás + mini demó + "Tovább →"
- Sorrend: Dashboard → AI → Automatizáció → Weboldal
- Gépen: folyamatos animáció, mobilon: belépő animáció utána statikus

**4. jelenet (Folyamat):**
- 4 node: cím + 1 rövid mondat + ikon mindegyikben
- NEM linkel a /folyamat aloldalra — ennyi elég a főoldalon

**5. jelenet (Építős):**
- Különböző narancs árnyalatú blokkok (variáció)
- Nincs látható rács — szabadon rak bárhova, snap-el a helyére
- 8+ blokk, pattogó blokk hívogat, morph időzítve

**6. jelenet (CTA/Amelia):**
- Amelia buborék: random mondatok nyelvfüggően (minden látogatásnál más)
- CTA gomb: "Beszéljünk →" (HU), "Lass uns reden →" (DE), "Let's talk →" (EN)

**7. jelenet (Footer):** Minimális — Impressum + Adatvédelem + ©

**Még nyitott (gépen):** vizuális finomhangolás (scroll animáció értékek, morph animáció, demó előzetes mozgások)

---

### Réteg 5 — Aloldalak ✅ Átbeszélve

Részletes szolgáltatás oldalak.

**Eldöntve:**
- Nyelvfüggő cégnevek a demókban (HU: Kovács Kft, DE: Müller GmbH, EN: Smith Co)
- "Mire jó — mire nem" szöveges szekciók TÖRÖLVE — a demó magáért beszél
- /ai demó chatbot: 6 kérdés-válasz pár megírva (storyboardban)
- /folyamat: 4 lépés bővített szövege kész — semleges, tárgyilagos hangnem (nem személyes)
- /automatizacio alcím: n8n referencia törölve
- Sub-hero címek/alcímek véglegesítve mind a 4 szolgáltatás aloldalon

**Még nyitott (vizuális, gépen):**
- [ ] Konfigurátor vizuális design (/weboldalak)
- [ ] Dashboard demó vizuális részletek
- [ ] Workflow demó vizuális részletek

---

### Réteg 6 — Amelia ✅ Átbeszélve

AI chat integráció.

**Eldöntve:**
- Amelia átadás: email értesítés ha konkrét lesz az érdeklődő
- Amelia AI provider: később döntjük el

**Még nyitott (implementációkor):**
- [ ] Amelia AI provider kiválasztása

---

### Réteg 7 — Polish ✅ Átbeszélve

Loading, i18n, jogi, teljesítmény.

**Eldöntve:**
- Loading/Intro: IVERSO logó + szikrák → felgyűlnek középre → felirat kialakul → hero (2 mp) — jó ahogy van
- Cookie-Banner + Analitika: készülünk rá, implementációkor kerül be
- Impressum + Adatvédelem tartalom: implementációkor írjuk meg (Nebengewerbe-nek megfelelően)
- Performance: React lazy + code splitting, Three.js csak gépen, WebP képek, font preload + swap
- Accessibility: aria labels, keyboard nav, skip to content, reduced motion (egyszerűsített, nem kikapcsolt)
- OG meta tags: nyelvfüggő cím/leírás, OG image = parázs hero screenshot (fekete háttér, finomítás gépen)
- Fordítások: HU/DE/EN kész — külön fájlban (IVERSO_TRANSLATIONS.md)
- "Mire jó — mire nem" szöveges szekciók TÖRÖLVE

**Még nyitott (implementációkor):**
- [ ] Impressum + Adatvédelem tartalom megírása
- [ ] Cookie-Banner implementáció
- [ ] Háttér gradient finomhangolás gépen
- [ ] OG image finomhangolás gépen

---

## Hol tartunk most

**Repo:** törölve — újrakezdés tiszta lappal

**Ami kész:** storyboard (az elképzelés le van írva)

**Amit most csinálunk:** Mind a 7 fázis átbeszélve — implementáció következik

**Átbeszélés állapota:**
- ✅ Réteg 1 (Alap) — kész
- ✅ Réteg 2 (Keretek) — kész
- ✅ Réteg 3 (Építőkockák) — kész (logika eldöntve, vizuális design gépen)
- ✅ Réteg 4 (Jelenetek) — kész (tartalom eldöntve, vizuális finomhangolás gépen)
- ✅ Réteg 5 (Aloldalak) — kész (szövegek megírva, vizuális design gépen)
- ✅ Réteg 6 (Amelia) — kész (átadás: email, provider: később)
- ✅ Réteg 7 (Polish) — kész (fordítások megírva, technikai döntések meghozva, maradék implementációkor)

---

## Munkamódszer

Norbi vizuálisan gondolkodik. Claude mutat opciókat, Norbi reagál. Nem szavakkal tervez, hanem mutatásból választ. **Ötletelés > magyarázat.**

A build plan-t közösen beszéljük át — nem Claude írja meg egyedül és Norbi rábólint.

---

## Linkek

- **Domain:** iverso.info
- **GitHub:** github.com/iverso369/iverso
