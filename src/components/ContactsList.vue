<template>
     <div class="contacts-container">
        <div v-for="contact in contacts" :key="contact.id"  class="card">
            <div class="card-info">
              <img src="@/assets/contact-image.svg" alt="Picture of the contact" srcset="">
              <h2 class="card-title">{{contact.first_name}}</h2>
              <h2 class="card-title">{{contact.last_name}}</h2>
              <h3>{{contact.phone_number}}</h3>
            </div>
            <div class="btn-container">
              <button v-on:click="goToEditView(contact.id)"><i class="fas fa-user-edit"></i></button>
              <button v-on:click="removeContact(contact.id)"><i class="fas fa-user-times"></i></button>    
            </div>
        </div>
    </div>
</template>

<script>
import {getContacts} from '@/services/http-contacts'
import {deleteContact} from '@/services/http-contacts.js'
export default {
  name: 'ContactsList',

  data(){
    return {
      contacts:[]
    }
  },
  mounted() {
   this.retrieveContacts()
  },
  methods: {
    async retrieveContacts(){
      try {
        const response = await getContacts()
        this.$store.commit({type:'setContacts', contacts:response.data});
        this.contacts = response.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    goToEditView(id) {
          this.$router.push('/contacts/edit/'+ id)
    },
    async removeContact(id) {
      try {
          await deleteContact(id)
          alert("Contacto eliminado.")
          this.retrieveContacts()
      } catch (error) {
          alert(error.response.data)
      }
    }
  }
}
</script>
<style scoped>
  .contacts-container {
    background-color:var(--bg-secondary);
    min-height:calc(100vh - 4rem);
    padding:2rem;
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
  }
  

  .card {
    width:90%;
    max-width: 400px;
    background-color:var(--bg-primary);
    border-radius: .7rem; 
    box-shadow: 0 0 .4rem .1rem #333;
    margin:1rem
  }
  .card-info{
    padding:1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2.card-title {
    margin:.1rem 0 0.5rem 0;
    font-size: 1.3rem;
  }
  h3{
    margin: .5rem 0 0rem 0;
  }
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    border-top: 2px solid var(--primary-color);
    padding:1rem 0;

  }
  img{
    margin-bottom: 1rem;
  }
  button{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    outline:none;
    cursor: pointer;
    border:none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);

  }
  i{
    color:white;
    font-size: 1.1rem;
  }

  @media screen and (min-width:1000px) {
    .contacts-container{
      flex-direction:row;
      justify-content:space-around;
      align-items:center;
    }
  }
</style>
