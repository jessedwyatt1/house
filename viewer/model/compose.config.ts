/**
 * Which spec modules to load for each compose profile.
 * Switch profiles via COMPOSE_PROFILE (validate) or VITE_COMPOSE_PROFILE (dev).
 */
export const COMPOSE_PROFILES = {
  /** All demo fixtures — default for software sprints. */
  'demo-full': ['demo-module-a', 'demo-module-b'],
  /** Primitives only (slab, boxes, glazing). */
  'demo-a': ['demo-module-a'],
  /** Shell + zones only. */
  'demo-b': ['demo-module-b'],
  /** House design — add module ids as 01–09 spec.ts files are created. */
  house: ['01-site', '02-envelope', '03-passive-solar', '04-water-tanks', '05-floor-plan', '06-structure', '07-mechanical'] as string[],
} as const

export type ComposeProfile = keyof typeof COMPOSE_PROFILES

export const DEFAULT_COMPOSE_PROFILE: ComposeProfile = 'demo-full'

/** Reject composed models larger than this (feet). Set to 0 to disable. */
export const MAX_MODEL_EXTENT_FT = 500
