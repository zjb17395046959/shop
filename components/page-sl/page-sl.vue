<template>
	<view>
		<!-- 上啦加载布局 -->
		<view class="sl" :class="paddingBottom==1?'ac':''">————{{sl}}————</view>
	</view>
</template>

<script>
	export default {
		props:{
			sl:String,
			/**
			 * uniapp新增了两个css属性，
			 * 我们中间的内容高度要减去-头部导航-底部tabbar高度
			 * 否则，底部的tabbar会将我们的中间内容遮盖
			 * */
			paddingBottom:{
				type:String,
				default:'0'//默认是不减去底部的padding-bottom值
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.sl{
		// margin-bottom: 100rpx;
		height: 80rpx;
		// line-height: 80rpx;
		text-align: center;
		color: #ccc;
	}
	.ac{
		padding-bottom: var(--window-bottom);
	}
</style>
