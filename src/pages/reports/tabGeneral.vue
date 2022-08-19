<template>
    <div>
    <v-card flat tile>
      <v-card-text>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="error"
              class="text-capitalize button-shadow"
              >Reporte</v-btn
            >
          </template>
          <v-list>
            <export-json-excel
              :data="getReport"
              :fields="dataEvent.fields"
              worksheet="My Worksheet"
              name="Calificadores-Servicio"
            >
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>mdi-download</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Descargar en Excel</v-list-item-title>
              </v-list-item>
            </export-json-excel>
          </v-list>
        </v-menu>
      </v-card-text>
    </v-card>
    <v-container fluid>
      <div class="tables-basic">
        <v-data-table
          :headers="headers"
          :items="getReport"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>
<script>
import dataEvent from "./dataEvent";
import "export-json-excel";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
        search:"",
      dataEvent,
      event: {
        id: null,
        site_id: "",
        survey_id: "",
        event_type_id: "",
        careers_id: "",
        campus_id: "",
        evn_name: "",
        evn_description: "",
        evn_miles: 0,
        evn_cost: 0,
        evn_start_day: "",
        evn_end_day: "",
        evn_image: "",
        evn_color: "",
        days: [],
      },
      eventDataReport: [],
      fontAwesome: [],
      materialIcons: [],
      lastReports: [
        { title: "Imprimir PDF", icon: "mdi-printer" },
        { title: "Descargar en Excel", icon: "mdi-download" },
        { title: "Descargar en PDF", icon: "mdi-download" },
        { title: "Enviar por correo", icon: "mdi-email" },
        { title: "Compartir", icon: "mdi-share-variant" },
      ],
      headers: [
        {
          text: "N°",
          align: "start",
          value: "id",
        },
        { text: "Sede", value: "sede" },
        { text: "Area", value: "area" },
        { text: "Encuesta", value: "srv_name" },
        { text: "Pregunta", value: "qst_question" },
        { text: "Respuesta", value: "answer" },
        { text: "Tipo de respuesta", value: "tyAns_name" },
        { text: "Fecha", value: "date_answer" },
        { text: "Hora", value: "time_answer" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getReport"]),
  },
  created() {

  },
  methods: {
  },
};
</script>

<style src="./reports.scss" lang="scss"/>