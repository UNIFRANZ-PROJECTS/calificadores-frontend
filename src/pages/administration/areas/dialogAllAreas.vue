<template>
  <div>
    <v-dialog v-model="show" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Todas las áreas de la UNIFRANZ</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="tables-basic">
              <v-data-table
                :headers="headers"
                :items="getAllAreas"
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
                      Crear nueva Área
                    </v-btn>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.state`]="{ item }">
                  <v-chip v-if="item.ars_state == 1" color="green" dark>
                    activo
                  </v-chip>
                  <v-chip v-if="item.ars_state == 0" color="red" dark>
                    inactivo
                  </v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    color="red"
                    v-if="item.ars_state == 1"
                    small
                    @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                  <v-icon
                    color="green"
                    v-if="item.ars_state == 0"
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="show = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <DialogCreate
      :visible="dialog"
      @close="dialog = false"
      :editedIndex="editedIndex"
      :infoData="estructure"
    />
    <DialogDelete
      :visible="dialogDelete"
      @close="dialogDelete = false"
      @closeConfirm="confirmDeleteItem()"
      :name="estructure.ars_name"
    />
  </div>
</template>
  
  
  <script>
import { mapGetters, mapActions } from "vuex";
import DialogCreate from "./dialogCreateNewArea.vue";
import DialogDelete from "../../../components/delete.vue";
export default {
  components: {
    DialogCreate,
    DialogDelete,
  },
  data: () => ({
    editedIndex: -1,
    search: "",
    dialog: false,
    dialogDelete: false,
    areaEstructure: {
      ars_name: "",
    },
    headers: [
      {
        text: "N°",
        align: "start",
        value: "id",
        sortable: false,
      },
      { text: "Area", value: "ars_name" },
      { text: "Estado", value: "state", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
  }),
  props: ["visible", "message", "infoData"],
  computed: {
    ...mapGetters(["getCampus", "getAllAreas"]),
    estructure() {
      return this.infoData;
    },
    stateBtn() {
      let stateBtn = false;
      if (this.estructure.ars_name.length > 0) {
        stateBtn = true;
      }
      return stateBtn;
    },
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    ...mapActions(["addOneAreaCampus", "updateAreaCampus", "updateArea"]),
    ...mapActions({ addAreaCampusFunction: "auth/addAreaCampus" }),
    newItem() {
      this.editedIndex = -1;
      this.dialog = true;
      this.estructure.id = undefined;
      this.estructure.ars_name = "";
      this.estructure.ars_state = 0;
    },
    editItem(item) {
      this.editedIndex = this.getAllAreas.indexOf(item);
      this.dialog = true;
      this.estructure.id = item.id;
      this.estructure.ars_name = item.ars_name;
    },
    createNewArea() {
      if (this.editedIndex === -1) {
        this.$http
          .post("areas/register/areacampus", {
            id_administrator: localStorage.getItem("user"),
            ars_name: this.estructure.ars_name,
            id_campus: this.estructure.id_campus,
          })
          .then((result) => {
            this.show = false;
            console.log(result.data);
            let area_campus = window.localStorage
              .getItem("area_campus")
              .split(",");
            console.log(area_campus);
            area_campus.push(result.data.id);
            console.log(area_campus);
            localStorage.setItem("area_campus", area_campus);
            this.addOneAreaCampus(result.data);
            for (let i = 0; i < this.getCampus.length; i++) {
              if (this.getCampus[i].id == this.estructure.id_campus) {
                return this.addAreaCampusFunction(
                  this.estructure.ars_name + "-" + this.getCampus[i].hdq_name
                );
              }
            }
          });
      } else {
        console.log("editando");
        this.$http
          .put("/areas/update/areacampus/" + this.estructure.id, {
            ars_name: this.estructure.ars_name,
            id_campus: this.estructure.id_campus,
          })
          .then((result) => {
            this.show = false;
            this.updateAreaCampus(result.data.areasCampus);
          });
      }
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.estructure.id = item.id;
      this.estructure.ars_name = item.ars_name;
    },
    confirmDeleteItem() {
      console.log("ELIMINANDO");
      this.$http
        .put("/areas/" + this.estructure.id, {
          ars_name: this.estructure.ars_name,
          ars_state: 0,
        })
        .then((result) => {
          console.log(result);
          this.dialogDelete = false;
          this.updateArea(result.data.area);
        });
    },
    addItem(item) {
      this.$http
        .put("/areas/" + item.id, {
          ars_name: item.ars_name,
          ars_state: 1,
        })
        .then((result) => {
          console.log(result);
          this.updateArea(result.data.area);
        });
    },
  },
};
</script>
  