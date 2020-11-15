'use strict';

// 云函数bind-mobile代码
const uniID = require('uni-id')
const db = uniCloud.database();
const dbCmd = db.command
exports.main = async function(event,context) {
	const payload = await uniID.checkToken(event.uniIdToken)
	if(payload.code > 0) {
	  return payload
	}
	
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
			  const res1 = await uniID.bindMobile({
			  uid: payload.uid,
			  mobile:event.mobile,
			  code:event.code//绑定时获取的code值有点问题，提示非法token
			  })
			  return res1
			break;
		case 'get-code':
			const res2 = db.collection('uni-verify').where({
				 mobile:event.mobile
			}).get();
			return res2;
			break;
		case 'delete-code':
		// 清理全部数据
			let res3 = await db.collection('uni-verify').where({
			  mobile:event.mobile
			}).remove()
			
			return res3;
			break;
		default:
			break;
	}
}