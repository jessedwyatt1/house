# House design track (separate from viewer sprints)

**AI entry point:** read [.cursor/rules/house-design.mdc](../.cursor/rules/house-design.mdc) first.

This is **track 2**: modeling the actual building. It uses the viewer software built in [viewer/sprints/](../viewer/sprints/) — it is not part of that build schedule.

## Two tracks

| Track | What | Where |
|-------|------|-------|
| **1 — Viewer software** | App, schema, renderer, composition, UI | `viewer/` + [sprints](../viewer/sprints/README.md) |
| **2 — House design** | Geometry and docs for *this* residence | `00-project/`, `01`–`09` |

Do not mix them in the same sprint. Finish viewer Phase 2 first, then populate the house model through chat + `spec.ts` files in discipline folders.

## When house modeling starts

**Prerequisite:** Viewer **Phase 2** complete (Sprint 9 — all v1 entity kinds, spec composition, selection for inspection). Phase 1 alone is not enough: you need shell/zone kinds, multi-module compose, and selection before the iteration loop works on real house data.

Then, incrementally:

1. Add `spec.ts` (or equivalent) to discipline folders as each topic is ready.
2. Register those modules in compose config (Sprint 8 registry).
3. Narrative and decisions stay in folder `README.md` / `viability.md`; positions and sizes live in `spec.ts`.
4. Inspect in viewer → describe in chat → AI edits → validate → reload. See [iteration.md](../viewer/iteration.md).

## Suggested house modeling order

Not software sprints — a loose sequence for the building project:

| Step | Folder | Content |
|------|--------|---------|
| 1 | `00-project` | Footprint, orientation, global constants |
| 2 | `04-water-tanks` | Tank entities on south wall |
| 3 | `03-passive-solar` | Glazing, roof/overhang params |
| 4 | `06-structure` | Slab, structural regions |
| 5 | `05-floor-plan` | Zones, wet walls, openings |
| 6 | `02-envelope` | Wall assemblies (when schema supports) |
| 7 | `07-mechanical` | Fixtures, runs (when schema supports) |

Skip or reorder based on design conversations. Each step is house work, not viewer work.

## References

- [concept.md](./concept.md) — current design thesis
- [decision-log.md](./decision-log.md) — locked decisions
- [workflow.md](./workflow.md) — folder conventions

## Status

Ready to begin — viewer Phase 2 complete.
