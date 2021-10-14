
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user:null,
    contacts:[],
  
  },
  mutations: {
    saveSession(state,payload) {
      state.user = payload.user;
    },
    closeSession(state) {
      state.user = null
      sessionStorage.removeItem('session')
    },
  }
})

export default store