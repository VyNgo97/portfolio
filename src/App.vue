<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const isValentinePage = computed(() => route.name === 'Valentine')
</script>

<template>
  <div v-if="isValentinePage">
    <router-view />
  </div>
  <div v-else class="flex flex-col min-h-screen">
    <Nav />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
