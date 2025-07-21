<script setup lang="ts">
  import type { Quote } from '@/models/Quote'
  import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
  import capitalize from '@/helpers/capitalize'

  const quote: Ref<Quote | undefined> = defineModel('quote')

  const formatedDate: Ref<string> = ref('')
  const interval = ref(0)

  const getFormatedDate = (): string => {
    const datetime = new Date().toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    return capitalize(datetime).replace(/, /g, ' - ').replace(' - ', ', ')
  }

  onMounted(async () => {
    formatedDate.value = getFormatedDate()
    interval.value = setInterval(() => {
      formatedDate.value = getFormatedDate()
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(interval.value)
  })
</script>

<template>
  <div class="quote-panel">
    <div class="quote-header">
      <p class="formatted-date">{{ formatedDate }}</p>
    </div>
    <div class="quote-content">
      <p class="quote-text">{{ quote?.quote }}</p>
      <p class="quote-author">- {{ quote?.author }}</p>
      <p v-if="quote?.note" class="quote-note">Nota: {{ quote?.note }}</p>
    </div>
  </div>
</template>

<style scoped>
  .quote-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;
    width: 100%;
    max-width: 700px;
    background-color: var(--surface-card);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    padding: 2.5rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    animation: fadeIn 0.8s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .quote-header {
    align-self: flex-end;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }

  .formatted-date {
    font-size: 0.87rem;
    color: var(--text-color-secondary);
    margin: 0;
  }

  .quote-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 0;
  }

  .quote-text {
    font-size: 2.5rem;
    line-height: 1.4;
    color: var(--text-color);
    margin: 0 0 1.5rem 0;
    font-style: italic;
  }

  .quote-author {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--primary-color);
    margin: 0;
    padding-top: 1rem;
    border-top: 1px solid var(--surface-border);
  }

  .quote-note {
    font-size: 0.9rem;
    color: var(--text-color-secondary);
    margin-top: 1rem;
    font-style: italic;
    padding: 0.5rem 1rem;
    background-color: var(--surface-hover);
    border-radius: var(--border-radius);
  }

  @media (max-width: 768px) {
    .quote-panel {
      min-height: 250px;
      padding: 1.5rem;
    }
    .quote-text {
      font-size: 1.8rem;
    }
    .quote-author {
      font-size: 1.1rem;
    }
    .quote-header {
      top: 1rem;
      right: 1rem;
    }
  }

  @media (max-width: 480px) {
    .quote-panel {
      min-height: 200px;
      padding: 1rem;
    }
    .quote-text {
      font-size: 1.5rem;
    }
    .quote-author {
      font-size: 1rem;
    }
  }
</style>
