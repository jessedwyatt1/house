import type { Entity } from '../model/schema.ts'

/**
 * Program zones for the demo L-shaped shell — generic labels, not house rooms.
 */
export const demoZoneEntities = [
  {
    id: 'demo-zone-a',
    layer: 'zones',
    kind: 'zone',
    position: [3, 0.5, 1],
    size: [18, 9, 11],
    label: 'Demo zone A',
    meta: { color: '#4caf82' },
  },
  {
    id: 'demo-zone-b',
    layer: 'zones',
    kind: 'zone',
    position: [23, 0.5, 13],
    size: [14, 9, 6],
    label: 'Demo zone B',
    meta: { color: '#9c7bd8' },
  },
] satisfies Entity[]
