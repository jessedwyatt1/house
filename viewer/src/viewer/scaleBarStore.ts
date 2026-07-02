import { niceScaleLength, type ScaleBarState } from './measurements.ts'

let scale: ScaleBarState = niceScaleLength(1)
const listeners = new Set<() => void>()

export function getScaleBarState(): ScaleBarState {
  return scale
}

export function setScaleBarState(next: ScaleBarState): void {
  if (
    next.lengthFt === scale.lengthFt &&
    Math.abs(next.barPx - scale.barPx) < 0.5
  ) {
    return
  }
  scale = next
  for (const listener of listeners) {
    listener()
  }
}

export function subscribeScaleBar(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
