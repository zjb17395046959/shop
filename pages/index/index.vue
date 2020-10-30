<template>
	<!-- 商城页面的布局开始 -->
	<view class="index">
		<view class="status_bar">
		          <!-- 这里是状态栏,就是手机头部显示的电量，手机卡信息 -->
		</view>
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
				  circular="true" indicator-active-color='red' indicator-color='white'>
					<block v-for="(item,index) in swiper" :key="index">
						<swiper-item>
							<view class="swiper-item">
								<image class="img" :src="item" mode="widthFix"></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<!-- 广告位布局 -->
			<view class="index-banner">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qiushi/d846b0b0-6bdc-11ea-8a36-ebb87efcf8c0.jpg" mode="scaleToFill"></image>
			</view>
			<!-- 商品列表布局 -->
			<view class="index-shop-list">
				<block v-for="(item,index) in shop_list" :key="item.id">
					<view class="list-wrap">
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
	export default {
		data() {
			return {
				sl:'上拉加载',
				swiper:['https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qiushi/060e4dd0-6f7c-11ea-b94e-47f67ecf8268.jpg',
						'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qiushi/060cee40-6f7c-11ea-b94e-47f67ecf8268.jpg',
						'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qiushi/060e4dd0-6f7c-11ea-b94e-47f67ecf8268.jpg',
						'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qiushi/060cee40-6f7c-11ea-b94e-47f67ecf8268.jpg'
					],
				shop_list:[
					{ id:1, img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=75e88b28-7a55-46c2-aeef-fecdaf1da4e6',title:'钓鱼台150铁观音、大红袍、红茶、白茶年货礼品茶叶礼盒装',price:150.00,oldPrice:'',hot:1,isYou:1},
					{ id:2, img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=f6e5db11-aef3-464d-91cc-ab6e95fff579',title:'钓鱼台380铁观音、大红袍、红茶、白茶年货礼品茶叶礼盒装',price:388.00,oldPrice:'',hot:1,isYou:1},
					{ id:3, img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=75eaa294-2be0-407b-901b-5176d7df2084',title:'钓鱼台580铁观音、大红袍、红茶、白茶年货礼品茶叶礼盒装',price:588.00,oldPrice:'',hot:1,isYou:0},
					{ id:4, img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=b0fbdbd0-d3ec-48e4-805a-21c661b0b0aa',title:'满天星千足银手镯3折',price:156.00,oldPrice:520,hot:1,isYou:1},
					{ id:5, img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=0ad39e22-19ee-45b7-81a8-7c8f305a143f',title:'高山云雾雪芽.精品礼盒',price:198.00,oldPrice:498.00,hot:1,isYou:1},
					{ id:6, img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=1a4d8e5c-9a68-4dc6-9ad0-14e3464899ea',title:'绿·碧螺春·五品·023',price:139.00,oldPrice:148.00,hot:1,isYou:0},
					{ id:7, img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=5a3bb87b-5c90-4d40-8ebf-ea4f3e7b87eb',title:'金骏眉',price:489.60,oldPrice:'',hot:1,isYou:0},
					{ id:8, img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=9f5d2fb9-0dc7-4c20-9999-0c6dec82d595',title:'野生红茶',price:144.00,oldPrice:'',hot:1,isYou:1}
				]
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
		methods: {
			// 点击input框，跳转页面
			focus(){
				console.log('111');
			},
			sl_jz(){
				console.log(111)
				if(this.sl!='上拉加载') return;
				this.sl='正在加载数据中。。。';
				setTimeout(()=>{
					this.sl='我是有底线的~';
				},3000)
			}
			
			// // 监听页面上拉加载事件
			// onReachBottom() {
			// 
			// },
		}
	}
</script>

<style lang="scss">
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
		  background-color: #ccc;
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
				  // width: 100%;
				  height: 60rpx;
				  border-radius: 30rpx;
				  background-color: #eee;
				  padding-left: 20rpx;
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
			  height:300rpx;
			  .img{
				  width: 100%;
				  height: 100%;
			  }
		  }
		  // 广告位布局
		  .index-banner{
			  padding: 20rpx;
			  &>image{
				  width: 100%;
				  height: 200rpx;
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
					  border-radius: 6rpx;
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
						  font-size: 10rpx;
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
