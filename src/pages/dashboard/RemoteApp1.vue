<template>
  <ComponenteApp1 v-if="!!ComponenteApp1" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const ComponenteApp1 = defineAsyncComponent(
  () => import('remote_app1/ComponenteApp1')
)
</script>
