<template>
  <v-dialog v-model="show" max-width="500px">
    <v-form ref="form" @submit.prevent="updatePassword" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">Recuperar Contraseña</span>
        </v-card-title>
        <v-card-text> Correcto,Actualice su contraseña </v-card-text>
        <v-card-text>
          <v-col>
            <v-text-field
              v-model="password"
              :rules="passRules"
              type="password"
              label="Nueva Contrasena"
              hint="Al menos 6 caracteres"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :rules="passRules"
              type="password"
              label="Confirmar Contrasena"
              hint="Al menos 6 caracteres"
              required
            ></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col v-if="!statusLoading" class="d-flex justify-space-between">
            <v-btn color="blue darken-1" text @click="show = false">
              Cancelar
            </v-btn>
            <v-btn
              class="text-capitalize"
              large
              :disabled="!valid"
              color="primary"
              type="submit"
            >
              Enviar
            </v-btn>
          </v-col>
          <v-col v-if="statusLoading" class="d-flex justify-space-between">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data: () => ({
    position: "top-right",
    msgError:"",
    statusError: false,
    password: "",
    confirmPassword: "",
    statusLoading: false,
    passRules: [
      (v) => !!v || "Password es requerido",
      (v) => v.length >= 6 || "Mínimo 6 letras",
    ],
  }),
  props: ["visible", "email","code"],
  computed: {
    ...mapGetters(["getTypeAnswers", "getAreaCampus", "getQuestions"]),
    valid() {
      if (this.password.length == 6) {
        if (this.password == this.confirmPassword) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
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
  },
  methods: {
    ...mapActions(["addOneSurvey", "updateSurvey"]),
    async updatePassword() {
      this.statusLoading = true;
      console.log(this.data);
      this.$http
        .post("/admin/newpass", {
          password: this.confirmPassword,
          email: this.email,
          code: this.code,
        })
        .then((result) => {
          this.statusLoading = false;
          console.log(result.data);
          this.$emit("close");
        })
        .catch((err) => {
          this.statusLoading = false;
          this.msgError = err.response.data.msg;
          this.statusError = true;
          this.addErrorNotification();
        });
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
