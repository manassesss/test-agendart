<template>
  <div class="relative w-full font-[Montserrat] min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat px-4"
       style="background-image: url('/Login.svg');">
    <div class="absolute inset-0 bg-white/10 backdrop-blur-lg"></div>
    <Transition name="slide-up" mode="out-in">
      <LoginForm v-if="isLogin" @switch="isLogin = false" />
      <SignupForm v-else @switch="isLogin = true" />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginForm from '../components/Login.vue';
import SignupForm from '../components/Signup.vue';

const isLogin = ref(true);
</script>

<style scoped>
slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
