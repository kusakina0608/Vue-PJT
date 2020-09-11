import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginData: sessionStorage.getItem("id")?sessionStorage.getItem("id"):0,
    userName: sessionStorage.getItem("name")?sessionStorage.getItem("name"):""
  },
  mutations: {
    // state를 변경할 때 mutations를 활용
    SET_LOGIN_DATA(state, data){
      state.loginData = data;
    },
    SET_USER_NAME(state, data){
      state.userName = data;
    }
  },
  actions: {
  },
  modules: {
  }
})