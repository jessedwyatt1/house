import type { Entity } from '../model/schema.ts'
import { demoBasicEntities } from './demo-basic.ts'

export const MODULE_ID = 'demo-module-a'

/** Primitives: slab, boxes, glazing — software sprint fixture module A. */
export function getSpecEntities(): Entity[] {
  return demoBasicEntities
}
