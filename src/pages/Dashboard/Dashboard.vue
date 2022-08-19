<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row>
        <CardSede
          v-for="(item, i) in estructure" :key="i"
          :contetInfo=item
        />
    <v-row>
      <v-col cols="12">
        <v-tabs light centered grow>
          <v-tabs-slider></v-tabs-slider>
          <v-tab v-for="(key, index) in estructure" :key="index" :href="`#tab-`+key[0].sede"> {{key[0].sede}} </v-tab>
          <v-tab-item v-for="(key, index) in estructure" :key="index" :value="`tab-`+key[0].sede">
            <LineTime
              :contetInfo=key
            />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import mock from "./mock";
import LineTime from "./lineTime.vue"
import CardSede from "./cardSede.vue";
import { mapGetters, mapActions  } from 'vuex';

export default {
  name: "Dashboard",
  components: {
    LineTime,
    CardSede
  },
  data() {
    return {
      mock,
      apexLoading: false,
      value: this.getRandomInt(10, 90),
      value2: this.getRandomInt(10, 90),
      mainApexAreaSelect: "Diario",
    };
  },
  computed: {
    ...mapGetters(['getReport']),
    estructure() {
      let est = this.groupBy(this.getReport, 'sede');
      return est
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["addReport"]),
    initialize() {
       this.$http.get("/areas/areascampus/"+localStorage.getItem("area_campus"))
      .then((result) => this.addReport(result.data));
    },
    groupBy(array, key) {
    return Array.from(array
        .reduce((m, o) => m.set(o[key], [...(m.get(o[key]) || []), o]), new Map)
        .values());
    },
    getRandomDataForTrends() {
      const arr = [];
      for (let i = 0; i < 12; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }
      return arr;
    },
    generatePieSeries() {
      let series = [];

      for (let i = 0; i < 4; i++) {
        let y = Math.floor(Math.random() * (500 - 100 + 100)) + 100;
        series.push(y);
      }
      return series;
    },
    getRandomInt(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
  },
  mounted() {

    setTimeout(() => {
      this.apexLoading = true;
    });
  },
};
</script>

<style src="./Dashboard.scss" lang="scss"/>
