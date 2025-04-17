<script setup>
import { useAppBarTitle } from '@/stores/appBarTitle'
import { storeToRefs } from 'pinia'

const storeAppBar = useAppBarTitle()
const { appBarTitle } = storeToRefs(storeAppBar)
</script>

<template>
  <v-app-bar
    class="position-fixed"
    :elevation="0"
    scroll-behavior="elevate"
    color="background"
  >
    <template v-slot:prepend>
      <slot />
    </template>

    <v-app-bar-title>{{ appBarTitle }}</v-app-bar-title>

    <template v-slot:append>
      <ButtonTheme />
    </template>
  </v-app-bar>
</template>
