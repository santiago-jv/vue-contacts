<template>
     <button v-if="onClick" @click="onClick">
       <i v-bind:class="nameOfClass"></i>
       <p>{{text}}</p>
    </button>
     <button type="submit" v-else>
       <i v-bind:class="nameOfClass"></i>
       <p>{{text}}</p>
    </button>
</template>

<script>
export default {
  name: 'Button',
  props:{
    text:String,
    nameOfClass:String,
    onClick:{
        type:Function   
    }
  }
}
</script>
<style scoped>
    i {
        margin-right: .5rem;
        color: white;
    }
    p{
        font-weight: bold;
        color: white;
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
        background-color:var(--primary-color);
    }
</style>
