import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home/home.vue";
import User from "../pages/user/user.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/users/:id',
      component: User
    }
  ]
})

export default router