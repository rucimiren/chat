import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'tailwindcss/utilities.css'
import '@/assets/css/index.css'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VEmojiPicker from 'v-emoji-picker'
Vue.use(VEmojiPicker)

// 连接socket
const io = require('socket.io/client-dist/socket.io.js')
// window.socket = io('http://localhost:3000')
window.socket = io('http://39.107.98.235:3000')
// window.socket = io('http://192.168.2.233:3000')
// window.socket = io('http://10.13.152.42:3000')

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
  Image,
  Loading,
} from 'vant'

// 常用的组件
;[
  Button,
  NavBar,
  Icon,
  Field,
  Cell,
  CellGroup,
  Form,
  Uploader,
  Image,
  Loading,
].forEach(comp => {
  Vue.component(comp.name, comp)
})
Vue.prototype.$toast = Toast

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
