import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    meta:{requiresAuth: true},
    component: () => import('../views/Contacts.vue'),
    
  },
  {
    name:'CreateContact',
    path: '/contacts/create',
    meta:{requiresAuth: true},
    component: () => import('../views/CreateContact.vue'),
  },
  {
    name:'EditContact',
    path: '/contacts/edit/:id',
    meta:{requiresAuth: true},
    component: () => import('../views/EditContact.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(route=>route.meta.requiresAuth)) {
    if(!store.state.user) {
      next('/login')
    }else{
      next()
    }
  }
  else {
    next()
  }
})
export default router
