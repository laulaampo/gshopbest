import Vue from 'vue'
import Vuex from  'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import user from './modules/user'
import shop from './modules/shop'
import msite from './modules/msite'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    msite,
    user,
    shop
  }
})