<template>
  <div>
    <v-container fluid>
      <div class="tables-basic">
        <v-data-table
          :headers="headers"
          :items="getAdministrators"
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
                Nuevo Usuario
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.area_sede`]="{ item }">
            <v-icon small class="mr-2" @click="viewItem(item)">
              mdi-eye
            </v-icon>
            <!-- <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr v-for="(key, index) in item.area_campus" :key="index">
                    <td>
                      {{ key.serv_area_headquarter.serv_area.ars_name }} - {{key.serv_area_headquarter.serv_headquarter.hdq_name}}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table> -->
          </template>
          <template v-slot:[`item.state`]="{ item }">
            <v-chip v-if="item.adm_state == 1" color="green" dark>
              activo
            </v-chip>
            <v-chip v-if="item.adm_state == 0" color="red" dark>
              inactivo
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="red" v-if="item.adm_state == 1" small @click="deleteItem(item)"> mdi-delete </v-icon>
            <v-icon color="green" v-if="item.adm_state == 0" small @click="addItem(item)"> mdi-plus-thick </v-icon>
            <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reiniciar </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-container>
    <DialogAreaSede
      :visible="dialogAreaSede"
      @close="dialogAreaSede = false"
      :infoData="areaSede"
    />
    <DialogCreate
      :visible="dialog"
      @close="dialog = false"
      :editedIndex="editedIndex"
      :infoData="userEstructure"
    />
    <DialogDelete
      :visible="dialogDelete"
      @close="dialogDelete = false"
      @closeConfirm="confirmDeleteItem()"
      :name="userEstructure.adm_name + userEstructure.adm_lastName"
    />
  </div>
</template>
<script>
import DialogAreaSede from "./dialogAreaSede.vue";
import DialogCreate from "./dialogCreate.vue";
import DialogDelete from "../../../components/delete.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DialogAreaSede,
    DialogCreate,
    DialogDelete,
  },
  data: () => ({
    areaSede: [],
    itemUser:{},
    editedIndex: -1,
    dialogAreaSede:false,
    dialogDelete:false,
    dialog:false,
    search: "",
    userEstructure: {
      id_responsable: 1,
      id_type_user: "",
      id_rol: "",
      id_area_campus: [],
      adm_name: "",
      adm_lastName: "",
      adm_email: "",
      adm_password: "",
    },
    headers: [
      { text: "N°", align: 'center', value: "id", sortable: false, },
      { text: "Nombre", value: "adm_name" },
      { text: "Apellido", value: "adm_lastName" },
      { text: "Correo", value: "adm_email" },
      { text: "Tipo de usuario", value: "serv_type_user.tyUsr_name" },
      { text: "Rol", value: "serv_role.rls_name" },
      { text: "Area- Sede ", value:"area_sede" ,sortable: false,},
      { text: "Estado", value: "state" ,sortable: false,},
      { text: "Acciones", value: "actions",sortable: false,},
    ],
  }),
  computed: {
    ...mapGetters([
      "getAdministrators",
    ]),
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions([
      "addCampus",
      "addAdministrators",
      "addTypeUsers",
      "addRoles",
      "addAreasCampus",
      "updateAdministrator"
    ]),
    initialize() {
      console.log(localStorage.getItem("area_campus"))
      // this.$http.get("/campus/1,2,3,4").then((result) => this.addCampus(result.data));
      this.$http.get("/admin/areacampus/"+ window.localStorage.getItem("area_campus")).then((result) =>this.addAdministrators(result.data));
      this.$http.get("/typeuser").then((result) => this.addTypeUsers(result.data));
      this.$http.get("/rol").then((result) => this.addRoles(result.data));
      this.$http.get("/areas/areascampus/"+ window.localStorage.getItem("area_campus")).then((result) => this.addAreasCampus(result.data));
    },
    newItem() {
      this.editedIndex= -1;
      this.dialog=true;
      this.userEstructure.id = undefined;
      this.userEstructure.adm_name = '';
      this.userEstructure.adm_lastName = '';
      this.userEstructure.adm_email = '';
      this.userEstructure.id_area_campus = [];
      this.userEstructure.id_rol = '';
      this.userEstructure.id_type_user = '';
    },
    editItem(item) {
      this.editedIndex = this.getAdministrators.indexOf(item);
      this.dialog = true;
      
      this.userEstructure.id_area_campus = [];

      this.userEstructure.id = item.id;
      this.userEstructure.adm_name = item.adm_name;
      this.userEstructure.adm_lastName = item.adm_lastName;
      this.userEstructure.adm_email = item.adm_email;
      this.userEstructure.id_rol = item.id_rol;
      this.userEstructure.id_type_user = item.id_type_user;

      for (let i = 0; i < item.area_campus.length; i++) {
        this.userEstructure.id_area_campus.push(item.area_campus[i].id_area_campus);
      }
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.userEstructure.id_area_campus = [];

      this.userEstructure.id = item.id;
      this.userEstructure.adm_name = item.adm_name;
      this.userEstructure.adm_lastName = item.adm_lastName;
      this.userEstructure.adm_email = item.adm_email;
      this.userEstructure.id_rol = item.id_rol;
      this.userEstructure.id_type_user = item.id_type_user;

      for (let i = 0; i < item.area_campus.length; i++) {
        this.userEstructure.id_area_campus.push(item.area_campus[i].id_area_campus);
      }
    },
    confirmDeleteItem(){
      this.$http.put('/admin/update/'+this.userEstructure.id, {
        id_responsable:1,
        id_type_user:this.userEstructure.id_type_user,
        id_rol:this.userEstructure.id_rol,
        id_area_campus: this.userEstructure.id_area_campus,
        adm_name:this.userEstructure.adm_name,
        adm_lastName:this.userEstructure.adm_lastName,
        adm_email:this.userEstructure.adm_email,
        adm_state:'0'
      })
      .then((result) => {
        this.dialogDelete = false
        this.updateAdministrator(result.data)
      })
    },
    viewItem(item){
      this.areaSede = item.area_campus;
      this.dialogAreaSede = true
    },
    addItem(item){
      this.userEstructure.id_area_campus = [];
      for (let i = 0; i < item.area_campus.length; i++) {
        this.userEstructure.id_area_campus.push(item.area_campus[i].id_area_campus);
      }

      this.$http.put('/admin/update/'+item.id, {
        id_responsable:1,
        id_type_user:item.id_type_user,
        id_rol:item.id_rol,
        id_area_campus: this.userEstructure.id_area_campus,
        adm_name:item.adm_name,
        adm_lastName:item.adm_lastName,
        adm_email:item.adm_email,
        adm_state:'1'
      })
      .then((result) => {
        this.updateAdministrator(result.data)
      })
    }
  },
};
</script>

<style src="../Basic.scss" lang="scss"></style>
