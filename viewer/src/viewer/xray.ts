import type { LayerId } from '../../model/schema.ts'

/** Layers faded when x-ray mode is on. */
export const XRAY_LAYERS: ReadonlySet<LayerId> = new Set([
  'envelope',
  'glazing',
])

export const XRAY_OPACITY = 0.12

export function isXrayLayer(
  layer: LayerId,
  xrayEnabled: boolean,
): boolean {
  return xrayEnabled && XRAY_LAYERS.has(layer)
}
