'use strict';

// 云函数bind-mobile代码
const uniID = require('uni-id')
const db = uniCloud.database();
exports.main = async function(event,context) {
	
	
	switch (event.action){
		case 'set-code'://自定义设置验证码，在云数据库中uni-verify进行查看验证码
			
			// 生成验证码可以按自己的需求来，这里以生成6位数字为例
			  const randomStr = '00000' + Math.floor(Math.random() * 1000000)
			  const code = randomStr.substring(randomStr.length - 6)
			    const res = await uniID.setVerifyCode({
			        mobile:event.mobile,
			        code,
			    expiresIn: 180,
			    type: 'register'
			    })
			    return res
			break;
		case 'bind-mobile':
			
			// const payload = await uniID.checkToken(event.uniIdToken)
			// if(payload.code > 0) {
			//   return payload
			// }
			// const { mobile, code } = params
			
			//   const res = await uniID.bindMobile({
			//   uid: payload.uid,
			// 	  mobile,
			//       code
			//   })
			//   return res
			break;
		case 'get-code':
			const res1 = db.collection('uni-verify').where({
				 mobile:event.mobile,
				 type:{
					state:0 
				 }
			}).get();
			return res1;
			break;
		default:
			break;
	}
}