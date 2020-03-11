// // 间接修改state 和 异步方法
// import {reqAddress, reqCategorys, reqShops,reqGetGoods,reqGetRatings,reqGetInfo,reqAutoLogin} from '../api/index'
// import {
//   RECEIVE_ADDESS,
//   RECEIVE_SHOPS,
//   RECEIVE_CATEGORYS,
//   RECEIVE_USER,
//   RECEIVE_TOKEN,
//   RESET_USER,
//   RESET_TOKEN,
//   GET_INFO,
//   GET_RATINGS,
//   GET_GOODS
// } from './mutations-type'

export default {
  // async getAddress({commit,state}){
  //   const {longitude,latitude} = state
  //   const result = await reqAddress({longitude,latitude})
  //   if(result.code === 0){
  //     const address = result.data
  //     commit(RECEIVE_ADDESS,address)
  //   }
  // },
  // async getCategorys({commit},callback){
  //   const result = await reqCategorys()
  //   if(result.code === 0){
  //     const categorys = result.data
  //     commit(RECEIVE_CATEGORYS,categorys)
  //     // 如果callback参数是函数 就执行
  //     callback === 'function' && callback()
  //   }
  // },
  // async getShops({commit,state}){
  //   const {longitude,latitude} = state
  //   const result = await reqShops({longitude,latitude})
  //   if(result.code === 0){
  //     const shops = result.data
  //     commit(RECEIVE_SHOPS,shops)
  //   }
  // },
  // // 保存用户信息和token
  // saveUser({commit},user){
  //   // 拿到请求回来的token
  //   const token = user.token
  //   // 把token放到vuex当中
  //   commit(RECEIVE_TOKEN,token)
  //   // 将token存到localstorage中用于自动登录
  //   localStorage.setItem('token_key',token)
  //   // 删除token再将user存进vuex 保证安全性
  //   delete user.token
  //   commit(RECEIVE_USER,user)
  // },
  // // 重置用户信息
  // resetUser({commit}){
  //   // 删除localstorage中的token
  //   localStorage.removeItem('token_key')
  //   // 删除vuex中的user数据
  //   commit(RESET_USER)
  //   // 删除vuex中的token
  //   commit(RESET_TOKEN)
  // },
  // // 自动登录
  // async autoLogin({commit},token){
  //   if(token){ // 有token
  //     // 使用token发送自动登录请求
  //     const result = await reqAutoLogin()
  //     if(result.code === 0){
  //       const user = result.data
  //       commit(RECEIVE_USER,user)
  //     }
  //   }
  // },

  // // 商家信息
  // async getInfo ({commit}){
  //   const result = await reqGetInfo()
  //   if(result.code === 0) {
  //     const info = result.data
  //     commit(GET_INFO,info)
  //   }
  // },
  //   // 商家信息
  //   async getRatings ({commit}){
  //     const result = await reqGetRatings()
  //     if(result.code === 0) {
  //       const ratings = result.data
  //       commit(GET_RATINGS,ratings)
  //     }
  //   },
  //     // 商家信息
  // async getGoods ({commit}){
  //   const result = await reqGetGoods()
  //   if(result.code === 0) {
  //     const goods = result.data
  //     commit(GET_GOODS,goods)
  //   }
  // }
}