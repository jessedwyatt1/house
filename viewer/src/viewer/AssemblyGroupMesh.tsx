import type * as THREE from 'three'
import type { Entity } from '../../model/schema.ts'
import { boxCenter } from './entityMaterial.ts'
import { EntityMesh } from './EntityMesh.tsx'
import type { SelectionProps } from './selection.ts'

type AssemblyGroupMeshProps = SelectionProps & {
  members: Entity[]
  xrayEnabled: boolean
  clippingPlanes?: THREE.Plane[]
}

function readPivot(members: Entity[]): [number, number, number] {
  for (const member of members) {
    const pivot = member.meta?.assemblyPivot
    if (
      Array.isArray(pivot) &&
      pivot.length === 3 &&
      pivot.every((value) => typeof value === 'number')
    ) {
      return pivot as [number, number, number]
    }
  }

  let sumX = 0
  let sumY = 0
  let sumZ = 0
  let count = 0

  for (const member of members) {
    if (!member.size) continue
    const [cx, cy, cz] = boxCenter(member.position, member.size)
    sumX += cx
    sumY += cy
    sumZ += cz
    count += 1
  }

  if (count === 0) return [0, 0, 0]
  return [sumX / count, sumY / count, sumZ / count]
}

function readYawDeg(members: Entity[]): number {
  for (const member of members) {
    const yaw = member.meta?.assemblyYaw
    if (typeof yaw === 'number') return yaw
  }

  const rotation = members[0]?.rotation
  return rotation?.[1] ?? 0
}

function toLocalEntity(
  entity: Entity,
  pivot: [number, number, number],
): Entity {
  if (!entity.size) return entity

  const [px, py, pz] = pivot
  const [cx, cy, cz] = boxCenter(entity.position, entity.size)
  const [sx, sy, sz] = entity.size

  const { rotation: _rotation, ...rest } = entity
  return {
    ...rest,
    position: [cx - px - sx / 2, cy - py - sy / 2, cz - pz - sz / 2],
  }
}

export function AssemblyGroupMesh({
  members,
  xrayEnabled,
  clippingPlanes,
  selectedId,
  onSelect,
}: AssemblyGroupMeshProps) {
  if (members.length === 0) return null

  const pivot = readPivot(members)
  const yawRad = (readYawDeg(members) * Math.PI) / 180

  return (
    <group position={pivot}>
      <group rotation={[0, yawRad, 0]}>
        {members.map((member) => (
          <EntityMesh
            key={member.id}
            entity={toLocalEntity(member, pivot)}
            xrayEnabled={xrayEnabled}
            clippingPlanes={clippingPlanes}
            selected={selectedId === member.id}
            onSelect={onSelect}
          />
        ))}
      </group>
    </group>
  )
}
