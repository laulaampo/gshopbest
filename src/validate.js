import Vue from 'vue'
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN',{
  // 配置对象
  // 使用中文语言包
  messages:zh_CN.messages,
  attributes:{
    phone:'手机号码',
    code:'短信验证码',
    pwd:'密码',
    name:'用户名',
    captcha:'图形验证码'
  }
})


// 扩展方法,新添加了一个changePhone的属性---用来验证的手机号码是否是正确的 单独的验证
VeeValidate.Validator.extend('changePhone', {
  // 验证手机号码的一个提示信息
  getMessage: field => `请输入正确的` + field,
  // 校验方法 返回值为true才不提示错误信息  value 是手机号码
  validate: value => {
    return /^[1]\d{10}$/.test(value)
  }
})