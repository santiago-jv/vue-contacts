<template>
  <div>
    
    <ContactsList/>
    <button @click="goToCreateView" class="floating-action-btn"><i class="fas fa-user-plus"></i></button>
  </div>
</template>

<script>

import ContactsList from "@/components/ContactsList.vue"

export default {
  name: 'Contacts',
  components: {ContactsList},
  methods: {
    goToCreateView() {
      this.$router.push('contacts/create')
    }
  }
}
</script>
<style scoped>
  button {
    cursor: pointer;
    position: fixed;
    z-index: 0;
    border-radius: 50%;
    bottom: 1rem;
    right: 1rem;
    width:3rem;
    height:3rem;
    background-color:var(--primary-color);
    border:none;
    outline:none;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow: 0px 0px 6px 1px #333;
  }
  i{
    color:white; 
    font-size: 1.3rem;
  }
</style>
