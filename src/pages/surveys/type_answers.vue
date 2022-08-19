<template>
  <v-container fluid>
    <div class="tables-basic">
      <v-data-table
        :headers="headers"
        :items="typeAnswers"
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
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >¿Estás seguro de que quieres eliminar este tipo de
                  usuario?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogDelete = false"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                    >Confirmar</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.example`]="{ item }">
          <v-avatar v-if="item.tyAns_name == '5 opciones'">
            <img src="../../assets/icons/1.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.tyAns_name == '5 opciones'">
            <img src="../../assets/icons/2.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.tyAns_name == '5 opciones'">
            <img src="../../assets/icons/3.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.tyAns_name == '5 opciones'">
            <img src="../../assets/icons/4.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.tyAns_name == '5 opciones'">
            <img src="../../assets/icons/5.png" :alt="item" />
          </v-avatar>

          <v-avatar v-if="item.tyAns_name == '4 opciones'">
            <img src="../../assets/icons/1.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.tyAns_name == '4 opciones'">
            <img src="../../assets/icons/2.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.tyAns_name == '4 opciones'">
            <img src="../../assets/icons/3.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.tyAns_name == '4 opciones'">
            <img src="../../assets/icons/5.png" :alt="item" />
          </v-avatar>

          <v-avatar v-if="item.tyAns_name == '3 opciones'">
            <img src="../../assets/icons/1.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.tyAns_name == '3 opciones'">
            <img src="../../assets/icons/2.png" :alt="item" />
          </v-avatar>
          <v-avatar v-if="item.tyAns_name == '3 opciones'">
            <img src="../../assets/icons/3.png" :alt="item" />
          </v-avatar>

          <img width="40" v-if="item.tyAns_name == '2 opciones'" src="../../assets/icons/si.png"/>
          <img width="40" v-if="item.tyAns_name == '2 opciones'" src="../../assets/icons/no.png"/>

          <v-icon small class="mr-2" v-if="item.tyAns_name == 'comentario'">
            mdi-comment-text-multiple-outline
          </v-icon>

          <v-slider
            v-if="item.tyAns_name == 'deslizador 0-100'"
            v-model="ex3.val"
            :thumb-color="ex3.color"
            thumb-label="always"
            step="10"
            max="100"
            ticks="always"
            tick-size="4"
          ></v-slider>

          <v-slider
            v-if="item.tyAns_name == 'deslizador 0-10'"
            v-model="ex4.val"
            :thumb-color="ex4.color"
            thumb-label="always"
            max="10"
            step="1"
            
            ticks="always"
            tick-size="4"
          ></v-slider>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    ex3: { val: 0, color: "red" },
    ex4: { val: 0, color: "red" },
    search: "",
    typeAnswers: [],
    dialog: false,
    dialogCreate: false,
    dialogDelete: false,
    typeAnswersEstructure: {
      tyUsr_name: "",
      tyUsr_description: "",
    },
    headers: [
      {
        text: "N°",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Nombre", value: "tyAns_name" },
      { text: "Descripcion", value: "tyAns_description" },
      { text: "Ejemplo", value: "example",align: "center",},
    ],
  }),
  mounted() {
    this.getTypeAnswers();
  },

  methods: {
    clearVariable(val) {
      if (val == "nombre") this.typeAnswersEstructure.tyUsr_name = "";
      if (val == "descripcion")
        this.typeAnswersEstructure.tyUsr_description = "";
    },
    initialize() {},
    createNewRol() {
      this.$http
        .post("register/typeuser", {
          tyUsr_name: this.typeAnswersEstructure.tyUsr_name,
          tyUsr_description: this.typeAnswersEstructure.tyUsr_description,
        })
        .then((result) => {
          this.typeAnswers.push({
            id: result.data.result.id,
            tyUsr_name: result.data.result.tyUsr_name,
            tyUsr_description: result.data.result.tyUsr_description,
            tyUsr_state: 1,
          });
          this.dialogCreate = false;
        });
    },
    getTypeAnswers() {
      this.$http
        .get("/typeanswer")
        .then((result) => (this.typeAnswers = result.data));
    },
    newItem() {},
    editItem() {
    },
    deleteItem() {
      this.dialogDelete = true;
    },
    deleteItemConfirm() {},
  },
};
</script>

<style src="./Basic.scss" lang="scss"></style>
