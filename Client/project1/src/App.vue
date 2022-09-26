<template>
  <Navbar v-if="$route.name!='Login'"/>
  <router-view/>
</template>
 
<script>
  import Navbar from './components/Navbar.vue';
  import {mapMutations} from "vuex";
  const jwt = require("jsonwebtoken");
  export default {
    components: { Navbar},
    data() {
      return {
        user: {}
      };
    },
    methods: {

      ...mapMutations(["setLoggedInUser"]),
      getUserDetails() {
        
        let token = localStorage.getItem("jwt");
        let decoded = jwt.verify(token, "secret");
        this.user = decoded;
        this.setLoggedInUser(decoded);
      
      }
    },
    created() {
      // this.getUserDetails();
    }
  };
  </script>
