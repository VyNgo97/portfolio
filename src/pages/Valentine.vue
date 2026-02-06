<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center p-4">
    <div class="text-center">
      <!-- Chibi animation -->
      <div class="mb-8 animate-bounce">
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I5NjAxZGp2YmwyN2sydDk2eDN5Mno1ZGQwZHpybTNmMTQ1bXkzaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/P1MnbeB71smnraT2tX/giphy.gif"
          alt="Cute heart"
          class="w-48 h-48 mx-auto object-contain"
        />
      </div>

      <!-- Question text -->
      <h1 class="text-5xl md:text-6xl font-bold mb-12 text-pink-600 cute-font animate-pulse">
        Will you be my Valentine?
      </h1>

      <!-- Buttons -->
      <div class="flex gap-8 justify-center items-center h-32">
        <button
          @click="handleYes"
          class="relative px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white text-2xl font-bold rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 cute-font z-10 overflow-hidden"
        >
          <img
            src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ0bjYzZmd5em9nNXF6NXd5aHMzM3NpYW5haW5wOXdvcTM0NGVhaTZ5dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fc6wlH8khFg0uKA2Nm/giphy.gif"
            alt="Yes"
            class="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <span class="relative z-10">Yes! 💕</span>
        </button>

        <button
          ref="noButton"
          @mouseenter="moveNoButton"
          @touchstart="moveNoButton"
          :style="{ position: 'fixed', left: noButtonPosition.x + 'px', top: noButtonPosition.y + 'px', transition: 'all 0.3s ease' }"
          class="relative px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white text-2xl font-bold rounded-full shadow-lg cute-font z-10 overflow-hidden"
        >
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I5NjAxZGp2YmwyN2sydDk2eDN5Mno1ZGQwZHpybTNmMTQ1bXkzaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Bc4oup2pdP5iKFAYiF/giphy.gif"
            alt="No"
            class="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <span class="relative z-10">No 😢</span>
        </button>
      </div>

    </div>

    <!-- Date Itinerary Modal -->
    <Transition name="modal">
      <div v-if="accepted" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30" @click="closeModal">
        <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform animate-slideUp border-4 border-pink-300" @click.stop>
          <div class="text-center mb-6">
            <h2 class="text-4xl font-bold text-pink-600 cute-font mb-2">🎉 LET'S FUCKING GOOOOO 🎉</h2>
            <p class="text-2xl text-pink-500 cute-font">It's a Date!</p>
          </div>

          <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 space-y-4">
            <div class="flex items-center space-x-4">
              <div class="text-4xl">📅</div>
              <div>
                <p class="text-lg font-semibold text-gray-800">February 14th, 2026</p>
                <p class="text-sm text-gray-600">Valentine's Day</p>
              </div>
            </div>

            <div class="border-t-2 border-pink-200 pt-4 space-y-3">
              <div class="flex items-center space-x-4">
                <div class="text-3xl">🎬</div>
                <div>
                  <p class="text-lg font-semibold text-gray-800">Movie Time</p>
                  <p class="text-pink-600 font-medium">3:30 PM</p>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div class="text-3xl">🍽️</div>
                <div>
                  <p class="text-lg font-semibold text-gray-800">Dinner Date</p>
                  <p class="text-pink-600 font-medium">6:30 PM</p>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div class="text-3xl">🎁</div>
                <div>
                  <p class="text-lg font-semibold text-gray-800">Gift Time</p>
                  <p class="text-pink-600 font-medium">9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 text-center">
            <p class="text-gray-600 cute-font text-lg">Can't wait to spend the day with you! 💕</p>
          </div>
        </div>
      </div>
    </Transition>

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

const closeModal = () => {
  accepted.value = false
  hearts.value = []
  fireworks.value = []
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

/* Modal animations */
.modal-enter-active {
  transition: all 0.4s ease-out;
}

.modal-leave-active {
  transition: all 0.3s ease-in;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@keyframes slideUp {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slideUp {
  animation: slideUp 0.5s ease-out;
}
</style>
