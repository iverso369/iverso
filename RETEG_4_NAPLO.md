# Réteg 4 — Jelenetek (Napló)

> Utolsó frissítés: 2026.03.04

---

## Mit tartalmaz ez a réteg

Főoldal 7 jelenet kitöltése tartalommal + navigáció + scroll animációk.

| # | Feladat | Állapot |
|---|---------|---------|
| 1 | Nav + Nyelvváltó | ✅ implementálva |
| 2 | DashboardPreview (3. jelenet) | 🔄 újratervezés — prompt kész |
| 3 | AiChatPreview (3. jelenet) | ✅ újratervezve, kész |
| 4 | AutomationPreview (3. jelenet) | ✅ javítva, kész |
| 5 | WebsitePreview (3. jelenet) | ⚠️ implementálva, JAVÍTANDÓ |
| 6 | Folyamat szekció (4. jelenet) | ⚠️ implementálva, finomhangolás kell |
| 7 | Építős szekció (5. jelenet) | ⚠️ implementálva, JAVÍTANDÓ |
| 8 | CTA + Footer (6-7. jelenet) | ✅ implementálva, finomhangolás később |
| 9 | Home.tsx összeszerelés | ✅ implementálva |

---

## Javítások (03.04)

### Javítás #01 — DemoCard unifikálás ✅ kész
- Közös DemoCard wrapper komponens: cím, alcím, content area, "Tovább" link belül
- Egységes kártyaméret (min-height: 500px, #111114 háttér, narancs border, 16px border-radius)
- Home.tsx: DemoCard wrapper körbeveszi mind a 4 preview-t
- i18n: dashboards/ai/automation/websites title+subtitle hozzáadva

### Javítás #02 — AutomationPreview + AiChatPreview ✅ kész
- **AutomationPreview:** node-ok (Email, Feldolgozás, Adatbázis, Értesítés) mostantól MINDIG láthatók — az animáció state-je el van választva a node-ok láthatóságától. Csak a fénypont loop-ol a vonalakon.
- **AiChatPreview:** teljes újratervezés — két panel (Weboldalon / Cégen belül), gyorsválasz gombok, input mező, fix magasságú chat konténer (overflow: hidden), az oldal nem ugrik az animáció loop-olásakor.

### Javítás #03 — DashboardPreview újratervezés 📋 prompt kész
- **Választott design:** "A verzió" — sidebar + KPI kártyák + táblázat
- Sidebar: céglogó (nyelvfüggő) + 5 menüpont ikonnal (Áttekintés aktív)
- Header: cím + Hét/Hónap/Év tab-ok
- 3 KPI kártya: Bevétel (HU: 9,2M Ft / DE+EN: €24.8k), Ügyfelek (847), Konverzió (68% + mini bar chart)
- Táblázat: 4 sor nyelvfüggő cégnevekkel + pénznemmel (HU: Ft, DE/EN: €) + státusz badge-ek
- Animáció: count-up + bar grow + row fade-in, loop-ol ~5-6 mp szünettel
- **Prompt:** RETEG_4_DASHBOARD_PREVIEW.md

---

## Döntések

| Dátum | Döntés |
|-------|--------|
| 03.03 | Prompt bontás: 9 külön prompt (4 demó előzetes egyenként, nem egyben) |
| 03.03 | AI preview: gyorsválasz gombok NEM a preview-ba (kompakt marad) — **TÖRÖLVE**, az újratervezésnél bekerültek |
| 03.03 | Website preview: konkrét éttermi landing page (nem wireframe) |
| 03.03 | Építős szekció: morph eredmény egyszerűsített mini verziók |
| 03.03 | Építős szekció: teljes drag/drop + auto-play fallback (~8 mp) + nincs gomb a morph-hoz |
| 03.03 | Az összes preview-nak egységes mérete legyen (DemoCard) |
| 03.03 | A "Tovább →" gombot a preview kártyába kell beépíteni |
| 03.04 | AiChatPreview: két panel (Weboldalon / Cégen belül), gyorsválasz gombok, input mező |
| 03.04 | DashboardPreview: "A verzió" választva — sidebar + KPI + táblázat (3 opcióból) |
| 03.04 | DashboardPreview: pénznem nyelvfüggő — HU: Ft (forint), DE/EN: € (euró) |

---

## Mi van még hátra (IVERSO_JAVITAS_TERV.md alapján)

- 🔄 **DashboardPreview újratervezés** — prompt kész, implementáció következik
- ⬜ **WebsitePreview újratervezés** — tartalmasabb mini weboldal
- ⬜ **Építős szekció javítás** — interaktivitás
- ⬜ **Folyamat szekció finomhangolás** — háttér/mélység
