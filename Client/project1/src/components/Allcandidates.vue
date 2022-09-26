<template lang="">
    <div class="container my-5" >
        <div class="row row-cols-1 row-cols-md-3 g-4" >
            <div class="col"  v-for="candidate in this.candidates" :key="candidate._id">
            <div class="card text-bg-light mb-3  " >
                    <div class="card-body"  >
                        <h5 class="card-header">{{candidate.name}}</h5>
                        <p class="card-text"> Candidate id : {{candidate.candidate_id}}</p>
                        <p class="card-text"> Created By id : {{candidate.createdby_id}}</p>
                        <p class="card-text"> Candidate email : {{candidate.email}}</p>
                        <p class="card-text"> Candidate experience : {{candidate.experience}}</p>
                        <p class="card-text"> Candidate resume : 
                            <a href="">{{candidate.resume_link}}</a></p>
                        <p   class="card-text"> </p>
                        <i @click="deleteCandidate(candidate)" class="fa-solid fa-trash mx-2"></i>
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
            candidates:{}
        }
    },
    methods: {
        async deleteCandidate(candidate) {
            try {
               let  responce = await this.$http.delete("candidate/deletecandidate/:id");
                console.log(responce)
                console.log(candidate)
            } catch (err) {

                console.log(err.response);
            }
        },

        async getDetails() {
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
        }
    },
    created() {
        this.getDetails();
    },

}
</script>
<style lang="">
    
</style>