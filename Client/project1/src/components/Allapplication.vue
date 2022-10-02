<template lang="">
    
    <div class="container my-5 table-responsive" >
        
        <table class="table align-middle border border-3 rounded table-hover">
  <thead class="table-dark">
    <tr>
      <th scope="col">Application id</th>
      <th scope="col">Job id </th>
      <th scope="col">Candidate id</th>
      <th scope="col">expected salary </th>
      <th scope="col">actual salary </th>
      <th scope="col">Is Job offered </th>
      <th scope="col">Delete/Update </th>
      

    </tr>
  </thead>
  <tbody  v-for = "application in this.applications" :key="application._id">
    <tr>
        
      <th >{{application._id}}</th>
      <td>{{application.job_id}}</td>
      <td>{{application.candidate_id}}</td>
      <td>{{application.expected_salary}}</td>
      <td>{{application.actual_salary}}</td>
      <td>{{application.is_job_offered}}</td>
      <td>
        <i @click="deleteApplication(application)" class="fa-solid fa-trash mx-2"></i>
        
        <i @click="add(application)"  data-bs-toggle="modal" data-bs-target="#exampleModal" 
        class="fa-solid fa-pen-to-square mx-2" ></i>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Update Application</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" >                        
                        <div class="input-group mb-3">
                                <span class="input-group-text">Expected Salary</span>
                                <input type="number"  v-model="application1.expected_salary" class="form-control"
                                    aria-label="Amount (to the nearest dollar)">
                                <span class="input-group-text">INR</span>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Actual Salary</span>
                                <input type="number" class="form-control"  v-model="application1.actual_salary"
                                    aria-label="Amount (to the nearest dollar)">
                                <span class="input-group-text">INR</span>
                            </div>


                            <div class="row mb-3">
                                <label for="rl" class="col-sm-2 col-form-label">Is Job Offered</label>
                                <div class="col-sm-10">
                                    
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" value ="No" v-model="application1.is_job_offered"
                                            id="flexRadioDefault2" checked>
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            No
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" value ="Yes"   v-model="application1.is_job_offered"
                                            id="flexRadioDefault1">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Yes
                                        </label>
                                    </div>
                                </div>
                            </div>
                    
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                    <button type="button" class="btn btn-primary"  @click="updateApplication(application1)" data-bs-dismiss="modal" >Save changes</button>
                    </div>
                </div>
                </div>
                </div>
      </td>
      
    </tr>
  </tbody>
</table>  
    </div>
</template>

<script>
export default {
    data() {
        return {
            application1:{
            },
            applications: {}
        }
    },
    methods: {
        async add(application)
        {
            this.application1=application

        },
        async deleteApplication(application) {
            try {
                let responce = await this.$http.delete(`application/deleteapplication/${application._id}`);
                console.log(responce)
                this.getDetails()


            } catch (err) {

                console.log(err.response);
            }
        },
        async updateApplication(application) {
            try {
                let responce = await this.$http.put(`application/updateapplication/${application._id}`,this.application1);
                console.log(responce)
                
                this.getDetails()

            } catch (err) {

                console.log(err.response);
            }
        },

        async getDetails() {
            try {
                let responce = await this.$http.get("application/get");
                this.applications = responce.data
                // console.log(this.applications)
                if (this.applications == null) {
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