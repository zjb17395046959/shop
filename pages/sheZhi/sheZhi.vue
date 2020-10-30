<template>
	<!-- 系统设置页面开始布局 -->
	<view class="sheZhi">
		<!-- 上部分 -->
		<view class="sheZhi-flex">
			<page-muban title="关于我们" icon="qianbao" @click.native="about(1)"></page-muban>
			<view class="sheZhi-bind">
				<view class="sheZhi-bind-tit">账户绑定</view>
				<page-muban title="手机绑定" icon="qianbao" :content="$fromat.ipone" @click.native="about(2)"></page-muban>
			</view>
			<view class="sheZhi-bind">
				<view class="sheZhi-bind-tit">安全设置</view>
				<page-muban title="登录密码" icon="qianbao" content="点击修改" @click.native="about(3)"></page-muban>
				<page-muban title="支付密码" icon="qianbao" content="设置密码" @click.native="about(4)"></page-muban>
			</view>
		</view>
		<!-- 底部按钮 -->
		<button type="default" class="btn" size="default">退出登录</button>
		<!-- 系统页面布局结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods:{
			about(k){
				switch (k){
					case 1:
						uni.navigateTo({
							url:'/pages/sheZhi/about/about'
						})
						break;
					case 2:
						uni.navigateTo({
							url:'/pages/sheZhi/ipone-bind/ipone-bind'
						})
						break;
					case 3:
						uni.navigateTo({
							url:'/pages/sheZhi/password-set/password-set'
						})
						break;
					default:
						console.log(44)
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
	.sheZhi{
		width: 100%;
		height: 100%;
		background-color:#f4f5f6 ;
		box-sizing: border-box;
		padding-top: 8rpx;
		display: flex;
		flex-direction: column;
		.sheZhi-flex{
			flex: 1;
			overflow: auto;
		}
		.sheZhi-bind{
			background: #fff;
			margin-top: 8rpx;
			.sheZhi-bind-tit{
				padding: 20rpx 40rpx;
				border-bottom: 1rpx solid #eee;
			}
		}
		.btn{
			width: 100%;
			background-color:orange;
			color: #fff;
			font-size: 48rpx;
		}
		button::after{
			border: none;
		}
	}
</style>
