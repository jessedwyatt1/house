# Design iteration (viewer + chat)

How house design work connects to the viewer software. **Conversation happens in Cursor chat** — the viewer has no AI or chat UI.

## Loop

1. Open the viewer (`npm run dev`) and inspect the model.
2. Describe what you see or want changed **in plain English** in chat.
3. AI edits `spec.ts` files and related markdown.
4. Run `npm run validate` (AI can do this in the terminal).
5. Reload the viewer — Vite hot-reloads when imported spec modules change.
6. Confirm visually; repeat.

## What the viewer provides

| Capability | Purpose |
|------------|---------|
| 3D navigation, layers, section cut, presets | Inspect and evaluate geometry |
| Selection panel | Click an object to see id, layer, kind, size (helps you describe it in chat) |
| `npm run validate` | Catch bad data before render |

## What stays out of the viewer

- Chat, prompts, or AI integration
- In-viewer editing or drag-to-move
- UI affordances meant to bridge into chat (copy buttons, prompt fields, etc.)

## Entity IDs

Every entity has a stable `id` in spec data. AI uses these when editing files. You describe things in plain English; AI maps descriptions to ids and coordinates.

**Demo fixtures (software sprints):** `demo-` prefix — e.g. `demo-slab`, `demo-zone-a`.

**House specs (design track):** discipline-scoped names — e.g. `tanks-east`, `zone-kitchen`, `wall-north-entry`. Document notable ids in the folder's `README.md` when helpful.

## Layers

Generic visibility groups defined in the schema — not tied to this project's water-tank strategy or any other house-specific system. Assign entities to layers during house modeling (e.g. tank volumes on `mechanical` or `structure`).

## Spec composition

Sprint 8 merges multiple spec modules into one model. Configuration lives in the viewer — **not** in house folders.

| File | Role |
|------|------|
| `model/compose.config.ts` | Profiles (`demo-full`, `demo-a`, `demo-b`) and max extent |
| `model/registry.ts` | Maps module id → `getEntities()` provider |
| `model/compose.ts` | Merges modules, runs global checks, returns `HouseModel` |

### Switch compose profile

```bash
# House design (after modules registered in compose.config.ts)
npm run dev:house
npm run validate:house

# Demo fixtures (software testing)
VITE_COMPOSE_PROFILE=demo-a npm run dev
COMPOSE_PROFILE=demo-b npm run validate
```

Profiles:
- **`demo-full`** — both fixture modules (default)
- **`demo-a`** — primitives only
- **`demo-b`** — shell + zones only

### Add a spec module (house design track)

After Phase 2, when modeling the house:

1. Create `spec.ts` in a discipline folder (e.g. `06-structure/spec.ts`) exporting entities or a `getSpecEntities()` function.
2. Register the module in `viewer/model/registry.ts`:
   ```ts
   import { structureEntities } from '../../06-structure/spec.ts'

   '06-structure': {
     id: '06-structure',
     getEntities: () => structureEntities,
   },
   ```
3. Add the module id to a compose profile in `compose.config.ts` (or create a `house` profile).
4. Run `npm run validate` — duplicate ids across modules fail with module names.

Do **not** import house specs during viewer software sprints. Register them only when starting the [house design track](../00-project/house-design.md).

### Global merge checks

Before Zod validation:
- Unique entity ids across all modules (error cites both module names)
- Optional max model extent (`MAX_MODEL_EXTENT_FT` in compose.config.ts)

Vite hot-reloads the scene when registered fixture or registry files change — no dev-server restart needed.

## When house modeling starts

After **viewer Phase 2** (Sprint 9 complete): all v1 entity kinds render, multiple spec modules compose cleanly, selection works for inspection.

See [house-design.md](../00-project/house-design.md).
