	
	//权限验证跳转
	function navigate(options,type='navigateTo'){
		//用户token
		let token =uni.getStorageSync('token')||'';
		console.log(token);
		//用户信息
		let userInfo = false;
		console.log(token);
		// #ifdef APP-PLUS || H5
		if(token ==''|| token == undefined || token == null){
			return uni.navigateTo({
				url:'/pages/login/login'
			});
		}
		// #endif
		// #ifdef MP-WEIXIN || MP-ALIPAY
		if(token ==''|| token == undefined || token == null){
			uni.showToast({
				title:'请先登录，授权',
				icon:'none'
			});
			return false;
		}
		// #endif
		switch (type){
			case 'navigateTo':
			// console.log('111')
				uni.navigateTo(options);
				break;
			case 'redirectTo':
				uni.redirectTo(options);
				break;
			case 'reLaunch':
				uni.reLaunch(options);
				break;
			case 'switchTab':
				uni.switchTab(options);
				break;
			default:
				break;
		}
	}
export default{
	// token,
	// userInfo,
	navigate
}