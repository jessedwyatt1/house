import { computeModelBounds } from './bounds.ts'
import { MAX_MODEL_EXTENT_FT } from './compose.config.ts'
import type { SpecModule } from './registry.ts'
import type { Entity } from './schema.ts'

export class ComposeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ComposeError'
  }
}

export type ComposeResult = {
  entities: Entity[]
  moduleIds: string[]
}

/** Merge entities from spec modules with global checks before Zod validation. */
export function composeFromModules(modules: SpecModule[]): ComposeResult {
  const moduleIds = modules.map((mod) => mod.id)
  const entities: Entity[] = []
  const idToModule = new Map<string, string>()

  for (const mod of modules) {
    const moduleEntities = mod.getEntities()

    for (const entity of moduleEntities) {
      const existingModule = idToModule.get(entity.id)
      if (existingModule) {
        throw new ComposeError(
          `duplicate entity id "${entity.id}" in modules "${existingModule}" and "${mod.id}"`,
        )
      }
      idToModule.set(entity.id, mod.id)
      entities.push(entity)
    }
  }

  if (entities.length === 0) {
    throw new ComposeError('composed model has no entities — check compose profile and registry')
  }

  if (MAX_MODEL_EXTENT_FT > 0) {
    const bounds = computeModelBounds(entities)
    const span = Math.max(bounds.size[0], bounds.size[1], bounds.size[2])
    if (span > MAX_MODEL_EXTENT_FT) {
      throw new ComposeError(
        `model extent ${span.toFixed(1)} ft exceeds max ${MAX_MODEL_EXTENT_FT} ft`,
      )
    }
  }

  return { entities, moduleIds }
}
