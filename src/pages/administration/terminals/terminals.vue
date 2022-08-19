<template>
    <v-container fluid>
      <div class="tables-basic">
        <v-data-table
          :headers="headers"
          :items="getTerminals"
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
              <v-btn color="primary" dark class="mb-2" @click="newItem()">
                Nuevo Tipo de Usuario
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.number`]="{ item }">
            {{item[item.length-1].id_terminal}}
          </template>
          <template v-slot:[`item.survey`]="{ item }">
            {{item[item.length-1].serv_survey.srv_name}}
          </template>campus
          <template v-slot:[`item.campus`]="{ item }">
            {{item[item.length-1].serv_survey.serv_area_headquarter.serv_headquarter.hdq_name}}
          </template>
          <template v-slot:[`item.area`]="{ item }">
            {{item[item.length-1].serv_survey.serv_area_headquarter.serv_area.ars_name}}
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
  },
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Serie", value: "number", sortable: false },
      { text: "Encuesta", value: "survey", sortable: false },
      { text: "Sede", value: "campus", sortable: false },
      { text: "Area", value: "area", sortable: false },
    ],
  }),
  computed: {
    ...mapGetters(["getTerminals"]),
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["addTerminals"]),
    initialize() {
      this.$http
        .get("terminal/survey")
        .then((result) => {
          console.log(result.data)
          this.addTerminals(result.data)
        });
    },
  },
};
</script>

<style src="../Basic.scss" lang="scss"></style>
