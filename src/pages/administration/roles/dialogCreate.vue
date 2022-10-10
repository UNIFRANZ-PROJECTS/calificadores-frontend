<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                @keyup="estructure.rls_name = estructure.rls_name.toUpperCase()"
                v-model="estructure.rls_name"
                color="cyan"
                clear-icon="mdi-close-circle-outline"
                @click:clear="clearVariable('nombre')"
                clearable
                label="Nombre"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="12" md="12">
              <v-select
                item-text="prm_name"
                item-value="id"
                :items="getPermisions"
                label="Permisos"
                multiple
                chips
                hint="puedes seleccionar mas de uno"
                v-model="estructure.rls_permisions"
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
    originEstructure() {
      return this.infoData;
    },
    stateBtn() {
      let stateBtn = false;
      if (this.estructure.rls_name.length > 0) {
        if (this.estructure.rls_permisions.length > 0) {
          stateBtn = true;
        }
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
          rls_permisions: permisions,
        };
      } else {
        return {
          rls_name: "",
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
    ...mapActions(["addOneRolPermisions", "updateRolPermision"]),
    createNewRol() {
      if (this.editedIndex === -1) {
        this.$http
          .post("/rol/register/permision", {
            rls_name: this.estructure.rls_name.trim().toUpperCase(),
            rls_permisions: this.estructure.rls_permisions,
          })
          .then((result) => {
            this.show = false;
            let permisionData = [];
            for (let i = 0; i < this.estructure.rls_permisions.length; i++) {
              permisionData.push({
                serv_permision: {
                  id: this.estructure.rls_permisions[i],
                  prm_name: this.getPermisions.filter(
                    (e) => e.id == this.estructure.rls_permisions[i]
                  )[0].prm_name,
                },
              });
            }
            this.addOneRolPermisions({
              id: result.data.rolPermisions.rol.id,
              rls_name: result.data.rolPermisions.rol.rls_name,
              rls_state: result.data.rolPermisions.rol.rls_state,
              permision: permisionData,
            });
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
          .put("/rol/update/" + this.estructure.id, {
            rls_name: this.estructure.rls_name.trim().toUpperCase(),
            rls_permisions: this.estructure.rls_permisions,
          })
          .then((result) => {
            this.show = false;
            this.updateRolPermision(result.data);
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
