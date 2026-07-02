import type { Entity } from '../viewer/model/schema.ts'

/**
 * South facade glazing and entry door.
 *
 * Convention (schema.ts): origin = SW corner of slab top, Y = 0 = finish floor
 * and exterior grade at the south building line (z = 0). +X east, +Z north, feet.
 *
 * The full 60' south wall is glazed. Two 15' water tanks (04-water-tanks) act
 * as the glazing for x 7.5–22.5 and x 37.5–52.5. This module fills the three
 * open bays with `glazing-wall` panels and places a centered glass entry door
 * in the 15' gap between the tanks.
 *
 * Roof and overhang are not modeled yet — south posts in 06-structure will
 * carry them when added. Locked params (03-passive-solar/viability.md):
 *   design latitude 44.08°N; south cantilever 4.5'; north eave 2'; no E/W structural overhang;
 *   roof heel 10' (south) → 12' (north) over 25' depth.
 */

const FOOTPRINT_WIDTH = 60

const TANK_WIDTH = 15
const TANK_WEST_X = 7.5
const TANK_EAST_X = 37.5
const TANK_WEST_END = TANK_WEST_X + TANK_WIDTH // 22.5
const TANK_EAST_END = TANK_EAST_X + TANK_WIDTH // 52.5

const SOUTH_EAVE = 10 // ft — south glazing height (matches tank top)

const GLAZING_THICK = 0.25 // ~3" frame + glass depth

const DOOR_WIDTH = 3
const DOOR_HEIGHT = 7
const ENTRY_BAY_CENTER = (TANK_WEST_END + TANK_EAST_X) / 2 // 30
const DOOR_X = ENTRY_BAY_CENTER - DOOR_WIDTH / 2 // 28.5

export const MODULE_ID = '03-passive-solar'

function glazingPanel(
  id: string,
  x: number,
  width: number,
  label: string,
): Entity {
  return {
    id,
    layer: 'glazing',
    kind: 'glazing-wall',
    position: [x, 0, 0],
    size: [width, SOUTH_EAVE, GLAZING_THICK],
    label,
    meta: { face: 'south' },
  }
}

export function getSpecEntities(): Entity[] {
  return [
    glazingPanel(
      'glazing-south-west',
      0,
      TANK_WEST_X,
      'South glazing — west end (7.5 ft)',
    ),
    glazingPanel(
      'glazing-south-entry',
      TANK_WEST_END,
      TANK_EAST_X - TANK_WEST_END,
      'South glazing — entry bay (15 ft)',
    ),
    glazingPanel(
      'glazing-south-east',
      TANK_EAST_END,
      FOOTPRINT_WIDTH - TANK_EAST_END,
      'South glazing — east end (7.5 ft)',
    ),
    {
      id: 'opening-entry-door',
      layer: 'glazing',
      kind: 'opening',
      position: [DOOR_X, 0, 0],
      size: [DOOR_WIDTH, DOOR_HEIGHT, GLAZING_THICK + 0.05],
      label: 'Main entry — glass door',
      meta: {
        hostWallId: 'glazing-south-entry',
        doorType: 'glass',
        note: 'Centered in entry bay between tanks',
      },
    },
  ]
}
