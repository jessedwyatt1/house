import { useSyncExternalStore } from 'react'
import { getCompassHeading, subscribeCompass } from '../viewer/compassStore.ts'

export function useCompassHeading() {
  return useSyncExternalStore(subscribeCompass, getCompassHeading)
}
