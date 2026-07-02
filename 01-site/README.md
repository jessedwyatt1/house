# 01 — Site

Everything about **where** the building sits and what the environment demands.

## Topography (working assumption)

The building sits on a **gentle south-facing slope** — the **south (glazed) side is the low/downhill side**, the **north (rear) side is uphill and partially bermed into the grade**.

```
        N (uphill)                          S (downhill)
        │                                   │
   grade ▔▔▔▔╲___                            │
             ▔▔▔▔╲____                       │
   ┌─────────────────▔▔▔▔╲________           │
   │ north wall partially  ▔▔▔▔╲______       │
   │ below grade (bermed)        ▔▔▔▔╲___    │
   └──────────────────────────────────▔▔▔▔╲──┘
     rear                                 south glass wall (full sun)
```

- **Slope:** ~12% rise across the 25' building depth → north grade ~3' above south at the building line. Grade is modeled as four boxes (`site-grade-*`) surrounding the footprint — no overlap with the foundation cutout.
- **Rationale:** north berm adds thermal buffering and wind protection on the cold side; south stays fully open to winter sun and drains downhill away from the building.
- **Rough target:** enough fall across the 25' depth to put the north wall ~3–5' below finish grade (exact figure TBD once we pick a slope %). See [viability.md](./viability.md).

## Target region (working)

| Item | Value |
|------|-------|
| Region | **Rapid City, SD** and the **Black Hills** (43.75°–44.5°N band) |
| Design latitude | **44.08°N** (Rapid City) |
| Elevation note | 3,200–7,200 ft — thinner air adds ~5–15% solar intensity vs. sea level; favors slightly aggressive shading |

Parcel, county, and jurisdiction are still TBD. Latitude is locked for passive-solar geometry.

- Parcel selection criteria
- Latitude, climate zone, heating/cooling degree days
- Solar access (winter/summer sun angles, shading from trees/neighbors)
- Topography, drainage, flood/wildfire/seismic zones
- Utilities available (grid, water, sewer, gas)
- Setbacks, easements, HOA if any

## Open questions

- [ ] Target state / county / municipality? → **Region: Rapid City / Black Hills, SD**
- [x] ~~Design latitude~~ → **44.08°N**
- [ ] Rural vs. suburban vs. urban infill?
- [ ] Minimum parcel size for 25×60 + setbacks?
- [ ] Need for well/septic vs. municipal services?
- [ ] Slope % and how far the north wall sits below grade (~3–5' working)?
- [ ] Single-level slab or slight step following grade?

## Deliverables

- [ ] Site criteria document
- [ ] Climate summary (ASHRAE zone, design temps, sun angles) — latitude locked; climate zone TBD
- [x] ~~Orientation confirmation~~ → true south assumed; magnetic declination ~10°E in western SD (verify at build)
- [ ] Grading and drainage concept

## Viability

Document in `viability.md` when ready: is the target parcel/buildable area sufficient for 25×60 + setbacks; solar access; utility path; natural hazard acceptability.

## Design process

- `drawings/` — site plan, contour/drainage sketch, sun-path diagrams
- `models/` — site context model if useful

## Depends on

- [09-compliance](../09-compliance/) for zoning once jurisdiction is known

## Feeds

- [03-passive-solar](../03-passive-solar/) — overhang and glazing tuning
- [02-envelope](../02-envelope/) — climate-driven R-values
- [06-structure](../06-structure/) — frost depth, seismic, wind
