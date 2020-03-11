// 引入axios
import axios from 'axios'
// 引入qs
import qs from 'qs'
import store from '../store/store'
import router from '../router'
import {Toast} from 'mint-ui'
// 添加请求拦截器
// eslint-disable-next-line no-unused-expressions
axios.interceptors.request.use(config => {
  const {method, data} = config
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    // 把data对象转化为urlEncoding的形式
    config.data = qs.stringify(data)
  }
  // 判断请求数据是否需要token
  if(config.headers.needToken){
    // 拿到touken
    const token = store.state.user.token
    // 判断token有没有值
    if(!token){
      // token没值
      // 创建一个新的错误对象
      const error = new Error()
      // 错误码
      error.status = 401
      // 抛出异常
      throw error
    }else{
      // token存在并有值  添加给请求头的 authorization属性
      config.headers.authorization = token
    }
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  // 判断当前的错误信息是请求的还是响应的
  if(!error.response){ // 请求的错误
    // 错误码为401 即token过期
    if(error.status === 401){
      if(router.currentRoute.path !== '/login'){ // 当token过期后 判断当前路径是不是登录页面 不是则强制跳转到登录页面
        Toast('登录过期请重新登录')
        router.replace('/login')
      }
    }
  } else{ // 响应的错误
    // 拿到错误的状态码
    const {status} = error.response
    if(status === 401){
      // token过期 重置token  跳转到登录界面
      if(router.currentRoute.path !== '/login'){
        store.dispatch('resetLogin')
        router.replace('/login')
      }
    } else if(status === 404){
      Toast('请求失败，没有资源')
    }else{
     Toast('请求错误'+error.message) 
    }
  }
  return new Promise(() => { })
})
// 向外暴露axios
export default axios
