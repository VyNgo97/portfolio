<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center p-4">
    <div class="text-center">
      <!-- Chibi animation -->
      <div class="mb-8 animate-bounce">
        <div class="text-9xl">💝</div>
      </div>

      <!-- Question text -->
      <h1 class="text-5xl md:text-6xl font-bold mb-12 text-pink-600 cute-font animate-pulse">
        Will you be my Valentine?
      </h1>

      <!-- Buttons -->
      <div class="flex gap-8 justify-center items-center h-32">
        <button
          @click="handleYes"
          class="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white text-2xl font-bold rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 cute-font z-10"
        >
          Yes! 💕
        </button>

        <button
          ref="noButton"
          @mouseenter="moveNoButton"
          @touchstart="moveNoButton"
          :style="{ position: 'fixed', left: noButtonPosition.x + 'px', top: noButtonPosition.y + 'px', transition: 'all 0.3s ease' }"
          class="px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white text-2xl font-bold rounded-full shadow-lg cute-font z-10"
        >
          No 😢
        </button>
      </div>

      <!-- Success message -->
      <div v-if="accepted" class="mt-12">
        <p class="text-4xl text-pink-600 cute-font animate-pulse">🎉 Yay! 🎉</p>
      </div>
    </div>

    <!-- Hearts and Fireworks -->
    <div v-if="accepted" class="fixed inset-0 pointer-events-none overflow-hidden">
      <!-- Floating Hearts -->
      <div
        v-for="heart in hearts"
        :key="heart.id"
        :style="{
          left: heart.x + '%',
          animationDelay: heart.delay + 's',
          fontSize: heart.size + 'px'
        }"
        class="heart"
      >
        {{ heart.emoji }}
      </div>

      <!-- Fireworks -->
      <div
        v-for="firework in fireworks"
        :key="firework.id"
        :style="{
          left: firework.x + '%',
          top: firework.y + '%',
          animationDelay: firework.delay + 's'
        }"
        class="firework"
      >
        <div v-for="i in 12" :key="i" class="firework-particle" :style="{ transform: `rotate(${i * 30}deg)` }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const noButton = ref<HTMLButtonElement | null>(null)
const accepted = ref(false)
const noButtonPosition = ref({ x: 0, y: 0 })
const hearts = ref<Array<{ id: number; x: number; delay: number; size: number; emoji: string }>>([])
const fireworks = ref<Array<{ id: number; x: number; y: number; delay: number }>>([])

const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💞', '💘']

onMounted(() => {
  // Initialize "No" button position
  if (noButton.value) {
    const rect = noButton.value.getBoundingClientRect()
    noButtonPosition.value = {
      x: rect.left,
      y: rect.top
    }
  }
})

const handleYes = () => {
  accepted.value = true

  // Generate floating hearts
  for (let i = 0; i < 30; i++) {
    hearts.value.push({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      size: 30 + Math.random() * 40,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
    })
  }

  // Generate fireworks
  for (let i = 0; i < 8; i++) {
    fireworks.value.push({
      id: i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      delay: i * 0.3
    })
  }
}

const moveNoButton = (event: MouseEvent | TouchEvent) => {
  if (accepted.value) return

  const button = noButton.value
  if (!button) return

  const rect = button.getBoundingClientRect()
  const buttonCenterX = rect.left + rect.width / 2
  const buttonCenterY = rect.top + rect.height / 2

  // Calculate random new position away from button center
  const angle = Math.random() * Math.PI * 2
  const moveDistance = 150

  let newX = buttonCenterX + Math.cos(angle) * moveDistance - rect.width / 2
  let newY = buttonCenterY + Math.sin(angle) * moveDistance - rect.height / 2

  // Keep button within viewport bounds with padding
  const padding = 20
  const maxX = window.innerWidth - rect.width - padding
  const maxY = window.innerHeight - rect.height - padding

  newX = Math.max(padding, Math.min(newX, maxX))
  newY = Math.max(padding, Math.min(newY, maxY))

  noButtonPosition.value = { x: newX, y: newY }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.cute-font {
  font-family: 'Pacifico', cursive;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.heart {
  position: absolute;
  bottom: -50px;
  animation: floatUp 4s ease-in forwards;
  opacity: 0;
}

@keyframes floatUp {
  0% {
    bottom: -50px;
    opacity: 0;
    transform: translateX(0) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    bottom: 110vh;
    opacity: 0;
    transform: translateX(calc(var(--float-x, 0) * 1px)) rotate(360deg);
  }
}

.firework {
  position: absolute;
  width: 4px;
  height: 4px;
  animation: fireworkFade 1.5s ease-out forwards;
}

@keyframes fireworkFade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.firework-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: linear-gradient(45deg, #ff6b9d, #feca57, #48dbfb, #ff9ff3);
  border-radius: 50%;
  animation: explode 1.5s ease-out forwards;
}

@keyframes explode {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(150px, 0) scale(0);
    opacity: 0;
  }
}
</style>
