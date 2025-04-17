// // Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppBarTitle = defineStore('appbartitle', () => {
  // state
  const barTitle = ref('Home')

  // getters
  const appBarTitle = computed(() => barTitle.value)

  // actions
  function setAppBarTitle(appTitle) {
    barTitle.value = appTitle
  }

  return {
    barTitle,
    appBarTitle,
    setAppBarTitle
  }
})
