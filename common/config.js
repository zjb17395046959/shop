	//用户token
	let token = uni.getStorageSync('token')|| '';
	//用户信息
	let userInfo = false;
	//权限验证跳转
	function navigate(options,type='navigateTo'){
		console.log(this.token);
		if(this.token==''){
			return uni.navigateTo({
				url:'/pages/login/login'
			});
		}
		switch (type){
			case 'navigateTo':
			console.log('111')
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
	token,
	userInfo,
	navigate
}