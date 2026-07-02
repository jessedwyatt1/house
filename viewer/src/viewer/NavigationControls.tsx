import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { TOUCH } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { computeCameraFrame, boundsKey, type Bounds } from '../../model/bounds.ts'
import { useCoarsePointer } from '../ui/useCoarsePointer.ts'

type NavigationControlsProps = {
  bounds: Bounds
}

export function NavigationControls({ bounds }: NavigationControlsProps) {
  const gl = useThree((state) => state.gl)
  const coarsePointer = useCoarsePointer()
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const key = boundsKey(bounds)
  const { target, minDistance, maxDistance } = useMemo(
    () => computeCameraFrame(bounds),
    [key],
  )

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    if (coarsePointer) {
      // Touch: one-finger orbit, two-finger pinch zoom; pan via D-pad only.
      controls.enablePan = false
      controls.touches = {
        ONE: TOUCH.ROTATE,
        TWO: TOUCH.DOLLY_PAN,
      }
    } else {
      controls.enablePan = true
      controls.touches = {
        ONE: TOUCH.ROTATE,
        TWO: TOUCH.DOLLY_PAN,
      }
    }
  }, [coarsePointer])

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      domElement={gl.domElement}
      enableDamping
      dampingFactor={0.08}
      target={target}
      minDistance={minDistance}
      maxDistance={maxDistance}
      maxPolarAngle={Math.PI / 2 - 0.04}
      minPolarAngle={0.1}
      enablePan
      screenSpacePanning={false}
      panSpeed={0.8}
      rotateSpeed={0.6}
      zoomSpeed={0.9}
    />
  )
}
