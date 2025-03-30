<template>
  <Transition name="fade-slide" mode="out-in">
    <div class="relative bg-white/40 border border-white p-8 sm:p-10 text-center flex flex-col justify-between items-center shadow-lg rounded-lg w-full max-w-sm min-h-[550px]">
      <img src="/Logo.svg" alt="Logo" width="80" height="80" class="mb-4">

      <p class="text-md font-semibold text-[#1E1E1E] text-center">Bem-vindo! Informe seus dados para acessar.</p>

      <form @submit.prevent="login" class="w-full flex flex-col gap-y-4">
        <div class="flex flex-col text-left w-full">
          <label class="block font-medium text-[#1e1e1e]">Email</label>
          <input v-model="email" type="email" class="w-full h-12 bg-white px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div class="w-full text-left relative">
          <label class="block font-medium text-[#1e1e1e]">Senha</label>
          <div class="relative">
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              class="w-full h-12 bg-white px-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-3 flex items-center">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.451 10.451 0 0021 12c-2.25-4.5-6.75-7.5-12-7.5S3 7.5.75 12c2.25 4.5 6.75 7.5 12 7.5 1.125 0 2.25-.187 3.375-.525M12 15a3 3 0 100-6 3 3 0 000 6z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.98 8.438A10.451 10.451 0 013 12c2.25 4.5 6.75 7.5 12 7.5 1.125 0 2.25-.187 3.375-.525M12 15a3 3 0 000-6m0 6a3 3 0 100-6m6.01 3.562a10.45 10.45 0 01.99-2.062M9.41 9.41a3 3 0 010 4.242M3 3l18 18"/>
              </svg>
            </button>
          </div>
        </div>

        <button type="submit" class="w-full font-medium h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
          Entrar
        </button>
      </form>

      <p class="text-center text-gray-600 text-sm mt-4">
        Não tem conta? <button @click="$emit('switch')" class="text-blue-500 underline">Cadastre-se</button>
      </p>

      <Transition name="slide-fade">
        <div v-if="showToast" class="fixed top-4 right-4 bg-red-500 font-bold text-white px-4 py-2 rounded shadow-lg z-50">
          Credenciais inválidas! Verifique seu e-mail e senha.
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const showToast = ref(false);
const router = useRouter();

const login = async () => {
  try {
    const res = await axios.get('http://localhost:3001/users', {
      params: {
        email: email.value,
        password: password.value
      }
    });

    if (res.data.length) {
      const user = res.data[0];
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/chat');
    } else {
      triggerToast();
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    triggerToast();
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const triggerToast = () => {
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 3000);
};
</script>

<style scoped>
.slide-fade-enter-active,
.fade-slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active,
.fade-slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to,
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
