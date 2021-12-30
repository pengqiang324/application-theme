<template functional>
<el-row>
    <slot 
    :sizes="[10, 20, 30, 40]"
    layout="total, prev, pager, next, sizes"
    ></slot>
</el-row>
</template>

<script>
export default {
    name: 'Pagination'
}
</script>

<style lang='scss' scoped>
  
</style>