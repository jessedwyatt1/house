import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import {
  getCameraPreset,
  type CameraPreset,
} from '../../model/cameraPresets.ts'
import type { Bounds } from '../../model/bounds.ts'

type CameraPresetControllerProps = {
  preset: CameraPreset | null
  bounds: Bounds
  onApplied: () => void
}

export function CameraPresetController({
  preset,
  bounds,
  onApplied,
}: CameraPresetControllerProps) {
  const camera = useThree((state) => state.camera)
  const controls = useThree(
    (state) => state.controls,
  ) as OrbitControlsImpl | undefined

  useEffect(() => {
    if (!preset) return

    const frame = getCameraPreset(preset, bounds)
    camera.up.set(0, 1, 0)
    camera.position.set(...frame.position)

    if (controls) {
      controls.target.set(...frame.target)
      controls.minDistance = frame.minDistance
      controls.maxDistance = frame.maxDistance
      controls.update()
    } else {
      camera.lookAt(...frame.target)
    }

    camera.updateProjectionMatrix()
    onApplied()
  }, [preset, bounds, camera, controls, onApplied])

  return null
}
