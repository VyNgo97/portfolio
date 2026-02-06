import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../pages/Blog.vue')
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('../pages/BlogPost.vue')
  },
  {
    path: '/will-you-be-my-valentine',
    name: 'Valentine',
    component: () => import('../pages/Valentine.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
