// import { ref } from 'vue'
// import api from '@/services/api'

// import { useQRTokenStore } from '@/stores/qrToken'
// import { storeToRefs } from 'pinia'

// export const useAPI = () => {
//   const data = ref({})
//   const error = ref({})
//   const token = ref('')
//   const { appIsRegistered } = storeToRefs(useQRTokenStore())
//   const appToken = ref(localStorage.getItem(import.meta.env.VITE_KEY_QRTOKEN))

//   async function callToAPI(url, method = 'get', fields = {}) {
//     data.value = {}
//     error.value = {}

//     token.value =
//       appIsRegistered.value ||
//       url !== '/totem/application/connect' ||
//       appToken.value
//     console.log('useAPI: token? ', token.value)
//     try {
//       const res = await api({
//         method,
//         url,
//         data: fields,
//         headers: { Authorization: token.value }
//       })
//       data.value = await res.data
//     } catch (err) {
//       error.value = err
//       console.log('useAPI ERROR: ', error.value, err)
//     }
//     console.log('useAPI LOGGED: ', appIsRegistered.value)
//   }

//   return { data, error, callToAPI }
// }

import { ref } from 'vue'
import api from '@/services/api'

// import { useApplicationToken } from '@/stores/storeToken'
// import { storeToRefs } from 'pinia'

export const useAPI = () => {
  const data = ref({})
  const error = ref({})
  // const { tokenApplication } = useApplicationToken()
  // const { appIsRegistered } = storeToRefs(useApplicationToken())
  // const token = ref(localStorage.getItem(import.meta.env.VITE_KEY_QRTOKEN))

  async function callToAPI(url, method = 'get', fields = {}, token) {
    data.value = {}
    error.value = {}

    try {
      const res = await api({
        method,
        url,
        data: fields,
        headers: { Authorization: token }
      })
      data.value = await res.data
      localStorage.setItem(import.meta.env.VITE_KEY_APP_TOKEN, res.data.token)
    } catch (err) {
      error.value = err
    }
  }

  return { data, error, callToAPI }
}
