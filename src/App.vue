<template>
  <div id="app">
    <!-- 头部组件 -->
    <BookHeader/>
    <!-- 选项卡公共组件 -->
    <BookTab/>
    <router-view/>
  </div>
</template>

<script>
import BookHeader from '@/components/book-header';
import BookTab from '@/components/book-tab';
export default {
  components:{
    BookHeader,
    BookTab
  }
}
</script>

<style>
  body{
  	margin: 0;
  	padding: 0;
  }
</style>
