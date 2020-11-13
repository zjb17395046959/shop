'use strict';

const uniID = require('uni-id')
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)

	let params = event.params || {}
	let payload = {}
	let noCheckAction = ['register', 'loginByWeixin', 'checkToken', 'login', 'logout', 'sendSmsCode', 'loginBySms', 'inviteLogin']

	if (noCheckAction.indexOf(event.action) === -1) {
		if (!event.uniIdToken) {
			return {
				code: 403,
				msg: '缺少token'
			}
		}
		payload = await uniID.checkToken(event.uniIdToken)
		if (payload.code && payload.code > 0) {
			return payload
		}
		params.uid = payload.uid
	}

	let res = {}

	switch (event.action) {
		case 'register'://用户注册
			res = uniID.register(params);
			break;
		case 'login'://用户登录
			res = uniID.login(params);
			break;
		case 'loginByWeixin'://微信小程序的用户登录
			res = await uniID.loginByWeixin(params);
			break;
		case 'checkToken'://token校验
			res = uniID.checkToken(event.uniIdToken);
			break;
		case 'logout'://退出登录
			res = await uniID.logout(event.uniIdToken)
			break;
		case 'sendSmsCode'://发送验证码
			// 简单限制一下客户端调用频率
			const ipLimit = await db.collection('uni-verify').where({
				ip: context.CLIENTIP,
				created_at: dbCmd.gt(Date.now() - 60000)
			}).get()
			if (ipLimit.data.length > 0) {
				return {
					code: 429,
					msg: '请求过于频繁'
				}
			}
			const randomStr = '00000' + Math.floor(Math.random() * 1000000)
			const code = randomStr.substring(randomStr.length - 6)
			res = await uniID.sendSmsCode({
				mobile: params.mobile,
				code,
				type: params.type
			})
			break;
		case 'loginBySms'://手机号通过验证码登录
			if (!params.code) {
				return {
					code: 500,
					msg: '请填写验证码'
				}
			}
			if (!/^1\d{10}$/.test(params.mobile)) {
				return {
					code: 500,
					msg: '手机号码填写错误'
				}
			}
			res = await uniID.loginBySms(params)
			break;
		case 'inviteLogin'://手机号通过验证码注册
			if (!params.code) {
				return {
					code: 500,
					msg: '请填写验证码'
				}
			}
			res = await uniID.loginBySms({
				...params,
				type: 'register'
			})
			break;
		case 'getInviteCode':
			res = await uniID.getUserInfo({
				uid: params.uid,
				field: ['my_invite_code']
			})
			if (res.code === 0) {
				res.myInviteCode = res.userInfo.my_invite_code
				delete res.userInfo
			}
			break;
		case 'getInvitedUser'://获取接受邀请的用户
			res = await uniID.getInvitedUser(params)
			break;
		default:
			res = {
				code: 403,
				msg: '非法访问'
			}
			break;
	}

	//返回数据给客户端
	return res
};
