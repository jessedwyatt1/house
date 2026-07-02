# 03 — Passive solar

South glazing, **cantilevered overhang**, shading, and daylight — how the sun interacts with the building.

## South facade (modeled in [spec.ts](./spec.ts))

The full **60' south wall is glazed**. Two 15' water tanks ([04-water-tanks](../04-water-tanks/spec.ts)) serve as the glazing for the center of each 30' half. This module fills the three open bays:

| Entity | Span (x) | Role |
|--------|----------|------|
| `glazing-south-west` | 0–7.5 | West end glass |
| `glazing-south-entry` | 22.5–37.5 | Entry bay glass (15') |
| `glazing-south-east` | 52.5–60 | East end glass |
| `opening-entry-door` | 28.5–31.5 | Centered 3' × 7' glass entry door |

**Not modeled yet:** roof entity, solar panels.

**Structural support:** Six south posts + `header-south` in [06-structure](../06-structure/spec.ts) frame the glazed bays — will carry roof loads when added; **not on the water tanks**.

## Roof and overhang (decided — not yet in spec)

Sized for **44.08°N** (Rapid City / Black Hills). Full study: [viability.md](./viability.md).

| Parameter | Value | Notes |
|-----------|-------|-------|
| Design latitude | **44.08°N** | Covers Black Hills band 43.75°–44.5°N |
| Roof pitch | **10' → 12'** over 25' depth (~4.6°) | South low, north high; drains toward south |
| **South cantilever** | **4.5'** | Beyond glass line; sloped soffit parallel to roof |
| **North eave** | **2'** | Past footprint on north edge |
| **East / West** | **None** | Rake at wall line; fascia drip optional |
| Summer noon (Jun–Jul) | 0% direct on glazing | Peak heat gain blocked |
| Winter noon (Dec) | ~78% glazing lit | Tanks fully in direct sun; ~18.8' floor penetration |

Bias toward **cooler summers** — slightly longer than the 3.65' theoretical minimum — with **wood stove** as planned backup heat.

## Scope

- Full 60' south glass wall (fixed vs. operable breakdown)
- Overhang depth and roof angle for latitude-specific shading
- Relationship between glass, tanks (04), and interior floor receiving direct gain
- **30' of south glass without tanks** — solar distribution to interior
- Summer overheating mitigation
- Nighttime heat loss through glass (curtains, interior shutters, low-e coatings)

## Open questions

- [x] ~~Tank placement along 60' wall~~ — centered on each 30' half
- [x] ~~Optimal overhang depth for site latitude~~ → **4.5' south**, **2' north eave**; no E/W structural overhang
- [ ] Glazing SHGC split — tank bays vs. open bays (lower SHGC on non-tank glass for summer off-noon sun)
- [ ] Operable vents in clerestory or high glass for stack ventilation
- [ ] Operable exterior shades — only if summer off-noon gain proves excessive

## Deliverables

- [x] Sun angle study (winter / summer / equinox) — see [viability.md](./viability.md)
- [x] Overhang sizing calculation — **P = 4.5'** south, **2'** north eave
- [ ] South elevation schematic
- [ ] Section through south face (glass → tank → room)
- [ ] Shading / overheating risk notes

## Viability

See [viability.md](./viability.md).

## Design process

- `drawings/` — south elevation, section, sun-angle diagrams
- `models/` — shading study / 3D sun model

## Depends on

- [01-site](../01-site/) — latitude and climate

## Feeds

- [04-water-tanks](../04-water-tanks/) — what mass absorbs the gain
- [05-floor-plan](../05-floor-plan/) — furniture and living zones in sun path
