<template>
<div>
  <div class="goods">
    <div class="menu-wrapper">
      <ul ref="leftUl">
        <!-- clss:crrunt 表示选中的类名 -->
        <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current:currentIndex === index}" @click="clickLeft(index)">
            <img class="icon" :src="good.icon" v-if="good.icon">
          <span class="text bottom-border-1px">{{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul ref="rightUl">
        <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul ref="RightUl">
            <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" @click="showFood(food)" >
              <div class="icon">
                <img width="57" height="57"
                     :src="food.image">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Food :food="food" ref="food"/>
  </div>
  <ShopCart ref="shopCart"/>
</div>
</template>

<script>
import {mapState} from 'vuex'
import  Bscroll  from 'better-scroll'
import Food from '../../../components/Food/Food.vue'
import ShopCart from '../ShopCart/ShopCart.vue'
export default {
  name: 'Goods',
  data () {
    return {
      tops:[], // 菜单的高度区间数组
      scrollY:0, // 滑动的距离
      food:{}
    }
  },
  components:{
    Food,
    ShopCart
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods,
      info:state=>state.shop.info
    }),
    currentIndex(){
      const {scrollY,tops} = this
      // 找出右侧高度为某个数时 对比tops的区间 匹配出区间中小的那个索引作为被选中的索引
      const index = tops.findIndex((top,index)=>scrollY >= top && scrollY <tops[index+1])
      // 判断当前实例上存储的index是否等于当前计算出的index  以及leftNav是否创建成功
      if(this.index !== index && this.leftNav){
        // 让实例上的索引保存计算出的索引
        this.index = index
        // 找出左侧导航栏中对应索引的li
        const Leftli = this.$refs.leftUl.children[index]
        // 让左侧li移动到指定的位置
        this.leftNav.scrollToElement(Leftli,30)
      }
      return index 
    }
  },
  methods:{
    _initBscroll(){
      this.leftNav = new Bscroll('.menu-wrapper',{
        click:true // 点击
      })
      this.rightFoods = new Bscroll('.foods-wrapper',{
        click: true,
        probeType: 1
      })
      this.rightFoods.on('scroll', ({  y }) => {
        // console.log({x,y})
        this.scrollY = Math.abs(y)
      }),
      this.rightFoods.on('scrollEnd',({y})=>{
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化foods的高度集合的数组
    _initTops(){
      // 创建一个空数组
      const tops = []
      // 第一个li的起始高度是0
      let top = 0
      tops.push(top)
      // 获取食物列表的索引li元素集合
      const foodsLists = this.$refs.rightUl.children
      // 借用数组方法 进行遍历
      Array.prototype.slice.call(foodsLists).forEach(li=>{
        // 每个新的分类起始高度加入数组当中
        top += li.clientHeight
        tops.push(top)
      })
      // 保存到当前组件对象中
      this.tops = tops
    },
    // 点击左侧导航 右侧到达响应的位置
    clickLeft(index){
      // 接收并保存当前点击的左侧nav的li的索引
      const moveY = this.tops[index]
      // 
      this.scrollY = moveY
      // 调用BatterScroll实例上的方法 使右侧列表滑动到指定高度处 因为moveY是正数所以要取反
      // 参数1、2：移动的x与y坐标  参数3：过渡时间
      this.rightFoods.scrollTo(0,-moveY,300)
    },
    showFood(food){
      this.food = food
      // 通过获取dom元素得到组件 在调用组件上的方法展示组件
      this.$refs.food.foodShow()
    }
  },
  // mounted是组件加载完的回调函数  computed是组件渲染完成前就存在的 所以computed的数据会先于mounted出现
  async mounted(){
    await this.$store.dispatch('getInfo')
    await this.$store.dispatch('getGoods')
    // 有获取数据之后再调用方法初始化tops和batterScroll 以免一进来没有效果
    this.$nextTick(()=>{
      this._initTops()
      this._initBscroll()
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
