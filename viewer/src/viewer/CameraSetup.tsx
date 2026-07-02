import { useThree } from '@react-three/fiber'
import { useLayoutEffect } from 'react'
import { computeCameraFrame, boundsKey, type Bounds } from '../../model/bounds.ts'

type CameraSetupProps = {
  bounds: Bounds
}

/** Set initial camera position from model bounds when the model changes. */
export function CameraSetup({ bounds }: CameraSetupProps) {
  const { camera } = useThree()
  const key = boundsKey(bounds)

  useLayoutEffect(() => {
    // +Y is up in spec data — match Three.js / OrbitControls defaults.
    camera.up.set(0, 1, 0)
    const { position, target } = computeCameraFrame(bounds)
    camera.position.set(...position)
    camera.lookAt(...target)
    camera.updateProjectionMatrix()
  }, [camera, key])

  return null
}
