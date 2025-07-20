<script setup lang="ts">
  import NewQuoteDialog from '@/components/NewQuoteDialog.vue'
  import QuotePanel from '@/components/QuotePanel.vue'
  import { onMounted, onUnmounted, ref } from 'vue'

  const showNewQuoteDialog = ref(false)

  const openNewQuoteDialog = () => {
    showNewQuoteDialog.value = true
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    event.preventDefault()

    switch (event.code) {
      case 'KeyI':
        openNewQuoteDialog()
        break

      case 'KeyH':
        console.log('Display help (press H)')
        break

      case 'KeyC':
        console.log('Changing quote (press C)')
        break

      default:
        console.log('No sé que tecla has tocado.')
        break
    }
  }

  onMounted(async () => {
    window.addEventListener('keydown', handleKeyPress)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
</script>

<template>
  <NewQuoteDialog v-model:is-visible="showNewQuoteDialog" />
  <QuotePanel />
</template>
