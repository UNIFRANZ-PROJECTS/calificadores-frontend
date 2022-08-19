<template>
  <v-container fluid>
    <div class="tables-basic">
      <v-data-table
        :headers="headers"
        :items="permisions"
        sort-by="calories"
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
          </v-toolbar>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search:'',
    permisions: [],
    headers: [
      {
        text: "N°",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Nombre", value: "prm_name" },
    ],
  }),
  mounted() {
    this.getPermisions();
  },
  methods: {
    getPermisions() {
      this.$http
        .get("/permision")
        .then((result) => {
          console.log(result)
          this.permisions = result.data
        });
    },
  },
};
</script>

<style src="./Basic.scss" lang="scss"></style>
