<template functional>
<el-row>
    <el-col 
    :span="24"
    :style="{'min-height': props.startMinHeight ? props.minHeight : ''}" 
    :class="['content-box', {'content-box-min-height': props.startMinHeight}]">
        <slot></slot>
    </el-col>
</el-row>
</template>

<script>
export default {
    name: 'Content',
    props: {
        startMinHeight: {
            type: Boolean,
            default: false
        },
        minHeight: {
            type: String,
            default: '500px'
        }
    }
}
</script>

<style lang='scss'>
.content-box {
    padding: 24px;
    background: #fff;
}
.content-box-min-height {
    .el-dialog__wrapper{
        overflow: hidden;
    }
    .el-dialog__body {
        max-height: 390px;
        overflow-y: auto;
        box-sizing: border-box;
    }
}
</style>