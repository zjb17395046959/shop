<template>
	<view class="page-for">
		<block v-for="(item,index) in index_list" :key="index">
			<view class="swiper-item-all-list" v-if="show?index<4:'false'">
				<image class="img" :src="item.img" mode="aspectFill"></image>
				<view class="swiper-item-all-list-box">
					<view class="swiper-item-all-list-box-one">{{item.title}}</view>
					<view class="swiper-item-all-list-box-two">{{item.title}}</view>
					<view class="swiper-item-all-list-box-three">￥{{item.price}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:{
			index_list:Array,
			show:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped lang="scss">
	// .page-for{
	// 	width: 100%;
	// 	height: 100%;
	// }
	.swiper-item-all-list{
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		.img{
			width: 160rpx;
			height: 160rpx;
			border-radius: 10rpx;
		}
		.swiper-item-all-list-box{
			flex: 1;
			padding-left: 20rpx;
			.swiper-item-all-list-box-one{
				font-size: 32rpx;
				width: 500rpx;
				// border: 1px solid #000;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.swiper-item-all-list-box-two{
				color: #ccc;
				font-size: 28rpx;
				margin: 8rpx 0;
				word-break: break-all;
				-webkit-line-clamp: 2;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient:vertical;
				// line-height: 54rpx;
			}
			.swiper-item-all-list-box-three{
				font-size: 34rpx;
				color: red;
			}
			.swiper-item-all-list-box-four{
				color: #ccc;
				font-size: 28rpx;
				margin: 20rpx 0;
				word-break: break-all;
				-webkit-line-clamp: 3;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient:vertical;
			}
		}
	}
</style>
