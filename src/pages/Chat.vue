<script lang="ts" setup>
import { useUserStore, useChatStore } from '../stores/store'
import PerfilImage from '../components/PerfilImage.vue'
import axios from 'axios'
import { computed } from 'vue'

const userStore = useUserStore()
const chatStore = useChatStore()

const getUsers = () => {
    axios.get('http://localhost:5000/api/users')
    .then((res) => {
        userStore.addUsers(res.data)
    }).catch((err) => {
        console.log(err)
    })
}
getUsers()

const setActiveUserOnChat = (user:object) => {
  chatStore.addActiveUser(user)
}

const usersInChat = computed(() => {
  return userStore.getUsers.filter(user => user._id !== userStore.getUser._id);
})

</script>

<template>
<div class="sm:p-6 md:py-20 md:px-10 sm:justify-items-center md:justify-between sm:flex md:flex sm:flex-col md:flex-row h-screen bg-slate-950 bg-opacity-90 md:space-x-8">
  <sidebar class="bg-black rounded-md p-4 bg-opacity-15 flex flex-col space-y-4">
      <div class="flex sm:items-center justify-start py-3 space-x-2 border-b-2 border-white w-auto">
        <div class="relative flex items-center space-x-4">
          <perfil-image />
        </div>
        <div class="flex flex-col leading-tight">
          <div class="text-2xl mt-1 flex items-center">
              <span class="text-gray-100 mr-3 font-semibold">
                {{userStore.getUser.name}}
              </span>
          </div>
          <span class="text-lg text-gray-300">
            {{userStore.getUser.email}}
          </span>
        </div>
      </div>
      <div v-for="user in usersInChat" :key="user._id" class="flex flex-col space-y-4">
        <button @click="setActiveUserOnChat(user)" class="flex flex-row items-center px-2 space-x-4 bg-gray-300 hover:bg-gray-100 rounded-md">
          <div>
            <chat-image />
          </div>
          <div class="flex flex-col items-start">
            <strong>{{user.name}}</strong>
            <p>{{user.email}}</p>
          </div>
        </button>
      </div>
  </sidebar>
  <div class="flex-1  justify-between flex flex-col border-2 rounded-md">
      <header class="flex flex-col items-center justify-center bg-black h-12 text-gray-200 font-semibold">
        {{chatStore.getActiveUser.name}}
      </header>
      <div id="messages" class="flex flex-col p:2 sm:p-6 space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        <chat-message />
        <my-chat-message />
      </div>
      <div class="border-t-2 border-gray-200  mb-2 sm:mb-0">
        <div class="relative flex">
            <input type="text" placeholder="Escreva sua mensagem!" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3">
            <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button type="button" class="inline-flex items-center justify-center rounded-md px-4 py-3 transition duration-500 ease-in-out text-white bg-black hover:bg-gray-800 focus:outline-none">
                  <span class="font-bold">Enviar</span>
              </button>
            </div>
        </div>
      </div>
  </div>
</div>
</template>