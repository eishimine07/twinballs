import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '@/views/MainMenu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main-menu',
      component: MainMenu
    },
    {
      path: '/game/levels',
      name: 'levels',
      component: () => import('@/views/LevelsView.vue')
    },
    {
      path: '/game/levels/:id',
      name: 'game',
      component: () => import('@/views/GameView.vue')
    }
  ]
})

export default router
