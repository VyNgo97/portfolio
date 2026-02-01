<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div v-if="post">
      <router-link
        to="/blog"
        class="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-8"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </router-link>

      <article>
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          {{ post.title }}
        </h1>
        <p class="text-gray-500 mb-8">{{ formatDate(post.date) }}</p>

        <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <div v-html="renderedContent"></div>
        </div>
      </article>
    </div>

    <div v-else class="text-center py-12">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Blog post not found</h2>
      <router-link to="/blog" class="text-blue-600 hover:text-blue-800 underline">
        Return to blog
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { getBlogPostBySlug } from '../data/blogPosts'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const post = computed(() => getBlogPostBySlug(slug.value))

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

const renderedContent = computed(() => {
  if (!post.value) return ''
  return marked(post.value.content)
})
</script>
