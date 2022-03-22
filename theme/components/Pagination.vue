<template functional>
<el-row class="pagination-box">
    <span v-if="!props.hideTotal && props.total" class="pagination-number">{{ (props.current - 1) * props.pageSize + 1 }}-{{ props.current * props.pageSize > props.total ? props.total : props.current * props.pageSize }}</span>
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
.pagination-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .pagination-number {
        line-height: 28px;
        margin-right: 2px;
        display: block;
        color:#606266;
        font-size: 13px;
    }
} 
</style>