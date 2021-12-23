import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'tailwindcss/utilities.css'
import '@/assets/css/index.css'

import { Button, NavBar, Icon, Field, Cell, CellGroup } from 'vant'

// 常用的组件
;[Button, NavBar, Icon, Field, Cell, CellGroup].forEach(comp => {
  Vue.component(comp.name, comp)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
