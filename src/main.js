import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'tailwindcss/utilities.css'
import '@/assets/css/index.css'
import VueClipboard from 'vue-clipboard2'

// 连接socket
const io = require('socket.io/client-dist/socket.io.js')
// window.socket = io('http://localhost:3000')
window.socket = io('http://192.168.2.233:3000')

Vue.use(VueClipboard)
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
  Popup,
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
  Popup,
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
