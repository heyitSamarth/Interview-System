import {createRouter,createWebHashHistory} from 'vue-router'
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
    meta: {
      requiresAuth: true
    }
    },
    {
      path: '/addc',
    name: ' Add Candidate ',
    component:()=>import("../components/Addcandidate.vue") ,
    meta: {
      requiresAuth: true
    }
    },
   
    {
      path: '/viewc',
    name: ' Candidate List ',
    component:()=>import("../components/Allcandidates.vue") ,
    meta: {
      requiresAuth: true
    }
    },
    {
      path: '/addj',
    name: ' Add Job ',
    component:()=>import("../components/Addjob") ,
    meta: {
      requiresAuth: true
    }
    },
    {
      path: '/viewj',
    name: ' Job List ',
    component:()=>import("../components/Alljob.vue") ,
    meta: {
      requiresAuth: true
    }
    },
    {
      path: '/addu',
    name: ' Add User ',
    component:()=>import("../components/Adduser.vue") ,
    meta: {
      requiresAuth: true
    }
    },
    {
      path: '/adda',
    name: ' Add Application ',
    component:()=>import("../components/Addapplication.vue") ,
    meta: {
      requiresAuth: true
    }
    },
    {
      path: '/viewa',
    name: ' All Applications ',
    component:()=>import("../components/Allapplication.vue") ,
    meta: {
      requiresAuth: true
    }
    },
    {
      path: '/addi',
    name: ' Add Interview ',
    component:()=>import("../components/Addinterview.vue") ,
    meta: {
      requiresAuth: true
    }
    },
    {
      path: '/viewi',
    name: ' Interviews ',
    component:()=>import("../components/Allinterview.vue") ,
    meta: {
      requiresAuth: true
    }
    },
    {
          path: "/login",
          name: "Login",
          component: Login
    }
      
  ]

  const router=createRouter({
    history:createWebHashHistory(),
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