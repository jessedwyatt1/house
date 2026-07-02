import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type * as THREE_NS from 'three'
import type { Entity } from '../../../model/schema.ts'
import {
  boxCenter,
  resolveEntityMaterial,
  rotationRadians,
} from '../entityMaterial.ts'
import { meshPointerHandlers, selectionEmissive, type SelectionProps } from '../selection.ts'

const KIND_MATERIAL = {
  slab: { color: '#6b6b6b' },
  box: { color: '#a8957a' },
  'glazing-wall': { color: '#6eb5ff', transparent: true, opacity: 0.45 },
} as const

type BoxKindMeshProps = SelectionProps & {
  entity: Entity & { kind: 'slab' | 'box' | 'glazing-wall' }
  xrayEnabled: boolean
  clippingPlanes?: THREE_NS.Plane[]
}

type DualFaceBoxProps = BoxKindMeshProps & {
  center: [number, number, number]
  rotation: [number, number, number] | undefined
  size: [number, number, number]
  materialProps: ReturnType<typeof resolveEntityMaterial> & ReturnType<typeof selectionEmissive>
}

function DualFaceBoxMesh({
  entity,
  center,
  rotation,
  size,
  materialProps,
  interiorColor,
  onSelect,
}: DualFaceBoxProps & { interiorColor: string }) {
  const exterior = materialProps
  const interior = { ...materialProps, color: interiorColor }
  // BoxGeometry face order: +X, -X, +Y, -Y, +Z (room/interior), -Z (exterior)
  const faceMaterials = [exterior, exterior, exterior, exterior, interior, exterior]

  return (
    <mesh
      name={entity.id}
      userData={{ entity }}
      position={center}
      rotation={rotation}
      {...meshPointerHandlers(entity, onSelect)}
    >
      <boxGeometry args={size} />
      {faceMaterials.map((props, index) => (
        <meshStandardMaterial key={index} attach={`material-${index}`} {...props} />
      ))}
    </mesh>
  )
}

function TexturedInteriorBoxMesh({
  entity,
  center,
  rotation,
  size,
  materialProps,
  textureUrl,
  onSelect,
}: DualFaceBoxProps & { textureUrl: string }) {
  const texture = useTexture(textureUrl, (loaded) => {
    loaded.colorSpace = THREE.SRGBColorSpace
  })
  const exterior = materialProps
  const interior = { ...materialProps, map: texture, color: '#ffffff' }
  const faceMaterials = [exterior, exterior, exterior, exterior, interior, exterior]

  return (
    <mesh
      name={entity.id}
      userData={{ entity }}
      position={center}
      rotation={rotation}
      {...meshPointerHandlers(entity, onSelect)}
    >
      <boxGeometry args={size} />
      {faceMaterials.map((props, index) => (
        <meshStandardMaterial key={index} attach={`material-${index}`} {...props} />
      ))}
    </mesh>
  )
}

export function BoxKindMesh({
  entity,
  xrayEnabled,
  clippingPlanes,
  selected,
  onSelect,
}: BoxKindMeshProps) {
  const size = entity.size
  if (!size) return null

  const center = boxCenter(entity.position, size)
  const rotation = rotationRadians(entity.rotation)
  const metaColor =
    typeof entity.meta?.color === 'string' ? entity.meta.color : undefined
  const base =
    entity.layer === 'site'
      ? { color: '#5a7a4a' }
      : metaColor
        ? { color: metaColor }
        : KIND_MATERIAL[entity.kind]

  const metaInterior =
    typeof entity.meta?.colorInterior === 'string' ? entity.meta.colorInterior : undefined
  const textureInterior =
    typeof entity.meta?.textureInterior === 'string' ? entity.meta.textureInterior : undefined

  const materialProps = {
    ...resolveEntityMaterial(entity, base, xrayEnabled, clippingPlanes),
    ...selectionEmissive(selected),
  }

  const shared = { entity, center, rotation, size, materialProps, selected, onSelect, xrayEnabled, clippingPlanes }

  if (textureInterior) {
    return <TexturedInteriorBoxMesh {...shared} textureUrl={textureInterior} />
  }

  if (metaInterior) {
    return <DualFaceBoxMesh {...shared} interiorColor={metaInterior} />
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
      <meshStandardMaterial {...materialProps} />
    </mesh>
  )
}
