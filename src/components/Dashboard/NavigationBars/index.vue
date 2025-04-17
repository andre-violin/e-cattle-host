<template>
  <DrawerBar :drawer="isDrawerOpen" />
  <ApplicationBar>
    <v-app-bar-nav-icon
      @click="isDrawerOpen = !isDrawerOpen"
    ></v-app-bar-nav-icon>
  </ApplicationBar>
</template>

<script setup>
import { ref } from 'vue'
const isDrawerOpen = ref(!(window.screen.width <= 960))
</script>
