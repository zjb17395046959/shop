import Vue from 'vue'
import App from './App'
import "./static/css/iconfont.css"
Vue.config.productionTip = false
//请求接口的封装
import {IndexModel} from './static/js/model.js'
Vue.prototype.$http = new IndexModel()

// 检测手机网络信号的
import lib from './common/lib.js'
// 登录权限的验证
import config from './common/config.js'
Vue.prototype.$lib = lib
Vue.prototype.$config = config
//处理数据格式的js文件
import mat from './common/format.js'
Vue.prototype.$fromat = mat;

//md5加密密码数据
import md5 from './static/js/md5.js';
Vue.prototype.md5 = md5;

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
