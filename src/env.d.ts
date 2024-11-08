/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAPIDAPI_KEY: string
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 