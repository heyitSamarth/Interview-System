<template >
    <div class="container mt-5">
        <div class="row  ">
            <div class="coloum">
                <div class="card  mx-auto shadow-lg">
                    <h1 class="card-header ">
                        Job Details
                        <!-- {{loggedInUser}} -->
                    </h1>
                    <div class="card-body">


                        <form class=" mt-3" @submit.prevent="addDetails">

                            <!-- Job Id input
                            <div class="row mb-3">
                                <label for="jobid" class="col-sm-2 col-form-label">Job Id</label>
                                <div class="col-sm-10">
                                    <input v-model="job.job_id" type="text" class="form-control" id="Jobid">
                                </div>
                            </div> -->

                            <!-- title input -->
                            <div class="row mb-3">
                                <label for="title" class="col-sm-2 col-form-label">Title</label>
                                <div class="col-sm-10">
                                    <input placeholder="Enter Job Title" v-model="job.title" type="text" class="form-control" id="title">
                                </div>
                            </div>


                            <div class="row mb-3">
                                <label for="openings" class="col-sm-2 col-form-label">Openings</label>
                                <div class="col-sm-10">
                                    <input placeholder="Enter no of openings " v-model="job.openings" type="number" class="form-control" id="openings">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="disciption" class="col-sm-2 col-form-label">Discription</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="Job Discription" v-model="job.discription" type="text" class="form-control"
                                       rows="2" id="disciption"></textarea>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label  for="cb" class="col-sm-2 col-form-label">Createdby Id</label>
                                <div class="col-sm-10">
                                    <label class="my-2">{{loggedInUser._id}}</label>
                                    <!-- <input v-model="candidate.createdby_id" type="text" class="form-control" id="cb" > -->
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
import { mapState } from "vuex"
export default {
    computed: {
        ...mapState(["loggedInUser"])
    },
    data: function () {
        return {
            job: {
                title: "",
                openings: "",
                discription: "",
            }
        };
    },
    methods: {
        async addDetails() {
            try {
                let response = await this.$http.post("job/register", this.job,{headers:{'auth-token':localStorage.getItem('jwt')}});
                if (response != null) {
                    this.job = {}
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


