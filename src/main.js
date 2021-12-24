import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'tailwindcss/utilities.css'
import '@/assets/css/index.css'
/* import VueSocketIO from 'vue-socket.io'
Vue.use(
  new VueSocketIO({
    // debug: true,
    // 服务器端地址
    connection: 'http://10.13.156.112:3000',
    // connection: '/socket.io',
    // vuex: {},
  }),
) */
const io = require('socket.io-client/dist/socket.io')
window.socket = io('http://10.13.156.112:3000')
// window.socket = io('/socket.io')

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
