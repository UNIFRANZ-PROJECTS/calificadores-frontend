<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Nueva Terminal</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="estructure.trm_serie"
                color="cyan"
                clear-icon="mdi-close-circle-outline"
                @click:clear="clearVariable('nombre')"
                clearable
                label="Serie"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="blue darken-1" text @click="show = false">
          Cancelar
        </v-btn>
        <v-btn
          v-if="stateBtn"
          color="blue darken-1"
          text
          @click="createNewTerminal()"
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
      if (this.estructure.trm_serie.length > 0) {
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
    ...mapActions(["addOneTerminal","updateTerminal"]),
    ...mapActions({ addAreaCampusFunction: "auth/addAreaCampus" }),
    createNewTerminal() {
      if (this.editedIndex === -1) {
        this.$http
          .post("terminal/register",{
            "id_administrator": localStorage.getItem("user"),
            "trm_serie":this.estructure.trm_serie,
          })
          .then((result) => {
            this.show = false;
            console.log(result)
            this.addOneTerminal(result.data.terminal)
          });
      } else {
        console.log('editando')
        this.$http
          .put("/terminal/update/"+ this.estructure.id,{
            "trm_serie":this.estructure.trm_serie,
            "trm_state":this.estructure.trm_state,
          })
          .then((result) => {
            this.show = false;
            this.updateTerminal(result.data.terminal);
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
