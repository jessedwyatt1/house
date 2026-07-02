/**
 * Example spec module shape — copy pattern into a discipline folder's spec.ts.
 * Not imported; see house-design.mdc for workflow.
 */
import type { Entity } from '../viewer/model/schema.ts'

export const MODULE_ID = '06-structure' // match folder, e.g. 04-water-tanks

export function getSpecEntities(): Entity[] {
  return [
    {
      id: 'slab-main',
      layer: 'structure',
      kind: 'slab',
      position: [0, 0, 0],
      size: [60, 0.5, 25],
      label: 'Main slab',
    },
    // Add entities; ids must be unique across all registered modules.
  ]
}
