<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold mb-8">Blog</h1>

    <div v-if="loading" class="text-gray-600">Loading...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else-if="posts.length === 0" class="text-gray-600">No blog posts yet.</div>

    <div v-else class="space-y-8">
      <router-link
        v-for="post in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="block border-b pb-8 hover:opacity-70 transition-opacity cursor-pointer"
      >
        <article>
          <h2 class="text-2xl font-semibold mb-2 text-gray-900">{{ post.title }}</h2>
          <p class="text-gray-500 text-sm mb-4">{{ post.tags.join(', ') }}</p>
          <p class="text-gray-500 text-sm mb-4">{{ formatDate(post.date) }}</p>
          <p class="text-gray-700">
            {{ post.preview }}
          </p>
        </article>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const posts = ref<any[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const module = await import('../data/blogPosts')
    posts.value = module.blogPosts
  } catch (e: any) {
    error.value = e.message || 'Failed to load blog posts'
    console.error('Blog loading error:', e)
  } finally {
    loading.value = false
  }
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
