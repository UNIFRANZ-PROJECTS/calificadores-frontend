<template>
  <v-col lg="6" sm="6" cols="12">
    <v-card class="mx-1 mb-1">
      <v-card-title class="pa-6 pb-3">
        <p>Sede {{contetInfo[0].sede}}</p>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pa-6 pt-0">
        <v-row no-gutters>
          <v-col cols="6" class="my-auto">
            <span class="" style="font-size: 42px"
              >{{contetInfo.length}} <span class="caption error--text">respuestas</span>
            </span>
          </v-col>
          <v-col cols="6">
            <ApexChart
              height="100"
              type="bar"
              v-if="apexLoading"
              :options="mock.apexBar1.options"
              :series="charts"
            ></ApexChart>
          </v-col>
        </v-row>
        <v-row no-gutters class="justify-space-between">
          <div>
            <div class="subtext">
              {{newRegister}} <v-icon color="success"> mdi-arrow-top-right</v-icon>
            </div>
            <div class="subtext-index">Nuevos Registros</div>
          </div>
          <!-- <div>
            <div class="subtext">
              3.25%<v-icon color="success"> mdi-arrow-top-right</v-icon>
            </div>
            <div class="subtext-index">Bounce Rate</div>
          </div>
          <div>
            <div class="subtext">
              330<v-icon color="error"> mdi-arrow-bottom-right</v-icon>
            </div>
            <div class="subtext-index">Views</div>
          </div> -->
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
    };
  },
  props: {
      contetInfo: Array,
  },
  computed:{
    newRegister() {
      let total = 0;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm  + '-' + dd;
      for (let i = 0; i < this.contetInfo.length; i++) {
        var date = new Date(this.contetInfo[i].updatedAt)
        var dddate = String(date.getDate()).padStart(2, '0');
        var mmdate = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyydate = date.getFullYear();
        date = yyyydate + '-' + mmdate  + '-' + dddate;
        if(today == date){
          total ++
        }
      }
      return total;
    },
    charts() {
      let info = []
      let data = this.groupBy(this.contetInfo,'area')
      for (let i = 0; i < data.length; i++) {
        info.push(
          {
            x:data[i][0].area,
            y:data[i].length
          }
        )
      }
    let charts = [{
          name:'respuestas',
          data: info
        }];
      return charts;
    }
  },
  methods:{
    groupBy(array, key) {
    return Array.from(array
        .reduce((m, o) => m.set(o[key], [...(m.get(o[key]) || []), o]), new Map)
        .values());
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