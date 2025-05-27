import Vue from "vue";
import Vuex from "vuex";

// import user from "./module/user.js"; // 引入user.js

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("token"),
    user: JSON.parse(sessionStorage.getItem("user"))
  },
  mutations: {
    // set
    SET_TOKENN: (state, token) => {
      state.token = token
      sessionStorage.setItem("token", token)
    },
    SET_USER: (state, user) => {
      state.user = user
      sessionStorage.setItem("user", JSON.stringify(user))
    },
    REMOVE_INFO : (state) => {
      state.token = ''
      state.user = {}
      sessionStorage.setItem("token", '')
      sessionStorage.setItem("user", JSON.stringify(''))
    }
  },
  getters: {

  },
  actions: {
  },
  modules: {
  }
})
//
// export default new Vuex.Store({
//   state: {
//     //
//   },
//   getters: {
//     // 是否登录
//     isLogin: (state) => state.user.isLogin,
//     // 用户名
//     username: (state) => state.user.username,
//     // 用户id
//     userId: (state) => state.user.userId,
//     // 用户详细信息
//     userInfoObj: (state) => state.user.userInfoObj,
//   },
//   mutations: {
//     //
//   },
//   actions: {
//     //
//   },
//   modules: {
//     user,
//   },
// });
