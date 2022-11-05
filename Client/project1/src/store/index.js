import { createStore } from 'vuex'


export default createStore({
  state: {
    loggedInUser:{},
    showLoding:false

  },
  mutations: {
    setLoggedInUser(state,payload){
      state.loggedInUser=payload;
    }
    ,setShowLoding(state){
      state.showLoding=!state.showLoding;
      console.log("sam")
    }
  },
  actions: {

  },
  modules: {
  }
})
