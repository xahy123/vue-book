import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		linkList:[]//存储章节链接
	},
	// getters:{
	// 	linkList:state => state.linkList
	// },
	mutations:{
		//第一个state是定值
		changePlayList(state,playerList){
			console.log('函数被触发')
			state.linkList = playerList
			console.log('EW',state.linkList)
		},
	}
})