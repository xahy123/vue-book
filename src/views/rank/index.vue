<template>
  <div class="page-ranking-wraper" ref="page_ranking_wraper">
  	<div class="ranking-contain">
      <div class="ranking-header">
        <h3>男生</h3>
      </div>
      <div class="ranking-body">
        <ul class="ranking-list">
          <li v-for='item in boy' :key='item.key'>
            <a  @click="rank(item._id,item.monthRank,item.totalRank)">
              <img :src="item.cover" />
              <span>{{item.title}}</span>
            </a>
          </li>
          <li class="other" @click="del">
            <a  >
              <i class="other_img"></i>
              <span >别人家的排行榜</span>
              <i class="rank-icon"  ></i>
            </a>
          </li>
          <mt-popup position="right" v-model='dis' class="popup" v-show='isShow'>
            <ul>
              <li v-for='item in boyOther' :key='item.key' >
                <a @click="rank(item._id,item.monthRank,item.totalRank)">
                  <span>{{item.title}}</span>
                </a>
              </li>
            </ul>
          </mt-popup>
        </ul>
      </div>
      <div class="ranking-header">
        <h3>女生</h3>
      </div>
      <div class="ranking-body">
        <ul class="ranking-list">
          <li v-for='item in girl' :key='item.key'>
            <a @click="rank(item._id,item.monthRank,item.totalRank)">
              <img :src="item.cover" />
              <span>{{item.title}}</span>
            </a>
          </li>
          <li class="other" @click="del2">
            <a >
              <i class="other_img"></i>
              <span >别人家的排行榜</span>
              <i class="rank-icon" ></i>
            </a>
          </li>
          <mt-popup position="bottom" v-model='dis2' class='popup2' ref='popup2' v-show='isShow'>
            <ul>
              <li v-for='item in girlOther' :key='item.key' >
                <a @click="rank(item._id,item.monthRank,item.totalRank)">
                  <span>{{item.title}}</span>
                </a>
              </li>
            </ul>
          </mt-popup>
        </ul>
      </div>
      <footer-book class='foot'/>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import footerBook from '@/components/book-footer'
export default {
	data:function(){
		return {
			boy:[],
      boyOther:[],
      girlOther:[],
      girl:[],
      dis:false,
      dis2:false,
      isShow:false
		}
	},
	created(){
    this.getRank()
	},
	methods:{
    getRank:function(){
      let url = '/api/ranking/gender';
      this.$axios.get(url).then((res) => {
        console.log(res)
        this.boy = res.data.male.splice(0,7);
        // console.log(this.boy)
        this.boyOther = res.data.male;
        this.girlOther = res.data.female;
        console.log(this.boyOther)
        for(let i = 0 ;i < this.boy.length;i++){
          this.boy[i].cover = `http://statics.zhuishushenqi.com${this.boy[i].cover}`
        }
        // console.log(this.boy)
        this.girl = res.data.female.splice(0,7);
        for(let i = 0 ;i < this.girl.length;i++){
          this.girl[i].cover = `http://statics.zhuishushenqi.com${this.girl[i].cover}`
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    del:function(){
      this.dis = true
    },
    del2:function(){
      this.dis2 = true
    },
    rank(zhou,yue,zong){
      this.isShow = true
      this.$router.push({path:`/ranking/${zhou}/${yue}/${zong}`})
    }
	},
  // mounted(){
  //   this.$nextTick(() => {
  //     this.scroll = new BScroll(this.$refs.page_ranking_wraper,{
  //       click: true, tap: true
  //     })
  //   })
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
 .page-ranking-wraper{
    position: fixed;
    left: 0;
    top: 110px;
    bottom: 0;
    width: 100%;
    overflow-y:auto;
    .ranking-contain{
      .foot{
        padding-bottom: 80px;
      }
      .ranking-header{
        h3{
          padding-left: 16.5px;
          height: 60px;
          line-height: 60px;
          font-weight: 400;
          color: #999;
          background-color: #e6e6e6;
          font-size: 12px;
        }
      }
      .ranking-body{
        ul{
          padding-left: 0;
          .popup{
            position: absolute;
            top: 437px;
            bottom: 0;
            width: 100%;
            height: 598px;
            ul{
              
            }
          }
          .popup2{
            position:fixed;
            top:340px;
            bottom:0;
            width:100%;
            height:400px;
          }
          li{
            list-style: none;
            a{
              text-decoration: none;
              img{
                float: left;
                width: 33px;
                height: 33px;
                margin: 16.5px 0 0 16.5px;
              }
              span{
                display: block;
                color: #333;
                font-size: 14px;
                font-weight: 500;
                height: 100%;
                line-height: 66px;
                margin-left: 60.7px;
                border-bottom: 1px solid #999;
              }
            }
          }
          .other{
            position: relative;
            a{
              height: 66.3px;
              display: block;
            }
            .other_img{
              float: left;
              width: 33px;
              height: 33px;
              margin: 16.5px 0 0 16.5px;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEyNTc1NkJCNzBBRDExRTZBNzlCOUJEOTEyRjMzQjc1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEyNTc1NkJDNzBBRDExRTZBNzlCOUJEOTEyRjMzQjc1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTI1NzU2Qjk3MEFEMTFFNkE3OUI5QkQ5MTJGMzNCNzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTI1NzU2QkE3MEFEMTFFNkE3OUI5QkQ5MTJGMzNCNzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5jN6HRAAADmUlEQVR42uSbXUgUURTHj5vYi7YRFZQR+FZIRCVGouVXYBSCmgb6nlARvvhuPUYQJCVF0IsUFBZIbVn2oVmWbBCU9JYQUSAWm/miqXX+zJllXa3Z2Zm7O3PnD39wl7t3zg/nfp+b86ejhhQpzN7HLmEXs4vYhey17HwpM8OOsb+yP7HH2VH2KPuniqByXa5vC/sYu5G9l73Kony+GL8rTfh+gf2GfYd9m/3ZrQBzXPoP72d3sg+lAGlXgH/APs8eclpZyOHvK9nDEsgRBbAkdaLu5/KsymwAb2L3sp+xKyhzqpBn9koMGQFuZn9kt1H21CYxNKsEzmN3s29JD5xthSUWxLTabeACdoR9irwnxPSIvc4t4A3SbmrIu8Io8VRidQSM1+Yhew95XzvZA1bNLWTRZjHw7yb/aJfEnJcO8AV2NflP1RK7LWB09yfIv0LsLakCY4J/lfyvKzJHtwTulhWN3wWGi1bAVewG0kcNycNpMvBZ0k9d/wLG4F2uIXC5sC0D7iR91ZkMvJFdpzFwnTDGgVvJ/e0eLylXGOPATaS/mkxgc3dRd4ExDOAyUrMX5TWBsSzks9WQU5UAeEeAgIsBXBQg4CJ015udtw6upr6dX5ha43N0kKifFysL82rL2Vdhrisro/rjPHlLWHPg79+zRPeuqS1nX2vwSuc77woOrjAIHFZfzr4KQhQszQF4xnE10cfLv3sdUV/OvmbQhmOOX+t+7AjlLO1kItfVl7OvXzguxTlsaUBe6TG80hMBasMTAP4QIOBxAL8NEHAUwK/ISCvQXWAcBTCyZUYDAAzGmDnx6AsAcJ+54wHdYM9rDDsvjHHgSTLOVnXVgDAu2Zc+pzFwnC0RGDlQIxrCjgjbMmCoS0PgM4kfkoGfsO9qBAuWwf8BQ6dlBeV3xYSFrIC/sNs1AG4XFktgCBluPT6G7REGShUY6iAjg9VvGpbYyS7wHPso+72PYBFro8RuGxj6zsY+yzufwNZKzJQusDntPEBGvqVX9YKMxPFJq4KpbtNOk5Hef8mDsJfZ2Mj+kUphO/vSs2Sk6raQohsnNjUtsZyU2MhtYFO4ZbLdXG5lSTfZ2yQWW0r35OEbGWn4VRlecLwkI3m0VWKgTAGbwjhdIR3GffaiAshFqRvPKHfaebqVuTMk3irtCmMhNvfTTaXAhtsYGbnPmDF57qLWSkq8iocsAxy8r6eVr+JNkXEggLFU6VW8vwIMANG61WyEcdbpAAAAAElFTkSuQmCC) no-repeat;
              margin-left: 16.5px;
              background-size: 100%;
            }
            span{
              border-bottom:0px;

            }
            .rank-icon{
              float: left;
              display: inline-block;
              position: absolute;
              right: 16.5px;
              top: 0;
              width: 16.5px;
              height: 66px;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAED0lEQVR4Xu3dTVrbMBCAYbt34Qhdl96E3gRO0vY6sKFbs+EIXYeF+wQaCElsjX4sjWa+bispjr83dqJAOw78qXIGrq6+3ozD8G16evhR5QGFDzIKxzEs4wzs438Zx5/7JeZ5/qUJAQAywkqmHsc/jNeEAACSioljLsXXhgAAiXFD09bia0IAgFDJhL+XxNeCAAAJgdemxMTXgAAABQGkxG+NAACFAOTEb4kAAAUAlIj/jmAY7qbp/rbAYYmWAIDoNC0PKhz/z263u35+fvybeVji6QAQn6rzgb3H3z8jACQCsBAfAM7jAyABgJVX/uGpcwuIQGAtPlcA5/EBIARg8ZXPLYD4r2eA9wArECy/8rkCBK4AHuJzBVhA4CU+AC4A8BQfACcAvMUHwBEAj/EB8B+A1/gAGIbBc3z3ALzHdw2A+G/3P5c7gcT/ePfrDgDxP3/2dQWA+Oc7X24AEP/yvrcLAMRf/ubLPADir3/taRoA8cM/9WIWAPHD8c3uAxBfFt8kAOLL45sDQPy4+KYAED8+vhkAxE+LbwIA8dPjdw+A+HnxuwZA/Pz43QIgfpn4XQIgfrn43QEgftn4XQEgfvn43QAg/jbxuwBA/O3iqwdA/G3jqwZA/O3jqwVA/DrxVQIgfr346gAQv258VQCIXz++GgDEbxNfBQDit4vfHADx28ZvCoD47eM3A0B8HfGbACC+nvjVARBfV/y+Aczz4+7l5XvN/2FLX778I6r+y6FFrwIgyBZQHcD+iEGQ3a3YAk0AgKBYv+yFmgEAQXa7Igs0BQCCIg2zFmkOAARZ/bInqwAAguyOyQuoAQCC5IZZE1UBAEFWy6TJ6gCAIKlj8iSVAECQ3DN6oloAIIhumTRBNQAQJDWNmqQeAAiiekYP7gIACKK7iid0AwAE4qZRA7sCAIKotqLB3QEAgaireFCXAEAg7hsc2C0AEATbigZ0DQAEosarg7oHAII8BCYAgCAdgRkAIEhDYAoACOIRmAMAgjgEJgGAQI7ALAAQyBCYBgCCMALzAECwjsAFABAsI3ADAASXEbgCAIJzBO4AgOAzApcAQPCBwC0AELwhcA0ABAB4fRV4/jeL3F8BDndDrwgAcPSm2CMCAJx8NPaGAAAXNsg8IQDAwja5FwQAWPmyzAMCAAS+MreOAADhn5kwvU8AAAEAy5tFABACsIoAABEALCIAQCQAawgAkADAEgIAJAKwggAAGQAsIABAJoDiCIbhbprubwsclmgJAIhOU3hQiR3DeZ5/T08PN+FHKzcCAOXOZdaOYYv4+6cOgIIAUm8HreIDoHD8w3Ixt4OW8QGwEQDplaB1fABsCCCEQEN8AGwMYAmBlvgAqADgFIGm+ACoBOCAYByG69qf80NP8R9w8jjMANtJTgAAAABJRU5ErkJggg==) no-repeat;
              background-size: 80%;
              transform: rotate(-90deg);
            }
          }
        }
      }
    }
 }
</style>
