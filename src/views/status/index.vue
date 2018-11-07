<template>
  <div class="book_detail">
    <div class="page_header">
      <header class="header_bar">
        <span class="back" @click="back">
          <i class="icon"></i>
          <i>返回</i>
        </span>
        <a href="#" class="index">
          <i class="homePage"></i>
        </a>
        <h1>xx</h1>
      </header>
    </div>
    <div class="page_body">
      <div class="page_wraper">
        <div class="filter-item-wraper">
          <div class="filter-item">
            <div class="inner">
              <ul>
                <li data-type="hot" class="active">热门</li>
                <li data-type="new" class="" @click="status('new')">新书</li>
                <li data-type="reputation" @click="status('reputation')" class="">好评</li>
                <li data-type="over" @click="status('over')" class="">完结</li>
                <li data-type="monthly" @click="status('monthly')" class="">包月</li>
              </ul>
            </div>
          </div>
          <div class="filter-item">
            <div class="inner">
              <ul>
                <li data-minor="" class="active">全部</li> 
                <li data-minor="东方玄幻" v-for='item in cats' :key='item.key' class="">{{item}}</li> 
              </ul>
            </div>
          </div>
        </div>
        <!-- 图书 -->
        <div class="list_wraper">

            <a v-for='i in bookList' :key='i.key'>
              <div class="inner">
                <div class="cover">
                  <img :src='"http://statics.zhuishushenqi.com"+i.cover'>
                </div>
                <div class="right">
                  <h4>{{i.title}}</h4>
                  <p>
                    {{i.author}}
                    <span class="split">|</span>
                    {{i.majorCate}}
                  </p>
                  <p>{{i.shortIntro}}
                  </p>
                  <p class="important">
                    <span class="c_red">{{i.shi}}</span>
                    人气
                    <span>
                      <span class="split">|</span> 
                      <span class="c_red">{{i.retentionRatio}}%</span>
                      读者留存
                    </span>
                  </p>
                </div>
              </div>
            </a>
          
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  
export default {
  data:function(){
    return{
      statu:'',
      bookList:[],
      start:0,//currentpageNum
      limit:20,
      allLoaded: false,
      autoFill: false,//若为真，loadmore 会自动检测并撑满其容器
      totalNum: 0,//总数
      bottomStatus: '',
      num:0,
      cats:[]
    }
  },
  created(){
    let x = this.$route.path.split(`/`)
    console.log(x[2])
    this.statu = x[2]//new
    this.gt()
  },
  methods:{
    gt:function(){
      let url = `/api/book/by-categories?gender=male&type=${this.statu}&major=玄幻&start=${this.start}&limit=${this.limit}`;
      this.$axios.get(url).then((res) => {
        this.bookList = res.data.books
        for(let i = 0;i < this.bookList.length;i++){
          this.bookList[i].cover = this.bookList[i].cover
          if(this.bookList[i].latelyFollower < 10000){
            this.bookList[i].shi = this.bookList[i].latelyFollower
          }else{
            this.bookList[i].wan = this.bookList[i].latelyFollower / 10000 
            this.bookList[i].shi = (this.bookList[i].wan).toFixed(1) + '万'
          }
        }
      });
      let ur = `/api/book/by-categories?gender=${this.male}&type=hot&major=${this.major}`;
      this.$axios.get(ur).then((res) => {
        this.num = res.data.books.length
      });
      this.$axios.get(`/api/cats/lv2`).then((res) => {
        console.log(res)
        let type = this.major
        let name = this.male//玄幻
        this.cats = res.data[name].filter(x => x.major === type)[0].mins
      })
    },
    
    back:function(){
      this.$router.back();
    },
    status(type){
      // this.$router.push({path:`/sort/${id}/${type}`});
      // console.log(type)
      // console.log(typeof(type))
      this.$router.push({path:`/sort/${type}`})
    }
  }
}
</script>

<style lang="less">
  
</style>
