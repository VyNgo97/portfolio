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
      <div class="flex gap-8 justify-center items-center relative h-32">
        <button
          @click="handleYes"
          class="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white text-2xl font-bold rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 cute-font"
        >
          Yes! 💕
        </button>

        <button
          ref="noButton"
          @mousemove="moveNoButton"
          @touchstart="moveNoButton"
          :style="{ position: 'absolute', left: noButtonPosition.x + 'px', top: noButtonPosition.y + 'px' }"
          class="px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white text-2xl font-bold rounded-full shadow-lg transition-colors duration-200 cute-font"
        >
          No 😢
        </button>
      </div>

      <!-- Success message -->
      <div v-if="accepted" class="mt-12 animate-bounce">
        <p class="text-4xl text-pink-600 cute-font">🎉 Yay! I'm so happy! 🎉</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const noButton = ref<HTMLButtonElement | null>(null)
const accepted = ref(false)
const noButtonPosition = ref({ x: 0, y: 0 })

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
  // Add confetti or celebration effect here if desired
}

const moveNoButton = (event: MouseEvent | TouchEvent) => {
  if (accepted.value) return

  const button = noButton.value
  if (!button) return

  // Get mouse/touch position
  let clientX: number
  let clientY: number

  if (event instanceof MouseEvent) {
    clientX = event.clientX
    clientY = event.clientY
  } else {
    clientX = event.touches[0].clientX
    clientY = event.clientY
  }

  const rect = button.getBoundingClientRect()
  const buttonCenterX = rect.left + rect.width / 2
  const buttonCenterY = rect.top + rect.height / 2

  // Calculate distance from mouse to button center
  const distanceX = clientX - buttonCenterX
  const distanceY = clientY - buttonCenterY
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

  // If mouse is close enough, move the button away
  if (distance < 150) {
    // Calculate direction away from mouse
    const angle = Math.atan2(distanceY, distanceX)
    const moveDistance = 200

    let newX = buttonCenterX - Math.cos(angle) * moveDistance - rect.width / 2
    let newY = buttonCenterY - Math.sin(angle) * moveDistance - rect.height / 2

    // Keep button within viewport bounds
    const maxX = window.innerWidth - rect.width - 20
    const maxY = window.innerHeight - rect.height - 20

    newX = Math.max(20, Math.min(newX, maxX))
    newY = Math.max(20, Math.min(newY, maxY))

    noButtonPosition.value = { x: newX, y: newY }
  }
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
</style>
