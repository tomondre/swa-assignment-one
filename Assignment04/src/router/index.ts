import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/Profile.vue'
import PlayView from '../views/PlayView.vue'
import HighScoresView from '../views/HighScoresView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/high-scores',
      name: 'high-scores',
      component: HighScoresView
    },
    {
      path: '/play',
      name: 'play',
      component: PlayView
    }
  ]
})

export default router
