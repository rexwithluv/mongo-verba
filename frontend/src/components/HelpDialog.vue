<script setup lang="ts">
  import type { Ref } from 'vue'

  const isVisible: Ref<boolean | undefined> = defineModel('isVisible')
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Commands!!" modal dismissableMask>
    <div>H - Show help</div>

    <div>I - Insert new quote</div>

    <div>C - Change quote on screen</div>
  </Dialog>
</template>
