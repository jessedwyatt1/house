# 06 — Structure

**Foundation, framing, cantilevered south overhang**, and load paths — especially water tank loads.

## Foundation (current model)

South (glazed) side **flush with grade** at finish floor (Y = 0). North (rear) side sits **~3' below grade** on a **12% slope** — retained by `stem-north`. Site grade is **cut out** under the footprint (`site-grade-*` in 01-site).

| Entity | Role |
|--------|------|
| `slab-main` | 6" monolithic slab, 60' × 25' — top at Y = 0 |
| `slab-south-edge-*` | 12" thick × 2' deep strips (west / between tanks / east) — glazing + cantilever reactions |
| `slab-tank-west` / `slab-tank-east` | 12" pads under tank footprints (~14 k lb each) |
| `post-south-*` | Six 6" columns along south facade — carry roof/eave loads |
| `header-south` | Eave header tying south posts at 10' |
| `footing-north` | Spread footing under north stem |
| `stem-north` | Retaining wall; top at north grade, ~3' buried on exterior |

Numbers live in [spec.ts](./spec.ts). Inspect with `npm run dev:house` (structure + roof layers).

## Roof assembly (`roof` layer — complete)

Building **up from the interior** (toggle **roof** in the viewer to hide/show without foundation/posts):

| Layer | Status | Notes |
|-------|--------|-------|
| **1 — Exposed ceiling purlins** | **Modeled** (`purlin-0` … `purlin-15`) | 2×12 on headers; **16 purlins** @ **~4' o.c.**; rake at E/W walls; 4.5' S + 25' + 2' N run |
| 2 — Structural deck + air barrier | **Modeled** (`roof-deck`) | 3/4" plywood on purlin tops; sloped `wall-segment` (same convention as purlins) |
| 3 — Rigid insulation (outsulation) | **Modeled** (`roof-insulation`) | 9" polyiso continuous above deck; ~R-54 (within R-49–60 target) |
| 4 — Underlayment | **Modeled** (`roof-underlayment`) | Synthetic WRB on outsulation; under standing seam |
| 5 — Standing seam steel | **Modeled** (`roof-steel`) | 24ga, dark finish; 16" pans, N–S seams; lighter gray in viewer |
| **Cavity & edge closure** | **Modeled** | See below |
| South cantilever struts | Not modeled | Angled braces to `post-south-*` |

### Cavity insulation between purlins

Headers and walls end at the **25' × 60' footprint**, but purlins and roof layers continue **4.5' south** (cantilever) and **2' north** (eave). Each E–W bay between purlins is modeled in three zones:

| Zone | Entities | Span (N–S) |
|------|----------|------------|
| Cantilever plenum | `roof-bay-cantilever-*` | z −4.5 → 0 (south of wall) |
| Interior (above headers) | `roof-bay-interior-*` | z 0 → 25 |
| North eave plenum | `roof-bay-north-eave-*` | z 25 → 27 |

**Envelope dams** (`roof-envelope-dam-south-*` / `roof-envelope-dam-north-*`) are solid **6" blocking** at the south and north wall lines, **purlin depth only** (~11¼") — they seal the cavity above headers between purlins without penetrating the continuous deck, outsulation, or steel above.

### Edge closure (rake + eave)

The continuous deck/outsulation stack is capped at the perimeter so insulation is not exposed to weather:

| Entity | Location |
|--------|----------|
| `roof-rake-closure-west` / `-east` | Z-flashing + trim at E/W walls — full assembly depth |
| `roof-eave-closure-south` | Fascia + drip at south cantilever tip |
| `roof-eave-closure-north` | Fascia + drip at north overhang |

Purlins span **N–S** (4.5' cantilever + 25' + 2' north eave), placed **wall to wall** along **60' E–W** — rake purlins on `header-west` / `header-east`.

### E/W overhang — dropped

No structural east/west eave. Legitimate needs don't justify it for this house: passive-solar shading is dominated by the south cantilever; 7.5' end bays get minimal benefit from 2' side eaves; unsupported corners require heavy outlooker framing; fascia board can still provide a drip edge.

### Purlin spacing

Plywood structural deck spans **between** purlins in the E–W direction. Under Black Hills snow loads, **3/4" roof sheathing** typically allows **24"–48"** between supports. Modeled at **~4' o.c.** (**16 purlins**, even spacing) with rake purlins on E/W headers. Engineer to confirm for final snow load.

### Purlin bearing

Purlin **bottom** sits on top of perimeter headers (`header-south`, `header-north`, `header-west`, `header-east`) — **10.5'** at south wall, **12.5'** at north wall, sloped between. Exposed ceiling face is the purlin underside below the deck.

## Scope

- Foundation type under tanks vs. general slab
- Floor diaphragm and lateral system
- Wall framing (25' depth, 60' length)
- Roof framing — slope north, **4.5' cantilever south**, **2' north eave** (no E/W structural overhang)
- Glass wall structural system (headers, mullions, wind load)
- Tank support (bearing, bracing, slosh)
- Snow, wind, seismic per site

## Known loads

| Source | Approx. load | Notes |
|--------|--------------|-------|
| Water (both tanks full) | ~28,000 lb | Concentrated along south ~30' |
| Roof cantilever | **4.5'** south | Moment at `slab-south-edge-*`; see 03-passive-solar |
| Glazing | Per mullion design | 60' span needs engineered system |

## Open questions

- [ ] Monolithic thickened slab under tanks vs. spread footings?
- [ ] Steel moment frame at south glass vs. post-and-beam? → **Post-and-beam modeled** (`post-south-*`, `header-south`)
- [ ] Roof truss with extended south chord vs. exposed beam cantilever?
- [ ] Single-story now — future loft load reserve?

## Deliverables

- [ ] Foundation plan (schematic)
- [ ] Framing plan
- [ ] South elevation structure/glass support concept
- [ ] Load summary for engineer handoff
- [ ] Cantilever detail section

## Viability

Document in `viability.md` when ready: 60' glass wall span system cost; cantilever complexity; tank point loads on slab; seismic slosh restraint.

## Design process

- `drawings/` — foundation/framing plans, structural sections
- `models/` — load diagram or structural sketch model

## Depends on

- [01-site](../01-site/), [04-water-tanks](../04-water-tanks/), [02-envelope](../02-envelope/)

## Feeds

- [09-compliance](../09-compliance/) — stamped structural calcs likely required
