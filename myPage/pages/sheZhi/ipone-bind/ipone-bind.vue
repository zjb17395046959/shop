<template>
	<view class="ipone-bind">
		<page-buJu>
			<template v-slot:list>
				<view class="ipone-bind-list">
					<view class="ipone-bind-list-title">请输入您要换绑的手机号</view>
					<input class="ipone-bind-list-ipone" type="text" placeholder="请输入手机号码" maxlength="11" v-model="ipone"/>
					<view class="ipone-bind-list-yzm">
						<input type="text" placeholder="请输入验证码" maxlength="6" v-model="yzm"/>
						<view class="btn-yzm" @tap="getYzm" :style="{color:yzm_color==1?'orange':''}">{{yzmTitle}}</view>
					</view>
				</view>
			</template>
			<template v-slot:footer>
				<!-- 底部按钮 -->
				<button type="default" class="btn" size="default" :disabled="disable"
				 :style="{background:disable?'#ccc':''}" @click="btn">确认换绑</button>
			</template>
		</page-buJu>
	</view>
</template>

<script>
	import code from '../../../../static/js/code.js'
	export default {
		data() {
			return {
				ipone:'',//手机号
				yzm:'',//验证码
				disable:true,//默认按钮不可点击
				yzmTitle:'获取验证码',
				yzmTimer:0,//验证码的时间
				yzm_color:0
			}
		},
		watch:{
			ipone(){
				this.checkBtn();
				if(this.phoneNumberVerify()){
					this.yzm_color=1;
				}
			},
			yzm(){
				this.checkBtn();
			}
		},
		methods: {
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
				// 请求短信验证码的接口,调用封装的方法
				code.get_code(this.ipone);
				
				var timer = setInterval(()=>{
					this.yzmTimer -- ;
					this.yzmTitle = this.yzmTimer + 's后重新获取';
					if(this.yzmTimer < 1){
						clearInterval(timer);
						this.yzmTimer = 0 ;
						this.yzm_color = 0;
						this.yzmTitle = '获取验证码';
					}
				},1000);
				
			},
			//如果手机号和验证码有值，那么就变色，并且可点击
			checkBtn(){
				if(this.yzmCode()&&this.phoneNumberVerify()){
					this.disable=false;
					return false;
				}
				this.disable=true;
			},
			// 验证码验证，6位纯数字
			yzmCode(){
				 var reg = /^\d{6}$/g;
				 return reg.test(this.yzm);
			},
			// 校验手机号的正则，及登录页面的账号也就是手机号
			phoneNumberVerify() {
				var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
				return reg.test(this.ipone);
			},
			//点击确认换绑按钮
			btn(){
				uniCloud.callFunction({
					name:'set-sheZhi',
					data:{
						action:'bind-mobile',
						mobile:this.ipone,
						code:this.yzmTitle
					},
					success: (res) => {
						console.log(res)
						if(res.result.code ===0){
							uni.showToast({
								title : '换绑成功！',
								icon : 'success'
							});
							uni.setStorageSync('ipone',this.ipone);
							// setTimeout(()=>{
							// 	uni.navigateBack({
							// 		delta:1
							// 	})
							// },1000)
						}else{
							uni.showModal({
								showCancel:false,
								content:res.result.message
							})
						}
					},fail: (msg) => {
						console.log(msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
	.ipone-bind{
		width: 100%;
		height: 100%;
		background-color:  #f4f5f6;
		padding-top: 20rpx;
		box-sizing: border-box;
		// 列表渲染
		.ipone-bind-list{
			background-color: #fff;
			padding: 0rpx 20rpx;
			.ipone-bind-list-title{
				font-weight: bold;
				font-size: 30rpx;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;
			}
			.ipone-bind-list-ipone{
				width: 100%;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;
			}
			.ipone-bind-list-yzm{
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;
				&>input{
					flex: 1;
				}
				.btn-yzm{
					font-size: 30rpx;
					color: #ccc;
				}
			}
		}
	}
	.btn{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color:orange;
		color: #fff;
		font-size: 48rpx;
	}
	button::after{
		border: none;
	}
</style>
