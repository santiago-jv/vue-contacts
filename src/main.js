import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'
import {getUser} from "@/services/http-auth.js"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    if(sessionStorage.getItem('session')){

      this.retrieveUser();
    }
  }
  ,
  methods: {
    async retrieveUser(){
      const response = await getUser();
      this.$store.commit({type:'saveSession',user:response.data});
    }
  }
}).$mount('#app')





