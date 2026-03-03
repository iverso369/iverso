# IVERSO — Javítási terv

> 2026.03.03 — Első vizuális review után

---

## Mi a helyzet

Réteg 1 és 3 rendben van. Réteg 4 (jelenetek) mind implementálva, de az első vizuális review komoly problémákat tárt fel. A Réteg 2 (parázs hero) a másik chatben készült és bugos — innentől minden javítás ebben a projekt chatben történik.

---

## Azonosított problémák

### P1 — Parázs IVERSO felirat átlóg mindenen (KRITIKUS)
- A Three.js canvas nincs a hero szekcióba bezárva
- A parázs felirat a builder szekció, CTA és mindenhol mögött/felett megjelenik
- Valószínűleg position: fixed vagy rossz z-index
- **Javítás:** hero konténerbe zárás, overflow: hidden, z-index rendezés

### P2 — DashboardPreview üres (KOMOLY)
- Csak 3 KPI kártya donut chart-tal — nincs dashboard hangulat
- Az eredeti vízió: sidebar navigáció, KPI kártyák, táblázat sorokkal, tab váltás
- Kevés tartalom, nagy üres helyek
- "Tovább →" gomb a kártyán kívül van
- **Javítás:** gazdagabb dashboard tartalom, sidebar + táblázat, "Tovább" a kártyába

### P3 — AiChatPreview auto-scroll + kevés tartalom (KOMOLY)
- Az üzenetek megjelenésekor az oldal automatikusan görget — idegesítő
- Nincs fix mérete a preview-nak
- Csak 2-3 buborék jelenik meg, nincs chat felület érzés
- Az eredeti vízió: teljes chat felület input mezővel, élő érzés
- **Javítás:** fix méret, nincs auto-scroll, gazdagabb chat tartalom

### P4 — Preview-k mérete nem egységes (KOMOLY)
- Az AutomationPreview kisebb mint a többi
- Vizuálisan össze-vissza — az összes preview-nak azonos kártyaméretűnek kellene lennie
- **Javítás:** egységes kártyaméret mind a 4 preview-nak

### P5 — WebsitePreview üres (KOMOLY)
- A mini éttermi landing page tartalom nem jön át
- Vizuálisan nem mutat semmit
- **Javítás:** átgondolás, gazdagabb tartalom

### P6 — Folyamat szekció — közel jó, de hiányzik valami
- A 4 node megjelenik, konzisztens az AutomationPreview-val
- De hiányzik valami — háttér, mélység, valami amitől nem lapos
- **Javítás:** finom háttér/effekt hozzáadás

### P7 — Építős szekció nem interaktív (KOMOLY)
- Színes narancs kockák össze-vissza, nincs valódi interakció érzés
- A morph bugol a Réteg 2 parázs felirat miatt
- Nehéz érteni mit kell csinálni
- **Javítás:** a Réteg 2 fix után újratesztelni, interakció javítás

### P8 — "Tovább →" gombok kívül vannak
- Minden preview-nál a "Tovább →" a kártya alatt van külön sorban
- Be kellene építeni a kártya aljába
- **Javítás:** kártyán belülre

---

## Javítási sorrend

1. **Réteg 2 fix** — a parázs hero bezárása a hero szekcióba (ez blokkolja a többit)
2. **Egységes preview kártyaméret** — mind a 4 azonos méretű wrapper
3. **DashboardPreview újratervezés** — gazdagabb tartalom
4. **AiChatPreview fix** — fix méret, nincs auto-scroll, gazdagabb
5. **WebsitePreview újratervezés** — tartalmasabb mini weboldal
6. **AutomationPreview méretezés** — egységes a többivel
7. **Építős szekció javítás** — interaktivitás, morph újrateszt
8. **Folyamat szekció finomhangolás** — háttér/mélység
9. **"Tovább" gombok beépítése** — kártyán belülre

---

## Állapot

| # | Javítás | Állapot |
|---|---------|---------|
| 1 | Réteg 2 hero fix | ⬜ átbeszélés |
| 2 | Egységes preview méret | ⬜ |
| 3 | DashboardPreview újra | ⬜ |
| 4 | AiChatPreview fix | ⬜ |
| 5 | WebsitePreview újra | ⬜ |
| 6 | AutomationPreview méret | ⬜ |
| 7 | Építős javítás | ⬜ |
| 8 | Folyamat finomhangolás | ⬜ |
| 9 | "Tovább" gombok | ⬜ |
