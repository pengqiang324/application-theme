<template>
<div class="tool-box">
    <slot></slot>
    <div class="tool-right">
        <slot name="tool"></slot>
        <div class="tool-icon">
            <el-tooltip effect="dark" content="刷新表格" placement="top">
                <i @click="refreshData" class="el-icon-refresh-right"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="设置" placement="top">
                <el-dropdown placement="bottom" @command="handleCommand" trigger="click">
                    <i class="el-icon-setting"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="refresh">刷新应用</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-tooltip>
            <el-tooltip v-if="showInfo" effect="dark" placement="top">
                <i class="el-icon-question"></i>
                <slot name="info" slot="content"></slot>
            </el-tooltip>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'TableTool',

    inject: ["reload"],

    props: {
        showInfo: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        refreshData() {
            this.$emit('refresh') // 刷新表格数据
        },
        
        handleCommand(command) {
            if (command === 'refresh') {
                this.reload()
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.tool-box {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .tool-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 1;
        .el-icon-refresh-right,
        .el-dropdown,
        .el-icon-question {
            margin-left: 16px;
            font-size: 20px;
            cursor: pointer;
        }
    }
}
</style>