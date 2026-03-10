# JAVITAS_02 — AutomationPreview mobil nézet

> Gépen OK. Mobilon a 4 WorkflowNode kilóg a demo területből.
> A többi 3 preview kártya mobilon rendben van — csak az Automation érintett.

---

## A probléma

Mobilon a DemoCard demo területe szűk. A 4 WorkflowNode (Email → Feldolgozás → Adatbázis → Értesítés) + 3 connector vízszintesen nem fér be. Az "Email" balra, az "Értesítés" jobbra levágódik.

**scale(0.85)** próbálva volt a `.workflow`-ra → gépen levágta a széleket a DemoCard-ból, ezért visszavonva.

---

## Hogyan oldja meg a többi 3 preview (minta)

Mind a 3 ugyanazt a mintát követi: **flexbox + `min-width: 0` + `overflow: hidden`** — a tartalom zsugorodik ha nem fér be, nincs transform/scale sehol.

### DashboardPreview
```css
.layout { display: flex; flex: 1; min-height: 0; }
.main   { flex: 1; min-width: 0; overflow: hidden; }
```
A sidebar fix 140px, a többi flexbox-szal zsugorodik.

### AiChatPreview
```css
.column   { flex: 1; min-width: 0; }
.messages { height: 420px; overflow: hidden; }
```
Két oszlop egyenlően osztozik, `min-width: 0` megengedi a zsugorodást.

### WebsitePreview
```css
.page { flex: 1; overflow: hidden; }
```
Semmi extra — a tartalom `overflow: hidden`-nel vágódik.

---

## Miért nem működik ez az AutomationPreview-nál

A node-ok merevek:
- **WorkflowNode `.title`:** `white-space: nowrap` → nem törik
- **`.connector`:** `flex-shrink: 0` → nem zsugorodik
- **Node `.body`:** `padding: 14px 18px` → fix padding

---

## Érintett fájlok

| Fájl | Szerepe |
|------|---------|
| `src/components/ui/DemoCard.module.css` | Kártya keret + grid layout |
| `src/components/demos/AutomationPreview.module.css` | Workflow konténer |
| `src/components/demos/AutomationPreview.tsx` | Logika (már van `!isDesktop` → vertical connector) |
| `src/components/ui/WorkflowNode.module.css` | Node méretezés |

---

## Lehetséges megoldások (döntés szükséges)

### A) Vertikális layout mobilon
Az `AutomationPreview.tsx`-ben már van `!isDesktop` detektálás és vertical connector. Ha mobilon a `.workflow` `flex-direction: column`-ra vált, a node-ok egymás alá kerülnek és biztosan beférnek.

### B) Node-ok zsugorodása
- `.nodeGroup`-ra `min-width: 0; flex-shrink: 1`
- `.title`-ról levenni `white-space: nowrap`
- `.connector`-ról levenni `flex-shrink: 0`
- `.body` paddingot csökkenteni mobilon

### C) Scale mobilon
Csak `@media (max-width: 768px)` media queryben `transform: scale(0.75)` — gépen nem változik semmi.

---

## Jelenlegi állapot

- `.workflow`: `overflow: hidden; padding: 20px;` (scale eltávolítva)
- `.connectorHorizontal`: `width: clamp(20px, 3vw, 40px)` (responsive)
- Gépen OK, mobilon kilóg
