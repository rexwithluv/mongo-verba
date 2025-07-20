<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue';

const getFormatedDate = (): string => {
    return new Date().toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })
}

const formatedDate: Ref<string> = ref(getFormatedDate())
const interval = ref(0)

onMounted(() => {
    interval.value = setInterval(() => {
        formatedDate.value = getFormatedDate()
    }, 1000)
})

onUnmounted(() => {
    clearInterval(interval.value)
})
</script>

<template>
    <div class="page-wrapper">
        <div class="content-box">
            <p>{{ formatedDate }}</p>
            <p>El contenido se adapta y el fondo gris es leve.</p>
            <p>Puedes añadir más frases aquí para ver cómo crece.</p>
        </div>
    </div>
</template>
