# Sprint 6 — Shell entity kinds

**Phase:** 2 — Entity system  
**Depends on:** Sprint 5  
**Goal:** Add `roof`, `wall-segment`, and `opening` to schema + renderer.

## Deliverables

- [x] Schema extended for three new kinds
- [x] `roof` — parametric sloped mesh (heel heights, overhang, footprint in `meta` or `size`)
- [x] `wall-segment` — box or plane from start/end or position + length + height + thickness
- [x] `opening` — gap or subtractive visual on wall (simple approach OK)
- [x] `viewer/fixtures/demo-shell.ts` — demo using roof + walls + opening (generic L-shape or rectangle, not house)
- [x] Compose loads demo-shell or merges with demo-basic for testing

## Acceptance criteria

- [x] `npm run validate` accepts valid roof/wall/opening entities.
- [x] Invalid params fail validation with clear errors.
- [x] Demo-shell fixture renders in viewer; layers still work.

## Out of scope

- Real wet walls or house entry placement.

## Next

[Sprint 7 — Zone entity kind](./sprint-07-entity-kinds-zone.md)
