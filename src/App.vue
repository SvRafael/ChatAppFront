<script setup lang="ts">
import PerfilImage from './components/PerfilImage.vue'
import ChatMessage from './components/ChatMessage.vue'
import MyChatMessage from './components/MyChatMessage.vue'
import ChatImage from './components/ChatImage.vue'
import { ref } from 'vue'

let userName = ref<string>('Rafael Souza')
let userJob = ref<string>('Desenvolvedor Web')
</script>

<template>
  <main>
    <router-view />
  </main>
</template>

