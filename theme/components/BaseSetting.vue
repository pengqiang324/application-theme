<template functional>
<el-row class="base-setting-box">
    <h2 v-if="!props.closeTitle" class="base-setting-title">{{ props.title }}</h2>
    <el-col 
    :span="props.span">
        <slot></slot>
    </el-col>
</el-row>
</template>

<script>
export default {
    name: 'BaseSetting',
    props: {
        title: {
            type: String,
            default: '基本设置'
        },
        closeTitle: {
            type: Boolean,
            default: false
        },
        span: {
            type: Number,
            default: 12
        }
    }
}
</script>

<style lang='scss' scoped>
.base-setting-box {
    padding: 24px;
    background: #fff;
}
.base-setting-title {
  margin-bottom: 12px;
  padding: 0 0 12px;
  line-height: 28px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
</style>