import type { Entity } from '../viewer/model/schema.ts'

/**
 * Site geometry — gentle south-facing slope with building footprint cut out.
 *
 * Convention (schema.ts): origin = SW corner of slab top, Y = 0 = finish floor
 * and exterior grade at the south building line (z = 0). +X east, +Z north, feet.
 *
 * Grade rises ~3' from south to north across the 25' building depth (12%).
 * Four boxes surround the 60' × 25' footprint (no overlap with foundation).
 * Each piece shares the same top-surface plane: y = z × (GRADE_RISE / FOOTPRINT).
 *
 * See 06-structure/spec.ts for the foundation in the cutout.
 */

const FOOTPRINT_WIDTH = 60 // E–W, along south glass wall
const FOOTPRINT_DEPTH = 25 // N–S

const PAD_X = 20
const PAD_Z = 20
const GROUND_THICKNESS = 3

const GRADE_RISE_NORTH = FOOTPRINT_DEPTH * 0.12 // 3'
const SLOPE_DEG =
  -Math.atan2(GRADE_RISE_NORTH, FOOTPRINT_DEPTH) * (180 / Math.PI)
const SLOPE_SIN = Math.sin((SLOPE_DEG * Math.PI) / 180)
const SLOPE_COS = Math.cos((SLOPE_DEG * Math.PI) / 180)

/**
 * Mesh center Y for a grade piece whose center is at pieceCenterZ.
 * Top surface satisfies y = z × (GRADE_RISE_NORTH / FOOTPRINT_DEPTH).
 */
function gradeCenterY(pieceCenterZ: number): number {
  const halfH = GROUND_THICKNESS / 2
  return -halfH * SLOPE_COS - pieceCenterZ * SLOPE_SIN
}

function gradeEntity(
  id: string,
  position: [number, number, number],
  size: [number, number, number],
  label: string,
): Entity {
  const [, , pz] = position
  const [, , depth] = size
  const pieceCenterZ = pz + depth / 2
  const cy = gradeCenterY(pieceCenterZ)
  const py = cy - GROUND_THICKNESS / 2

  return {
    id,
    layer: 'site',
    kind: 'box',
    position: [position[0], py, pz],
    size,
    rotation: [SLOPE_DEG, 0, 0],
    label,
    meta: {
      slopePct: GRADE_RISE_NORTH / FOOTPRINT_DEPTH,
      gradeRiseFt: GRADE_RISE_NORTH,
    },
  }
}

export const MODULE_ID = '01-site'

export function getSpecEntities(): Entity[] {
  const groundWidth = FOOTPRINT_WIDTH + PAD_X * 2

  return [
    gradeEntity(
      'site-grade-south',
      [-PAD_X, 0, -PAD_Z],
      [groundWidth, GROUND_THICKNESS, PAD_Z],
      'Grade south of building',
    ),
    gradeEntity(
      'site-grade-north',
      [-PAD_X, 0, FOOTPRINT_DEPTH],
      [groundWidth, GROUND_THICKNESS, PAD_Z],
      'Grade north of building',
    ),
    gradeEntity(
      'site-grade-west',
      [-PAD_X, 0, 0],
      [PAD_X, GROUND_THICKNESS, FOOTPRINT_DEPTH],
      'Grade west of building',
    ),
    gradeEntity(
      'site-grade-east',
      [FOOTPRINT_WIDTH, 0, 0],
      [PAD_X, GROUND_THICKNESS, FOOTPRINT_DEPTH],
      'Grade east of building',
    ),
  ]
}
