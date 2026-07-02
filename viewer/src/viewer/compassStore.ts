let headingDeg = 0
const listeners = new Set<() => void>()

export function getCompassHeading(): number {
  return headingDeg
}

export function setCompassHeading(next: number): void {
  if (Math.abs(next - headingDeg) < 0.25) {
    return
  }
  headingDeg = next
  for (const listener of listeners) {
    listener()
  }
}

export function subscribeCompass(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
