<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Nueva Pregunta</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="estructure.qst_question"
                color="cyan"
                clear-icon="mdi-close-circle-outline"
                @click:clear="clearVariable('nombre')"
                clearable
                label="Pregunta"
              ></v-text-field>
            </v-col>
            <v-col cols="1" sm="12" md="6">
              <v-select
                item-text="tyAns_name"
                item-value="id"
                :items="getTypeAnswers"
                label="Tipo de respuesta"
                chips
                hint="puedes seleccionar mas de uno"
                v-model="estructure.id_type_answer"
                persistent-hint
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1" sm="12" md="12">
              <v-avatar v-if="estructure.id_type_answer == '1'">
                <img src="../../../assets/icons/1.png" />
              </v-avatar>
              <v-avatar v-if="estructure.id_type_answer == '1'">
                <img src="../../../assets/icons/2.png" />
              </v-avatar>
              <v-avatar v-if="estructure.id_type_answer == '1'">
                <img src="../../../assets/icons/3.png" />
              </v-avatar>
              <v-avatar v-if="estructure.id_type_answer == '1'">
                <img src="../../../assets/icons/4.png" />
              </v-avatar>
              <v-avatar v-if="estructure.id_type_answer == '1'">
                <img src="../../../assets/icons/5.png" />
              </v-avatar>

              <v-avatar v-if="estructure.id_type_answer == '2'">
                <img src="../../../assets/icons/1.png" />
              </v-avatar>
              <v-avatar v-if="estructure.id_type_answer == '2'">
                <img src="../../../assets/icons/2.png" />
              </v-avatar>
              <v-avatar v-if="estructure.id_type_answer == '2'">
                <img src="../../../assets/icons/3.png" />
              </v-avatar>
              <v-avatar v-if="estructure.id_type_answer == '2'">
                <img src="../../../assets/icons/5.png" />
              </v-avatar>

              <v-avatar v-if="estructure.id_type_answer == '3'">
                <img src="../../../assets/icons/1.png" />
              </v-avatar>
              <v-avatar v-if="estructure.id_type_answer == '3'">
                <img src="../../../assets/icons/2.png" />
              </v-avatar>
              <v-avatar v-if="estructure.id_type_answer == '3'">
                <img src="../../../assets/icons/3.png" />
              </v-avatar>

              <img
                width="40"
                v-if="estructure.id_type_answer == '4'"
                src="../../../assets/icons/si.png"
              />
              <img
                width="40"
                v-if="estructure.id_type_answer == '4'"
                src="../../../assets/icons/no.png"
              />

              <v-icon
                small
                class="mr-2"
                v-if="estructure.id_type_answer == '5'"
              >
                mdi-comment-text-multiple-outline
              </v-icon>

              <v-slider
                v-if="estructure.id_type_answer == '6'"
                v-model="ex3.val"
                :thumb-color="ex3.color"
                thumb-label="always"
                step="10"
                max="100"
                ticks="always"
                tick-size="4"
              ></v-slider>

              <v-slider
                v-if="estructure.id_type_answer == '7'"
                v-model="ex4.val"
                :thumb-color="ex4.color"
                thumb-label="always"
                max="10"
                step="1"
                ticks="always"
                tick-size="4"
              ></v-slider>
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
          @click="createNewQuestion()"
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
    ex3: { val: 0, color: "red" },
    ex4: { val: 0, color: "red" },
  }),
  props: ["visible", "editedIndex", "infoData"],
  computed: {
    ...mapGetters(["getTypeAnswers"]),
    estructure() {
      return this.infoData;
    },
    stateBtn() {
      let stateBtn = false;
      if (this.estructure.qst_question.length > 0) {
        if (this.estructure.id_type_answer != 0) {
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
    ...mapActions(["addOneQuestion", "updateQuestion"]),
    createNewQuestion() {
      if (this.editedIndex === -1) {
        this.$http
          .post("/question/register", {
            id_type_answer: this.estructure.id_type_answer,
            qst_question: this.estructure.qst_question,
          })
          .then((result) => {
            this.show = false;
            this.addOneQuestion(result.data.result);
          });
      } else {
        this.$http
          .put("/question/update/" + this.estructure.id, this.estructure)
          .then((result) => {
            this.show = false;
            this.updateQuestion(result.data.result2);
          });
      }
    },
  },
};
</script>
