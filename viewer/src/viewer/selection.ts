import type { ThreeEvent } from '@react-three/fiber'
import type { Entity } from '../../model/schema.ts'

export type SelectionProps = {
  selected: boolean
  onSelect: (entity: Entity) => void
}

export function meshPointerHandlers(
  entity: Entity,
  onSelect: (entity: Entity) => void,
) {
  return {
    onClick: (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation()
      onSelect(entity)
    },
    onPointerOver: (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation()
      document.body.style.cursor = 'pointer'
    },
    onPointerOut: () => {
      document.body.style.cursor = 'auto'
    },
  }
}

export function selectionEmissive(selected: boolean): {
  emissive: string
  emissiveIntensity: number
} {
  return selected
    ? { emissive: '#ffcc00', emissiveIntensity: 0.4 }
    : { emissive: '#000000', emissiveIntensity: 0 }
}

export function formatVec3(values: [number, number, number]): string {
  return values.map((v) => v.toFixed(1)).join(', ')
}
