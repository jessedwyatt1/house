import { useLayoutEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionAxis } from '../../model/cameraPresets.ts'

export function ClippingSetup() {
  const gl = useThree((state) => state.gl)

  useLayoutEffect(() => {
    gl.localClippingEnabled = true
  }, [gl])

  return null
}

export function buildClippingPlanes(
  axis: SectionAxis,
  offset: number,
): THREE.Plane[] {
  switch (axis) {
    case 'x':
      return [new THREE.Plane(new THREE.Vector3(1, 0, 0), -offset)]
    case 'y':
      return [new THREE.Plane(new THREE.Vector3(0, 1, 0), -offset)]
    case 'z':
      return [new THREE.Plane(new THREE.Vector3(0, 0, 1), -offset)]
  }
}

export function useClippingPlanes(
  enabled: boolean,
  axis: SectionAxis,
  offset: number,
): THREE.Plane[] | undefined {
  return useMemo(() => {
    if (!enabled) return undefined
    return buildClippingPlanes(axis, offset)
  }, [enabled, axis, offset])
}
