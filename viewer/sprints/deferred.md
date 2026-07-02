# Deferred software sprints

Capabilities to build **after** Phase 2 — still software only, tested on fixtures or generic examples. House content is added separately via [house-design.md](../../00-project/house-design.md).

---

## Phase 3 — Detail entity system

### Sprint 10 — Assembly types

- `Assembly` schema: layers (material, thickness, rValue)
- `assembly-instance` or `wall-segment.assemblyId` references assembly library
- `viewer/model/assemblies.ts` — generic sample assemblies
- Section cut renders layer stripes on walls (fixture wall only)

### Sprint 11 — Member grids

- `member-grid` kind: spacing, member size, direction, extent
- Procedural instancing in renderer
- Toggle via `structure` layer; fixture demo wall

### Sprint 12 — Fixtures & MEP kinds

- `fixture` kind (point + symbol metadata)
- `pipe-run`, `duct-run` (polyline + diameter)
- `mechanical` layer
- Demo fixture with generic drain + pipe run — not house locations

### Sprint 13 — LOD / view mode presets

- UI bundles: Design / Construction / MEP (layer sets + opacity rules)

**Phase 3 exit:** Demo scene shows assembly section, member grid, and fixture on command.

---

## Phase 4 — 2D & export

### Sprint 14 — Orthographic projection

- View definitions (`model/views.ts`)
- Plan / elevation / section → 2D linework (SVG or canvas)

### Sprint 15 — Annotations

- `annotation` kind or auto-generated dimensions between points

### Sprint 16 — Sheet layout & PDF

- Title block, scale, north arrow, multi-page PDF

### Sprint 17 — Export

- Model JSON, DXF 2D, glTF, IFC prototype

### Sprint 18 — Deploy

- Static build + preview URL (e.g. Vercel)

---

## Not planned (software)

| Item | Note |
|------|------|
| Visual drag editor | Chat-driven edits only |
| Photoreal materials | Schematic colors sufficient |
| Full clash detection | Out of scope |
| Embedded code compliance | House / compliance track |

---

When starting a deferred sprint, add `sprint-NN-*.md` and link from this file.
