# Insulated Passive-Solar Dwelling

A design-and-build research project for a ~1,500 sq ft residence that borrows earthship *ideas* (south glazing, thermal storage, compact wet cores) but uses a **conventional insulated envelope** and **interior water thermal mass** instead of tire/adobe mass walls.

## Building snapshot

| Item | Value |
|------|-------|
| Footprint | 25' × 60' (1,500 sq ft) |
| Orientation | 60' edge faces **south** |
| South facade | Full-height glazing along 60' |
| Thermal strategy | High-performance insulation + ~3,360 gal interior water mass |
| Interior | Mostly one open room; service core(s) on sides |

## Folder map

Work is organized by **building discipline**. Each folder owns its scope, viability analysis, and design artifacts.

| Folder | Focus |
|--------|-------|
| [00-project](./00-project/) | Big picture: concept, decisions, glossary, workflow |
| [01-site](./01-site/) | Location, climate, orientation, grading |
| [02-envelope](./02-envelope/) | Walls, roof, floor, insulation, air sealing |
| [03-passive-solar](./03-passive-solar/) | Glazing, overhang, shading, daylight |
| [04-water-tanks](./04-water-tanks/) | Thermal mass tanks — sizing, structure, materials |
| [05-floor-plan](./05-floor-plan/) | Program, layout, wet walls, circulation |
| [06-structure](./06-structure/) | Foundation, framing, cantilever, loads |
| [07-mechanical](./07-mechanical/) | HVAC, ventilation, plumbing, electrical |
| [08-systems](./08-systems/) | Rainwater, greywater, solar PV, optional earthship systems |
| [09-compliance](./09-compliance/) | Codes, permits, zoning, inspections |
| [viewer](./viewer/) | Viewer **software** (not house content) — [sprints](./viewer/sprints/README.md) |

**Viability** and **design process** are not separate folders — see [00-project/workflow.md](./00-project/workflow.md). Each discipline folder can include `viability.md`, `spec.ts` (geometry for the viewer), `drawings/`, and `models/` as work progresses.

## How to use this repo

1. Read [00-project/concept.md](./00-project/concept.md) for the current design thesis.
2. Read [00-project/workflow.md](./00-project/workflow.md) for how viability and design artifacts are organized.
3. Pick a discipline folder and work through its open questions.
4. Log major decisions in [00-project/decision-log.md](./00-project/decision-log.md).

## Two tracks

| Track | Docs |
|-------|------|
| **1 — Viewer software** | [viewer/sprints/README.md](./viewer/sprints/README.md) |
| **2 — House design** | [.cursor/rules/house-design.mdc](./.cursor/rules/house-design.mdc) → [house-design.md](./00-project/house-design.md) |

Viewer Phase 2 complete. House modeling uses `npm run dev:house` / `npm run validate:house` in `viewer/`.

## Status

- **Viewer:** Phase 2 complete (Sprint 9) — `cd viewer && npm run dev`
- **House:** Ready to start — see [house-design.md](./00-project/house-design.md)
