import type { Entity } from '../viewer/model/schema.ts'

/**
 * Water tanks — interior thermal battery behind the south glass.
 *
 * Convention (schema.ts): origin = SW corner of slab top, Y = 0 = finish floor
 * and exterior grade at the south building line (z = 0). +X east, +Z north, feet.
 *
 * Layout: the 60' slab is split into two 30' halves and one tank is centered on
 * each half (centers at x = 15 and x = 45). Each tank is 15' wide, 18" deep, 10'
 * tall. The tanks butt right up against the south glass line (front face at
 * z = 0) — the tank front effectively *is* the glazing plane.
 *
 * Drains: a 6" recessed channel wraps the three *interior* sides of each tank
 * (west, north, east). No drain on the south side, since that face meets the
 * glass. Channels are modeled as `opening` recesses cut 3" into the slab
 * surface (y −0.25 → 0) — not separate solid boxes that overlap the slab.
 *
 * Support: tanks bear on the thickened pads `slab-tank-west` / `slab-tank-east`
 * in 06-structure, which are centered under these positions.
 */

const FOOTPRINT_WIDTH = 60 // E–W, along south glass wall

const TANK_WIDTH = 15 // along south wall (E–W)
const TANK_DEPTH = 1.5 // 18" into building from glass line
const TANK_HEIGHT = 10 // floor to top of tank

// One tank centered on each 30' half of the south wall.
const HALF_WIDTH = FOOTPRINT_WIDTH / 2 // 30
const TANK_WEST_CENTER = HALF_WIDTH / 2 // 15
const TANK_EAST_CENTER = HALF_WIDTH + HALF_WIDTH / 2 // 45
const TANK_WEST_X = TANK_WEST_CENTER - TANK_WIDTH / 2 // 7.5
const TANK_EAST_X = TANK_EAST_CENTER - TANK_WIDTH / 2 // 37.5

const TANK_SOUTH_Z = 0 // front face on the glass line

const DRAIN_WIDTH = 0.5 // 6" channel
const DRAIN_DEPTH = 0.25 // 3" recessed into slab surface

// Insulated roll-up curtain on the tank north face — closes down, opens up (projector-screen style).
const CURTAIN_THICKNESS = 0.08 // ~1"
const CURTAIN_COLOR = '#1a1a1a'
const CURTAIN_INTERIOR_COLOR = '#ffffff'
const CURTAIN_EAST_OPEN_FRACTION = 0.75 // east: 75% open
const CURTAIN_WEST_OPEN_FRACTION = 0.25 // west: 75% closed

// Per-tank volume sanity: 1.5 × 15 × 10 = 225 ft³ ≈ 1,683 gal.
const TANK_VOLUME_FT3 = TANK_WIDTH * TANK_DEPTH * TANK_HEIGHT
const GAL_PER_FT3 = 7.48052
const TANK_VOLUME_GAL = Math.round(TANK_VOLUME_FT3 * GAL_PER_FT3)
const TANK_WEIGHT_LB = Math.round(TANK_VOLUME_GAL * 8.345)

export const MODULE_ID = '04-water-tanks'

function tank(id: string, x: number, label: string): Entity {
  return {
    id,
    layer: 'mechanical',
    kind: 'glazing-wall',
    position: [x, 0, TANK_SOUTH_Z],
    size: [TANK_WIDTH, TANK_HEIGHT, TANK_DEPTH],
    label,
    meta: {
      contents: 'water',
      volumeGal: TANK_VOLUME_GAL,
      weightFullLb: TANK_WEIGHT_LB,
      role: 'passive-solar thermal mass',
      frontFace: 'butts south glass line (z = 0)',
      materialTBD: 'concrete / steel / HDPE modular',
    },
  }
}

/**
 * U-shaped drain hugging the three interior sides of a tank (west, north, east).
 * Returned as three thin recessed boxes on the slab surface.
 */
function drains(idPrefix: string, tankX: number): Entity[] {
  const y = -DRAIN_DEPTH // top of channel flush with finish floor
  const northZ = TANK_SOUTH_Z + TANK_DEPTH // z = 1.5, back face of tank
  const runDepth = TANK_DEPTH + DRAIN_WIDTH // side channels run the tank depth + north channel

  const baseMeta = {
    channelWidthIn: 6,
    channelDepthIn: 3,
    role: 'perimeter drain (leak capture / condensation)',
    sides: 'west, north, east (none on south glass side)',
  }

  return [
    {
      id: `${idPrefix}-west`,
      layer: 'mechanical',
      kind: 'opening',
      position: [tankX - DRAIN_WIDTH, y, TANK_SOUTH_Z],
      size: [DRAIN_WIDTH, DRAIN_DEPTH, runDepth],
      label: 'Tank drain — west',
      meta: baseMeta,
    },
    {
      id: `${idPrefix}-east`,
      layer: 'mechanical',
      kind: 'opening',
      position: [tankX + TANK_WIDTH, y, TANK_SOUTH_Z],
      size: [DRAIN_WIDTH, DRAIN_DEPTH, runDepth],
      label: 'Tank drain — east',
      meta: baseMeta,
    },
    {
      id: `${idPrefix}-north`,
      layer: 'mechanical',
      kind: 'opening',
      position: [tankX - DRAIN_WIDTH, y, northZ],
      size: [TANK_WIDTH + DRAIN_WIDTH * 2, DRAIN_DEPTH, DRAIN_WIDTH],
      label: 'Tank drain — north',
      meta: baseMeta,
    },
  ]
}

/**
 * Roll-up insulated curtain on the tank north face (projector-screen style).
 * Closed: full-height panel drops down to cover the north face.
 * Open: fabric rolls up into a housing at the tank top.
 * `openFraction` = share retracted upward (0 = fully closed, 1 = fully open).
 */
function tankCurtain(
  id: string,
  tankId: string,
  tankX: number,
  openFraction: number,
  label: string,
  interiorColor?: string,
  interiorTexture?: string,
): Entity {
  const closedPosition: [number, number, number] = [tankX, 0, TANK_DEPTH]
  const closedSize: [number, number, number] = [
    TANK_WIDTH,
    TANK_HEIGHT,
    CURTAIN_THICKNESS,
  ]

  const visibleHeight = TANK_HEIGHT * (1 - openFraction)
  const position: [number, number, number] = [
    tankX,
    TANK_HEIGHT - visibleHeight,
    TANK_DEPTH,
  ]
  const size: [number, number, number] = [
    TANK_WIDTH,
    visibleHeight,
    CURTAIN_THICKNESS,
  ]

  const closedFraction = 1 - openFraction
  const state =
    openFraction >= 1 ? 'open' : openFraction <= 0 ? 'closed' : 'partial'

  return {
    id,
    layer: 'mechanical',
    kind: 'box',
    position,
    size,
    label,
    meta: {
      hostWallId: tankId,
      color: CURTAIN_COLOR,
      ...(interiorColor ? { colorInterior: interiorColor } : {}),
      ...(interiorTexture ? { textureInterior: interiorTexture } : {}),
      finish: interiorColor ? 'black exterior; white interior' : 'black both sides',
      state,
      openFraction,
      closedFraction,
      mechanism: 'projector-screen roll — closes down, opens up',
      role: 'insulated backing — closed retains tank heat; open admits light to interior',
      closedPosition,
      closedSize,
      note: `${Math.round(openFraction * 100)}% retracted into top housing; ${Math.round(closedFraction * 100)}% of north face covered`,
    },
  }
}

export function getSpecEntities(): Entity[] {
  return [
    tank('tank-west', TANK_WEST_X, 'Water tank — west (1,680 gal)'),
    tank('tank-east', TANK_EAST_X, 'Water tank — east (1,680 gal)'),
    ...drains('drain-tank-west', TANK_WEST_X),
    ...drains('drain-tank-east', TANK_EAST_X),
    tankCurtain(
      'curtain-tank-west',
      'tank-west',
      TANK_WEST_X,
      CURTAIN_WEST_OPEN_FRACTION,
      'Tank curtain — west (75% closed)',
      CURTAIN_INTERIOR_COLOR,
      '/textures/projection-heres-johnny.png',
    ),
    tankCurtain(
      'curtain-tank-east',
      'tank-east',
      TANK_EAST_X,
      CURTAIN_EAST_OPEN_FRACTION,
      'Tank curtain — east (75% open)',
    ),
  ]
}
