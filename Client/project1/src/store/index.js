import { createStore } from 'vuex'


export default createStore({
  state: {
    loggedInUser:{}
  },
  mutations: {
    setLoggedInUser(state,payload){
      state.loggedInUser=payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
