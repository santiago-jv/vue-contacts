<template>
    <header>
        <div class="container">
            <div class="logo">
                <i class="fas fa-address-book"></i>
                <h1 @click="goToHome">Contacts App</h1>
            </div>
            <i  @click="openMenu" class="fas fa-bars open-btn"></i>
        </div>
        <div class="menu-container">
            <i @click="closeMenu" class="fas fa-times close-btn"></i>
            <h2 v-if="user">Menú</h2>
            <div v-if="user" class="user-container">
                <i class="fas fa-user-circle"></i>
                <div class="user-info">
                    <p class="info">{{user.user.first_name}}</p>
                    <p class="info">{{user.user.last_name}}</p>
                </div>

            </div> 
            <nav v-if="user">
                <p @click="goToContacts">Mis contactos</p>
            </nav>
            <div v-else class="btn-container">
                <button @click="goToLogin"><p>Iniciar sesión</p></button>
            </div>
            <div v-if="user" class="btn-container">
                <button @click="logout"><p>Cerrar sesión</p></button>
            </div>
        
        </div>
    </header>
</template>
<script> 
let menu 
import {mapState} from 'vuex'
export default {
    name:'Header',
    mounted(){
        menu = document.querySelector('.menu-container');

    },
    methods:{
        goToHome() {
            if(this.$route.path !== '/'){
                this.$router.push('/')
            }
        },
        openMenu() {
            menu.style.right = '0'
        },
        closeMenu() {
            menu.style.right = '-100%'
        },
        logout() {
            this.$store.commit('closeSession')
            this.goToLogin()
        }, 
        goToLogin(){
            if(this.$route.path !== '/login'){
                this.$router.push('/login')
            }
            this.closeMenu()
        },
        goToContacts(){
            if(this.$route.path !== '/contacts'){
                this.$router.push('/contacts')
            }
            this.closeMenu()
        }
    }    ,
    computed: mapState(['user'])
    
}
</script>
<style scoped>
    header{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 4rem;
        border-bottom: 2px solid var(--primary-color);
        z-index: 1;
        background-color: var(--bg-primary);
    }
    .logo i{
        font-size: 1.4rem;
        color: var(--primary-color);
    }
    h1{
        font-size: 1.5rem;
        color:var(--primary-color);
        cursor:pointer;
    }
    h2{
        color:#fff;
        text-align: center;
        margin-bottom: 1.5rem;
    }
    .open-btn, .close-btn {
        font-size: 1.5rem;
        color:var(--primary-color);
        cursor:pointer;
    }
     .close-btn {
        color:white;
        margin:1rem;
    }

    .container{
        display: flex;
        justify-content: space-between;
        width: 90%;

        margin:auto;
        align-items: center;
        height: 100%;
    }
    .menu-container{
        z-index: 2;
        position: fixed;
        top:0;
        right: -100%;
        width: 80%;
        height:100vh;
        background:var(--primary-color);
        transition:right 0.5s ease;
        
    }
   
    .btn-container,nav {
        width: 100%;
        display: flex;
        justify-content: center; 
        
    }
    nav{
        margin:1rem 0;
    }
    nav p{
        font-size: 1.2rem;
        color:white;
        cursor:pointer;
    }
    nav p:hover {
        text-decoration: underline;
    }
    button i {
        margin-right: .5rem;
        color:  var(--primary-color);
    }
    button p{
        font-weight: bold;
        color:var(--primary-color);
        font-size: 1rem; 
    }
    button {
        display: flex;
        padding:.4rem 1.1rem;
        align-items:center;
        justify-content:center;
        border-radius: .5rem;
        border:none;
        cursor:pointer;
        background-color:white;
    }
    .logo {
        display: flex;
        align-items:center;
        
    }
    .logo i{
        margin-right: .7rem;
        font-size: 1.7rem;
    }
    .user-container{
        display: flex;
        flex-direction: column;
        align-items:center;
    }
    .user-container i {
        color:#fff;
        font-size: 5rem;
        margin-bottom: .5rem;
    }
    .info {
        color:#fff;
        font-size: 1.5rem;
        text-align: center;
    }
</style>