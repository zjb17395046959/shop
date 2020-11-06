<script>
export default {
	onLaunch: function() {
		this.$lib.NetWork.On();
		this.$lib.Update();
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	onResize() {//监听窗口的变化，刷新页面，自适应布局
		this.onShow();
	},
	//当uniapp报错是触发生命周期，404页面的配置
	onError() {
		uni.navigateTo({
			url:'/pages/404page/404page'
		})
	}
};
</script>

<style>

/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */

/* 整体全部页面的page高度为100%，不写的话，在小程序中是检测不到page的高度的，默认为内容撑开的高度 */
page{
	height: 100%;
}
	
</style>
