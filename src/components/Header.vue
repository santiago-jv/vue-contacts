<template>
    <header>
        <div class="container">
            <div class="logo">
                <i class="fas fa-address-book"></i>
                <h1 @click="goToHome">Contacts App</h1>
            </div>
            <i  @click="openMenu" class="fas fa-bars"></i>
        </div>
        <div class="menu-container">
            <i @click="closeMenu" class="fas fa-times close-btn"></i>
          <!--   <div v-if="user" class="user-container">
                <i class="fas fa-user-circle"></i>
                   <div class="user-info">aa
                    <p class="info">{{user.first_name}}</p>
                </div>

            </div> -->
            <nav>
                <router-link to="/contacts">Mis contactos</router-link>
                
            </nav>
            <div class="btn-container">
                <button @click="logout"><p>Cerrar sesión</p></button>
            </div>
        
        </div>
    </header>
</template>
<script> 
let menu 
export default {
    name:'Header',
    mounted(){
        menu = document.querySelector('.menu-container');
        this.user = this.$store.user
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
            if(this.$route.path !== '/login'){
                this.$router.push('/login')
            }
        }
    }    
}
</script>
<style scoped>
    header{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 4rem;
        box-shadow: 0px 0px 10px 1px #333;
        z-index: 1;
        background-color: var(--bg-primary);
    }
    h1{
        font-size: 1.5rem;
        color:var(--primary-color);
        cursor:pointer;
    }
    i{
        font-size: 1.5rem;
        color:var(--primary-color);
        cursor:pointer;
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
    .close-btn {
        color:white;
        margin:1rem;
    }
    .btn-container,nav {
        width: 100%;
        display: flex;
        justify-content: center; 
        
    }
    nav{
        margin:1rem 0;
    }
    nav a{
        text-decoration: none;
        font-size: 1.2rem;
        color:white;


    }
    nav a:hover {
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
</style>