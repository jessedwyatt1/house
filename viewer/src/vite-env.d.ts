/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COMPOSE_PROFILE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
