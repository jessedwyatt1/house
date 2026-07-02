import type { ReactNode } from 'react'
import type { Bounds } from '../../model/bounds.ts'

type ModelFrameProps = {
  bounds: Bounds
  children: ReactNode
}

/**
 * Mirror spec +X east into Three.js view space about the model center.
 * When the camera faces north, Three.js puts world +X on the left; site plans
 * expect east on the right, so geometry is reflected on the vertical midplane.
 */
export function ModelFrame({ bounds, children }: ModelFrameProps) {
  const [cx, , cz] = bounds.center

  return (
    <group position={[cx, 0, cz]}>
      <group scale={[-1, 1, 1]}>
        <group position={[-cx, 0, -cz]}>{children}</group>
      </group>
    </group>
  )
}
