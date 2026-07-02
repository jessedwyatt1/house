import type { Entity } from '../model/schema.ts'
import { demoShellEntities } from './demo-shell.ts'
import { demoZoneEntities } from './demo-zones.ts'

export const MODULE_ID = 'demo-module-b'

/** Shell + zones — software sprint fixture module B. */
export function getSpecEntities(): Entity[] {
  return [...demoShellEntities, ...demoZoneEntities]
}
