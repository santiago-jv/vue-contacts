<template>
   <div>
        <Header/>
        <div class="container">
            <form v-on:submit.prevent="updateContact">
                <div class="form-group">
                    <label for="first_name">Nombres</label>
                    <input v-model="contact.first_name" id="first_name" type="text">
                </div>
                <div class="form-group">
                    <label for="last_name">Apellidos</label>
                    <input v-model="contact.last_name" id="last_name" type="text">
                </div>
                <div class="form-group">
                    <label for="phone_number">Número de teléfono</label>
                    <input v-model="contact.phone_number" id="phone_number" type="text">
                </div>
                <div v-show="error" class="error-container">
                    <p class="error-message">
                        {{error}}
                    </p>
                </div>
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
   </div>
</template>
<script>
import {updateContact,getContact} from "@/services/http-contacts"
import Header from "@/components/Header.vue"

export default {
    name:'EditContact',
    components: {Header},
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
            console.log(this.$route.params);
            const response = await getContact(this.$route.params.id)
            this.contact = response.data
        }
    }
}
</script>