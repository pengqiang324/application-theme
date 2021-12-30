<template>
<div class="selection-box">
    <el-alert
    type="info"
    show-icon
    :closable="false">
        <div slot="title">
            <label class="selection-text">已选择:&nbsp;<span class="selection-text-number">{{ number }}</span></label>
            <el-button 
            v-show="number" 
            type="text"
            @click="clearEmpty"
            style="margin-left: 24px;">清空</el-button>
        </div>
    </el-alert>
</div>
</template>

<script>
export default {
    name: 'Selection',
    props: {
        number: {
            type: Number,
            default: 0
        }
    },
    methods: {
        clearEmpty() {
            this.$emit('clearEmpty')
        }
    }
}
</script>

<style lang='scss'>
.selection-box {
    margin-bottom: 16px;
    border: 1px solid #91d5ff;
    .el-alert--info.is-light {
        background: #e6f7ff;
        color: #1890ff;
    }
    .selection-text {
        margin-right: 12px;
    }
    .el-alert__title {
        font-size: 14px;
        color: rgba(0,0,0,.85);
    }
    .selection-text-number {
        color: #1890FF;
        font-weight: 500;
    }
}
</style>