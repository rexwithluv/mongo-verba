<script setup lang="ts">
  import type { Quote } from '@/models/Quote'
  import axios from 'axios'
  import { useToast } from 'primevue'
  import { ref, type Ref } from 'vue'

  const isVisible: Ref<boolean | undefined> = defineModel('isVisible')

  const toast = useToast()

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  const newQuote: Ref<Quote> = ref({
    quote: '',
    author: '',
  })

  const createQuote = async () => {
    try {
      await axios.post(
        `${apiBaseUrl}/quotes`,
        newQuote.value,
      )
      toast.add({
        severity: 'success',
        summary: 'Quote saved',
        detail: 'Quote saved successfully',
        life: 5000,
      })
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error saving quote.',
        detail: error.response.data.message,
        life: 5000,
      })
    }

    isVisible.value = false
  }
</script>

<template>
  <Toast />
  <Dialog v-model:visible="isVisible" header="New quote ^^" modal dismissableMask>
    <div class="form-content">
      <div class="form-field">
        <label for="quote-text">Quote:</label>
        <textarea id="quote-text" v-model="newQuote.quote" rows="3" required></textarea>
      </div>

      <div class="form-field">
        <label for="quote-author">Author:</label>
        <input type="text" id="quote-author" v-model="newQuote.author" required />
      </div>

      <div class="form-field">
        <label for="quote-note">Note (opcional):</label>
        <textarea id="quote-note" v-model="newQuote.note" rows="2"></textarea>
      </div>

      <div class="form-actions">
        <button @click="createQuote">Guardar Frase</button>
      </div>
    </div>
  </Dialog>
</template>
