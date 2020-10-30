### 说明文档
### common下的config.js文件是封装的需要登录才能查看的js文件

### common下的lib.js文件是监听用户当前的网络变化

### common下的format是处理数据格式的文件

### components文件下的page-muban是封装的列表的公共组件，
### 在/pages/sheZhi/sheZhi文件中使用封装的组件
### 不用直接进行import引入和注册，uniapp有一个文件帮我们已经注册了
### 直接在文件中引入我们的组件就OK了
```
	里面有三个参数，title是标题，
	icon是当前的图标
	content是右箭头旁边的内容，默认是空的，可以不传参
```
### components下的page-sl文件是封装的上拉加载组件
### 在/pages/index/index商城和/pages/show/show首页都用到了
```
	有两个参数，sl:是传递的参数，上拉加载，或者是自己定义的
	paddingBottom：默认是0，不会减去底部tabbar的值，
	1是会减去底部tabbar的值
```
### components下的page-buJu文件是封装的上列表超出滚动，底部固定的布局
```
	在引入过来后，在当前页面，page的高度为100%
	当前的根节点元素宽度高度都为100%，就可以撑起了
	<page-buJu>
		<template v-slot:list>
			<view>上列表数据内容</view>
		</template>
		<template v-slot:footer>
			<view>底部导航的数据</view>
		</template>
	</page-buJu>
```