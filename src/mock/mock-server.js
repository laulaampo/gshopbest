// 引入mock
import Mock from 'mockjs'
// 引入data.json 虚拟数据
import ouerData from './data.json'

// 拦截ajax请求 返回虚拟的数据 mock方法两个参数 第一个参数是请求路径 第二个参数是返回的数据形式
Mock.mock('/goods',{code:0,data:ouerData.goods})
Mock.mock('/ratings',{code:0,data:ouerData.ratings})
Mock.mock('/info',{code:0,data:ouerData.info})