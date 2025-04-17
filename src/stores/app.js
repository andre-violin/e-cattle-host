// Utilities
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import packageJson from '../../package.json'
import deviceInfo from '@/utils/userAgent'

export const useAppStore = defineStore('app', async () => {
  // state
  const { vendor, platform, platformVersion, model } = await deviceInfo()
  const device = `${vendor} ${platform} ${platformVersion} ${model}`

  const applicationData = reactive({
    code: packageJson.name + packageJson.version,
    name: packageJson.name,
    description: packageJson.description,
    user: packageJson.author.name,
    email: packageJson.author.email,
    picture: `${packageJson.author.url}/pwa-512x512.png`,
    device
  })

  // actions
  const setApplicationData = () => {
    localStorage.setItem('applicationData', JSON.stringify(applicationData))
  }
  // getters

  return {
    applicationData,
    setApplicationData
  }
})
