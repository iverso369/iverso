# Réteg 4 — Jelenetek (Napló)

> Utolsó frissítés: 2026.03.03

---

## Mit tartalmaz ez a réteg

Főoldal 7 jelenet kitöltése tartalommal + navigáció + scroll animációk.

| # | Feladat | Állapot |
|---|---------|---------|
| 1 | Nav + Nyelvváltó | ✅ implementálva |
| 2 | DashboardPreview (3. jelenet) | ⚠️ implementálva, JAVÍTANDÓ |
| 3 | AiChatPreview (3. jelenet) | ⚠️ implementálva, JAVÍTANDÓ |
| 4 | AutomationPreview (3. jelenet) | ⚠️ implementálva, JAVÍTANDÓ |
| 5 | WebsitePreview (3. jelenet) | ⚠️ implementálva, JAVÍTANDÓ |
| 6 | Folyamat szekció (4. jelenet) | ⚠️ implementálva, finomhangolás kell |
| 7 | Építős szekció (5. jelenet) | ⚠️ implementálva, JAVÍTANDÓ |
| 8 | CTA + Footer (6-7. jelenet) | ✅ implementálva, finomhangolás később |
| 9 | Home.tsx összeszerelés | ✅ implementálva |

**⚠️ ELSŐ REVIEW UTÁN: komoly vizuális és UX problémák — újratervezés szükséges.**

---

## Review eredmény (03.03)

### Fő problémák

1. **DashboardPreview** — nincs dashboard hangulata, csak 3 KPI kártya számol. Kevés tartalom, üres érzés. "Tovább" gomb kívül van.
2. **AiChatPreview** — az üzenetek megjelenésekor az oldal automatikusan görget (idegesítő). Nincs fix mérete. Kevés chat hangulat — 2-3 mondat megjelenik és ennyi.
3. **AutomationPreview** — jó irányba megy, de méretben kisebb a többinél. Az összes preview-nak azonos méretűnek kellene lennie.
4. **WebsitePreview** — nem működik vizuálisan. A mini weboldal tartalom nem jön át.
5. **Folyamat szekció** — nem rossz, de hiányzik valami (háttér? mélység?).
6. **Építős szekció** — nincs valódi interaktív érzés, színes kockák össze-vissza, bugos a 2. réteg miatt.
7. **Általános** — a preview-k mérete nem egységes, a "Tovább" gombok a preview kártyákon kívül vannak.

### Döntések a review alapján

| Dátum | Döntés |
|-------|--------|
| 03.03 | Az összes preview-nak egységes mérete legyen (azonos kártyaméret) |
| 03.03 | A "Tovább →" gombot a preview kártyába kell beépíteni (nem alatta külön) |
| 03.03 | AiChatPreview: fix méret, nincs auto-scroll |
| 03.03 | A Réteg 2 (parázs hero) is itt lesz javítva — az előző beszélgetés elhagyva |
| 03.03 | Teljes vizuális újratervezés szükséges — visszatérés az eredeti vízióhoz |

---

## Korábbi döntések

| Dátum | Döntés |
|-------|--------|
| 03.03 | Prompt bontás: 9 külön prompt (4 demó előzetes egyenként, nem egyben) |
| 03.03 | Komponensek NEM kötődnek be Home.tsx-be menet közben — prompt 09-ben áll össze minden |
| 03.03 | AI preview: gyorsválasz gombok NEM a preview-ba (kompakt marad), hanem az /ai aloldalra (Réteg 5) |
| 03.03 | Website preview: konkrét éttermi landing page (nem wireframe) |
| 03.03 | Építős szekció: morph eredmény egyszerűsített mini verziók (nem valódi Réteg 3 komponensek) |
| 03.03 | Építős szekció: teljes drag/drop + auto-play fallback (~8 mp) + nincs gomb a morph-hoz |

---

## Promptok

### Prompt 01-09 — mind végrehajtva
Részletek a korábbi verzióban — most a javító promptok következnek.

---

## Megjegyzések

- A promptok mind végrehajtva, de az eredmény nem felel meg az eredeti víziónak
- Következő lépés: átbeszélés, újratervezés, javító promptok készítése
