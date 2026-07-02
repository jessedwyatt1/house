import type * as THREE from 'three'
import type { Entity } from '../../model/schema.ts'
import { BoxKindMesh } from './meshes/BoxKindMesh.tsx'
import { OpeningMesh } from './meshes/OpeningMesh.tsx'
import { RoofMesh } from './meshes/RoofMesh.tsx'
import { WallSegmentMesh } from './meshes/WallSegmentMesh.tsx'
import { ZoneMesh } from './meshes/ZoneMesh.tsx'
import type { SelectionProps } from './selection.ts'

type EntityMeshProps = SelectionProps & {
  entity: Entity
  xrayEnabled: boolean
  clippingPlanes?: THREE.Plane[]
}

export function EntityMesh(props: EntityMeshProps) {
  const { entity } = props

  switch (entity.kind) {
    case 'roof':
      return <RoofMesh {...props} />
    case 'wall-segment':
      return <WallSegmentMesh {...props} />
    case 'opening':
      return <OpeningMesh {...props} />
    case 'zone':
      return <ZoneMesh {...props} />
    case 'slab':
    case 'box':
    case 'glazing-wall':
      return (
        <BoxKindMesh
          {...props}
          entity={entity as Entity & { kind: 'slab' | 'box' | 'glazing-wall' }}
        />
      )
    default:
      return null
  }
}
