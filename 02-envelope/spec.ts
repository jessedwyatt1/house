import type { Entity } from '../viewer/model/schema.ts'

/**
 * Exterior envelope — north, east, and west perimeter walls.
 *
 * Convention (schema.ts): origin = SW corner of slab top, Y = 0 = finish floor.
 * +X east, +Z north, feet.
 *
 * South facade is full glazing (03-passive-solar). Ceiling rises from 10' at
 * the south eave to 12' at the north wall (concept.md). Side walls are sloped
 * so their tops meet the 10' south line and 12' north wall flush.
 */

const FOOTPRINT_WIDTH = 60 // E–W
const FOOTPRINT_DEPTH = 25 // N–S

const SOUTH_EAVE = 10 // ft — matches south glazing / tank zone
const NORTH_WALL_HEIGHT = 12 // ft
const WALL_THICK = 0.5 // 6" framed wall

export const MODULE_ID = '02-envelope'

export function getSpecEntities(): Entity[] {
  return [
    {
      id: 'wall-north',
      layer: 'envelope',
      kind: 'wall-segment',
      position: [0, 0, FOOTPRINT_DEPTH - WALL_THICK],
      size: [FOOTPRINT_WIDTH, NORTH_WALL_HEIGHT, WALL_THICK],
      label: 'North wall (12 ft)',
      meta: {
        orientation: 'x',
        face: 'north',
      },
    },
    {
      id: 'wall-west',
      layer: 'envelope',
      kind: 'wall-segment',
      position: [0, 0, 0],
      size: [FOOTPRINT_DEPTH, NORTH_WALL_HEIGHT, WALL_THICK],
      label: 'West wall — sloped 10\' S to 12\' N',
      meta: {
        orientation: 'z',
        heelLow: SOUTH_EAVE,
        heelHigh: NORTH_WALL_HEIGHT,
        face: 'west',
      },
    },
    {
      id: 'wall-east',
      layer: 'envelope',
      kind: 'wall-segment',
      position: [FOOTPRINT_WIDTH - WALL_THICK, 0, 0],
      size: [FOOTPRINT_DEPTH, NORTH_WALL_HEIGHT, WALL_THICK],
      label: 'East wall — sloped 10\' S to 12\' N',
      meta: {
        orientation: 'z',
        heelLow: SOUTH_EAVE,
        heelHigh: NORTH_WALL_HEIGHT,
        face: 'east',
      },
    },
  ]
}
