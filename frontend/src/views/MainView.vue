<script setup lang="ts">
  import NewQuoteDialog from '@/components/NewQuoteDialog.vue'
  import QuotePanel from '@/components/QuotePanel.vue'
  import type { Quote } from '@/models/Quote'
  import { useApiStore } from '@/stores/apiStore'
  import axios from 'axios'
  import { onMounted, onUnmounted, type Ref, ref } from 'vue'

  const apiStore = useApiStore()

  const quote: Ref<Quote> = ref({} as Quote)
  const apiBaseUrl = apiStore.baseUrl

  const showNewQuoteDialog = ref(false)

  const getRandomQuote = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/quotes/random`)
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

  const handleKeyPress = async (event: KeyboardEvent) => {
    if (showNewQuoteDialog.value) {
      return
    }

    switch (event.code) {
      case 'KeyI':
        event.preventDefault()
        openNewQuoteDialog()
        break

      case 'Space':
        event.preventDefault()
        await changeQuote()
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

  <div class="main-layout">
    <div class="header-section">
      <h1>Mongo Verba</h1>
      <p class="tagline">
        Developed with <3 by <a href="https://github.com/rexwithluv/">@rexwithluv</a>
      </p>
    </div>

    <main class="content-section">
      <QuotePanel :quote="quote" />
    </main>

    <footer class="footer-section">
      <p class="instructions">Press <span class="key-highlight">Space</span> for random quote</p>
      <p class="instructions">Press <span class="key-highlight">I</span> to insert new quote</p>
    </footer>
  </div>
</template>

<style scoped>
  a {
    color: inherit;
  }
  .main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(to bottom right, var(--surface-a), var(--surface-100));
    color: var(--text-color);
    font-family: var(--font-family);
    overflow: hidden;
  }

  .header-section {
    text-align: center;
    padding: 2rem 1rem 1rem;
    color: var(--primary-color);
  }

  .header-section h1 {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
  }

  .tagline {
    font-size: 1.2rem;
    color: var(--text-color-secondary);
    font-style: italic;
  }

  .content-section {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  .footer-section {
    text-align: center;
    padding: 1.5rem 1rem 2rem;
    background-color: var(--surface-ground);
    border-top: 1px solid var(--surface-border);
    font-size: 0.9rem;
    color: var(--text-color-secondary);
  }

  .instructions {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .key-highlight {
    background-color: var(--surface-200);
    padding: 0.2em 0.5em;
    border-radius: var(--border-radius);
    color: var(--text-color);
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .footer-text {
    margin-top: 1rem;
    font-size: 0.8em;
    color: var(--surface-400);
  }
</style>
