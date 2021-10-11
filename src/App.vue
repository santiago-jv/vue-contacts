<template>
  <div id="app">
   
    <!-- <div id="nav">
      <router-link to="/">ContactsApp</router-link> |
      <router-link to="/contacts">Mis contactos</router-link>
    </div> -->
    <main>
      <router-view/>
    </main>
  </div>
</template>
<script>

export default {
} 
</script>
<style>
:root {
  --text-color:rgb(17, 17, 17);
  --primary-color:#0D2C5A;
  --bg-primary:#fff;
  --bg-secondary:#EDEDED;
}


*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color:var(--text-color);
}

main{
  margin-top: 4rem;
}
</style>
