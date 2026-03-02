# IVERSO — Scroll Storyboard
## Utolsó frissítés: 2026.02.28

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
- **Emojik**: nincsenek sehol az oldalon (kivéve Amelia chat üzenetei — ő használhat)
- **Fontok**: Syne (display), DM Sans (body)
- **Háttér**: #0A0A0C + **"Ultra mély" gradient** — drámai narancs radial gradient felülről, több mélységi réteg, vignette, film grain, lélegző fény. Nem reagál egérre. Közepes intenzitás. Végig ugyanaz. Finomhangolás VS Code-ban.
- **Szürke:** #88889A (másodlagos szöveg, pl. "Let's build something")

**FONTOS:** Korábban volt 4 külön szolgáltatás szín (cyan, kék, lila, narancs) — ezek **TÖRÖLVE**. Az egész oldal egységesen a 3 alapszínt használja. A szolgáltatásokat nem szín különbözteti meg, hanem az interaktív tartalom maga.

---

## Oldalstruktúra

### Főoldal (scroll élmény)
1. Parázs (hero)
2. IVERSO + "Let's build something"
3. 4 mini demó előzetes (dashboard, AI, automatizáció, weboldal)
4. Folyamat — rövid (hogyan dolgozom, 3-4 interaktív node)
5. Építős interaktív szekció
6. CTA — Amelia ízelítő
7. Footer (minimális)

### Aloldalak
- **/dashboardok** — részletes demó + CompanySizeSlider
- **/ai** — részletes AI demó + CompanySizeSlider
- **/automatizacio** — részletes workflow demó + CompanySizeSlider (node szám változik szintenként)
- **/weboldalak** — CompanySizeSlider (komplexitás) + weboldal konfigurátor
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
- **Gépen:** Three.js — teljes 3D parázs particle rendszer
- **Mobilon:** CSS + Canvas 2D — ugyanaz a hangulat, könnyebb, touch-kompatibilis
- **Automatikus váltás** eszköz alapján
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

**Elrendezés:** 4 nagy mini demó egymás alatt, egyforma vizuális súllyal. Mindegyik tartalmaz: cím + 1 mondatos leírás + mini verziót a demóból + "Tovább →" ami morph animációval megnyitja a részletes aloldalt.

**Sorrend:** Dashboard → AI → Automatizáció → Weboldal (fix)

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

**Főoldalon:** Rövid, 4 interaktív node — mindegyikben: ikon + cím + 1 rövid mondat.
- Beszélgetés — "Megismerjük egymást."
- Tervezés — "Látod mielőtt elkészül."
- Építés — "Közben bármikor szólhatsz."
- Átadás — "Nem hagylak magadra."

NEM linkel a /folyamat aloldalra — ennyi elég a főoldalon.

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

**Blokkok kinézete:** Különböző narancs árnyalatok (variáció, nem egyszínű).
**Rács:** Nincs látható rács/háló — szabadon rak bárhova, snap-el a helyére.

**Mobilon:** Tap = blokk lerakás. Ha valaki nem interaktál, az ugráló blokk hívogatja. A morph rész CSS + Canvas, nem igényel külön interakciót.

**Érzés:** *"Amit leraktam, abból valami lett. Wow."*

---

## 6. jelenet — CTA (Amelia ízelítő)
**Mi látszik:**
```
    Van egy ötleted?
    Építsük meg.

    [Amelia chat buborék: random mondat — minden látogatásnál más]

    [ Beszéljünk → ]  ← ez visz a /kapcsolat oldalra
```

**Amelia buborék:** Véletlenszerű mondatok nyelvfüggően (több variációból választ minden látogatásnál).
Pl. HU: "Hali! Mesélj, miben gondolkodsz?" / "Na, mi jár a fejedben?" / "Norbi megint elküldött dolgozni... szóval itt vagyok neked 😤"

**CTA gomb:** Nyelvfüggő — HU: "Beszéljünk →", DE: "Lass uns reden →", EN: "Let's talk →"

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

## ALOLDALAK — Részletes felépítés

### Közös aloldal design elv: "Élő háttér mindenhol"

Az aloldalak IS kapnak particle effektet — ugyanaz a parázs rendszer mint a hero-ban, csak visszafogottabb.
A tartalom van előtérben, de a háttér lélegzik, van mélysége, nem "halott".

**Háttér:** Parázs particles + narancs radial gradient felülről.
- **Gépen:** Three.js particles (visszafogott intenzitás)
- **Mobilon:** Canvas 2D particles (visszafogott intenzitás)
- Egy rendszer, "intensity" paraméterrel: hero = erős, aloldalak = gyenge

### Közös aloldal struktúra

Minden szolgáltatás aloldal (/dashboardok, /ai, /automatizacio, /weboldalak) ugyanazt a mintát követi:

```
┌──────────────────────────────────────────────┐
│  1. SUB-HERO                                 │
│     • Tag badge (szolgáltatás színében)       │
│     • Cím (nagy, Syne, fehér)                │
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
- Előre megírt válaszok a demóban (nem valódi AI — az Amelia az)

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
- Node szám és komplexitás VÁLTOZIK slider szintenként:
  - Egyedül: 3-4 egyszerű node (Űrlap → Mentés → Email → Válasz)
  - Kis csapat: 5-6 node, elágazásokkal
  - Több részleg: 8+ node, több rendszer, monitoring
  - Komoly szervezet: komplex hálózat, párhuzamos ágak, audit
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

### /folyamat — részletes felépítés

**Sub-hero:**
- Tag nincs (ez nem szolgáltatás, hanem folyamat)
- Cím: pl. "Hogyan dolgozom"
- Alcím: "4 lépés az ötlettől a kész megoldásig."

**Tartalom:** 4 lépés, mindegyik részletesen kifejtve:

1. **Beszélgetés** — Mire van szükség, mi a cél, mi a felesleges. Ebből lesz a terv alapja.
2. **Tervezés** — Váz, felület, logika — minden látható mielőtt bármi épülne. Itt még könnyű változtatni.
3. **Építés** — A megoldás készül, közben bármikor belenézhetsz. Semmi meglepetés a végén.
4. **Átadás** — Kész megoldás, betanítással. Utána sem marad kérdés megválaszolatlanul.

**Interaktív:** Kattintható node-ok, animált flow vonalak — részletesebb verzió mint a főoldalon.

---

### /kapcsolat — Amelia teljes chat

Lásd: 6. jelenet (Amelia) — teljes képernyős chat, nem csak ízelítő.

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
- URL sáv: nyelvfüggő fiktív domain (HU: kovacs-kft.hu, DE: mueller-gmbh.de, EN: smith-co.com)

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
  - HU → magyar cégek (Kovács Kft, Nagy Építő...)
  - DE → német cégek (Müller GmbH, Schmidt Bau...)
  - EN → angol/nemzetközi cégek
- **Nyelvváltás:** automatikus böngésző nyelv alapján + váltó gomb

### Navigáció
- Hero-nál (parázs): nav NINCS, a nyelvváltó gomb egyedül látszik jobb felső sarokban
- Scrollra: diszkrét nav sáv besúszik felülről (menü linkek + nyelvváltó)
- Visszagörgetésre a hero-hoz: nav eltűnik, csak nyelvváltó marad
- **Nav formátum:**
  ```
  IVERSO    Szolgáltatások▾    Folyamat    Kapcsolat    HU▾
  ```
  - Szolgáltatások dropdown: Dashboardok, AI, Automatizáció, Weboldalak
  - Folyamat = "hogyan dolgozom" (nem szolgáltatás, külön menüpont)
  - Mobilon: hamburger menü (fullscreen overlay)

### Styling
- **CSS Modules** — minden komponens saját CSS-e, nevek nem ütköznek

### Hero technológia
- **Gépen:** Three.js — teljes 3D parázs particle rendszer
- **Mobilon:** CSS + Canvas 2D — ugyanaz a hangulat, könnyebb, touch-kompatibilis
- **Automatikus váltás** eszköz alapján
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
- **Gépen:** Three.js particle rendszer
- **Mobilon:** CSS + Canvas 2D (a prototípus alapján fut)
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
- **Konfigurátor** — valódi builder érzés, a látogató úgy érezze mintha tényleg most építené a weboldalát
- **CompanySizeSlider:** igen, itt IS van — először slider (komplexitás), aztán konfigurátor
- **Vezérlők:** tab rendszer (Alap | Tartalom | Layout | Effekt)
  - Mobilon: fent preview (~60%), alul tab-os vezérlők (~40%)
  - Gépen: fent tab-ok, alatta nagy preview
- **Konfigurálható elemek:**
  - Sötét/világos mód
  - Stílus (modern, minimal, bold, classic)
  - Színvilág (meleg, hűvös, élénk, pasztell)
  - Iparág (5-6, ikonos gombok: kés-villa=étterem, olló=fodrász, stb.)
  - Font választó
  - Layout (hero pozíció, oszlopok, menü helye)
  - Szekciók ki-be kapcsolása (toggle-ök)
  - Animáció stílus (fade, slide, zoom — élőben látja)
  - CTA gomb szöveg szerkesztés
  - Eszköz váltó (desktop/tablet/mobil nézet)
- Preview élőben reagál minden váltásra (nincs Apply gomb)
- Végén: "Tetszik? Beszéljünk róla!" → Ameliához, beállítások átmennek
- Finomhangolás VS Code-ban

### 6. Építős szekció ✅ ELDÖNTVE
- **8+ blokk** — igazi építés érzés, a látogató húzza/tappolja a rácsba
- Blokkok **szabadon** rakhatók — bárhova, nincs látható rács, snap-el a helyére
- Blokkok kinézete: **különböző narancs árnyalatok** (variáció)
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
- [ ] Impressum + Adatvédelem tartalom megírása (implementációkor)
- [ ] Amelia mögötti AI provider (OpenAI/Anthropic/más — később döntjük el)
- [ ] Cookie-Banner + Analitika (készülünk rá, implementációkor kerül be)
- [ ] OG sharing image finomhangolás gépen (parázs hero screenshot, fekete háttér)
- [ ] Háttér gradient finomhangolás gépen

## Eldöntve (Réteg 6)
- ✅ Loading/Intro: 2 mp szikrás intro — jó ahogy van
- ✅ Amelia átadás: email értesítés ha konkrét az érdeklődő
- ✅ "Mire jó — mire nem" szöveges szekciók: TÖRÖLVE — a demó magáért beszél
- ✅ Nyelvfüggő cégnevek a demókban (HU/DE/EN)
- ✅ Performance: React lazy, code splitting, Three.js csak gépen, WebP, font preload
- ✅ Accessibility: aria labels, keyboard nav, skip to content, reduced motion (egyszerűsített)
- ✅ OG meta tags: nyelvfüggő cím/leírás, parázs hero screenshot
- ✅ Fordítások: HU/DE/EN — külön fájlban (IVERSO_TRANSLATIONS.md)
- ✅ /automatizacio alcím: n8n referencia törölve
- ✅ /folyamat szövegek: semleges, tárgyilagos hangnem
- ✅ /ai demó chatbot: 6 kérdés-válasz pár megírva

---

## Munkamódszer
Norbi vizuálisan gondolkodik. Claude mutat opciókat (HTML prototípok, kattintható verziók), Norbi reagál. Nem szavakkal tervez, hanem mutatásból választ. Ötletelés > magyarázat.
