<script setup lang="ts">
import { ref } from 'vue'

// Definindo o tipo da URL da imagem como string
let imageUrl = ref<string>('https://avatars.githubusercontent.com/u/54380333?v=4')
</script>

<template>
    <img 
        :src="imageUrl" 
        alt="" 
        class="w-10 sm:w-16 h-10 sm:h-16 rounded-full border-2 border-green-500 object-cover"
    >
</template>
