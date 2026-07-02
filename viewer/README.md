# House viewer (software)

Web app for viewing and iterating on a **declarative building model**. This folder is the **software project** only.

The actual house is modeled separately in `01`–`09` once viewer Phase 2 is complete. See [house design track](../00-project/house-design.md) and [iteration.md](./iteration.md).

## What this software does

| Piece | Role |
|-------|------|
| **Schema (Zod)** | Typed entities; validate before render |
| **Compose** | Merge spec modules into one `HouseModel` |
| **Renderer** | Map entity `kind` → Three.js meshes |
| **Viewer UI** | Orbit, layers, section cut, presets, selection (inspection only — no chat UI) |
| **Fixtures** | Demo models for testing software without house data |

## Architecture & workflow

- [architecture.md](./architecture.md) — schema, renderer, layers
- [iteration.md](./iteration.md) — viewer + Cursor chat loop, entity naming

## Build plan

**[sprints/README.md](./sprints/README.md)** — software sprints only (Phase 1–4).

## Repo layout (target)

```
viewer/
  README.md
  architecture.md
  sprints/
  package.json
  fixtures/           ← demo models (NOT the real house)
    demo-basic.ts
    demo-shell.ts
    demo-zones.ts
    demo-module-a.ts
    demo-module-b.ts
  model/
    schema.ts
    compose.ts
    compose.config.ts
    composeMerge.ts
    registry.ts
    bounds.ts
    cameraPresets.ts
    layers.ts
  scripts/
    validate.ts
  src/
    viewer/           ← R3F scene + UI (Sprint 2+)
```

House geometry eventually lives in `01`–`09/spec.ts` and is composed by the viewer — that is house design work, not viewer sprints.

## Commands (after Sprint 0)

```bash
cd viewer
npm install
npm run validate
npm run dev

# Optional: load one fixture module only
VITE_COMPOSE_PROFILE=demo-a npm run dev
COMPOSE_PROFILE=demo-b npm run validate
```

## Status

Sprint 9 complete — **Phase 2 exit**. House modeling can begin per [house-design.md](../00-project/house-design.md).
