<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item on" :class="star" v-for="(star, index) in StarArr" :key="index"></span>
  </div>
</template>

<script>
export default {
  name: 'Star',
  data () {
    return {

    }
  },
  props: {
    size: String,
    score: Number
  },
  computed: {
    StarArr () {
      const stars = []
      // 分数
      const {score} = this
      // 获取分数的整数部分
      const scoreInt = Math.floor(this.score)
      // 整数部分为多少 就向数组加入几个'on' 即满星
      for(let i = 0;i<scoreInt;i++){
        stars.push('on')
      }
      // 如果小数部分大于等于0.5 则是半星
      // 由于JavaScript精度不足 小数计算可能有误 是故乘以十
      if(score*10 - scoreInt*10 >= 5){
        stars.push('half')
      }
      // 最后遍历数组 如果数组内容个数不足5 则以空星填充到总数为5
      while(stars.length < 5){
        stars.push('off')
      }
      
      return stars
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.star //2x图 3x图
                            float left
                            font-size 0
                            .star-item
                              display inline-block
                              background-repeat no-repeat
                            &.star-48
                              .star-item
                                width 20px
                                height 20px
                                margin-right 22px
                                background-size 20px 20px
                                &:last-child
                                  margin-right: 0
                                &.on
                                  bg-image('./images/stars/star48_on')
                                &.half
                                  bg-image('./images/stars/star48_half')
                                &.off
                                  bg-image('./images/stars/star48_off')
                            &.star-36
                              .star-item
                                width 15px
                                height 15px
                                margin-right 6px
                                background-size 15px 15px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('./images/stars/star36_on')
                                &.half
                                  bg-image('./images/stars/star36_half')
                                &.off
                                  bg-image('./images/stars/star36_off')
                            &.star-24
                              .star-item
                                width 10px
                                height 10px
                                margin-right 3px
                                background-size 10px 10px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('./images/stars/star24_on')
                                &.half
                                  bg-image('./images/stars/star24_half')
                                &.off
                                  bg-image('./images/stars/star24_off')
                          
</style>
