/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts
})

router.beforeResolve((to, from) => {
  const loggedInUser = useUserStore().getLoggedInUser()

  if (loggedInUser && to.name === '/') {
    return { path: 'dashboard/apphome' }
  }
  if (!loggedInUser && to.name !== '/') {
    return { path: '/' }
  }
})
export default router
