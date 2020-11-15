	//从云函数中获取到code的数据
	export default{
		set_code(ipone){
			var that = this;
			uniCloud.callFunction({
				name:'set-sheZhi',
				data:{
					action:'set-code',
					mobile:ipone
				},
				success: (res) => {
					//验证码设置成功，需要在云函数中进行查看
					if(res.result.code === 0){
						console.log(res);
						that.get_code1(ipone)
					}else{
						uni.showModal({
						    content: res.result.message,
						    showCancel: false
						})
					}
				},
				fail: (msg) => {
					console.error(msg);
					
				}
			})
		},
		get_code(ipone){
			uniCloud.callFunction({
				name:'set-sheZhi',
				data:{
					action:'get-code',
					mobile:ipone
				},
				success: (ret) => {
					console.log(ret);
					
					//返回多条数据的话就取最后一个最新的code
					if(ret.result.data.length >=1){
						console.log('我是初次获取code')
						this.remote_code(ipone);
						this.set_code(ipone);
					}else{//一个的话，就直接获取当前的code值
					this.set_code(ipone);
					// console.log(ret.result.data)
					// 	uni.showModal({
					// 		content: ret.result.data.code,
					// 		showCancel: false
					// 	})
					}
				},
				fail: (mes) => {
					console.error(mes)
				}
			})
		},
				get_code1(ipone){
					uniCloud.callFunction({
						name:'set-sheZhi',
						data:{
							action:'get-code',
							mobile:ipone
						},
						success: (ret) => {
							console.log(ret);
							console.log(ret.result.data.length)
							//返回多条数据的话就取最后一个最新的code
							console.log('我是设置code后在获取code')
							console.log(ret.result.data)
								uni.showModal({
									content: ret.result.data[0].code,
									showCancel: false
								})
							
						},
						fail: (mes) => {
							console.error(mes)
						}
					})
				},
				remote_code(ipone){
					uniCloud.callFunction({
						name:'set-sheZhi',
						data:{
							action:'delete-code',
							mobile:ipone
						},
						success: (val) => {
							console.log('我是删除code')
							console.log(val)
						},fail: (msg) => {
							console.error(msg);
						}
					})
				}
	}