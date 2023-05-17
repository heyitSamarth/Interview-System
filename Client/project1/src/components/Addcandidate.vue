<template > 
    
    <div v-if="loggedInUser.role_id=='ADMIN' || loggedInUser.role_id=='HR' " class="container mt-5">
        <Lodingspinner v-if=this.load />
        <div class="row  ">
            <div class="coloum">
                <div class="card  mx-auto shadow-lg">
                    <h1 class="card-header ">
                        Candidate Details
                        <!-- {{this.load}} -->
                    </h1>
                    <div class="card-body">


                        <form class=" mt-3" @submit.prevent="addDetails">

                            <!-- Name input -->
                            <div class="row mb-3">
                                <label for="inputname" class="col-sm-2 col-form-label">Full Name</label>
                                <div class="col-sm-10">
                                    <input placeholder="Jhon Wick" v-model="candidate.name" type="text"
                                        class="form-control" id="inputname">
                                </div>
                            </div>

                            <!-- Email input -->
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input placeholder="abc@xyz.com" v-model="candidate.email" type="email"
                                        class="form-control" id="inputEmail3">
                                </div>
                            </div>


                            <!-- <div class="row mb-3">
                                <label  for="cid" class="col-sm-2 col-form-label">Candidate Id</label>
                                <div class="col-sm-10">
                                    <input v-model="candidate.candidate_id" type="text" class="form-control" id="cid">
                                </div>
                            </div> -->

                            <div class="row mb-3">
                                <label for="experience" class="col-sm-2 col-form-label">Experience</label>
                                <div class="col-sm-10">
                                    <input placeholder="Work Experience" v-model="candidate.experience" type="number"
                                        class="form-control" id="experience">
                                </div>
                            </div>


                            <!-- <div class="row mb-3">
                                <label for="rl" class="col-sm-2 col-form-label">Resume Link</label>
                                <div class="col-sm-10">
                                    <input placeholder="Resume Link" v-model="candidate.resume_link" type="text"
                                        class="form-control" id="rl">
                                </div>
                            </div> -->
                            <div class=" row mb-3">
                                <label for="formFileSm" class="col-sm-2 col-form-label">Resume</label>
                                <div class="col-sm-10">
                                <input class="form-control form-control-sm" @change="onFileChange" id="formFileSm" type="file">
                            </div>
                            </div>

                            <div class="row mb-3">
                                <label for="cb" class="col-sm-2 col-form-label">Createdby Id</label>
                                <div class="col-sm-10">
                                    <label class="my-2">{{loggedInUser.name}} => {{loggedInUser._id}}</label>
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
    <div v-else class=" text-center my-4">
        <h1>Only Admin and HR Access</h1>
    </div>


</template>
    
<script>
 import Lodingspinner from '@/components/Lodingspinner.vue';
import { mapState ,mapMutations } from "vuex"
export default {
    components:{Lodingspinner},
    computed: {
        ...mapState(["loggedInUser"]),
        ...mapMutations(["setShowLoding"]),
    },
    data: function () {
        return {
            load:false,
            user: {},
            candidate: {
                name: "",
                email: "",
                experience: "",
                // resume_link: "",
                // abc:this.loggedInUser._id
            },
            file:null
        };
    },
    methods: {
        onFileChange(e){
            this.file=e.target.files[0];

        },

        async addDetails() {
            try {
                // this.setShowLoding
                this.load=true;
                let formData=new FormData();
                formData.append("name",this.candidate.name)
                formData.append("email",this.candidate.email)
                formData.append("experience",this.candidate.experience)
                formData.append("doc",this.file)
                let response = await this.$http.post("candidate/register", 
                    formData,
                 { headers: { 'auth-token': localStorage.getItem('jwt') } });
                if (response != null) {
                    this.candidate = {}
                    // this.file=null;
                    this.$router.push("/addc");


                }
            } catch (err) {
                // await nextTick();
                // this.setShowLoding;
                console.log(err);
            }
            this.load=false;
            // this.setShowLoding;
            
        }
    }

};
</script>
<style lang="">
        
    </style>


