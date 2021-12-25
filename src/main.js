import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'tailwindcss/utilities.css'
import '@/assets/css/index.css'
// 连接socket
const io = require('socket.io/client-dist/socket.io.js')
window.socket = io('http://localhost:3000')

import { Button, NavBar, Icon, Field, Cell, CellGroup, Form } from 'vant'

// 常用的组件
;[Button, NavBar, Icon, Field, Cell, CellGroup, Form].forEach(comp => {
  Vue.component(comp.name, comp)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
