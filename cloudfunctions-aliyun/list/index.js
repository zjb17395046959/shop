'use strict';
const db =uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { page } =event;
	const res = db.collection('list').get();
	
	
	//返回数据给客户端
	return res
};
