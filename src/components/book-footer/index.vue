<!-- 底部公共文件 -->
<!-- 底部公共文件 -->
<template>
  <div class="footer">
    <div class="footer-top">
      <div class="search">
        <div class="search-icon"></div>
        <input type="text" name="" placeholder="总裁" id="J_searchBottomKey">
        <div class="search-btn">
          <button id="J_searchBottom">搜索</button>
        </div>
      </div>
      <div class="category">
        <a><span>首页</span></a>
        <a><span>分类</span></a>
        <a><span>排行</span></a>
        <a><span>书单</span></a>
        <a><span>我的</span></a>
      </div>
      <div class="co-info" style="width:100%;margin:0 auto; padding:20px 0 0 0;">
        <a target="_blank" rel="nofollow" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202006103" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
          <img src="//www.zhuishushenqi.com/images/icon/recordIcon.png" style="float:left;">
          <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">沪公网安备 31011202006103号</p>
        </a>
      </div>
      <div class="co-info" style="padding: 0 0.3rem; line-height: 1.2;">上海元聚网络科技有限公司 增值电信业务经营许可证沪B2-20170022 网络文化经营许可证沪网文（2016）3206-227号 出版物经营许可证新出发沪批字第U7659号</div>
      <div class="co-info">客服电话：021-54393188-8048</div>
      <div class="cps-info" id="J_cpsInfo"></div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang='less' scoped>
  *{
    padding: 0;
    margin:0;
    list-style: none;
    box-sizing:border-box;
  }
  .footer{
    background: #f4f4f4;
    width: 100%;
  }
  .footer-top{
    padding: 17.5px 0 12.5px;
    width: 100%;
  }
  .search {
    position: relative;
    padding: 0 15px;
    margin-bottom: 15px;
    display: inline-block;
    width: 100%;
  }
  .search-icon {
    position: absolute;
    top: 0;
    left: 15px;
    width: 30px;
    height: 30px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJFMUVBRDIzN0VGMzExRTY4QjYzODBEQTAyQkM5N0UyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJFMUVBRDI0N0VGMzExRTY4QjYzODBEQTAyQkM5N0UyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkUxRUFEMjE3RUYzMTFFNjhCNjM4MERBMDJCQzk3RTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkUxRUFEMjI3RUYzMTFFNjhCNjM4MERBMDJCQzk3RTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4C8jWDAAACC0lEQVR42qyVTUhUURiGj9OgRRCCyEhGFOSiUCMEIVtUSysptFaWhrizDAS1kog22aIQHXAhROJCLAhBFIzKWrRIcGEgIrRLR6IUwQT78+c58A5c8NyZ68y88HC/udwz7znfd853smKxmHFoD1TCRTgPhyEHfsAXeAMvYdEEUJbDxP5xFxQlGfsX+uA+/Er0YchrCE9hVAaz0AolsF+rOwhXYVBjb8EUHAu6kk64qxm2QRQ2E4wthldwHBbgtJ6+K6mWwQZcgu4kBlYzUA6TcEg1CvmZ5ChNVu3w1gTXGlTBd6iA634mNXAU5rSC3eonPFDc4mdyRfFz+G9S0xD8gZNwxGVySvGESV1rqo3RbtxhUqh43qSnb3pGXCa/FW+labJXz02XSbw1nEjTpMgvI9bkg+LLaRjYc1Kqc/bZZfJacQPkpWjSrLY06upj1uSjdlYuPEvB4AzcUS2eJGort2EV6uGxZhVEZTAM2TDgSpXXxHbcGzqM92AsSavP1sQ+Qb7e2c5xLsh9claNLqIivod38FUnOqL02CZaoDHLnlquwzVNMuGlZQc/hJueve+SPeEduinHlbr4ZVanyfqaxGU3wgUNjuj3EkxrdTOebw/AiDJhlIVG6E9mslvt0+yrPB3E7rpo2GRO6yr+C6jVDu2xqwyZzOqf6tHreRcOm8zLHsomWFFtHm0LMAD6K3rQvKojnwAAAABJRU5ErkJggg==) no-repeat;
    background-size: 50%;
    background-position: 50%;
  }
  .search input {
    float: left;
    width: 82%;
    height: 30px;
    padding-left: 30px;
    border: 1px solid #ebebeb;
    border-radius: 2px;
    -webkit-appearance: none;
    line-height: 30px;
  }
  .search-btn {
    width: 14.5%;
    display: inline-block;
    padding-left: 5px;
    position: absolute;
    right: 15px;
  }
  .search-btn button {
    width: 90%;
    height: 30px;
    border-radius: 2px;
    border: 1px solid #ebebeb;
    background: #fff;
  }
  .category {
    width: 100%;
    height: 30px;
  }
  .category a {
    height: 30px;
    padding-top: 9px;
    float: left;
    display: block;
    width: 20%;
    color: #333;
    font-weight: 600;
    font-size: 12px;
    text-align: center;
  }
  .category a span {
    width: 100%;
    display: inline-block;
  }
  .co-info {
    margin-top: 15px;
    color: #999;
    text-align: center;
    font-size: 10px;
  }
</style>
