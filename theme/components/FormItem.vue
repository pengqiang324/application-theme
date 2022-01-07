<template functional>
<el-row>
    <el-form-item :label="props.label" :prop="props.prop">
        <el-col :span="23" class="form-margin">
            <slot></slot>
        </el-col>
    </el-form-item>
</el-row>
</template>

<script>
export default {
    name: 'FormItem',
    props: {
        label: {
            type: String,
            required: true
        },
        prop: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang='scss' scoped>
.form-margin {
  padding: 0;
}
</style>