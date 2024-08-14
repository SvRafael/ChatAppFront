<script setup lang="ts">
import { ref } from 'vue'
import ChatImage from './ChatImage.vue'
// Definindo o tipo da URL da imagem como string
let imageUrl = ref<string>('https://avatars.githubusercontent.com/u/54380333?v=4')
</script>

<template>
    <div>
          <div class="flex items-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                    <span class="px-2 py-2 rounded-lg inline-block rounded-bl-none bg-gray-500 text-white font-semibold">
                       Oi! Tudo bem?
                    </span>
                </div>
            </div>
           <chat-image />
          </div>
      </div>
</template>
