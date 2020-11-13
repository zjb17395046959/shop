'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	var res = db.collection('uni-id-users').where({username:'17395046959'}).get();
	console.log(res);
	//返回数据给客户端
	return event
};
