import { defineStore } from 'pinia'

export const useConfigStore = defineStore('api', () => {
  const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development'
  // Same origin in every environment: Traefik routes it in production and the
  // Vite dev server proxies it in development, so the session cookie just works.
  const apiBaseUrl = '/api/mongo-verba'

  return { isDevelopment, apiBaseUrl }
})
