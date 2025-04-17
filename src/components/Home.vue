<template>
  <v-container fluid class="w-100 pa-0 d-flex justify-center" height="100%">
    <v-row no-gutters>
      <v-col cols="12" md="6" height="100vh">
        <v-sheet
          height="100vh"
          class="bg-surface-dim d-flex flex-column justify-center pa-6 pa-sm-8 pa-md-16"
        >
          <div>
            <v-img class="" max-width="250" src="../assets/eCattle.png"></v-img>
          </div>
          <div class="mt-10">
            <v-btn class="w-33 w-md-25 mr-8" color="primary" variant="outlined"
              >Cadastrar

              <v-overlay activator="parent" class="align-center justify-center">
                <SignUpForm />
              </v-overlay>
            </v-btn>
            <v-btn class="w-33 w-md-25 md:w-25" color="primary" variant="flat"
              >Acessar

              <v-overlay activator="parent" class="align-center justify-center">
                <SignInForm />
              </v-overlay>
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6" height="100vh">
        <v-sheet
          height="100vh"
          class="hero text-white d-flex flex-column justify-center align-center pa-6 pa-sm-8 pa-md-16"
        >
          <div class="w-100 d-flex">
            <h1>Plataforma e-Cattle</h1>
          </div>
          <div class="w-100 text-caption">
            <p>
              A Plataforma e-Cattle é uma infraestrutura de IoT de baixo custo
              para monitoramento e automação de propriedades produtoras de carne
              bovina. Baseia-se na integração de diversos produtos voltados à
              pecuária de precisão, abordando o uso de sensores para captura de
              dados em campo, processamento em softwares de monitoramento e
              automação no manejo pecuário.
            </p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import SignInForm from './Authentication/SignInForm.vue'
</script>

<style lang="scss" scoped>
.hero {
  background-image:
    linear-gradient(
      rgba(var(--v-theme-on-secondary-fixed), 0.8),
      rgba(var(--v-theme-on-secondary-fixed-variant), 0.8)
    ),
    url('../assets/pexels-egorghetto.jpg');
  background-size: cover;
  background-position: center;
}
</style>
