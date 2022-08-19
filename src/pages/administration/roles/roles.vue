<template>
  <div>
    <v-container fluid>
      <div class="tables-basic">
        <v-data-table
          :headers="headers"
          :items="getRolPermisions"
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
                Nuevo Rol
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.permisions`]="{ item }">
            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr v-for="(key, index) in item.permision" :key="index">
                    <td>
                      {{ key.serv_permision.prm_name }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
          <template v-slot:[`item.state`]="{ item }">
            <v-chip v-if="item.rls_state == 1" color="green" dark>
              activo
            </v-chip>
            <v-chip v-if="item.rls_state == 0" color="red" dark>
              inactivo
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>

            <v-icon color="red" v-if="item.rls_state == 1" small @click="deleteItem(item)"> mdi-delete </v-icon>
            <v-icon color="green" v-if="item.rls_state == 0" small @click="addItem(item)"> mdi-plus-thick </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-container>
  <DialogCreate 
  :visible="dialog"
  @close="dialog=false"
  :editedIndex="editedIndex"
  :infoData="rolEstructure"/>
  <DialogDelete
    :visible="dialogDelete"
    @close="dialogDelete=false"
    @closeConfirm="confirmDeleteItem()"
    :name="rolEstructure.rls_name"
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
    // item:{},
    dialog:false,
    editedIndex: -1,
    search: "",
    rolEstructure: {
      id:'',
      rls_name: "",
      rls_permisions: [],
      rls_state:""
    },
    dialogCreateRol: false,
    dialogDelete: false,
    headers: [
      {
        text: "N°",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Nombre", value: "rls_name" },
      { text: "Permisos", value: "permisions" },
      { text: "Estado", value: "state",sortable: false },
      { text: "Acciones", value: "actions",sortable: false },
    ],
  }),
  computed: {
    ...mapGetters(["getRolPermisions"]),
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["addPermisions", "addRolPermisions", "updateRolPermision"]),
    initialize() {
      this.$http
        .get("permision")
        .then((result) => this.addPermisions(result.data));
      this.$http
        .get("/rol/permisions")
        .then((result) => this.addRolPermisions(result.data));
    },
    newItem() {
      this.editedIndex= -1;
      this.dialog=true;
      this.rolEstructure.id = undefined;
      this.rolEstructure.rls_name = '';
      this.rolEstructure.rls_permisions = [];
    },
    editItem(item) {
      this.editedIndex = this.getRolPermisions.indexOf(item);
      this.dialog = true;
      this.rolEstructure.rls_permisions = [];
      this.rolEstructure.id = item.id;
      this.rolEstructure.rls_name = item.rls_name;
      this.rolEstructure.rls_state = item.rls_state;
      for (let i = 0; i < item.permision.length; i++) {
        this.rolEstructure.rls_permisions.push(item.permision[i].serv_permision.id);
      }
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.rolEstructure.rls_permisions = [];
      this.rolEstructure.id = item.id;
      this.rolEstructure.rls_name = item.rls_name;
      this.rolEstructure.rls_state = item.rls_state;
      console.log(item.permision)
      for (let i = 0; i < item.permision.length; i++) {
        this.rolEstructure.rls_permisions.push(item.permision[i].serv_permision.id);
      }
      console.log(this.rolEstructure.rls_permisions)
    },
    confirmDeleteItem(){
      this.$http.put('/rol/update/'+this.rolEstructure.id, {
        rls_name:this.rolEstructure.rls_name,
        rls_permisions: this.rolEstructure.rls_permisions,
        rls_state:"0"
      })
      .then((result) => {
        this.dialogDelete = false
        this.updateRolPermision(result.data)
      })
    },
    addItem(item){
      this.rolEstructure.rls_permisions = [];
      console.log(item.permision)
      for (let i = 0; i < item.permision.length; i++) {
        this.rolEstructure.rls_permisions.push(item.permision[i].serv_permision.id);
      }
      this.$http.put('/rol/update/'+item.id, {
        rls_name:item.rls_name,
        rls_permisions: this.rolEstructure.rls_permisions,
        rls_state:"1"
      })
      .then((result) => {
        this.dialogDelete = false
        this.updateRolPermision(result.data)
      })
    },

    clearVariable(val) {
      if (val == "nombre") this.rolEstructure.rls_name = "";
    },
  },
};
</script>

<style src="../Basic.scss" lang="scss"></style>
