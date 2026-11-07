import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useConfigStore } from '@/stores/configStore'

interface AuthResponse {
  authenticated: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const { apiBaseUrl } = useConfigStore()

  const isAuthenticated = ref(false)

  const checkSession = async () => {
    try {
      const response = await axios.get<AuthResponse>(`${apiBaseUrl}/auth/me`)
      isAuthenticated.value = response.data.authenticated
    } catch (error) {
      console.error('Error checking session:', error)
      isAuthenticated.value = false
    }
  }

  // Throws with a user-facing message when the login fails.
  const login = async (password: string) => {
    try {
      await axios.post<AuthResponse>(`${apiBaseUrl}/auth/login`, { password })
      isAuthenticated.value = true
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? 'No se pudo conectar con el servidor.')
        : 'Error inesperado.'

      throw new Error(message)
    }
  }

  const logout = async () => {
    await axios.post<AuthResponse>(`${apiBaseUrl}/auth/logout`)
    isAuthenticated.value = false
  }

  const markSessionExpired = () => {
    isAuthenticated.value = false
  }

  return { isAuthenticated, checkSession, login, logout, markSessionExpired }
})
