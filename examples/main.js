import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import ApplicationTheme from '../packages'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(ApplicationTheme)
import '../theme/index.css'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
