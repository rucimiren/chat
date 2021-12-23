import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'tailwindcss/utilities.css'
import '@/assets/css/index.css'

import { Button } from 'vant'

// 常用的组件
;[Button].forEach(comp => {
  Vue.component(comp.name, comp)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
