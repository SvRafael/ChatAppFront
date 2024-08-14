<script setup lang="ts">
import { ref } from 'vue'
import ChatImage from './ChatImage.vue'
// Definindo o tipo da URL da imagem como string
let imageUrl = ref<string>('https://avatars.githubusercontent.com/u/54380333?v=4')
</script>

<template>
    <div class="chat-message">
        <div class="flex items-end justify-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                    <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                        Na paz e ai?
                    </span>
                </div>
            </div>
            <chat-image />
        </div>
    </div>
</template>
