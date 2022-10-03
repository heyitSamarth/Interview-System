<template  >
    <div v-if="loggedInUser.role_id=='ADMIN'" class="container mt-5">
        <div class="row  ">
            <div class="coloum">
                <div class="card  mx-auto shadow-lg">
                    <h1 class="card-header ">
                        Add User
                        <!-- {{this.user}} -->
                    </h1>
                    <div class="card-body">


                        <form class=" mt-3" @submit.prevent="addDetails">

                            <!-- Name Input -->
                            <div class="row mb-3">
                                <label  for="name" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input placeholder="Enter Full Name" v-model="user.name" type="text" class="form-control" id="name">
                                </div>
                            </div>


                            <!-- Email input -->
                             <div class="row mb-3">
                                <label  for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input placeholder="Enter Email Address" v-model="user.email" type="email" class="form-control" id="inputEmail3">
                                </div>
                            </div>
                            

                            <!-- Password input -->
                            <div class="row mb-3">
                                <label  for="inputname" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-10">
                                    <input placeholder="Enter password" v-model="user.password" type="text" class="form-control" id="inputname">
                                </div>
                            </div>

                            <!-- role id -->
                            <div class="row mb-3">
                                <label  for="experience" class="col-sm-2 col-form-label">Role Id</label>
                                <div class="col-sm-10">
                                    <input placeholder="Enter Role Id" v-model="user.role_id" type="text" class="form-control" id="experience">
                                </div>
                            </div>

                            <!-- Submit button -->
                            <button type="Submit" class="btn btn-primary btn-block mb-4" value="Register">Add</button>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class =" text-center my-4">
    <h1 >Only Admin Access</h1>
  </div>


</template>
    
<script>
import {mapState} from "vuex"
export default {
    computed:{
      ...mapState(["loggedInUser"])
    },
    data: function () {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                role_id: ""
            }
        };
    },
    methods: {
        async addDetails() {
            try {
                let response = await this.$http.post("user/register", this.user);
                if (response != null) {
                    this.user={}
                    

                }
            } catch (err) {

                console.log(err.response);
            }
        }
    }

};
</script>
<style lang="">
        
    </style>


