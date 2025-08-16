import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', () => {
  const baseUrl: string = '/api/mongo-verba'

  return { baseUrl }
})
