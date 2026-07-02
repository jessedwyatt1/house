import type * as THREE from 'three'
import type { Entity } from '../../model/schema.ts'
import { isXrayLayer, XRAY_OPACITY } from './xray.ts'

type MaterialBase = {
  color: string
  transparent?: boolean
  opacity?: number
}

export function resolveEntityMaterial(
  entity: Entity,
  base: MaterialBase,
  xrayEnabled: boolean,
  clippingPlanes?: THREE.Plane[],
): MaterialBase & { clippingPlanes?: THREE.Plane[]; clipShadows?: boolean; depthWrite?: boolean } {
  const xray = isXrayLayer(entity.layer, xrayEnabled)

  const material = xray
    ? {
        ...base,
        transparent: true,
        opacity: XRAY_OPACITY,
        depthWrite: false,
      }
    : base

  return {
    ...material,
    clippingPlanes,
    clipShadows: clippingPlanes !== undefined,
  }
}

export function boxCenter(
  position: [number, number, number],
  size: [number, number, number],
): [number, number, number] {
  const [px, py, pz] = position
  const [w, h, d] = size
  return [px + w / 2, py + h / 2, pz + d / 2]
}

export function rotationRadians(
  rotation: [number, number, number] | undefined,
): [number, number, number] | undefined {
  return rotation
    ? rotation.map((deg) => (deg * Math.PI) / 180) as [number, number, number]
    : undefined
}

export function wallSegmentSize(
  size: [number, number, number],
  orientation: 'x' | 'z',
): [number, number, number] {
  const [length, height, thickness] = size
  return orientation === 'z' ? [thickness, height, length] : [length, height, thickness]
}
