<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore'
  import { useToast } from 'primevue'
  import { computed, ref, watch, type Ref } from 'vue'

  const isVisible: Ref<boolean | undefined> = defineModel('isVisible')
  const emit = defineEmits<{ authenticated: [] }>()

  const authStore = useAuthStore()
  const toast = useToast()

  const password = ref('')
  const isLoggingIn = ref(false)
  const canLogin = computed(() => password.value !== '' && !isLoggingIn.value)

  const login = async () => {
    if (!canLogin.value) {
      return
    }

    isLoggingIn.value = true
    try {
      await authStore.login(password.value)
      isVisible.value = false
      emit('authenticated')
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'No se pudo iniciar sesión',
        detail: error instanceof Error ? error.message : undefined,
        life: 5000,
      })
    } finally {
      isLoggingIn.value = false
    }
  }

  const focusPassword = () => {
    document.getElementById('login-password')?.focus()
  }

  watch(isVisible, (newValue) => {
    if (newValue) {
      password.value = ''
    }
  })
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    header="Iniciar sesión"
    modal
    dismissableMask
    @show="focusPassword"
  >
    <form class="form-content" @submit.prevent="login">
      <div class="form-field">
        <label for="login-password" class="field-label">Contraseña</label>
        <Password
          v-model="password"
          inputId="login-password"
          class="password-field"
          :feedback="false"
          toggleMask
          fluid
          autocomplete="current-password"
        />
      </div>

      <div class="form-actions">
        <Button
          type="submit"
          label="Entrar"
          severity="contrast"
          :disabled="!canLogin"
          :loading="isLoggingIn"
        />
      </div>
    </form>
  </Dialog>
</template>

<style scoped>
  .form-content {
    padding: 1rem;
    min-width: min(22rem, 80vw);
  }

  .form-field {
    margin-bottom: 2rem;
  }

  .field-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
  }

  .form-actions {
    text-align: right;
    margin-top: 1rem;
  }

  .password-field :deep(input) {
    border: none;
    border-color: white;
    width: 100%;
    transition: border-color 0.2s;
  }

  .password-field :deep(input:hover),
  .password-field :deep(input:focus) {
    border-color: white;
    box-shadow: none;
    outline: none;
  }
</style>
