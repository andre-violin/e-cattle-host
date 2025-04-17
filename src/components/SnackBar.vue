<template>
  <v-snackbar v-model="snackbar" :color="color" vertical timeout="-1">
    <div class="text-subtitle-1 pb-2">{{ title }}</div>

    <p>{{ text }}</p>

    <template v-slot:actions>
      <v-btn variant="text" @click="closeSnackBar"> Fechar </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  title: String,
  text: String,
  color: String,
  path: String,
  modelValue: { type: Boolean, required: true }
})
const snackbar = ref(props.modelValue)

function closeSnackBar() {
  console.log(props.path)
  snackbar.value = false
  if (props.path === '/dashboard/apphome') router.push(props.path)
  else return false
}
</script>
