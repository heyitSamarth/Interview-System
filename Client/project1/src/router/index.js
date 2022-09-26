import {createRouter,createWebHistory} from 'vue-router'
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"


const routes= [
    {
      path: '',
      name: ' Home ',
      component:Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/uinfo',
    name: ' User Info ',
    component:()=>import("../components/Info.vue") ,
    },
    {
      path: '/addc',
    name: ' Add Candidate ',
    component:()=>import("../components/Addcandidate.vue") ,
    },
   
    {
      path: '/viewc',
    name: ' Candidate List ',
    component:()=>import("../components/Allcandidates.vue") ,
    },
    {
      path: '/addj',
    name: ' Add Job ',
    component:()=>import("../components/Info.vue") ,
    },
    {
      path: '/viewj',
    name: ' Available Job ',
    component:()=>import("../views/Home.vue") ,
    },
    {
      path: '/addu',
    name: ' Add User ',
    component:()=>import("../components/Info.vue") ,
    },
    {
          path: "/login",
          name: "Login",
          component: Login
    }
      
  ]

  const router=createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes,
  })

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem("jwt") == null) {
        next({
          path: "/login"
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
export default router;