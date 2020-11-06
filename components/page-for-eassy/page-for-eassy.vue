<template>
	<view class="page-for-eassy">
		<block v-for="(it,index) in show_list" :key="index" >
			<view class="item-all-list" v-if="show?index<4:'false'">
				<image class="img" :src="it.img" mode="aspectFill"></image>
				<view class="swiper-item-all-list-box">
					<view class="swiper-item-all-list-box-one">{{it.title}}</view> 
					<view class="swiper-item-all-list-box-four">{{it.introduction}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:{
			show_list:Array,
			show:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.page-for-eassy{
		
		.item-all-list{
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
				
				.swiper-item-all-list-box-four{
					color: #ccc;
					font-size: 28rpx;
					margin: 10rpx 0;
					word-break: break-all;
					-webkit-line-clamp: 3;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient:vertical;
				}
			}
		}
	}
	
</style>
