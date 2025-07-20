<script setup lang="ts">
  import type { Ref } from 'vue'

  const isVisible: Ref<boolean | undefined> = defineModel('isVisible')
</script>

<template>
  <Dialog v-model:visible="isVisible" header="New quote!!" modal dismissableMask>
    hola caracola
  </Dialog>
</template>
