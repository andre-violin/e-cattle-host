<template>
  <v-responsive>
    <v-app>
      <v-layout row wrap>
        <NavigationBars v-once />
        <v-main>
          <router-view />
        </v-main>
      </v-layout>
    </v-app>
  </v-responsive>
</template>

<script setup></script>
