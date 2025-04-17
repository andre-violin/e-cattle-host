<template>
  <div class="pa-4">
    <!-- <v-img
      class="mx-auto my-6"
      max-width="150"
      src="../../assets/eCattle.png"
    ></v-img> -->

    <v-card class="mx-auto pa-8" elevation="8" min-width="448" rounded="lg">
      <v-form fast-fail @submit.prevent ref="form">
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>

        <v-text-field
          placeholder="Digite seu nome completo"
          prepend-inner-icon="mdi-account-circle-outline"
          variant="outlined"
          v-model="name"
          :rules="nameRules"
          counter="120"
          id="name"
          required
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          type="email"
          placeholder="Endereço de Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
          :rules="emailRules"
          counter="50"
          id="email"
          required
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Senha
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="Digite sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="password"
          :rules="passwordRules"
          id="password"
          required
          title="A senha deve ter ao menos 6 caracteres."
        ></v-text-field>

        <v-btn
          :loading="loading"
          class="my-8"
          color="primary"
          size="large"
          variant="tonal"
          type="submit"
          block
          @click="saveToLocalstorage"
        >
          Enviar
        </v-btn>

        <!-- <v-card-text class="text-center">
          <a
            class="text-tertiary text-decoration-none"
            href="/signin"
            rel="noopener noreferrer"
          >
            <v-icon icon="mdi-arrow-left"></v-icon> Já tenho uma conta
          </a>
        </v-card-text> -->
      </v-form>
    </v-card>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { encrypteData } from '@/utils/crypto'
import { onMounted, ref } from 'vue'

const router = useRouter()
const visible = ref(false)
const form = ref()

const name = ref('')
const nameRules = ref([
  value => !!value || 'Nome é obrigatório!',
  value =>
    (value && value.length <= 120) ||
    'O nome deve ter 120 caracteres ou menos.',
  value =>
    (value && value.length >= 2) || 'O nome deve ter ao menos 2 caracteres.'
])

const email = ref('')
const emailRules = ref([
  value => !!value || 'Email é obrigatório!',
  value =>
    (value && /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) ||
    'Deve ser um e-mail válido.'
])

const password = ref('')
const passwordRules = ref([
  value => !!value || 'Senha é obrigatória!',
  value =>
    (value && value.length >= 6) || 'A senha deve ter ao menos 6 caracteres.'
])

async function validate() {
  const { valid, errors } = await form.value.validate()

  if (errors.length > 0) {
    document.getElementById(form.value.errors[0].id).focus()
    return false
  }
  return valid
}

async function saveToLocalstorage() {
  const fieldsAreValid = await validate()
  if (fieldsAreValid) {
    const users = await JSON.parse(localStorage.getItem('users') || '[]')

    const userAlreadyExists = users.find(usr => usr.email === email.value)

    if (users.length) {
      if (userAlreadyExists) {
        emailRules.value = ['Email já foi cadastrado, tente outro!']
        email.value = ''
        document.getElementById('email').focus()
      }
    }

    if (!userAlreadyExists) {
      const user = {
        name: name.value,
        email: email.value,
        password: encrypteData(password.value)
      }
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users))
      form.value.reset()
      router.push('/')
    }
  }
}

onMounted(() => {
  document.getElementById('name').focus()
})
</script>
