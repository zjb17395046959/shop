<template>
	<!-- 商城页面的布局开始 -->
	<view class="index">
		<!-- #ifdef H5 ||APP-PLUS-->
		<view class="status_bar">
		          <!-- 这里是状态栏,就是手机头部显示的电量，手机卡信息 -->
		</view>
		<!-- #endif -->
		<!-- 头部搜素框布局 -->
		<view class="index-input-search">
			<input type="text" placeholder="碧螺春" 
			placeholder-class="input-active" @focus="focus"/>
		</view>
		
		<view class="list-box">
			<scroll-view scroll-y="true" @scrolltolower="sl_jz" style="height: 100%;">
			<!-- 轮播图布局 -->
			<view class="index-swiper">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
				  circular="true" indicator-active-color='red' indicator-color='white' style="height: 100%;">
					<block v-for="(item,index) in index_swiper" :key="index">
						<swiper-item>
							<view class="swiper-item">
								<image class="img" :src="item" mode="widthFix"></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<!-- 广告位布局 -->
			<!-- <view class="index-banner">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qiushi/d846b0b0-6bdc-11ea-8a36-ebb87efcf8c0.jpg" mode="scaleToFill"></image>
			</view> -->
			<!-- 商品列表布局 -->
			<view class="index-shop-list">
				<block v-for="(item,index) in index_list" :key="item.id">
					<view class="list-wrap" @click="go_shop(item)">
						<image :src="item.img" mode="scaleToFill"></image>
						<view class="list-wrap-title">{{item.title}}</view>
						<view class="list-wrap-price">
							<text>￥{{item.price}}</text>
							<text v-if="item.oldPrice">￥{{item.oldPrice}}</text>
						</view>
						<view class="list-wrap-label">
							<text v-if="item.hot==1">热销</text>
							<text v-if="item.isYou==1">包邮</text>
						</view>
					</view>
				</block>
			</view>
			<page-sl :sl="sl"></page-sl>
			</scroll-view>
		</view>
		
		<!-- 商城页面的布局结束 -->
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				sl:'上拉加载',
			}
		},
		// 监听下拉加载数据
		onPullDownRefresh(){
			console.log(111)
			setTimeout(()=>{
				this.shop_list=[];
				 uni.stopPullDownRefresh();
			},1000)
		},
		async onLoad() {
			let that =this;
			//获取云函数中的轮播图数据，并传递到仓库中进行存储，在实时的返回给页面
			var res =await this.$http('index_swiper');
			this.$store.commit('init',{
				index:res.result.data[0].index_swiper,
				show:res.result.data[0].show_swiper
			})
			
			//获取当前页面的数据列表
			var list = await this.$http('list',{k:'list'});
			console.log(list);
			this.$store.commit('index_list',list.result.data[0].index_list.data);
		},
		methods: {
			
			// 点击input框，跳转页面
			focus(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			//上拉加载事件
			sl_jz(){
				if(this.sl!='上拉加载') return;
				this.sl='正在加载数据中。。。';
				setTimeout(()=>{
					this.sl='我是有底线的~';
				},3000)
			},
			//点击商品列表进入详情页
			go_shop(val){
				// #ifdef H5
				uni.navigateTo({
					url:'/indexPage/pages/go_shop/go_shop?list='+encodeURI(encodeURI(JSON.stringify(val)))
				})
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url:'/indexPage/pages/go_shop/go_shop?list='+JSON.stringify(val)
				})
				// #endif
			}
		},
		computed:{
			...mapState(['index_swiper','index_list'])
		}
	}
</script>

<style lang="scss">
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
		  // background-color: #ccc;
	  }
	  page{
		  height: 100%;
	  }
	  .index{
		  width: 100%;
		  height: 100%;
		  display: flex;
		  flex-direction: column;
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
				  background: url(../../static/img/search.png) no-repeat left;
				  background-size: 40rpx 40rpx;
				  padding-left: 50rpx;
			  }
		  }
		  .list-box{
			  flex: 1;
			  overflow: auto;
		  }
		  // 轮播图布局
		  .index-swiper{
			  width: 100%;
			  height:340rpx;
			  margin-bottom: 20rpx;
			  &>swiper{
				  height: 100% !important;
			  }
			  .img{
				  width: 100%;
				  height: 100%;
			  }
		  }
		  // 广告位布局
		  .index-banner{
			  height: 300rpx;
			  width: 100%;
			  margin: 20rpx 0;
			  &>image{
				  width: 100%;
				  height: 300rpx;
			  }
		  }
		  // 商品列表布局
		  .index-shop-list{
			  display: flex;
			  flex-wrap: wrap;
			  justify-content: space-between;
			  align-items: center;
			  // width: 100%;
			  padding: 0 20rpx;
			  .list-wrap{
				  width: 48%;
				  margin-bottom: 40rpx;
				  &>image{
					  width: 100%;
					  height: 250rpx;
					  border-radius: 20rpx;
				  }
				  .list-wrap-title{
					  width: 100%;
					  overflow: hidden;
					  white-space: nowrap;
					  text-overflow: ellipsis;
					  font-size: 30rpx;
					  margin-top: 20rpx;
					  padding-left: 10rpx;
				  }
				  .list-wrap-price{
					  padding-left: 8rpx;
					  color: #f37785;
					  font-weight: bold;
					  font-size: 28rpx;
					  &>text:nth-child(2){
						  font-size: 20rpx;
						  color: #888;
						  text-decoration: line-through;
						  margin-left: 10rpx;
					  }
				  }
				  .list-wrap-label{
					  padding-left: 10rpx;
					  &>text{
						  padding: 4rpx 8rpx;
						  color: orange;
						  border-radius: 10rpx;
						  font-size: 20rpx;
						  background-color: #fdf3e7;
						  margin-right: 10rpx;
					  }
					  &>text:nth-child(2){
						  color: #ff0016;
						  background-color: #ffe9eb;
					  }
				  }
			  }
		  }
	  }
</style>
