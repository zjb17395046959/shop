<template>
	<!-- 搜索页面布局开始 -->
	<view class="search">
		<!-- 顶部搜索框的布局 -->
		<!-- #ifdef H5 ||APP-PLUS-->
		<view class="status_bar">
		          <!-- 这里是状态栏,就是手机头部显示的电量，手机卡信息 -->
		</view>
		
		<view class="index-input-search">
			<view class="index-input-search-back" @click="go_back"> < 返回 </view>
			<input type="text" placeholder="只支持中文搜索" 
			placeholder-class="input-active" v-model="search" @input="search_change"/>
		</view>
		<!-- #endif -->
		
		<!-- #ifdef MP-ALIPAY || MP-WEIXIN -->
		<view class="index-input-search">
			<input type="text" placeholder="只支持中文搜索" 
			placeholder-class="input-active" v-model="search" @input="search_change"/>
		</view>
		<!-- #endif -->
		
		<!-- 导航列表布局 -->
		<view class="search-nav">
			<view :class="num==0?'active':''" @click="num=0">全部</view>
			<view :class="num==1?'active':''" @click="num=1">商品</view>
			<view :class="num==2?'active':''" @click="num=2">文章</view>
		</view>
		
		<!-- 数据列表的布局 -->
		<view class="search-list">
			
				<swiper :current="num" @change="search_swiper" class="search-swiper">
				
					<swiper-item>
						<!-- 全部 -->
						<view class="swiper-item-all">
							<scroll-view scroll-y="true" style="height: 100%;">
							<!-- //商品 -->
							<view class="swiper-item-all-title">
								<view class="swiper-item-all-title-one">商品</view>
								<view class="swiper-item-all-title-two" @click="num=1">
									更多
									<image src="../../static/img/right.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- 封装的商品的列表布局 -->
							<page-for-buju :index_list="arr" :show="true"></page-for-buju>
							<!-- //文章 -->
							<view class="swiper-item-all-title ">
								<view class="swiper-item-all-title-one">文章</view>
								<view class="swiper-item-all-title-two" @click="num=2">
									更多
									<image src="../../static/img/right.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- 封装的文章的列表布局 -->
							<page-for-eassy :show_list="arr_eassy" :show="true"></page-for-eassy>
							
							</scroll-view>
						</view>
					</swiper-item>
					<swiper-item>
						<!-- 商品 -->
						<view class="swiper-item-shop swiper-item-all">
							<scroll-view scroll-y="true" style="height: 100%;padding-top:20rpx;
							box-sizing: border-box;" @scrolltolower="sl_shop">
								<page-for-buju :index_list="arr"></page-for-buju>
								<!-- 上拉加载组件 -->
								<page-sl :sl="sl" v-show="arr.length>=6"></page-sl>
							</scroll-view>
						</view>
					</swiper-item>
					<swiper-item>
						<!-- 文章 -->
						<view class="swiper-item-essay swiper-item-all">
							<scroll-view scroll-y="true" style="height: 100%;padding-top:20rpx;
							box-sizing: border-box;" @scrolltolower="sl_eassy">
								<page-for-eassy :show_list="arr_eassy"></page-for-eassy>
								<!-- 上拉加载组件 -->
								<page-sl :sl="sl_two" v-show="arr_eassy.length>=6"></page-sl>
							</scroll-view>
						</view>
					</swiper-item>
				
				</swiper>
			
			
		</view>
		
		
		<!-- 搜索页面布局结束 -->
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				num:0,
				sl:'上拉加载',
				sl_two:'上拉加载',
				search:'',
				arr:[],
				arr_eassy:[]
			}
		},
		created() {
			this.arr = this.index_list,
			this.arr_eassy = this.show_list
		},
		methods: {
			// #ifdef APP-PLUS||H5
			go_back(){//点击返回上一页
				uni.navigateBack({
					delta:1
				})
			},
			// #endif
			search_change(e){
				//只匹配中文字段才会进行触发方法进行查找
				let reg = /^[\u4E00-\u9FA5]{1,}$/;
				if(reg.test(this.search)){
					//这个拼音查找中文字段有点问题，返回的是数组的下标
					// let aa = [];
					// this.index_list.forEach(item=>{
					// 	var a =this.PinYinMatch.match(item.title,this.search);
					// 	if(a){
					// 		aa=a;
							
					// 	}
					// })
					// aa.forEach(item=>{
					// 	console.log(item)
					// 	var s= this.index_list.filter((val,index,my)=>{
					// 		return my[0]
					// 	})
					// 	console.log(s)
					// })
					
					// console.log(this.arr)
					var res = this.index_list.filter(item=>{
						if(item.title.indexOf(this.search) != -1){
							return item;
						}
					})
					this.arr =res;
					// console.log(res);/
					var res1 = this.show_list.filter(item=>{
						if(item.title.indexOf(this.search) != -1){
							return item;
						}
					})
					this.arr_eassy =res1;
				}else{
					 this.arr = this.index_list;
					 this.arr_eassy = this.show_list;
				}
			},
			// 滑动数据列表，导航样式跟随
			search_swiper(e){
				this.num = e.detail.current;
			},
			//商品页面的上拉加载数据
			sl_shop(){
				if(this.sl != '上拉加载') return;
				this.sl = '正在加载中';
				setTimeout(()=>{
					this.sl = '没有更多数据了';
				},1000);
			},
			//文章页面的上拉加载数据
			sl_eassy(){
				if(this.sl_two != '上拉加载') return;
				this.sl_two = '正在加载中';
				setTimeout(()=>{
					this.sl_two = '没有更多数据了';
				},1000);
			}
		},
		computed:{
			...mapState(['index_list','show_list'])
		}
	}
</script>

<style scoped lang="scss">
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
		  // background-color: #ccc;
	  }
	page{
		height: 100%;
	}
	.search{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		/* #ifdef APP-PLUS || H5 */
		// 头部搜索框布局
		.index-input-search{
			display: flex;
			align-items: center;
		  padding: 20rpx 20rpx;
		  // border: 1rpx solid #000;
		  box-sizing: border-box;
		  input{
			  width: 82% !important;
			  height: 60rpx;
			  border-radius: 30rpx;
			  background-color: #eee;
			  padding-left: 20rpx;
			  box-sizing: border-box;
			  margin-left: 20rpx;
		  }
		  .input-active{
			  background: url(../../static/img/search.png) no-repeat left;
			  background-size: 40rpx 40rpx;
			  padding-left: 50rpx;
		  }
		}
		/* #endif */
		// 头部搜索框布局
		.index-input-search{
		  padding: 20rpx 40rpx;
		  // border: 1rpx solid #000;
		  box-sizing: border-box;
		  input{
			  width: 100%;
			  height: 60rpx;
			  border-radius: 30rpx;
			  background-color: #eee;
			  padding-left: 20rpx;
			  box-sizing: border-box;
		  }
		  .input-active{
			  background: url('../../static/img/search.png') no-repeat left;
			  background-size: 40rpx 40rpx;
			  padding-left: 50rpx;
		  }
		}
		// 导航列表布局
		.search-nav{
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			font-size: 28rpx;
			font-weight: bold;
			border-bottom: 1rpx solid #eee;
			.active{
				color: orange;
				border-bottom: 8rpx solid orange;
			}
		}
		// 数据列表布局
		.search-list{
			flex: 1;
			overflow: auto;
			.search-swiper{
				height: 100%;
				// 全部列表布局
				.swiper-item-all{
					height: 100%;
					width: 100%;
					overflow: auto;
					.swiper-item-all-title{
						padding: 0 20rpx;
						box-sizing: border-box;
						height: 80rpx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 20rpx;
						background-color: rgba(222,222,236,.4);
						.swiper-item-all-title-one{
							font-size: 30rpx;
							font-weight: bold;
						}
						.swiper-item-all-title-two{
							display: flex;
							color: #ccc;
							&>image{
								width: 40rpx;
								height: 40rpx;
							}
						}
					}
					// .swiper-item-all-list{
					// 	width: 100%;
					// 	display: flex;
					// 	align-items: center;
					// 	margin-bottom: 20rpx;
					// 	padding: 0 20rpx;
					// 	box-sizing: border-box;
					// 	&>image{
					// 		width: 160rpx;
					// 		height: 160rpx;
					// 	}
					// 	.swiper-item-all-list-box{
					// 		flex: 1;
					// 		padding-left: 20rpx;
					// 		.swiper-item-all-list-box-one{
					// 			font-size: 32rpx;
					// 			width: 500rpx;
					// 			// border: 1px solid #000;
					// 			overflow: hidden;
					// 			white-space: nowrap;
					// 			text-overflow: ellipsis;
					// 		}
					// 		.swiper-item-all-list-box-two{
					// 			color: #ccc;
					// 			font-size: 28rpx;
					// 			margin: 8rpx 0;
					// 			word-break: break-all;
					// 			-webkit-line-clamp: 2;
					// 			overflow: hidden;
					// 			display: -webkit-box;
					// 			-webkit-box-orient:vertical;
					// 			// line-height: 54rpx;
					// 		}
					// 		.swiper-item-all-list-box-three{
					// 			font-size: 34rpx;
					// 			color: red;
					// 		}
					// 		.swiper-item-all-list-box-four{
					// 			color: #ccc;
					// 			font-size: 28rpx;
					// 			margin: 20rpx 0;
					// 			word-break: break-all;
					// 			-webkit-line-clamp: 3;
					// 			overflow: hidden;
					// 			display: -webkit-box;
					// 			-webkit-box-orient:vertical;
					// 		}
					// 	}
					// }
				}
			}
		}
	}
</style>
