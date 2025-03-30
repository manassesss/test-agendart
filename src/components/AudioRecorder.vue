<template>
  <div class="flex flex-wrap justify-center items-center mt-4 w-full max-w-lg gap-2 p-2">
    <p v-if="recording" class="w-full text-center text-red-500 animate-pulse">Gravando...</p>
    <audio v-if="audioUrl" :src="audioUrl" controls class="w-full mt-2"></audio>

    <button v-if="!stopped" @click="toggleRecording" class="flex justify-center items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-80 w-full sm:w-auto">
      <MicrophoneIcon v-if="!recording" class="w-5 h-5" />
      <PauseIcon v-else class="w-5 h-5" />
      <span>{{ recording ? 'Pausar' : 'Gravar' }}</span>
    </button>

    <button v-if="paused" @click="resumeRecording" class="flex justify-center items-center space-x-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:opacity-80 w-full sm:w-auto">
      <PlayIcon class="w-5 h-5" />
      <span>Continuar</span>
    </button>

    <button v-if="recording || paused" @click="stopRecording" class="flex justify-center items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80 w-full sm:w-auto">
      <StopIcon class="w-5 h-5" />
      <span>Parar</span>
    </button>

    <button v-if="audioUrl" @click="sendAudio" class="flex justify-center items-center space-x-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:opacity-80 w-full sm:w-auto">
      <PaperAirplaneIcon class="w-5 h-5" />
      <span>Enviar</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MicrophoneIcon, PauseIcon, PlayIcon, StopIcon, SpeakerWaveIcon, PaperAirplaneIcon } from '@heroicons/vue/24/solid';

const recording = ref(false);
const paused = ref(false);
const stopped = ref(false);
const mediaRecorder = ref(null);
const audioChunks = ref([]);
const audioUrl = ref('');
const transcript = ref('');

const emit = defineEmits(["audio-recorded", "audio-transcribed"]);

// Reconhecimento de fala
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'pt-BR';
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = (event) => {
  transcript.value = event.results[0][0].transcript;
};

recognition.onerror = (event) => {
  console.error("Erro na transcrição: ", event.error);
};

const toggleRecording = async () => {
  if (!recording.value) {
    startRecording();
  } else {
    pauseRecording();
  }
};

const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder.value = new MediaRecorder(stream);
  audioChunks.value = [];

  mediaRecorder.value.ondataavailable = (event) => {
    audioChunks.value.push(event.data);
  };

  mediaRecorder.value.onstop = () => {
    const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' });
    audioUrl.value = URL.createObjectURL(audioBlob);
  };

  mediaRecorder.value.start();
  recognition.start();
  recording.value = true;
  paused.value = false;
  stopped.value = false;
};

const pauseRecording = () => {
  if (mediaRecorder.value.state === "recording") {
    mediaRecorder.value.pause();
    recognition.stop();
    paused.value = true;
    recording.value = false;
  }
};

const resumeRecording = () => {
  if (mediaRecorder.value.state === "paused") {
    mediaRecorder.value.resume();
    recognition.start();
    paused.value = false;
    recording.value = true;
  }
};

const stopRecording = () => {
  if (mediaRecorder.value && (recording.value || paused.value)) {
    mediaRecorder.value.stop();
    recognition.stop();
    recording.value = false;
    paused.value = false;
    stopped.value = true;
  }
};

const playAudio = () => {
  const audio = new Audio(audioUrl.value);
  audio.play();
};

const sendAudio = () => {
  const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' });
  emit("audio-recorded", audioBlob);
  emit("audio-transcribed", `Transcrição: ${transcript.value}`);
  
  // Limpa o áudio e transcrição após enviar
  audioUrl.value = "";
  transcript.value = "";
  stopped.value = false;
};
</script>
