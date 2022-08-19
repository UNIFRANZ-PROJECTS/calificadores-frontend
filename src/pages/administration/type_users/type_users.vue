<template>
  <div>
    <v-container fluid>
      <div class="tables-basic">
        <v-data-table
          :headers="headers"
          :items="getTypeUsers"
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
          <template v-slot:[`item.state`]="{ item }">
            <v-chip v-if="item.tyUsr_state == 1" color="green" dark>
              activo
            </v-chip>
            <v-chip v-if="item.tyUsr_state == 0" color="red" dark>
              inactivo
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="red" v-if="item.tyUsr_state == 1" small @click="deleteItem(item)"> mdi-delete </v-icon>
            <v-icon color="green" v-if="item.tyUsr_state == 0" small @click="addItem(item)"> mdi-plus-thick </v-icon>
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
      :infoData="typeUsersEstructure"
    />
    <DialogDelete
      :visible="dialogDelete"
      @close="dialogDelete = false"
      @closeConfirm="confirmDeleteItem()"
      :name="typeUsersEstructure.tyUsr_name"
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
    typeUsersEstructure: {
      tyUsr_name: "",
    },
    headers: [
      {
        text: "N°",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Tipo de usuario", value: "tyUsr_name" },
      { text: "Estado", value: "state", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapGetters(["getTypeUsers"]),
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["addTypeUsers","updateTypeUser"]),
    initialize() {
      this.$http
        .get("typeuser")
        .then((result) => {
          console.log(result.data)
          this.addTypeUsers(result.data)
        });
    },
    newItem() {
      this.editedIndex= -1;
      this.dialog=true;
      this.typeUsersEstructure.id = undefined;
      this.typeUsersEstructure.tyUsr_name = '';
    },
    editItem(item) {
      this.editedIndex = this.getTypeUsers.indexOf(item);
      this.dialog = true;
      this.typeUsersEstructure.id = item.id;
      this.typeUsersEstructure.tyUsr_name = item.tyUsr_name;
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.typeUsersEstructure.id = item.id;
      this.typeUsersEstructure.tyUsr_name = item.tyUsr_name;
    },
    confirmDeleteItem() {
      this.$http
          .put("/typeuser/update/"+ this.typeUsersEstructure.id, {
            tyUsr_state:0
          })
          .then((result) => {
            this.dialogDelete = false;
            this.updateTypeUser(result.data.typeuser);
          });
    },
    addItem(item){
      this.$http
          .put("/typeuser/update/"+ item.id, {
            tyUsr_state:1
          })
          .then((result) => {
            this.updateTypeUser(result.data.typeuser);
          });
    }
  },
};
</script>

<style src="../Basic.scss" lang="scss"></style>
