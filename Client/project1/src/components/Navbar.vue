<template >
    <div >
        <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/" exact> HI , {{loggedInUser.name}} !</router-link>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{$route.name}}
          </a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/uinfo" exact>User Info</router-link></li>
            <li><router-link v-if="loggedInUser.role_id=='ADMIN' || loggedInUser.role_id=='HR'" class="dropdown-item" to="/addc" exact>Add Candidate</router-link></li>
            <li><router-link class="dropdown-item" to="/viewc" exact>Candidate List</router-link></li>
            <li><router-link v-if="loggedInUser.role_id=='ADMIN' || loggedInUser.role_id=='HR'" class="dropdown-item" to="/addj" exact>Add Job</router-link></li>
            <li><router-link class="dropdown-item" to="/viewj" exact>Job List</router-link></li>
            <li><router-link v-if="loggedInUser.role_id=='ADMIN' || loggedInUser.role_id=='HR'" class="dropdown-item" to="/adda" exact>Add Application</router-link></li>
            <li><router-link class="dropdown-item" to="/viewa" exact>All Applications</router-link></li>
            <li><router-link v-if="loggedInUser.role_id=='ADMIN' || loggedInUser.role_id=='HR'" class="dropdown-item" to="/addi" exact>Add Interview</router-link></li>
            <li><router-link class="dropdown-item" to="/viewi" exact>Interviews</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link v-if="loggedInUser.role_id=='ADMIN'" class="dropdown-item" to="/addu" exact>Add User</router-link></li>
          </ul>
        </li>
      </ul> 
      <button @click="logout()" type="button" class="btn btn-light ">Logout</button>
    </div>
    
  </div>
  
</nav>
    </div>
    
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name:"Navbar",
    computed:{
      ...mapState(["loggedInUser"])
    },
    methods: {

      logout() {
        localStorage.removeItem("jwt");
        this.$router.push("/login");
      }

    }
  };
  </script>
<style >
</style>