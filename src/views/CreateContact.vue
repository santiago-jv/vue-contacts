<template>
    <div>
        <Header/>
        <div class="container">
            <form v-on:submit.prevent="saveContact">
                <div class="form-group">
                    <label for="first_name">Nombres</label>
                    <input v-model="first_name" id="first_name" type="text">
                </div>
                <div class="form-group">
                    <label for="last_name">Apellidos</label>
                    <input v-model="last_name" id="last_name" type="text">
                </div>
                <div class="form-group">
                    <label for="phone_number">Número de teléfono</label>
                    <input v-model="phone_number" id="phone_number" type="text">
                </div>
                <div v-show="error" class="error-container">
                    <p class="error-message">
                        {{error}}
                    </p>
                </div>
                <button type="submit">Guardar contacto</button>
            </form>
        </div>
    </div>
</template>
<script>
import {createContact} from "@/services/http-contacts"
import Header from "@/components/Header.vue"

export default {
    name:'CreateContact',
    components:{Header},
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
        }
    }
}
</script>

<style scoped>

</style>