<template>
	<!-- 我的页面布局开始 -->
	<view class="my">
		<!-- 头部导航开始布局 -->
		<view class="my-nav">
			<image src="http://tea.skycto.com/static/img/mine/default-head.png" mode="widthFix"></image>
			<text class="my-nav-title" v-show="!$config.token" @click="log">未登入，点击登入</text>
			<view class="my-nav-box" v-show="$config.token">
				<view class="">用户{{$fromat.ipone}}</view>
				<view class="">称号：九品茶杰</view>
			</view>
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
	export default {
		data(){
			return{
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
				
			}
		},
		onLoad() {
			
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
		methods:{
			//点击列表导航
			list_nav(k){
				switch (k){
					case 0:
					// 封装的权限验证的路由跳转
						this.$config.navigate({
							url:' '
						})
						break;
					case 1:
						this.$config.navigate({
							url:' '
						})
						break;
					case 2:
						this.$config.navigate({
							url:' '
						})
						break;
					default:
						this.$config.navigate({
							url:' '
						})
						break;
				}
			},
			//点击导航列表跳转相应的页面
			nav(k){
				switch (k){
					case 0:
					// 封装的权限验证的路由跳转
						this.$config.navigate({
							url:' '
						})
						break;
					case 1:
						this.$config.navigate({
							url:' '
						})
						break;
					case 2:
						this.$config.navigate({
							url:' '
						})
						break;
					default:
						this.$config.navigate({
							url:' '
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
		}
	}
</script>

<style lang="scss">
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
			image{
				width: 80rpx;
				vertical-align: middle;
				margin-right: 20rpx;
			}
			.my-nav-box{
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
