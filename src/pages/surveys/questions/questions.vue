<template>
  <div>
  <v-container fluid>
    <div class="tables-basic">
      <v-data-table
        :headers="headers"
        :items="getQuestions"
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
              <v-btn color="primary" dark class="mb-2" @click="newItem()">
                Nueva Pregunta
              </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.example`]="{ item }">

          <v-avatar v-if="item.id_type_answer == 1">
            <img src="../../../assets/icons/1.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.id_type_answer == 1">
            <img src="../../../assets/icons/2.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.id_type_answer == 1">
            <img src="../../../assets/icons/3.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.id_type_answer == 1">
            <img src="../../../assets/icons/4.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.id_type_answer == 1">
            <img src="../../../assets/icons/5.png" :alt="item" />
          </v-avatar>

          <v-avatar v-if="item.id_type_answer == 2">
            <img src="../../../assets/icons/1.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.id_type_answer == 2">
            <img src="../../../assets/icons/2.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.id_type_answer == 2">
            <img src="../../../assets/icons/3.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.id_type_answer == 2">
            <img src="../../../assets/icons/5.png" :alt="item" />
          </v-avatar>

          <v-avatar v-if="item.id_type_answer == 3">
            <img src="../../../assets/icons/1.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.id_type_answer == 3">
            <img src="../../../assets/icons/2.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.id_type_answer == 3">
            <img src="../../../assets/icons/3.png" :alt="item" />
          </v-avatar>

          <img
            width="40"
            v-if="item.id_type_answer == 4"
            src="../../../assets/icons/si.png"
          />
          <img
            width="40"
            v-if="item.id_type_answer == 4"
            src="../../../assets/icons/no.png"
          />

          <v-icon small class="mr-2" v-if="item.id_type_answer == 5">
            mdi-comment-text-multiple-outline
          </v-icon>

          <v-slider
            v-if="item.id_type_answer == 6"
            v-model="ex3.val"
            :thumb-color="ex3.color"
            thumb-label="always"
            step="10"
            max="100"
            ticks="always"
            tick-size="4"
          ></v-slider>

          <v-slider
            v-if="item.id_type_answer == 7"
            v-model="ex4.val"
            :thumb-color="ex4.color"
            thumb-label="always"
            max="10"
            step="1"
            ticks="always"
            tick-size="4"
          ></v-slider>

        </template>

        <template v-slot:[`item.state`]="{ item }">
          <v-chip v-if="item.qst_state == 1" color="green" dark>
            activo
          </v-chip>
          <v-chip v-if="item.qst_state == 0" color="red" dark>
            inactivo
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
            <v-icon color="red" v-if="item.qst_state == 1" small @click="deleteItem(item)"> mdi-delete </v-icon>
            <v-icon color="green" v-if="item.qst_state == 0" small @click="addItem(item)"> mdi-plus-thick </v-icon>
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
  :infoData="questionsEstructure"/>
  <DialogDelete
    :visible="dialogDelete"
    @close="dialogDelete=false"
    @closeConfirm="confirmDeleteItem()"
    :name="questionsEstructure.ars_name"
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
    editedIndex: -1,
    ex3: { val: 0, color: "red" },
    ex4: { val: 0, color: "red" },
    search: "",
    dialog: false,
    dialogDelete: false,
    questionsEstructure: {
      qst_question: "",
      id_type_answer: 0,
    },
    headers: [
      {
        text: "N°",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Pregunta", value: "qst_question" },
      { text: "Tipo de respuesta", value: "example", align: "center" },
      { text: "Estado", value: "state", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapGetters(["getQuestions"]),
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["addTypeAnswers","addQuestions","updateQuestion"]),
    initialize(){
      this.$http
        .get("typeanswer")
        .then((result) => this.addTypeAnswers(result.data));
      this.$http
        .get("question")
        .then((result) => {
          console.log(result.data)
          this.addQuestions(result.data)
        });
    },

    newItem() {
      this.editedIndex= -1;
      this.dialog=true;
      this.questionsEstructure.id = undefined;
      this.questionsEstructure.qst_question = '';
      this.questionsEstructure.id_type_answer = 0;
    },
    editItem(item) {
      this.editedIndex = this.getQuestions.indexOf(item);
      this.dialog = true;
      this.questionsEstructure.id = item.id;
      this.questionsEstructure.qst_question = item.qst_question;
      this.questionsEstructure.id_type_answer = item.id_type_answer;
      this.questionsEstructure.qst_state = item.qst_state;
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.questionsEstructure.id = item.id;
      this.questionsEstructure.qst_question = item.qst_question;
      this.questionsEstructure.id_type_answer = item.id_type_answer;
      this.questionsEstructure.qst_state = item.qst_state;
    },
    confirmDeleteItem(){
      this.$http
        .put("/question/update/"+ this.questionsEstructure.id,{
          "qst_state":0
        })
        .then((result) => {
          this.dialogDelete = false
          this.updateQuestion(result.data.result2);
        });
    },
    addItem(item){
      this.$http
        .put("/question/update/"+ item.id,{
          "qst_state":1
        })
        .then((result) => {
          this.updateQuestion(result.data.result2);
        });
    }
  },
};
</script>

<style src="../Basic.scss" lang="scss"></style>
