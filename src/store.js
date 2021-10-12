
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
      console.log(payload);
      state.user = payload.user;
    },
    setContacts(state,payload) {
      console.log(payload);
      state.contacts = payload.contacts;
    },
    closeSession(state) {
      state.user = null
      sessionStorage.removeItem('token')
    },
  }
})

export default store