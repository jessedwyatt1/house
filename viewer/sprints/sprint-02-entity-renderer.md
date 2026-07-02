# Sprint 2 — Entity renderer

**Phase:** 1 — Core viewer  
**Depends on:** Sprint 1  
**Goal:** Render entities from `HouseModel` — tested with a **demo fixture**, not the house.

## Deliverables

- [x] `viewer/fixtures/demo-basic.ts` — minimal demo entities (created in Sprint 1; Sprint 2 renders them)
- [x] `viewer/src/viewer/EntityMesh.tsx` — dispatch `kind` → mesh
- [x] Renderers: `slab`, `box`, `glazing-wall`
- [x] `viewer/src/viewer/Scene.tsx` — iterate model entities
- [x] `compose.ts` loads `demo-basic` by default (done in Sprint 1; configurable in Sprint 8)
- [x] Distinct materials/colors per kind (readable, not photoreal)

## Demo fixture guidelines

- Use arbitrary dimensions (e.g. 40×20 slab) — **not** 25×60 house footprint
- Entity ids like `demo-slab`, `demo-box-a` — not `tank-east`
- Enough variety to verify positioning and scale

## Acceptance criteria

- [x] Viewer shows demo geometry from composed model.
- [x] `npm run validate` passes on demo fixture.
- [x] Adding a box to demo fixture + validate → appears after reload.

## Out of scope

- House concept dimensions.
- Layers UI (Sprint 4).

## Next

[Sprint 3 — Navigation](./sprint-03-navigation.md)
