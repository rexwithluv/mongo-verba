import { defineStore } from 'pinia'

export const useConfigStore = defineStore('api', () => {
  const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development'
  const apiBaseUrl = isDevelopment ? 'http://localhost:3000' : "/api/mongo-verba"

  return { isDevelopment,  apiBaseUrl }
})
