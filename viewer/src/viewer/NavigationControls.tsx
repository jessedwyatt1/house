import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TOUCH } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { computeCameraFrame, boundsKey, type Bounds } from '../../model/bounds.ts'
import { useTwoFingerPan } from './useTwoFingerPan.ts'

type NavigationControlsProps = {
  bounds: Bounds
}

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return coarse
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
    if (!controls || !coarsePointer) return

    controls.screenSpacePanning = true
    controls.panSpeed = 1.4
    controls.touches = {
      ONE: TOUCH.ROTATE,
      TWO: TOUCH.DOLLY_PAN,
    }
  }, [coarsePointer])

  useTwoFingerPan(controlsRef, coarsePointer)

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
