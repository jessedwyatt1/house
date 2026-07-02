# Sprint 1 — Schema & validate

**Phase:** 1 — Now  
**Depends on:** Sprint 0  
**Goal:** Typed `HouseModel` with Zod validation and a CLI check.

## Deliverables

- [x] `viewer/model/schema.ts` — `Entity`, `HouseModel`, `LayerId`, `EntityKind` (v0 kinds only)
- [x] `viewer/model/compose.ts` — returns minimal valid model from demo fixture
- [x] `viewer/scripts/validate.ts` — loads compose, runs `HouseModelSchema.parse`, exits 0/1
- [x] `npm run validate` wired in package.json
- [x] Coordinate constants documented in schema (origin SW, +X east, +Y up, +Z north, feet)

## Schema (v0)

**EntityKind** (v0 — more kinds added in later sprints):

```
slab | box | glazing-wall
```

**LayerId** (generic visibility groups — house content assigns entities later):

```
site | structure | envelope | glazing | partitions | zones | mechanical | annotations
```

## Tasks

1. Define Zod schemas with helpful error messages.
2. `compose()` exports `getHouseModel(): HouseModel`.
3. Validate script prints entity count on success.

## Acceptance criteria

- [x] `npm run validate` passes.
- [x] Intentionally broken entity fails validate with readable Zod error.
- [x] Schema file documents coordinate system.

## Out of scope

- Real house geometry (Sprint 2 uses demo fixture).
- Rendering entities (Sprint 2–3).

## Next

[Sprint 2 — Entity renderer](./sprint-02-entity-renderer.md)
