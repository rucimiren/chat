import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant'

import Home from '@/views/home.vue'

Vue.use(VueRouter)

// 处理异常问题
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login.vue'),
  },
  {
    path: '/userList',
    name: 'userList',
    component: () =>
      import(/* webpackChunkName: "userList" */ '../views/userList.vue'),
  },
  {
    path: '/modifyName',
    name: 'modifyName',
    component: () =>
      import(/* webpackChunkName: "modifyName" */ '../views/modifyName.vue'),
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach(async (to, from, next) => {
  document.title = '肖肖'
  const chatUserInfo = window.localStorage.getItem('chatUserInfo')
  if (to.path !== '/login') {
    if (!chatUserInfo) {
      next('/login')
      return
    } else {
      if (!window.chat_user_id) {
        window.socket.on('loginSuccess', () => {
          window.chat_user_id = true
          Toast.success({
            message: '检测到有登录信息，可直接聊天',
            duration: 3000,
          })
          next()
        })
        window.socket.on('loginError', () => {
          Toast({
            type: 'fail',
            message: '昵称已被使用，请更换昵称',
            duration: 3000,
            onOpened: () => {
              next('/login')
            },
          })
        })
        window.socket.emit('login', JSON.parse(chatUserInfo))
        return
      }
      next()
    }
  } else {
    if (!chatUserInfo) {
      next()
    } else {
      Toast({
        type: 'success',
        message: '检测到有登录信息，可直接聊天',
        duration: 3000,
        onOpened: () => {
          next('/')
        },
      })
    }
  }
})

export default router
