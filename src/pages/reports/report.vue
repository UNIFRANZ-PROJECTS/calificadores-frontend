<template>
  <v-container fluid class="icons-page">
    <DateSelect
      v-on:push="generateReportByDate"
    />
    <v-row>
      <v-col cols="12">
        <v-tabs light centered grow>
          <v-tabs-slider></v-tabs-slider>
          <v-tab :href="`#tab-national`" v-if="estructure.length >1"> General </v-tab>
          <v-tab v-for="(key, index) in estructure" :key="index" :href="`#tab-`+key[0].sede"> {{key[0].sede}} </v-tab>
          <v-tab-item :value="'tab-national'" v-if="estructure.length >1">
          <TabNational/>
          </v-tab-item>
          <v-tab-item v-for="(key, index) in estructure" :key="index" :value="`tab-`+key[0].sede">
            <Tab
              :infoData="key"
            />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DateSelect from "./dateSelect.vue";
import TabNational from "./tabGeneral.vue"
import Tab from "./tab.vue"
import dataEvent from "./dataEvent";
import "export-json-excel";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DateSelect,
    TabNational,
    Tab
  },
  data() {
    return {
      dataEvent,
      eventDataReport: [],
      fontAwesome: [],
      materialIcons: [],
    };
  },
  computed: {
    ...mapGetters(["getReport"]),
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
      this.$http.get("/report/areacampus/"+window.localStorage.getItem("area_campus"))
      .then((result) => this.addReport(result.data));
    },
    groupBy(array, key) {
    return Array.from(array
        .reduce((m, o) => m.set(o[key], [...(m.get(o[key]) || []), o]), new Map)
        .values());
    },
    generateReportByDate(date){
      this.$http.get("/report/areacampus/"+window.localStorage.getItem("area_campus"))
      .then((result) => {
        let start_day = new Date(date.start_day);
        let end_day = new Date(date.end_day);
        let data =[];
        for (let i = 0; i < result.data.length; i++) {
          let dateAnswer = new Date(result.data[i].date_time_answer)
          if( start_day <= dateAnswer && dateAnswer <= end_day){
            data.push(result.data[i])
          }
        }
        this.addReport(data);
      });

    },
  },
};
</script>

<style src="./reports.scss" lang="scss"/>