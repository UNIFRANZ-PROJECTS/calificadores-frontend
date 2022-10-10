import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth'

Vue.use(Vuex);

export default new Vuex.Store({

  namespace: true,
  state: {
    drawer: true,
    permisions:[],
    rolPermisions:[],
    info:[],
    campus:[],
    allAreas:[],
    administrators:[],
    typeUsers:[],
    roles:[],
    areaCampus:[],
    typeAnswers:[],
    questions:[],
    surveys:[],
    report:[],
    terminals:[],
    terminalSurvey:[],
  },
  modules:{
    auth
  },
  getters: {
    getInfo : state => state.info,
    getPermisions : state => state.permisions,
    getRolPermisions : state => state.rolPermisions,
    getCampus : state => state.campus,
    getAllAreas : state => state.allAreas,
    getAdministrators : state => state.administrators,
    getTypeUsers : state => state.typeUsers,
    getRoles : state => state.roles,
    getAreaCampus : state => state.areaCampus,
    getTypeAnswers : state => state.typeAnswers,
    getTerminals : state => state.terminals,
    getTerminalSurvey : state => state.terminalSurvey,
    getQuestions : state => state.questions,
    getSurveys : state => state.surveys,
    getReport : state => state.report,

    DRAWER_STATE(state) {
      return state.drawer;
    }
    

  },
  actions: {
    TOGGLE_DRAWER({ commit }) {
      commit('toggleDrawer');
    },
    // addTypeUsers
    addPermisions ({ commit }, data) {
      commit('ADD_PERMISIONS', data)
    },
    addRolPermisions ({ commit }, data) {
      commit('ADD_ROL_PERMISIONS', data)
    },
    addAreasCampus ({ commit }, data) {
      commit('ADD_AREAS_CAMPUS', data)
    },
    addInfo ({ commit }, data) {
      commit('ADD_INFO', data)
    },
    addCampus ({ commit }, data) {
      commit('ADD_CAMPUS', data)
    },
    addAllAreas ({ commit }, data) {
      commit('ADD_ALL_AREAS', data)
    },
    addAdministrators ({ commit }, data) {
      commit('ADD_ADMINISTRATORS', data)
    },
    updateAdministrator ({ commit }, data) {
      commit('UPDATE_ADMINISTRATOR', data)
    },
    addOneAdministrator ({ commit }, data) {
      commit('ADD_ONE_ADMINISTRATOR', data)
    },
    addOneRolPermisions ({ commit }, data) {
      commit('ADD_ONE_ROL_PERMISIONS', data)
    },
    updateRolPermision ({ commit }, data) {
      commit('UPDATE_ROL_PERMISIONS', data)
    },
    updateTypeUser ({ commit }, data) {
      commit('UPDATE_TYPE_USER', data)
    },
    updateAreaCampus ({ commit }, data) {
      commit('UPDATE_AREA_CAMPUS', data)
    },
    updateArea ({ commit }, data) {
      commit('UPDATE_AREA', data)
    },
    updateTerminal ({ commit }, data) {
      commit('UPDATE_TERMINAL', data)
    },
    addOneTypeUser ({ commit }, data) {
      commit('ADD_ONE_TYPE_USER', data)
    },
    addOneAreaCampus ({ commit }, data) {
      commit('ADD_ONE_AREA_CAMPUS', data)
    },
    addOneArea ({ commit }, data) {
      commit('ADD_ONE_AREA', data)
    },
    addOneTerminal ({ commit }, data) {
      commit('ADD_ONE_TERMINAL', data)
    },
    addTypeUsers ({ commit }, data) {
      commit('ADD_TYPE_USERS', data)
    },
    addTerminals ({ commit }, data) {
      commit('ADD_TERMINALS', data)
    },
    addTerminalSurvey ({ commit }, data) {
      commit('ADD_TERMINALS_SURVEY', data)
    },
    addRoles({ commit }, data) {
      commit('ADD_ROLES', data)
    },
    addTypeAnswers({ commit }, data) {
      commit('ADD_TYPE_ANSWERS', data)
    },
    addQuestions({ commit }, data) {
      commit('ADD_QUESTIONS', data)
    },
    addOneQuestion ({ commit }, data) {
      commit('ADD_ONE_QUESTION', data)
    },
    updateQuestion ({ commit }, data) {
      commit('UPDATE_QUESTION', data)
    },
    addSurveys ({ commit }, data) {
      commit('ADD_SURVEYS', data)
    },
    addOneSurvey ({ commit }, data) {
      commit('ADD_ONE_SURVEY', data)
    },
    updateSurvey ({ commit }, data) {
      commit('UPDATE_SURVEY', data)
    },
  addReport ({ commit }, data) {
    commit('ADD_REPORT', data)
  },
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    ADD_PERMISIONS( state, data ){
      state.permisions = data
    },
    ADD_ROL_PERMISIONS( state, data ){
      state.rolPermisions = data
    },
    ADD_AREAS_CAMPUS( state, data ){
      state.areaCampus = data
    },
    ADD_INFO( state, data ){
      state.info = data
    },
    ADD_CAMPUS( state, data ){
      state.campus = data
    },
    ADD_ALL_AREAS( state, data ){
      state.allAreas = data
    },
    ADD_ADMINISTRATORS( state, data ){
      state.administrators = data
    },
    ADD_ONE_ADMINISTRATOR( state, data ){
      state.administrators.push(data);
    },
    ADD_ONE_ROL_PERMISIONS( state, data ){
      state.rolPermisions.push(data);
    },
    UPDATE_ROL_PERMISIONS( state, data ){
      state.rolPermisions = [
        ...state.rolPermisions.filter(element => element.id !== data.id),
        data
     ]
    },
    UPDATE_ADMINISTRATOR( state, data ){
      state.administrators = [
        ...state.administrators.filter(element => element.id !== data.id),
        data
     ]
    },
    UPDATE_TYPE_USER( state, data ){
      state.typeUsers = [
        ...state.typeUsers.filter(element => element.id !== data.id),
        data
     ]
    },
    UPDATE_AREA_CAMPUS( state, data ){
      state.areaCampus = [
        ...state.areaCampus.filter(element => element.id !== data.id),
        data
     ]
    },
    UPDATE_AREA( state, data ){
      state.allAreas = [
        ...state.allAreas.filter(element => element.id !== data.id),
        data
     ]
    },
    UPDATE_TERMINAL( state, data ){
      state.terminals = [
        ...state.terminals.filter(element => element.id !== data.id),
        data
     ]
    },
    ADD_ONE_TYPE_USER( state, data ){
      state.typeUsers.push(data);
    },
    ADD_ONE_AREA_CAMPUS( state, data ){
      state.areaCampus.push(data);
    },
    ADD_ONE_AREA( state, data ){
      state.allAreas.push(data);
    },
    ADD_ONE_TERMINAL( state, data ){
      state.terminals.push(data);
    },
    ADD_TYPE_USERS( state, data ){
      state.typeUsers = data
    },
    ADD_TERMINALS( state, data ){
      state.terminals = data
    },
    ADD_TERMINALS_SURVEY( state, data ){
      state.terminalSurvey = data
    },
    ADD_ROLES( state, data ){
      state.roles = data
    },
    ADD_TYPE_ANSWERS( state, data ){
      state.typeAnswers = data
    },
    ADD_QUESTIONS( state, data ){
      state.questions = data
    },
    ADD_ONE_QUESTION( state, data ){
      state.questions.push(data);
    },
    UPDATE_QUESTION( state, data ){
      state.questions = [
        ...state.questions.filter(element => element.id !== data.id),
        data
     ]
    },
    ADD_SURVEYS( state, data ){
      state.surveys = data
    },
    ADD_ONE_SURVEY( state, data ){
      state.surveys.push(data);
    },
    UPDATE_SURVEY( state, data ){
      state.surveys = [
        ...state.surveys.filter(element => element.id !== data.id),
        data
     ]
    },
    ADD_REPORT( state, data ){
      state.report = data
    },
  },
});
