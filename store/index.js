import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		index_swiper:[],
		show_swiper:[],
		index_list:[]
		// 商城页面的轮播图数据
		// index_swiper:[
		// 	'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qiushi/060e4dd0-6f7c-11ea-b94e-47f67ecf8268.jpg',
		// 	'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qiushi/060cee40-6f7c-11ea-b94e-47f67ecf8268.jpg',
		// 	'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qiushi/060e4dd0-6f7c-11ea-b94e-47f67ecf8268.jpg',
		// 	'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qiushi/060cee40-6f7c-11ea-b94e-47f67ecf8268.jpg'
		// ],
		// // 商城页面的数据列表
		// index_list:[
		// 	{ id:1, img:'../../static/img/1.jpg',title:'钓鱼台150铁观音、大红袍、红茶、白茶年货礼品茶叶礼盒装',price:150.00,oldPrice:'',hot:1,isYou:1},
		// 	{ id:2, img:'../../static/img/3.jpg',title:'钓鱼台380铁观音、大红袍、红茶、白茶年货礼品茶叶礼盒装',price:388.00,oldPrice:'',hot:1,isYou:1},
		// 	{ id:3, img:'../../static/img/4.jpg',title:'钓鱼台580铁观音、大红袍、红茶、白茶年货礼品茶叶礼盒装',price:588.00,oldPrice:'',hot:1,isYou:0},
		// 	{ id:4, img:'../../static/img/5.jpg',title:'满天星千足银手镯3折',price:156.00,oldPrice:520,hot:1,isYou:1},
		// 	{ id:5, img:'../../static/img/6.jpg',title:'高山云雾雪芽.精品礼盒',price:198.00,oldPrice:498.00,hot:1,isYou:1},
		// 	{ id:6, img:'../../static/img/8.jpg',title:'绿·碧螺春·五品·023',price:139.00,oldPrice:148.00,hot:1,isYou:0},
		// 	{ id:7, img:'../../static/img/11.jpg',title:'金骏眉',price:489.60,oldPrice:'',hot:1,isYou:0},
		// 	{ id:8, img:'../../static/img/16.jpg',title:'野生红茶',price:144.00,oldPrice:'',hot:1,isYou:1}
		// ],
		// //首页中的列表数据
		// show_list:[
		// 	{id:11,img:'../../static/img/10.jpg',title:'银手镯为什么会变黑?',introduction:'银饰放置在空气中，与氧发生化学反应，氧化就会慢慢的失去光泽，慢慢变黑。 此外，在你所居住的环境中有类似于化工厂这样的废气排放点的话，废气中的硫化物与银也会发生化学反应。',isLeft:0},
		// 	{id:21,img:'../../static/img/12.jpg',title:'银饰品中，990，925有什么区别？',introduction:'纯银硬度竟然比不上普通玻璃硬度？？？纯银硬度为2.7，玻璃硬度为6.7。纯银还没有玻璃硬，原来市场上的银饰中还有这些成分...',isLeft:1},
		// 	{id:31,img:'../../static/img/17.jpg',title:'银饰养护诀窍，超有效，有银饰的顾客快快点击！！！',introduction:'网上流传有很多的银饰养护方法，比如用牙膏清洗，泡醋，用洗洁精清洗，洗银水等等，大多效果不明显，而且见效慢。这里告诉大家一个有效方法。',isLeft:0},
		// 	{id:41,img:'../../static/img/20.jpg',title:'银饰鉴别指南',introduction:'网上常见的银饰真假鉴别方法也只能做出初步的判断，例如看价格，看颜色，看软度、弹性。但是最靠谱的还是...',isLeft:1},
		// 	{id:51,img:'../../static/img/14.jpg',title:'他们说今年不过情人节了...?',introduction:'那么懂茶，怎么会不懂爱？我姓邓也懂些生活，所以大家都习惯叫我老邓，来我这的都是朋友，都爱和我聊聊天。嘿嘿，可能是爱被我“怼”吧...',isLeft:0},
			
		// ],
		// //首页中的轮播图的数据
		// show_swiper:[
		// 	{ id:1, img:'../../static/img/1.jpg',title:'钓鱼台150铁观音、大红袍、红茶、白茶年货礼品茶叶礼盒装',price:150.00,oldPrice:'',hot:1,isYou:1},
		// 	{ id:2, img:'../../static/img/3.jpg',title:'钓鱼台380铁观音、大红袍、红茶、白茶年货礼品茶叶礼盒装',price:388.00,oldPrice:'',hot:1,isYou:1},
		// 	{ id:3, img:'../../static/img/4.jpg',title:'钓鱼台580铁观音、大红袍、红茶、白茶年货礼品茶叶礼盒装',price:588.00,oldPrice:'',hot:1,isYou:0},
		// 	{ id:4, img:'../../static/img/5.jpg',title:'满天星千足银手镯3折',price:156.00,oldPrice:520,hot:1,isYou:1},
		// 	{ id:5, img:'../../static/img/8.jpg',title:'高山云雾雪芽.精品礼盒',price:198.00,oldPrice:498.00,hot:1,isYou:1},
		// 	{ id:6, img:'../../static/img/11.jpg',title:'绿·碧螺春·五品·023',price:139.00,oldPrice:148.00,hot:1,isYou:0},
		// 	{ id:7, img:'../../static/img/14.jpg',title:'金骏眉',price:489.60,oldPrice:'',hot:1,isYou:0},
		// 	{ id:8, img:'../../static/img/18.jpg',title:'野生红茶',price:144.00,oldPrice:'',hot:1,isYou:1}
		// ]
	},
	mutations:{
		init(state,obj){
			// console.log('1111')
			// console.log(obj);
			state.index_swiper = obj.index;
			state.show_swiper = obj.show;
		},
		index_list(state,val){
			state.index_list = val;
		}
	}
})

export default store