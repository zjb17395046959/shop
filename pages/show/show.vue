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
								<image :src="item.img" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</block>
					
				</swiper>
			</uni-swiper-dot>
		</view>
		<!-- 列表 -->
		<view class="show-list">
			<block v-for="(item,index) in show_list" :key="item.id">
				<view class="show-list-box" hover-class="active">
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
	export default{
		data(){
			return{
				sl:'上拉加载',
				show_list:[
					{id:1,img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=50976af3-9fe3-4914-a970-ac12452e4fd7',title:'银手镯为什么会变黑?',introduction:'银饰放置在空气中，与氧发生化学反应，氧化就会慢慢的失去光泽，慢慢变黑。 此外，在你所居住的环境中有类似于化工厂这样的废气排放点的话，废气中的硫化物与银也会发生化学反应。',isLeft:0},
					{id:2,img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=7fe722e8-4cdd-4d5b-b18b-d7270f1c0696',title:'银饰品中，990，925有什么区别？',introduction:'纯银硬度竟然比不上普通玻璃硬度？？？纯银硬度为2.7，玻璃硬度为6.7。纯银还没有玻璃硬，原来市场上的银饰中还有这些成分...',isLeft:1},
					{id:3,img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=dfb5e5a3-a95a-480a-8d0b-efd42b8fbe2d',title:'银饰养护诀窍，超有效，有银饰的顾客快快点击！！！',introduction:'网上流传有很多的银饰养护方法，比如用牙膏清洗，泡醋，用洗洁精清洗，洗银水等等，大多效果不明显，而且见效慢。这里告诉大家一个有效方法。',isLeft:0},
					{id:4,img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=19d189a8-ba0e-44d6-83de-edb77481ae0b',title:'银饰鉴别指南',introduction:'网上常见的银饰真假鉴别方法也只能做出初步的判断，例如看价格，看颜色，看软度、弹性。但是最靠谱的还是...',isLeft:1},
					{id:5,img:'http://tea.skycto.com/eshop/FileAction!downloadFile.action?fileKey=ca544cb2-7ccf-4b4e-8b68-8fa947cbc54d',title:'他们说今年不过情人节了...?',introduction:'那么懂茶，怎么会不懂爱？我姓邓也懂些生活，所以大家都习惯叫我老邓，来我这的都是朋友，都爱和我聊聊天。嘿嘿，可能是爱被我“怼”吧...',isLeft:0},
					
				],
				dot_style:{//轮播图指示点的样式
					backgroundColor:'white',
					selectedBackgroundColor:'red'
				},
				current:0,//当前轮播图的指示点的默认下标是0
				show_swiper:[
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
		// #ifdef APP-PLUS ||H5
		// 监听原声导航栏上面的按钮事件
		onNavigationBarButtonTap(e) {
			switch (e.index){
				case 0:
					console.log('搜索按钮');
					break;
				default:
					console.log('消息按钮');
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
			list(){
				console.log('111')
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.show{
		width: 100%;
		height: 100%;
		// 轮播图布局
		.show-swiper{
			width: 100%;
			height: 400rpx;
			.banner{
				width: 100%;
				height: 400rpx;
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
