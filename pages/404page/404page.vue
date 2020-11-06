<template>
	<!-- 404配置页面 -->
	<view class="error-page">
		<image src="../../static/img/kus.png" mode="widthFix"></image>
		<view class="title">页面加载失败，请检查网络是否正常！</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	page{
		height: 100%;
	}
	.error-page{
		width: 100%;
		height: 100%;
		background-color: #eee;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: blue;
		&>image{
			width: 200rpx;
			margin-bottom: 30rpx;
		}
	}
</style>
