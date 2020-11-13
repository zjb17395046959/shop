<template>
	<!-- 商品详情页开始布局 -->
	<view class="go_shop">
		<view class="go_shop_auto" :style="{opacity:isOpactive,zIndex:zIndex}" id="nav">
			<!-- #ifdef APP-PLUS || H5 -->
			<image class="img_left" src="../../static/img/left.png" mode="aspectFill" @click="go_shop_back"></image>
			<!-- #endif -->
			<view class="go_shop_center">
				<view :class="count == 1? 'active':''">商品</view>
				<view :class="count == 2? 'active':''">评价</view>
				<view :class="count == 3? 'active':''">详情</view>
			</view>
			<!-- #ifdef APP-PLUS || H5 -->
			<image class="img_right img_left" src="../../static/img/share.png" mode="aspectFill"
			@click="go_shop_share"></image>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY || MP-WEIXIN -->
			<button type="default" class="btn" open-type="share">
				<image class="img_right img_left" src="../../static/img/share.png" mode="aspectFill"></image>
			</button>
			<!-- #endif -->
		</view>
		<!-- 获取传递过来的数据进行布局 -->
		<view class="go_shop_nav" >
			<view class="go_shop_nav1">
				<swiper :autoplay="true" :interval="3000" :duration="1000" 
				class="go_shop_swiper" :circular="true" @change="clicr" id="page">
					<swiper-item>
						<view class="swiper-item">
							<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-wm60vejtdast68da9b/9f0310d0-1ffc-11eb-8ff1-d5dcf8779628.jpg" mode="aspectFill"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-wm60vejtdast68da9b/bcd0eb00-1ffc-11eb-b997-9918a5dda011.jpg" mode="aspectFill"></image>
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
			<view class="go_shop_top" id="a">
				<view class="go_shop_price">${{go_shop_list.price}}</view>
				<view class="go_shop_title">{{go_shop_list.title}}</view>
				<view class="go_shop_sm">{{go_shop_list.title}}</view>
			</view>
		</view>
		
		<!-- 规格、包装、 收货地址布局-->
		<!-- <view class="go_shop_middle">
		</view> -->
		<!-- 支付宝的获取元素有点问题，头大，还需要进行分包，小程序的超过了单个的包2M -->
		<view class="" id="c" style="height: auto;">
			<page-for-buju :index_list="index_list"  id="b"></page-for-buju>
		</view>

		
		
		
		<!-- 。商品详情页布局结束 -->
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				go_shop_list:{},
				num:1,//对应轮播图的指示点
				isOpactive:0,
				zIndex:0,
				count:1,//导航的样式控制
				page_nav:'',
				page_list:'',
				page_one:''
				
			}
		},
		//微信分享
		onShareAppMessage(res) {
			if(res.from == 'button'){
				console.log(res.target)
			}
			return{
				title:"哈喽，小宝贝们",
				path:'/pages/go_shop/go_shop',
				imageUrl:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-wm60vejtdast68da9b/bcd0eb00-1ffc-11eb-b997-9918a5dda011.jpg',
				content:"欢迎小宝贝们回归我们的大家庭",
				desc:"在这里我就不过多的描述了，有缘再见吧，小宝贝们"
			}
		},
		// #ifdef MP-WEIXIN
		//分享到朋友圈
		onShareTimeline() {
			return {
				title:"我是小程序",
				imageUrl:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-wm60vejtdast68da9b/bcd0eb00-1ffc-11eb-b997-9918a5dda011.jpg"
			}
		},
		// #endif
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
		mounted(){
			// #ifdef MP-WEIXIN || H5 || APP-PLUS
			const query = uni.createSelectorQuery().in(this);
			//获取价钱的高度
			query.select('#a').boundingClientRect(data => {
				this.page_one = data.top;
			}).exec();
			//获取列表数据的高度
			query.select('#b').boundingClientRect(data => {
				this.page_list = data.top;
			}).exec();
			// #endif
			// #ifdef MP-ALIPAY
			// 支付宝的这个有点子问题
			 var query = my.createSelectorQuery();
			query.select('#a').boundingClientRect().exec(data=>{
				this.page_one = data[0].top;
				// console.log(data[0].top)
			});
			query.select('#c').boundingClientRect().exec(data=>{
				// this.page_one = data[0].top;
				// console.log(data[0].top)
			});
			
			// #endif
		},
		onPageScroll(e) {
			let that = this;
			// #ifdef MP-WEIXIN || H5 || APP-PLUS
			const query1= uni.createSelectorQuery().in(this);
			//获取标题导航的高度
			query1.select('#nav').boundingClientRect(data => {
				this.page_nav = data.height;
			}).exec();
			
			// #endif
			// #ifdef MP-ALIPAY
			const query1= my.createSelectorQuery();
			//获取标题导航的高度
			query1.select('#nav').boundingClientRect().exec(data => {
				this.page_nav = data[0].height;
				// console.log(data)
			});
			// #endif
			// console.log(this.page_one);
			// console.log(this.page_nav)
			// console.log(this.page_list)
			var page_scroll = this.page_one - this.page_nav;
			// console.log(page_scroll);
			var page_scroll_one = this.page_list - this.page_nav;
			 //判断这是滚动条向上滚动，并且当前滚动的距离《120的时候，才开始进行计算
			    if(that.scroll > e.scrollTop){  
					
					if(e.scrollTop < page_scroll){
						this.count = 1;//这是确定导航的样式条件
					}
					//如果不加这个&&条件的话，那么他跟上面的条件有冲突，所以会导致count一直是2
					if(e.scrollTop < page_scroll_one&&e.scrollTop >= page_scroll){
						this.count = 2;
					}
					
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
			        // console.log("向上滚动"); 
			    }else{  //反之，向下滚动
				
					
					if(e.scrollTop >= page_scroll){
						// console.log(11)
						this.count = 2;
					}
					if(e.scrollTop >= page_scroll_one){
						this.count = 3;
					}
					
				
					this.isOpactive+=0.01	
					this.zIndex +=1;
			        // console.log("向下滚动");
					//当滚动的距离超过120的时候，将计算的值都固定，否则会一直进行计算，有误差
					if(e.scrollTop >= 180){
						this.isOpactive =1;
						this.zIndex = 180;
					}
			    }  
				//将当前的滚动的值赋值给一个变量，通过这个变量进行判断当前滚动的距离是向上还是向下的
			    that.scroll = e.scrollTop; 
				 // console.log(that.scroll)
		},
		methods: {
			//轮播图每次切换对应的下标赋值
			clicr(e){
				// console.log(e.detail.current)
				this.num = Number(e.detail.current)+1;
			},
			
			//点击返回上一页
			go_shop_back(){
				uni.navigateBack({
					delta:1
				})
			},
			// #ifdef APP-PLUS || H5
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
		},
		computed:{
			...mapState(['index_list'])
		}
	}
</script>

<style lang="scss" scoped>
	.active{
		color: orange;
		border-bottom: 6rpx solid orange ;
	}
	/* #ifdef MP-ALIPAY || MP-WEIXIN */
	.btn{
		line-height: 0;
		padding: 0;
		/* #ifdef MP-ALIPAY */
		height: auto;
		border: none;
		background-color: #FFFFFF;
		/* #endif */
	}
	button::after{
		border: none;
	}
	.button-hover{
		background: #fff;
	}
	/* #endif */
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
