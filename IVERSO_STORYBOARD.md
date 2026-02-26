# IVERSO — Scroll Storyboard
## Utolsó frissítés: 2026.02.26

## Az élmény egy mondatban
A látogató úgy érezze: *"Hú, ilyet én is akarok a cégemnek."*

## A legfontosabb felismerés
Az oldal nem szekciókból áll — hanem **él**. Minden reagál: hover, kattintás, scroll, touch. A látogató nem "weboldalt néz" — hanem **benne van valamiben**. Mint egy élő ökoszisztéma. Ez a "baszki" érzés amit minden szekción végig kell vinni, nem csak a hero-ban.

## Tempó
Lassan építkezik — hangulat, aztán tartalom. Nincs személyes "rólam" rész — a munka beszél.

## Bizalom
Nem kell külön bizalom-szekció (nincs referencia, garancia, számok). **Az oldal minősége maga a bizalom.** Ha az oldal brutál, az elég.

---

## Vizuális szabályok
- **3 szín**: fekete (#0A0A0C), fehér (#EDEDF0), narancs (#F77F0A)
- **Ikonok**: SVG thin line (1.5px stroke, currentColor)
- **Emojik**: nincsenek sehol
- **Fontok**: Syne (display), DM Sans (body)
- **Háttér**: #0A0A0C + **"Ultra mély" gradient** — drámai narancs radial gradient felülről, több mélységi réteg, vignette, film grain, lélegző fény. Nem reagál egérre. Közepes intenzitás. Végig ugyanaz. Finomhangolás VS Code-ban. 


---

## Oldalstruktúra

### Főoldal (scroll élmény)
1. Parázs (hero)
2. IVERSO + "Let's build something"
3. 4 mini demó előzetes (web, dashboard, AI, auto)
4. Folyamat — rövid (hogyan dolgozom, 3-4 interaktív node)
5. Építős interaktív szekció
6. CTA — Amelia ízelítő
7. Footer (minimális)

### Aloldalak
- **/dashboardok** — részletes demó + CompanySizeSlider
- **/ai** — részletes AI demó
- **/automatizacio** — részletes workflow demó
- **/weboldalak** — részletes weboldal demó
- **/folyamat** — részletes folyamat oldal (hogyan dolgozom)
- **/kapcsolat** — Amelia teljes chat
- **/impressum** — kötelező (Nebengewerbe)
- **/adatvedelem** — kötelező (Datenschutz)

---

## 1. jelenet — PARÁZS (nem tűz!)
**Mi látszik:** Teljes képernyős parázs particle effekt. IVERSO felirat narancs gradienssel, körülötte izzó részecskék szállnak felfelé. "Let's build something" fade-in 1.5 mp után.

**NEM tűz/láng — hanem parázs:** sok apró izzó részecske, pulzálnak, szállnak.

**Interakció:**
- Magától él — részecskék pulzálnak, szállnak felfelé
- Hover: a parázs felerősödik a betűkön (nagyobb, fényesebb részecskék)
- Kattintás/tap: a részecskék szétrobbannak, majd visszaállnak

**Technológia:**
- Gépen ÉS mobilon: CSS + Canvas 2D (a prototípus alapján mindkettőn fut)
- Touch támogatás beépítve
- Ultra mély gradient háttér mögötte


**Érzés:** *"Ez más."*

---

## 2. jelenet — IVERSO + LET'S BUILD SOMETHING
**Átmenet:** A parázs halványul de NEM tűnik el — marad háttérben. Az IVERSO felirat ráúszik.

**Mi látszik:**
```
        IVERSO
  Let's build something
```

**Részletek:**
- IVERSO: Syne, 800 weight, narancs (#F77F0A), nagy méret
- "Let's build something": Syne, 600 weight, szürke (#88889A), kisebb — MINDIG angolul, minden nyelven
- A parázs halványan mögötte pislákol

**Érzés:** *"Oké, figyelek."*

---

## 3. jelenet — 4 MINI DEMÓ ELŐZETES
**Átmenet:** A parázs teljesen elhalványul, fekete háttér marad (+ térhatás effekt).

**Elrendezés:** 4 nagy mini demó egymás alatt, egyforma vizuális súllyal. Mindegyik tartalmaz egy mini verziót a demóból (pl. 2 KPI kártya) + "Tovább →" ami morph animációval megnyitja a részletes aloldalt.

**Morph animáció:**
- Gépen: fancy expand effekt
- Mobilon: smooth slide-up teljes képernyőre

**A 4 demó (sorrend nem fontossági — mind egyforma):**

### 3A — Dashboard
- Mini demó: 2-3 KPI kártya előzetes
- Aloldalon: teljes interaktív dashboard + CompanySizeSlider ("Mekkórák vagytok?")
- CompanySizeSlider: Egyedül dolgozom → Kis csapat → Több részleg → Komoly szervezet
- A demó tartalma változik a slider alapján

### 3B — AI Chatbot
- Mini demó: egy chat buborék előzetes
- Aloldalon: teljes chat felület, gyorsválasz gombok + szabad input

### 3C — Automatizáció
- Mini demó: workflow node-ok előzetes
- Aloldalon: 6 node-os workflow, kattintható, animálható

### 3D — Weboldalak (ÚJ — korábban hiányzott)
- Mini demó: egy mini weboldal előzetes
- Aloldalon: részletes weboldal demó (konkrét formátum még nyitott — gépen tervezzük)

**Megjelenés:** Scroll reveal animáció, szekciók között gap.

**Érzés:** *"Várj, ez tényleg működik? Ilyet akarok."*

---

## 4. jelenet — FOLYAMAT (hogyan dolgozom)
**Helye a flow-ban:** MIT csinálok (demók) → HOGYAN csinálom (folyamat) → TE is csináld (építős)

**Főoldalon:** Rövid, 3-4 interaktív node — ugyanaz a stílus mint a workflow demó, de a saját munkafolyamatomra.
Pl: Beszélgetés → Tervezés → Építés → Átadás

**Aloldalon (/folyamat):** Részletesebb verzió, több infóval minden lépésnél.

**Interaktív:** Kattintható node-ok, animált flow — pont mint a workflow demó.

**Érzés:** *"Értem hogyan működik. Egyszerű, átlátható."*

---

## 5. jelenet — ÉPÍTŐS INTERAKTÍV SZEKCIÓ
**A "Let's build something" szlogen szó szerint megelevenedik.**

**Flow:**
1. Megjelenik: *"Let's build something"* felirat
2. Egy narancs blokk pattog/ugrik a rács mellett: *"Húzz be!"* — ez tanítja meg mit kell csinálni
3. A látogató húzza/tappolja a blokkokat a rácsba
4. Amikor eleget rakott → a blokkok MORPHOLNAK: mindegyik más élő elem lesz
   - Egyik → mini chat buborék
   - Másik → grafikon
   - Harmadik → KPI kártya
   - Negyedik → workflow node
5. Összeáll egy mini működő felület
6. Alatta megjelenik a CTA

**Mobilon:** Tap = blokk lerakás. Ha valaki nem interaktál, az ugráló blokk hívogatja. A morph rész CSS + Canvas, nem igényel külön interakciót.

**Érzés:** *"Amit leraktam, abból valami lett. Wow."*

---

## 6. jelenet — CTA (Amelia ízelítő)
**Mi látszik:**
```
    Van egy ötleted?
    Építsük meg.

    [Amelia chat buborék: "Hali! Mesélj, miben gondolkodsz?"]

    [ Beszéljünk → ]  ← ez visz a /kapcsolat oldalra
```

**A főoldalon:** Csak ízelítő — Amelia mond egy mondatot + gomb a teljes chat-hez.
**A /kapcsolat oldalon:** Amelia teljes képernyőn él, van helye a beszélgetésnek.

**Amelia jellemzői:**
- Norbi "társa" — nem egy chatbot, hanem egy **karakter**
- Nő, 20-as évek, fiatalos, láza energia
- AI-generált realisztikus arc (avatár)
- **Személyiség:** ironikus, szókimondó, "hatalmas forma", vannak beszólásai, veszi a lapot, benne van a hülyéskedésben
- **Norbi-val való viszony:** szidja a háta mögött viccelődve (pl. "én is itt gubbasztok mert Norbi ezt a feladatot adta nekem... ő meg biztos lazul valahol 😂")
- **De komoly is tud lenni** — amikor kell, profi és segítőkész
- **Megszólítás:** először magáz, aztán átvált tegezésre ha a látogató is tegez
- **Tudás:** bármiről beszél, de mindig visszatereli a témát az Iverso-ra
- **Okossága:** valódi AI (API hívás), nem előre megírt válaszok
- **Terelés:** nincs üzenet limit, de természetesen tereli a beszélgetést Norbi felé amikor konkrét lesz
- **Átadás:** módja még nyitott (email/webhook/admin felület)
- Nyelvfüggő stílus

**Norbi eredeti megfogalmazása Ameliáról (szó szerint):**
> "Olyan ai-t tudok elképzelni, mint ha a társam lenne... csak a neten...
> Úgy tudnám jellemezni, hogy: "hatalmas forma", "vannak beszolásai", írónikus, veszi a lapot, benne van a hülyéskedésbe, engem is "szidalmaz a hátam mögött (pl... "hát igen... én is itt gubbasztok, mert norbi ezt a feladatot adta nekem.... ő meg biztos valahol kényelmesen pihenget és lazul....(hogy rohadjon meg...😂😂)" pl ilyesmi stílusú)
> Viszont tudjon váltani és komoly is lenni, de ahogy kérdésben is feltetted, valamilyen szinten tereljen az iverso fele
> Tehát egy életrevaló ait tudok elképzelni, akinek van karaktere, stílusa, és önálló gondolatai..."

**Érzés:** *"Ez nem egy form. Ez egy beszélgetés."*

---

## 7. jelenet — FOOTER
**Minimális:**
- Impressum link
- Adatvédelem link
- © 2026 Iverso

---

## A teljes ív
```
SCROLL →

[  PARÁZS.......  ]  ← csak hangulat, semmi szöveg
[  IVERSO        ]  ← parázs halványul, felirat megjelenik
[  Let's build   ]
[  ..............  ]  ← átmenet feketébe
[  ● Dashboard   ]  ← mini demó előzetes → kattintásra morph → aloldal
[  ● AI Chat     ]  ← mini demó előzetes → kattintásra morph → aloldal
[  ● Workflow    ]  ← mini demó előzetes → kattintásra morph → aloldal
[  ● Weboldal    ]  ← mini demó előzetes → kattintásra morph → aloldal
[  ..............  ]
[  ⚙ FOLYAMAT    ]  ← 3-4 interaktív node (MIT → HOGYAN híd)
[  ..............  ]
[  🧱 ÉPÍTS!     ]  ← interaktív blokk építés → morph → mini dashboard
[  ..............  ]
[  💬 Amelia     ]  ← CTA ízelítő → /kapcsolat
[  — footer —    ]
```

---

## Eldöntött kérdések

### Nyelv
- **Alapnyelv:** magyar
- **Fordítások:** német + angol
- **"Let's build something"** mindenhol angolul marad, minden nyelven
- **Demók tartalma is nyelvfüggő:**
  - HU → magyar cégek (Kovács Kft, Nagy Építő...)
  - DE → német cégek (Müller GmbH, Schmidt Bau...)
  - EN → angol/nemzetközi cégek
- **Nyelvváltás:** automatikus böngésző nyelv alapján + váltó gomb

### Navigáció
- Hero-nál (parázs): nav NINCS, a nyelvváltó gomb egyedül látszik jobb felső sarokban
- Scrollra: diszkrét nav sáv besúszik felülről (menü linkek + nyelvváltó)
- Visszagörgetésre a hero-hoz: nav eltűnik, csak nyelvváltó marad

### Hero technológia
- CSS + Canvas 2D mindkét platformon (Three.js nem szükséges — a prototípus gépen és mobilon is fut)
- Parázs részecskék az IVERSO felirat körül
- Hover: felerősödik, kattintás/tap: szétrobban

### Bizalom
- Nincs külön szekció — az oldal minősége maga a bizalom

### CTA
- Főoldalon: Amelia ízelítő + gomb a /kapcsolat-ra
- /kapcsolat oldalon: Amelia teljes chat
- Amelia: karakter, nem chatbot — ironikus, szókimondó, hülyéskedik, de tud komoly lenni
- Nő, 20-as évek, AI-generált realisztikus avatár
- Először magáz, átvált tegezésre ha a látogató is tegez
- Valódi AI mögötte (API hívás) — bármiről beszél, visszaterel Iverso-ra
- Átadás módja Norbinak: még nyitott

### Footer
- Minimális: Impressum + Adatvédelem linkek

### Impressum / Adatvédelem
- Külön aloldalak: /impressum és /adatvedelem
- Tartalmat együtt rakjuk össze, Nebengewerbe-nek megfelelően

### Betöltés élmény
- IVERSO logó halványan + narancs szikrák pattognak a képernyő alján — érintsd meg és szikrázik
- 2 mp intro mindig (gyors neten is — nem fake loading, hanem intro animáció)
- Átmenet: szikrák felgyűlnek középre → IVERSO felirat kialakul belőlük → parázs hero indul

### Scroll animációk
- Szekciónként más animáció — minden szekció a saját karakteréhez passzol
- Intersection Observer alapú, threshold 0.15, egyszer triggerelődik
- Visszagörgetésre nem resetelődik (csak teszteléskor)

### Élő érzés a demókban
- Az előzetesek is mozognak/reagálnak a főoldalon — konkrétumokat gépen tervezzük

### Domain
- **iverso.info**

### Folyamat oldal
- Főoldalon: rövid, 4 interaktív node (demók és építős szekció között)
- Aloldalon (/folyamat): részletes verzió
- Stílus: workflow demó-szerű interaktív node-ok
- **4 lépés:** Beszélgetés → Tervezés → Építés → Átadás

---

## Gépen megbeszélendő — előkészített döntések

### 1. 3D háttér effekt ✅ ELDÖNTVE
- **"Ultra mély" gradient** kiválasztva (iverso-gradient-v2.html, D verzió)
- Drámai narancs radial gradient felülről, több mélységi réteg, vignette, film grain, lélegző fény
- Közepes intenzitás, nem reagál egérre, végig ugyanaz
- Finomhangolás VS Code-ban

### 2. Parázs hero ✅ ELDÖNTVE
- Működő prototípus kész (iverso-parazs-hero.html)
- CSS + Canvas 2D — gépen és mobilon is fut, nem kell Three.js
- Parázs részecskék az IVERSO felirat körül, hover erősödik, kattintásra szétrobban
- Finomhangolás VS Code-ban

### 3. Scroll animációk ✅ ELDÖNTVE
- **2. jelenet (IVERSO felirat):** Depth fade — elmosódásból élesedik, mélyből jön
- **3. jelenet (Demó kártyák):** Stagger rise — egymás után emelkednek fel, 0.12s késleltetéssel
- **4. jelenet (Folyamat):** Node sequence — node-ok sorban kipattannak + összekötő vonal kitöltődik
- **5. jelenet (Építős):** Block drop — blokkok fentről beesnek enyhe forgással
- **6. jelenet (CTA/Amelia):** Glow reveal + Bubble pop — lágy izzó felfedés, chat buborék kipattan
- **7. jelenet (Footer):** Simple fade

### 4. Mini demó előzetesek mozgása ✅ ELDÖNTVE
- **Gépen:** élnek amíg a képernyőn vannak:
  - Dashboard: számok felpörögnek + bar chart animálódik, folyamatosan mozog
  - AI Chat: beszélgetés lejátszódik (typing indicator → üzenetek), loop
  - Automatizáció: adat végigfolyik a node-okon (Email → Feldolgozás → Adatbázis → Értesítés)
  - Weboldal: mini böngésző progresszíven "betöltődik"
- **Mobilon:** belépő animáció (pl. számok felszámlálnak), utána statikusak
- Finomhangolás VS Code-ban

### 5. Weboldal demó formátum ✅ ELDÖNTVE
- **Konfigurátor** — igazi konfigurátor érzés, részletes, sok lehetőség
- **Konfigurálható elemek:**
  - Stílus (modern, minimal, bold, classic)
  - Szín/téma váltás
  - Iparág (étterem, ügyvéd, bolt, stb.) — tartalom is változik
  - Layout (elrendezés váltás)
- Élőben változik a mini weboldal minden váltásnál
- Finomhangolás VS Code-ban

### 6. Építős szekció ✅ ELDÖNTVE
- **8+ blokk** — igazi építés érzés, a látogató húzza/tappolja a rácsba
- Blokkok **szabadon** rakhatók — bárhova
- **Ha nem interaktál:** a pattogó blokk egész addig hívogatja ("Húzz be!")
- Morph animáció **időzítve** indul — pár mp után magától, nem kell gomb
- **Morph eredmény:** vegyes mini felület — chat buborék + grafikon + KPI kártya + workflow node (minden szolgáltatás 1-1 elem)
- Finomhangolás és prototípus VS Code-ban

### 7. Loading / Intro ✅ ELDÖNTVE
- **Mit lát:** IVERSO logó halványan + narancs szikrák pattognak a képernyő alján (érintsd meg → szikrázik)
- **Átmenet:** szikrák felgyűlnek középre → IVERSO felirat kialakul belőlük → parázs hero indul
- **Időtartam:** 2 mp (mindig, gyors neten is — nem fake loading, hanem intro animáció)
- Finomhangolás VS Code-ban

---

## Még nyitott kérdések
- [ ] Impressum + Adatvédelem tartalom megírása
- [ ] Amelia átadás módja (email/webhook/admin felület)
- [ ] Amelia mögötti AI provider (OpenAI/Anthropic/más)
- [ ] Cookie-Banner + Analitika (ha bekapcsoljuk, banner kötelező)

---

## Munkamódszer
Norbi vizuálisan gondolkodik. Claude mutat opciókat (HTML prototípok, kattintható verziók), Norbi reagál. Nem szavakkal tervez, hanem mutatásból választ. Ötletelés > magyarázat.
