<template>
  <!-- Loading antes da página carregar -->
  <div v-if="loading" class="flex flex-col justify-center items-center h-screen">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div v-else class="bg-[#292F6B] font-[Montserrat] relative w-full min-h-screen flex flex-col justify-center items-center">
    <header class="bg-[#221B41] text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
      <div class="flex items-center space-x-3">
        <img src="/Logo-2.svg" alt="Logo" class="h-10 w-10 rounded-full">
      </div>
      <div class="relative flex flex-row justify-center items-center">
        <p class="text-sm font-semibold">Bem-vindo, {{ user.name || "Usuário" }}</p>
        <div class="relative inline-block ml-4">
          <button @click="toggleMenu" class="focus:outline-none rounded-md p-3 bg-white">
            <UserIcon class="w-5 h-5 text-[#221B41]" />
          </button>
          <div v-if="showMenu" class="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg z-20">
            <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100 hover:rounded-md">Sair</button>
          </div>
        </div>
      </div>
    </header>

    <div class="w-full max-w-4xl bg-[#292F6B] flex-1 p-4 pt-20 pb-24 overflow-y-auto">
      <div class="p-4 rounded-lg h-[80vh] overflow-y-auto  custom-scroll">
        <div v-if="!messages.length" class="mb-2 h-[90%] flex flex-col justify-center items-center text-center">
          <img src="/Logo-2.svg" alt="Logo" class="h-32 w-32 rounded-full mb-6">
          <h1 class="text-white text-4xl sm:text-5xl mb-2">Como posso ajudar hoje?</h1>
          <p  class="text-white text-sm sm:text-base">Aperte em gravar, e quando terminar de dizer o que precisa, aperte em parar. </p>
        </div>
        <transition-group v-else name="fade-slide" tag="div">
          <div v-for="(message, index) in messages" :key="index" class="mb-2 flex"
            :class="message.type === 'user' ? 'justify-end' : 'justify-start'">
            <div class="max-w-xs sm:max-w-md p-3 rounded-lg"
              :class="message.type === 'user' ? 'bg-[#221B41] text-white text-right' : 'bg-transparent text-white text-left'">
              
              <div v-if="message.isTyping" class="flex space-x-1">
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
              </div>
              <audio v-else-if="message.audioUrl" :src="message.audioUrl" controls class="mt-2"></audio>
              <p v-else>
                {{ getShortenedText(message.text, index) }}
                <button v-if="shouldShowToggle(message.text)" @click="toggleMessage(index)"
                  class="text-blue-400 text-sm ml-1">
                  {{ expandedMessages[index] ? 'Ver menos' : 'Ver mais' }}
                </button>
              </p>
              
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <footer class="bg-[#221B41] p-4 fixed bottom-0 left-0 w-full flex justify-center items-center">
      <AudioRecorder @audio-recorded="handleAudio" @audio-transcribed="handleTranscription" />
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AudioRecorder from '../components/AudioRecorder.vue';
import { UserIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const user = ref({});
const messages = ref([]);
const loading = ref(true);
const expandedMessages = ref({});

const TEXT_LIMIT = 50; // Define o tamanho de texto da transcrição, para ativar ou não o ver mais
const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
const handleAudio = (audioBlob) => {
  const audioUrl = URL.createObjectURL(audioBlob);
  messages.value.push({ type: 'user', text: '🎤 Áudio  enviado...', audioUrl });

  setTimeout(() => {
    handleSystemMessage('Resumo: "Olá, tudo bem? Ouvi bem o que foi dito e acredito que seja mais um caso de infecção urinária. Se analisarmos bem, o paciente vem sentindo fortes dores na região baixa do abdomen e pelo que foi dito o paciente tem uma rotina alimentar que com poucos líquidos"')
  }, 2000);
};

const handleTranscription = (text) => {
  messages.value.push({ type: 'user', text });
};

const handleSystemMessage = (text) => {
  messages.value.push({ type: "system", isTyping: true });

  setTimeout(() => {
    messages.value.pop(); // Remove o efeito de digitação
    messages.value.push({ type: "system", text });
  }, 2000); // Tempo da animação
};

const getShortenedText = (text, index) => {
  if (expandedMessages.value[index] || text.length <= TEXT_LIMIT) {
    return text;
  }
  return text.substring(0, TEXT_LIMIT) + "...";
};

const shouldShowToggle = (text) => {
  return text.length > TEXT_LIMIT;
};

const toggleMessage = (index) => {
  expandedMessages.value[index] = !expandedMessages.value[index];
};

onMounted(() => {
  setTimeout(() => {
    user.value = JSON.parse(localStorage.getItem('user')) || {};
    if (!user.value.email) {
      router.push('/');
    }
    loading.value = false;
  }, 3000);
});

const logout = () => {
  localStorage.removeItem('user');
  router.push('/');
};
</script>

<style scoped>
footer {
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.loader {
  margin-left: 45%;
  width: 100px;
  height: 100px;
  position: relative;
}

.loader span {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #221B41;
  animation: chase 2s linear infinite;
}

.loader span:nth-child(2) {
  animation-delay: 0.7s;
}

.loader span:nth-child(1) {
  animation-delay: 1.4s;
}

@keyframes chase {
  0% { top: 0; left: 0; }
  12.5% { top: 0; left: 50%; }
  25% { top: 0; left: 50%; }
  37.5% { top: 50%; left: 50%; }
  50% { top: 50%; left: 50%; }
  62.5% { top: 50%; left: 0; }
  75% { top: 50%; left: 0; }
  87.5% { top: 0; left: 0; }
  100% { top: 0; left: 0; }
}
</style>
