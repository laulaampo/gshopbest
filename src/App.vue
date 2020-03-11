<template>
  <div>
    <keep-alive>
      <router-view></router-view>      
    </keep-alive>
    <FooterGuide v-show="$route.meta.isShowFooter "/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import {mapState} from 'vuex'
export default {
  name: 'App',
  data () {
    return {

    }
  },
  components: {
    FooterGuide
  },
  computed:{
    ...mapState({
      token : state => state.user.token
    })
  },
  mounted () {
    const token = this.token
    // 在app组件发送自动登录请求 这样不管在那个路径下 都会进行自动登录
    this.$store.dispatch('autoLogin',token)
    // this.$store.dispatch('getAddress')
    // this.$store.dispatch('getCategorys')
    // this.$store.dispatch('getShops')
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
