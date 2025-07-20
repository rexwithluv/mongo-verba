<script setup lang="ts">
import { ref, type Ref } from 'vue';

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

setInterval(() => {
    formatedDate.value = getFormatedDate()
}, 1000)
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

<style scoped>
.page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f0f0;
    padding: 20px;
    box-sizing: border-box;
}

.content-box {
    background-color: #f7f7f7;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    max-width: 600px;
    text-align: center;
    margin: auto;
}


.content-box p {
    margin-bottom: 10px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    line-height: 1.6;
}

.content-box p:last-child {
    margin-bottom: 0;
}
</style>