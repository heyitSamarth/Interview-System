<template >

<section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item">User id : {{ loggedInUser.user_id}}</li>
              <li class="list-group-item">Name : {{ loggedInUser.name}}</li>
              <li class="list-group-item">Email : {{ loggedInUser.email}}</li>
              <li class="list-group-item">role_id : {{ loggedInUser.role_id}}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import {mapState} from "vuex"
export default {

  computed:{
      ...mapState(["loggedInUser"])
    },

}
</script>
<style lang="">
    
</style>