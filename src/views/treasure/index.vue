<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="./1.jpg" width="100%">
      </div>
      <div class="swiper-slide">
        <img src="./2.jpg" width="100%">
      </div>
      <div class="swiper-slide">
        <img src="./3.jpg" width="100%">
      </div>
      <div class="swiper-slide">
        <img src="./4.jpg" width="100%">
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
export default {

  methods:{
  	jsonData:function(){
  		console.log(32423)
  		let url = '/api/cats/lv2/statistics'; // 这里就是刚才的config/index.js中的/api
      this.$axios.get(url).then((res) => {
      	console.log(res)
      }).catch((error) => {
      	console.log(error)
      })
  	}
  },
  mounted(){
    var mySwiper = new Swiper('.swiper-container', {
      autoplay:true,
      loop:true
    })
  }
}
</script>

<style lang="less" scoped>
  // .swiper-container{
  //   width: 100%;
  //   height: 132.6px;
  //   .swiper-wrapper{
  //     display: block;
  //     height: 100%;
  //     width: 100%;
  //     overflow: hidden;
  //     .swiper-slide{
  //       img{
  //         width: 100%;
  //         height: 132.6px;
  //       }
  //     }
  //   }
  // }
</style>
