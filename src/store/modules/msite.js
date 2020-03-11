import {
  RECEIVE_ADDESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
} from '../mutations-type'
import {
  reqAddress,
  reqCategorys,
  reqShops
} from '../../api/index'
const state = {
  // 经纬度
  longitude: '116.36867',
  latitude: '40.10038',
  address: {}, // 地址信息
  shops: [], // 商家列表
  categorys: [], // 商品列表
}
const mutations = {
  [RECEIVE_ADDESS]: (state, address) => {
    state.address = address
  },
  [RECEIVE_CATEGORYS]: (state, categorys) => {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS]: (state, shops) => {
    state.shops = shops
  }
}
const actions = {
  async getAddress({
    commit,
    state
  }) {
    const {
      longitude,
      latitude
    } = state
    const result = await reqAddress({
      longitude,
      latitude
    })
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDESS, address)
    }
  },
  async getCategorys({
    commit
  }, callback) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
      // 如果callback参数是函数 就执行
      callback === 'function' && callback()
    }
  },
  async getShops({
    commit,
    state
  }) {
    const {
      longitude,
      latitude
    } = state
    const result = await reqShops({
      longitude,
      latitude
    })
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
}
const getters = {}

const msite = {
  state,
  mutations,
  actions,
  getters
}
export default msite