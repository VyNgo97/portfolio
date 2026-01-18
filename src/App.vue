<script setup lang="ts">
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Nav />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
