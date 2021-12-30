<template functional>
<div class="empty">
    <Empty class="empty-icon"/>
    <p class="empty-text">暂无数据</p>
</div>
</template>

<script>
import Empty from './Empty.vue'
export default {
    name: 'DefaultEmpty',
    components: {
        Empty
    }
}
</script>

<style lang='scss' scoped>
.empty {
    margin: 32px 0;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
   .empty-text {
       color: rgba(0, 0, 0, 0.25);
    }
}
</style>