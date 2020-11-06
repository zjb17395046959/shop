<template>
	<!-- 订单页面布局开始 -->
	<view class="my-order">
		
		<!-- 头部导航布局 -->
		<view class="my-order-nav">
			<block v-for="(item,index) in list" :key = "index">
				<view :class="num==index?'active':''" @click="nav(index)">{{item}}</view>
			</block>
		</view>
		<!-- swiper布局 -->
		<view class="my-order-list">
			<swiper @change="qh" :current="num" class="my-order-swiper">
				<swiper-item>
					<view class="swiper-item">
						<view class="icon iconfont icon-daifukuan"></view>
						<view class="title">您还没有相关的订单</view>
						<view class="btn" @click="btn">去逛逛</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">2222</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">333</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">444</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">5555</view>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 订单页面布局结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:0,
				indexVal:'',
				list:['全部','待付款','待发货','待收货','待评价']
			}
		},
		onLoad(e) {
			this.num = e.index;
			
		},
		methods: {
			nav(k){//点击导航切换
				this.num = k;
				// console.log(k)
			},
			//滑动页面，切换导航
			qh(e){
				this.num=e.detail.current
			},
			btn(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
	.my-order{
		width: 100%;
		height: 100% !important;
		display: flex;
		flex-direction: column;
		.my-order-nav{
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			&>view{
				font-size: 30rpx;
				color: #ccc;
			}
			.active{
				color: #000;
				font-weight: bold;
				border-bottom: 4rpx solid orange;
			}
			
		}
		.my-order-list{
			flex: 1;
			overflow: auto;
			background-color: #f4f5f6;
			.my-order-swiper{
				width: 100%;
				height: 100%;
				.swiper-item{
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.icon{
						font-size: 100rpx;
					}
					.title{
						margin: 10rpx 0 20rpx;
						color: #ccc;
					}
					.btn{
						padding: 10rpx 20rpx ;
						border-radius: 40rpx;
						background-color: orange;
						color: #fff;
					}
				}
			}
		}
	}
	
</style>
