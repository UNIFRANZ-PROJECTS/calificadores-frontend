<template>
  <div>
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
                Nueva Terminal
              </v-btn>
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="red" v-if="item.trm_state == 1" small @click="deleteItem(item)"> mdi-delete </v-icon>
            <v-icon color="green" v-if="item.trm_state == 0" small @click="addItem(item)"> mdi-plus-thick </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-container>
    <DialogCreate
      :visible="dialog"
      @close="dialog = false"
      :editedIndex="editedIndex"
      :infoData="terminalEstructure"
    />
    <DialogDelete
      :visible="dialogDelete"
      @close="dialogDelete = false"
      @closeConfirm="confirmDeleteItem()"
      :name="terminalEstructure.trm_serie"
    />
  </div>
</template>
<script>
import DialogCreate from "./dialogCreate.vue";
import DialogDelete from "../../../components/delete.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DialogCreate,
    DialogDelete
  },
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
    newItem() {
      this.editedIndex = -1;
      this.dialog = true;
      this.terminalEstructure.id = undefined;
      this.terminalEstructure.trm_serie = "";
    },
    editItem(item) {
      this.editedIndex = this.getTerminals.indexOf(item);
      this.dialog = true;

      this.terminalEstructure.id = item.id;
      this.terminalEstructure.trm_serie = item.trm_serie;
      this.terminalEstructure.trm_state = item.trm_state;

    },
    addItem(item){

      this.$http.put('/terminal/update/'+item.id, {
        trm_serie:item.trm_serie,
        trm_state:'1'
      })
      .then((result) => {
        this.updateTerminal(result.data.terminal)
      })
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.terminalEstructure.id = item.id;
      this.terminalEstructure.trm_serie = item.trm_serie;
      this.terminalEstructure.trm_state = item.trm_state;
    },
    confirmDeleteItem(){
      this.$http.put('/terminal/update/'+this.terminalEstructure.id, {
        trm_serie:this.terminalEstructure.trm_serie,
        trm_state:'0'
      })
      .then((result) => {
        console.log(result)
        this.dialogDelete = false
        this.updateTerminal(result.data.terminal)
      })
    },
  },
};
</script>

<style src="../Basic.scss" lang="scss"></style>
