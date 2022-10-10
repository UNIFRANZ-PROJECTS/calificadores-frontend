<template>
  <div>
    <v-container fluid>
      <div class="tables-basic">
        <v-data-table
          :headers="headers"
          :items="getAreaCampus"
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
              <v-btn color="primary" dark class="mb-2" @click="dialogAreas()">
                Todas las áreas
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark class="mb-2" @click="newItem()">
                Asignar Área con sede 
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.state`]="{ item }">
            <v-chip v-if="item.arsHdq_state == 1" color="green" dark>
              activo
            </v-chip>
            <v-chip v-if="item.arsHdq_state == 0" color="red" dark>
              inactivo
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon
              color="red"
              v-if="item.arsHdq_state == 1"
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
            <v-icon
              color="green"
              v-if="item.arsHdq_state == 0"
              small
              @click="addItem(item)"
            >
              mdi-plus-thick
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-container>
    <DialogAllAreas
      :visible="dialogAllAreas"
      @close="dialogAllAreas = false"
      :infoData="areaCampusEstructure"
    />
    <DialogCreate
      :visible="dialog"
      @close="dialog = false"
      :editedIndex="editedIndex"
      :infoData="areaCampusEstructure"
    />
    <DialogDelete
      :visible="dialogDelete"
      @close="dialogDelete = false"
      @closeConfirm="confirmDeleteItem()"
      :name="areaCampusEstructure.ars_name"
    />
  </div>
</template>

<script>
import DialogCreate from "./dialogCreate.vue";
import DialogDelete from "../../../components/delete.vue";
import DialogAllAreas from "./dialogAllAreas.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DialogCreate,
    DialogDelete,
    DialogAllAreas
  },
  data: () => ({
    editedIndex: -1,
    search: "",
    areas: [],
    areaCampusEstructure: {
      id_area:0,
      ars_name: "",
      id_campus: 0,
    },
    dialog: false,
    dialogDelete: false,
    dialogEdit: false,
    dialogAllAreas: false,
    headers: [
      {
        text: "N°",
        align: "start",
        value: "id",
        sortable: false,
      },
      { text: "Area", value: "ars_name" },
      { text: "Sede", value: "hdq_name" },
      { text: "Estado", value: "state", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapGetters(["getAreaCampus"]),
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["addCampus", "addAreasCampus", "updateAreaCampus","addAllAreas"]),
    initialize() {
      this.$http.get("/areas/").then((result) => {
        this.addAllAreas(result.data);
      });
      this.$http.get("/areas/areascampus/").then((result) => {
        console.log(result.data);
        this.addAreasCampus(result.data);
      });
      this.$http
        .get("/campus/" + window.localStorage.getItem("area_campus"))
        .then((result) => this.addCampus(result.data));
    },
    dialogAreas(){
      this.dialogAllAreas = true;
    },
    newItem() {
      console.log(window.localStorage.getItem("area_campus"));
      this.editedIndex = -1;
      this.dialog = true;
      this.areaCampusEstructure.id = undefined;
      this.areaCampusEstructure.id_area = 0;
      this.areaCampusEstructure.id_campus = 0;
    },
    editItem(item) {
      this.editedIndex = this.getAreaCampus.indexOf(item);
      this.dialog = true;
      this.areaCampusEstructure.id = item.id;
      this.areaCampusEstructure.id_area = item.id_area;
      this.areaCampusEstructure.id_campus = item.id_campus;
      this.areaCampusEstructure.ars_name = item.ars_name;
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.areaCampusEstructure.id = item.id;
      this.areaCampusEstructure.id_area = item.id_area;
      this.areaCampusEstructure.id_campus = item.id_campus;
      this.areaCampusEstructure.ars_name = item.ars_name;
    },
    confirmDeleteItem() {
      this.$http
        .put("/areas/update/areacampus/" + this.areaCampusEstructure.id, {
          arsHdq_state: 0,
        })
        .then((result) => {
          console.log(result);
          this.dialogDelete = false;
          this.updateAreaCampus(result.data.areasCampus);
        });
    },
    addItem(item) {
      this.$http
        .put("/areas/update/areacampus/" + item.id, {
          arsHdq_state: 1,
        })
        .then((result) => {
          console.log(result);
          this.updateAreaCampus(result.data.areasCampus);
        });
    },
  },
};
</script>

<style src="../Basic.scss" lang="scss"></style>
