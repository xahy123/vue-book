<template>
  <transition name="slide">
    <div class="info">
    <div class="page_header">
      <header class="header_bar">
        <span class="back" @click="back">
          <i class="icon"></i>
          <i>返回</i>
        </span>
        <a href="#" class="index">
          <i class="homePage"></i>
        </a>
        <h1>优质书源</h1>
      </header>
    </div>
    <div>
      <div class="chapter-detail">
        <div class="chapter-header">
          <div class="chapter-header-1">
            <h3 class="chapter-title">目录</h3> 
            <span class="chapter-title-desc">共{{bookList.length}}章</span>
          </div> 
          <span class="chapterBtn" @click='reverse'>倒序</span>
        </div>
        <div class="chapter-body">
          <ul class="chapter-list">
            <li v-for='i in bookList' :key='i.key' @click='text(i.link)'>{{i.title}}</li>
          </ul>
        </div>
      </div>
    </div>
    <router-view/>
    </div>
  </transition>
</template>

<script>
  
export default {
  data:function(){
    return{
      mulu:'',
      bookList:[],
      id:'',
      nList:[]
    }
  },
  created(){
    let x = this.$route.path.split('/')
    this.mulu = x[2]
    // console.log(x[2])
    this.getBooksInfo(`/api/atoc/${this.mulu}?view=chapters`)
    // console.log(this.bookList)
    // this.id = this.bookList[0]._id
    // this.$nextTick(function(){
    //   this.getBooksInfo(`/api/atoc/${this.id}?view=chapters`)
    // })
    // setTimeout(function(){ console.log(this.id) }, 3000);
  },
  methods:{
    back:function(){
      this.$router.back();
    },
    getBooksInfo(x){
      this.$axios.get(x).then((res) => {
        console.log(res)
        this.bookList = res.data.chapters
        let nList = []
        for(let i = 0;i<this.bookList.length;i++){
          this.nList.push({
            link:this.bookList[i].link
          })
        }
        // console.log(this.id)
      }).catch((error) => {
        // Toast({
        //   message: '暂无数据',
        //   duration: 2000
        // });
      })
      // console.log(this.nList)
      this.$store.commit('changePlayList',this.nList)
    },
    reverse(){
      return this.bookList.reverse()
    },
    text(x){
      // console.log(x)
      console.log(x)
      this.$router.push({path:`/bos/${encodeURIComponent(x)}`})
    }

  },
  
}
</script>

<style lang="less">
  .info{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 220;
    background: #fff;
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
    .chapter-detail{
      width: 100%;
      // padding: 16.5px 22px;
      font-size: 16px;
      margin-top: 48px;
      border-bottom: 1px solid #f8f8f8;
      .chapter-header{
        // width: 100%;
        padding: 16.5px 22px;
        // padding: 16.5px 0 16.5px 0;
        // margin-left: 16.5px;
        font-size: 16px;
        border-bottom: 1px solid #f8f8f8;
        .chapter-header-1{
          display: inline;
          .chapter-title{
            font-size: 14px;
            display: inline;
          }
          .chapter-title-desc{
            color: #999;
          }
        }
        .chapterBtn{
          margin-left: 190px;
          font-size: 16px;
        }
      }
      .chapter-body{
        .chapter-list{
          margin: 0;
          li{
            list-style: none;
            height: 55px;
            line-height: 55px;
            border-bottom: 1px solid #f8f8f8;
            font-size: 15px;
            color:#999;
          }
        }
      }
    }
  }
</style>
