<template>
    <v-container fluid>
      <div class="tables-basic">
        <v-data-table
          :headers="headers"
          :items="getTerminalSurvey"
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
          <template v-slot:[`item.id`]="{ item }">
            {{item[item.length-1].id}}
          </template>
          <template v-slot:[`item.serie`]="{ item }">
            {{item[item.length-1].id_terminal}}
          </template>
          <template v-slot:[`item.encuesta`]="{ item }">
            {{item[item.length-1].serv_survey.srv_name}}
          </template>
          <template v-slot:[`item.sede`]="{ item }">
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
  data: () => ({
    search: "",
    editedIndex: -1,
    dialog: false,
    dialogDelete: false,
    terminalEstructure:{
      trm_serie:''
    },
    headers: [
      { text: "Id", value: "id", sortable: false },
      { text: "Serie", value: "serie", sortable: false },
      { text: "Encuesta", value: "encuesta", sortable: false },
      { text: "Sede", value: "sede", sortable: false },
      { text: "Area", value: "area", sortable: false },
    ],
  }),
  computed: {
    ...mapGetters(["getTerminalSurvey"]),
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["addTerminalSurvey","updateTerminal"]),
    initialize() {
      this.$http.get("terminal/survey").then((result) => {
        console.log(result.data);
        this.addTerminalSurvey(result.data);
      });
    },
  },
};
</script>

<style src="../Basic.scss" lang="scss"></style>
