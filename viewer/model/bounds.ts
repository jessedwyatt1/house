import type { Entity } from './schema.ts'
import { parseRoofMeta, parseWallHeelHeights, parseWallSegmentMeta } from './schema.ts'

export type Bounds = {
  min: [number, number, number]
  max: [number, number, number]
  center: [number, number, number]
  size: [number, number, number]
}

function roofAabb(entity: Entity): { min: [number, number, number]; max: [number, number, number] } | null {
  if (entity.kind !== 'roof' || !entity.size) return null

  const [px, py, pz] = entity.position
  const [w, panelThickness, d] = entity.size
  const { heelLow, heelHigh, overhang = 0 } = parseRoofMeta(entity.meta)

  const yMin = py + Math.min(heelLow, heelHigh) - panelThickness
  const yMax = py + Math.max(heelLow, heelHigh)

  return {
    min: [px - overhang, yMin, pz - overhang],
    max: [px + w + overhang, yMax, pz + d + overhang],
  }
}

function wallSegmentAabb(
  entity: Entity,
): { min: [number, number, number]; max: [number, number, number] } | null {
  if (entity.kind !== 'wall-segment' || !entity.size) return null

  const [px, py, pz] = entity.position
  const [runLength, height, thickness] = entity.size
  const { orientation = 'x' } = parseWallSegmentMeta(entity.meta)
  const heels = parseWallHeelHeights(entity.meta)

  if (heels) {
    const { bandHeight } = parseWallSegmentMeta(entity.meta)
    const yMin = bandHeight
      ? py + Math.min(heels.heelLow, heels.heelHigh)
      : py
    const yMax = py + Math.max(heels.heelLow, heels.heelHigh) + (bandHeight ?? 0)
    if (orientation === 'z') {
      return {
        min: [px, yMin, pz],
        max: [px + thickness, yMax, pz + runLength],
      }
    }
    return {
      min: [px, yMin, pz],
      max: [px + runLength, yMax, pz + thickness],
    }
  }

  if (orientation === 'z') {
    return {
      min: [px, py, pz],
      max: [px + thickness, py + height, pz + runLength],
    }
  }

  return {
    min: [px, py, pz],
    max: [px + runLength, py + height, pz + thickness],
  }
}

function entityAabb(entity: Entity): Bounds | null {
  if (entity.kind === 'roof') {
    const roof = roofAabb(entity)
    if (!roof) return null
    const { min, max } = roof
    return {
      min,
      max,
      center: [
        (min[0] + max[0]) / 2,
        (min[1] + max[1]) / 2,
        (min[2] + max[2]) / 2,
      ],
      size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]],
    }
  }

  if (entity.kind === 'wall-segment') {
    const wall = wallSegmentAabb(entity)
    if (!wall) return null
    const { min, max } = wall
    return {
      min,
      max,
      center: [
        (min[0] + max[0]) / 2,
        (min[1] + max[1]) / 2,
        (min[2] + max[2]) / 2,
      ],
      size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]],
    }
  }

  if (!entity.size) return null

  const [px, py, pz] = entity.position
  const [w, h, d] = entity.size

  return {
    min: [px, py, pz],
    max: [px + w, py + h, pz + d],
    center: [px + w / 2, py + h / 2, pz + d / 2],
    size: [w, h, d],
  }
}

export function computeModelBounds(entities: Entity[]): Bounds {
  let minX = Infinity
  let minY = Infinity
  let minZ = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let maxZ = -Infinity

  for (const entity of entities) {
    const aabb = entityAabb(entity)
    if (!aabb) continue

    minX = Math.min(minX, aabb.min[0])
    minY = Math.min(minY, aabb.min[1])
    minZ = Math.min(minZ, aabb.min[2])
    maxX = Math.max(maxX, aabb.max[0])
    maxY = Math.max(maxY, aabb.max[1])
    maxZ = Math.max(maxZ, aabb.max[2])
  }

  if (!Number.isFinite(minX)) {
    return {
      min: [0, 0, 0],
      max: [1, 1, 1],
      center: [0.5, 0.5, 0.5],
      size: [1, 1, 1],
    }
  }

  return {
    min: [minX, minY, minZ],
    max: [maxX, maxY, maxZ],
    center: [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2],
    size: [maxX - minX, maxY - minY, maxZ - minZ],
  }
}

export function expandBounds(bounds: Bounds, padding: number): Bounds {
  const min: [number, number, number] = [
    bounds.min[0] - padding,
    bounds.min[1],
    bounds.min[2] - padding,
  ]
  const max: [number, number, number] = [
    bounds.max[0] + padding,
    bounds.max[1],
    bounds.max[2] + padding,
  ]

  return {
    min,
    max,
    center: [
      (min[0] + max[0]) / 2,
      bounds.center[1],
      (min[2] + max[2]) / 2,
    ],
    size: [max[0] - min[0], bounds.size[1], max[2] - min[2]],
  }
}

export type CameraFrame = {
  position: [number, number, number]
  target: [number, number, number]
  minDistance: number
  maxDistance: number
}

export function boundsKey(bounds: Bounds): string {
  return `${bounds.min.join(',')}|${bounds.max.join(',')}`
}

/** Frame the camera on model bounds — reused by Sprint 5 presets. */
export function computeCameraFrame(bounds: Bounds): CameraFrame {
  const [spanX, spanY, spanZ] = bounds.size
  const span = Math.max(spanX, spanY, spanZ)
  const [cx, , cz] = bounds.center

  const target: [number, number, number] = [
    cx,
    bounds.min[1] + spanY * 0.35,
    cz,
  ]

  const distance = span * 1.75
  const eyeY = bounds.min[1] + spanY * 0.5 + distance * 0.55
  // South-southwest vantage looking northeast — keeps west on the left, east on the right.
  const position: [number, number, number] = [
    cx - distance * 0.35,
    eyeY,
    bounds.min[2] - distance * 0.85,
  ]

  return {
    position,
    target,
    minDistance: span * 0.15,
    maxDistance: span * 6,
  }
}

/** Pick a readable grid cell size (feet) for the model footprint. */
export function gridCellSize(bounds: Bounds): 1 | 5 {
  const footprint = Math.max(bounds.size[0], bounds.size[2])
  return footprint <= 24 ? 1 : 5
}
