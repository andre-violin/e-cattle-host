import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useQRTokenStore = defineStore('qrtoken', () => {
  // state
  const token = ref('')
  const ip = ref('')
  const appIsRegistered = ref(localStorage.getItem('appIsRegistered'))
  // actions
  const setQRToken = (qrTokenKey, qrTokenValue, ipKey, ipValue) => {
    localStorage.setItem(ipKey, ipValue)
    localStorage.setItem(qrTokenKey, qrTokenValue)
    token.value = qrTokenValue
    ip.value = ipValue
    registerApp(true)
    // console.log('QR Token set to: ', token.value)
  }
  const registerApp = register => {
    appIsRegistered.value = register
    localStorage.setItem('appIsRegistered', appIsRegistered.value)
  }
  // getters
  const logged = computed(() => localStorage.getItem('appIsRegistered'))

  return {
    appIsRegistered,
    setQRToken,
    logged
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQRTokenStore, import.meta.hot))
}
