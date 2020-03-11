<template>
<section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" @click="loginWay = true" :class="{on : loginWay}">短信登录</a>
            <a href="javascript:;" @click="loginWay = false" :class="{on : !loginWay}">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" 
                maxlength="11" 
                placeholder="手机号" 
                v-model="phone"
                name="phone"
                v-validate="'required|changePhone'"
                >
                <span style="color:red"  v-show="errors.has('phone')" >{{ errors.first('phone') }}</span>
                <button 
                :disabled="!this.isRightPhone || computedTime>0" 
                class="get_verification"
                :class="{right:isRightPhone}"
                @click.prevent="sendCode">{{computedTime>0?`倒计时${computedTime}`:'获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input 
                type="tel" 
                maxlength="8" 
                placeholder="验证码" 
                v-model="code"
                name="code"
                v-validate="'required'">
                <span style="color:red">{{errors.first('code')}}</span>
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input 
                  type="tel" 
                  maxlength="11" 
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                  name="name"
                  v-validate="'required'">
                  <span style="color:red">{{errors.first('name')}}</span>
                </section>
                <section class="login_verification">
                  <input 
                  :type="isShowPwd?'tel':'password'" 
                  maxlength="8" 
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required'">
                  <span style="color:red">{{errors.first('pwd')}}</span>
                  <div class="switch_button" @click="isShowPwd = !isShowPwd" :class="isShowPwd?'on':'off'">
                    <div class="switch_circle" :class="{run_circle:isShowPwd}"></div>
                    <span class="switch_text">{{isShowPwd?'...':'abc'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input 
                  type="text" 
                  maxlength="11" 
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="'required'">
                  <span style="color:red">{{errors.first('captcha')}}</span>
                  <img class="get_verification" ref="captcha" src="http://localhost:5000/captcha" alt="captcha" @click="sendCaptcha">
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
</template>

<script>
import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api/index'
import {Toast, MessageBox } from 'mint-ui'
export default {
  name: 'Login',
  data () {
    return {
      loginWay:true, // true默认 true 是短信登录 false 是密码登录
      phone: '', // 手机号码
      computedTime: 0, // 倒计时
      isShowPwd: false, // 是否显示密码
      code:'',
      name:'',
      captcha:'',
      pwd:''
    }
  },
  computed: {
     isRightPhone() {
      //  判断手机号是否1开头的十一位号码
       return /[1]\d{10}/.test(this.phone)
     }
  },
  methods: {
    // 刷新图像验证码
    sendCaptcha(){
       this.$refs.captcha.src = `http://localhost:5000/captcha?time=` + Date.now()
    },
    // 发送手机验证码
   async sendCode(){
      this.computedTime = 10
      this.intervalId = setInterval(()=>{
        this.computedTime--
        this.computedTime <=0 && clearInterval(this.intervalId) // 倒计时为0的时候清楚定时器
      },1000)
      const result = await reqSendCode(this.phone)
      if(result.code === 0){
        // 发送成功成功
        Toast('发送成功')
      }else{
        // 发送失败
        MessageBox.alert('发送失败', '提示')
        this.computedTime = 0
      }
      
    },
    async login(){
      // 通过loginWay判断是什么登录方式 true为手机验证码 false为用户名密码
      const {loginWay } = this
      // 保存登录结果promise对象
      let result
      let names
      // 登录器进行表单验证 根据不同的登录方式准备不同验证的内容
      if(loginWay){
        names = ['phone','code']
      }else{
        names = ['name','pwd','captcha']
      }
      // 表单验证的结果 如果true则全部通过
      const success = await this.$validator.validateAll(names)
      if(success){ // 通过表单验证才进行登录结构调用
      if(loginWay){
        const {code,phone} = this
        // 手机验证码登录
        result = await reqSmsLogin(phone,code)
        this.code = ''
      }else{
        // 用户名密码登录
        const {name,pwd,captcha} = this
        result = await reqPwdLogin({name,pwd,captcha})
        // 刷新和清空图像验证码输入框
        this.sendCaptcha()
        this.captcha = ''
      }
      // 得到请求结果之后 判断有无成功
      if(result.code === 0){
        // 登录成功
        // 保存用户数据
        const user = result.data
        this.$store.dispatch('saveUser',user)
        this.$router.replace('/profile')
      }else{
        MessageBox('提示','登录失败！')
      }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.right
  color black !important
.loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.run_circle
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
