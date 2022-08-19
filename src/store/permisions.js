import axios from "axios";
export default {
  namespaced: true,


  getters: {

  },
  mutations: {

  },
  actions: {
    async getPermisions({ dispatch },) {
      await axios.get(`permisions`)
        .then((result) => {
          return dispatch(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
