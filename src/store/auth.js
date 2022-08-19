import axios from "axios";
export default {
  namespaced: true,

  state: {
    token: null,
    user: null,
    rol: null,
    permisions: [],
    areacampus: [],
  },

  getters: {
    rol(state) {
      return state.rol;
    },
    authenticated(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    },
    permisions(state) {
      return state.permisions;
    },
    getAreaCampus(state) {
      return state.areacampus;
    },
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.token = data;
    },
    SET_USER(state, data) {
      state.user = data;
    },
    SET_ROL(state, data) {
      state.rol = data;
    },
    SET_PERMISIONS(state, data) {
      state.permisions = data;
    },
    SET_AREA_CAMPUS(state, data) {
      state.areacampus = data;
    },
    SET_ADD_AREA_CAMPUS(state, data) {
      state.areacampus.push(data);
    },
  },
  actions: {
    async signIn({ commit, dispatch }, credentials) {
      const result = await axios.post(`admin/auth`, credentials);
      console.log(result.data);
      await commit("SET_USER", result.data.user.adm_name);
      await commit("SET_ROL", result.data.user.id_rol);
      await commit("SET_AREA_CAMPUS", result.data.area_campus_name);
      console.log(result.data.area_campus);
      localStorage.setItem("adm_name", result.data.user.adm_name);
      localStorage.setItem("area_campus", result.data.area_campus);
      localStorage.setItem("user", result.data.user.id);
      localStorage.setItem("type_user", result.data.user.serv_type_user.tyUsr_name);
      localStorage.setItem("rol", result.data.user.id_rol);
      localStorage.setItem("permisions", result.data.permisions);
      await dispatch("attempt", result.data.token);
      await dispatch("sendPerm", result.data.permisions);
    },
    async sendPerm({ commit }, perm) {
      console.log(perm);
      await commit("SET_PERMISIONS", perm);
    },
    async attempt({ commit, state }, token) {
      try {
        if (token) {
          commit("SET_TOKEN", token);
        }
        if (!state.token) {
          return;
        }
      } catch (r) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
        commit("SET_ROL", null);
      }
    },
    async addAreaCampus({ commit }, data) {
      commit("SET_ADD_AREA_CAMPUS", data);
    },
    async signOut({ commit }) {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
      commit("SET_ROL", null);
    },
  },
};
