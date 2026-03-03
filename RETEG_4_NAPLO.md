# Réteg 4 — Jelenetek (Napló)

> Utolsó frissítés: 2026.03.03

---

## Mit tartalmaz ez a réteg

Főoldal 7 jelenet kitöltése tartalommal + navigáció. Az 1-2. jelenet (parázs hero + IVERSO felirat) a Réteg 2-re vár — a többi most készül.

| # | Feladat | Állapot |
|---|---------|---------|
| 1 | Nav + Nyelvváltó | ✅ implementálva |
| 2 | DashboardPreview (3. jelenet) | ✅ implementálva |
| 3 | AiChatPreview (3. jelenet) | ✅ implementálva |
| 4 | AutomationPreview (3. jelenet) | ✅ implementálva |
| 5 | WebsitePreview (3. jelenet) | 📋 prompt kész |
| 6 | Folyamat szekció (4. jelenet) | ⬜ |
| 7 | Építős szekció (5. jelenet) | ⬜ |
| 8 | CTA + Footer (6-7. jelenet) | ⬜ |
| 9 | Home.tsx összeszerelés (scroll animációk) | ⬜ |

---

## Függőségek

- **Réteg 1-ből kell:** CSS változók, fontok, routing, i18n — ✅ mind kész
- **Réteg 2 (parázs hero):** gépen folyamatban — 1-2. jelenet arra vár, a többi független
- **Réteg 3-ból kell:** KpiCard, ChatBubble, WorkflowNode, MiniWebsite — ✅ mind implementálva

---

## Döntések

| Dátum | Döntés |
|-------|--------|
| 03.03 | Prompt bontás: 9 külön prompt (4 demó előzetes egyenként, nem egyben) |
| 03.03 | Komponensek NEM kötődnek be Home.tsx-be menet közben — prompt 09-ben áll össze minden |
| 03.03 | AI preview: gyorsválasz gombok NEM a preview-ba (kompakt marad), hanem az /ai aloldalra (Réteg 5) |
| 03.03 | Website preview: konkrét éttermi landing page (nem wireframe) — a másik 3 preview is konkrét tartalommal él, ez is |

---

## Promptok

### Prompt 01 — Nav + Nyelvváltó 📋 kész
- Scroll-aware: hero-nál nincs, scrollra besúszik, visszagörgetésre eltűnik
- Gépen: IVERSO + Szolgáltatások dropdown + Folyamat + Kapcsolat + HU
- Mobilon: hamburger → fullscreen overlay
- LanguageSwitcher: HU/DE/EN váltó, mindig látszik
- Aloldalakon: nav mindig látszik
- Fájl: RETEG_4_PROMPT_01.md

### Prompt 02 — DashboardPreview 📋 kész
- 3 KpiCard MiniWebsite keretben (Bevétel, Megrendelések, Elégedettség)
- Gépen: count-up loop (6s fade-out → remount → count-up újra), mobilon: egyszer fut, utána statikus
- Fájl: RETEG_4_PROMPT_02.md

### Prompt 03 — AiChatPreview 📋 kész
- ChatBubble-ök MiniWebsite keretben (bot üdvözlés + user kérdés + bot válasz)
- Szekvenciális lejátszás, gépen loop, mobilon egyszer fut
- Timing: 400ms → typing 1200ms → üdvözlés → 800ms → user → 1000ms → typing 1600ms → válasz → 3s hold → fade → loop
- i18n: demos.ai.* kulcsok (title, description, botName, greeting, userQuestion, botAnswer)
- Fájl: RETEG_4_PROMPT_03.md

### Prompt 04 — AutomationPreview 📋 kész
- 3-4 WorkflowNode MiniWebsite keretben (Email → Feldolgozás → Adatbázis → Értesítés)
- SVG összekötő vonalak, gépen adat flow animáció loop, mobilon statikus
- i18n: demos.automation.* kulcsok (title, description, node1-4)
- Fájl: RETEG_4_PROMPT_04.md

### Prompt 05 — WebsitePreview 📋 kész
- Konkrét mini éttermi landing page MiniWebsite keretben (nem wireframe — valódi elemek)
- Nyelvfüggő tartalom: Kovács Étterem / Restaurant Müller / Smith's Kitchen
- Nav + hero (cím + alcím + CTA gomb) + 3 kártya (Étlap, Nyitvatartás, Kapcsolat) SVG ikonokkal
- Gépen: progresszív betöltődés animáció loop, mobilon statikus
- i18n: demos.websites.* kulcsok (title, description, restaurantName, heroTitle, heroSubtitle, ctaButton, card1-3)
- Fájl: RETEG_4_PROMPT_05.md

### Prompt 06 — Folyamat szekció ⬜
### Prompt 07 — Építős szekció ⬜
### Prompt 08 — CTA + Footer ⬜
### Prompt 09 — Home.tsx összeszerelés ⬜

---

## Megjegyzések

- Az 1-2. jelenet (parázs hero + IVERSO felirat) a Réteg 2-ben készül gépen — ide nem tartozik
- A 4 demó előzetes (prompt 02-05) a Réteg 3 ui/ komponenseit használja
- A Home.tsx összeszerelés (prompt 09) a végén jön — amikor minden jelenet kész, Intersection Observer-rel scroll animációkat kap
- A scroll animáció típusok eldöntve a storyboardban: stagger rise, node sequence, block drop, glow reveal, simple fade
