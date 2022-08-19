<template>
  <v-dialog v-model="show" max-width="500px">
    <v-form ref="form" @submit.prevent="sendEmail" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">Recuperar Contraseña</span>
        </v-card-title>
        <v-card-text>
          <v-col>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Correo"
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
    email: "",
    statusLoading: false,
    emailRules: [
      (v) => !!v || "Correo es requerido",
      (v) =>
        v.includes("@unifranz.edu.bo") ||
        "correo debe incluir @unifranz.edu.bo",
    ],
  }),
  props: ["visible"],
  computed: {
    ...mapGetters(["getTypeAnswers", "getAreaCampus", "getQuestions"]),
    valid() {
      if (this.email.includes("@unifranz.edu.bo")) {
        return true;
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
    async sendEmail() {
      this.statusLoading = true;
      this.$http
        .post("/admin/forgot", {
          email: this.email,
        })
        .then((result) => {
          this.statusLoading = false;
          console.log(result.data);
          this.$emit("correct", this.email);
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
