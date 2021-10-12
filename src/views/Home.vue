<template>
  <div>
    <Header/>
    <main>
      
      <div class="image-container">
        <img src="@/assets/calling.svg" alt="Calling Image" class="logo">
      </div>
      <section class="main-content">
        <h3 class="content">
          En esta aplicación, te damos la posibilidad de
          poder almacenar tus contactos. Bienvenido!
        </h3>
      </section>
      <Button :onClick="goToLogin" nameOfClass="fas fa-star" text="Empezar"/>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from "@/components/Button.vue"
import Header from "@/components/Header.vue"

export default {
  name: 'Home',
  components: {
    Button,Header
  },
  methods: {
    goToLogin() {
      this.$router.push('/login')
    }
  }  
}
</script>

<style scoped>
  main{
    width:90%;
    margin:auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height:calc(100vh - 4rem)
  }
  img {
    user-select: none;
    -webkit-user-drag: none;
    width:90%;
    max-width:600px;
  }
  h3.content{
    text-align: center;
    font-size: 1.7rem;
  }
  section.main-content {
    margin-bottom: 2rem;
  }
</style>