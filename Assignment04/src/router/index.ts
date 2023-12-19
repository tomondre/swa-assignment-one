import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import PlayView from '../views/PlayView.vue'
import HighScoresView from '../views/HighScoresView.vue'
import {authenticated} from '../services/user.service'

const isAuthenticated = () => {
  if (!authenticated()) {
    router.push({ path: "/" });
    return false;
  }
  return true;
};

const loggedInGuard = () => {
  if (authenticated()) {
    router.push({ path: "/profile" });
    return false;
  }
  return true;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter:[loggedInGuard]
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter:[isAuthenticated]
    },
    {
      path: '/high-scores',
      name: 'high-scores',
      component: HighScoresView,
      beforeEnter:[isAuthenticated]
    },
    {
      path: '/play',
      name: 'play',
      component: PlayView,
      beforeEnter:[isAuthenticated]
    }
  ]
})

export default router
