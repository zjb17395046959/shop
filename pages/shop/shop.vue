<template>
	<!-- 购物车页面布局开始 -->
	<view class="shop">
		<view class="icon iconfont icon-gouwuche-01"></view>
		<view class="title">购物车是空的</view>
		<button type="default" size="mini">去逛逛</button>
		<!-- 购物车页面布局结束 -->
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.shop{
		width: 100%;
		height: 100% !important;
		background-color: #eee;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		.icon{
			font-size: 160rpx;
			color: #ccc;
		}
		.title{
			font-size: 32rpx;
			color: #666;
			margin: 20rpx 0;
		}
		button{
			border: none;
			color: #fff;
			background-color:orange;
			border-radius: 20rpx;
			width: 200rpx;
			margin: 0 auto;
		}
		
	}
</style>
