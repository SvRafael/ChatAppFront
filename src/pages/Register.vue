<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

let name = ref<string>('')
let email = ref<string>('')
let password = ref<string>('')
let router = useRouter()

let registerUser = () => {
    axios.post('http://localhost:5000/api/users/register', {
        name: name.value,
        email: email.value,
        password: password.value
    }).then((res) => {
        router.push('/chat');
    }).catch((err) => {
        console.log(err)
    })
}

</script>

<template>
    <div class="font-sans text-gray-200 antialiased">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-black bg-opacity-90">
            <div>
                <a href="/">
                    <h2 class="font-bold text-3xl">Abla <span class="bg-[#f84525] text-white px-2 rounded-md">Chat</span></h2>
                </a>
            </div>
            <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div>
                    <div class="py-8">
                        <center>
                            <span class="text-2xl font-semibold text-gray-900">Log In</span>
                        </center>
                    </div>
                    <div>    
                        <label class="block font-medium text-sm text-gray-700" for="email" value="Email" />
                        <input
                            v-model="name"
                            name='name'
                            placeholder='Nome'
                            class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]" 
                            required
                        />                        
                    </div>
                    <div class="mt-4">
                        <label class="block font-medium text-sm text-gray-700" for="email" value="Email" />
                        <input v-model="email" type='email' 
                            name='email'
                            placeholder='E-mail'
                            class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            required
                        />                        
                    </div>
                    <div class="mt-4">
                        <label class="block font-medium text-sm text-gray-700" for="password" value="Password" />
                        <div class="relative">
                            <input v-model="password" id="password" type="password" name="password" placeholder="Senha" required autocomplete="current-password" class = 'w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]'>
                        </div>
                    </div>
                    <div class="flex items-center justify-end mt-4">
                        <button class="hover:underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('password.request') }}">
                            LOGIN
                        </button>
                        <button @click="registerUser" class = 'ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>
                            CRIAR CONTA
                        </button>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>
