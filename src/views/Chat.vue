<template>
    <div class="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Chat com o Sistema</h2>
      <p class="text-gray-600">Usuário: {{ user.email }}</p>
      
      <div class="mt-4 border p-4 rounded-lg h-64 overflow-y-auto">
        <div v-for="(message, index) in messages" :key="index" class="mb-2">
          <p class="font-bold" v-if="message.type === 'user'">Você:</p>
          <p class="font-bold text-blue-500" v-else>Sistema:</p>
          <p class="bg-gray-100 p-2 rounded-md">{{ message.text }}</p>
        </div>
      </div>
      
      <AudioRecorder @audio-recorded="handleAudio" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import AudioRecorder from '../components/AudioRecorder.vue';
  
  const router = useRouter();
  const user = ref(JSON.parse(localStorage.getItem('user')) || {});
  const messages = ref([]);
  
  const handleAudio = (audioBlob) => {
    messages.value.push({ type: 'user', text: 'Áudio enviado...' });
    setTimeout(() => {
      messages.value.push({ type: 'system', text: 'Transcrição: "Olá, esse é um teste de áudio."' });
      messages.value.push({ type: 'system', text: 'Resumo: "Teste de envio de áudio pelo usuário."' });
    }, 2000);
  };
  
  onMounted(() => {
    if (!user.value.email) {
      router.push('/');
    }
  });
  </script>
  