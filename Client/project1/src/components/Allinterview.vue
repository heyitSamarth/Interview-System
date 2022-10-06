<template lang="">
    
    <div class="container my-5 table-responsive" >
        
        <table class="table align-middle border border-3 rounded table-hover">
  <thead class="table-dark">
    <tr>
      <th scope="col">Application of </th>
      <th scope="col">Interviewer</th>
      <th scope="col">Arranged by</th>
      <th scope="col">level</th>
      <th scope="col">Interview Date</th>
      <th scope="col">Interview Time</th>
      <th scope="col">Feedback</th>
      <th scope="col">Status</th>
      <th scope="col">Delete </th>
      <th scope="col">Update </th>
      

    </tr>
  </thead>
  <tbody  v-for = "interview in this.interviews" :key="interview._id" >
    <tr v-if="interview.interviewer_id==loggedInUser._id || ( role(loggedInUser._id)==='ADMIN' )|| ( role(loggedInUser._id)==='HR' )">
        
      <td>{{aname(interview.application_id)}} for {{atitle(interview.application_id)}}</td>
      <td>{{name1(interview.interviewer_id)}} ( {{role(interview.interviewer_id)}} )</td>
      <td>{{name1(interview.arrangedby_id)}}  ( {{role(interview.arrangedby_id)}} )</td>
      <td>{{interview.level}}</td>
      <td>{{interview.interview_date}}</td>
      <td>{{interview.interview_time}}</td>
      <td>{{interview.feedback}}</td>
      <td>{{interview.status}}</td>
      <td>
        <i @click="deleteInterview(interview)" class="fa-solid fa-trash mx-3"></i>
      </td>
      <td>
        <i @click="add(interview)"  data-bs-toggle="modal" data-bs-target="#exampleModal" 
        class="fa-solid fa-pen-to-square mx-3" ></i>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Update interviews</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" >                        
                        <div class="input-group mb-3">
                                <label for="disciption" class="input-group-text">Feedback</label>
                                
                                    <textarea placeholder="Give Interview Feedback" v-model="interview1.feedback" type="text" class="form-control"
                                       rows="1" id="disciption"></textarea>
                                
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Status</span>
                                <input placeholder='Give Interview Feedback'  type="text" class="form-control"  v-model="interview1.status" >
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Date</span>
                                <input placeholder='Give Interview Feedback'  type="date" class="form-control"  v-model="interview1.date"  >
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Time</span>
                                <input placeholder='Give Interview Feedback'  type="time" class="form-control"  v-model="interview1.time" >
                            </div>

                    
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                    <button type="button" class="btn btn-primary"  @click="updateInterview(interview1)" data-bs-dismiss="modal" >Save changes</button>
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
    import {mapState} from "vuex"
export default {
    computed:{
      ...mapState(["loggedInUser"])
    },
    data() {
        return {
            candidates: {},
            jobs: {},
            interview1:{},
            applications:{},
            interviews: {},
            users:{},
        }
    },
    methods: {
        
        async add(interview)
        {
            this.interview1=interview
        },
        async deleteInterview(interview) {
            try {
                let responce = await this.$http.delete(`interview/deleteinterview/${interview._id}`);
                console.log(responce)
                this.getDetails()


            } catch (err) {

                console.log(err.response);
            }
        },
        async updateInterview(interview) {
            try {
                let responce = await this.$http.put(`interview/updateinterview/${interview._id}`,this.interview1);
                console.log(responce)
                this.getDetails()

            } catch (err) {

                console.log(err.response);
            }
        },

        async getDetails() {
            try {
                let responce = await this.$http.get("interview/get");
                this.interviews = responce.data
                // console.log(this.interviews)
                if (this.interviews == null) {
                    this.$router.push("/addc");

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
                // console.log(this.candidates)
                if (this.users == null) {
                    this.$router.push("/addu");

                }
            } catch (err) {

                console.log(err.response);
            }
        },
        async getDetails4() {
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
        },
        aname(id)
        {
            var a
            for(a in this.applications)
            {
                if(this.applications[a]._id===id)
                return this.name(this.applications[a].candidate_id)
            }
            return null
        },
        atitle(id)
        {
            var a
            for(a in this.applications)
            {
                if(this.applications[a]._id===id)
                return this.title(this.applications[a].job_id)
            }
            return null
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
        name1(id){
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
        this.getDetails1();
        this.getDetails2();
        this.getDetails3();
        this.getDetails4();
    },

}
</script>
<style lang="">

</style>