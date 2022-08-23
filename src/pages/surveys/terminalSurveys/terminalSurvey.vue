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
            </v-toolbar>
          </template>
          <template v-slot:[`item.state`]="{ item }">
            <v-chip v-if="item.trm_state == 1" color="green" dark>
              activo
            </v-chip>
            <v-chip v-if="item.trm_state == 0" color="red" dark>
              inactivo
            </v-chip>
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
      { text: "Serie", value: "trm_serie", sortable: false },
      { text: "Estado", value: "state" ,sortable: false,},
      { text: "Acciones", value: "actions",sortable: false,},
    ],
  }),
  computed: {
    ...mapGetters(["getTerminals"]),
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["addTerminals","updateTerminal"]),
    initialize() {
      this.$http.get("terminal").then((result) => {
        console.log(result.data);
        this.addTerminals(result.data);
      });
    },
  },
};
</script>

<style src="../Basic.scss" lang="scss"></style>
