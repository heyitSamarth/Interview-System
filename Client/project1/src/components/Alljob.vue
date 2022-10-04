<template lang="">
    <div class="container my-5" >
        <div class="row row-cols-1 row-cols-md-3 g-4" >
            <div class="col"  v-for="job in this.jobs" :key="job._id">
            <div class="card text-bg-light mb-3  " >
                    <div class="card-body"  >
                        <h5 class="card-header">{{job.title}}</h5>
                        <!-- <p class="card-text"> Job id : {{job.job_id}}</p> -->
                        <p class="card-text"> Created By : {{name(job.createdby_id)}}  ( {{role(job.createdby_id)}} )</p>
                        <p class="card-text"> No. of Openings : {{job.openings}}</p>
                        <p class="card-text"> Job Discription : {{job.discription}}</p>
                        <i @click="deleteJob(job)" class="fa-solid fa-trash mx-2"></i>
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
            users:{},
            jobs:{}
        }
    },
    methods: {
        async deleteJob(job) {
            try {
               let  responce = await this.$http.delete(`job/deletejob/${job._id}`);
                console.log(responce)
                this.getDetails()
            } catch (err) {

                console.log(err.response);
            }
        },

        async getDetails() {
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
        async getDetails2() {
            try {
               let  responce = await this.$http.get("user/getall");
                this.users=responce.data
                // console.log(this.candidates)
                if (this.users == null) {
                    this.$router.push("/addu");

                }
            } catch (err) {

                console.log(err.response);
            }
        },
        name(id){
            var user
            for(user in this.users)
            {
                if(this.users[user]._id===id)
                return this.users[user].name
            }
            return null
        },
        role(id){
            var user
            for(user in this.users)
            {
                if(this.users[user]._id===id)
                return this.users[user].role_id
            }
            return null
        },
    
    },
    
    created() {
        this.getDetails();
        this.getDetails2();
    },
}
</script>
<style lang="">
    
</style>