<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Nuevo Tipo de usuario</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field
            @keyup="estructure.tyUsr_name = estructure.tyUsr_name.toUpperCase()"
            v-model="estructure.tyUsr_name"
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
          @click="createNewRol()"
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
  props: ["visible", "editedIndex", "infoData"],
  computed: {
    ...mapGetters(["getPermisions"]),

    estructure() {
      return this.infoData;
    },
    stateBtn() {
      let stateBtn = false;
      if (this.estructure.tyUsr_name.length > 0) {
        stateBtn = true;
      }
      return stateBtn;
    },
    estructureData() {
      if (this.infoData.rol != undefined) {
        let permisions = [];
        this.infoData.permision.forEach((element) => {
          permisions.push(element.serv_permision);
        });
        return {
          rls_name: this.infoData.rol.rls_name,
          rls_description: this.infoData.rol.rls_description,
          rls_permisions: permisions,
        };
      } else {
        return {
          rls_name: "",
          rls_description: "",
          rls_permisions: [],
        };
      }
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
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Rol" : "Editar Rol";
    },
  },
  methods: {
    ...mapActions(["addOneTypeUser", "updateTypeUser"]),
    createNewRol() {
      if (this.editedIndex === -1) {
        this.$http
          .post("/typeuser/register", {
            tyUsr_name: this.estructure.tyUsr_name.trim().toUpperCase(),
          })
          .then((result) => {
            this.show = false;
            this.addOneTypeUser(result.data.typeuser);
          })
          .catch((error) => {
            console.log(error.response.data.errors[0].msg);
            this.msgError = error.response.data.errors[0].msg;
            this.statusError = true;
            this.statusLoading = false;
            this.addErrorNotification();
          });
      } else {
        this.$http
          .put("/typeuser/update/" + this.estructure.id, {
            tyUsr_name: this.estructure.tyUsr_name.trim().toUpperCase(),
          })
          .then((result) => {
            this.show = false;
            this.updateTypeUser(result.data.typeuser);
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
