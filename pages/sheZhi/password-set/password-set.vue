<template>
	<!-- 登录密码页面设置开始布局 -->
	<view class="password-set">
		<!-- 手机格式处理在common下的fromat.js -->
		<view class="password-set-title">当前绑定手机：{{$fromat.ipone}}</view>
		<view class="password-set-box">
			<input type="text" password placeholder="请输入3位以上的新密码" v-model="password"/>
			<!-- <input type="text" placeholder="请输入3位以上的新密码" v-model="password"/> -->
			<view class="iconfont icon-yanjing"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password:'',//用户输入的密码
				
			}
		},
		onLoad() {
			console.log(this.md5('17395046959'))
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
