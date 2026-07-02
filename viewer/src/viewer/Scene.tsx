import { getHouseModel } from '../../model/compose.ts'
import type { SectionAxis } from '../../model/cameraPresets.ts'
import type { Entity, LayerId } from '../../model/schema.ts'
import { AssemblyGroupMesh } from './AssemblyGroupMesh.tsx'
import { EntityMesh } from './EntityMesh.tsx'
import { useClippingPlanes } from './clipping.ts'

type SceneProps = {
  visibleLayers: ReadonlySet<LayerId>
  xrayEnabled: boolean
  sectionEnabled: boolean
  sectionAxis: SectionAxis
  sectionOffset: number
  selectedId: string | null
  onSelect: (entity: Entity) => void
}

export function Scene({
  visibleLayers,
  xrayEnabled,
  sectionEnabled,
  sectionAxis,
  sectionOffset,
  selectedId,
  onSelect,
}: SceneProps) {
  const model = getHouseModel()
  const clippingPlanes = useClippingPlanes(
    sectionEnabled,
    sectionAxis,
    sectionOffset,
  )

  const visibleEntities = model.entities.filter((entity) =>
    visibleLayers.has(entity.layer),
  )
  const assemblies = new Map<string, Entity[]>()
  const standalone: Entity[] = []

  for (const entity of visibleEntities) {
    if (entity.assemblyId) {
      const members = assemblies.get(entity.assemblyId) ?? []
      members.push(entity)
      assemblies.set(entity.assemblyId, members)
    } else {
      standalone.push(entity)
    }
  }

  return (
    <>
      {standalone.map((entity) => (
        <EntityMesh
          key={entity.id}
          entity={entity}
          xrayEnabled={xrayEnabled}
          clippingPlanes={clippingPlanes}
          selected={selectedId === entity.id}
          onSelect={onSelect}
        />
      ))}
      {[...assemblies.entries()].map(([assemblyId, members]) => (
        <AssemblyGroupMesh
          key={assemblyId}
          members={members}
          xrayEnabled={xrayEnabled}
          clippingPlanes={clippingPlanes}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}
