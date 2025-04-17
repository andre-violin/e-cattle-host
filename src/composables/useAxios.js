import api from '@/services/api'
import { ref, toValue, onBeforeMount } from 'vue'
export function useFetchAPI(url) {
  const data = ref(null)
  const error = ref(null)
  console.log('useFetchAPI')

  const fetchData = async () => {
    console.log('fetchData')
    // reset state before fetching
    data.value = null
    error.value = null

    // resolve the url value synchronously so it's tracked as a dependency by watchEffect()
    const urlValue = toValue(url)

    try {
      const res = await api(urlValue)
      data.value = await res.data
    } catch (err) {
      error.value = err
    }
  }

  onBeforeMount(async () => {
    console.log('onBeforeMount')

    await fetchData()
  })

  return { data, error }
}
