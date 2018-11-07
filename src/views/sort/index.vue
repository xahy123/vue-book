<template>
  <div class="sort_wraper" ref="sort_wraper">
  	<div class="contain">
      <div class="category-section">
      	<h4>男神</h4>
      	<div class="category-list" >
      		<a v-for='(i,index) in list' :key='i.key' @click="detail(i.name,'male')">
      			<span class="name">{{i.name}}</span>
      			<span class="count">{{i.bookCount}}</span>
      		</a>
      	</div>
      </div>
      <div class="category-section">
      	<h4>女神</h4>
      	<div class="category-list" >
      		<a v-for='(i,index) in nv' :key='i.key' @click="detail(i.name,'female')">
      			<span class="name">{{i.name}}</span>
      			<span class="count">{{i.bookCount}}</span>
      		</a>
      	</div>
      </div>
      <div class="category-section">
      	<h4>漫画</h4>
      	<div class="category-list" >
      		<a v-for='(i,index) in pic' :key='i.key' @click="detail(i.name,'picture')">
      			<span class="name">{{i.name}}</span>
      			<span class="count">{{i.bookCount}}</span>
      		</a>
      	</div>
      </div>
      <div class="category-section">
      	<h4>出版</h4>
      	<div class="category-list" >
      		<a v-for='(i,index) in pre' :key='i.key' @click="detail(i.name,'press')">
      			<span class="name">{{i.name}}</span>
      			<span class="count">{{i.bookCount}}</span>
      		</a>
      	</div>
      </div>
      <footer-book class='foot'/>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import BScroll from 'better-scroll'
  import footerBook from '@/components/book-footer'
export default {
	data:function(){
		return {
			list:[],
			nv:[],
			pic:[],
			pre:[]
		}
	},
	created(){
    this.getData();
	},
	methods:{
    getData:function(){
    	let url = '/api/cats/lv2/statistics';
    	this.$axios.get(url).then((res) => {
    		// console.log(res)
    		this.list = res.data.male;
    		this.nv = res.data.female;
    		this.pic = res.data.picture;
    		this.pre = res.data.press;
    		console.log(this.list)
    	}).catch((error) => {
    		console.log(error)
    	})
    },
    // @click="detail(_item.id)"
    // detail(id){
    //   this.$router.push({path:`/tui/${id}`});
    // },
    detail(id,type){
    	this.$router.push({path:`/sort/${id}/${type}`});
      // Indicator.open('加载中...');
    }
	},
  // mounted(){
  // 	this.$nextTick(() => {
  // 		this.scroll = new BScroll(this.$refs.sort_wraper,{
  // 			click: true, tap: true,preventDefaultException:{tagName: /^(UL)$/}
  // 		})
  // 	})
  // },
  components:{
  	footerBook
  }
}
</script>

<style lang="less" scoped>
 *{
 	box-sizing: border-box;
 	margin:0;
 }
 .sort_wraper{
    position: fixed;
    left: 0;
    top: 110px;
    bottom: 0;
    width: 100%;
    overflow-y:auto;
    .contain{
    	.foot{
        padding-bottom: 80px;
      }
      .category-section{
      	h4{
      		padding: 0 16px;
          height: 66px;
          line-height: 66px;
          font-weight: 400;
          color: #999;
          font-size: 12px;
      	}
      	.category-list{
      		a{
      			display: inline-block;
            vertical-align: middle;
            width: 33%;
            height: 66.2px;
            padding: 11px;
            text-align: center;
            border-top: 1px solid #f8f8f8;
            border-right: 1px solid #f8f8f8;
            border-bottom: 1px solid #f8f8f8;
            text-decoration: none;
            .name{
            	display: block;//span变成块级元素，独占一行
              line-height: 22px;
              font-size: 15px;
              font-weight: 700;
              color: #333;
            }
            .count{
            	display: block;
              line-height: 22px;
              font-size: 12px;
              color: #ccc;
            }
      		}
      	}
      }
      
    }
}
</style>
