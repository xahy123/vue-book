<template>
  <transition name="slide">
    <div class="book_info">
    <div class="page_header">
      <header class="header_bar">
        <span class="back" @click="back">
          <i class="icon"></i>
          <i>返回</i>
        </span>
        <a href="#" class="index">
          <i class="homePage"></i>
        </a>
        <h1>{{bookList.title}}</h1>
      </header>
    </div>
    <div class="book_title">
      <div class="book-detail">
        <img :src='"http://statics.zhuishushenqi.com"+bookList.cover' alt="圣墟" class="cover"> 
        <div class="desc">
          <h1>{{bookList.title}}</h1> 
          <p class="sku">
            <a>
              <span class="c-red">{{bookList.author}}</span>
            </a>
            <i>|</i> 
            <span>{{bookList.cat}}</span>
            <i>|</i> 
            <span>{{num}}</span>
          </p> 
          <p class="update">12小时前更新</p>
        </div>
      </div> 
      <div class="read-link">
        <a class="button">
          <i>加入书架</i>
        </a> 
        <a class="button" style="margin: 0px 0px 0px 5%;">
          <i>开始阅读</i>
        </a>
      </div> 
      <div class="reader-data">
        <p class="item">
          <span class="key">追人气</span> 
          <span class="txt">{{people}}</span>
        </p> 
        <p class="item">
          <span class="key">读者留存率</span> 
          <span class="txt">{{bookList.retentionRatio}}%</span>
        </p> 
        <p class="item">
          <span class="key">日更字数/天</span> 
          <span class="txt">{{bookList.serializeWordCount}}</span>
        </p>
      </div> 
      <div class="reader-txt">
        <div class="introduction">
          <p class="" style="user-select: text;">{{bookList.longIntro}}</p> 
          <span class="arrow"></span>
        </div> 
        <a class="chapter-item" @click='inner(id)'>
          <div class="inner clearfix">
            目录
            <i class="arrow"></i> 
            <span>[12小时前更新]&nbsp;&nbsp;{{bookList.lastChapter}}</span>
          </div>
        </a>
      </div>
    </div>
    <router-view/>
    </div>
  </transition>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
export default {
  data:function(){
    return {
      bookList:{},
      books:'',
      words:0,
      id:'',
      list:[]
    }
  },
  created(){
    let x = this.$route.path.split('/')
    this.books = x[2]
    this.getInfo(`/api/book/${this.books}`)
  },
  methods:{
    back:function(){
      this.$router.back();
    },
    getInfo(x){
      this.$axios.get(x).then((res) => {
        // console.log(res.data)
        this.bookList = res.data
        console.log(this.bookList.title)
      }).catch((error) => {
        // Toast({
        //   message: '暂无数据',
        //   duration: 2000
        // });
      })
      this.$axios.get(`/api/atoc?view=summary&book=${this.books}`).then((res) => {
        this.list = res.data
        this.id = res.data[0]._id
      })
    },
    inner(y){
      console.log(y)
      // console.log(this.bookList[0]+99)
      this.$router.push({path:`/book/${y}/chapter`})
    }
  },
  computed:{
    num:function(){
      if(this.bookList.wordCount > 10000){
        return Math.round(this.bookList.wordCount / 10000) + '万'
      }else{
        return this.bookList.wordCount
      }
    },
    people:function(){
      if(this.bookList.latelyFollower > 10000){
        let x = this.bookList.latelyFollower / 10000 
        return x.toFixed(1) + '万'
      }else{
        return this.bookList.latelyFollower
      }
      
    }
  }
}
</script>

<style lang="less">
  .book_info{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: white;
    z-index: 200;
    overflow-y: auto;
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
    .book_title{
      .book-detail{
        padding: 22px 22px 22px 22px;
        background: #fff;
        height: 96.7px;
        .cover{
          float: left;
          width: 71.8px;
          height: 96.7px;
        }
        .desc{
          margin-left: 82.6px;
          h1{
            height: 27.6px;
            font-weight: 400;
            font-size: 16px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin: 0;
          }
          .sku{
            height: 27.6px;
            font-size: 12px;
            margin: 0;
            a{
              .c-red{
                color:#b93321;
              }
            }
            span{
              display: inline-block;
              vertical-align: middle;
            }
          }
          .update{
              height: 27.6px;
              margin: 0;
          }
        }
      }
      .read-link{
        padding: 0 27.6px 27.6px;
        border-bottom: 1px solid #ebebeb;
        font-size: 0;
        background: #fff;
        display: flex;
        a{
          text-decoration: none;
          i{
            font-style: normal;
          }
        }
        .button:first-child{
          color: #b93321;
          background-color: #fff;
          float: left;
        }
        .button{
          display: inline-block;
          vertical-align: middle;
          height: 48.5px;
          line-height: 48.5px;
          background-color: #b93321;
          border: 1px solid #b93321;
          border-radius: 2px;
          text-align: center;
          color: #fff;
          font-size: 16px;
          width: 45%;
          margin-right: 5%;
        }
      }
      .reader-data{
        padding: 27.6px 0;
        border-bottom: 1px solid #ebebeb;
        background: #fff;
        .item{
          display: inline-block;
          vertical-align: middle;
          width: 32%;
          text-align: center;
          .key{
            color:#999;
            font-size: 12px;
          }
          .txt{
            display: block;
            line-height: 27.6px;
            color:black;
          }
        }
      }
      .reader-txt{
        .introduction{
          position: relative;
          padding: 27.6px;
          background: #fff;
          p{
            line-height: 27.6px;
            font-size: 13px;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .arrow{
            position: absolute;
            width: 27.6px;
            height: 22px;
            bottom: 19px;
            right: 11px;
            background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAENklEQVR4Xu3dzW0TURTF8feClHXowIvYYukFyTolQAWYEqgASoAKCB3QAVnHkWAb2xIpwTTghybgKB8zztzxfNx3zvEO8oJ87//Hk5PNxKAX9QYi9fQaPggAOQIBEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4z+5ASaT03cxpVmKcb3ZbL6sVlcX5DvKdvyiZQjhzf8Bvi0Wl98fD/MAwGR88jXGOLt/aJPS++Vyfp7tFkjfeFnLsNl8uF5dfb6/kjsA4/HJ9CDGn2X7EoK8FJXGDyGklNaL5fxlKYDj49dnLw4OflSNKgR5IKiKv33314vLB7f+3R9ejaajdHj4e9eYQuAbwXPxU0p/Fsv5UekNUPzlZHL6KYbwUQh8hy57d8/FL74nhfD28QfBpz8FjE/OY4zFp8fKl24CX0DqxK9qVvqLoIkQ+Cq8493sE7/4Zyt/EygE/g3sG38ngNvPBLoJ3CpoI/6zAITAZ/+24tcCIAS+ELQZvzYAIfCBoO34JgBCMCyCLuKbAQjBMAi6it8IgBD0i6DL+I0BCEE/CLqOvxcAIegWQR/x9wYgBN0g6Ct+KwCEoF0EfcZvDYAQtIOg7/itAhCC/RAMEb91AELQDMFQ8TsBIAQ2BEPG7wyAENRDMHT8TgEIwW4EHuJ3DkAIyhF4id8LACF4iMBT/N4ACME/BN7i9wqAHYHH+L0DYEXgNf4gANgQeI4/GAAWBN7jDwoAHUEO8QcHgIogl/guAKAhyCm+GwAoCHKL7wpA7ghyjO8OQK4Ico3vEkBuCHKO7xZALghyj+8agHcECPHdA/CKACV+FgC8IUCKnw0ALwjQ4mcFYGgEiPGzAzAUAtT4WQLoGwFy/GwB9IUAPX7WALpGwBA/ewBdIWCJDwGgbQRM8WEAtIWALT4UgH0RMMaHA9AUAWt8SABWBMzxYQHURRBSuggxnhXnq17oT0eBfnRsnecdMMeHvgG2YZsiQP+fv90P9A3QFAFLfIobwIqAKT4VgDofDNni0wHYhYAxPiWAWwT3npBaPE41xDgre7T6rp8QUL5G8SGwKtZoND26ufm1RonZZA5qAE0WhvY9AoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxHgEwLgztuACgFTXOIwDGhaEdFwC0osZ5BMC4MLTjAoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxnr+aEMOu5NitsQAAAABJRU5ErkJggg==) 50% no-repeat;
            background-size: 60%;
            background-repeat: no-repeat;
          }
        }
        .chapter-item{
          display: block;
          background: #fff;
          padding: 0 0 0 22px;
          border-bottom: 1px solid #ebebeb;
          line-height: 22px;
          color: #333;
          .inner{
            position: relative;
            font-size: 14px;
            padding: 22px 19px 22px 0;
            border-top: 1px solid #f4f4f4;
            .arrow{
              float: right;
              width: 22px;
              height: 22px;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAENklEQVR4Xu3dzW0TURTF8feClHXowIvYYukFyTolQAWYEqgASoAKCB3QAVnHkWAb2xIpwTTghybgKB8zztzxfNx3zvEO8oJ87//Hk5PNxKAX9QYi9fQaPggAOQIBEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4z+5ASaT03cxpVmKcb3ZbL6sVlcX5DvKdvyiZQjhzf8Bvi0Wl98fD/MAwGR88jXGOLt/aJPS++Vyfp7tFkjfeFnLsNl8uF5dfb6/kjsA4/HJ9CDGn2X7EoK8FJXGDyGklNaL5fxlKYDj49dnLw4OflSNKgR5IKiKv33314vLB7f+3R9ejaajdHj4e9eYQuAbwXPxU0p/Fsv5UekNUPzlZHL6KYbwUQh8hy57d8/FL74nhfD28QfBpz8FjE/OY4zFp8fKl24CX0DqxK9qVvqLoIkQ+Cq8493sE7/4Zyt/EygE/g3sG38ngNvPBLoJ3CpoI/6zAITAZ/+24tcCIAS+ELQZvzYAIfCBoO34JgBCMCyCLuKbAQjBMAi6it8IgBD0i6DL+I0BCEE/CLqOvxcAIegWQR/x9wYgBN0g6Ct+KwCEoF0EfcZvDYAQtIOg7/itAhCC/RAMEb91AELQDMFQ8TsBIAQ2BEPG7wyAENRDMHT8TgEIwW4EHuJ3DkAIyhF4id8LACF4iMBT/N4ACME/BN7i9wqAHYHH+L0DYEXgNf4gANgQeI4/GAAWBN7jDwoAHUEO8QcHgIogl/guAKAhyCm+GwAoCHKL7wpA7ghyjO8OQK4Ico3vEkBuCHKO7xZALghyj+8agHcECPHdA/CKACV+FgC8IUCKnw0ALwjQ4mcFYGgEiPGzAzAUAtT4WQLoGwFy/GwB9IUAPX7WALpGwBA/ewBdIWCJDwGgbQRM8WEAtIWALT4UgH0RMMaHA9AUAWt8SABWBMzxYQHURRBSuggxnhXnq17oT0eBfnRsnecdMMeHvgG2YZsiQP+fv90P9A3QFAFLfIobwIqAKT4VgDofDNni0wHYhYAxPiWAWwT3npBaPE41xDgre7T6rp8QUL5G8SGwKtZoND26ufm1RonZZA5qAE0WhvY9AoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxHgEwLgztuACgFTXOIwDGhaEdFwC0osZ5BMC4MLTjAoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxnr+aEMOu5NitsQAAAABJRU5ErkJggg==) 50% no-repeat;
              background-size: 60%;
              background-repeat: no-repeat;
              background-position: 50%;
              transform: rotate(-90deg);
            }
            span{
              float: right;
              max-width: 60%;
              color: #999;
              word-break: break-all;//允许在单词内换行。
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
</style>
