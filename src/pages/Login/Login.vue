<template>
  <div>
    <v-app>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="6" class="main-part d-none d-md-none d-lg-flex">
            <div class="d-flex">
              <v-img src="@/assets/icons/icon.png" contain></v-img>
              <p>Unifranz Review</p>
            </div>
          </v-col>
          <v-col
            cols="12"
            lg="6"
            class="login-part d-flex align-center justify-center"
          >
            <v-row no-gutters class="align-start">
              <v-col
                cols="12"
                class="
                  login-part
                  d-flex
                  align-center
                  justify-center
                  flex-column
                "
              >
                <div class="login-wrapper pt-md-4 pt-0">
                  <v-container>
                    <v-row class="flex-column">
                      <v-col>
                        <p
                          class="
                            login-slogan
                            display-2
                            text-center
                            font-weight-medium
                            my-10
                          "
                        >
                          Iniciar Sesión
                        </p>
                      </v-col>
                      <v-form
                        ref="form"
                        @submit.prevent="login"
                        lazy-validation
                      >
                        <v-col>
                          <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            value="admin@flatlogic.com"
                            label="Nombre de usuario"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="password"
                            :rules="passRules"
                            type="password"
                            label="Contraseña"
                            hint="Al menos 6 caracteres"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="!statusLoading"
                          class="d-flex justify-space-between"
                        >
                          <v-btn
                            class="text-capitalize"
                            large
                            :disabled="!valid"
                            color="primary"
                            type="submit"
                          >
                            Empezar</v-btn
                          >
                          <v-btn
                            large
                            text
                            class="text-capitalize primary--text"
                            @click="dialogForgotCode = true"
                            >¿Olvidaste tu contrasena?</v-btn
                          >
                        </v-col>
                        <v-col
                          v-if="statusLoading"
                          class="d-flex justify-space-between"
                        >
                          <v-progress-circular
                            indeterminate
                            color="primary"
                          ></v-progress-circular>
                        </v-col>
                      </v-form>
                    </v-row>
                  </v-container>
                </div>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-footer>
                  <div class="primary--text">
                    © 2022
                    <a
                      href="https://flatlogic.com/"
                      class="text-decoration-none"
                      >UNIFRANZ</a
                    >
                  </div>
                </v-footer>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
    <DialogForgotPwd
      :visible="dialogForgotCode"
      @close="dialogForgotCode = false"
      @correct="CorrectForgotPwd"
    />
    <DialogSendCode
      :visible="dialogStateCode"
      :data="email"
      @close="dialogStateCode = false"
      @correct="CorrectCode"
    />
    <DialogUpdatePwd
      :visible="dialogUpdatePwd"
      :email="email"
      :code="codeForgotPwd"
      @close="dialogUpdatePwd = false"
    />
  </div>
</template>
<script>
import DialogUpdatePwd from "./dialogUpdatePwd.vue";
import DialogForgotPwd from "./dialogForgotPassword.vue";
import DialogSendCode from "./dialogCode.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    DialogForgotPwd,
    DialogSendCode,
    DialogUpdatePwd,
  },
  name: "Login",
  data() {
    return {
      dialogForgotCode: false,
      dialogStateCode: false,
      dialogUpdatePwd: false,
      statusError: false,
      statusLoading: false,
      codeForgotPwd: "",
      
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "Correo es requerido",
        (v) =>
          v.includes("@unifranz.edu.bo") ||
          "correo debe incluir @unifranz.edu.bo",
      ],
      createFullName: "John Smith",
      createEmail: "john@flatlogic.com",
      createPassword: "123456",
      passRules: [
        (v) => !!v || "Contraseña es requerido",
        (v) => v.length >= 6 || "Mínimo 6 letras",
      ],
      msgError: "",
      position: "top-right",
    };
  },
  computed: {
    ...mapGetters({
      token: "auth/token",
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
    valid() {
      if (this.email.includes("@unifranz.edu.bo")) {
        if (this.password.length >= 6) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions({ signIn: "auth/signIn" }),
    CorrectForgotPwd(email) {
      console.log(email);
      this.email = email;
      this.dialogForgotCode = false;
      this.dialogStateCode = true;
    },
    CorrectCode(code) {
      console.log(code);
      this.codeForgotPwd = code;
      this.dialogStateCode = false;
      this.dialogUpdatePwd = true;
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
    async login() {
      if (this.valid) {
        this.statusLoading = true;
        try {
          await this.signIn({
            email: this.email,
            password: this.password,
          });
          this.statusLoading = false;
          this.$router.replace("/dashboard");
        } catch (error) {
          this.msgError = error.response.data.msg;
          this.statusError = true;
          this.statusLoading = false;
          this.addErrorNotification();
        }
      }
    },
  },
};
</script>

<style src="./Login.scss" lang="scss"/>
