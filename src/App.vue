<template>
  <div id="app">
   

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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

:root {
  --text-color:rgb(17, 17, 17);
  --primary-color:#0D2C5A;
  --bg-primary:#fff;
  --shadow-small: 0 5px 10px rgba(0,0,0,0.12);
  --shadow-medium: 0 8px 30px rgba(0,0,0,0.12);
}

input:-webkit-autofill:focus {
    box-shadow: 0 0 0 30px white inset !important;
    transition: background-color 5000s ease-in-out 0s;
}  

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans', sans-serif;
  color:var(--text-color);
  -webkit-tap-highlight-color: transparent;
}

main{
  margin-top: 4rem;
}
</style>
