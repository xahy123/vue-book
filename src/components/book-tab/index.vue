<template>
  <div class="book-tab">
    <router-link class="router-link" to="/selection"><span>精选</span></router-link>
    <router-link class="router-link" to="/vip"><span>VIP</span></router-link>
    <router-link class="router-link" to="/sort"><span>分类</span></router-link>
    <router-link class="router-link" to="/ranking"><span>排行</span></router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
  .book-tab{
    height: 44.2px;
    padding: 0 8.3px 0 8.3px;
    background: #b93321;
    position: relative;
    font-size: 0;
    .router-link{
      display: inline-block;//行内块，使块级元素不独占一行
      vertical-align: middle;//垂直居中
      font-size: 0;
      height: 100%;
      width: 25%;
      color: #ddada9;
      &.router-link-active{
        color: #fff;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAYAAAA/33wPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMUREMTRDN0VEQzExRTY4MDhFOTYxMEFDOUQ4NzlEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMUREMTREN0VEQzExRTY4MDhFOTYxMEFDOUQ4NzlEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQxREQxNEE3RURDMTFFNjgwOEU5NjEwQUM5RDg3OUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQxREQxNEI3RURDMTFFNjgwOEU5NjEwQUM5RDg3OUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz70OOl0AAAAR0lEQVR42qTMWwoAIAhE0Vq5tvKJoOhBjVkXxJ/hRADBSOpPdFUgcoKesO0tYmIehGJe5Ii9IFtsRBT+ZIVekAn7RVqaBRgAaNQCGVu5WU4AAAAASUVORK5CYII=) no-repeat;
        background-size: 9.9px 4.0px;
        background-position: bottom;
      }
      span{
        display: inline-block;
        width: 100%;
        height: 29px;
        line-height: 29px;
        margin-top: 8.28px;
        text-align: center;
        font-size: 14px;
      }
    }
  }
</style>
