import * as demoModuleA from '../fixtures/demo-module-a.ts'
import * as demoModuleB from '../fixtures/demo-module-b.ts'
import * as envelopeSpec from '../../02-envelope/spec.ts'
import * as siteSpec from '../../01-site/spec.ts'
import * as passiveSolarSpec from '../../03-passive-solar/spec.ts'
import * as waterTanksSpec from '../../04-water-tanks/spec.ts'
import * as floorPlanSpec from '../../05-floor-plan/spec.ts'
import * as structureSpec from '../../06-structure/spec.ts'
import * as mechanicalSpec from '../../07-mechanical/spec.ts'
import type { Entity } from './schema.ts'

/** A spec module exports entities for composition. House folders use the same shape later. */
export type SpecModule = {
  id: string
  getEntities: () => Entity[]
}

/**
 * Registered spec modules. Add house discipline specs here during the house design track.
 *
 * Example (after Phase 2):
 *   '06-structure': { id: '06-structure', getEntities: () => structureSpec.entities },
 */
export const SPEC_REGISTRY: Record<string, SpecModule> = {
  [demoModuleA.MODULE_ID]: {
    id: demoModuleA.MODULE_ID,
    getEntities: demoModuleA.getSpecEntities,
  },
  [demoModuleB.MODULE_ID]: {
    id: demoModuleB.MODULE_ID,
    getEntities: demoModuleB.getSpecEntities,
  },
  [envelopeSpec.MODULE_ID]: {
    id: envelopeSpec.MODULE_ID,
    getEntities: envelopeSpec.getSpecEntities,
  },
  [siteSpec.MODULE_ID]: {
    id: siteSpec.MODULE_ID,
    getEntities: siteSpec.getSpecEntities,
  },
  [passiveSolarSpec.MODULE_ID]: {
    id: passiveSolarSpec.MODULE_ID,
    getEntities: passiveSolarSpec.getSpecEntities,
  },
  [waterTanksSpec.MODULE_ID]: {
    id: waterTanksSpec.MODULE_ID,
    getEntities: waterTanksSpec.getSpecEntities,
  },
  [floorPlanSpec.MODULE_ID]: {
    id: floorPlanSpec.MODULE_ID,
    getEntities: floorPlanSpec.getSpecEntities,
  },
  [structureSpec.MODULE_ID]: {
    id: structureSpec.MODULE_ID,
    getEntities: structureSpec.getSpecEntities,
  },
  [mechanicalSpec.MODULE_ID]: {
    id: mechanicalSpec.MODULE_ID,
    getEntities: mechanicalSpec.getSpecEntities,
  },
}

export function resolveModules(moduleIds: string[]): SpecModule[] {
  const modules: SpecModule[] = []

  for (const id of moduleIds) {
    const mod = SPEC_REGISTRY[id]
    if (!mod) {
      throw new Error(`unknown spec module "${id}" — register it in model/registry.ts`)
    }
    modules.push(mod)
  }

  return modules
}
