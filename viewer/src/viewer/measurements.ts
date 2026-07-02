import type { Entity } from '../../model/schema.ts'
import { parseRoofMeta, parseWallHeelHeights, parseWallSegmentMeta } from '../../model/schema.ts'

export type ScaleBarState = {
  lengthFt: number
  barPx: number
}

const NICE_LENGTHS_FT = [1, 2, 5, 10, 15, 20, 25, 50, 100, 200, 500, 1000]

/** Pick a round map-style scale length that fits within maxBarPx. */
export function niceScaleLength(
  feetPerPixel: number,
  maxBarPx = 120,
): ScaleBarState {
  if (!Number.isFinite(feetPerPixel) || feetPerPixel <= 0) {
    return { lengthFt: 10, barPx: 60 }
  }

  const maxFeet = feetPerPixel * maxBarPx
  let lengthFt = NICE_LENGTHS_FT[0]

  for (const candidate of NICE_LENGTHS_FT) {
    if (candidate <= maxFeet) {
      lengthFt = candidate
    } else {
      break
    }
  }

  return { lengthFt, barPx: lengthFt / feetPerPixel }
}

/** Vertical world feet per screen pixel at a given camera distance. */
export function feetPerPixelAtDistance(
  distanceFt: number,
  fovDeg: number,
  viewportHeightPx: number,
): number {
  const vFovRad = (fovDeg * Math.PI) / 180
  const visibleHeightFt = 2 * Math.tan(vFovRad / 2) * distanceFt
  return visibleHeightFt / viewportHeightPx
}

export function formatFeet(value: number): string {
  const rounded = Math.abs(value - Math.round(value)) < 0.05 ? Math.round(value) : value
  const text =
    typeof rounded === 'number' && Number.isInteger(rounded)
      ? String(rounded)
      : rounded.toFixed(1)
  return text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export type MeasurementRow = {
  label: string
  value: string
}

export function entityMeasurementRows(entity: Entity): MeasurementRow[] {
  const rows: MeasurementRow[] = []

  if (entity.size) {
    const [a, b, c] = entity.size

    switch (entity.kind) {
      case 'wall-segment': {
        const { orientation = 'x' } = parseWallSegmentMeta(entity.meta)
        const heels = parseWallHeelHeights(entity.meta)
        if (orientation === 'z') {
          rows.push(
            { label: 'Length (N–S)', value: `${formatFeet(a)} ft` },
            heels
              ? { label: 'Height (S)', value: `${formatFeet(heels.heelLow)} ft` }
              : { label: 'Height', value: `${formatFeet(b)} ft` },
            { label: 'Thickness (E–W)', value: `${formatFeet(c)} ft` },
          )
          if (heels) {
            rows.push({ label: 'Height (N)', value: `${formatFeet(heels.heelHigh)} ft` })
          }
        } else {
          rows.push(
            { label: 'Length (E–W)', value: `${formatFeet(a)} ft` },
            heels
              ? { label: 'Height (W)', value: `${formatFeet(heels.heelLow)} ft` }
              : { label: 'Height', value: `${formatFeet(b)} ft` },
            { label: 'Thickness (N–S)', value: `${formatFeet(c)} ft` },
          )
          if (heels) {
            rows.push({ label: 'Height (E)', value: `${formatFeet(heels.heelHigh)} ft` })
          }
        }
        break
      }
      case 'roof': {
        const { heelLow, heelHigh, overhang = 0 } = parseRoofMeta(entity.meta)
        rows.push(
          { label: 'Footprint (E–W)', value: `${formatFeet(a)} ft` },
          { label: 'Footprint (N–S)', value: `${formatFeet(c)} ft` },
          { label: 'Eave height (S)', value: `${formatFeet(heelLow)} ft` },
          { label: 'Eave height (N)', value: `${formatFeet(heelHigh)} ft` },
        )
        if (overhang > 0) {
          rows.push({ label: 'Overhang', value: `${formatFeet(overhang)} ft` })
        }
        break
      }
      case 'opening':
        rows.push(
          { label: 'Width', value: `${formatFeet(a)} ft` },
          { label: 'Height', value: `${formatFeet(b)} ft` },
          { label: 'Depth', value: `${formatFeet(c)} ft` },
        )
        break
      default:
        rows.push(
          { label: 'Width (E–W)', value: `${formatFeet(a)} ft` },
          { label: 'Height', value: `${formatFeet(b)} ft` },
          { label: 'Depth (N–S)', value: `${formatFeet(c)} ft` },
        )
        if (entity.kind === 'slab' || entity.kind === 'box') {
          rows.push({
            label: 'Footprint',
            value: `${formatFeet(a * c)} sq ft`,
          })
        }
        break
    }
  }

  if (entity.rotation) {
    const [rx, ry, rz] = entity.rotation
    if (rx !== 0 || ry !== 0 || rz !== 0) {
      rows.push({
        label: 'Rotation',
        value: `${formatFeet(rx)}°, ${formatFeet(ry)}°, ${formatFeet(rz)}°`,
      })
    }
  }

  return rows
}
