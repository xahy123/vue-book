<template>
  <div class="books_title">
    <div class="page_header">
      <header class="header_bar">
        <span class="back" @click="back">
          <i class="icon"></i>
          <i>返回</i>
        </span>
        <a href="#" class="index">
          <i class="homePage"></i>
        </a>
        <h1>{{this.title}}</h1>
      </header>
    </div>
    <div class="page_body">
      <div class="rank_wraper">
        <div class="ranking_header">
          <ul>
            <li :class="{active:acti == 'zhou'}" @click="bang('zhou')">周榜</li> 
            <li :class="{active:acti == 'yue'}" @click="bang('yue')">月榜</li> 
            <li :class="{active:acti == 'zong'}" @click="bang('zong')">总榜</li>
          </ul>
        </div>
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
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  data:function(){
    return{
      bookList:[],
      zhou:'',
      yue:'',
      zong:'',
      loading:true,
      acti:'zhou',
      title:''
    }
  },
  created(){
    Indicator.open('加载中...');
    let x = this.$route.path.split(`/`)
    this.zhou=x[2]
    this.yue=x[3]
    this.zong=x[4]
    this.getBook(`/api/ranking/${this.zhou}`)
  },
  
  methods:{
   	back:function(){
      this.$router.back();
    },
    getBook(x){
      this.$axios.get(x).then((res) => {
        this.bookList = res.data.ranking.books
        this.title = res.data.ranking.title
        console.log(res)
        Indicator.close();
        for(let i = 0;i < this.bookList.length;i++){
          this.bookList[i].cover = this.bookList[i].cover
          if(this.bookList[i].latelyFollower < 10000){
            this.bookList[i].shi = this.bookList[i].latelyFollower
          }else{
            this.bookList[i].wan = this.bookList[i].latelyFollower / 10000 
            this.bookList[i].shi = (this.bookList[i].wan).toFixed(1) + '万'
          }
        }
      }).catch((error) => {
        Toast({
          message: '暂无数据',
          duration: 2000
        });
        Indicator.close();
      })
    },
    bang(x){
      Indicator.open('加载中...');
      console.log(x)
      this.bookList = []
      this.acti = x
      // console.log(this.acti)
      if(x == 'yue'){
        x = this.yue 
      }
      if(x == 'zong'){
        x = this.zong
      }
      if(x == 'zhou'){
        x = this.zhou
        
      }
      this.getBook(`/api/ranking/${x}`)
    },
    //如果链接里面有limit和start  就用下面的方法加载
    // loadMore() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     this.start+=10;
    //     this.getBook()
    //     this.loading = false;
    //   }, 2500);
    // }
  }
}
</script>

<style lang="less">
  .books_title{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: white;
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
      .rank_wraper{
        height: 100%;
        .ranking_header{
          width: 100%;
          z-index: 200000;
          position: relative;
          top: 0;
          left: 0;
          background-color: #fff;
          border-bottom: 1px solid #ebebeb;
          display: inline-block;
          ul{
            height: 60px;
            color: #999;
            font-size: 0;
            white-space: nowrap;
            padding: 0;
            li{
              list-style: none;
              display: inline-block;
              width: 33.33333333%;
              height: 100%;
              line-height: 60px;
              text-align: center;
              font-size: 14px;
            }
            .active{
              border-bottom: 2px solid #b93321;
              width: 33.33333334%;
            }
          }
        }
        .list_wraper{
          position: fixed;
          top:118px;
          bottom: 0;
          width: 100%;
          overflow-y: auto;
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
</style>
