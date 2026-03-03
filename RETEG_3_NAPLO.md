# Réteg 3 — Építőkockák (Napló)

> Utolsó frissítés: 2026.03.03

---

## Mit tartalmaz ez a réteg

5 újrahasználható ui/ komponens — ezekből épül a főoldal ÉS az aloldalak is.

| # | Komponens | Állapot |
|---|-----------|---------|
| 1 | KpiCard | ✅ implementálva |
| 2 | ChatBubble | ✅ implementálva |
| 3 | WorkflowNode | ✅ implementálva |
| 4 | MiniWebsite | ✅ implementálva |
| 5 | CompanySizeSlider | ✅ implementálva |

**✅ RÉTEG 3 KÉSZ — minden komponens implementálva és pusholva.**

---

## Függőségek

- **Réteg 1-ből kell:** CSS változók (global.css), fontok, i18n — ✅ mind kész
- **Réteg 2-től NEM függ** — párhuzamosan mehet
- **Réteg 4-5 ezekre épül** — a főoldali előzetesek és aloldalak ezeket használják

---

## Döntések

| Dátum | Döntés |
|-------|--------|
| 03.03 | KpiCard: ikon + szám + label, piros/zöld változás jelzés (KIVÉTEL), sötétebb fekete (#111) háttér, donut progress ring |
| 03.03 | ChatBubble: lekerekített sarkak, user narancs / bot sötét, avatár slot (SVG ikon VAGY kép) |
| 03.03 | WorkflowNode: n8n stílus, inaktív (szürke) / aktív (narancs glow), connection pontok |
| 03.03 | MiniWebsite: sötét keret (#111), HTTPS lakat, nyelvfüggő domain, children wrapper |
| 03.03 | CompanySizeSlider: vízszintes sáv, 4 snap pont, narancs kitöltődő sáv, szint neve felette |
| 03.03 | Prompt stratégia: 5 külön prompt, irányt adnak nem korlátoznak |

---

## Promptok

### Prompt 01 — KpiCard 📋 kész
- Ikon + szám + label + változás jelző + donut progress ring
- Count-up animáció (Intersection Observer, egyszer)
- Fájl: RETEG_3_PROMPT_01.md

### Prompt 02 — ChatBubble 📋 kész
- Bot (bal, sötét) + User (jobb, narancs) + typing indicator
- Fájl: RETEG_3_PROMPT_02.md

### Prompt 03 — WorkflowNode 📋 kész
- n8n stílus, hover tooltip, kattintás kinyit, connection pontok
- Fájl: RETEG_3_PROMPT_03.md

### Prompt 04 — MiniWebsite 📋 kész
- Böngésző keret wrapper, macOS dot-ok, nyelvfüggő domain
- Fájl: RETEG_3_PROMPT_04.md

### Prompt 05 — CompanySizeSlider 📋 kész
- Húzós sáv, 4 snap pont, onChange callback
- Fájl: RETEG_3_PROMPT_05.md

---

## Megjegyzések

- Minden komponens: .tsx + .module.css pár, src/components/ui/ mappába
