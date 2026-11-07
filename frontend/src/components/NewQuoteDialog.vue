<script setup lang="ts">
  import type { Quote } from '@/models/Quote'
  import { useConfigStore } from '@/stores/configStore'
  import axios from 'axios'
  import { Button, useToast } from 'primevue'
  import { computed, ref, watch, type Ref } from 'vue'

  const isVisible: Ref<boolean | undefined> = defineModel('isVisible')

  const apiStore = useConfigStore()
  const toast = useToast()

  const apiBaseUrl = apiStore.apiBaseUrl
  const newQuote: Ref<Quote> = ref({
    quote: '',
    author: '',
    note: '',
  })

  const isSaving = ref(false)
  const canSave = computed(() => newQuote.value.quote.trim() !== '' && !isSaving.value)

  const createQuote = async () => {
    if (!canSave.value) {
      return
    }

    isSaving.value = true
    try {
      await axios.post(`${apiBaseUrl}/quotes`, newQuote.value)
      toast.add({
        severity: 'success',
        summary: 'Quote saved',
        detail: 'Quote saved successfully',
        life: 5000,
      })
      isVisible.value = false
    } catch (error: unknown) {
      const detail = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? 'Could not reach the server. Please try again.')
        : 'Unexpected error. Please try again.'

      toast.add({
        severity: 'error',
        summary: 'Error saving quote.',
        detail,
        life: 5000,
      })
    } finally {
      isSaving.value = false
    }
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
        <Button
          label="Save quote"
          severity="contrast"
          :disabled="!canSave"
          :loading="isSaving"
          @click="createQuote"
        />
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
