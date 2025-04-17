<template>
  <v-responsive>
    <v-app>
      <v-layout row wrap>
        <v-main>
          <router-view />
        </v-main>
        <FooterBar v-once />
      </v-layout>
    </v-app>
  </v-responsive>
</template>

<script setup>
//
</script>
