import axios from "axios";
export default {
  namespaced: true,

  state: {
    report:[]
  },

  getters: {
    getReport : state => state.report,
  },
  mutations: {
    ADD_REPORT( state, data ){
        state.report = data
    },
  },
  actions: {
    async reportService({ commit }) {
      await axios.get("reports/"+window.localStorage.getItem("area_campus"))
        .then((result) => {
            commit('ADD_REPORT', result)
            return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
  },
};
