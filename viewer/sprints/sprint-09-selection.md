# Sprint 9 — Selection & inspection

**Phase:** 2 — Entity system  
**Depends on:** Sprint 8  
**Goal:** Click a mesh to inspect entity metadata — supports human evaluation; chat edits happen outside the viewer.

## Deliverables

- [x] Raycast pick on entity meshes
- [x] `viewer/src/ui/SelectionPanel.tsx` — id, layer, kind, label, position, size
- [x] Highlight selected entity (outline or emissive)
- [x] Optional: searchable entity list (debug / inspection panel)

## Acceptance criteria

- [x] Click demo entity → correct id and dimensions shown.
- [x] **Phase 2 exit:** full demo composed from modules; all v1 kinds render; selection works.

## Out of scope

- In-viewer editing / drag to move.
- Chat UI, copy-to-clipboard, or other AI-bridge affordances.
- Loading house discipline specs.

## Next

House modeling can begin per [house-design.md](../../00-project/house-design.md).  
Software continues in [deferred.md](./deferred.md) when needed.
