	//手机号的格式化处理
	let ipone = uni.getStorageSync('ipone');
	if(ipone){
		var reg = /^(\d{3})\d{4}(\d{4})$/;
		ipone = ipone.replace(reg, "$1****$2");
	}
	export default {
		ipone
	}