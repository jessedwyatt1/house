import type { Entity } from '../model/schema.ts'

/**
 * Minimal demo entities for software sprints — not house geometry.
 * Arbitrary 40' × 20' footprint; ids use demo- prefix.
 */
export const demoBasicEntities = [
  {
    id: 'demo-slab',
    layer: 'structure',
    kind: 'slab',
    position: [0, 0, 0],
    size: [40, 0.5, 20],
    label: 'Demo slab',
  },
  {
    id: 'demo-box-a',
    layer: 'envelope',
    kind: 'box',
    position: [5, 0.5, 5],
    size: [8, 10, 6],
    label: 'Demo box A',
  },
  {
    id: 'demo-box-b',
    layer: 'partitions',
    kind: 'box',
    position: [20, 0.5, 8],
    size: [4, 9, 0.5],
    label: 'Demo partition',
  },
  {
    id: 'demo-glazing-south',
    layer: 'glazing',
    kind: 'glazing-wall',
    position: [0, 0.5, 0],
    size: [40, 10, 0.25],
    meta: { face: 'south' },
  },
] satisfies Entity[]
