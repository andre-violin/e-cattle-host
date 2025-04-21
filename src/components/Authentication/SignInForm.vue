<template>
  <v-card class="mx-auto pa-8" elevation="8" min-width="448" rounded="lg">
    <v-form fast-fail @submit.prevent ref="form">
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>

      <v-text-field
        type="email"
        placeholder="Endereço de Email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="email"
        :rules="emailRules"
        counter="80"
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
        @click="connectUserAndGoToDashboard"
      >
        Enviar
      </v-btn>
    </v-form>
  </v-card>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { encrypteData } from '@/utils/crypto'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const storeLoggeInUser = useUserStore()

const visible = ref(false)

const form = ref()

const email = ref('')
const emailRules = ref([
  value => !!value || 'Email é obrigatório!',
  value =>
    (value && value.length <= 80) || 'O email deve ter 80 caracteres ou menos.',
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
  const { valid } = await form.value.validate()

  if (valid) return true

  if (form.value.errors.length > 0) {
    document.getElementById(form.value.errors[0].id).focus()
    return false
  }
}

async function connectUserAndGoToDashboard() {
  if (validate()) {
    const users = await JSON.parse(localStorage.getItem('users') || '[]')
    const userAlreadyExists = users.find(usr => usr.email === email.value)

    if (!users || !userAlreadyExists) {
      emailRules.value = ['O email não foi encontrado, tente outro!']
      email.value = ''
      document.getElementById('email').focus()
    } else if (userAlreadyExists.password === encrypteData(password.value)) {
      storeLoggeInUser.setLoggedInUser(JSON.stringify(userAlreadyExists))

      router.go('/dashboard')
    } else {
      passwordRules.value = ['Senha incorreta!']
      document.getElementById('password').focus()
    }
  }
}
</script>
