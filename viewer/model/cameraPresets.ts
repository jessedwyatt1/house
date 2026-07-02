import { computeCameraFrame, type Bounds, type CameraFrame } from './bounds.ts'

export type CameraPreset = 'plan' | 'elevation' | 'interior' | 'reset'

export function getCameraPreset(
  preset: CameraPreset,
  bounds: Bounds,
): CameraFrame {
  if (preset === 'reset') {
    return computeCameraFrame(bounds)
  }

  const [cx, , cz] = bounds.center
  const [sx, sy, sz] = bounds.size
  const span = Math.max(sx, sy, sz)

  switch (preset) {
    case 'plan':
      return {
        position: [cx, bounds.max[1] + span * 1.5, cz],
        target: [cx, bounds.min[1], cz],
        minDistance: span * 0.1,
        maxDistance: span * 8,
      }

    case 'elevation': {
      // Generic south elevation — camera south of model (−Z), looking north (+Z).
      const distance = span * 1.5
      const eyeY = bounds.min[1] + sy * 0.45
      return {
        position: [cx, eyeY, bounds.min[2] - distance],
        target: [cx, eyeY, cz],
        minDistance: span * 0.1,
        maxDistance: span * 8,
      }
    }

    case 'interior': {
      const eyeHeight = bounds.min[1] + Math.min(5.5, sy * 0.55)
      return {
        position: [
          bounds.min[0] + sx * 0.35,
          eyeHeight,
          bounds.min[2] + sz * 0.35,
        ],
        target: [cx, eyeHeight, bounds.max[2] - sz * 0.15],
        minDistance: span * 0.05,
        maxDistance: span * 4,
      }
    }
  }
}

export type SectionAxis = 'x' | 'y' | 'z'

export function sectionRange(
  bounds: Bounds,
  axis: SectionAxis,
): [min: number, max: number] {
  const index = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
  return [bounds.min[index], bounds.max[index]]
}

export function defaultSectionOffset(
  bounds: Bounds,
  axis: SectionAxis,
): number {
  const [min, max] = sectionRange(bounds, axis)
  return min + (max - min) * 0.65
}
