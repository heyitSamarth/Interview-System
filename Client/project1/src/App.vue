<template>
  <Navbar v-if="$route.name!='Login'"/>
  <!-- <Lodingspinner v-if="showLoding"/> -->
  <router-view v-slot="{ Component }">
  <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    
  </transition>
</router-view>
  
</template>
 
<script>
  import Navbar from './components/Navbar.vue';
  // import Lodingspinner from './components/Lodingspinner.vue';
  import {mapMutations, mapState} from "vuex";

  const jwt = require("jsonwebtoken");
  export default {
    components: { Navbar},
    data() {
      return {
        user: {}
      };
    },
    computed:{
      ...mapState([
        "showLoding"
    ])
    }
    ,
    methods: {

      ...mapMutations(["setLoggedInUser"]),
      getUserDetails() {
        
        let token = localStorage.getItem("jwt");
        if(token)
        {
        let decoded = jwt.verify(token, "secret");
        this.user = decoded;
        this.setLoggedInUser(decoded);
        }
      
      }
    },
    created() {
      
      this.getUserDetails();
    }
  };
  </script>
<style>
.fade-enter-from,.fade-leave-to
{
  opacity: 0;
}
.fade-enter-active,.fade-leave-active
{
  transition: opacity 0.5s ease-out;
}
</style>