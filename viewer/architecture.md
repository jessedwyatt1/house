# Viewer architecture

Software design for **AI-assisted building visualization**. Generic — not tied to a specific floor plan in the core app.

## Principles

1. **Declarative model** — geometry derived from data, not sculpted meshes.
2. **Named entities** — every object has a stable `id` in spec data (AI edits files in chat; no chat UI in the viewer).
3. **Validate before render** — Zod; `npm run validate` fails fast on bad data.
4. **Extensible kinds** — new entity types extend schema + renderer dispatch.
5. **Fixtures for development** — demo models in `viewer/fixtures/` test the app without house data.

## Coordinate system (project convention)

Used when modeling the house later; enforced by validation rules in compose, not hardcoded in the renderer.

| Axis | Direction |
|------|-----------|
| Origin | Southwest corner of slab, ground level (Y = 0) |
| +X | East |
| +Y | Up |
| +Z | North |
| Units | Feet |

The renderer draws whatever coordinates the model provides.

## Entity

```ts
{
  id: string;
  layer: LayerId;
  kind: EntityKind;
  position: [x, y, z];
  size?: [w, h, d];
  rotation?: [rx, ry, rz];
  assemblyId?: string;
  label?: string;
  meta?: Record<string, unknown>;
}
```

## Entity kinds (software roadmap)

| Kind | Software sprint | Purpose |
|------|-----------------|---------|
| `slab`, `box`, `glazing-wall` | 2 | Primitives |
| `roof` | 6 | Parametric sloped roof + overhang |
| `wall-segment`, `opening` | 6 | Walls and door/window gaps |
| `zone` | 7 | Labeled program volumes |
| `assembly-instance` | Deferred | Multi-layer constructions |
| `member-grid` | Deferred | Studs / joists at spacing |
| `fixture` | Deferred | Point objects (drains, equipment) |
| `pipe-run`, `duct-run` | Deferred | Schematic MEP |
| `annotation` | Deferred | Dimensions, notes |

## Layers

Generic visibility groups — house content assigns entities to these:

`site` · `structure` · `envelope` · `glazing` · `partitions` · `zones` · `mechanical` · `annotations`

No house-specific layer names in the schema — e.g. water tanks use `mechanical` or `structure` when modeled in the house track.

## Spec composition

```ts
// viewer/model/compose.ts — merges registered spec modules
export function getHouseModel(): HouseModel
```

Sprint 8 adds merging multiple modules + global rules (unique ids, bounds). House folders register their `spec.ts` later during [house design](../00-project/house-design.md) — not during software sprints.

## Fixtures vs. house specs

| Source | When | Purpose |
|--------|------|---------|
| `viewer/fixtures/*.ts` | Software sprints | Test renderer and UI |
| `01`–`09/spec.ts` | House design track | Real building data |

## Iteration loop (after both tracks exist)

Conversation is in **Cursor chat**, not in the viewer. See [iteration.md](./iteration.md).

```
Inspect in viewer → describe in chat → AI edits spec.ts + docs
  → validate → reload → confirm
```

## Related

- [iteration.md](./iteration.md) — chat + viewer workflow, entity naming
- [sprints/README.md](./sprints/README.md) — software build order
- [house-design.md](../00-project/house-design.md) — modeling the residence
