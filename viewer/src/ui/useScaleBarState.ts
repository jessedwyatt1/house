import { useSyncExternalStore } from 'react'
import { getScaleBarState, subscribeScaleBar } from '../viewer/scaleBarStore.ts'

export function useScaleBarState() {
  return useSyncExternalStore(subscribeScaleBar, getScaleBarState)
}
