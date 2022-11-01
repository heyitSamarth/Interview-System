<template lang="">
    
    <div class="container my-5 table-responsive" >
        
        <table class="table align-middle border border-3 rounded table-hover">
  <thead class="table-dark">
    <tr>
      <!-- <th scope="col">Application id</th> -->
      <th scope="col">Job Role</th>
      <th scope="col">Candidate</th>
      <th scope="col">Createdby id</th>
      <th scope="col">Expected Salary </th>
      <th scope="col">Actual Salary </th>
      <th scope="col">Is Job offered </th>
      <th scope="col">Delete/Update </th>
      

    </tr>
  </thead>
  <tbody  v-for = "application in this.applications" :key="application._id">
    <tr>
        
      <!-- <th>{{application._id}}</th> -->
      <td>{{application.job[0].title}}</td>
      <td>{{application.candidate[0].name}}</td>
      <td>{{application.createdby[0].name}} ({{application.createdby[0].role_id}})</td>
      <td>{{application.expected_salary}}</td>
      <td>{{application.actual_salary}}</td>
      <td>{{application.is_job_offered}}</td>
      <td>
        <i @click="deleteApplication(application)" class="fa-solid fa-trash mx-4"></i>
        
        <i @click="add(application)"  data-bs-toggle="modal" data-bs-target="#exampleModal" 
        class="fa-solid fa-pen-to-square mx-3" ></i>

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
                                <input type="number" v-model="application1.expected_salary" class="form-control"
                                    >
                                <span class="input-group-text">INR</span>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Actual Salary</span>
                                <input type="number" class="form-control"  v-model="application1.actual_salary"
                                    >
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
            candidates: {},
            jobs: {},
            application1:{},
            applications: {},
            users:{},
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

                console.log(err);
            }
        },
        async updateApplication(application) {
            try {
                // console.log(this.application1);
                // if(this.application1.actual_salary=='')this.application1.actual_salary=" "
                // if(this.application1.expected_salary=='')this.application1.expected_salary=" "
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
                    this.$router.push("/adda");

                }

                return 1;
            } catch (err) {

                console.log(err.response);
            }
        },
        //async getDetails1() {
        //     try {
        //        let  responce = await this.$http.get("candidate/get");
        //         this.candidates=responce.data
        //         // console.log(this.candidates)
        //         if (this.candidates == null) {
        //             this.$router.push("/addc");

        //         }
        //     } catch (err) {

        //         console.log(err.response);
        //     }
        // },
        // async getDetails2() {
        //     try {
        //        let  responce = await this.$http.get("job/get");
        //         this.jobs=responce.data
        //         // console.log(this.jobs)
        //         if (this.jobs == null) {
        //             this.$router.push("/addj");

        //         }
        //     } catch (err) {

        //         console.log(err.response);
        //     }
        // },
        // async getDetails3() {
        //     try {
        //        let  responce = await this.$http.get("user/getall");
        //         this.users=responce.data
        //         // console.log(this.candidates)
        //         if (this.users == null) {
        //             this.$router.push("/addu");

        //         }
        //     } catch (err) {

        //         console.log(err.response);
        //     }
        // },
        // name(id){
        //     var candidate
        //     for(candidate in this.candidates)
        //     {
        //         if(this.candidates[candidate]._id===id)
        //         return this.candidates[candidate].name
        //     }
        //     return null
        // },
        // title(id){
        //     var job
        //     for(job in this.jobs)
        //     {
        //         if(this.jobs[job]._id===id)
        //         return this.jobs[job].title
        //     }
        //     return null
        // },
        // name1(id){
        //     var user
        //     for(user in this.users)
        //     {
        //         if(this.users[user]._id===id)
        //         return this.users[user].name
        //     }
        //     return null
        // },
        // role(id){
        //     var user
        //     for(user in this.users)
        //     {
        //         if(this.users[user]._id===id)
        //         return this.users[user].role_id
        //     }
        //     return null
        // },
    

    },
    created() {
        this.getDetails();
        // this.getDetails1();
        // this.getDetails2();
        // this.getDetails3();
    },

}
</script>
<style lang="">

</style>