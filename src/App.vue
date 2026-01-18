<script setup lang="ts">
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div>
    <Nav />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>
