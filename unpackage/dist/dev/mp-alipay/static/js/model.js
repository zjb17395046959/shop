import { HTTP } from './http.js'//引入http文件中的class类
const _HTTP = new HTTP()

class IndexModel {//用class类进行封装
// 获取验证码的接口
yzm (data) {
 return _HTTP.request({
   method: 'post',
   url: '/LoginAction!sendVCode2User.action',
   data:data
 })
}
//点击注册，检验验证码是否一致
yzmCode (data) {
 return _HTTP.request({
   method: 'post',
   url: '/LoginAction!enterSystem4VCode.action',
   data:data
 })
}
// 商铺详情
// dataDetail (id) {
//  return _HTTP.request({
//    method: 'POST',
//    url: '/***',
//    data: {
//      id
//    }
//  })
// }
}
export {IndexModel}