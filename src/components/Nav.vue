<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <router-link to="/" class="font-mono text-lg hover:opacity-70 transition-opacity">
          <span>{{ displayedText }}</span>
          <span v-if="!isComplete" class="inline-block w-0.5 h-4 bg-black ml-1 animate-ping"></span>
        </router-link>

        <div class="flex space-x-8">
          <router-link
            to="/"
            class="text-gray-700 hover:text-black transition-colors"
            :class="{ 'font-semibold text-black': isActive('/about') }"
          >
            About
          </router-link>
          <router-link
            to="/blog"
            class="text-gray-700 hover:text-black transition-colors"
            :class="{ 'font-semibold text-black': isActive('/blog') }"
          >
            Blog
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const text = "Hi, I'm Vy.";
const speed = 100;
const pauseBeforeRestart = 1000;

const typedCharacters = ref(0);
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const displayedText = computed(() => {
  return text.slice(0, typedCharacters.value);
});

const isComplete = computed(() => {
  return typedCharacters.value >= text.length;
});

const startTyping = () => {
  const typeNextCharacter = () => {
    if (typedCharacters.value < text.length) {
      typedCharacters.value++;
      timeoutId = setTimeout(typeNextCharacter, speed);
    } else {
      // Animation complete, wait then restart
      timeoutId = setTimeout(() => {
        typedCharacters.value = 0;
        startTyping();
      }, pauseBeforeRestart);
    }
  };
  typeNextCharacter();
};

const isActive = (path: string) => {
  return computed(() => route.path === path).value
}

onMounted(() => {
  startTyping();
});

onUnmounted(() => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
});
</script>
