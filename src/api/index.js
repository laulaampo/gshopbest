// 引入axios
import ajax from './ajax'
// 定义一个保存地址的常量
const BASE = `/api`


// 根据经纬度获取地址的接口
export const reqAddress = ({longitude ,latitude}) => ajax.get(BASE + `/position/${latitude},${longitude}`)


// 获取食品分类列表
export const reqCategorys = () => ajax.get(BASE + `/index_category`)

// 根据经纬度获取商铺列表
export const reqShops = (({longitude ,latitude}) => ajax({
  method:'GET',
  url: BASE + `/shops`,
  params: {
    longitude,
    latitude
  }
}))

// 获取短信验证码
export const reqSendCode = phone => ajax({
  method:'GET',
  url: BASE + `/sendcode`,
  params:{
    phone
  }
})

// 短信验证码登录
export const reqSmsLogin = (phone,code) => ajax({
  method:'POST',
  url: BASE + `/login_sms`,
  data:{
    phone,
    code
  }
})

// 用户名密码登录
export const reqPwdLogin = ({name,pwd,captcha}) => ajax({
  method:'POST',
  url: BASE + `/login_pwd`,
  data:{
    name,
    pwd,
    captcha
  }
})

// 自动登录
export const reqAutoLogin = () => ajax({
  method:'GET',
  url:BASE + '/auto_login',
  headers:{
    needToken:true
  }
})

// 请求商家菜单信息(虚拟)
export const reqGetGoods = () => ajax.get('/goods')
// 请求商家评价(虚拟)
export const reqGetRatings = () => ajax.get('/ratings')
// 请求商家信息(虚拟)
export const reqGetInfo = () => ajax.get('/info')