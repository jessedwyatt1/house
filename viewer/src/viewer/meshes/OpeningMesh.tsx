import type * as THREE from 'three'
import type { Entity } from '../../../model/schema.ts'
import {
  boxCenter,
  resolveEntityMaterial,
  rotationRadians,
} from '../entityMaterial.ts'
import { meshPointerHandlers, selectionEmissive, type SelectionProps } from '../selection.ts'

type OpeningMeshProps = SelectionProps & {
  entity: Entity
  xrayEnabled: boolean
  clippingPlanes?: THREE.Plane[]
}

export function OpeningMesh({
  entity,
  xrayEnabled,
  clippingPlanes,
  selected,
  onSelect,
}: OpeningMeshProps) {
  const size = entity.size
  if (!size) return null

  const center = boxCenter(entity.position, size)
  const rotation = rotationRadians(entity.rotation)

  const metaColor =
    typeof entity.meta?.color === 'string' ? entity.meta.color : undefined
  const metaOpacity =
    typeof entity.meta?.opacity === 'number' ? entity.meta.opacity : undefined

  const materialProps = {
    ...resolveEntityMaterial(
      entity,
      {
        color: metaColor ?? '#0d0d0d',
        transparent: true,
        opacity: metaOpacity ?? 0.55,
      },
      xrayEnabled,
      clippingPlanes,
    ),
    ...selectionEmissive(selected),
  }

  return (
    <mesh
      name={entity.id}
      userData={{ entity }}
      position={center}
      rotation={rotation}
      {...meshPointerHandlers(entity, onSelect)}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial {...materialProps} depthWrite={false} />
    </mesh>
  )
}
