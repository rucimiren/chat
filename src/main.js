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

import {
  Button,
  NavBar,
  Icon,
  Field,
  Cell,
  CellGroup,
  Form,
  Uploader,
  Toast,
} from 'vant'

// 常用的组件
;[Button, NavBar, Icon, Field, Cell, CellGroup, Form, Uploader].forEach(
  comp => {
    Vue.component(comp.name, comp)
  },
)
Vue.prototype.$toast = Toast

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
