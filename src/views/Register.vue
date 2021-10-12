<template>
  <div>
    <Header/>
    <div class="container">
      <form v-on:submit.prevent="createUser" autocomplete="off">
        <h1>Registra tu usuario</h1>

        <div class="form-group">
          <label for="username">Nombre de usuario:</label>
          <input minlength="2" required v-model="username" id="username" type="text" class="field">
          <div v-show="fields_errors.username !== ''" class="error-container">
            <p class="error-message">
              {{fields_errors.username[0]}}
            </p>
        </div>
        </div>
        <div class="form-group">
          <label for="first_name">Nombre:</label>
          <input required v-model="first_name" id="first_name" type="text" class="field">
        </div>
        <div class="form-group">
          <label for="last_name">Apellido:</label>
          <input minlength="2" required v-model="last_name" id="last_name" type="text" class="field">
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input minlength="4" required v-model="email" id="email" type="email" class="field">
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input minlength="8" required v-model="password" id="password" type="password" class="field">
        </div>
        <div class="form-group">
          <label  for="repeated_password">Repita la contraseña:</label>
          <input minlength="8" required v-model="repeated_password" id="repeated_password" type="password" class="field">
        </div>
        <div v-show="error" class="error-container">
          <p class="error-message">
            {{error}}
          </p>
        </div>
        <Loader v-if="loading" class="loader"></Loader>
        <Button  text="Crear usuario" nameOfClass="fas fa-cloud-download-alt" type="submit"/>
        <p @click="goToLogin" class="optional">¿Ya tienes usuario?</p>
      </form>
    </div>
  </div>
</template>
<script>
import {register} from '@/services/http-auth.js'
import Button from '@/components/Button.vue'
import Loader from '@/components/Loader.vue'
import Header from "@/components/Header.vue"
export default {
  name: 'Login',
  components: {
    Button, Loader,Header
  },
  data(){
    return {
      username: '',
      first_name:'',
      last_name:'',
      email: '',
      password: '',
      repeated_password:'',
      loading:false,
      error: null,
      fields_errors:{
        username:'',
      }
    }
  },
  
  methods:{
    isValid(){
        return this.password === this.repeated_password;
    },
    async createUser(){
        if(this.isValid()) {
            this.loading = true;
            try {      
                await register({username: this.username,first_name:this.first_name,last_name:this.last_name,email:this.email, password: this.password})
                this.$router.push('/login')
            
            } catch (error) {
                this.fields_errors.username = error.response.data.username
                this.error = error.response.data.detail
            }
            this.loading = false;
        }
        else this.error = "Las contraseñas no son iguales."
    },
    goToLogin(){
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
    .container{
        background-color:var(--bg-secondary);
      
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
        border-radius: .3rem;
        margin-bottom: 2rem;
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
        color:tomato;
    }
    .optional {
        text-decoration: underline;
        margin-top: 1rem;
        cursor: pointer;
        color:var(--primary-color);

    }
</style>