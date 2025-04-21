<template>
  <ComponentApp1 v-if="!!ComponentApp1" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const ComponentApp1 = defineAsyncComponent(
  () => import('remote_app1/ComponentApp1')
)
</script>
