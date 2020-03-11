import Vue from 'vue'
// 间接修改state 和 异步方法
import {
  reqGetGoods,
  reqGetRatings,
  reqGetInfo
} from '../../api/index'
import {
  GET_INFO,
  GET_RATINGS,
  GET_GOODS,
  ADD_FOOD_COUNT,
  REMOVE_FOOD_COUNT,
  CLEAR_CART
} from '../mutations-type'
const state = {
  info: {}, // 店家信息
  ratings: [], // 商家评论
  goods: [], // 点餐信息
  cartFoods:[]
}
const mutations = {
  // 设置点餐信息
  [GET_GOODS](state, goods) {
    state.goods = goods
  },
  // 设置评价信息
  [GET_RATINGS](state, ratings) {
    state.ratings = ratings
  },
  // 设置商家信息
  [GET_INFO](state, info) {
    state.info = info
  },
  // 添加食物选中的数量
  [ADD_FOOD_COUNT](state,{food}){
    if(!food.count){ // 第一次添加
      // food.count = 1
      // 自己添加的属性是非响应式属性 要通过Vue设置成响应式属性才能更新视图
      Vue.set(food,'count',1)
      // 只加一次食物 
      state.cartFoods.push(food)
    }else{
      food.count++
    }
  },
  // 减少食物选中的数量
  [REMOVE_FOOD_COUNT](state,{food}){
    if(food.count > 0){
      food.count--
      if(food.count === 0 ){
        // 如果当前食物的数量为0 则找出他所在的索引并在购物车中删除
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  // 清空购物车
  [CLEAR_CART](state){
    state.cartFoods = []
  }
}
const actions = {
  // 商家信息
  async getInfo({
    commit
  }) {
    const result = await reqGetInfo()
    if (result.code === 0) {
      const info = result.data
      commit(GET_INFO, info)
    }
  },
  // 商家信息
  async getRatings({
    commit
  }) {
    const result = await reqGetRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(GET_RATINGS, ratings)
    }
  },
  // 商家信息
  async getGoods({
    commit
  }) {
    const result = await reqGetGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(GET_GOODS, goods)
    }
  },

  // 食物数量
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit(ADD_FOOD_COUNT,{food})
    }else{
      commit(REMOVE_FOOD_COUNT,{food})
    }
  },
  // 清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  }
}
const getters = {
  // 计算购物车食物的总数
  totalCount(state){
    return state.cartFoods.reduce((pre,food)=>food.count + pre,0)
  },
  // 计算购物车食物的总价
  totalPrice(state){
    return state.cartFoods.reduce((pre,food)=>food.count * food.price + pre,0)
  },
  // 商家总评论数
  totalRatingsCount(state){
    return state.ratings.length
  },
  // 总商家推荐评论数
  positiveRatingsCount(state){
    return state.ratings.reduce((pre,rating)=>pre + (rating.rateType === 0? 1:0),0)
  }
}

const shop = {
  state,
  mutations,
  actions,
  getters
}
export default shop