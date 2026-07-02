import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { setCompassHeading } from './compassStore.ts'

/** Reports camera heading on the ground plane (+X east, +Z north). */
export function CompassReporter() {
  const { camera } = useThree()
  const direction = useRef(new THREE.Vector3())

  useFrame(() => {
    camera.getWorldDirection(direction.current)
    direction.current.y = 0

    if (direction.current.lengthSq() < 1e-6) {
      return
    }

    direction.current.normalize()
    // ModelFrame mirrors geometry on X so east reads right on screen; negate X here
    // so the compass dial matches the mirrored view without changing world coords.
    const headingRad = Math.atan2(-direction.current.x, direction.current.z)
    setCompassHeading((headingRad * 180) / Math.PI)
  })

  return null
}
