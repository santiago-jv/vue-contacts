<template>
   <div>
        <div class="container">
            <div class="btn-container">
                <Button :onClick="goToContacts" text="Regresar" nameOfClass="fas fa-undo"></Button>
            </div>
            <form v-on:submit.prevent="updateContact">
                <h1>Edita un contacto</h1>
                <div class="form-group">
                    <label for="first_name">Nombres</label>
                    <input minlength="2" class="field" v-model="contact.first_name" id="first_name" type="text">
                </div>
                <div class="form-group">
                    <label for="last_name">Apellidos</label>
                    <input minlength="2" class="field" v-model="contact.last_name" id="last_name" type="text">
                </div>
                <div class="form-group">
                    <label for="phone_number">Número de teléfono</label>
                    <input minlength="10" pattern="\d{10}$" title="Este campo debe tener mínimo 10 números" class="field" v-model="contact.phone_number" id="phone_number" type="text">
                </div>
                <div v-show="error" class="error-container">
                    <p class="error-message">
                        {{error}}
                    </p>
                </div>
                <Button text="Guardar cambios" nameOfClass="fas fa-pen"></Button>
            </form>
        </div>
   </div>
</template>
<script>
import {updateContact,getContact} from "@/services/http-contacts"
import Button from "@/components/Button.vue"

export default {
    name:'EditContact',
    components: {Button},
    data(){
        return {
            contact:{
                first_name:"",
                last_name:"",
                phone_number:"",
               
            },
            error:null,
        }
    },
    mounted(){
        this.retrieveContact()
    },
    
    methods: {
        async updateContact () {
            try {
                await updateContact(this.$route.params.id,this.contact)
                this.$router.push('/contacts')
            }catch (error) {
                this.error = error.response.data.detail;       
            }
        },
        async retrieveContact() {
            const response = await getContact(this.$route.params.id)
            this.contact = response.data
        },
        goToContacts(){
            this.$router.push('/contacts')
        }
    }
}
</script>
<style scoped>
    .container{
        background-color:var(--bg-primary);
        padding-top: 2rem;
        display:flex;
        flex-direction:column;
        align-items: center;
        min-height: calc(100vh - 4rem);
    }
    form{
        width: 90%;
        max-width:500px;
        background-color:var(--bg-primary);
        padding:2rem 3rem;
        height:fit-content;
        margin-bottom: 2rem;
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
    .btn-container{
        width:100%;
        max-width:500px;
        margin:2rem auto;
    }
</style>