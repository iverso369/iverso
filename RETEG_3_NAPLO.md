# Réteg 3 — Építőkockák (Napló)

> Utolsó frissítés: 2026.03.03

---

## Mit tartalmaz ez a réteg

5 újrahasználható ui/ komponens — ezekből épül a főoldal ÉS az aloldalak is.

| # | Komponens | Állapot |
|---|-----------|---------|
| 1 | KpiCard | 📋 prompt kész |
| 2 | ChatBubble | ⬜ prompt készül |
| 3 | WorkflowNode | ⬜ prompt készül |
| 4 | MiniWebsite | ⬜ prompt készül |
| 5 | CompanySizeSlider | ⬜ prompt készül |

---

## Függőségek

- **Réteg 1-ből kell:** CSS változók (global.css), fontok, i18n — ✅ mind kész
- **Réteg 2-től NEM függ** — párhuzamosan mehet
- **Réteg 4-5 ezekre épül** — a főoldali előzetesek és aloldalak ezeket használják

---

## Döntések

| Dátum | Döntés |
|-------|--------|
| 03.03 | KpiCard: ikon + szám + label (ikon kell) |
| 03.03 | KpiCard: piros/zöld változás jelzés — KIVÉTEL a 3 szín szabály alól, csak a demó KPI kártyáknál |
| 03.03 | KpiCard háttér: sötétebb fekete (#111) kiemelés |
| 03.03 | KpiCard: donut / progress ring a kártyán belül — % középen, narancs gradient ív, C stílus (szám a donut alatt) |
| 03.03 | ChatBubble: demó chatbotnál egyszerű bot ikon (SVG thin line), Ameliánál realisztikus avatár |
| 03.03 | ChatBubble: lekerekített sarkak (klasszikus chat forma) |
| 03.03 | ChatBubble: user buborék narancs, bot buborék sötét (fekete/nagyon sötét szürke) |
| 03.03 | WorkflowNode: n8n stílus — lekerekített téglalap, ikon bal oldalt, cím mellette, connection pontok, bézier íves SVG összekötők |
| 03.03 | WorkflowNode: inaktív = sötét háttér + szürke border, aktív = narancs border + glow |
| 03.03 | MiniWebsite: sötét böngésző keret (#111), dark mode |
| 03.03 | MiniWebsite: HTTPS lakat ikon + nyelvfüggő domain az URL sávban |
| 03.03 | CompanySizeSlider: vízszintes sáv, 4 snap pont jelöléssel |
| 03.03 | CompanySizeSlider: aktuális szint neve a slider felett (mindig látható) |
| 03.03 | CompanySizeSlider: narancs kitöltődő sáv (ahogy húzzuk, kitöltődik) |
| 03.03 | Prompt stratégia: 5 külön prompt (komponensenként 1). Irányt adnak, nem korlátoznak — Claude Code kapjon teret kreatív megoldásokra. |

---

## Promptok

### Prompt 01 — KpiCard 📋 kész
- Ikon + szám + label + változás jelző (piros/zöld kivétel) + donut progress ring
- Count-up animáció (Intersection Observer, egyszer)
- Sötétebb fekete (#111) háttér, többféle formátum (€, %, db, +/-)
- Méret variáns (kis/nagy)
- Fájl: RETEG_3_PROMPT_01.md

### Prompt 02 — ChatBubble ⬜ készül
### Prompt 03 — WorkflowNode ⬜ készül
### Prompt 04 — MiniWebsite ⬜ készül
### Prompt 05 — CompanySizeSlider ⬜ készül

---

## Megjegyzések

- A komponensek logikája átbeszélve (IVERSO_NAPLO.md, Réteg 3 szekció)
- Minden komponens: .tsx + .module.css pár, src/components/ui/ mappába
