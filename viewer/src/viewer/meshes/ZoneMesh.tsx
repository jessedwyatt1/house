import { Html } from '@react-three/drei'
import type * as THREE from 'three'
import type { Entity } from '../../../model/schema.ts'
import { parseZoneMeta } from '../../../model/schema.ts'
import { boxCenter } from '../entityMaterial.ts'
import { meshPointerHandlers, selectionEmissive, type SelectionProps } from '../selection.ts'

type ZoneMeshProps = SelectionProps & {
  entity: Entity
  clippingPlanes?: THREE.Plane[]
}

export function ZoneMesh({
  entity,
  clippingPlanes,
  selected,
  onSelect,
}: ZoneMeshProps) {
  const size = entity.size
  if (!size) return null

  const center = boxCenter(entity.position, size)
  const { color, opacity = 0.22 } = parseZoneMeta(entity.meta)
  const label = entity.label ?? entity.id
  const emissive = selectionEmissive(selected)

  return (
    <group
      name={entity.id}
      userData={{ entity }}
      position={center}
      {...meshPointerHandlers(entity, onSelect)}
    >
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={opacity}
          depthWrite={false}
          clippingPlanes={clippingPlanes}
          clipShadows={clippingPlanes !== undefined}
          emissive={emissive.emissive}
          emissiveIntensity={emissive.emissiveIntensity}
        />
      </mesh>
      <Html
        center
        distanceFactor={18}
        zIndexRange={[100, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div className="zone-label">{label}</div>
      </Html>
    </group>
  )
}
