<template functional>
<el-tooltip :content="props.content" :placement="props.placement">
  <p class="tooltip-text">{{ props.content && props.content.length > 10 ? `${props.content.slice(0, 10)}...` : props.content }}</p>
</el-tooltip>
</template>

<script>
export default {
    name: 'ToolTip',
    props: {
        content: {
            type: String,
            default: ''
        },
        number: {
            type: Number,
            default: 10
        },
        placement: {
            type: String,
            default: 'top'
        }
    }
}
</script>

<style lang='scss'>
.el-tooltip__popper {
    max-width: 240px;
}
</style>

<style lang="scss" scoped>
.tooltip-text {
    margin: 0;
}
</style>