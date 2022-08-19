<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card>
      <v-card-title>
        <span >Area - Sede</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-data-iterator
            :items="estructure"
            :items-per-page.sync="itemsPerPage"
            hide-default-footer
          >
            <template >
              <v-row>
                <v-col
                  v-for="(key, index) in estructure" :key="index"
                  cols="12"
                  sm="6"
                  :md="12/estructure.length"
                  lg="3"
                >
                  <v-card>
                    <v-card-title>
                      {{ key[0].serv_area_headquarter.serv_headquarter.hdq_name }}
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>
                      <v-list-item v-for="(key2, index2) in key" :key="index2">
                        <v-list-item-content class="align-center">
                          {{ key2.serv_area_headquarter.serv_area.ars_name }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="show = false"> Cerrar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  data: () => ({
    show1: false,
    itemsPerPage: 1,
  }),
  props: ["visible", "infoData"],
  computed: {
    estructure() {
      return this.groupBy(this.infoData, 'serv_area_headquarter','id_campus');
    },
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
  methods: {
    groupBy(array, key, key2) {
    return Array.from(array
        .reduce((m, o) => m.set(o[key][key2], [...(m.get(o[key][key2]) || []), o]), new Map)
        .values());
    }
  },
};
</script>
