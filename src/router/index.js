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

// router.beforeEach((to, from, next) => {
//   const loggedInUser = useUserStore().getLoggedInUser()

//   if (!loggedInUser && to.matched[0].path === '/dashboard') {
//     next('/')
//   } else if (loggedInUser && to.name === '/') {
//     next('/dashboard/apphome')
//   }
//   next()
// })

router.beforeResolve((to, from) => {
  // const appToken = !!storeAppToken.tokenApplication
  const loggedInUser = useUserStore().getLoggedInUser()

  // const loggedInUser = !!localStorage.getItem('loggedInUser')

  if (loggedInUser && to.name === '/') {
    return { path: 'dashboard/apphome' }
  }
  if (!loggedInUser && to.name !== '/') {
    return { path: '/' }
  }
})
export default router
