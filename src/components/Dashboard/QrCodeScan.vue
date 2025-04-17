<script setup>
import { useAPI } from '@/composables/useAPI'
import { useQRTokenStore } from '@/stores/qrToken'
import { computed, reactive, ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useRouter } from 'vue-router'
import packageJson from '../../../package.json'
import deviceInfo from '../../utils/userAgent'

const qrTokenStore = useQRTokenStore()
const { setQRToken } = qrTokenStore

const { callToAPI, data, error } = useAPI()

const router = useRouter()
const isValid = ref(undefined)
const paused = ref(false)
const result = ref(null)
const errorScan = ref('')

const validationPending = computed(
  () => isValid.value === undefined && paused.value
)

const validationSuccess = computed(() => isValid.value === true)
const validationFailure = computed(() => isValid.value === false)

function resetValidationState() {
  isValid.value = undefined
}

function onError(err) {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    errorScan.value += 'você precisa conceder permissão de acesso à câmera'
  } else if (err.name === 'NotFoundError') {
    errorScan.value += 'nenhuma câmera neste dispositivo'
  } else if (err.name === 'NotSupportedError') {
    errorScan.value += 'contexto seguro necessário (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    errorScan.value += 'a câmera já está em uso?'
  } else if (err.name === 'OverconstrainedError') {
    errorScan.value += 'câmeras instaladas não são adequadas'
  } else if (err.name === 'StreamApiNotSupportedError') {
    errorScan.value += 'A API de fluxo não é suportada neste navegador'
  } else if (err.name === 'SyntaxError') {
    errorScan.value +=
      'Unexpected number in JSON at position 1 (line 1 column 2)'
  } else if (err.name === 'InsecureContextError') {
    errorScan.value +=
      'O acesso à câmera só é permitido em contexto seguro. Use HTTPS ou localhost em vez de HTTP.'
  } else {
    errorScan.value += err.message
  }
  // isValid.value = false
}

async function onDetect([firstDetectedCode]) {
  const tokenApplication = localStorage.getItem('appIsRegistered') || false
  // data.value = {}
  errorScan.value = ''
  result.value = firstDetectedCode.rawValue
  paused.value = true
  await timeout(300)
  isValid.value = result.value.startsWith('{"ip"') && !tokenApplication

  if (isValid.value) {
    result.value = await JSON.parse(result.value)
    const { ip, token } = await result.value
    const { vendor, platform, platformVersion, model } = await deviceInfo()
    const device = `${vendor} ${platform} ${platformVersion} ${model}`

    const applicationData = reactive({
      code: packageJson.name + packageJson.version,
      name: packageJson.name,
      description: packageJson.description,
      user: packageJson.author.name,
      email: packageJson.author.email,
      picture: `${packageJson.author.url}/logo.png`,
      device
    })

    // pretend it's taking really long
    if (ip && token) {
      await callToAPI(
        '/totem/application/connect',
        'post',
        applicationData,
        token
      )

      console.log('Validation Success', validationSuccess)
      console.log('Validation Failure', validationFailure)

      if (error.value.status === 401 || data.value.token === undefined) {
        console.log('error.value: ', error.value)
        isValid.value = false
      } else {
        console.log('data.value: ', data.value)
        setQRToken(import.meta.env.VITE_KEY_QRTOKEN, token, 'ip', ip)
        isValid.value = true
        await timeout(300)
        paused.value = true
      }
      // router.push({ path: '/dashboard/apphome' })
    } else {
      router.push({ path: '/dashboard/registerapp' })
    }
  } else {
    console.log(result.value.startsWith('{"ip"') && !!tokenApplication)
    await timeout(2000)

    result.value = undefined
    paused.value = false
  }
}

function timeout(ms) {
  return new Promise(resolve => {
    window.setTimeout(resolve, ms)
  })
}
</script>

<template>
  <qrcode-stream
    v-if="!validationFailure"
    class="d-flex justify-center align-center"
    :paused="paused"
    @detect="onDetect"
    @error="onError"
    @camera-on="resetValidationState"
  >
    <div
      v-if="validationSuccess"
      class="h-100 d-flex flex-column justify-center align-center bg-secondary-container text-secondary opacity-50"
    >
      <h4>Token válido!</h4>
      <p>
        A aplicação foi registrada no BigBoxx, agora você tem acesso aos dados
        sensoriais de sua propriedade!
      </p>
    </div>
    <v-overlay
      v-model="validationFailure"
      class="d-flex flex-column align-center justify-center"
      scrim="red"
      contained
    >
      <h3 class="text-secondary">Token inválido!</h3>
      <p class="text-overline">
        Tente novamente com outro código ou certifique-se de que a aplicação não
        está cadastrada!
      </p>
    </v-overlay>
    <SnackBar
      v-if="validationFailure"
      title="QRCode Inválido"
      :text="errorScan || 'Token inválido ou expirado!'"
      v-model="validationFailure"
      color="error"
      path="/dashboard/registerapp"
    />
    <SnackBar
      v-if="validationSuccess"
      title="Aplicação registrada com sucesso!"
      text="A aplicação foi registrada no BigBoxx, agora você tem acesso aos dados sensoriais da propriedade!"
      v-model="validationSuccess"
      color="success"
      path="/dashboard/apphome"
    />
    <div
      v-if="validationPending"
      class="h-100 d-flex justify-center align-center text-h5 bg-tertiaryContainer text-tertiary opacity-60"
    >
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
  </qrcode-stream>
</template>
