<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Nueva Asignación de área con una sede </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-select
                item-text="ars_name"
                item-value="id"
                :items="getAllAreas"
                label="Area"
                chips
                v-model="estructure.id_area"
                persistent-hint
              ></v-select>
            </v-col>
            <v-col cols="1" sm="12" md="6">
              <v-select
                item-text="hdq_name"
                item-value="id"
                :items="getCampus"
                label="Sede"
                chips
                v-model="estructure.id_campus"
                persistent-hint
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="show = false">
          Cancelar
        </v-btn>
        <v-btn
          v-if="stateBtn"
          color="blue darken-1"
          text
          @click="createNewArea()"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    statusError: false,
    statusLoading: false,
    msgError: "",
    position: "top-right",
  }),
  props: ["visible", "message", "editedIndex","infoData"],
  computed: {
    ...mapGetters([
      "getCampus","getAllAreas"
    ]),
    estructure(){
      return this.infoData;
    },
    stateBtn() {
      let stateBtn = false;
      console.log(this.estructure)
      if (this.estructure.id_area != 0) {
          if (this.estructure.id_campus != 0) {
            stateBtn = true;
        }
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
    ...mapActions(["addOneAreaCampus","updateAreaCampus"]),
    ...mapActions({ addAreaCampusFunction: "auth/addAreaCampus" }),
    createNewArea() {
      if (this.editedIndex === -1) {
        this.$http
          .post("areas/register/areacampus",{
            "id_administrator": localStorage.getItem("user"),
            "id_area":this.estructure.id_area,
            "id_campus":this.estructure.id_campus
          })
          .then((result) => {
            this.show = false;
            console.log(result.data)
            let area_campus = window.localStorage.getItem("area_campus").split(',');
            console.log(area_campus)
            area_campus.push(result.data.id)
            console.log(area_campus)
            localStorage.setItem("area_campus", area_campus);
            this.addOneAreaCampus(result.data);
            for (let i = 0; i < this.getCampus.length; i++) {
              if(this.getCampus[i].id == this.estructure.id_campus){
                return this.addAreaCampusFunction(this.estructure.ars_name+'-'+this.getCampus[i].hdq_name)
              }
            }
          })
          .catch((error) => {
            console.log(error.response.data.errors[0].msg);
            this.msgError = error.response.data.errors[0].msg;
            this.statusError = true;
            this.statusLoading = false;
            this.addErrorNotification();
          });
      } else {
        console.log('editando')
        this.$http
          .put("/areas/update/areacampus/"+ this.estructure.id,{
            "id_area":this.estructure.id_area,
            "id_campus":this.estructure.id_campus
          })
          .then((result) => {
            this.show = false;
            this.updateAreaCampus(result.data.areasCampus);
          })
          .catch((error) => {
            console.log(error.response.data.errors[0].msg);
            this.msgError = error.response.data.errors[0].msg;
            this.statusError = true;
            this.statusLoading = false;
            this.addErrorNotification();
          });
      }
    },
    addErrorNotification() {
      this.$toast.error(this.msgError, {
        position: this.position,
        timeout: 6000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
      });
    },
  },
};
</script>
