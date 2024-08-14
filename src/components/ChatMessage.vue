<script setup lang="ts">
import { ref } from 'vue'
import ChatImage from './ChatImage.vue'
import { defineProps } from 'vue';
import { useUserStore } from '../stores/store'

const userStore = useUserStore()

const props = defineProps({
    message: {type: Object, required: false}
})

// Definindo o tipo da URL da imagem como string
let imageUrl = ref<string>('https://avatars.githubusercontent.com/u/54380333?v=4')
</script>

<template>
    <div>
        <div v-if="props.message.senderId !== userStore.getUser._id" class="flex items-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                    <span class="px-2 py-2 rounded-lg inline-block rounded-bl-none bg-gray-500 text-white font-semibold">
                       {{props.message.text}}
                    </span>
                </div>
            </div>
           <!-- <chat-image /> -->
        </div>
        <div v-else class="flex items-end justify-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                    <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                        {{props.message.text}}
                    </span>
                </div>
            </div>
            <!-- <chat-image /> -->
        </div>
      </div>
</template>
