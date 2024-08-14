<script setup lang="ts">
import { ref } from 'vue'

let imageUrl = ref<string>('https://avatars.githubusercontent.com/u/54380333?v=4')

</script>
<template>
    <img 
        :src="imageUrl" 
        alt="My profile" 
        class="w-10 h-10 rounded-full order-1"
    >
</template>