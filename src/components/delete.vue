<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title class="headline"
        >¿Estás seguro de que quieres eliminar a {{name}}?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="show=false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="confirm()">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: [ "name","visible" ],
  computed: {
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
  data: () => ({}),
  methods: {
      confirm(){
        this.$emit("closeConfirm");
      }
  },
};
</script>
