import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { Entity } from '../../../model/schema.ts'
import {
  parseWallHeelHeights,
  parseWallSegmentMeta,
} from '../../../model/schema.ts'

const BOX_INDICES = [
  0, 2, 1, 0, 3, 2,
  4, 5, 6, 4, 6, 7,
  0, 1, 5, 0, 5, 4,
  3, 7, 6, 3, 6, 2,
  0, 4, 7, 0, 7, 3,
  1, 2, 6, 1, 6, 5,
]

export type StandingSeamParams = {
  seamSpacingFt: number
  ribHeightFt: number
  ribWidthFt: number
}

export function parseStandingSeamMeta(
  meta: Record<string, unknown> | undefined,
): StandingSeamParams | null {
  if (meta?.profile !== 'standing-seam') return null

  const seamSpacingIn =
    typeof meta.seamSpacingIn === 'number' ? meta.seamSpacingIn : 16
  const ribHeightIn = typeof meta.ribHeightIn === 'number' ? meta.ribHeightIn : 2.5
  const ribWidthIn = typeof meta.ribWidthIn === 'number' ? meta.ribWidthIn : 1.5

  return {
    seamSpacingFt: seamSpacingIn / 12,
    ribHeightFt: ribHeightIn / 12,
    ribWidthFt: ribWidthIn / 12,
  }
}

function slopedBandZ(
  x0: number,
  x1: number,
  z0: number,
  z1: number,
  heelLow: number,
  heelHigh: number,
  bandHeight: number,
): THREE.BufferGeometry {
  const bottomLow = heelLow
  const bottomHigh = heelHigh
  const topLow = bottomLow + bandHeight
  const topHigh = bottomHigh + bandHeight

  const vertices = new Float32Array([
    x0, bottomLow, z0,
    x1, bottomLow, z0,
    x1, bottomHigh, z1,
    x0, bottomHigh, z1,
    x0, topLow, z0,
    x1, topLow, z0,
    x1, topHigh, z1,
    x0, topHigh, z1,
  ])

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  geometry.setIndex(BOX_INDICES)
  geometry.computeVertexNormals()
  return geometry
}

/** Standing seam panels run N–S; ribs (seams) repeat E–W at `seamSpacingFt`. */
export function buildStandingSeamGeometry(
  entity: Entity,
  params: StandingSeamParams,
): THREE.BufferGeometry | null {
  const size = entity.size
  if (!size) return null

  const heels = parseWallHeelHeights(entity.meta)
  if (!heels) return null

  const { bandHeight } = parseWallSegmentMeta(entity.meta)
  if (!bandHeight) return null

  const [runLength, , footprintWidth] = size
  const [px, py, pz] = entity.position
  const { heelLow, heelHigh } = heels
  const panelBottomLow = py + heelLow
  const panelBottomHigh = py + heelHigh
  const panelTopLow = panelBottomLow + bandHeight
  const panelTopHigh = panelBottomHigh + bandHeight

  const z0 = pz
  const z1 = pz + runLength
  const xWest = px
  const xEast = px + footprintWidth

  const parts: THREE.BufferGeometry[] = [
    slopedBandZ(xWest, xEast, z0, z1, panelBottomLow, panelBottomHigh, bandHeight),
  ]

  const { seamSpacingFt, ribHeightFt, ribWidthFt } = params
  for (let x = xWest; x <= xEast + 1e-6; x += seamSpacingFt) {
    const ribX0 = Math.max(xWest, x - ribWidthFt / 2)
    const ribX1 = Math.min(xEast, x + ribWidthFt / 2)
    if (ribX1 - ribX0 < 1e-6) continue

    parts.push(
      slopedBandZ(
        ribX0,
        ribX1,
        z0,
        z1,
        panelTopLow,
        panelTopHigh,
        ribHeightFt,
      ),
    )
  }

  const merged = mergeGeometries(parts, false)
  for (const part of parts) part.dispose()
  return merged
}
