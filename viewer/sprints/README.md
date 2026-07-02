# Viewer sprints

Build plan for the **viewer software only** — the app, schema, renderer, and spec composition. Design conversation with AI happens in Cursor chat, not in the viewer UI. See [iteration.md](../iteration.md).

This is **not** the house design schedule. Modeling the actual residence (tanks, wet walls, dimensions from [concept.md](../../00-project/concept.md)) is a separate effort: [house design track](../../00-project/house-design.md). That work uses this software once it exists; it does not belong in these sprints.

## How to use

1. Complete sprints **in order** within each phase.
2. Each sprint is tested against a **demo fixture** in `viewer/fixtures/` — generic placeholder geometry, not the real house.
3. After each sprint: `npm run validate` and `npm run dev` — confirm the **capability** works on demo data.
4. Do not add house-specific entities to discipline folders as part of these sprints.

---

## Phase 1 — Core viewer (Now)

Goal: runnable 3D viewer with validated model, navigation, layers, and sectioning — on demo data.

| Sprint | Name | Software outcome |
|--------|------|------------------|
| [0](./sprint-00-scaffold.md) | Scaffold | Vite + React + R3F, `npm run dev` |
| [1](./sprint-01-schema.md) | Schema & validate | Zod `HouseModel`, CLI `npm run validate` |
| [2](./sprint-02-entity-renderer.md) | Entity renderer | Render `slab`, `box`, `glazing-wall` from data |
| [3](./sprint-03-navigation.md) | Navigation | Orbit, pan, zoom, ground grid |
| [4](./sprint-04-layers.md) | Layers panel | Show/hide by `layer` id |
| [5](./sprint-05-section-presets.md) | Section & presets | Clip plane, camera presets, x-ray opacity |

**Phase 1 exit:** Demo scene renders; layers toggle; section cut and presets work. No house content required. **Complete.**

---

## Phase 2 — Entity system & composition (Soon)

Goal: extensible entity kinds, multi-module spec composition, and selection for inspection — still on demo/fixture data. **House design starts after Phase 2 exit.**

| Sprint | Name | Software outcome |
|--------|------|------------------|
| [6](./sprint-06-entity-kinds-shell.md) | Shell entity kinds | `roof`, `wall-segment`, `opening` renderers + schema |
| [7](./sprint-07-entity-kinds-zone.md) | Zone entity kind | Translucent labeled volumes |
| [8](./sprint-08-spec-composition.md) | Spec composition | Merge multiple spec modules; global validation rules |
| [9](./sprint-09-selection.md) | Selection & inspection | Click entity → show id, layer, dimensions |

**Phase 2 exit:** Demo model uses all v1 entity kinds; two fixture files compose cleanly; selection works. **Complete.**

House modeling can begin per [house-design.md](../../00-project/house-design.md).

---

## Phase 3 & 4 — Deferred

Construction-detail entity kinds, 2D projection, export, deploy. See [deferred.md](./deferred.md).

---

## What is explicitly out of scope for all software sprints

- Populating `01`–`09` discipline folders with real house geometry
- Matching [concept.md](../../00-project/concept.md) dimensions
- Kitchen, tanks, wet walls, or any project-specific layout decisions
- Permit drawings or code compliance for the building

Those belong to the [house design track](../../00-project/house-design.md).

---

## Current sprint

**Phase 2 complete.** House modeling can begin: [house-design.md](../../00-project/house-design.md).  
Deferred software: [deferred.md](./deferred.md). (Phase 2)
