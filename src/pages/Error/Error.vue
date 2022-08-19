<template>
  <v-app>
    <v-container fluid class="error-page">
      <v-row class="logo-wrapper">
        <v-img src="@/assets/icons/icon.png" contain width="62" height="48"></v-img>
        <span class="logo-title">Calificadores de servicios</span>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="8">
          <div class="card">
            <!-- <span class="error-logo">Página no encontrada</span> -->
            <p class="error-text">Oops. Parece que la página que estás buscando ya no existe</p>
            <p class="error-subtext">Pero estamos aquí para traerte de vuelta a la seguridad</p>

            <v-btn
                class="text-capitalize"
                dark
                x-large
                :color="config.light.primary"
                to="dashboard"
            >
              Regresar a casa
            </v-btn>
          </div>
        </v-col>
      </v-row>
  </v-container>
  </v-app>
</template>

<script>
import config from '@/config';

export default {
  name: 'Error',
  data(){
    return{
      config
    }
  }
};
</script>

<style src="./Error.scss" lang="scss"></style>
