
const version = "0.5.7"
const modulesFiles = require.context('../theme/components', true, /\.vue$/)

// 定义 install 方法。
const install = (Vue) => {
    // 注册组件
    modulesFiles.keys().map((componentPath) => {
        const component = modulesFiles(componentPath).default
        Vue.component(component.name, component)
    })
}

// 判断是否全局引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    // 导出对象必须有 install，才能被 Vue.use() 方法注册
    install,
    version
}