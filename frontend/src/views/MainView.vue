<script setup lang="ts">
  import HelpDialog from '@/components/HelpDialog.vue'
  import NewQuoteDialog from '@/components/NewQuoteDialog.vue'
  import QuotePanel from '@/components/QuotePanel.vue'
  import type { Quote } from '@/models/Quote'
  import axios from 'axios'
  import { onMounted, onUnmounted, type Ref, ref } from 'vue'

  const quote: Ref<Quote> = ref({} as Quote)

  const showNewQuoteDialog = ref(false)
  const showHelpDialog = ref(false)

  const getRandomQuote = async () => {
    try {
      const response = await axios.get('http://localhost:3000/quotes/random')
      return response.data
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }

  const changeQuote = async () => {
    const actualQuote = quote.value
    let newQuote = await getRandomQuote()

    while (actualQuote.quote === newQuote.quote) {
      newQuote = await getRandomQuote()
    }

    quote.value = newQuote
  }

  const openNewQuoteDialog = () => {
    showNewQuoteDialog.value = true
  }
  const openHelpDialog = () => {
    showHelpDialog.value = true
  }

  const handleKeyPress = async (event: KeyboardEvent) => {
    event.preventDefault()

    switch (event.code) {
      case 'KeyI':
        openNewQuoteDialog()
        break

      case 'KeyH':
        openHelpDialog()
        break

      case 'KeyC':
        await changeQuote()
        break

      default:
        console.log('No sé que tecla has tocado.')
        break
    }
  }

  onMounted(async () => {
    quote.value = await getRandomQuote()
    window.addEventListener('keydown', handleKeyPress)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
</script>

<template>
  <NewQuoteDialog v-model:is-visible="showNewQuoteDialog" />
  <HelpDialog v-model:is-visible="showHelpDialog" />
  <QuotePanel v-model:quote="quote" />
</template>
