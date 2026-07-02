# Workflow

How we work across folders. **Viability** and **design process** are not separate top-level categories — they run through each discipline folder and this project folder.

## Two tracks

| Track | What | Where |
|-------|------|-------|
| **Viewer software** | App, schema, renderer, UI | [viewer/](../viewer/) — [sprints](../viewer/sprints/README.md) |
| **House design** | This building: docs + `spec.ts` geometry | `00-project/`, `01`–`09` — [house-design.md](./house-design.md) |

Build the viewer first (Sprints 0–9, done). Model the house via [house-design.mdc](../.cursor/rules/house-design.mdc). Chat stays in Cursor — [iteration.md](../viewer/iteration.md).

## Per-folder structure (house design)

| Kind | File / place | Purpose |
|------|----------------|---------|
| Index | `README.md` | Scope, open questions, links |
| Viability | `viability.md` | Go / no-go analysis for this topic |
| Detail | additional `.md` files | Specs, calculations, notes as needed |
| Geometry (viewer) | `spec.ts` | Machine-readable entities for the [viewer](../viewer/) (when present) |
| Design artifacts | `drawings/`, `models/` | Sketches, exports, model files (when they exist) |

Not every folder needs all of these on day one. Add files as work starts.

## Viability (in each category)

Before excruciating detail on a topic, write or update that folder's `viability.md`.

**Verdicts:** Go | Go with changes | No-go | Unknown

**Template:**

1. **Question** — what we're deciding
2. **Constraints** — code, cost, physics, maintenance
3. **Options** — alternatives considered
4. **Analysis** — rough numbers or references
5. **Verdict** — go / no-go / conditions
6. **Next steps** — what detail work follows

Log locked outcomes in [decision-log.md](./decision-log.md).

## Design process (in each category)

Design work matures inside the relevant folder:

| Phase | Output | Typical location |
|-------|--------|------------------|
| Concept | Narrative, rough sketches | `README.md`, notes in folder |
| Schematic | Plan fragments, sections, elevations | `drawings/`, `models/` in that folder |
| Design development | Dimensioned details, assemblies | same folder, more refined |
| Permit / build | Sheets for consultants or permit | export + cross-link from [09-compliance](../09-compliance/) |

**Project-wide conventions** (define here as we go):

- [x] Units: **feet** (see viewer/model/schema.ts)
- [ ] North arrow and site orientation on all drawings
- [ ] Layer / naming conventions if using CAD/BIM
- [ ] Primary modeling tool

**Repo convention:** Markdown is the source of truth for decisions and narrative. **Dimensions and positions** for the 3D viewer live in each folder's `spec.ts` (composed by `viewer/model/compose.ts`). Sketches and exports live in `drawings/` or `models/`. Do not duplicate numbers in markdown without citing the entity id.

**Visual design loop (after viewer Phase 2 + house specs exist):** inspect in viewer → describe changes in chat → AI edits `spec.ts` + docs → validate → reload.

## Suggested order — house design only

See [house-design.md](./house-design.md).

1. [concept.md](./concept.md) — align on thesis and dimensions
2. [01-site](../01-site/) — climate and jurisdiction
3. High-risk topics: [04-water-tanks](../04-water-tanks/), [03-passive-solar](../03-passive-solar/), [06-structure](../06-structure/)
4. [05-floor-plan](../05-floor-plan/) — layout and wet walls
5. [02-envelope](../02-envelope/), [07-mechanical](../07-mechanical/), [08-systems](../08-systems/)
6. [09-compliance](../09-compliance/) — ongoing
