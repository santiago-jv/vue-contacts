<template>
<main>
    <input class="field" type="text" v-model="search" placeholder="Busca un contacto"/>
    <div v-if="loading" class="contacts-container">
        <Loader/>
    </div>

    <div v-else-if="filteredContacts.length > 0"  class="contacts-container">
      <div  class="contacts-container">
        <div v-show="isOpen" class="container" >
          <div class="modal">
            <div class="modal-title">
              <h1>
                Solicitud de confirmación
              </h1>
              <i @click="closeModal" class=" fas fa-times close-btn"></i>
            </div>
            <div class="modal-body">
              <p>Está seguro(a) de querer eliminar este contacto?</p>
            </div>
            <div class="modal-footer">
                <button @click="removeContact">
                    <i class="fas fa-check-circle"></i> <p>Confirmar</p>
                </button>
                <button @click="closeModal">
                    <i  class=" fas fa-ban"></i> <p>Cancelar</p>     
                </button>
            </div>
          </div>
        </div>
        
        
        <div v-for="contact in filteredContacts" :key="contact.id"  class="card">
            <div class="card-info">
              <img src="@/assets/contact-image.svg" alt="Picture of the contact" srcset="">
              <h2 class="card-title">{{contact.first_name}}</h2>
              <h2 class="card-title">{{contact.last_name}}</h2>
              <h3>{{contact.phone_number}}</h3>
            </div>
            <div class="btn-container">
              <button v-on:click="goToEditView(contact.id)"><i class="fas fa-user-edit"></i></button>
              <button v-on:click="call(contact.phone_number)"><i class="fas fa-phone"></i></button>
              <button v-on:click="confirm(contact.id)"><i class="fas fa-user-times"></i></button>    
            </div>
        </div>
      </div>
    </div>
    <div v-else class="contacts-container not-content">
        <img class="not-content-img" src="@/assets/not-content.svg" alt="No hay contactos">
        <h2 class="message">
         No hay contactos disponibles.
        </h2>
    </div>
</main>
</template>

<script>
import {getContacts} from '@/services/http-contacts'
import {deleteContact} from '@/services/http-contacts.js'
import Loader from '@/components/Loader.vue'

export default {
  name: 'ContactsList',
  components:{Loader},
  data(){
    return {
      contacts:[],
      loading:false,
      isOpen:false,
      id_contact:null,
      search:"",
    }
  },
  mounted() {
   this.retrieveContacts()
  },

  methods: {
    async retrieveContacts(){
      this.loading = true
      try {
        const response = await getContacts()
        this.$store.commit({type:'setContacts', contacts:response.data});
        this.contacts = response.data;
      } catch (error) {
        console.log(error.response);
      }
      this.loading = false;
    },
    goToEditView(id) {
          this.$router.push('/contacts/edit/'+ id)
    },
    async removeContact() {
      this.isOpen = false
      try {
          await deleteContact(this.id_contact)
          this.retrieveContacts()
      } catch (error) {
          console.log(error.response.data)
      }
    },
    call(phone_number){
      window.location.href="tel:"+phone_number
    },
    confirm(id){
     this.isOpen = true
     this.id_contact = id
    },
    closeModal(){
      this.isOpen = false;
    },
   
  },
  computed:{
    filteredContacts(){
        return this.contacts.filter(contact=>{
          const dataToSearch = this.search.toLowerCase()
          const first_name = contact.first_name.toLowerCase()
          const last_name = contact.last_name.toLowerCase()
          return first_name.includes(dataToSearch) || last_name.includes(dataToSearch)
        })
      
    }
  }

}
</script>
<style scoped>
  .contacts-container {
    background-color:var(--bg-primary);
    min-height:calc(100vh - 4rem);
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
    width: 90%;
    max-width: 1000px;
    margin:auto;
  }
  

  .card {
    width:90%;
    max-width: 350px;
    background-color:var(--bg-primary);
    border-radius: .7rem; 
    box-shadow:var( --shadow-medium);
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
  .btn-container button{
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
  .btn-container button i{
    color:white;
    font-size: 1.1rem;
  }
  .not-content {
    flex-direction: column;

  }
  .not-content-img {
    width: 90%;
    max-width:500px;
  }
  .message {
    text-align: center;
  }
  @media screen and (min-width:1000px) {
    .contacts-container{
      flex-direction:row;
      justify-content:space-around;
      align-items:center;
      flex-wrap: wrap;
    }
  }


  /* modal styles */
  .field{
    outline:none;
    border:2px solid var(--primary-color);
    width:90%;
    max-width: 400px;
    display: block;
    margin:6rem auto 0rem auto ;
    height:35px;
    border-radius: .9rem;
    padding-left:.5rem;
    font-size: 1.2rem;
  }
  .container {
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100vh;
        background-color:rgba(0,0,0,0.7);
        display: flex;
        align-items:center;
        justify-content:center;
        z-index: 100;
    }
    .modal{
        width:95%;
        max-width: 500px;
        height:fit-content;
        border-radius: .5rem;
        background-color:#fff;
    }
    .modal-title {
        display: flex;
        align-items: center;
        justify-content:space-between;
        padding:1rem;
        border-bottom: 1px solid var(--primary-color);

    }
    .modal-title i {
        font-size: 1.5rem;
        color: var(--primary-color);
        cursor: pointer;
    }
    h1{
        font-size: 1.5rem;
    }
    .modal-body {
        padding:1rem;
    }
    .modal-body p{
        font-size: 1.2rem;
    }
    .modal-footer {
        display: flex;
        padding:1rem;
        border-top: 1px solid var(--primary-color);
    }
    .modal-footer button i {
        margin-right: .5rem;
        color: white;
    }
    .modal-footer button p{
        font-weight: bold;
        color: white;
        font-size: 1rem;
    }
    .modal-footer button {
        margin-right: 2rem;
        display: flex;
        padding:.4rem 1.1rem;
        align-items:center;
        justify-content:center;
        border-radius: .5rem;
        border:none;
        cursor:pointer;
        background-color:var(--primary-color);
    }
</style>
