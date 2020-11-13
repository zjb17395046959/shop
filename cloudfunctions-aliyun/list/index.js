'use strict';
const db =uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	switch (event.k){
		case 'list':
			const res = db.collection('list').limit(2).get();
			return res;
			break;
		case 'show_list':
			const res1 = db.collection('show_list').get();
			return res1;
			break;
		default:
			break;
	}
	
	
	
	//返回数据给客户端
};
