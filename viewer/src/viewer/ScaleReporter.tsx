import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { PerspectiveCamera } from 'three'
import * as THREE from 'three'
import { feetPerPixelAtDistance, niceScaleLength } from './measurements.ts'
import { setScaleBarState } from './scaleBarStore.ts'

type ScaleReporterProps = {
  target: [number, number, number]
}

/** Samples camera distance each frame and reports a map-style scale bar size. */
export function ScaleReporter({ target }: ScaleReporterProps) {
  const { camera, size } = useThree()
  const targetVec = useRef(new THREE.Vector3(...target))
  const last = useRef({ lengthFt: -1, barPx: 0 })

  useFrame(() => {
    targetVec.current.set(...target)
    const distance = camera.position.distanceTo(targetVec.current)
    const fov = camera instanceof PerspectiveCamera ? camera.fov : 50
    const feetPerPixel = feetPerPixelAtDistance(
      distance,
      fov,
      size.height,
    )
    const scale = niceScaleLength(feetPerPixel)

    if (
      scale.lengthFt !== last.current.lengthFt ||
      Math.abs(scale.barPx - last.current.barPx) > 1
    ) {
      last.current = scale
      setScaleBarState(scale)
    }
  })

  return null
}
