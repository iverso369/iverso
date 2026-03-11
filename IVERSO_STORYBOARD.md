# IVERSO — Scroll Storyboard
## Utolsó frissítés: 2026.03.09

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
- **Emojik**: nincsenek sehol az oldalon (kivéve Amélia chat üzenetei — ő használhat)
- **Fontok**: Roboto 700 (display), DM Sans 400/500 (body)
- **Háttér**: #0A0A0C + **naplemente stílusú gradient** — narancs fényoszlop középen, barna mélység mögötte, vignette a széleken. Nem reagál egérre. background-attachment: fixed. + **Canvas 2D particle háttér** (radial gradient sprite-ok, additív blending, Three.js hero palettájával szinkronban, mindig fut).
- **Szürke:** #88889A (másodlagos szöveg, pl. "Let's build something")

**FONTOS:** Korábban volt 4 külön szolgáltatás szín (cyan, kék, lila, narancs) — ezek **TÖRÖLVE**. Az egész oldal egységesen a 3 alapszínt használja. A szolgáltatásokat nem szín különbözteti meg, hanem az interaktív tartalom maga.

---

## Referencia képek

A repo gyökerében lévő `Képernyőkép_*.png` fájlok a **régi projektből** származnak. Ezek vizuális referenciaként szolgálnak a parázs hatás, izzó felirat, hover interakció kinézetéhez. **NEM a jelenlegi oldal képernyőképei.**

---

## Oldalstruktúra

### Főoldal (scroll élmény)
1. Parázs (hero)
2. IVERSO + "Let's build something"
3. 4 mini demó előzetes (dashboard, weboldal, AI, automatizáció)
4. Építős interaktív szekció
5. CTA — Amélia ízelítő
6. Footer (minimális)

### Aloldalak
- **/dashboardok** — részletes demó + CompanySizeSlider
- **/ai** — részletes AI demó + CompanySizeSlider
- **/automatizacio** — részletes workflow demó + CompanySizeSlider (node szám változik szintenként)
- **/weboldalak** — CompanySizeSlider (komplexitás) + weboldal konfigurátor
- **/tudnivalok** — részletes bemutató oldal: hogyan dolgozom (teljes folyamat), működés, lehetőségek, közös munka. A főoldalról kikerült folyamat szekció IDE kerül kibővítve. Új menüpont kell hozzá (a "Tudnivalók" nem elég egyértelmű).
- **/kapcsolat** — Amélia teljes chat
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
- **Gépen:** Three.js — teljes 3D parázs particle rendszer
- **Mobilon:** Canvas 2D — ugyanaz a hangulat, könnyebb, touch-kompatibilis
- **Automatikus váltás** eszköz alapján
- Touch támogatás beépítve
- Naplemente gradient háttér mögötte

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
- IVERSO: parázs particle felirat (Three.js)
- "Let's build something": Roboto 700, szürke (#88889A) — MINDIG angolul, minden nyelven
- A parázs halványan mögötte pislákol

**Érzés:** *"Oké, figyelek."*

---

## 3. jelenet — 4 MINI DEMÓ ELŐZETES
**Átmenet:** A parázs teljesen elhalványul, fekete háttér marad (+ Canvas 2D particle háttér).

**Elrendezés:** 4 nagy mini demó egymás alatt, egyforma vizuális súllyal. Mindegyik tartalmaz: cím + leíró szöveg + mini verziót a demóból + "Tovább →" ami megnyitja a részletes aloldalt.

**Sorrend:** Dashboard → Weboldal → AI → Automatizáció (fix, JOBB→BAL→JOBB→BAL demo pozíció)

**A 4 demó (sorrend nem fontossági — mind egyforma):**

### 3A — Dashboard
- Mini demó: sidebar + KPI kártyák + táblázat, 5 oldalas ciklikus animáció
- Aloldalon: teljes interaktív dashboard + CompanySizeSlider ("Mekkórák vagytok?")
- CompanySizeSlider: Egyedül dolgozom → Kis csapat → Több részleg → Komoly szervezet
- A demó tartalma változik a slider alapján

### 3B — AI Chatbot
- Mini demó: két panel (külső + belső chatbot), gyorsválasz gombok, input
- Aloldalon: teljes chat felület, gyorsválasz gombok + szabad input

### 3C — Automatizáció
- Mini demó: 4 workflow node + adat flow animáció
- Aloldalon: slider szintenként más node szám, kattintható, animálható

### 3D — Weboldalak
- Mini demó: világos krém pékség weboldal preview (saját paletta, Lora font)
- Aloldalon: részletes weboldal konfigurátor

**Megjelenés:** Scroll reveal animáció, szekciók között gap. Kártyák alatt semleges, tárgyilagos leíró szöveg (HU/DE/EN).

**Érzés:** *"Várj, ez tényleg működik? Ilyet akarok."*

---

## 4. jelenet — FOLYAMAT (hogyan dolgozom)
**Helye a flow-ban:** MIT csinálok (demók) → HOGYAN csinálom (folyamat) → TE is csináld (építős)

**Főoldalon:** Rövid, 4 interaktív node — mindegyikben: ikon + cím + 1 rövid mondat.
- Beszélgetés — "Megismerjük egymást."
- Tervezés — "Látod mielőtt elkészül."
- Építés — "Közben bármikor szólhatsz."
- Átadás — "Nem hagylak magadra."

NEM linkel a /tudnivalok aloldalra — ennyi elég a főoldalon.

**Aloldalon (/tudnivalok):** Részletesebb verzió, több infóval (nem csak 4 lépés, hanem teljes bemutató: működés, lehetőségek, közös munka).

**Interaktív:** Kattintható node-ok, animált flow — pont mint a workflow demó.

**Érzés:** *"Értem hogyan működik. Egyszerű, átlátható."*

---

## 4. jelenet — ÉPÍTŐS INTERAKTÍV SZEKCIÓ (Parázs Földgömb)
**A "Let's build something" szlogen szó szerint megelevenedik.**

**Flow:**
1. Megjelenik: *"Let's build something"* felirat
2. Bal oldalon egy parázs kocka pattog: *"Húzz be!"* — tanítja mit kell csinálni
3. A látogató kattint/húz → a kocka beugrik a rácsba (3x3), helyette új jelenik meg
4. A rács slotjaira is kattinthat direkt
5. Ahogy a rács telik:
   - A kockák **pontokká zsugorodnak**
   - **Parázs vonalak** húzódnak ki közöttük → hálózat
   - A hálózat **terjeszkedik**, közben **új kockák is megjelennek**
6. Az egész **KÖZÉPRŐL KIFELÉ terjeszkedve** összeáll egy **3D parázs particle FÖLDGÖMBBÉ**
7. A földgömb **KONTINENSEKET mutat** — parázs részecskékből, izzó narancs vonalakkal
8. A földgömb **lassan forog** (mint egy igazi földgömb), lélegzik, pulzál

**Interakció a földgömbön:**
- **Bal kattintás:** rombolódik (a részecskék szétesnek a kattintás helyén, majd visszaállnak)
- **Jobb kattintás:** szétrobban (az egész gömb szétrepül, majd visszaáll)

**Ha nem interaktál a látogató:** Az egész animáció automatikusan lefut — kockák maguktól beesnek, hálózat épül, földgömb összeáll.

**Blokkok kinézete:** Különböző narancs árnyalatok (variáció, nem egyszínű).
**Rács:** Halvány szaggatott szegély, nincs látható háló. Snap-el a helyére.

**Mobilon:** Tap = blokk lerakás. Ha valaki nem interaktál, automatikus. Touch támogatás a földgömbön.

**Referencia:** A projekt fájlok között lévő gömb morph képek — a kontinensek particle stílusa.

**Ez HELYETTESÍTI a korábbi P16-ot (IVERSO parázs a CTA fölé).** A földgömb tölti be ezt a szerepet.

**Érzés:** *"Amit leraktam, abból egy VILÁG lett. Aztakurva."*

---

## 6. jelenet — CTA (Amélia ízelítő)
**Mi látszik:**
```
    Van egy ötleted?
    Építsük meg.

    [Amélia chat buborék: random mondat — minden látogatásnál más]

    [ Beszéljünk → ]  ← ez visz a /kapcsolat oldalra
```

**Amelia buborék:** Véletlenszerű mondatok nyelvfüggően (10 variációból választ minden látogatásnál). Lásd AMELIA_MONDATOK.md.

**CTA gomb:** Nyelvfüggő — HU: "Beszéljünk →", DE: "Lass uns reden →", EN: "Let's talk →"

**A főoldalon:** Csak ízelítő — Amélia mond egy mondatot + gomb a teljes chat-hez.
**A /kapcsolat oldalon:** Amélia teljes képernyőn él, van helye a beszélgetésnek.

**Amélia jellemzői:**
- Norbi "társa" — nem egy chatbot, hanem egy **karakter**
- Nő, 20-as évek, fiatalos, láza energia
- AI-generált realisztikus arc (avatár)
- **Személyiség:** ironikus, szókimondó, "hatalmas forma", vannak beszólásai, veszi a lapot, benne van a hülyéskedésben
- **Stílus:** önirónia, saját helyzetéről mesél (nem a látogató felé személyeskedik), színfalak mögötti bepillantás, Norbi-t szidja szeretettel, pozitív hangulat
- **Emojik:** csak arckifejezések (😂😅😌😤🙄🥲), csak mondatok végén
- **Tegez**
- **Nem sales, nem manipulál**
- **Norbi-val való viszony:** szidja a háta mögött viccelődve (pl. "én is itt gubbasztok mert Norbi ezt a feladatot adta nekem... ő meg biztos lazul valahol 😂")
- **De komoly is tud lenni** — amikor kell, profi és segítőkész
- **Megszólítás:** először magáz, aztán átvált tegezésre ha a látogató is tegez
- **Tudás:** bármiről beszél, de mindig visszatereli a témát az Iverso-ra
- **Okossága:** valódi AI (API hívás), nem előre megírt válaszok
- **Terelés:** nincs üzenet limit, de természetesen tereli a beszélgetést Norbi felé amikor konkrét lesz
- **Átadás:** email értesítés Norbinak ha konkrét az érdeklődő
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
[  ● Dashboard   ]  ← mini demó előzetes → kattintásra → aloldal
[  ● AI Chat     ]  ← mini demó előzetes → kattintásra → aloldal
[  ● Workflow    ]  ← mini demó előzetes → kattintásra → aloldal
[  ● Weboldal    ]  ← mini demó előzetes → kattintásra → aloldal
[  ..............  ]
[  ⚙ FOLYAMAT    ]  ← 3-4 interaktív node (MIT → HOGYAN híd)
[  ..............  ]
[  🧱 ÉPÍTS!     ]  ← interaktív blokk építés → morph → mini dashboard
[  ..............  ]
[  💬 Amélia     ]  ← CTA ízelítő → /kapcsolat
[  — footer —    ]
```

---

## ALOLDALAK — Részletes felépítés

### Közös aloldal design elv: "Élő háttér mindenhol"

Az aloldalak IS kapnak particle effektet — Canvas 2D particle háttér + naplemente gradient (ugyanaz mint a főoldalon).

### Közös aloldal struktúra

Minden szolgáltatás aloldal (/dashboardok, /ai, /automatizacio, /weboldalak) ugyanazt a mintát követi:

```
┌──────────────────────────────────────────────┐
│  1. SUB-HERO                                 │
│     • Tag badge (narancs)                    │
│     • Cím (nagy, Roboto 700, fehér)          │
│     • Alcím/leírás (szürke, max 480px)       │
│     • Radial gradient háttér                 │
│                                              │
│  2. COMPANYSIZESLIDER                        │
│     • "Mekkora a vállalkozásod?"             │
│     • 4 szint: Egyedül → Kis csapat →        │
│       Több részleg → Komoly szervezet        │
│     • A slider alatt a tartalom változik     │
│       (más funkciók, más leírás szintenként) │
│     • Mind a 4 szolgáltatás aloldalon van    │
│                                              │
│  3. INTERAKTÍV DEMÓ                          │
│     • Böngésző keretben ("Dark Terminal")    │
│     • Élő, kattintható, reagáló             │
│     • A slider szintje befolyásolja          │
│                                              │
│  4. CTA                                      │
│     • "Érdekel?" + gomb → /kapcsolat         │
│                                              │
│  5. FOOTER                                   │
│     • Impressum + Adatvédelem + ©            │
└──────────────────────────────────────────────┘
```

### /dashboardok — részletes felépítés

**Sub-hero:**
- Tag: "Dashboardok" (narancs)
- Cím: pl. "Minden adat, egy helyen"
- Alcím: "Egy saját felület ahol minden élőben frissül, és úgy néz ki ahogy te akarod."

**CompanySizeSlider — tartalom szintenként:**
| Szint | Csomag neve | Funkciók |
|-------|-------------|----------|
| Egyedül | Alap dashboard | Pénzügyi áttekintés, naptár, egyszerű KPI-k |
| Kis csapat | Csapat dashboard | + ügyfélkezelés, feladatok, megosztás |
| Több részleg | Multi dashboard | + részleg szűrés, jogosultságok, riportok |
| Komoly szervezet | Enterprise | + audit log, KPI műszerfal, integrációk |

**Interaktív demó:**
- Böngésző keretben (színes dot-ok, URL sáv: nyelvfüggő domain)
- Sidebar navigáció: Áttekintés, Ügyfelek, Feladatok, Naptár, Riportok
- KPI kártyák (többféle formátum: €, %, db, +/- — count-up animáció scroll-ra)
- Táblázat sorokkal (cég, státusz badge)
- Tab váltás a sidebar-ban → tartalom változik
- A slider szintje más KPI típusokat mutat (nem csak számok nőnek, új kártyák is jönnek)

---

### /ai — részletes felépítés

**Sub-hero:**
- Tag: "AI megoldások" (narancs)
- Cím: pl. "Válaszol, amikor te nem érsz rá"
- Alcím: "Chatbotok és belső AI eszközök — a GYIK-bottól a komplex rendszerig."

**CompanySizeSlider — tartalom szintenként:**
| Szint | Csomag neve | Funkciók |
|-------|-------------|----------|
| Egyedül | GYIK chatbot | 24/7 válaszol gyakori kérdésekre |
| Kis csapat | Ügyfélszolgálati chatbot | + WhatsApp, érdeklődő rögzítés, átadás |
| Több részleg | Chatbot + belső AI | + összefoglaló, email generálás, osztályozás |
| Komoly szervezet | Komplex AI rendszer | + RAG tudásbázis, dashboard AI, döntéstámogatás |

**Interaktív demó:**
- Chat felület böngésző keretben (színes dot-ok, nyelvfüggő URL)
- Bot üzenetek (bal, sötétebb háttér, bot neve felette) + user üzenetek (jobb, narancs árnyalat)
- Gyorsválasz gombok: "Mire jó?", "Mennyire okos?", "Hogyan működik?"
- Szabad input mező + küldés gomb
- Beállítás panel: iparág, hangnem, nyelv — ezek befolyásolják a chatbot viselkedését
- Typing indicator (3 pont pulzál + bot neve)
- Előre megírt válaszok a demóban (nem valódi AI — az Amélia az)

**Demó chatbot kérdés-válasz párok:**
1. "Mire jó?" → "Képzeld el, hogy éjjel 2-kor ír neked egy ügyfél, és valaki azonnal, kedvesen válaszol neki. Nem te — hanem egy chatbot ami ismeri a szolgáltatásaidat, az áraid, a nyitvatartásod. Reggel már csak a konkrét érdeklődőkkel kell foglalkoznod."
2. "Mennyire okos?" → "Annyira amennyire te tanítod. Egy jól beállított chatbot a kérdések 80%-át megválaszolja — a maradék 20%-ot átadja neked. Nem helyettesít, kiegészít."
3. "Hogyan működik?" → "A chatbot a te weboldaladra kerül. Amikor valaki ír, a bot megnézi a tudásbázisát (amit te töltöttél fel: GYIK, árak, szolgáltatások) és válaszol. Ha nem tud, szól neked."
4. "Mennyibe kerül?" → "Ez attól függ mekkorák vagytok — egy egyszerű GYIK chatbot más mint egy komplex rendszer. Húzd feljebb a slidert és nézd meg melyik szint illik hozzád."
5. "Mi van ha téved?" → "Minden AI tévedhet — ezért van beépített biztonsági háló. Ha a bot nem biztos a válaszban, nem találgat, hanem átadja neked a kérdést. Te döntöd el hol húzod meg a határt."
6. "Milyen nyelveken?" → "Bármilyen nyelven amit beállítasz. Magyar, német, angol — vagy akár mind egyszerre. Az ügyfél ír németül, a bot válaszol németül."

---

### /automatizacio — részletes felépítés

**Sub-hero:**
- Tag: "Automatizáció" (narancs)
- Cím: pl. "Hogy ne te csináld amit a gép is tud"
- Alcím: "Munkafolyamatok amik maguktól futnak."

**CompanySizeSlider — tartalom szintenként:**
| Szint | Csomag neve | Funkciók | Node szám |
|-------|-------------|----------|-----------|
| Egyedül | 1-3 workflow | Űrlap kezelés, email, automatikus válasz | 3-4 egyszerű node |
| Kis csapat | 5-10 workflow | + rendelés, ügyfél értesítések, riportok | 5-6 node, elágazások |
| Több részleg | 10+ workflow | + több rendszer, monitoring, auto riportok | 8+ node, összekapcsolt rendszerek |
| Komoly szervezet | 20+ workflow | Teljes üzleti digitalizáció, ERP, audit | Komplex hálózat, párhuzamos ágak |

**Interaktív demó:**
- Workflow vizualizáció böngésző keretben
- Node szám és komplexitás VÁLTOZIK slider szintenként
- SVG vonalak kötik össze a node-okat
- Hover-re: tooltip (rövid leírás)
- Kattintásra: node kinyit (részletes leírás)
- "Workflow indítása" gomb: animált adat végigfolyik a node-okon (narancs glow + fénypont a vonalon)
- Aktív node: narancs border + glow

---

### /weboldalak — részletes felépítés

**Sub-hero:**
- Tag: "Weboldalak" (narancs)
- Cím: pl. "Az első benyomás a te kezedben"
- Alcím: "Modern weboldalak amik nem csak jól néznek ki — hanem dolgoznak is érted."

**CompanySizeSlider — tartalom szintenként:**
| Szint | Csomag neve | Funkciók |
|-------|-------------|----------|
| Egyedül | Landing page | 1-3 oldal, hero + bemutatkozás + kapcsolat |
| Kis csapat | Céges weboldal | 5-8 oldal, csapat, galéria, szolgáltatások |
| Több részleg | Komplex weboldal | Blog, több nyelv, portál |
| Komoly szervezet | Enterprise | Intranet, egyedi funkciók, integrációk |

A slider szintje befolyásolja a konfigurátor lehetőségeit (magasabb szint = több opció).

**Interaktív demó — KONFIGURÁTOR (valódi builder érzés):**

A látogató valós időben építi a saját weboldalát. A preview élőben reagál minden váltásra.

**Elrendezés:**
- **Gépen:** fent tab-os vezérlők egy sorban, alatta nagy preview
- **Mobilon:** fent preview (~60%), alul tab-os vezérlők (~40%), tab-ok közt swipe

**Vezérlő tab-ok:**
| Tab | Tartalmazza |
|-----|-------------|
| Alap | Sötét/világos mód, stílus/téma (modern, minimal, bold, classic), színvilág (meleg, hűvös, élénk, pasztell) |
| Tartalom | Iparág (ikonos gombok: kés-villa=étterem, olló=fodrász, stb.), szekciók ki-be kapcsolása (toggle-ök: értékelések, galéria, árak, GYIK), CTA gomb szöveg szerkesztés |
| Layout | Hero pozíció, oszlopok, menü helye, font választó |
| Effekt | Animáció stílus (fade, slide, zoom — élőben látja), eszköz váltó (desktop/tablet/mobil nézet) |

**Iparágak (5-6, ikonos gombok):**
Étterem, ügyvéd/tanácsadó, fodrász/szépség, orvos/egészség, bolt, építőipar
— minden szinten elérhető (iparág ≠ méret)

**Végén CTA:** "Tetszik? Beszéljünk róla!" → Ameliához, a beállítások átmennek

---

### /tudnivalok — részletes felépítés

**Sub-hero:**
- Tag nincs (ez nem szolgáltatás)
- Cím: HU "Hogyan dolgozom" / DE "So arbeite ich" / EN "How I work"
- Alcím: "4 lépés az ötlettől a kész megoldásig."

**Tartalom:** Kibővített verzió — nem csak a 4 lépés, hanem teljes bemutató: működés, lehetőségek, közös munka. A konkrét tartalom Réteg 5-nél készül el.

**Interaktív:** Kattintható node-ok, animált flow vonalak — részletesebb verzió mint a főoldalon.

---

### /kapcsolat — Amélia teljes chat

Lásd: 6. jelenet (Amélia) — teljes képernyős chat, nem csak ízelítő.

---

### /impressum és /adatvedelem

Egyszerű szöveges oldalak, SubpageLayout keretben.
Tartalom: még nyitott (Nebengewerbe-nek megfelelően írjuk meg).

---

### UI Építőkockák (közös komponensek) ✅ ELDÖNTVE

Az előzetesek (főoldal) és az aloldalak **közös építőkockákat** használnak:

| Építőkocka | Főoldalon | Aloldalon |
|------------|-----------|-----------|
| KpiCard | 2-3 db, kis méret | 8-10 db, nagy méret, slider változtatja (más KPI típusok szintenként) |
| ChatBubble | 1 db, typing animáció | Sok db, teljes chat felület |
| WorkflowNode | 3 db, adat flow animáció | 3-10+ db, slider változtatja (egyedül: kevés, nagyvállalat: komplex) |
| MiniWebsite | 1 db, loader animáció | 1 db, konfigurátor változtatja |
| CompanySizeSlider | NINCS (csak aloldalon) | Van (mind a 4 szolgáltatás aloldalon!) |
| DemoCard | Egységes keret mind a 4 preview-nak | NINCS (csak főoldalon) |

**KpiCard részletek:**
- Többféle számformátum: €, %, db, +/-
- Count-up animáció csak első megjelenéskor (scroll-ra)
- Slider váltáskor más KPI típusok jelennek meg (nem csak számok nőnek)

**ChatBubble részletek:**
- Bot: bal oldalt, sötétebb háttér + typing indicator (3 pulzáló pont) + bot neve felette
- User: jobb oldalt, narancs árnyalat
- Avatár: Ameliánál igen (realisztikus arc), demó chatbotban ikon vagy nincs

**WorkflowNode részletek:**
- Hover-re: tooltip (rövid leírás)
- Kattintásra: kinyit (részletes leírás)
- Kattintható ÉS animált adat flow is van ("Workflow indítása" → adat végigszalad, narancs glow + fénypont)

**MiniWebsite részletek:**
- Böngésző keret: színes dot-ok (piros/sárga/zöld, klasszikus macOS stílus)
- URL sáv: nyelvfüggő fiktív domain (HU: molnar-pekseg.hu, DE: baeckerei-mueller.de, EN: baker-and-sons.com)

**CompanySizeSlider részletek:**
- Slider (húzós sáv), nem gombok/tabok
- 4 szint: Egyedül → Kis csapat → Több részleg → Komoly szervezet
- Váltáskor: instant (nincs animált átmenet)

Ha módosítod a KpiCard kinézetét → mindenhol frissül.
Ha módosítod a Dashboard aloldalt → az előzetes nem törik el.

---

## Eldöntött kérdések

### Nyelv
- **Alapnyelv:** magyar
- **Fordítások:** német + angol
- **"Let's build something"** mindenhol angolul marad, minden nyelven
- **Demók tartalma is nyelvfüggő:**
  - HU → magyar cégek (Molnár Pékség, Nagy Építő...)
  - DE → német cégek (Bäckerei Müller, Schmidt Bau...)
  - EN → angol/nemzetközi cégek
- **Nyelvváltás:** automatikus böngésző nyelv alapján + váltó gomb

### Navigáció
- **Gépen: MINDIG látható** (scroll-aware kikapcsolva)
- Menüpontok: Dashboardok · AI · Automatizáció · Weboldalak · Tudnivalók | Kapcsolat | HU EN DE
- Szolgáltatások kibontva (nincs dropdown)
- Kapcsolat gomb: E stílus (outline + halvány narancs tint + shadow)
- Nyelvváltó: 3 külön gomb (HU EN DE), nem dropdown
- IVERSO logó: 2.3rem, #D96A08
- **1350px alatt:** hamburger menü (fullscreen overlay, menüpontok + nyelvváltó)

### Styling
- **CSS Modules** — minden komponens saját CSS-e, nevek nem ütköznek

### Hero technológia
- **Gépen:** Three.js — teljes 3D parázs particle rendszer
- **Mobilon:** Canvas 2D — ugyanaz a hangulat, könnyebb, touch-kompatibilis
- **Automatikus váltás** eszköz alapján
- Parázs részecskék az IVERSO felirat körül
- Hover: felerősödik, kattintás/tap: szétrobban

### Bizalom
- Nincs külön szekció — az oldal minősége maga a bizalom

### CTA
- Főoldalon: Amélia ízelítő + gomb a /kapcsolat-ra
- /kapcsolat oldalon: Amélia teljes chat
- Amélia: karakter, nem chatbot — ironikus, szókimondó, hülyéskedik, de tud komoly lenni
- Nő, 20-as évek, AI-generált realisztikus avatár
- Először magáz, átvált tegezésre ha a látogató is tegez
- Valódi AI mögötte (API hívás) — bármiről beszél, visszaterel Iverso-ra
- Átadás módja: email értesítés Norbinak

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
- Az előzetesek is mozognak/reagálnak a főoldalon

### Domain
- **iverso.info**

### Tudnivalók oldal
- Főoldalon: rövid, 4 interaktív node (demók és építős szekció között)
- Aloldalon (/tudnivalok): részletes bemutató (kibővítve: működés, lehetőségek, közös munka)
- Stílus: workflow demó-szerű interaktív node-ok
- **4 lépés:** Beszélgetés → Tervezés → Építés → Átadás

---

## Gépen megbeszélendő — előkészített döntések

### 1. Háttér ✅ ELDÖNTVE
- **Naplemente stílusú gradient** — narancs fényoszlop középen, barna mélység mögötte, vignette széleken
- background-attachment: fixed
- Canvas 2D particle háttér felette (radial gradient sprite + additív blending)

### 2. Parázs hero ✅ ELDÖNTVE
- **Gépen:** Three.js particle rendszer
- **Mobilon:** Canvas 2D
- Parázs részecskék az IVERSO felirat körül, hover erősödik, kattintásra szétrobban

### 3. Scroll animációk ✅ ELDÖNTVE
- **2. jelenet (IVERSO felirat):** Depth fade — elmosódásból élesedik, mélyből jön
- **3. jelenet (Demó kártyák):** Stagger rise — egymás után emelkednek fel, 0.12s késleltetéssel
- **4. jelenet (Folyamat):** Node sequence — node-ok sorban kipattannak + összekötő vonal kitöltődik
- **5. jelenet (Építős):** Block drop — blokkok fentről beesnek enyhe forgással
- **6. jelenet (CTA/Amélia):** Glow reveal + Bubble pop — lágy izzó felfedés, chat buborék kipattan
- **7. jelenet (Footer):** Simple fade

### 4. Mini demó előzetesek mozgása ✅ ELDÖNTVE
- **Gépen:** élnek amíg a képernyőn vannak:
  - Dashboard: 5 oldalas ciklikus animáció (Áttekintés, Termékek, Rendelések, Naptár, Riportok)
  - AI Chat: két panel (külső + belső chatbot), gyorsválasz gombok
  - Automatizáció: adat végigfolyik a node-okon (Email → Feldolgozás → Adatbázis → Értesítés)
  - Weboldal: világos krém pékség téma, progresszív betöltés
- **Mobilon:** belépő animáció, utána statikusak

### 5. Weboldal demó formátum ✅ ELDÖNTVE
- **Konfigurátor** — valódi builder érzés
- **CompanySizeSlider:** igen, itt IS van
- **Vezérlők:** tab rendszer (Alap | Tartalom | Layout | Effekt)

### 6. Építős szekció ✅ ELDÖNTVE
- **8+ blokk** — igazi építés érzés
- Blokkok **szabadon** rakhatók, snap-el a helyére
- Morph animáció **időzítve** indul
- **Morph eredmény:** vegyes mini felület

### 7. Loading / Intro ✅ ELDÖNTVE
- **Időtartam:** 2 mp (mindig)
- Szikrák felgyűlnek középre → IVERSO felirat kialakul → parázs hero indul

---

## Még nyitott kérdések
- [ ] Impressum + Adatvédelem tartalom megírása (implementációkor)
- [ ] Amélia mögötti AI provider (OpenAI/Anthropic/más — később döntjük el)
- [ ] Cookie-Banner + Analitika (készülünk rá, implementációkor kerül be)
- [ ] OG sharing image finomhangolás (parázs hero screenshot, fekete háttér)

## Eldöntve (Réteg 6)
- ✅ Loading/Intro: 2 mp szikrás intro — jó ahogy van
- ✅ Amélia átadás: email értesítés ha konkrét az érdeklődő
- ✅ "Mire jó — mire nem" szöveges szekciók: TÖRÖLVE — a demó magáért beszél
- ✅ Nyelvfüggő cégnevek a demókban (HU/DE/EN)
- ✅ Performance: React lazy, code splitting, Three.js csak gépen, WebP, font preload
- ✅ Accessibility: aria labels, keyboard nav, skip to content, reduced motion (egyszerűsített)
- ✅ OG meta tags: nyelvfüggő cím/leírás, parázs hero screenshot
- ✅ Fordítások: HU/DE/EN — külön fájlban (IVERSO_TRANSLATIONS.md)
- ✅ /automatizacio alcím: n8n referencia törölve
- ✅ /tudnivalok szövegek: semleges, tárgyilagos hangnem
- ✅ /ai demó chatbot: 6 kérdés-válasz pár megírva
- ✅ Háttér gradient: naplemente stílus
- ✅ Canvas 2D particle háttér: radial gradient sprite + additív blending
- ✅ Font: Roboto 700 (display), korábban Syne → Playfair Display → Roboto 700
- ✅ Navbar: gépen mindig látható, szolgáltatások kibontva, hamburger 1350px

---

## Szövegírási stílus
- **Általános:** Semleges, tárgyilagos, hétköznapi nyelv. NEM sales, NEM személyeskedés, NEM kérdések, NEM feltételes mód, NEM manipuláció. Folyó szöveg, nem felsorolás. "Lexikonszerű de nem száraz."
- **Amélia:** Önirónia, saját helyzetéről mesél. Színfalak mögötti bepillantás, pozitív hangulat, Norbi-t szidja szeretettel. Nem sales, nem manipulál.

---

## Munkamódszer
Norbi vizuálisan gondolkodik. Claude mutat opciókat (HTML prototípok, kattintható verziók), Norbi reagál. Nem szavakkal tervez, hanem mutatásból választ. Ötletelés > magyarázat.
