<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Nueva Area</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="estructure.ars_name"
                color="cyan"
                clear-icon="mdi-close-circle-outline"
                @click:clear="clearVariable('nombre')"
                clearable
                label="Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="1" sm="12" md="6">
              <v-select
                item-text="hdq_name"
                item-value="id"
                :items="getCampus"
                label="Sede"
                chips
                hint="puedes seleccionar mas de uno"
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
  data: () => ({}),
  props: ["visible", "message", "editedIndex","infoData"],
  computed: {
    ...mapGetters([
      "getCampus",
    ]),
    estructure(){
      return this.infoData;
    },
    stateBtn() {
      let stateBtn = false;
      if (this.estructure.ars_name.length > 0) {
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
            "ars_name":this.estructure.ars_name,
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
            
          });
      } else {
        console.log('editando')
        this.$http
          .put("/areas/update/areacampus/"+ this.estructure.id,{
            "ars_name":this.estructure.ars_name,
            "id_campus":this.estructure.id_campus
          })
          .then((result) => {
            this.show = false;
            this.updateAreaCampus(result.data.areasCampus);
          });
      }
    },
    // clearVariable(val){
    //     if (val=='nombre')this.areasEstructure.tyUsr_name='';
    //     if (val=='descripcion')this.areasEstructure.tyUsr_description='';
    // },
  },
};
</script>
