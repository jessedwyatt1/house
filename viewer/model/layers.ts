import { LAYER_IDS, type Entity, type LayerId } from './schema.ts'

/** Layer ids present in the model, in schema order. */
export function layersInModel(entities: Entity[]): LayerId[] {
  const used = new Set(entities.map((entity) => entity.layer))
  return LAYER_IDS.filter((id) => used.has(id))
}

export function countByLayer(entities: Entity[]): Map<LayerId, number> {
  const counts = new Map<LayerId, number>()
  for (const entity of entities) {
    counts.set(entity.layer, (counts.get(entity.layer) ?? 0) + 1)
  }
  return counts
}
