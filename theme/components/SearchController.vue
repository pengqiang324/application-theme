<template>
<el-col :span="spanCol" class="search-controller-box">
    <el-form-item class="search-form-item">
        <slot></slot>
        <el-button 
            v-if="isOpen" 
            type="text" 
            class="search-controller-tool"
            @click="handleOpen"
        >
            {{ toolText }}
            <i v-if="!needOpenStatus" class="el-icon-arrow-down search-controller-icon"/>
            <i v-else class="el-icon-arrow-up search-controller-icon"/>
        </el-button>
    </el-form-item>
</el-col>
</template>

<script>
export default {
    name: 'SearchController',

    props: {
        index: {
            type: Number,
            default: 0
        },

        refresh: {
            type: Boolean | Number,
            default: false
        }
    },

    data() {
        return {
            spanCol: 8,
            toolText: '展开',
            isOpen: false,
            needOpenStatus: false,
            key: Math.random() * 1000
        }
    },

    watch: {
        // 手动刷新
        refresh(val) {
            if (val) {
                this.needOpenStatus = true
                this.setDisplay(this.inputList, 'block')
                this.computeCol()
                this.handleOpen()
            }
        }
    },

    mounted() {
        this.computeCol()
    },

    methods: {
        computeCol() {
            const oBox = document.querySelectorAll('.search-box')[this.index]
            const oCol = oBox.querySelectorAll('.el-col')
            this.parentDOM = oBox.querySelector('.el-row')
            this.inputList = oCol
            if (oCol.length >= 4) {
                this.isOpen = true
                this.setDisplay(oCol)
            } else {
                this.isOpen = false
            }
        },
        handleOpen() {
            if (this.needOpenStatus) {
                this.needOpenStatus = false
                this.toolText = '展开'
                this.spanCol = 8
                this.setDisplay()
            } else {
                this.needOpenStatus = true
                this.toolText = '收起'
                this.spanCol = 24
                this.setDisplay(this.inputList, 'block')
            }
        },

        setDisplay(DOMList=this.inputList, diaplayType='none') {
            DOMList.forEach((item, i) => {
                if (i > 1 && i < DOMList.length-1) {
                    item.style.display = diaplayType
                }
            })
        }
    }
}
</script>

<style lang='scss'>
.search-controller-box {
    .search-controller-tool {
        margin-left: 8px;
    }
    .search-controller-icon {
        position: relative;
        top: 1px;
        left: 2px;
        font-size: 18px;
    }
    &.el-col-24 {
        .search-form-item {
            .el-form-item__content {
                text-align: right;
            }
        }
    }
}
</style>