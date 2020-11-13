<template>
	<!-- 关于我们的页面布局开始 -->
	<view class="about">
		<!-- 列表布局 -->
		<block v-for="(item,index) in list" :key="item.id">
			<view class="about-list" @click="about(index)">
				<view class="about-list-title">{{item.title}}</view>
				<view class="about-list-content" v-show="item.isImg==0">{{item.content}}</view>
				<image class="about-list-img" v-show="item.isImg==1" src="/static/img/right.png" mode="aspectFill"></image>
			</view>
		</block>
		<!-- 关于我们的页面布局结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{id:1,title:'联系电话',content:'17395046959',isImg:0},
					{id:2,title:'联系QQ',content:'1916079151',isImg:0},
					{id:3,title:'官方网址',content:'http://www.fenxin.com',isImg:0},
					{id:4,title:'微信公众号',content:'前端鸭',isImg:0},
					{id:5,title:'用户协议',content:'',isImg:1},
					{id:6,title:'隐私政策',content:'',isImg:1}
				]
			};
		},
		methods:{
			about(k){
				switch (k){
					case 4:
						uni.showModal({
							title:'用户协议',
							content:'使用当前的app，你需要遵守一些规定，你是否愿意遵守？',
							cancelText:'不愿意',
							confirmText:'我愿意',
							success(res) {
								if(res.confirm){
									uni.showToast({
										title:'你真行！',
										icon:"none"
									})
								}else{
									uni.showToast({
										title:'小垃圾',
										icon:'none'
									})
								}
							}
						})
						break;
					case 5:
						uni.showModal({
							title:'隐私政策',
							content:'我们会对你的个人信息进行严格的保密，是否同意',
							cancelText:'不同意',
							confirmText:'我同意',
							success(res) {
								if(res.confirm){
									uni.showToast({
										title:'你真棒！',
										icon:"none"
									})
								}else{
									uni.showToast({
										title:'小垃圾',
										icon:'none'
									})
								}
							}
						})
						break;
						default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
	.about{
		width: 100%;
		height: 100%;
		background-color: #f4f5f6;
		box-sizing: border-box;
		padding-top: 12rpx;
		// 列表布局
		.about-list{
			background-color: #fff;
			width: 100%;
			padding: 20rpx 20rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #eee;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: space-between;
			font-size: 30rpx;
			color: #666;
			// .about-list-title{
			// 	font-size: 30rpx;
			// 	color: #666;
			// }
			.about-list-content{
				font-weight: blod;
			}
			.about-list-img{
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
</style>
