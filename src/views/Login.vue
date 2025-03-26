<template>
  <div class="relative w-full min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat px-4"
       style="background-image: url('/Login.svg');">
    <div class="absolute inset-0 bg-white/30 backdrop-blur-lg"></div>

    <div class="relative bg-white/40 border border-white p-8 sm:p-10 text-center flex flex-col justify-between items-center shadow-lg rounded-lg w-full max-w-sm min-h-[550px]">
      <img src="/Logo.svg" alt="Logo" width="80" height="80" class="mb-4">
      
      <p class="text-md font-semibold text-[#1E1E1E] text-center">Bem-vindo! Informe seus dados para acessar.</p>
      
      <form @submit.prevent="login" class="w-full flex flex-col gap-y-4">
        <div class="flex flex-col text-left w-full">
          <label class="block font-medium text-[#1e1e1e]">Email</label>
          <input v-model="email" type="email" class="w-full h-12 bg-white px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="w-full text-left">
          <label class="block font-medium text-[#1e1e1e]">Senha</label>
          <input v-model="password" type="password" class="w-full h-12 bg-white px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button type="submit" class="w-full font-medium h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">Entrar</button>
      </form>

      <p class="text-center text-gray-600 text-sm mt-4">
        Não tem conta? <a href="#" class="text-blue-500">Cadastre-se</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  if (email.value && password.value) {
    localStorage.setItem('user', JSON.stringify({ email: email.value }));
    router.push('/chat');
  }
};
</script>
