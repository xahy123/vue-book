<template>
  <transition name="slide">
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
        <h1>{{this.major}}</h1>
      </header>
    </div>
    <div class="page_body" ref='page_body'>
      <div class="page_wraper">
        <div class="filter-item-wraper">
          <div class="filter-item">
            <div class="inner">
              <ul>
                <li :class="{active: statu == 'hot'}" @click="status('hot')">热门</li>
                <li :class="{active: statu == 'new'}" @click="status('new')">新书</li>
                <li :class="{active: statu == 'reputation'}" @click="status('reputation')" >好评</li>
                <li :class="{active: statu == 'over'}" @click="status('over')" >完结</li>
                <li :class="{active: statu == 'monthly'}" @click="status('monthly')" >包月</li>
              </ul>
            </div>
          </div>
          <div class="filter-item">
            <div class="inner">
              <ul>
                <li  v-for='item in cats' :key='item.key' @click="faction(item)" :class='{active:ming == item}'>{{item}}</li> 
              </ul>
            </div>
          </div>
        </div>
        <!-- 图书 -->
        <div class="list_wraper">
          <mt-loadmore class="book_list" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"  :auto-fill="autoFill">
            <a v-for='i in bookList' :key='i.key' @click='bookInfo(i._id)'>
              <div class="inner">
                <div class="cover">
                  <img :src='"http://statics.zhuishushenqi.com"+i.cover'>
                </div>
                <div class="right">
                  <h4>{{i.title}}</h4>
                  <p>
                    {{i.author}}
                    <span class="split">|</span>
                    {{i.minorCate}}
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
          </mt-loadmore>
        </div>
      </div>
    </div>
    <router-view/>
    </div>
  </transition>
</template>

<script>
  import { Indicator } from 'mint-ui';
export default {
  data:function(){
    return{
      major:'',
      gender:'',
      bookList:[],
      start:0,//currentpageNum
      limit:20,
      allLoaded: false,
      autoFill: false,//若为真，loadmore 会自动检测并撑满其容器
      totalNum: 0,//总数
      bottomStatus: '',
      num:0,
      cats:[],
      statu:'hot',
      ming:'全部'
    }
  },
  created(){
    let x = this.$route.path.split(`/`)
    // console.log(x[2],x[3])
    this.major = x[2]//男女
    this.male = x[3]//玄幻
    this.gt()
    Indicator.open('加载中...');
  },
  updated(){
    Indicator.close();
    // this.$refs.loadmore.style='padding-top:20px'
  },
  methods:{
    aaa(){
      this.gt()
      this.loadBottom()
    },
    gt:function(){
      //全部里面是空的，要判断下
      let minor =''
      if(this.ming != "全部"){
        minor = this.ming
      }
      let url = `/api/book/by-categories?gender=${this.male}&type=${this.statu}&major=${this.major}&start=${this.start}&limit=${this.limit}&minor=${minor}`;
      this.$axios.get(url).then((res) => {
        this.bookList = res.data.books
        console.log(this.bookList)
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
        this.cats.unshift('全部')
      })
    },
    loadBottom() {
      setTimeout(() => {
        if (this.totalNum < this.num) {
          let minor =''
          if(this.ming != "全部"){
            minor = this.ming
          }
          this.start = (this.bookList.length/2);
          let url = `/api/book/by-categories?gender=${this.male}&type=hot&major=${this.major}&start=${this.start}&limit=${this.limit}&minor=${minor}`;
          this.$axios.get(url).then((res) => {
            if (res.data.books.length > 0) {
              for (let i = 0; i < res.data.books.length; i++) {
                this.bookList.push(res.data.books[i]);
                this.totalNum = this.bookList.length;
              }
              for(let i = 0;i < this.bookList.length;i++){
                this.bookList[i].cover = this.bookList[i].cover
                
                if(this.bookList[i].latelyFollower < 10000){
                  this.bookList[i].shi = this.bookList[i].latelyFollower 
                }else{
                  this.bookList[i].wan = this.bookList[i].latelyFollower / 10000 
                  this.bookList[i].shi = (this.bookList[i].wan).toFixed(1) + '万'
                }
              }
            }
          })
          } else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
    },
    back:function(){
      this.$router.back();
    },
    status(ty){
      this.bookList=[]
      // this.$router.push({path:`/sort/${id}/${type}`});
      // console.log(type)
      // console.log(typeof(type))
      this.statu = ty
      this.aaa()
      Indicator.open('加载中...');
    },
    faction(x){
      this.bookList=[]
      this.ming = x
      this.aaa()
      Indicator.open('加载中...');
    },
    bookInfo(x){
      this.$router.push({path:`/book/${x}`})
    }
  }
}
</script>

<style lang="less">
  .slide-enter-active,.slide-leave-active{
    transition: all 0.5s;
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0);
  }
  .book_detail{
  	position: fixed;
  	top: 0;
  	bottom: 0;
  	width: 100%;
    z-index: 200;
    .page_header{
      position: relative;
      z-index: 20;
      height: 48px;
      overflow: hidden;
      .header_bar{
        position: relative;
        z-index: 20;
        width: 100%;
        height: 48px;
        overflow: hidden;
        background-color: #b93321;
        color: #fff;
        .back{
          position: absolute;
          width: 66px;
          text-align: center;
          i{
            display: inline-block;
            vertical-align: middle;
            font-style: normal;
          }
          .icon{
            width: 16.5px;
            height: 48px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAD7ElEQVR4Xu3d63XbMAxAYXKyppukmySTtN2o3aQbuMeJfeI4lgiSEAkCN39DypLuZ8mm88iJryFn4HQ6PaeUvuWcfwx5QOGDZOE4hnWcgUv8n5dN/LKEAAAdYSVT7+Jfp5hBAABJxcYxG/FNIQBAY9zStEJ8MwgAUCrZ8H1hfBMIANAQeG9KZfzpCACgCKAx/lQEAFAC0Bl/GgIAKABQin/dk9ec84vCbok2AQDRadoepBz/b0rpKef8r3O3xNMBID5VXweuHv98RABoBOAhPgCCxwdAAwAvz/zroXMLqEDgLT5XgODxASAE4PGZzy2A+G9ngNcAOxA8P/O5AhSuABHicwXYQBAlPgAeAIgUHwB3AKLFB8ANgIjxAXABEDU+AFJKkeOHBxA9fmgAxH+//4VcCST+x6vfcACI//m9bygAxP+68hUGAPEfr3uHAED87U++3AMg/v7Hnq4BEL/8Uy9uARC/HN/tOgDxZfFdAiC+PL47AMSvi+8KAPHr47sBQPy2+C4AEL89/vIAiN8Xf2kAxO+PvywA4uvEXxIA8fXiLweA+LrxlwJAfP34ywAg/jHxlwBA/OPimwdA/GPjmwZA/OPjmwVA/DHxTQIg/rj45gAQf2x8UwCIPz6+GQDEnxPfBADiz4s/HQDx58afCoD48+NPA0B8G/GnACC+nfjDARDfVvzVAfxJKX0f+R+27OXr36PhvxyqfBUAQaeB4QDO+wuCzmqK06cAAIFiwc5NTQMAgs5yStOnAgCBUsWOzUwHAIKOegpTTQAAgULJxk2YAQCCxoKd00wBAEFnzYbp5gCAoKFixxSTAEDQUbRyqlkAIKgs2TjcNAAQNFatmGYeAAgqajYMXQIACBrKCqcsAwAEwqKVw5YCAILKuoLhywEAgaBqxZAlAYCgonBh6LIAQKCDYGkAIOhHsDwAEPQhcAEABO0I3AAAQRsCVwBAUI/AHQAQ1CFwCQAEcgRuAYBAhsA1ABCUEbgHAIJ9BCEAgGAbQRgAIHiMIBQAEHxFEA4ACD4jCAkABB8IwgIAwTuC0ABAAIC3Z0Hkv1kU/gpwvRtGRQCAmxfFEREA4O6tcTQEAHiwQBYJAQA2lsmjIADAzodlERAAoPCRuXcEACj/zITrdQIACAB4XiwCgBCAVwQAqADgEQEAKgF4QwCABgCeEACgEYAXBADoAOABAQA6ARyA4DXn/KKwW6JNAEB0msqDlFYMf+ecn8uPpjcCAHrnsnfFcHj886EDQBFAx+1gSnwAKMe/bq7ydjAtPgAOAlBxJZgaHwAHAhAgmB4fAAcD2EFgIj4ABgB4gMBMfAAMAnCD4Gn0+/zSIf4HnJnqn1/5JcgAAAAASUVORK5CYII=) no-repeat;
            background-size: 125%;
            background-repeat: no-repeat;
            background-position: 50%;
          }
        }
        .index{
          position: absolute;
          right: 0;
          width: 54px;
          text-align: center;
          height: 100%;
          line-height: 48px;
          color: #fff;
          i{
            display: inline-block;
            width: 16.5px;
            height: 48px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC5UlEQVR4Xu2a0XHbMAyGgcp3vd6llnlnv3cEd4ImG8QT1J4gyQbZoO4EUSZINkg6QT1C3q0eLbePdtCTnaSuI8UkRFK6E/xMUMBH8AcEC6HlP2x5/CAAJANaTkCuQMsTQESw1iuQZtlVnoH9OJ7UlYm1ANCaemvMg8fTbeB0G1E8UQoXoUEEB5AHv8LsDgGHu8ES0KxD8UloCEEBaP1nuMbVHQD2ik+aFhF1TpQ6moXKhGAAUr08BXzM074k+OeQaUEUjQbq430ICEEApHo5BqSN4Bn/CCd91U2M1zMXegewUXqCMcc/QpgO4viCY2tq4w3ARunfLb9xg38JACGJHrsXvsTRC4AypTc9lf11PiuEcwBPSn8DgJ+4AZdUiIeIOiPXFcIpAHOl56JxXyGcAWApPZuDuwrhBEAVpeczcFMhKgF43dNzw2HaOagQbACulZ6JAKpWCBaAwz09NxyuHbErhDUA/0rPhsB6h7AC8CvLzohgynUxiJ3lO4QxgDqUng0MITGdMh0E8KT0eWd3zHaoFkOzKdObAHKxW+Hqan96U0s8jIduK8T7kVIfHsrMSwHM9e9jxHV+8gcGGAzPgpq8PWUqBNC8MleVWDmEQgCpzqaAcFb1sY2yJ/jeV/H5vk8CoOiUtldg/bNRJ1jRmYiiz0WzhFIR3ECA9ZiA/pvf534gwBAQ44o+uTUnygjg1TgdAWcRREnZIOVgH1Dk5Vwv7hHxi9sIqu1GRD8GqmfdqwgADnfJALkCogEiglIFbMtgSZ0uEmFOn9H4MmjjIKfK2Oy/Cz1YH2DjoABglFkbwJIBOwTkCoRqhW1SVDRANMC+1bbJMBFBEcF/BFhVINVZAghfrQSU4LqvYqPP5XzvX/kKsD6HIRz1VffWBNr2H2i6MVn7ssZi/8oA8g3mOrtEoPODw9HNSxBOByq+tAnI9/7PvrCugE0gTV8rAJp+Qr79kwzwTbjp+0sGNP2EfPvX+gz4C7tCBl+8koA6AAAAAElFTkSuQmCC) no-repeat;
            background-size: 125%;
            background-repeat: no-repeat;
            background-position: 50%;
          }
        }
        h1{
          width: 70%;
          height: 100%;
          margin: 0 auto;
          line-height: 48px;
          text-align: center;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .page_body{
      height: 100%;
      .page_wraper{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        background-color: #f5f2ed;
        .filter-item-wraper{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          color: #666;
          background-color: #fff;
          z-index: 100;
          .filter-item{
            position: relative;
            width: 100%;
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            .inner{
              height: 100%;
              overflow-x: auto;
              ul{
                white-space: nowrap;
                font-size: 0;
                padding: 0;
                z-index: 300;
                li{
                  display: inline-block;
                  height: 100%;
                  font-size: 13px;
                  margin-left: 25px;
                }
                .active{
                  color:#b93321;
                }
              }
            }
          }
        }
        .list_wraper{
          position: relative;
          width: 100%;
          height: 100%;
          overflow-y: auto;
          .book_list{
            background-color: #f5f2ed;
            margin-top: 100px;
            padding-bottom: 35px;
            a{
              display: block;
              padding-left: 16.5px;
              .inner{
                display: block;
                padding: 16.5px 16.5px 16.5px 0;
                .cover{
                  float: left;
                  width: 66px;
                  height: 83px;
                  border: 1px solid #ebebeb;
                  background-position: 50%;
                  background-size: 100%;
                  overflow: hidden;
                  img{
                    width: 64px;
                    height: 92px;
                  }
                }
                .right{
                  height: 83px;
                  margin-left: 83px;
                  h4{
                    height: 22px;
                    white-space: nowrap;
                    text-overflow: ellipsis;//省略号
                    overflow: hidden;
                    line-height: 21px;
                    color: #333!important;
                    font-size: 14px;
                    margin: 0;
                  }
                  p{
                    font-size: 12px;
                    height: 22px;
                    line-height:22px;
                    white-space: nowrap;
                    text-overflow: ellipsis;//省略号
                    overflow: hidden;
                    color:#999;
                    margin:0;
                    .split{
                      padding:0 11px;
                    }
                  }
                  .important{
                    color:#666;
                    .c_red{
                      color: #b93321;
                      span{
                        .split{
                          padding:0 11px;
                        }
                        .c_red{
                          color: #b93321;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
