<template>
	<!-- 我的页面布局开始 -->
	<view class="my">
		<!-- 头部导航开始布局 -->
		<view class="my-nav">
			<!-- #ifdef APP-PLUS || H5 -->
			<image src="../../static/img/16.jpg" mode="widthFix"></image>
			<text class="my-nav-title" v-show="!token" @click="log">未登入，点击登入</text>
			<view class="my-nav-box" v-show="token">
				<view class="">用户:{{ipone | format_ipone}}</view>
				<view class="">称号：九品茶杰</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN || MP-ALIPAY-->
			<image src="../../static/img/16.jpg" mode="widthFix" v-if="!token" ></image>
			<image :src="img_url" mode="widthFix" v-if="token"></image>
			<!-- #ifdef MP-WEIXIN -->
			<button class="my-nav-title wx-title" v-if="!token" open-type="getUserInfo"
			@getuserinfo = "wx_user">未登入，点击登入</button>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
			<button class="my-nav-title wx-title" v-if="!token" open-type="getAuthorize" scope="userInfo"
			@click = "getAuthorize">未登入，点击登入</button>
			<!-- #endif -->
			<view class="my-nav-box" v-if="token">
				<view class="">用户:{{userName}}</view>
				<view class="">称号：九品茶杰</view>
			</view>
			<view class="iconfont icon-shezhi" @click="wx_sheZhi"></view>
			<!-- #endif -->
			
		</view>
		
		<!-- 导航列表数据开始布局 -->
		<view class="my-list-nav">
			<block v-for="(item,index) in my_nav" :key="item.id">
				<view class="my-list-nav-box" @click="nav(index)">
					<view class="iconfont my-list-nav-box-icon" :class="['icon-'+item.icon]"
					:style="{color:sun(index)}"></view>
					<view class="my-list-nav-box-title">{{item.title}}</view>
				</view>
			</block>
		</view>
		
		<!-- 页面列表数据开始布局 -->
		<view class="my-list">
			<block v-for="(item,index) in my_list" :key="item.id">
				<view class="my-list-box" hover-class="my-list-active" @click="list_nav(index)">
					<view class="icon iconfont" :class="['icon-'+item.icon]"></view>
					<view class="my-list-box-title">{{item.title}}</view>
					<image class="my-list-box-img" :src="item.img" mode="widthFix"></image>
				</view>
			</block>
		</view>
		
		<!-- 我的页面布局结束 -->
	</view>
</template>

<script>
	import { mapState, mapGetters} from 'vuex';
	export default {
		data(){
			return{
				token:'',
				ipone:'',
				//导航列表数据
				my_nav:[
					{id:1,title:'全部订单',icon:'quanbudingdan-01'},
					{id:2,title:'待付款',icon:'daifukuan'},
					{id:3,title:'待收货',icon:'icon-test'},
					{id:4,title:'待评价',icon:'icon-test1'}
				],
				//页面列表数据
				my_list:[
					{id:1,title:'钱包',icon:'qianbao',img:'/static/img/right.png'},
					{id:2,title:'收藏',icon:'shoucang',img:'/static/img/right.png'},
					{id:3,title:'优惠券',icon:'9',img:'/static/img/right.png'},
					{id:4,title:'收货地址',icon:'shouhuodizhi',img:'/static/img/right.png'}
				],
				// #ifdef MP-WEIXIN || MP-ALIPAY
				img_url:uni.getStorageSync('user').avatarUrl||'',
				userName:uni.getStorageSync('user').nickName||''
				// #endif
			}
		},
		
		// #ifdef APP-PLUS ||H5
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				this.$config.navigate({
					url:'/pages/sheZhi/sheZhi'
				})
			}
		},
		// #endif
		onShow() {//每次进入页面重新获取数据，这样的话，可以使用页面刷新，就可以使数据达到实时更新，
			this.token = uni.getStorageSync('token')||'';
			// this.$config.token = this.token;
			this.ipone = uni.getStorageSync('ipone')||'';
		},
		methods:{
			// #ifdef MP-WEIXIN
			wx_user(e){//点击获取用户信息
				this.img_url = e.detail.userInfo.avatarUrl;
				this.userName = e.detail.userInfo.nickName;
				this.token = e.detail.cloudID;
				uni.setStorageSync('user',e.detail.userInfo);
				uni.setStorage({
					key:'token',
					data:e.detail.cloudID,
					success() {
						console.log('成功')
					},fail(msg) {
						console.log(msg);
						console.log('失败')
					}
				});
			},
			// #endif
			// #ifdef MP-ALIPAY || MP-WEIXIN
			//点击设置，跳转到设置页面
			wx_sheZhi(){
				this.$config.navigate({
					url:'/pages/sheZhi/sheZhi'
				})
			},
			// #endif
			
			// #ifdef MP-ALIPAY
			// 获取支付宝用户的信息
			getAuthorize(){
				uni.getUserInfo({
					success:(res)=> {
						console.log(res.userInfo.avatarUrl)
						this.img_url = res.userInfo.avatarUrl;
						this.userName = res.userInfo.nickName;
						this.token = res.avatar;
						uni.setStorageSync('user',res.userInfo);
						uni.setStorage({
							key:'token',
							data:res.avatar,
							success() {
								console.log('成功')
							},fail(msg) {
								console.log(msg);
								console.log('失败')
							}
						});
					},fail() {
						console.log(JSON.stringify(msg)+'======获取支付宝用户信息错误');
					}
				})
			},
			// #endif
			//点击列表导航
			list_nav(k){
				uni.showToast({
					icon:'none',
					title:'当前页面还未开发，尽情期待吧！'
				})
				// switch (k){
				// 	case 0:
				// 	// 封装的权限验证的路由跳转
				// 		this.$config.navigate({
				// 			url:''
				// 		})
						
				// 		break;
				// 	case 1:
				// 		this.$config.navigate({
				// 			url:' '
				// 		})
				// 		break;
				// 	case 2:
				// 		this.$config.navigate({
				// 			url:' '
				// 		})
				// 		break;
				// 	default:
				// 		this.$config.navigate({
				// 			url:' '
				// 		})
				// 		break;
				// }
			},
			//点击导航列表跳转相应的页面
			nav(k){
				switch (k){
					case 0:
					// 封装的权限验证的路由跳转
						this.$config.navigate({
							url:'/pages/my_order/my_order?index=0 '
						})
						break;
					case 1:
						this.$config.navigate({
							url:'/pages/my_order/my_order?index=1 '
						})
						break;
					case 2:
						this.$config.navigate({
							url:'/pages/my_order/my_order?index=3 '
						})
						break;
					default:
						this.$config.navigate({
							url:'/pages/my_order/my_order?index=4 '
						})
						break;
				}
				
			},
			//点击去登陆
			log(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			// 给每一个循环的图标加上不同的颜色
			sun(index){
				let color="orange";
					switch (index){
						case 0:
							color="orange";
							break;
						case 1:
							color="yellow";
							break;
						case 2:
							color="pink";
							break;
						default:
						    color="green";
							break;
					}
					return color;
			}
		},
		computed:{
			// ...mapGetters(['format_ipone']),
			// ...mapState(['token'])
		}
	}
</script>

<style lang="scss">
	/* #ifdef MP-WEIXIN || MP-ALIPAY*/
	.wx-title{
		background-color: #fff !important;
		color: #000;
		flex: 1;
		padding: 0;
		margin: 0;
		text-align: left;
		font-size: 28rpx;
		border: none;
	}
	button:after{
		border: none !important;
		// background-color: #fff;
	}
	page{
		height: 100%;
		background-color: #f4f5f6;
	}
	/* #endif */
	
	page{
		height: 100%;
		background-color: #f4f5f6;
	}
	.my{
		width: 100%;
		height: 100%;
		padding-top: 20rpx;
		box-sizing: border-box;
		// 头部
		.my-nav{
			padding: 20rpx 40rpx;
			font-size: 28rpx;
			font-weight: bold;
			background-color: #fff;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			&>image{
				width: 80rpx;
				height: 80rpx;
				vertical-align: middle;
				margin-right: 20rpx;
			}
			.my-nav-box{
				flex: 1;
				&>view:nth-child(2){
					font-weight: normal;
					font-size:24rpx;
					color: #666;
					margin-top: 12rpx;
				}
			}
		}
		// 导航列表
		.my-list-nav{
			display: flex;
			align-items: center;
			justify-content: space-around;
			background-color: #fff;
			padding: 20rpx 0rpx;
			width: 100%;
			// height: 80rpx;
			box-sizing: border;
			text-align: center;
			.my-list-nav-box{
				
				.my-list-nav-box-icon{
					font-size: 90rpx;
					color: orange;
				}
				&>view:nth-child(3){
					color: red;
				}
				.two{
					color: yellow;
				}
				.three{
					color: pink;
				}
				.four{
					color: green;
				}
				.my-list-nav-box-title{
					font-size: 26rpx;
					font-weight: bold;
					color: #333;
				}
			}
		}
		.my-list{
			padding-bottom: var(--window-bottom);
		}
		// 页面列表布局
		.my-list-box{
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			padding: 20rpx 40rpx;
			background-color: #fff;
			.icon{
				font-size:60rpx;
				color: #ccc;
			}
			.my-list-box-title{
				flex: 1;
				font-size: 28rpx;
				color: #9b9b9b;
				padding-left: 30rpx;
				font-weight: 500;
			}
			.my-list-box-img{
				width: 48rpx;
			}
		}
	}
	.my-list-active{
		background-color: #000;
	}
</style>
