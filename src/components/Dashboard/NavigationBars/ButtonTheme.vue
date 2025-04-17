<template>
  <v-btn
    :icon="
      theme.global.current.value.dark
        ? 'mdi-weather-sunny'
        : 'mdi-weather-night'
    "
    @click="toggleTheme"
  ></v-btn>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem('theme', theme.global.name.value)
}
</script>
