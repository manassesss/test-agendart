<template>
    <div class="flex flex-col items-center mt-4">
      <button @click="toggleRecording" :class="recording ? 'bg-red-500' : 'bg-blue-500'" class="text-white py-2 px-4 rounded-lg hover:opacity-80">
        {{ recording ? 'Parar Gravação' : 'Gravar Áudio' }}
      </button>
      <p v-if="recording" class="mt-2 text-red-500">Gravando...</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const recording = ref(false);
  const mediaRecorder = ref(null);
  const audioChunks = ref([]);
  const emit = defineEmits(["audio-recorded"]);
  
  const toggleRecording = async () => {
    if (!recording.value) {
      startRecording();
    } else {
      stopRecording();
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
      emit("audio-recorded", audioBlob);
    };
  
    mediaRecorder.value.start();
    recording.value = true;
  };
  
  const stopRecording = () => {
    mediaRecorder.value.stop();
    recording.value = false;
  };
  </script>