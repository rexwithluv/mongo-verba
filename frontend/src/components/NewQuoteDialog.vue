<script setup lang="ts">
  import type { Quote } from '@/models/Quote'
  import { useApiStore } from '@/stores/apiStore'
  import axios from 'axios'
  import { Button, useToast } from 'primevue'
  import { ref, watch, type Ref } from 'vue'

  const isVisible: Ref<boolean | undefined> = defineModel('isVisible')

  const apiStore = useApiStore()
  const toast = useToast()

  const apiBaseUrl = apiStore.baseUrl
  const newQuote: Ref<Quote> = ref({
    quote: '',
    author: '',
    note: '',
  })

  const createQuote = async () => {
    try {
      await axios.post(`${apiBaseUrl}/quotes`, newQuote.value)
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

  watch(isVisible, (newValue) => {
    if (newValue) {
      newQuote.value = {
        quote: '',
        author: '',
        note: '',
      }
    }
  })
</script>

<template>
  <Toast />
  <Dialog v-model:visible="isVisible" header="New quote ^^" modal dismissableMask>
    <div class="form-content">
      <div class="form-field">
        <label for="quote-text" class="field-label">Quote</label>
        <Textarea
          id="quote-text"
          v-model="newQuote.quote"
          class="p-inputtext-line"
          autoResize
          required
        />
      </div>

      <div class="form-field">
        <label for="quote-author" class="field-label">Author (optional)</label>
        <InputText id="quote-author" v-model="newQuote.author" class="p-inputtext-line" />
      </div>

      <div class="form-field">
        <label for="quote-note" class="field-label">Note (optional)</label>
        <Textarea id="quote-note" v-model="newQuote.note" class="p-inputtext-line" autoResize />
      </div>

      <div class="form-actions">
        <Button label="Save quote" severity="contrast" @click="createQuote" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
  .form-content {
    padding: 1rem;
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

  .p-inputtext-line {
    border: none;
    border-color: white;

    width: 100%;
    transition: border-color 0.2s;
  }

  .p-inputtext-line:hover,
  .p-inputtext-line:focus {
    border-color: white;
    box-shadow: none;
    outline: none;
  }
</style>
