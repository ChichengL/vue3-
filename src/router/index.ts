// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'
export const router = createRouter({
  history: createWebHistory(),
  routes:constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
