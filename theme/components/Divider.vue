
<script>
function DividerCommand(childVNode) {
    return function(command) {
        const filterVNode = childVNode.filter(VNode => VNode.text === command)
        if (filterVNode.length) {
            const event = filterVNode[0].event
            if (command !== '删除' && event.click) {
                event.click() // 执行对应操作业务
            }
        }
    }
}

function handleDelOption(h, dom, props, isMore=false) {
    let children = [
        h(
            isMore ? 'span' : 'el-button', 
            { class: { 'table-button': !isMore }, on: isMore ? {} : { ...dom.event }, props: { ...dom.propsData } }, 
            dom.text
        )
    ]
    if (dom.text === '删除') {
        children = [
            h(
                'el-popconfirm',
                {
                    props: { title: props.delTitle || '确认删除?', cancelButtonType: '', icon: 'el-icon-warning', iconColor: '#faad14' },
                    attrs: { placement: 'top-end' },
                    on: {
                        confirm: dom.event.click
                    }
                },
                [
                    h(
                        isMore ? 'span' : 'el-button',
                        {
                            props: { ...dom.propsData },
                            slot: 'reference'
                        },
                        dom.text
                    )
                ]
            )
        ]
    }
    return children
}
export default {
    name: 'Divider',
    functional: true,
    render(h, context) {
        const Props = context.props
        const Children = context.children
                        .filter(item => {
                            if (item.componentOptions) { // 按钮使用 v-if 指令判断
                                const Directives = item.data.directives
                                if (Directives) {
                                    const haveShowDirectives = Directives.filter((directives) => directives.name === 'show') // // 按钮使用 v-show 指令判断
                                    if (haveShowDirectives.length) return haveShowDirectives[0].value
                                }
                                return true
                            }
                        })
                        .map(item=> {
                            const { listeners, children, propsData } = item.componentOptions
                            return {
                                event: listeners,
                                text: children[0].text,
                                propsData
                            }
                        })
        // 创建默认操作选项
        const createDefaultVDOM = function (dom, index) {
            const children = handleDelOption(h, dom, Props)
            return (
                [
                    children,
                    h('i', { class: (index === Children.length - 1) ? '' : 'table-divider' }, '')
                ]
            )
        }
        // 创建更多操作选项
        const createMoreVDOM = function (haveMoreChildren) {
            return (
                [
                    h('el-dropdown', { props: { placement: 'bottom' }, on: { command: DividerCommand(haveMoreChildren) } }, [
                        h('span', { class: 'el-dropdown-link' }, [
                            '更多',
                            h('i', { class: 'el-icon-arrow-down' })
                        ]),
                        h('el-dropdown-menu', { slot: 'dropdown' }, haveMoreChildren.map(children => {
                            const Children = handleDelOption(h, children, Props, true)
                            return h('el-dropdown-item', { props: { command: children.text } }, Children)
                        }))
                    ])
                ]
            )
        }
        let renderDOM = null
        const Number = Props.number || 2
        // 数量超过 2 的操作选项
        if (Children.length <= Number) {
            renderDOM = Children.map((dom, index) => {
                return createDefaultVDOM(dom, index)
            })
        } else {
            const showMoreChildren = Children.slice(0, 2)
            const haveMoreChildren = Children.slice(1)
            renderDOM = showMoreChildren.map((dom, index) => {
                if (!index) {
                    return createDefaultVDOM(dom, index)
                } else {
                    return createMoreVDOM(haveMoreChildren)
                }
            })
        }
        return h(
            'div',
            renderDOM
        )
    }
}
</script>

<style lang='scss' scoped>
.table-button {
    font-size: 14px;
    font-weight: 500;
    color: #1890ff;
    cursor: pointer;
}
.table-button + .table-button {
    margin-left: 10px;
}
.table-divider {
    display: inline-block;
    width: 1px;
    height: 1em;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
    background: #dcdfe6;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    margin-left: 4px;
    position: relative;
    font-size: 12px;
}
</style>