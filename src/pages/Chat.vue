<script lang="ts" setup>
import { useUserStore, useChatStore } from '../stores/store'
import PerfilImage from '../components/PerfilImage.vue'
import ChatMessage from '../components/ChatMessage.vue'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const userStore = useUserStore()
const chatStore = useChatStore()

let message = ref<string>('')
let activeChat = ref<object>({})
let messages = ref<Array<string>>([])

const createChat = async () => {
    let chat = await findChat()
    if(chat){
      chatStore.addChat(chat)
      chatStore.setActiveChat(chat.data)
    }else{
      await axios.post('http://localhost:5000/api/chats', {
        firstId: userStore.getUser._id,
        secondId: chatStore.getActiveUser._id
      }).then((res) => {
          chatStore.addChat(res.data)
          activeChat.value = res.data
          chatStore.setActiveChat(activeChat.value)
      }).catch((err) => {
          console.log(err)
      })
    }
}

const inviteMessage = () => {
    axios.post('http://localhost:5000/api/messages',{
      chatId: chatStore.getActiveChat._id,
      senderId: userStore.user._id,
      text: message.value,
    })
    .then((res) => {
      message.value = ''
        getMessages()
    }).catch((err) => {
        console.log(err)
    })
}

const findChat = async () => {
  await axios.get('http://localhost:5000/api/chats/find/'+userStore.getUser._id+'/'+chatStore.getActiveUser._id)
  .then(res => {
    return res.data
  })
}

const getMessages = async () =>{
    await axios.get('http://localhost:5000/api/messages/'+chatStore.getActiveChat._id)
    .then((res) => {
        console.log(res)
        messages.value = res.data
    }).catch((err) => {
        console.log(err)
    })
}

const getUsers = () => {
    axios.get('http://localhost:5000/api/users')
    .then((res) => {
        userStore.addUsers(res.data)
    }).catch((err) => {
        console.log(err)
    })
}
getUsers()

const setActiveUserOnChat = async (user:object) => {
  await chatStore.addActiveUser(user)
  await createChat()
  await getMessages()
}

const usersInChat = computed(() => {
  if(userStore.getUsers.length > 0){
    return userStore.getUsers.filter(user => user._id !== userStore.getUser._id);
  }
  return []
})

onMounted(() => {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
  console.log(loggedUser)
  userStore.addUser(loggedUser)
})

</script>

<template>
<div class="sm:p-6 md:py-20 md:px-10 sm:justify-items-center md:justify-between sm:flex md:flex sm:flex-col md:flex-row h-screen bg-slate-950 bg-opacity-90 md:space-x-8">
  <sidebar class="bg-black rounded-md p-4 bg-opacity-15 flex flex-col space-y-4">
      <div class="flex sm:items-center justify-start py-3 space-x-2 border-b-2 border-white w-auto">
        <div class="relative flex items-center space-x-4">
          <!-- <perfil-image /> -->
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
      <strong class="text-gray-200">Usuários</strong>
      <div v-for="user in usersInChat" :key="user._id" class="flex flex-col space-y-4">
        <button @click="setActiveUserOnChat(user)" class="flex flex-row items-center px-2 space-x-4 bg-gray-300 hover:bg-gray-100 rounded-md">
          <div>
            <!-- <chat-image /> -->
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
        {{chatStore.getActiveUser.name ? chatStore.getActiveUser.name : 'Selecione um usuario para conversar'}}
      </header>
      <div v-if="messages.length > 0" id="messages" class="flex flex-col p:2 sm:p-6 space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        <div v-for="message in messages" :key="message._id">
          <!-- <my-chat-message v-if="messages.filter(message_chat => message_chat.senderId == userStore.getUser._id)[0]" :message="message"/> -->
          <chat-message :message="message"/>
        </div>
      </div>
      <div class="border-t-2 border-gray-200  mb-2 sm:mb-0">
        <div class="relative flex">
            <input v-model="message" type="text" placeholder="Escreva sua mensagem!" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3">
            <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button @click="inviteMessage" type="button" class="inline-flex items-center justify-center rounded-md px-4 py-3 transition duration-500 ease-in-out text-white bg-black hover:bg-gray-800 focus:outline-none">
                  <span class="font-bold">Enviar</span>
              </button>
            </div>
        </div>
      </div>
  </div>
</div>
</template>