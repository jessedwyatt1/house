import { useMemo } from 'react'
import * as THREE from 'three'
import type { Entity } from '../../../model/schema.ts'
import { parseRoofMeta } from '../../../model/schema.ts'
import { resolveEntityMaterial } from '../entityMaterial.ts'
import { meshPointerHandlers, selectionEmissive, type SelectionProps } from '../selection.ts'

type RoofMeshProps = SelectionProps & {
  entity: Entity
  xrayEnabled: boolean
  clippingPlanes?: THREE.Plane[]
}

function buildRoofGeometry(entity: Entity): THREE.BufferGeometry | null {
  const size = entity.size
  if (!size) return null

  const [px, py, pz] = entity.position
  const [width, panelThickness, depth] = size
  const { heelLow, heelHigh, overhang = 0 } = parseRoofMeta(entity.meta)

  const x0 = px - overhang
  const x1 = px + width + overhang
  const z0 = pz - overhang
  const z1 = pz + depth + overhang
  const ySouth = py + heelLow
  const yNorth = py + heelHigh
  // Parallel to the sloped top (constant vertical thickness), not a level soffit.
  const yBottomSouth = ySouth - panelThickness
  const yBottomNorth = yNorth - panelThickness

  const vertices = new Float32Array([
    x0, yBottomSouth, z0,
    x1, yBottomSouth, z0,
    x1, yBottomNorth, z1,
    x0, yBottomNorth, z1,
    x0, ySouth, z0,
    x1, ySouth, z0,
    x1, yNorth, z1,
    x0, yNorth, z1,
  ])

  const indices = [
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    0, 1, 5, 0, 5, 4,
    3, 7, 6, 3, 6, 2,
    0, 4, 7, 0, 7, 3,
    1, 2, 6, 1, 6, 5,
  ]

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

export function RoofMesh({
  entity,
  xrayEnabled,
  clippingPlanes,
  selected,
  onSelect,
}: RoofMeshProps) {
  const geometry = useMemo(() => buildRoofGeometry(entity), [entity])

  if (!geometry) return null

  const materialProps = {
    ...resolveEntityMaterial(
      entity,
      { color: '#8b4513' },
      xrayEnabled,
      clippingPlanes,
    ),
    ...selectionEmissive(selected),
  }

  return (
    <mesh
      name={entity.id}
      userData={{ entity }}
      geometry={geometry}
      {...meshPointerHandlers(entity, onSelect)}
    >
      <meshStandardMaterial {...materialProps} />
    </mesh>
  )
}
