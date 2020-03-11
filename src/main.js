import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import CartControl from './components/CartControl/CartControl.vue'
import store from './store/store'
import {Button} from 'mint-ui'
import './mock/mock-server'
import './validate'
import './filter/index.js'
import VueLazyload from 'vue-lazyload'
import loding from './common/images/loading.gif'
Vue.config.productionTip = false
// Header注册成功公共组件 这样在任何组件无需引入 直接使用
Vue.component(Header.name, Header)
Vue.component(Star.name, Star)
Vue.component(CartControl.name,CartControl)
Vue.component(Button.name, Button);
Vue.use(VueLazyload,{
  loding // 懒加载时显示的图片
})
Vue.prototype.$bus=new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  router,
  store
})
