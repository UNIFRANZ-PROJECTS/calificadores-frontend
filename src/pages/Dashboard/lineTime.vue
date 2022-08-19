<template>
  <v-col cols="12">
    <v-card class="mx-1 mb-1">
      <v-card-title class="pa-6 pb-0">
        <v-row no-gutters>
          <v-col cols="7" sm="4" md="4" lg="5" class="d-flex align-center">
            <p>Gráfico de líneas diarias</p>
          </v-col>
          <!-- <v-col
                sm="3"
                md="12"
                lg="12"
                class="d-none d-sm-flex align-center"
                v-for="(item, i) in data" :key="i"
            >
                <v-icon size="18" color="warning">mdi-circle-medium</v-icon
                ><span
                
                class="card-dark-grey font-weight-regular mr-3"
                style="font-size: 18px"
                >{{item[0].area}}</span
                >
            </v-col> -->
          <v-col cols="5" sm="2" md="2" lg="1" offset-lg="1">
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-select
                  class="main-chart-select"
                  v-model="mainApexAreaSelect"
                  v-bind="attrs"
                  v-on="on"
                  dense
                  flat
                  single-line
                  hide-details
                  :items="select"
                  outlined
                ></v-select>
              </template>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="pa-6">
        <v-row>
          <v-col>
            <ApexChart
              v-if="apexLoading"
              height="350"
              type="area"
              :options="mock.mainApexArea.options"
              :series="mainApexAreaSelect === 'semanalmente'?dataSemana:dataMes"
            ></ApexChart>
            <!-- <ApexChart
                v-if="apexLoading"
                height="350"
                type="area"
                :options="mock.mainApexArea.options"
                :series="
                    mainApexAreaSelect === 'semanalmente'
                    ? mock.mainApexArea.series
                    : mainApexAreaSelect === 'Semanalmente'
                    ? mock.mainApexArea.series2
                    : mock.mainApexArea.series3
                "
                ></ApexChart> -->
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import mock from "./mock";
import ApexChart from "vue-apexcharts";

export default {
  name: "Dashboard",
  components: {
    ApexChart,
  },
  data() {
    return {
      mock,
      apexLoading: false,
      select: ["semanalmente", "Mensual"],
      dateNow: new Date(),
      mainApexAreaSelect: "semanalmente",
    };
  },
  props: {
    contetInfo: Array,
  },
  computed: {
    getWeekMin(dateNow) {
      let week = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate() - 8
      );
      return week;
    },
    addDay(x) {
      let day = new Date(x.getDate() + 1);
      return day;
    },
    dataMes(){
      let semanalmente = [];
      let info;
      let data;
      let dayWeek = new Date(
        new Date().getFullYear(),
        new Date().getMonth()-1,
        new Date().getDate()
      );

      for (let i = 0; i < 31; i++) {
        info = this.groupBy(this.getListByDay(this.getDay(dayWeek)), "area");
        for (let j = 0; j < info.length; j++) {
          if (semanalmente.filter((e) => e.name == info[j][0].area).length == 0) {
            data = {
              name: info[j][0].area,
              type: "line",
              data: [info[j].length],
            };
            if (
              i > 0 &&
              semanalmente.filter((e) => e.name == info[j][0].area).length == 0
            ) {
              for (let k = 0; k < i; k++) {
                if (
                  semanalmente.filter((e) => e.name == info[j][0].area).length == 0
                ) {
                  semanalmente.push({
                    name: info[j][0].area,
                    type: "line",
                    data: [0],
                  });
                } else {
                  semanalmente
                    .filter((e) => e.name == info[j][0].area)[0]
                    .data.push(0);
                }
              }
              semanalmente
                .filter((e) => e.name == info[j][0].area)[0]
                .data.push(info[j].length);
            } else {
              semanalmente.push(data);
            }
          } else {
            semanalmente
              .filter((e) => e.name == info[j][0].area)[0]
              .data.push(info[j].length);
          }
        }
        for (let k = 0; k < semanalmente.length; k++) {
                if( info.filter((e)=>e[0].area == semanalmente[k].name).length == 0 ){
                    semanalmente[k].data.push(0)
                }
        }

        dayWeek.setDate(dayWeek.getDate() + 1);
      }
      return semanalmente;
    },
    dataSemana() {
      let semanalmente = [];
      let info;
      let data;
      let dayWeek = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 7
      );
      for (let i = 0; i < 7; i++) {
        info = this.groupBy(this.getListByDay(this.getDay(dayWeek)), "area");
        for (let j = 0; j < info.length; j++) {
          if (semanalmente.filter((e) => e.name == info[j][0].area).length == 0) {
            data = {
              name: info[j][0].area,
              type: "line",
              data: [info[j].length],
            };
            if (
              i > 0 &&
              semanalmente.filter((e) => e.name == info[j][0].area).length == 0
            ) {
              for (let k = 0; k < i; k++) {
                if (
                  semanalmente.filter((e) => e.name == info[j][0].area).length == 0
                ) {
                  semanalmente.push({
                    name: info[j][0].area,
                    type: "line",
                    data: [0],
                  });
                } else {
                  semanalmente
                    .filter((e) => e.name == info[j][0].area)[0]
                    .data.push(0);
                }
              }
              semanalmente
                .filter((e) => e.name == info[j][0].area)[0]
                .data.push(info[j].length);
            } else {
              semanalmente.push(data);
            }
          } else {
            semanalmente
              .filter((e) => e.name == info[j][0].area)[0]
              .data.push(info[j].length);
          }
        }
        for (let k = 0; k < semanalmente.length; k++) {
                if( info.filter((e)=>e[0].area == semanalmente[k].name).length == 0 ){
                    semanalmente[k].data.push(0)
                }
        }

        dayWeek.setDate(dayWeek.getDate() + 1);
      }
      return semanalmente;
    },
    charts() {
      let info = [];
      let data = this.groupBy(this.contetInfo, "area");
      for (let i = 0; i < data.length; i++) {
        info.push({
          x: data[i][0].area,
          y: data[i].length,
        });
      }
      let charts = [
        {
          name: "respuestas",
          data: info,
        },
      ];
      return charts;
    },
    dataArea() {
      let data = [];

      let info = this.groupBy(this.contetInfo, "area");
      for (let i = 0; i < info.length; i++) {
        data.push(info[i][0].area);
      }
      return data;
    },
  },
  methods: {
    getDay(day) {
      var dd = String(day.getDate()).padStart(2, "0");
      var mm = String(day.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = day.getFullYear();
      let today = dd + "-" + mm + "-" + yyyy;
      return today;
    },
    getListByDay(day) {
      let newList = this.contetInfo.filter(
        (e) => e.date_answer == day.toString()
      );
      return newList;
    },
    groupBy(array, key) {
      return Array.from(
        array
          .reduce(
            (m, o) => m.set(o[key], [...(m.get(o[key]) || []), o]),
            new Map()
          )
          .values()
      );
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