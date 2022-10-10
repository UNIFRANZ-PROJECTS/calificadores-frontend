<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Nueva Encuesta</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
              @keyup="estructure.srv_name = estructure.srv_name.toUpperCase()"
                v-model="estructure.srv_name"
                color="cyan"
                clear-icon="mdi-close-circle-outline"
                @click:clear="clearVariable('nombre')"
                clearable
                label="Nombre"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-select
                :item-text="(item) => item.ars_name + ' - ' + item.hdq_name"
                item-value="id"
                :items="getAreaCampus"
                label="Area - Sede"
                chips
                hint="puedes seleccionar uno"
                v-model="estructure.id_area_campus"
                persistent-hint
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-select
                item-text="qst_question"
                item-value="id"
                :items="getQuestions"
                label="Preguntas"
                return-object
                multiple
                chips
                hint="puedes seleccionar más de uno"
                v-model="estructure.questions"
                persistent-hint
              ></v-select>
              <!-- @change="selectQuestion()" -->
            </v-col>
          </v-row>
          <v-row class="mb-6" justify="center" no-gutters>
            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <draggable v-model="estructure.questions">
                    <tr
                      v-for="(key, index) in estructure.questions"
                      :key="index"
                    >
                      <td>
                        <v-avatar color="red" size="25">
                          <span class="white--text headline">{{ index }}</span>
                        </v-avatar>
                      </td>
                      <td>
                        <v-icon small class="mr-2"> mdi-arrow-all </v-icon>
                      </td>

                      <td>{{ key.qst_question }}</td>
                      <td>
                        <v-avatar v-if="key.id_type_answer == 1">
                          <img src="../../../assets/icons/1.png" />
                        </v-avatar>
                        <v-avatar v-if="key.id_type_answer == 1">
                          <img src="../../../assets/icons/2.png" />
                        </v-avatar>
                        <v-avatar v-if="key.id_type_answer == 1">
                          <img src="../../../assets/icons/3.png" />
                        </v-avatar>
                        <v-avatar v-if="key.id_type_answer == 1">
                          <img src="../../../assets/icons/4.png" />
                        </v-avatar>
                        <v-avatar v-if="key.id_type_answer == 1">
                          <img src="../../../assets/icons/5.png" />
                        </v-avatar>

                        <v-avatar v-if="key.id_type_answer == 2">
                          <img src="../../../assets/icons/1.png" />
                        </v-avatar>
                        <v-avatar v-if="key.id_type_answer == 2">
                          <img src="../../../assets/icons/2.png" />
                        </v-avatar>
                        <v-avatar v-if="key.id_type_answer == 2">
                          <img src="../../../assets/icons/3.png" />
                        </v-avatar>
                        <v-avatar v-if="key.id_type_answer == 2">
                          <img src="../../../assets/icons/5.png" />
                        </v-avatar>

                        <v-avatar v-if="key.id_type_answer == 3">
                          <img src="../../../assets/icons/1.png" />
                        </v-avatar>
                        <v-avatar v-if="key.id_type_answer == 3">
                          <img src="../../../assets/icons/2.png" />
                        </v-avatar>
                        <v-avatar v-if="key.id_type_answer == 3">
                          <img src="../../../assets/icons/3.png" />
                        </v-avatar>
                        <img
                          width="40"
                          v-if="key.id_type_answer == 4"
                          src="../../../assets/icons/si.png"
                        />
                        <img
                          width="40"
                          v-if="key.id_type_answer == 4"
                          src="../../../assets/icons/no.png"
                        />

                        <v-icon
                          small
                          class="mr-2"
                          v-if="key.id_type_answer == 5"
                        >
                          mdi-comment-text-multiple-outline
                        </v-icon>

                        <v-slider
                          v-if="key.id_type_answer == 6"
                          v-model="ex3.val"
                          :thumb-color="ex3.color"
                          thumb-label="always"
                          step="10"
                          max="100"
                          ticks="always"
                          tick-size="4"
                        ></v-slider>

                        <v-slider
                          v-if="key.id_type_answer == 7"
                          v-model="ex4.val"
                          :thumb-color="ex4.color"
                          thumb-label="always"
                          max="10"
                          step="1"
                          ticks="always"
                          tick-size="4"
                        ></v-slider>
                      </td>
                    </tr>
                  </draggable>
                </tbody>
              </template>
            </v-simple-table>
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
          @click="createNewQuestion()"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import draggable from "vuedraggable";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    draggable,
  },
  data: () => ({
    ex3: { val: 0, color: "red" },
    ex4: { val: 0, color: "red" },
    statusError: false,
    statusLoading: false,
    msgError: "",
    position: "top-right",
  }),
  props: ["visible", "editedIndex", "infoData"],
  computed: {
    ...mapGetters(["getTypeAnswers", "getAreaCampus", "getQuestions"]),
    estructure() {
      return this.infoData;
    },
    stateBtn() {
      let stateBtn = false;
      if (this.estructure.id_area_campus != 0) {
        if (this.estructure.srv_name.length > 0) {
            if (this.estructure.questions.length > 0) {
              stateBtn = true;
            }
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
    ...mapActions(["addOneSurvey", "updateSurvey"]),
    createNewQuestion() {
      let select = []
      for (let i = 0; i < this.estructure.questions.length; i++) {
        select.push(this.estructure.questions[i].id)
      }
      if (this.editedIndex === -1) {
        this.$http
          .post("/survey/register/", {
            "id_administrator":localStorage.getItem("user"),
            "id_area_campus":this.estructure.id_area_campus,
            "srv_name":this.estructure.srv_name.trim().toUpperCase(),
            "questions":select
          })
          .then((result) => {
            this.show = false;
            this.addOneSurvey(result.data.surveys);
          })
          .catch((error) => {
            console.log(error.response.data.errors[0].msg);
            this.msgError = error.response.data.errors[0].msg;
            this.statusError = true;
            this.statusLoading = false;
            this.addErrorNotification();
          });
      } else {
        let select = []
        for (let i = 0; i < this.estructure.questions.length; i++) {
          select.push(this.estructure.questions[i].id)
        }
        this.$http
          .put("/survey/update/" + this.estructure.id,
            {
              "id_area_campus":this.estructure.id_area_campus,
              "srv_name":this.estructure.srv_name.trim().toUpperCase(),
              "questions":select
            })
          .then((result) => {
            this.show = false;
            this.updateSurvey(result.data);
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
