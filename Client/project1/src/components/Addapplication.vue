<template >
    
    <div v-if="loggedInUser.role_id=='ADMIN' || loggedInUser.role_id=='HR' " class="container mt-5">
        <div class="row  ">
            <div class="coloum">
                <div class="card  mx-auto shadow-lg">
                    <h1 class="card-header ">
                        Application Details
                        <!-- {{this.job}} -->
                        <!-- {{this.application}} -->
                    </h1>
                    <div class="card-body">


                        <form class=" mt-3" @submit.prevent="addDetails">

                            <!-- job id-->
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect01">Job Id</label>
                                <select class="form-select" v-model="application.job_id" id="inputGroupSelect01">
                                    <option v-for="job in this.jobs" :value="job._id" :key="job._id"  >{{job.title}} ->
                                        {{job._id}}</option>
                                </select>
                            </div>

                            <!-- candidate id -->
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect02">Candidate Id</label>
                                <select class="form-select" v-model="application.candidate_id" id="inputGroupSelect02">
                                    <option v-for="candidate in this.candidates" :value="candidate._id" :key="candidate._id" >
                                        {{candidate.name}} -> {{candidate._id}}</option>
                                </select>
                            </div>

                            <!-- salary expected -->

                            <div class="input-group mb-3">
                                <span class="input-group-text">Expected Salary</span>
                                <input type="number" v-model="application.expected_salary" class="form-control"
                                    aria-label="Amount (to the nearest dollar)">
                                <span class="input-group-text">INR</span>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Actual Salary</span>
                                <input type="number" class="form-control" v-model="application.actual_salary"
                                    aria-label="Amount (to the nearest dollar)">
                                <span class="input-group-text">INR</span>
                            </div>


                            <div class="row mb-3">
                                <label for="rl" class="col-sm-2 col-form-label">Is Job Offered</label>
                                <div class="col-sm-10">
                                    
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" value ="No" v-model="application.is_job_offered"
                                            id="flexRadioDefault2" checked>
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            No
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" value ="Yes"   v-model="application.is_job_offered"
                                            id="flexRadioDefault1">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Yes
                                        </label>
                                    </div>
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
    <h1 >Only Admin and HR Access</h1>
  </div>



</template>
    

<script>
import {mapState} from "vuex"
export default {
    computed:{
      ...mapState(["loggedInUser"])
    },
    data() {
        return {
            load:false,
            candidates: {},
            jobs: {},
            application: {
                // job_id: "",
                // candidate_id: "",
                // expected_salary: "",
                // actual_salary: "",
                is_job_offered: "No"
            }
        }
    },
    methods: {
        async addDetails() {
            try {
                let response = await this.$http.post("application/register", this.application,{headers:{'auth-token':localStorage.getItem('jwt')}});
                if (response != null) {
                    this.application = {is_job_offered: "No"}

                }
            } catch (err) {

                console.log(err);
            }
        },
        async getDetails() {
            try {
                let responce = await this.$http.get("candidate/get");
                this.candidates = responce.data
                // console.log(this.candidates)
                if (this.candidates == null) {
                    this.$router.push("/addc");

                }
            } catch (err) {

                console.log(err);
            }
        },
        async getDetails2() {
            try {
                let responce = await this.$http.get("job/get");
                this.jobs = responce.data
                // console.log(this.jobs)
                if (this.jobs == null) {
                    this.$router.push("/addj");

                }
            } catch (err) {

                console.log(err);
            }
        }
    },
    created() {
        if(this.loggedInUser.role_id=='ADMIN' || this.loggedInUser.role_id=='HR' )
        {
        this.getDetails();
        this.getDetails2();
        }
    },

}
</script>
<style lang="">
        
    </style>


