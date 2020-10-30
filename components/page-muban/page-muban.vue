<template>
	<!-- list列表模板 -->
	<view class="my-list">
			<view class="my-list-box" hover-class="my-list-active">
				<view class="icon iconfont" :class="['icon-'+icon]"></view>
				<view class="my-list-box-title">{{title}}</view>
				<view class="content" v-show="content">{{content}}</view>
				<image class="my-list-box-img" src="/static/img/right.png" mode="widthFix"></image>
			</view>
	</view>
</template>

<script>
	export default {
		props:{
			title: String,
			icon: String,
			content:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	// 页面列表布局
		.my-list-box{
			// margin-top: 20rpx;
			display: flex;
			align-items: center;
			padding: 20rpx 40rpx;
			background-color: #fff;
			border-bottom: 1rpx solid #eee;
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
			.content{
				color: #666;
				font-size: 24rpx;
			}
		}
	
</style>
