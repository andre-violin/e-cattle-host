import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('useStore', () => {
  const loggedInUser = reactive({})

  const getLoggedInUser = () => {
    return loggedInUser.value || localStorage.getItem('loggedInUser')
  }

  const setLoggedInUser = user => {
    loggedInUser.value = user
    localStorage.setItem('loggedInUser', user)
  }

  const logout = () => {
    loggedInUser.value = {}
    localStorage.removeItem('loggedInUser')
  }

  return { loggedInUser, getLoggedInUser, setLoggedInUser, logout }
})
