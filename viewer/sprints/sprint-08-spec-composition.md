# Sprint 8 — Spec composition

**Phase:** 2 — Entity system  
**Depends on:** Sprint 7  
**Goal:** Merge multiple spec modules into one model — the mechanism house folders will use later.

## Deliverables

- [x] `compose.ts` accepts an array of spec providers (functions returning `Entity[]`)
- [x] `viewer/fixtures/demo-module-a.ts` + `demo-module-b.ts` — split demo across two files
- [x] Global validation after merge:
  - Unique entity `id`s
  - Optional bounding sanity (configurable max extent)
- [x] `viewer/model/registry.ts` or config listing which modules to load (env var or `compose.config.ts`)
- [x] Document extension point: how to add a new spec file (for house track later — see [iteration.md](../iteration.md))
- [x] Confirm Vite HMR reloads the scene when registered spec modules change (no manual restart)

## Acceptance criteria

- [x] Two fixture modules compose without id collision.
- [x] Duplicate id across modules fails `validate` with module attribution if possible.
- [x] Switching registry from demo-only to demo A+B changes scene without code changes elsewhere.
- [x] Editing a registered fixture module hot-reloads the viewer (no dev-server restart).

## Out of scope

- Importing `04-water-tanks/spec.ts` or any house folder.
- Auto-discovery scanning `01`–`09` (optional future enhancement).

## Next

[Sprint 9 — Selection](./sprint-09-selection.md)
