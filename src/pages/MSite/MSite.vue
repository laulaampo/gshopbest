<template>
    <div class="on">
      <section class="msite">
        <!--首页头部-->
        <!-- <header class="msite_header">
            <span class="header_search">
              <i class="iconfont icon-sousuo"></i>
            </span>
          <span class="header_title">
              <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
            </span>
          <span class="header_login">
              <span class="header_login_text">登录|注册</span>
            </span>
        </header> -->
        <Header :title="address.name || '正在定位中...'">
          <span class="header_search" slot="left" @click="$router.replace('/search')">
              <i class="iconfont icon-sousuo"></i>
            </span>
          <span class="header_login" slot="right">
              <span class="header_login_text" @click="!user._id && $router.push('/login')">{{user.name?`你好，${user.name}`:'登录|注册'}}</span>
          </span>
        </Header>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="`https://fuss10.elemecdn.com`+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <!--首页附近商家-->
        <ShopList />
      </section>
    </div>
</template>

<script>
import ShopList from '../../components/ShopList/ShopList'
import Swiper from 'swiper'
import { mapState } from 'vuex'
// require styles
import 'swiper/css/swiper.css'
export default {
  name: 'MSite',
  data () {
    return {

    }
  },
  components: {
    ShopList
  },
  async mounted () {
    console.log(this.$store.state.msite.categorys)
    this.$store.dispatch('getShops')
    this.$store.dispatch('getAddress')
    // 要使用async/await 配合$nextTick 完成数据请求之后再渲染轮播图 否则数据没加载完就渲染会有bug
    await this.$store.dispatch('getCategorys')
    console.log(this.$store.state.msite.categorys)
    // console.log(this.categorys)
    // console.log(this.shops)
    // $nextTick 当DOM元素下次更新完后触发的回调函数
    this.$nextTick(()=>{
       // 界面渲染完毕的时候 且数据请求完之后 加载轮播图
    /* eslint-disable */
    var mySwiper = new Swiper('.swiper-container', {
      loop: true, // 循环遍历模式
      // 分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
    })

    // this.$store.dispatch('getCategorys',()=>{
    //   this.$nextTick(()=>{
    //         /* eslint-disable */
    // var mySwiper = new Swiper('.swiper-container', {
    //   loop: true, // 循环遍历模式
    //   // 分页器
    //   pagination: {
    //     el: '.swiper-pagination'
    //   }
    // })
    //   })
    // })

  },
  computed: {
    // ...mapState(['address','shops','categorys','user']),
    ...mapState({
      address:state => state.msite.address,
      shops:state => state.msite.shops,
      categorys: state => state.msite.categorys,
      user: state => state.user.user
    }),
    categorysArr () {
      const {categorys} = this
      let bigArr = []
      let smallArr = []
      categorys.forEach((category,index)=>{
        if(smallArr.length === 0){
          bigArr.push(smallArr)
        }
        smallArr.push(category)
        if(smallArr.length === 8){
          smallArr = []
        }
      })
      return bigArr
    }
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .msite
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
            .shop_container
              margin-bottom 50px
</style>
