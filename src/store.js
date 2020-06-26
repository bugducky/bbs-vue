import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registerDialogVisible: false,
    loginDialogVisible: false,

  },
  mutations: {
    openRegisterDialog(state) {
      state.registerDialogVisible = true;
    },
    openLoginDialog(state) {
      state.loginDialogVisible = true;
    },

  },
  actions: {

  }
})
