<script setup lang="ts">
  import type { Quote } from '@/models/Quote'
  import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

  const quote: Ref<Quote | undefined> = defineModel('quote')

  const formatedDate: Ref<string> = ref('')
  const interval = ref(0)

  const getFormatedDate = (): string => {
    return new Date().toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
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
  <div>
    <p>
      {{ formatedDate }}
    </p>
    <p>
      {{ quote?.quote }}
    </p>
    <p>
      {{ quote?.author }}
    </p>
    <p v-if="quote?.note">
      {{ quote?.note }}
    </p>
  </div>
</template>
