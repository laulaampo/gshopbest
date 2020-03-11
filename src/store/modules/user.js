import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN
} from '../mutations-type'
import {
  reqAutoLogin
} from '../../api/index'
const state = {
  user: {}, // 用户信息
  token: localStorage.getItem('token_key'), // token令牌
}
const mutations = { // 保存用户信息
  [RECEIVE_USER](state, user) {
    state.user = user
  },
  // 保存token信息
  [RECEIVE_TOKEN](state, token) {
    state.token = token
  },
  // 重置用户信息
  [RESET_USER](state) {
    state.user = {}
  },
  // 重置token信息
  [RESET_TOKEN](state) {
    state.token = ''
  }
}
const actions = {
  // 保存用户信息和token
  saveUser({
    commit
  }, user) {
    // 拿到请求回来的token
    const token = user.token
    // 把token放到vuex当中
    commit(RECEIVE_TOKEN, token)
    // 将token存到localstorage中用于自动登录
    localStorage.setItem('token_key', token)
    // 删除token再将user存进vuex 保证安全性
    delete user.token
    commit(RECEIVE_USER, user)
  },
  // 重置用户信息
  resetUser({
    commit
  }) {
    // 删除localstorage中的token
    localStorage.removeItem('token_key')
    // 删除vuex中的user数据
    commit(RESET_USER)
    // 删除vuex中的token
    commit(RESET_TOKEN)
  },
  // 自动登录
  async autoLogin({
    commit
  }, token) {
    if (token) { // 有token
      // 使用token发送自动登录请求
      const result = await reqAutoLogin()
      if (result.code === 0) {
        const user = result.data
        commit(RECEIVE_USER, user)
      }
    }
  },
}
const getters = {}

const user = {
  state,
  mutations,
  actions,
  getters
}
export default user