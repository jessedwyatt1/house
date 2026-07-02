import { useMemo } from 'react'
import * as THREE from 'three'
import type { Entity } from '../../../model/schema.ts'
import {
  parseWallHeelHeights,
  parseWallSegmentMeta,
} from '../../../model/schema.ts'
import {
  boxCenter,
  resolveEntityMaterial,
  rotationRadians,
  wallSegmentSize,
} from '../entityMaterial.ts'
import { meshPointerHandlers, selectionEmissive, type SelectionProps } from '../selection.ts'
import {
  buildStandingSeamGeometry,
  parseStandingSeamMeta,
} from './standingSeamGeometry.ts'

type WallSegmentMeshProps = SelectionProps & {
  entity: Entity
  xrayEnabled: boolean
  clippingPlanes?: THREE.Plane[]
}

function buildSlopedWallGeometry(entity: Entity): THREE.BufferGeometry | null {
  const size = entity.size
  if (!size) return null

  const heels = parseWallHeelHeights(entity.meta)
  if (!heels) return null

  const { orientation = 'x', bandHeight } = parseWallSegmentMeta(entity.meta)
  const [runLength, , thickness] = size
  const [px, py, pz] = entity.position
  const { heelLow, heelHigh } = heels

  const bottomLow = py + heelLow
  const bottomHigh = py + heelHigh
  const topLow = bandHeight ? bottomLow + bandHeight : bottomLow
  const topHigh = bandHeight ? bottomHigh + bandHeight : bottomHigh

  let vertices: number[]

  if (orientation === 'z') {
    const x0 = px
    const x1 = px + thickness
    const z0 = pz
    const z1 = pz + runLength

    if (bandHeight) {
      vertices = [
        x0, bottomLow, z0,
        x1, bottomLow, z0,
        x1, bottomHigh, z1,
        x0, bottomHigh, z1,
        x0, topLow, z0,
        x1, topLow, z0,
        x1, topHigh, z1,
        x0, topHigh, z1,
      ]
    } else {
      vertices = [
        x0, py, z0,
        x1, py, z0,
        x1, py, z1,
        x0, py, z1,
        x0, topLow, z0,
        x1, topLow, z0,
        x1, topHigh, z1,
        x0, topHigh, z1,
      ]
    }
  } else {
    const x0 = px
    const x1 = px + runLength
    const z0 = pz
    const z1 = pz + thickness

    if (bandHeight) {
      vertices = [
        x0, bottomLow, z0,
        x1, bottomHigh, z0,
        x1, bottomHigh, z1,
        x0, bottomLow, z1,
        x0, topLow, z0,
        x1, topHigh, z0,
        x1, topHigh, z1,
        x0, topLow, z1,
      ]
    } else {
      vertices = [
        x0, py, z0,
        x1, py, z0,
        x1, py, z1,
        x0, py, z1,
        x0, topLow, z0,
        x1, topHigh, z0,
        x1, topHigh, z1,
        x0, topLow, z1,
      ]
    }
  }

  const indices = [
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    0, 1, 5, 0, 5, 4,
    3, 7, 6, 3, 6, 2,
    0, 4, 7, 0, 7, 3,
    1, 2, 6, 1, 6, 5,
  ]

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

export function WallSegmentMesh({
  entity,
  xrayEnabled,
  clippingPlanes,
  selected,
  onSelect,
}: WallSegmentMeshProps) {
  const standingSeam = parseStandingSeamMeta(entity.meta)
  const slopedGeometry = useMemo(() => {
    const seam = parseStandingSeamMeta(entity.meta)
    if (seam) return buildStandingSeamGeometry(entity, seam)
    return buildSlopedWallGeometry(entity)
  }, [entity])

  const size = entity.size
  if (!size) return null

  const { orientation = 'x' } = parseWallSegmentMeta(entity.meta)
  const isWoodStructure =
    entity.layer === 'structure' || entity.layer === 'roof'
  const metaColor = entity.meta?.color
  const color =
    typeof metaColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(metaColor)
      ? metaColor
      : isWoodStructure
        ? '#a8957a'
        : '#c9b896'

  const materialProps = {
    ...resolveEntityMaterial(
      entity,
      {
        color,
        ...(standingSeam ? { metalness: 0.75, roughness: 0.35 } : {}),
      },
      xrayEnabled,
      clippingPlanes,
    ),
    ...selectionEmissive(selected),
  }

  if (slopedGeometry) {
    return (
      <mesh
        name={entity.id}
        userData={{ entity }}
        geometry={slopedGeometry}
        {...meshPointerHandlers(entity, onSelect)}
      >
        <meshStandardMaterial {...materialProps} />
      </mesh>
    )
  }

  const boxSize = wallSegmentSize(size, orientation)
  const center = boxCenter(entity.position, boxSize)
  const rotation = rotationRadians(entity.rotation)

  return (
    <mesh
      name={entity.id}
      userData={{ entity }}
      position={center}
      rotation={rotation}
      {...meshPointerHandlers(entity, onSelect)}
    >
      <boxGeometry args={boxSize} />
      <meshStandardMaterial {...materialProps} />
    </mesh>
  )
}
