<template>
  <div>
    <div class="container">
    <form v-on:submit.prevent="startSession" autocomplete="off">
      <h1>Ingresa tu usuario</h1>

      <div class="form-group">
        <label for="email">Correo electrónico:</label>
        <input minlength="2" required v-model="email" id="email" type="email" class="field">
         <div  class="error-container">
            <p v-for="error in errors.email" :key="error" class="error-message">
                {{error}}
            </p>
          </div>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input  minlength="8"  required v-model="password" id="password" type="password" class="field">
          <div class="error-container">
              <p v-for="error in errors.password" :key="error" class="error-message">
                {{error}}
              </p>
          </div>
      </div>
     <div v-show="errors.message" class="error-container">
        <p class="error-message">
          {{errors.message}}
        </p>
      </div>
      <Loader v-if="loading" class="loader"></Loader>

      <Button text="Iniciar sesión" nameOfClass="fas fa-sign-in-alt" type="submit"/>
      <p @click="goToRegister" class="optional">¿No tienes usuario?</p>
    </form>
  </div>
  </div>
</template>
<script>
import {login} from '@/services/http-auth.js'
import Button from '@/components/Button.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'Login',
  components: {
    Button, Loader,
  },
  data(){
    return {
      email: '',
      password: '',
      loading:false,
      errors: {
        email: [],
        password: [],
        message:null
      },
    }
  },
  
  methods:{
    async startSession(){
      this.loading = true;
      try {
        const response = await login({email: this.email, password: this.password})
        console.log(response.data);
        this.$store.commit({type:'saveSession', user:response.data.user});
        sessionStorage.setItem('session', response.data.access_token)
        this.$router.push('/contacts')
       
      } catch (error) {
        this.errors = error.response.data
      }
       this.loading = false;
    },
    goToRegister(){
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
    .container{
      background-color:var(--bg-primary);
      height:calc(100vh - 4rem);
      padding-top: 2rem;
      display: flex;
      justify-content: center;
    }
    form{
        width: 90%;
        max-width:500px;
        background-color:var(--bg-primary);
        padding:2rem 3rem;
        height:fit-content;
        box-shadow:var(--shadow-small);
        border-radius: .5rem;

    }
    h1{
      font-size: 1.6rem;
      margin-bottom: 1.5rem;
    }
    label{
      display: block;
      margin-bottom: .2rem;
      font-weight: bold;
    }
    .form-group{
      margin-bottom: 1rem;
      width: 100%;
    }
    input.field {
      width: 100%;
      outline:none;
      border:2px solid var(--primary-color);
      border-radius: .3rem;
      height:2rem;
      font-size: 1.2rem;
      padding-left: .3rem;
    }
    .error-container{
      margin:1rem 0;
    }
    .error-message{
      color:var(--error-color);
    }
    .optional {
      text-decoration: underline;
      margin-top: 1rem;
      cursor: pointer;
      color:var(--primary-color);
    }
</style>