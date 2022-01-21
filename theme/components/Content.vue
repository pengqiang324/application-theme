<template>
<el-row>
    <el-col 
    :span="24"
    :style="{'min-height': startMinHeight ? minHeight : ''}" 
    :class="['content-box', {'content-box-min-height': startMinHeight}]">
        <slot name="tabs"></slot>
        <slot name="tool"></slot>
        <slot name="selection"></slot>
        <div class="content-table-box">
            <div :class="{'content-table-list': loading}">
                <slot></slot>
            </div>
            <div v-if="loading" class="spin-box">
                <Spin />
            </div>
        </div>
    </el-col>
</el-row>
</template>

<script>
import Spin from './Spin'
export default {
    name: 'Content',
    components: {
        Spin
    },
    props: {
        startMinHeight: {
            type: Boolean,
            default: false
        },
        minHeight: {
            type: String,
            default: '500px'
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang='scss'>
.content-box {
    padding: 24px;
    background: #fff;
}
.content-table-box {
    position: relative;
    .content-table-list {
        opacity: .3;
    }
    .el-table__header,
    .el-table__body {
        width: 100% !important;
    }
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
.spin-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>