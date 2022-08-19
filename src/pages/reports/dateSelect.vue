<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-menu
          ref="menu"
          color="#1E4258"
          dark
          :close-on-content-click="false"
          :return-value.sync="date.start_day"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date.start_day"
              color="cyan"
              clear-icon="mdi-close-circle-outline"
              clearable
              label="Fecha inicial"
              prepend-icon="mdi-calendar-range"
              readonly
              v-on="on"
            >
            </v-text-field>
          </template>
          <v-date-picker
            v-model="date.start_day"
            scrollable
            class="mt-4"
            :min = getYearMin
            :max = getEndDate
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">CANCELAR</v-btn>
            <v-btn
              text
              color="primary"
              @click="
                $refs.menu.save(date.start_day);
                aceptStartDay();
              "
              >ACEPTAR</v-btn
            >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6" v-if="date.start_day != undefined">
        <v-menu
          ref="menu2"
          color="#1E4258"
          dark
          :close-on-content-click="false"
          :return-value.sync="date.end_day"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date.end_day"
              color="cyan"
              clear-icon="mdi-close-circle-outline"
              clearable
              label="Fecha final"
              prepend-icon="mdi-calendar-range"
              readonly
              v-on="on"
            >
            </v-text-field>
          </template>
          <v-date-picker
            v-model="date.end_day"
            scrollable
            :min="date.start_day"
            :max = getEndDate
          >
            <v-btn text color="primary" @click="menu2 = false">CANCELAR</v-btn>
            <v-btn text color="primary" 
                @click="
                    $refs.menu2.save(date.end_day);
                    aceptEndDay();"
              >ACEPTAR</v-btn
            >
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["infoData"],
  data() {
    return {
      date: {
        start_day: undefined,
        end_day: undefined,
      },
      dateNow: new Date(),
    };
  },
  computed: {
    getEndDate() {
        return this.dateNow.toISOString().slice(0,10)
    },
    getYearMin(){
        var year = new Date(this.dateNow.getFullYear()-1,this.dateNow.getMonth(),this.dateNow.getDate());
        return year.toISOString().slice(0,10)
    }
  },
  methods: {
    aceptStartDay() {
      if (this.date.start_day > this.date.end_day) {
        this.date.end_day = undefined;
      }
      if (this.date.start_day != undefined && this.date.end_day != undefined) {
        this.$emit("push",this.date);
      }
    },

    aceptEndDay(){
        this.$emit("push",this.date);
    }
  },
};
</script>

<style src="./reports.scss" lang="scss"/>