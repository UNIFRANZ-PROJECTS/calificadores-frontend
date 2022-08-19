<template>
<div>
  <v-container fluid>
    <div class="tables-basic">
      <v-data-table
        :headers="headers"
        :items="getSurveys"
        sort-by="id"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
              <v-btn color="primary" dark class="mb-2" @click="newItem()">
                Nueva Encuesta
              </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.questions`]="{ item }">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr v-for="(key, index) in item.questions" :key="index">
                  <td>
                    {{ key.qst_question }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
        <template v-slot:[`item.typeAnswers`]="{ item }">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr v-for="(key, index) in item.questions" :key="index">
                  <td>
                    <v-avatar v-if="key.id_type_answer == 1">
                      <img
                        src="../../../assets/icons/1.png"
                      />
                    </v-avatar>
                    <v-avatar v-if="key.id_type_answer == 1">
                      <img
                        src="../../../assets/icons/2.png"
                      />
                    </v-avatar>
                    <v-avatar v-if="key.id_type_answer == 1">
                      <img
                        src="../../../assets/icons/3.png"
                      />
                    </v-avatar>
                    <v-avatar v-if="key.id_type_answer == 1">
                      <img
                        src="../../../assets/icons/4.png"
                      />
                    </v-avatar>
                    <v-avatar v-if="key.id_type_answer == 1">
                      <img
                        src="../../../assets/icons/5.png"
                      />
                    </v-avatar>

                    <v-avatar v-if="key.id_type_answer == 2">
                      <img
                        src="../../../assets/icons/1.png"
                      />
                    </v-avatar>
                    <v-avatar v-if="key.id_type_answer == 2">
                      <img
                        src="../../../assets/icons/2.png"
                      />
                    </v-avatar>
                    <v-avatar v-if="key.id_type_answer == 2">
                      <img
                        src="../../../assets/icons/3.png"
                      />
                    </v-avatar>
                    <v-avatar v-if="key.id_type_answer == 2">
                      <img
                        src="../../../assets/icons/5.png"
                      />
                    </v-avatar>

                    <v-avatar v-if="key.id_type_answer == 3">
                      <img
                        src="../../../assets/icons/1.png"
                      />
                    </v-avatar>
                    <v-avatar v-if="key.id_type_answer == 3">
                      <img
                        src="../../../assets/icons/2.png"
                      />
                    </v-avatar>
                    <v-avatar v-if="key.id_type_answer == 3">
                      <img
                        src="../../../assets/icons/3.png"
                      />
                    </v-avatar>
                    <img width="40" v-if="key.id_type_answer == 4" src="../../../assets/icons/si.png"/>
                    <img width="40" v-if="key.id_type_answer == 4" src="../../../assets/icons/no.png"/>

                    <v-icon small class="mr-2" v-if="key.id_type_answer == 5">
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
              </tbody>
            </template>
          </v-simple-table>
        </template>
        <template v-slot:[`item.state`]="{ item }">
          <v-chip v-if="item.srv_state == 1" color="green" dark>
            activo
          </v-chip>
          <v-chip v-if="item.srv_state == 0" color="red" dark>
            inactivo
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
            <v-icon color="red" v-if="item.srv_state == 1" small @click="deleteItem(item)"> mdi-delete </v-icon>
            <v-icon color="green" v-if="item.srv_state == 0" small @click="addItem(item)"> mdi-plus-thick </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reiniciar </v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
  <DialogCreate 
  :visible="dialog"
  @close="dialog=false"
  :editedIndex="editedIndex"
  :infoData="surveyEstructure"/>
  <DialogDelete
    :visible="dialogDelete"
    @close="dialogDelete=false"
    @closeConfirm="confirmDeleteItem()"
    :name="surveyEstructure.srv_name"
  />
</div>
</template>

<script>
import DialogCreate from "./dialogCreate.vue";
import DialogDelete from "../../../components/delete.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DialogCreate,
    DialogDelete,
  },
  data: () => ({
    ex3: { val: 0, color: "red" },
    ex4: { val: 0, color: "red" },
    editedIndex: -1,
    search: "",
    dialog: false,
    dialogDelete: false,
    surveyEstructure: {
      id_administrator: "",
      id_area_campus: 0,
      srv_name: "",
      questions: "",
    },
    headers: [
      {
        text: "N°",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Encuesta", value: "srv_name" },
      { text: "area", value: "ars_name" },
      { text: "sede", value: "serv_headquarter" },
      { text: "Preguntas", value: "questions", align: "center" , sortable: false },
      { text: "Tipo Respuesta", value: "typeAnswers", align: "center" , sortable: false },
      { text: "Estado", value: "state", sortable: false  },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    listQuestionsSelected:[],
  }),
  computed: {
    ...mapGetters(["getSurveys"]),
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["addSurveys","addAreasCampus","addQuestions","updateSurvey"]),
    initialize(){
      this.$http.get("/survey")
        .then((result) => this.addSurveys(result.data));
      this.$http.get("areas/areascampus/" + window.localStorage.getItem("area_campus"))
        .then((result) => this.addAreasCampus(result.data));
      this.$http.get("/question")
        .then((result) => this.addQuestions(result.data));
    },
    newItem() {
      this.editedIndex= -1;
      this.dialog=true;
      this.surveyEstructure.id_administrator = 1;
      this.surveyEstructure.id_area_campus = 0;
      this.surveyEstructure.srv_name = "";
      this.surveyEstructure.questions = [];
    },
    editItem(item) {
      this.editedIndex = this.getSurveys.indexOf(item);
      this.dialog = true;
      this.surveyEstructure.id = item.id;
      this.surveyEstructure.id_area_campus = item.id_area_campus;
      this.surveyEstructure.srv_name = item.srv_name;
      this.surveyEstructure.questions = item.questions
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.surveyEstructure.id = item.id;
      this.surveyEstructure.id_area_campus = item.id_area_campus;
      this.surveyEstructure.srv_name = item.srv_name;
      this.surveyEstructure.questions = item.questions
    },
    confirmDeleteItem(){
      let select = []
      for (let i = 0; i < this.surveyEstructure.questions.length; i++) {
        select.push(this.surveyEstructure.questions[i].id)
      }
      this.$http
        .put("/survey/update/" + this.surveyEstructure.id,
          {
            "id_area_campus":this.surveyEstructure.id_area_campus,
            "srv_name":this.surveyEstructure.srv_name,
            "questions":select,
            "srv_state":0
          })
        .then((result) => {
          this.dialogDelete = false;
          console.log(result.data)
          this.updateSurvey(result.data);
        });
    },
    addItem(item){
      let select = []
      for (let i = 0; i < item.questions.length; i++) {
        select.push(item.questions[i].id)
      }
      this.$http
        .put("/survey/update/" + item.id,
          {
            "id_area_campus":item.id_area_campus,
            "srv_name":item.srv_name,
            "questions":select,
            "srv_state":1
          })
        .then((result) => {
          this.updateSurvey(result.data);
        });
    }
  },
};
</script>

<style src="../Basic.scss" lang="scss"></style>
