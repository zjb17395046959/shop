<template>
	<!-- 首页页面布局开始 -->
	<view class="show">
		<!-- 轮播图布局 -->
		<view class="show-swiper">
			<uni-swiper-dot :info="show_swiper" :current="current" mode="round"
			:dotsStyles='dot_style'>
				<swiper  :autoplay="true" :interval="3000" :duration="1000" @change="change" class="banner">
					<block v-for="(item,index) in show_swiper" :key="item.id">
						<swiper-item>
							<view class="swiper-item">
								<image :src="item" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</block>
					
				</swiper>
			</uni-swiper-dot>
			<!-- #ifdef MP-ALIPAY || MP-WEIXIN -->
			<view class="show-nav">
				<image src="../../static/img/search_white.png" mode="aspectFill" @click="go_search"></image>
				<view class="iconfont icon-yiliaohangyedeICON-" @click="go_to"></view>
			</view>
			<!-- #endif -->
		</view>
		<!-- 列表 -->
		<view class="show-list">
			<block v-for="(item,index) in show_list" :key="item.id">
				<view class="show-list-box" @click="go_shop">
					<image  class="img" v-if="item.isLeft==1" :src="item.img" mode="scaleToFill"></image>
				
					<view class="show-list-box-middle" :style="{paddingRight:item.isLeft==0?'20rpx':'',paddingLeft:item.isLeft==1?'20rpx':''}">
						<view class="show-list-box-middle-title">{{item.title}}</view>
						<view class="show-list-box-middle-introduction">{{item.introduction}}</view>
					</view>
					<image class="img" v-if="item.isLeft==0" :src="item.img" mode="scaleToFill"></image>
					
				</view>
			</block>
		</view>
		
		<!-- 上啦加载布局 -->
		<page-sl :sl="sl" paddingBottom="1"></page-sl>
		<!-- 首页页面布局结束 -->
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default{
		data(){
			return{
				sl:'上拉加载',
				dot_style:{//轮播图指示点的样式
					backgroundColor:'white',
					selectedBackgroundColor:'red'
				},
				current:0,//当前轮播图的指示点的默认下标是0
				
			}
		},
		async onLoad() {
			//获取当前页面的数据列表
			var list = await this.$http('list',{k:'show_list'});
			console.log(list);
			this.$store.commit('show_list',list.result.data[0].data);
		},
		// #ifdef APP-PLUS ||H5
		// 监听原声导航栏上面的按钮事件
		onNavigationBarButtonTap(e) {
			switch (e.index){
				case 0:
					uni.navigateTo({
						url:'/pages/search/search'
					})
					break;
				default:
					uni.showToast({
						title:'啥也不是',
						icon:'none'
					})
					break;
			}
		},
		// #endif
		// 监听页面上拉加载事件
		onReachBottom() {
			console.log(111)
			if(this.sl!='上拉加载') return;
			this.sl='正在加载数据中。。。';
			setTimeout(()=>{
				this.sl='我是有底线的~';
			},3000)
		},
		methods:{
			change(e){//当轮播图每次滚动的时候，传递下标并赋值给指示点的current
				this.current=e.detail.current;
			},
			// 点击列表数据，进入详情页
			go_shop(){
				console.log('111')
			},
			// #ifdef MP-ALIPAY || MP-WEIXIN
			go_search(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			go_to(){
				uni.showToast({
					title:'啥也不是',
					icon:'none'
				})
			}
			// #endif
		},
		computed:{
			...mapState(['show_list','show_swiper'])
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	/* #ifdef MP-ALIPAY || MP-WEIXIN */
	.show-nav{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		left: 0;
		top: 30rpx;
		&>image{
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			padding: 10rpx;
			background-color:rgba(0,0,0,.4);
			// color: #fff;
			margin-left: 20rpx;
		}
		&>view{
			font-size: 40rpx;
			border-radius: 50%;
			padding: 10rpx;
			background-color:rgba(0,0,0,.4);
			color: #fff;
			margin-right: 20rpx;
		}
	}
	/* #endif */
	.show{
		width: 100%;
		height: 100%;
		// 轮播图布局
		.show-swiper{
			width: 100%;
			height: 400rpx;
			/* #ifdef MP-ALIPAY || MP-WEIXIN */
			position: relative;
			/* #endif */
			.banner{
				width: 100%;
				height: 400rpx !important;
			}
			.swiper-item{
				width: 100%;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
				}
			}
			
		}
		// 数据列表布局
		.show-list{
			padding:20rpx 20rpx;
			 // padding-bottom: ;
			.show-list-box{
				width: 100%;
				height: 100%;
				border-bottom: 1rpx solid #ccc;
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				padding-bottom: 20rpx;
				.img{
					width:200rpx;
					height: 200rpx;
				}
				.show-list-box-middle{
					width: 500rpx;
					// height: 200rpx;
					// border: 1px solid #000;
					.show-list-box-middle-title{
						font-size: 30rpx;
						color: #555;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 100%;
					}
					.show-list-box-middle-introduction{
						font-size: 24rpx;
						color: #989898;
						word-break: break-all;
						-webkit-line-clamp: 3;
						overflow: hidden;
						// text-overflow: ellipsis;
						// white-space: nowrap;
						display: -webkit-box;
						-webkit-box-orient:vertical;
						line-height: 54rpx;
						// height:80rpx;
					}
				}
				
			}
		}
	}
	.active{
		background-color: #eee;
	}
</style>
