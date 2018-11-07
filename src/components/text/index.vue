<template>
  <transition name="slide">
    <div class="book_txt" @click='getShow'>
    <div class="page_header" v-show='isBack' >
      <header class="header_bar">
        <span class="back" @click="back">
          <i class="icon"></i>
          <i>返回</i>
        </span>
        <a href="#" class="index">
          <i class="homePage"></i>
        </a>
      </header>
    </div>
    <div class="contain">
      <div class="title">
        <h1>{{chapter.title}}</h1>
      </div>
      <mt-loadmore class="inner" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
 :auto-fill="autoFill"  ref='inner'>
        <p v-for="item in text">{{item}}</p>
        <!-- <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="topStatus !== 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div> -->
      </mt-loadmore>
    </div>
    <div class="bottom-controll-panel" v-show="isBack">
      <div class="toBookShelf">加入书架</div>
      <div class="item">
        <span class="btn font-btn-w" >Aa-</span>
        <span class="btn progress-bar">
          <span class="content" ref="con" :style='{width:"120px"}'></span>
        </span>
        <span class="btn font-btn-w">Aa+</span>
      </div>
      <div class="item clearfix">
        <span class="btn square active" >默认</span>
        <span class="btn square" >夜间</span>
        <span class="btn square" >护眼</span>
      </div>
      <div class="item clearfix">
        <span class="btn chapter-btn-w f-l disable" @click.stop='prev'>上一章</span>
        <span class="btn directory">目录</span>
        <span class="btn chapter-btn-w  mr0 f-r" @click.stop='next'>下一章</span>
      </div>
    </div>
    </div>
  </transition>
</template>

<script>
  // import { InfiniteScroll } from 'mint-ui';
  import { Loadmore } from 'mint-ui';
export default {
  data:function(){
    return{
      http:'',
      text:[],
      chapter:'',
      isBack:false,
      // loading:false,
      allLoaded: false,
      autoFill: false,
      topStatus:'',
      k:0,
      v:0
      // queryLoading: false,
      // moreLoading: false,
      // newText:[]
    }
  },
  created(){
    this.http = this.$route.params.x;
    // console.log(this.http)
    // /chapter/http%3A%2F%2Fvip.zhuishushenqi.com%2Fchapter%2F5817f1161bb2ca566b0a5973%3Fcv%3D1538661003673
    // /chapters/http%3A%2F%2Fvip.zhuishushenqi.com%2Fchapter%2F56f8da09176d03ac1983f6d7%3Fcv%3D148647305 |
    this.getText(`/juhe/chapters/${encodeURIComponent(this.http)}`)
    // this.newText.push(this.text)
    // console.log(this.text)
  },
  methods:{
    getText(x){
      this.$axios.get(x).then((res) => {
        console.log(res)
        this.chapter = res.data.chapter
        this.text = res.data.chapter.cpContent.split('\n')
        // this.bookList = res.data.chapters
        // this.id = this.bookList[0]._id
        // console.log(this.id)
      }).catch((error) => {
        // Toast({
        //   message: '暂无数据',
        //   duration: 2000
        // });
      })
    },
    back:function(){
      this.$router.back()
    },
    getShow:function(){
      this.isBack = !this.isBack
    },
    next(){
      // console.log(233,this.$store.state.linkList)
      this.k ++
      let x = this.k
      this.v = x
      console.log(this.k)
      this.text=[]
      this.http=this.$store.state.linkList[this.k].link
      this.getText(`/juhe/chapters/${encodeURIComponent(this.http)}`)
    },
    prev(){
      this.v--
      let x = this.v
      this.text=[]
      this.http=this.$store.state.linkList[this.v].link
      this.getText(`/juhe/chapters/${encodeURIComponent(this.http)}`)
    },
    loadBottom() {
      // this.loading = true;
      setTimeout(() => {
      this.next()
      this.$refs.inner.onBottomLoaded();
      }, 2500);
    }
    // handleTopChange:function(status){
    //   this.topStatus = status
    // }
  }
}
</script>

<style lang="less">
  .book_txt{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 2000;
    background: #EEE6DD;
    overflow-y: auto;
    .page_header{
      position: fixed;
      width: 100%;
      z-index: 20;
      height: 48px;
      overflow: hidden;
      .header_bar{
        position: relative;
        z-index: 20;
        width: 100%;
        height: 48px;
        overflow: hidden;
        background-color: #444545;
        color: #fff;
        .back{
          position: absolute;
          width: 66px;
          text-align: center;
          i{
            display: inline-block;
            vertical-align: middle;
            font-style:normal;
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
    .contain{
      .title{
        h1{
          font-weight: 400;
          color: #333;
          padding: 22px 0 0 22px;
          line-height: 1.5;
          margin: 0;
          font-size: 22px;
        }
      }
      .inner{
        padding:11px 22px 0 22px;
        p:first-child{
          text-indent: 40px;
        }
        p{
          font-size: 18px;
          line-height: 1.5;
          margin: 0;
          color:#5C5D58;
          text-indent: 2px;
          text-align: justify;
        }
      }
    }
    .bottom-controll-panel {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 30;
      width: 100%;
      height: 175px;
      padding: 20px;
      background-color: rgba(50,51,52,.9);
      .toBookShelf {
        position: absolute;
        width: 80px;
        height: 30px;
        background: rgba(50,51,52,.9);
        border-radius: 30px 0 0 30px;
        color: #fff;
        font-size: .34667rem;
        line-height: 30px;
        padding-left: 15px;
        top: -60px;
        right: 0;
      }
      .item {
        position: relative;
        height: 30px;
        margin-bottom: 20px;
        font-size: 0;
        margin-right: 45px;
        .font-btn-w {
          width: 32px;
          font-size: 18px;
        }
        .progress-bar {
          width: 240px;
          height: 2px;
          background: #b2b2b2;
          border-radius: 5px;
          margin: 0 15px;
          display: inline-block;
          vertical-align: middle;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
          color: #fff;
          font-size: 14px;
          .content {
            height: 2px;
            display: block;
            background: #b93221;
            border-radius: 5px;
          }
        }
        .font-btn-w {
          width: 32px;
          font-size: 18px;
        }
        .btn {
          display: inline-block;
          vertical-align: middle;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
          color: #fff;
          font-size: 14px;
          &.on{
            color:#b93221;
            border: 1px solid #b93221;
          }
        }
        .square {
          width: 100px;
          color: #fff;
          border: 1px solid #535353;
          border-radius: 3px;
        }
        .square:nth-of-type(2) {
          margin: 0 17px;
        }
        .chapter-btn-w {
          width: 50px;
          font-size: 15px;
          background-color: transparent;
          color: #888;
        }
        .f-r {
          float: right;
        }
        .directory {
          width: 100px;
          height: 30px;
          line-height: 30px;
          color: #a8a8a8;
          text-align: center;
          font-size: 15px;
          position: absolute;
          left: 50%;
          margin-left: -50px;
        }
      }
      .item:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
