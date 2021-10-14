<template>
    <div>
        <div class="container">
            <div class="btn-container">
                <Button :onClick="goToContacts" text="Regresar" nameOfClass="fas fa-undo"></Button>
            </div>
            <form v-on:submit.prevent="saveContact">
                <h1>Añade un contacto</h1>
                <div class="form-group">
                    <label for="first_name">Nombres</label>
                    <input class="field" minlength="2" maxlength="30" v-model="first_name" id="first_name" type="text">
                </div>
                <div class="form-group">
                    <label for="last_name">Apellidos</label>
                    <input class="field" minlength="2" maxlength="30" v-model="last_name" id="last_name" type="text">
                </div>
                <div class="form-group">
                    <label for="phone_number">Número de teléfono</label>
                    <input class="field" minlength="10" pattern="\d{10}$" title="Este campo debe tener mínimo 10 números" v-model="phone_number" id="phone_number" type="text">
                </div>
                <div v-show="error" class="error-container">
                    <p class="error-message">
                        {{error}}
                    </p>
                </div>
                <Button nameOfClass="fas fa-plus-circle" text="Guardar contacto" ></Button>
            </form>
        </div>
    </div>
</template>
<script>
import {createContact} from "@/services/http-contacts"
import Button from "@/components/Button.vue"

export default {
    name:'CreateContact',
    components:{Button},
    data(){
        return {
            first_name:"",
            last_name:"",
            phone_number:null,
            error:null,
        }
    },
    methods: {
        saveContact: async function() {
            try {
                await createContact({first_name:this.first_name,last_name:this.last_name,phone_number:this.phone_number})
                this.$router.push('/contacts')
            }catch (error) {
                this.error = error.response.data.detail;       
            }
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
        box-shadow:var(--shadow-small);
        border-radius: .5rem;
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
        color:var(--error-color);
    }
     .btn-container{
        width:100%;
        max-width:500px;
        margin:2rem auto;
    }

</style>