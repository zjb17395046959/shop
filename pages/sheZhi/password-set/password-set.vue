<template>
	<!-- 登录密码页面设置开始布局 -->
	<view class="password-set">
	<!-- 通过旧密码进行登录布局 -->	
		<view class="" v-show="!isYam">
			<view class="password-set-title">{{set==1?'请设置3位以上的登录密码':'请设置6位以上的支付密码'}}</view>
			<view class="password-set-box">
				<input type="text" password :placeholder="set==1?'请输入旧登录密码':'请输入旧支付密码'" 
				v-model="password1" maxlength="20" v-show="!iSow_three"/>
				<input type="text" :placeholder="set==1?'请输入旧登录密码':'请输入旧支付密码'" 
				v-model="password1" maxlength="20" v-show="iSow_three"/>
				<view class="icon iconfont icon-yanjing" @tap="iSow_three=!iSow_three"
				:style="{color:iSow_three?'blue':'#000','fontWeight':iSow_three?'700':'400'}"></view>
			</view>
			<view class="password-set-box">
				<input type="text" password :placeholder="set==1?'请输入新的3位以上的登录密码':'请输入新的6位以上的支付密码'" 
				v-model="password2" maxlength="20" v-show="!iSow_four"/>
				<input type="text" :placeholder="set==1?'请输入新的3位以上的登录密码':'请输入新的6位以上的支付密码'" 
				v-model="password2" maxlength="20" v-show="iSow_four"/>
				<view class="icon iconfont icon-yanjing" @tap="iSow_four=!iSow_four"
				:style="{color:iSow_four?'blue':'#000','fontWeight':iSow_four?'700':'400'}"></view>
			</view>
			<view class="password-set-box">
				<input type="text" password :placeholder="set==1?'再次确认登录密码':'再次确认支付密码'" 
				v-model="password3" maxlength="20" v-show="!iShow_five"/>
				<input type="text" :placeholder="set==1?'再次确认登录密码':'再次确认支付密码'" 
				v-model="password3" maxlength="20" v-show="iShow_five"/>
				<view class="icon iconfont icon-yanjing" @tap="iShow_five=!iShow_five"
				:style="{color:iShow_five?'blue':'#000','fontWeight':iShow_five?'700':'400'}"></view>
			</view>
			
		</view>
		
		<!-- 通过验证码登录 -->
		<view class="password-set-yzm" v-show="isYam">
			<!-- 手机格式处理在common下的fromat.js -->
			<view class="password-set-title">当前绑定手机：{{$fromat.ipone}}</view>
			<view class="password-set-box">
				<input type="text" password :placeholder="set==1?'请输入3位以上,20位以下的新密码':'请输入6位数字的支付密码'" 
				v-model="password" maxlength="20" v-show="!iShow"/>
				<input type="text" :placeholder="set==1?'请输入3位以上,20位以下的新密码':'请输入6位数字的支付密码'" 
				v-model="password" maxlength="20" v-show="iShow"/>
				<view class="icon iconfont icon-yanjing" @tap="iShow=!iShow"
				:style="{color:iShow?'blue':'#000','fontWeight':iShow?'700':'400'}"></view>
			</view>
			<view class="password-set-box">
				<input type="text" password :placeholder="set==1?'再次确认登录密码':'再次确认支付密码'" 
				v-model="passwordTwo" maxlength="20" v-show="!iShow_two"/>
				<input type="text" :placeholder="set==1?'再次确认登录密码':'再次确认支付密码'" 
				v-model="passwordTwo" maxlength="20" v-show="iShow_two"/>
				<view class="icon iconfont icon-yanjing" @tap="iShow_two=!iShow_two"
				:style="{color:iShow_two?'blue':'#000',fontWeight:iShow_two?'700':'400'}"></view>
			</view>
			<view class="password-set-box">
				<input type="text" placeholder="输入验证码" v-model="yzm" maxlength="6"/>
				<!-- <input type="text" placeholder="再次确认登录密码" v-model="password" maxlength="21"/> -->
				<view class="" @click="getYzm" style="color:orange;">{{yzmTitle}}</view>
			</view>
		</view>
		
		
		<button type="default" class="btn" @click="btn">确认修改</button>
		<view class="toast" @click="isYam = !isYam " v-show="isYam">通过旧密码修改</view>
		<view class="toast" @click="isYam = !isYam " v-show="!isYam">通过验证码修改</view>
		
		<!-- 布局结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old_pas:uni.getStorageSync('password')||'',
				password1:'',
				password2:'',
				password3:'',
				password:'',//用户输入的密码
				passwordTwo:'',//再次输入密码
				iShow:false,//第一次点击眼睛图标(yzm)
				iShow_two:false,//第二次点击眼睛图标(yzm)
				iSow_three:false,//眼睛图标（密码）
				iSow_four:false,//眼睛图标（密码）
				iShow_five:false,//眼睛图标（密码）
				yzmTimer:0,
				yzmTitle:'获取验证码',
				isYam:false,//切换是通过密码修改还是验证码修改
				yzm:'',
				set:1
			}
		},
		onLoad(e) {
			if(e.set == 2){
				uni.setNavigationBarTitle({
					title:'支付密码设置'
				})
			}
			this.set = e.set;//判断是密码修改还是支付密码修改
		},
		methods: {
			btn(){
				//密码登录
				if(!this.isYam){
					if( this.password1 == '' || this.password2 == '' || this.password3 == '' ){
						uni.showToast({
							title:'密码不能为空',
							icon:'none'
						});
						return false;
					}
					if(this.set ==1 ){
						if(!this.passCode(this.password1) || !this.passCode(this.password2) ||!this.passCode(this.password3)) {
							uni.showToast({
								title:'密码格式错误',
								icon:'none'
							});
							return false;
						};
					}else{
						if(!this.zfCode(this.password1) || !this.zfCode(this.password2) ||!this.zfCode(this.password3)) {
							uni.showToast({
								title:'密码格式错误',
								icon:'none'
							});
							return false;
						};
					}
					let pass = this.md5(this.password1);
					if(this.old_pas != pass){uni.showToast({icon:'none',title:'密码输入错误！'});return false;};
					if(this.password2 != this.password3){uni.showToast({icon:'none',title:'两次密码输入不一致！'});return false;};
					let newPass = this.md5(this.password2);
					if(this.set == 1){
						uni.setStorageSync('password',newPass);
					}else{
						uni.setStorageSync('zf',newPass);
					}
					uni.showToast({icon:'success',title:"修改成功!"});
					uni.navigateBack({
						delta:1
					})
				}else{//验证码登录
					if(this.password == ''|| this.passwordTwo == ''){
						uni.showToast({
							title:'密码不能为空',
							icon:'none'
						});
						return false;
					}
					if(this.set == 1){
						if(!this.passCode(this.password)||!this.passCode(this.passwordTwo)){
							uni.showToast({icon:'none',title:"密码格式错误！"});
							return false;
						}
					}else{
						if(!this.zfCode(this.password)||!this.zfCode(this.passwordTwo)){
							uni.showToast({icon:'none',title:"密码格式错误！"});
							return false;
						}
					}
					if(this.password != this.passwordTwo){
						uni.showToast({icon:'none',title:'两次密码输入不一致！'});
						return false;
					}
					//获取的验证码跟用户输入的是否一致，不一致的话，就return阻止，提示用户
					
					let password = this.md5(this.password);
					if(this.set == 1){
						uni.setStorageSync('password',password);
					}else{
						uni.setStorageSync('zf',password);
					}
					uni.showToast({icon:'success',title:'修改成功!'});
					uni.navigateBack({
						delta:1
					})
				}
				
				
			},
			//密码正则验证
			passCode(val){
				let reg = /^\w{6,21}$/;
				return reg.test(val);
			},
			// 支付密码正则验证
			zfCode(val){
				let reg = /^\d{6}$/;
				return reg.test(val);
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
				// if(!this.phoneNumberVerify()){
				// 	uni.showToast({
				// 		icon:"none",
				// 		title:"手机号错误"
				// 	})
				// 	return false;
				// }
				this.yzmTimer = 60;
				// 请求短信验证码的接口
				// var res = await this.$http.yzmCode({
				// 	mode:0,
				// 	mobilePhoneNumber:this.iponeNumber
				// })
				// console.log(res);
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
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
	.password-set{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		.password-set-title{
			font-size:28rpx;
			color: orange;
		}
		.password-set-box{
			display: flex;
			// justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 80rpx;
			border-bottom: 1rpx solid orange;
			input{
				flex: 1;
			}
			.icon{
				font-size: 40rpx;
			}
		}
	}
	// 登录按钮
	.btn{
		border-radius: 44rpx;
		background-color:#fca12b ;
		color: #fff;
		margin-top:120rpx;
	}
	button::after{
		border: none;
	}
	.toast{
		width: 100%;
		color: #ccc;
		font-size: 30rpx;
		margin: 200rpx 0 0;
		text-align: center;
	}
</style>
