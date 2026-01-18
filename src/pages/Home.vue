<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto px-6 pt-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <!-- Picture Section - Left 1/3 -->
        <div class="md:col-span-1">
          <img
            src="../assets/dis_me.jpeg"
            alt="Vy Ngo"
            class="w-full aspect-square object-cover rounded-lg"
          />
        </div>

        <!-- About Section - Right 2/3 -->
        <div class="md:col-span-2 space-y-6">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900">
            Vy Ngo
          </h1>
          <p class="text-xl text-gray-600">
            a really tired programmer
          </p>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Welcome to my corner of the internet! I'm Vy— a software developer with a distracting sense of curiosity.
              I'm currently in the process of discovering what my philosophy towards programming, technology, and life is.
              If you want to read my ramblings, check out my blog!
              
            </p>
            <p>
              I won't bore you with my professional details but you can view my CV <button @click="openModal" class="text-blue-600 underline hover:text-blue-800 transition-colors">here</button>.
            </p>
            <p>
              P.S. The em dash is my favorite punctuation mark and I won't let AI take that away from me!
            </p>
          </div>
        </div>
      </div>
    </div>

    <PdfModal :is-open="isModalOpen" :pdf-url="resumePdf" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PdfModal from '../components/PdfModal.vue'
import resumePdf from '../assets/Vy_Ngo_Resume.pdf'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>
