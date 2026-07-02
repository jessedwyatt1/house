/// <reference types="vite/client" />

/** Browser compose profile (Vite). CLI uses COMPOSE_PROFILE in process.env. */
export function readComposeProfileFromEnv(): string | undefined {
  if (typeof process !== 'undefined' && process.env?.COMPOSE_PROFILE) {
    return process.env.COMPOSE_PROFILE
  }

  // Must reference import.meta.env.VITE_* directly — Vite only inlines static access.
  const profile = import.meta.env.VITE_COMPOSE_PROFILE
  if (typeof profile === 'string' && profile.length > 0) {
    return profile
  }

  return undefined
}
