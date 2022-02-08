<template>
<div class="tool-box">
    <slot></slot>
    <div class="tool-right">
        <slot name="tool"></slot>
        <div class="tool-icon">
            <el-tooltip effect="dark" content="刷新" placement="top">
                <i @click="refreshData" class="el-icon-refresh-right"></i>
            </el-tooltip>
            <el-tooltip v-if="showRefresh" effect="dark" content="应用管理" placement="top">
                <el-dropdown placement="bottom" @command="handleCommand" trigger="click">
                    <i class="el-icon-monitor"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="refresh">刷新应用</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-tooltip>
            <el-tooltip v-if="showInfo" effect="dark" placement="top">
                <i class="el-icon-question"></i>
                <slot name="info" slot="content"></slot>
            </el-tooltip>
            <el-tooltip v-if="showSetting" effect="dark" content="列设置" placement="top">
                <el-popover
                placement="bottom-end"
                trigger="click"
                popper-class="setting-popover">
                    <i class="el-icon-setting" slot="reference"></i>
                    <div class="setting-checkbox-list">
                        <div class="setting-checkbox-top">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">列展示</el-checkbox>
                            <el-button type="text" @click="handleReset">重置</el-button>
                        </div>
                        <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
                            <div class="setting-checkbox-group">
                                <div v-for="item in tableHeadList" :key="item" class="setting-checkbox-option">
                                    <i class="el-icon-menu setting-checkbox-icon" style=""></i>
                                    <el-checkbox :label="item">{{ item }}</el-checkbox>
                                </div>
                            </div>
                        </el-checkbox-group>
                    </div>
                </el-popover>
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
        },

        showSetting: {
            type: Boolean,
            default: true
        },

        showRefresh: {
            type: Boolean,
            default: true
        },

        queryDom: {
            type: String,
            default: 'body'
        }
    },

    data() {
        return {
            isIndeterminate: false,
            checkAll: true,
            checkList: [],
            tableHeadList: [],
            thList: [],
            diffLabels: []
        }
    },

    mounted() {
        if (this.showSetting) {
            this.getCheckList()
        }
    },

    methods: {
        getCheckList() {
            this.$nextTick(() => {
                const queryDom = (this.queryDom === 'body' || this.queryDom.startsWith('.')) ? this.queryDom : `.${this.queryDom}`
                const oHeader = document.querySelector(`${queryDom} .el-table__header`)
                const oTableTH = oHeader.getElementsByClassName('is-leaf')
                const transformDomArr = [...oTableTH]
                transformDomArr.forEach(dom => {
                    const thChildren = dom.children[0]
                    const labelChildren = thChildren.children[0]
                    const childrenText = thChildren && thChildren.innerHTML
                    if (!labelChildren && childrenText) {
                        this.tableHeadList.push(childrenText)
                        this.thList.push(dom)
                    }
                })
                this.checkList = this.tableHeadList
            })
        },

        refreshData() {
            this.$emit('refresh') // 刷新表格数据
        },
        
        handleCommand(command) {
            if (command === 'refresh') {
                this.reload()
            }
        },

        handleCheckAllChange(val) {
            const changeList = val ? [] : this.tableHeadList
            this.checkList = val ? this.tableHeadList : []
            this.isIndeterminate = false
            this.$emit('checkChange', changeList)
        },

        handleCheckedChange(value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.tableHeadList.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableHeadList.length
            this.diffLabels = []
            this.tableHeadList.forEach((item) => {
                const index = value.findIndex(newItem => newItem === item)
                if (index < 0) {
                    this.diffLabels.push(item)
                }
            })
            this.$emit('checkChange', this.diffLabels)
        },

        handleReset() {
            this.checkList = this.tableHeadList
            this.checkAll = true
            this.isIndeterminate = false
            this.$emit('checkChange', [])
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
        
        .el-tooltip {
            margin-left: 16px;
            font-size: 20px;
            cursor: pointer;
        }
    }
}
.setting-checkbox-list {
    .setting-checkbox-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 16px 10px 26px;
        border-bottom: 1px solid #e8e8e8;
    }
}

.setting-checkbox-group {
    padding: 4px 0 4px 3px;
    .setting-checkbox-option {
        padding: 5px 16px 5px 4px;
        display: flex;
        align-items: center;
    }
    .setting-checkbox-icon {
        font-size: 13px;
        margin-right: 6px;
        color: rgba(223, 222, 222, 1);
    }
}
</style>

<style lang="scss">
.setting-popover {
    padding: 0 !important;
}
</style>