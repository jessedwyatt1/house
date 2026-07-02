# Sprint 0 — Scaffold

**Phase:** 1 — Now  
**Depends on:** —  
**Goal:** Empty viewer app runs locally.

## Deliverables

- [x] `viewer/package.json` — Vite, React, TypeScript
- [x] Dependencies: `three`, `@react-three/fiber`, `@react-three/drei`
- [x] `viewer/src/main.tsx`, `App.tsx` — minimal canvas with a test cube
- [x] `viewer/tsconfig.json`, `viewer/vite.config.ts`
- [x] `viewer/index.html`
- [x] Scripts: `dev`, `build`, `validate` (validate stub OK for now)
- [x] `.gitignore` entries for `node_modules`, `dist`

## Tasks

1. `npm create vite@latest` pattern inside `viewer/` (React + TS).
2. Add R3F + drei; render `<Canvas>` with `<OrbitControls>` and a gray box.
3. Confirm hot reload works.

## Acceptance criteria

- [x] `cd viewer && npm install && npm run dev` opens a page with a rotatable cube.
- [x] No TypeScript errors on build.

## Out of scope

- House model, schema, layers.

## Next

[Sprint 1 — Schema & validate](./sprint-01-schema.md)
