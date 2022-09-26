<template >
    <div class="container mt-5">
    <div class="container  mx-auto">
    
    <h1 class="text-center">INTERVIEW PLATFORM</h1>
    </div>
    
    <div class="row  ">
      <div class ="coloum">
      <div class ="card w-50 mx-auto shadow-lg">
        <h1 class="card-header " >
      Login 
      <!-- {{this.user}} -->
      <!-- {{this.count}} -->
    </h1>
        <div class="card-body">

        
    <form class=" mt-3" @submit.prevent="loginUser" >
  
      <!-- Email input -->
      <div class="form-outline mb-4">
        <label class="form-label " for="form2Example1">Email address</label>
        <input v-model="login.email" type="email" id="form2Example1" class="form-control" />
        
      </div>
  
      <!-- Password input -->
      <div class="form-outline  mb-4">
        <label class="form-label " for="form2Example2">Password</label>
        <input v-model="login.password" type="password" id="form2Example2" class="form-control" />
        
      </div>
      <!-- Submit button -->
      <button type="Submit" class="btn btn-primary btn-block mb-4" value="Register" >Sign in</button>
  
      
    </form>
        </div>
      </div>
    </div>
  </div>
    <!-- <button type="button"  class="btn btn-primary " @click=this.incr >S</button> -->
  </div>

</template>

<script>

export default {
    name:"Login",
    data :function(){
    return{
      login:{
        // count : 0
        email:"",
        password:""
      }
    };
},
methods:{
    // incr : function() {
    //     this.count = this.count + 1;
    // }
    async loginUser() {
      //  console.log(axiosInstance)
      try {
        let response = await this.$http.post("user/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        
        if (token) {
          console.log(token);
          this.$router.push("/");

        }
      } catch (err) {
        
        console.log(err.response);
      }
    }
},
created() {
    if(localStorage.getItem("jwt")!=null)
    {
      this.$router.push("/");
    }
  }
};
</script>

<style >
    
</style>