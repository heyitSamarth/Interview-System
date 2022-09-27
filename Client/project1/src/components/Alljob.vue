<template lang="">
    <div class="container my-5" >
        <div class="row row-cols-1 row-cols-md-3 g-4" >
            <div class="col"  v-for="job in this.jobs" :key="job._id">
            <div class="card text-bg-light mb-3  " >
                    <div class="card-body"  >
                        <h5 class="card-header">{{job.title}}</h5>
                        <p class="card-text"> Job id : {{job.job_id}}</p>
                        <p class="card-text"> Created By id : {{job.createdby_id}}</p>
                        <p class="card-text"> No. of Openings : {{job.openings}}</p>
                        <p class="card-text"> Job Discription : {{job.discription}}</p>
                        <i @click="deleteJob(candidate)" class="fa-solid fa-trash mx-2"></i>
                        <!-- <i class="fa-solid fa-pen-to-square mx-2"></i> -->
                    </div>
                </div>
            </div>
        </div>     
    </div>
</template>

<script>
export default {
    data(){
        return{
            jobs:{}
        }
    },
    methods: {
        async deleteJob() {
            try {
               let  responce = await this.$http.delete("candidate/deletejob");
                console.log(responce)
            } catch (err) {

                console.log(err.response);
            }
        },

        async getDetails() {
            try {
               let  responce = await this.$http.get("job/get");
                this.jobs=responce.data
                console.log(this.jobs)
                if (this.jobs == null) {
                    this.$router.push("/addj");

                }
            } catch (err) {

                console.log(err.response);
            }
        }
    },
    created() {
        this.getDetails();
    },

}
</script>
<style lang="">
    
</style>