<template >
    <div  v-if="loggedInUser.role_id=='ADMIN' || loggedInUser.role_id=='HR' " class="container mt-5">
        <div class="row  ">
            <div class="coloum">
                <div class="card  mx-auto shadow-lg">
                    <h1 class="card-header ">
                       Interview Details
                    </h1>
                    <div class="card-body">


                        <form class=" mt-3" @submit.prevent="addDetails">

                            <!-- application  id-->
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect01">application Id</label>
                                <select class="form-select" v-model="interview.application_id" id="inputGroupSelect01">
                                    <option v-for="application in this.applications" :value="application._id" :key="application._id"  >
                                        {{name(application.candidate_id)}}  for role  ( {{title(application.job_id)}} ) => {{application._id}}</option>
                                </select>
                            </div>

                            <!-- intervier id -->
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect02">Interviewer Id</label>
                                <select class="form-select" v-model="interview.interviewer_id" id="inputGroupSelect02">
                                    <option v-for="user in this.users" :value="user._id" :key="user._id" >
                                        {{user.name}} -> {{user._id}} role( {{user.role_id}} )</option>
                                </select>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Level</span>
                                <input type="number" v-model="interview.level" class="form-control">
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Date</span>
                                <input type="date" class="form-control"  v-model="interview.interview_date"  >
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Time</span>
                                <input type="time" class="form-control"  v-model="interview.interview_time" >
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
            candidates: {},
            jobs: {},
            users:{},
            applications: {
            },
            interview:{

            }
        }
    },
    methods: {
        async addDetails() {
            try {
                let response = await this.$http.post("interview/register", this.interview,{headers:{'auth-token':localStorage.getItem('jwt')}});
                if (response != null) {
                    this.interview = {}
                }
            } catch (err) {

                console.log(err.response);
            }
        },
        async getDetails() {
            try {
                let responce = await this.$http.get("application/get");
                this.applications = responce.data
                // console.log(this.candidates)
                if (this.applications == null) {
                    this.$router.push("/adda");

                }
            } catch (err) {

                console.log(err.response);
            }
        },async getDetails1() {
            try {
               let  responce = await this.$http.get("candidate/get");
                this.candidates=responce.data
                // console.log(this.candidates)
                if (this.candidates == null) {
                    this.$router.push("/addc");

                }
            } catch (err) {

                console.log(err.response);
            }
        },
        async getDetails2() {
            try {
               let  responce = await this.$http.get("job/get");
                this.jobs=responce.data
                // console.log(this.jobs)
                if (this.jobs == null) {
                    this.$router.push("/addj");

                }
            } catch (err) {

                console.log(err.response);
            }
        },
        async getDetails3() {
            try {
               let  responce = await this.$http.get("user/getall");
                this.users=responce.data
                // console.log(this.jobs)
                if (this.users == null) {
                    this.$router.push("/addu");

                }
            } catch (err) {

                console.log(err.response);
            }
        },
        name(id){
            var candidate
            for(candidate in this.candidates)
            {
                if(this.candidates[candidate]._id===id)
                return this.candidates[candidate].name
            }
            return null
        },
        title(id){
            var job
            for(job in this.jobs)
            {
                if(this.jobs[job]._id===id)
                return this.jobs[job].title
            }
            return null
        },

    },
    created() {
        if(this.loggedInUser.role_id=='ADMIN' || this.loggedInUser.role_id=='HR' )
        {
        this.getDetails();
        this.getDetails1();
        this.getDetails2();
        this.getDetails3();
        }
    },


}
</script>
<style lang="">
        
    </style>


