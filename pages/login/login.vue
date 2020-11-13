<template>
	<!-- 登录模板布局开始 -->
	<view class="login">
		<!-- 用户头像 -->
		<image class="login-img" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-wm60vejtdast68da9b/bf83d600-1ffc-11eb-880a-0db19f4f74bb.jpg" mode="widthFix"></image>
		<!-- 输入框布局 -->
		<!-- 登录页 -->
		<view class="login-input" v-show="iShow">
			<view class="login-input-box">
				<input type="number" placeholder="请输入账号" maxlength="11" v-model="userName"/>
				<image v-show="userName.length!=''" class="login-img1" src="../../static/img/error.png" mode="scaleToFill"
				@click="userName=''"></image>
			</view>
			<view class="login-input-box">
				<input type="text" placeholder="请输入密码(字母+数字)" maxlength="14" v-model="password" v-if="!isPass" password/>
				<input type="text" placeholder="请输入密码(字母+数字)" maxlength="14" v-model="password" v-if="isPass"/>
				<image v-show="password.length!=''" class="login-img1" src="../../static/img/error.png" mode="scaleToFill"
				@click="err_pas"></image>
				<text class="icon iconfont icon-yanjing" @click="isPass=!isPass" :class="isPass?'isPass':''"></text>
			</view>
		</view>
		<!-- 注册页 -->
		<view class="login-input" v-show="!iShow">
			<view class="login-input-box">
				<input type="text" placeholder="请输入手机号" maxlength="11" v-model="iponeNumber"/>
				<image  class="login-img1" src="../../static/img/error.png" mode="scaleToFill"
				@click="iponeNumber=''" v-show="iponeNumber.length!=''"></image>
			</view>
			<view class="login-input-box">
				<input type="text" placeholder="请输入验证码" maxlength="6" v-model="yzm"/>
				<text class="yzm" @click="getYzm">{{yzmTitle}}</text>
			</view>
		</view>
		<button type="default" class="btn" :disable="disable" :style="{background:disable?'#eee':''}"
		@click="btn(1)" v-if="iShow">登录</button>
		<button type="default" class="btn" :disable="disable" :style="{background:disable?'#eee':''}"
		@click="btn(2)" v-if="!iShow">注册</button>
		<view class="zc" @click="qh" v-if="iShow">注册/验证码登录</view>
		<view class="zc" @click="qh" v-else>账户密码登录</view>
	<!-- 登录模板布局结束 -->	
	</view>
</template>

<script>
	export default {
		data(){
			return{
				iShow:true,//切换账号登录或者是注册用户的条件
				userName:uni.getStorageSync('ipone')||'',//用户名
				password:'',//密码
				iponeNumber:uni.getStorageSync('ipone')||'',//手机号
				yzm:'',//验证码
				yzmTitle:'获取验证码',
				isPass:false,//默认不显示密码
				disable:true,//默认按钮不可点击
				yzmTimer:0,//验证码时间
			}
		},
		
		methods:{
			// 验证码验证，6位纯数字
			yzmCode(){
				 var reg = /^\d{6}$/g;
				 return reg.test(this.yzm);
			},
			//验证密码
			checkPassword(){
				var reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
				return reg.test(this.password);
			},
			// 校验手机号的正则，及登录页面的账号也就是手机号
			phoneNumberVerify() {
				var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
				return reg.test(this.iponeNumber);
			},
			phoneNumber() {
				var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
				return reg.test(this.userName);
			},
			//初始化，点击切换的时候，让他们的值为空
			init(){
				this.userName='';
				this.password='';
				this.iponeNumber='';
				this.yzm='';
			},
			//切换账号登录或者是注册用户的条件
			qh(){
				// this.init();
				this.iShow=!this.iShow;
			},
			//点击密码的清除图标的时候，让显示密码为不显示，并清空密码值
			err_pas(){
				this.password='';
				this.isPass=false;
			},
			//监听，有值了就让按钮为可用的，否则就是禁用
			isBtn(){
				if((this.userName&&this.password)||(this.iponeNumber&&this.yzm)!=''){
					this.disable=false;
					return false;
				}
				this.disable=true;
			},
			//点击获取验证码
			async getYzm(){
				//当前验证码的时间》0，那么就不能再次点击
				if(this.yzmTimer>0) {
					uni.showToast({
						icon:"none",
						title:"不能重复点击"
					})
					return false;
				}
				if(!this.phoneNumberVerify()){
					uni.showToast({
						icon:"none",
						title:"手机号错误"
					})
					return false;
				}
				this.yzmTimer = 60;
				// 请求短信验证码的接口,需要进行购买发送短信的业务
				
				uniCloud.callFunction({
					name:'set-sheZhi',
					data:{
						action:'set-code',
						mobile:this.iponeNumber
					},
					success: (res) => {
						//验证码设置成功，需要在云函数中进行查看
						if(res.result.code === 0){
							console.log(res);
							this.get_code()
						}else{
							uni.showModal({
							    content: res.result.message,
							    showCancel: false
							})
						}
					},
					fail: (msg) => {
						console.error(msg);
						
					}
				})
				var timer = setInterval(()=>{
					this.yzmTimer -- ;
					this.yzmTitle = this.yzmTimer + 's后重新获取';
					if(this.yzmTimer < 1){
						clearInterval(timer);
						this.yzmTimer = 0 ;
						this.yzmTitle = '获取验证码';
					}
				},1000);
				
			},
			//从云函数中获取到code的数据
			get_code(){
				uniCloud.callFunction({
					name:'set-sheZhi',
					data:{
						action:'get-code',
						mobile:this.iponeNumber
					},
					success: (ret) => {
						console.log(ret);
						//返回多条数据的话就取最后一个最新的code
						if(res.result.data.legnth >1){
							uni.showModal({
								content: res.result.data[res.result.data-1].code,
								showCancel: false
							})
						}else{//一个的话，就直接获取当前的code值
							uni.showModal({
								content: res.result.data.code,
								showCancel: false
							})
						}
					},
					fail: (mes) => {
						console.error(mes)
					}
				})
			},
			btn(k){//k=1；登录   k=2注册
			var that = this;
				switch (k){
					case 1:
						if(that.phoneNumber()&&that.checkPassword()){
							//如果验证都通过了，那么就跳转到我的页面
							let oldPassword = uni.getStorageSync('password')||'';
							let newPassword = that.md5(that.password);
							if(oldPassword != newPassword){
								uni.showToast({
									title:'密码错误',
									icon:'none'
								});
								return false;
							}
							//登录
							uniCloud.callFunction({
								name:'user-center',
								data:{
									action:'login',
									params:{
										username:that.userName,
										password:that.password
									}
								},
								success: (ret) => {
									if(ret.result.code === 0 ){
										uni.showToast({
											icon:'success',
											title:'登录成功'
										})
										// setTimeout(()=>{
											uni.reLaunch({
												url:'/pages/my/my'
											})
										// },1000)
									}else{
										uni.showModal({
											content: res.result.message,
											showCancel: false
										})
									}
								},
								fail: (msg) => {
									console.error(msg);
									
								}
							})
						}
						break;
					case 2:
						if(that.phoneNumberVerify()&&that.yzmCode()){
							console.log(that.iponeNumber)
							//注册
							uniCloud.callFunction({
							    name: 'user-center',
							    data: {
									action:'inviteLogin',
									params:{
										mobile: that.iponeNumber,
										code: that.yzm
									}
							        
							    },
							    success(res){
									console.log(res);
							        if(res.result.code === 0) {
							      // 目前版本是驼峰形式uniIdToken，后面会调整为蛇形uni_id_token（调整后会在一段时间内兼容驼峰）
							            uni.setStorageSync('token',res.result.token)
							            // 其他业务代码，如跳转到首页等
							            uni.showToast({
							                title: '注册成功',
							                icon: 'none'
							            })
										uni.setStorageSync('ipone',that.iponeNumber);
										// uni.setStorageSync('token',this.iponeNumber);
										// // setTimeout(()=>{
											// uni.reLaunch({
											// 	url:'/pages/my/my'
											// })
										// },1000)
							        } else {
							            uni.showModal({
							                content: res.result.message,
							                showCancel: false
							            })
							        }
							    },
							    fail(){
							        uni.showModal({
							            content: '注册失败，请稍后再试',
							            showCancel: false
							        })
							    }
							})
							
						}
						break;
					default:
						uni.showToast({
							icon:'none',
							title:'格式错误'
						});
						break;
				}
				
				
			}
		},
		watch:{
			userName(){
				this.isBtn();
			},
			password(){
				this.isBtn();
			},
			iponeNumber(){
				this.isBtn();
			},
			yzm(){
				this.isBtn();
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.login{
		width: 100%;
		height: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		// 头像
		.login-img{
			width: 240rpx;
			margin: 40rpx auto;
			display: block;
		}
		// 输入框布局
		.login-input{
			
			.login-input-box{
				margin-bottom: 36rpx;
				width: 100%;
				height: 80rpx;
				border-bottom: 1rpx solid orange;
				display: flex;
				align-items: center;
				// line-height: 80rpx;
				.login-img1{
					width: 40rpx;
					height: 40rpx;
				}
				input{
					flex: 1;
					display: block;
					
				}
				.icon{
					// display: inline-block;
					margin-left: 20rpx;
					font-size: 44rpx;
				}
			}
		}
		// 登录按钮
		.btn{
			border-radius: 44rpx;
			background-color:#fca12b ;
			color: #fff;
		}
		button::after{
			border: none;
		}
		.zc{
			color: #666;
			font-size: 30rpx;
			margin-top: 40rpx;
		}
		.yzm{
			font-size: 24rpx;
			color:rgb(252, 161, 43) ;
		}
		//显示密码的眼睛
		.isPass{
			color: blue;
			font-weight: bold;
		}
	}
</style>
