<template>
  <v-dialog v-model="show" max-width="500px">
    <v-form ref="form" @submit.prevent="sendCode" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">Recuperar Contraseña</span>
        </v-card-title>
                <v-card-text>
          Se envio un codigo al correo {{this.data}} revise 
        </v-card-text>
        <v-card-text>
          <v-col>
            <v-text-field
              v-model="code"
              :rules="codeRules"
              label="Codigo"
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
    code: "",
    statusLoading: false,
    codeRules: [
       (v) => v.length >= 6 || "Mínimo 4 letras",
    ],
  }),
  props: ["visible","data"],
  computed: {
    ...mapGetters(["getTypeAnswers", "getAreaCampus", "getQuestions"]),
    valid() {
      if (this.code.length==4) {
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
    async sendCode() {
      this.statusLoading = true;
      console.log(this.data,)
      this.$http
        .post("/admin/verifycode", {
          email: this.data,
          code: this.code
        })
        .then((result) => {
          this.statusLoading = false;
          console.log(result.data);
          this.$emit("correct",this.code);
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
