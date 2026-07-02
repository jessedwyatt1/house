# Project concept

## Design thesis

Build a **highly insulated, conventionally framed** home with **passive solar** gain through a full south glass wall and **thermal regulation** provided primarily by **large interior water tanks** behind the glazing — not by massive earth or adobe walls.

This is earthship-*inspired*, not earthship-conventional.

## Footprint and orientation

```
                    N
                    │
    ┌───────────────┴───────────────┐
    │                               │
 W  │                               │  E
    │         25' depth             │
    │                               │
    │                               │
    └───────────────┬───────────────┘
                    │
                    S  ← 60' glazed facade
```

| Dimension | Value | Notes |
|-----------|-------|-------|
| South facade width | **60'** | Long edge faces south; full glazing |
| Building depth | **25'** | North–south, interior to exterior |
| Footprint | 1,500 sq ft | Single story (with possible loft later) |

## South facade and water tanks

The south wall is **60' of glass**. **Two water tanks** sit directly inside the glazing:

| Per tank | Dimension | Role |
|----------|-----------|------|
| Depth (into building) | **18"** | From glass line inward |
| Width (along south wall) | **15'** | Each tank spans 15' of the 60' facade |
| Height | **10'** | Floor to top of tank |

**Placement:** The 60' wall is split into two 30' halves with **one tank centered on each half** (centers at 15' and 45'). Each tank's front **butts the glass line** — the tank face is effectively the glazing on that stretch. A **6" recessed drain** wraps the three interior sides of each tank (west, north, east; none on the glass side).

**Coverage:** 2 × 15' = **30' of tanks** → **half** of the 60' south wall. The remaining **30'** is conventional glazing: a **15' entry bay** (centered glass door at `opening-entry-door`) plus **7.5' at each end**. Six south posts frame the facade (roof not modeled yet) — tanks are not structural.

**Volume (per tank):** 1.5' × 15' × 10' = 225 ft³ ≈ **1,680 gallons**  
**Total:** ≈ **3,360 gallons** (~28,000 lb of water when full)

## Interior zones (south to north)

| Zone | Depth | Notes |
|------|-------|-------|
| Glass line | — | Full 60' south elevation |
| Tank / solar buffer | ~10' | Tanks occupy 18" depth; remainder of 10' zone TBD (walkway, planting, bench, air gap) |
| Main open volume | ~15' | Primary living space |
| Service / rear | ~variable | Kitchen, baths, utility, laundry; ceiling rises toward north |

## Roof and ceiling

- **South (front):** ~10' ceiling at tank zone
- **North (rear):** ~12' ceiling — roof slopes up toward north for drainage and volume
- **South cantilever:** **4.5'** beyond the glass line, soffit parallel to roof slope — sized for **44.08°N** (Rapid City / Black Hills); full summer-noon shade, strong winter gain on tanks and floor
- **Eave extension:** **2'** past footprint on **north** edge only (south = 4.5' cantilever; **no E/W structural overhang** — fascia drip optional)
- **Roof not modeled yet** — see [03-passive-solar](../03-passive-solar/README.md) for sun-angle study

## Floors and thermal mass

- **Primary mass:** water tanks behind south glass (~3,360 gal)
- **Secondary mass:** monolithic slab — **solid, darker finish** in the south sun path to absorb winter direct gain (no carpet/rugs in the solar zone)
- **Backup heat (future):** wood stove — allows a slightly longer south overhang without depending on peak passive gain alone

## Program

### Open plan (dominant)
- One large room: living, dining, work, flexible sleeping if desired

### West-side server room (modeled in 05-floor-plan, 07-mechanical)
- **Server room** NW corner — **12' × 10'** (x 0–12, z 15–25)
- **All house electrical:** main panel, PV inverter/disconnect, battery (if any) on **west wall**
- **2× full-size (42U) server racks** centered in room; walk-around on all sides
- **Dedicated mini-split** on north wall (`hvac-server-minisplit-head`) — separate from house HVAC
- Solid lockable door south into open living (`opening-server-door`)
- **Closet** **6' × 10'** east of server room (x 12–18, z 15–25); doors into server room and open living
- **Bedroom nook** **12' × 10'** (x 18–30, z 15–25) east of closet; floating partitions south (`wall-bedroom-float`) and east (`wall-bedroom-east`); **`opening-bedroom-barn-door`** — 4' single barn door near the north end, sliding south on rails to open

### East-side service core (modeled in 05-floor-plan)
- **Hall** along **north shell** — **12' × 5'** (x 40–52, z 20–25)
- **Utility** entrance from hall: **`opening-util-barn-doors`** — 6' barn-style sliding doors on `wall-hall-south`
- **Utility** **12'** × 5' (x **40–52**); west wall `wall-util-west`; east face is `wall-bath-west`; barn doors from hall
- **Bathroom** east column (middle band, x 52–60)
- **Kitchen** south band (x 40–60, z 10–15)
- Shared **`wall-wet-south`** at z 15 (x 40–60) — south face of utility + bath

### Not yet placed
- ~~Entry / mudroom~~ → **Main entry:** centered glass door in south facade (`opening-entry-door`, x 28.5–31.5)
- ~~Mechanical / electrical room~~ → **NW server room** (see above)
- Storage
- ~~Future bedroom partition~~ → **Bedroom nook** with barn sliding doors (05-floor-plan)

## Envelope strategy (vs. classic earthship)

| Classic earthship | This project |
|-------------------|--------------|
| Mass in walls/berm | Mass in **water tanks** |
| Minimal insulation in thermal mass walls | **Insulation-forward** envelope (target R-values TBD) |
| Tire/adobe/rammed earth | Conventional structure (wood/steel, standard assemblies) |

## Open questions (cross-cutting)

- [x] ~~Site location and latitude~~ → **Rapid City, SD / Black Hills**, design latitude **44.08°N**
- [ ] What occupies the 30' of south glass without tanks? → **7.5' ends + 15' entry bay with centered glass door**
- [x] ~~What fills the south buffer beyond the tanks?~~ Tanks now butt the glass directly; 6" perimeter drain on the 3 interior sides.
- [ ] Tank material (concrete, steel, HDPE modular)
- [ ] Backup heat/cool and ventilation strategy → **wood stove** planned (location TBD); cooling via overhang + ventilation TBD
- [ ] Bedroom count / future flexibility
- [ ] Code jurisdiction and compliance path

## Related docs

- [Decision log](./decision-log.md)
- [Glossary](./glossary.md)
