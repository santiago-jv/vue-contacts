<template>
    <header>
        <div class="container">
            <h1 @click="goToHome">Contacts App</h1>
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
        
        </div>
    </header>
</template>
<script> 
let menu 

export default {
    name:'Header',

    data(){
        return{user:"null"}
    },
    mounted(){
        menu = document.querySelector('.menu-container');
        this.user = this.$store.user
        console.log(this.user);
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
        position: fixed;
        z-index: 2;
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

</style>