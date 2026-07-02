import {
  COMPOSE_PROFILES,
  DEFAULT_COMPOSE_PROFILE,
  type ComposeProfile,
} from './compose.config.ts'

import { composeFromModules, type ComposeResult } from './composeMerge.ts'
import { readComposeProfileFromEnv } from './env.ts'
import { resolveModules } from './registry.ts'
import type { HouseModel } from './schema.ts'

export function getActiveComposeProfile(): ComposeProfile {
  const raw = readComposeProfileFromEnv()
  if (raw && raw in COMPOSE_PROFILES) {
    return raw as ComposeProfile
  }
  if (raw) {
    console.warn(
      `Unknown compose profile "${raw}" — using "${DEFAULT_COMPOSE_PROFILE}". ` +
        `Valid: ${Object.keys(COMPOSE_PROFILES).join(', ')}`,
    )
  }
  return DEFAULT_COMPOSE_PROFILE
}

export function getModuleIdsForProfile(
  profile: ComposeProfile = getActiveComposeProfile(),
): string[] {
  return [...COMPOSE_PROFILES[profile]]
}

/** Compose and validate merge rules. Does not run Zod — use getHouseModel for full validation. */
export function composeHouseModel(
  moduleIds: string[] = getModuleIdsForProfile(),
): ComposeResult {
  const modules = resolveModules(moduleIds)
  return composeFromModules(modules)
}

/** Composed HouseModel from the active profile. Used by viewer and validate script. */
export function getHouseModel(): HouseModel {
  const { entities, moduleIds } = composeHouseModel()
  return {
    entities,
    meta: {
      composeProfile: getActiveComposeProfile(),
      modules: moduleIds,
    },
  }
}
