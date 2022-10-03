<template lang="">
    <div class="container my-5 table-responsive" >
        
        <table class="table align-middle border border-3 rounded table-hover">
  <thead class="table-dark">
    <tr>
    <th scope="col">Candidate id </th>
      <th scope="col">Candidate Name </th>
      <th scope="col">Created By id </th>
      <th scope="col">Candidate Email</th>
      <th scope="col">Candidate Experience </th>
      <th scope="col">Candidate Resume </th>
      <th scope="col">Delete/Update </th>
      

    </tr>
  </thead>
  <tbody  v-for = "candidate in this.candidates" :key="candidate._id">
    <tr>
        
      <th >{{candidate._id}}</th>
      <td>{{candidate.name}}</td>
      <td>{{candidate.createdby_id}}</td>
      <td>{{candidate.email}}</td>
      <td>{{candidate.experience}}</td>
      <td><a :href="'//'+candidate.resume_link" target="_blank">Resume</a></td>
      <td>
        <i @click="deleteCandidate(candidate)" class="fa-solid fa-trash mx-5"></i>
    </td>
      
    </tr>
  </tbody>
</table>  
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
               let  responce = await this.$http.delete(`candidate/deletecandidate/${candidate._id}`);
                console.log(responce)
                this.getDetails()
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