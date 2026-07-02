import { OrbitControls } from '@react-three/drei'
import { useMemo } from 'react'
import { computeCameraFrame, boundsKey, type Bounds } from '../../model/bounds.ts'

type NavigationControlsProps = {
  bounds: Bounds
}

export function NavigationControls({ bounds }: NavigationControlsProps) {
  const key = boundsKey(bounds)
  const { target, minDistance, maxDistance } = useMemo(
    () => computeCameraFrame(bounds),
    [key],
  )

  return (
    <OrbitControls
      makeDefault
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
