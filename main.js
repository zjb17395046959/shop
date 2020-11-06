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
//实现使用拼音查找中文字段的插件（有点问题）
import PinYinMatch from './static/js/main.js';
Vue.prototype.PinYinMatch = PinYinMatch;

import store from './store';

//封装全局的请求云函数的方法
Vue.prototype.$http = function(name,data=''){
	uni.showLoading({
		title:'加载中'
	});
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({
			name:name,
			data:data,
			success: (res) => {
				resolve(res);
				uni.hideLoading();
				
			},fail: (msg) => {
				uni.hideLoading();
				reject(msg);
				uni.showToast({
					title:JSON.stringify(msg)+'数据请求错误',
					icon:"none"
				});
				// console.log(msg);
			}
		})
	})
},

Vue.filter('format_ipone',function(val){
	if(val){
		var reg = /^(\d{3})\d{4}(\d{4})$/;
		val = val.replace(reg, "$1****$2");
	}
	return val;
})

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
