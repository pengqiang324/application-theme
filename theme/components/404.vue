<template>
<div class="wscn-http404-container">
    <div class="wscn-noFind">
      <NoFound/>
      <h2 class="wscn-noFind-title">404</h2>
      <p class="wscn-noFind-text">很抱歉，你访问的页面不存在</p>
    </div>
  </div>
</template>

<script>
import NoFound from './NoFound.vue'
export default {
    name: 'NoFind',
    components: {
        NoFound
    }
}
</script>

<style lang="scss" scoped>
.wscn-http404-container{
  transform: translate(-50%,-50%);
  position: absolute;
  top: 40%;
  left: 50%;
  display: flex;
  align-items: center;
}
.wscn-noFind {
  position: relative;
  top: 12px;
  .wscn-noFind-title {
    font-size: 30px;
    text-align: center;
    padding: 30px 0 10px;
  }
  .wscn-noFind-text {
    font-size: 18px;
    text-align: center;
  }
}
</style>