<template >
    <div class="container mt-5">
        <div class="row  ">
            <div class="coloum">
                <div class="card  mx-auto shadow-lg">
                    <h1 class="card-header ">
                        Candidate Details
                        <!-- {{loggedInUser}} -->
                    </h1>
                    <div class="card-body">


                        <form class=" mt-3" @submit.prevent="addDetails">

                            <!-- Email input -->
                            <div class="row mb-3">
                                <label  for="inputname" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input v-model="candidate.name" type="text" class="form-control" id="inputname">
                                </div>
                            </div>

                            <!-- Password input -->
                            <div class="row mb-3">
                                <label  for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input v-model="candidate.email" type="email" class="form-control" id="inputEmail3">
                                </div>
                            </div>


                            <div class="row mb-3">
                                <label  for="cid" class="col-sm-2 col-form-label">Candidate Id</label>
                                <div class="col-sm-10">
                                    <input v-model="candidate.candidate_id" type="text" class="form-control" id="cid">
                                </div>
                            </div>


                            <div class="row mb-3">
                                <label  for="cb" class="col-sm-2 col-form-label">Createdby Id</label>
                                <div class="col-sm-10">
                                    <input v-model="candidate.createdby_id" type="text" class="form-control" id="cb">
                                </div>
                            </div>


                            <div class="row mb-3">
                                <label  for="experience" class="col-sm-2 col-form-label">Experience</label>
                                <div class="col-sm-10">
                                    <input v-model="candidate.experience" type="text" class="form-control" id="experience">
                                </div>
                            </div>


                            <div class="row mb-3">
                                <label  for="rl" class="col-sm-2 col-form-label">Resume Link</label>
                                <div class="col-sm-10">
                                    <input v-model="candidate.resume_link" type="text" class="form-control" id="rl">
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


</template>
    
<script>
import {mapState} from "vuex"
export default {
    computed:{
      ...mapState(["loggedInUser"])
    },
    data: function () {
        return {
            candidate: {
                name: "",
                email: "",
                candidate_id: "",
                createdby_id: "",
                experience: "",
                resume_link:"",
            }
        };
    },
    methods: {
        async addDetails() {
            try {
                let response = await this.$http.post("candidate/register", this.candidate);
                if (response != null) {
                    this.candidate={}

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


