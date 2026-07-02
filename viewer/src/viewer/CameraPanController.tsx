import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { getPanInput } from './cameraPanStore.ts'

const UP = new Vector3(0, 1, 0)

/** Applies D-pad pan input each frame (touch devices). */
export function CameraPanController() {
  const camera = useThree((state) => state.camera)
  const controls = useThree(
    (state) => state.controls as OrbitControlsImpl | undefined,
  )
  const look = useRef(new Vector3())
  const right = useRef(new Vector3())
  const move = useRef(new Vector3())

  useFrame((_, delta) => {
    const { forward, strafe } = getPanInput()
    if (forward === 0 && strafe === 0) return
    if (!controls) return

    camera.getWorldDirection(look.current)
    look.current.y = 0
    if (look.current.lengthSq() < 1e-6) return
    look.current.normalize()

    right.current.crossVectors(look.current, UP).normalize()

    const distance = camera.position.distanceTo(controls.target)
    const speed = distance * 1.0 * delta

    move.current
      .copy(look.current)
      .multiplyScalar(forward * speed)
      .addScaledVector(right.current, strafe * speed)

    controls.target.add(move.current)
    camera.position.add(move.current)
    controls.update()
  })

  return null
}
