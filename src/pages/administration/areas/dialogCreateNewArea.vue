<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Nueva Area</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field
          @keyup="estructure.ars_name = estructure.ars_name.toUpperCase()"
            v-model="estructure.ars_name"
            color="cyan"
            clear-icon="mdi-close-circle-outline"
            @click:clear="clearVariable('nombre')"
            clearable
            label="Nombre"
          ></v-text-field>
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
  props: ["visible", "message", "editedIndex", "infoData"],
  computed: {
    ...mapGetters(["getCampus"]),
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
    ...mapActions(["addOneArea", "updateArea"]),
    ...mapActions({ addAreaCampusFunction: "auth/addAreaCampus" }),
    createNewArea() {
      if (this.editedIndex === -1) {
        this.$http
          .post("areas", {
            ars_name: this.estructure.ars_name.trim().toUpperCase()
          })
          .then((result) => {
            this.show = false;
            console.log(result.data);
            this.addOneArea(result.data.result1);
          })
          .catch((error) => {
            console.log(error.response.data.errors[0].msg);
            this.msgError = error.response.data.errors[0].msg;
            this.statusError = true;
            this.statusLoading = false;
            this.addErrorNotification();
          });
      } else {
        console.log("editando");
        this.$http
          .put("areas/" + this.estructure.id, {
            ars_name: this.estructure.ars_name.trim().toUpperCase()
          })
          .then((result) => {
            this.show = false;
            this.updateArea(result.data.area);
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
    }
  },
};
</script>
  