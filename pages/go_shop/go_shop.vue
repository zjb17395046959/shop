<template>
	<!-- 商品详情页开始布局 -->
	<view class="go_shop">
		<view class="go_shop_auto" :style="{opacity:isOpactive,zIndex:zIndex}">
			<image class="img_left" src="../../static/img/left.png" mode="aspectFill"></image>
			<view class="go_shop_center">
				<view class="">商品</view>
				<view class="">评价</view>
				<view class="">详情</view>
			</view>
			<image class="img_right img_left" src="../../static/img/share.png" mode="aspectFill"></image>
		</view>
		<!-- 获取传递过来的数据进行布局 -->
		<view class="go_shop_nav" ref="page">
			<view class="go_shop_nav1">
				<swiper :autoplay="true" :interval="3000" :duration="1000" 
				class="go_shop_swiper" :circular="true" @change="clicr">
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/img/1.jpg" mode="aspectFill"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/img/11.jpg" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
				
				<!-- #ifdef APP-PLUS || H5 -->
				<!-- 左右菜单样式布局 -->
				<view class="go_shop_menu">
					<image src="../../static/img/left_white.png" mode="aspectFill" @click="go_shop_back"></image>
					<image src="../../static/img/share_white.png" mode="aspectFill" @click="go_shop_share"></image>
				</view>
				<!-- #endif -->
				<!-- 自己做的指示点 -->
				<view class="go_shop_inster">{{num}}/2</view>
			</view>
			<view class="go_shop_top">
				<view class="go_shop_price">${{go_shop_list.price}}</view>
				<view class="go_shop_title">{{go_shop_list.title}}</view>
				<view class="go_shop_sm">{{go_shop_list.title}}</view>
			</view>
		</view>
		<!-- 规格、包装、 收货地址布局-->
		<!-- <view class="go_shop_middle">
		</view> -->
		<page-for-buju :index_list="$store.state.index_list"></page-for-buju>
		
		
		<!-- 。商品详情页布局结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				go_shop_list:{},
				num:1,
				isOpactive:0,
				zIndex:0
			}
		},
		onLoad(e) {
			// #ifdef H5
			//首页点击商品列表，传递当前的商品数据
			var list  = decodeURI(e.list);
			this.go_shop_list = JSON.parse(list);
			// #endif
			// #ifndef H5
			this.go_shop_list = JSON.parse(e.list);
			// #endif
		},
		onPageScroll(e) {
			 let that = this;  
			 //判断这是滚动条向上滚动，并且当前滚动的距离《120的时候，才开始进行计算
			    if(that.scroll > e.scrollTop){  
					if(e.scrollTop < 180){
						this.isOpactive-=0.01;
						this.zIndex -=1;
					}
					//当向上滚动的距离小于等于0 的时候，变为初始值
					if(e.scrollTop<=0){
						console.log('1111')
						this.isOpactive= 0;
						this.zIndex =0;
					}
			        console.log("向上滚动"); 
			    }else{  //反之，向下滚动
					this.isOpactive+=0.01	
					this.zIndex +=1;
			        console.log("向下滚动");
					//当滚动的距离超过120的时候，将计算的值都固定，否则会一直进行计算，有误差
					if(e.scrollTop >= 180){
						this.isOpactive =1;
						this.zIndex = 180;
					}
			    }  
				//将当前的滚动的值赋值给一个变量，通过这个变量进行判断当前滚动的距离是向上还是向下的
			    that.scroll = e.scrollTop; 
				 console.log(that.scroll)
		},
		methods: {
			//轮播图每次切换对应的下标赋值
			clicr(e){
				// console.log(e.detail.current)
				this.num = Number(e.detail.current)+1;
			},
			// #ifdef APP-PLUS || H5
			//点击返回上一页
			go_shop_back(){
				uni.navigateBack({
					delta:1
				})
			},
			//点击分享
			go_shop_share(){
				// #ifdef APP-PLUS
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: "http://uniapp.dcloud.io/",
				    title: "uni-app分享",
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
				// #endif
				uni.showModal({
					title:'分享不了，就问你气不气',
					success(res) {
						if(res.confirm){
							uni.showToast({
								title:'好气哟！',
								icon:'none'
							})
						}else if(res.cancel){
							uni.showToast({
								title:'小垃圾，还不服气！',
								icon:'none'
							})
						}
					}
				})
			}
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	
	.status_bar {
	      height: 40rpx;
	      width: 100%;
		  
	  }
	  page{
		  height: 100%;
	  }
	  
	  // 导航头部布局
	  .go_shop_auto{
		  top: 0;
		  left: 0;
		  width: 100%;
		  padding: 20rpx 20rpx;
		  display: flex;
		  align-items: center;
		  box-sizing: border-box;
		  background-color:white;
		  opacity:0;
		  position:fixed;
		  .img_left{
			  width:60rpx;
			  height: 60rpx;
		  }
		  .go_shop_center{
			  flex: 1;
			  display: flex;
			  justify-content: space-around;
			  padding: 0 80rpx;
		  }
	  }
	  
	  // 整体布局
	  .go_shop{
		  width: 100%;
		  height: 100%;
		  background-color: #f4f5f6;
		  .go_shop_nav{
			  width: 100%;
			  // height: 100%;
			  background-color: #FFFFFF;
			  .go_shop_nav1{
				  position: relative;
			  }
			  .go_shop_swiper{
				  width: 100%;
				  height: 500rpx;
				  .swiper-item{
					  width: 100%;
					  height: 100%;
					  &>image{
						  width: 100%;
						  height: 100%;
					  }
				  }
			  }
			  // 指示点布局
			  .go_shop_inster{
				  position: absolute;
				  padding: 10rpx 30rpx;
				  bottom: 20rpx;
				  right: 30rpx;
				  background-color: rgba(0,0,0,.4);
				  color: #fff;
				  border-radius: 40rpx;
			  }
			  /* #ifdef APP-PLUS || H5 */
			  // 图片上的左右菜单布局
			  .go_shop_menu{
				  position: absolute;
				  width: 100%;
				  padding: 0 20rpx;
				  box-sizing: border-box;
				  display: flex;
				  justify-content: space-between;
				  align-items: center;
				  top: 40rpx;
				  left: 0;
				  &>image{
					  width: 40rpx;
					  height: 40rpx;
					  padding: 20rpx;
					  border-radius: 50%;
					  background-color: rgba(0,0,0,.4);
				  }
			  }
			  /* #endif */
			  .go_shop_top{
				  padding: 10rpx 20rpx;
				  .go_shop_price{
					  font-size:40rpx ;
					  color:rgb(227, 14, 58) ;
				  }
				  .go_shop_title{
					  font-size: 32rpx;
					  font-weight: bold;
					  margin: 10rpx 0;
				  }
				  .go_shop_sm{
					  font-size: 26rpx;
					  color: #777;
					  line-height: 40rpx;
					  word-break: break-all;
					  -webkit-line-clamp: 3;
					  overflow: hidden;
					  // text-overflow: ellipsis;
					  // white-space: nowrap;
					  display: -webkit-box;
					  -webkit-box-orient:vertical;
				  }
			  }
		  }
	  }
</style>
