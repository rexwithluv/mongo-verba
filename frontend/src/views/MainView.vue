<script setup lang="ts">
import QuotePanel from '@/components/QuotePanel.vue';
import { onMounted, onUnmounted } from 'vue';

const handleKeyPress = (event: KeyboardEvent) => {
    event.preventDefault();

    switch (event.code) {
        case "KeyI":
            console.log("Create new quote (press I)")
            break;

        case "KeyH":
            console.log("Display help (press H)")
            break;

        case "KeyC":
            console.log("Changing quote (press C)")
            break;

        default:
            console.log("No sé que tecla has tocado.")
            break;
    }
}

onMounted(() => {
    window.addEventListener("keydown", handleKeyPress)
})

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress)
})
</script>

<template>
    <QuotePanel></QuotePanel>
</template>

<style scoped></style>