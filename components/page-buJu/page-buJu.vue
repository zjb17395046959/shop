<template>
	<view class="buJu">
		<view class="buJu-list">
			<slot name="list"></slot>
		</view>
		<view class="buJu-tabbar">
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
	.buJu{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.buJu-list{
			flex: 1;
			overflow: auto;
		}
		.buJu-tabbar{
			height: 100rpx;
			width: 100%;
		}
	}
</style>
