import type { Entity } from '../model/schema.ts'

/**
 * Generic L-shaped shell on the demo slab footprint — not house geometry.
 * Perimeter walls + interior leg, shed roof, one south-wall opening.
 */
export const demoShellEntities = [
  {
    id: 'demo-shell-wall-south',
    layer: 'envelope',
    kind: 'wall-segment',
    position: [2, 0.5, 0],
    size: [36, 10, 0.5],
    label: 'South wall',
    meta: { orientation: 'x' },
  },
  {
    id: 'demo-shell-wall-north',
    layer: 'envelope',
    kind: 'wall-segment',
    position: [2, 0.5, 19.5],
    size: [36, 10, 0.5],
    label: 'North wall',
    meta: { orientation: 'x' },
  },
  {
    id: 'demo-shell-wall-west',
    layer: 'envelope',
    kind: 'wall-segment',
    position: [2, 0.5, 0],
    size: [0.5, 10, 20],
    label: 'West wall',
    meta: { orientation: 'z' },
  },
  {
    id: 'demo-shell-wall-east',
    layer: 'envelope',
    kind: 'wall-segment',
    position: [37.5, 0.5, 0],
    size: [0.5, 10, 20],
    label: 'East wall',
    meta: { orientation: 'z' },
  },
  {
    id: 'demo-shell-wall-leg-x',
    layer: 'partitions',
    kind: 'wall-segment',
    position: [2, 0.5, 12],
    size: [20, 10, 0.5],
    label: 'L partition (east leg)',
    meta: { orientation: 'x' },
  },
  {
    id: 'demo-shell-wall-leg-z',
    layer: 'partitions',
    kind: 'wall-segment',
    position: [21.5, 0.5, 12],
    size: [0.5, 10, 8],
    label: 'L partition (north leg)',
    meta: { orientation: 'z' },
  },
  {
    id: 'demo-shell-opening-entry',
    layer: 'envelope',
    kind: 'opening',
    position: [16, 2, 0],
    size: [6, 7, 0.6],
    label: 'Entry opening',
    meta: { hostWallId: 'demo-shell-wall-south' },
  },
  {
    id: 'demo-shell-roof',
    layer: 'envelope',
    kind: 'roof',
    position: [2, 10.5, 0],
    size: [36, 0.33, 20],
    label: 'Shed roof',
    meta: { heelLow: 0, heelHigh: 4, overhang: 1.5 },
  },
] satisfies Entity[]
