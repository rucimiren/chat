<template>
  <div class="chat w-full h-screen overflow-hidden pt-46 flex flex-col">
    <van-nav-bar
      title="聊天室"
      @click-right="onClickRight"
      fixed
      border
      safe-area-inset-top
    >
      <template #right>
        <van-icon name="friends" class="text-20" />
      </template>
    </van-nav-bar>
    <div
      ref="chatMessageBox"
      class="chat-message-box flex-1 overflow-auto text-30 px-10 flex flex-col"
    >
      <!-- your message start -->
      <div class="flex py-8" style="max-width: 83.333%">
        <div class="">
          <img
            class="w-40 h-40 rounded-4"
            src="//storage.360buyimg.com/activity-static/jxd/both-year/h5-bg.png"
            alt=""
          />
        </div>
        <div class="ml-8">
          <div class="text-14 text-black-f65">小明小花</div>
          <div
            class="text-18 bg-white mt-4 pl-4 pr-6 py-6 rounded-2 relative break-all shadow-sm"
          >
            <van-icon
              name="play"
              class="absolute text-12 transform rotate-180 -left-8 top-6 text-white"
            />
            小明小花小明
          </div>
        </div>
      </div>
      <!-- your message end -->
      <!-- user message start -->
      <div class="flex py-8 self-end" style="max-width: 83.333%">
        <div class="mr-8 flex-1">
          <div class="text-14 text-black-f65 text-right">小明小花</div>
          <div
            class="text-18 bg-white mt-4 pr-4 pl-6 py-6 rounded-2 relative break-all shadow-sm text-right"
          >
            <van-icon
              name="play"
              class="absolute text-12 -right-8 top-6 text-white"
            />
            小明小花小明小小
          </div>
        </div>
        <div class="">
          <img
            class="w-40 h-40 rounded-4"
            src="//storage.360buyimg.com/activity-static/jxd/both-year/h5-bg.png"
            alt=""
          />
        </div>
      </div>
      <!-- user message end -->
    </div>

    <div class="chat-footer">
      <van-cell-group>
        <van-field
          autosize
          v-model="message"
          type="textarea"
          @focus="textareaFocus"
          @blur="textareaBlur"
          @input="textareaInput"
        >
          <template #left-icon>
            <van-icon name="smile-o" class="text-26 text-black-f85 -mt-3" />
            <van-icon name="add-o" class="text-24 text-black-f85" />
          </template>
          <!-- <template #right-icon>
            <van-icon name="add-o" class="text-24 text-black-f85" />
          </template> -->
          <template #button>
            <van-button
              @click="sendMessage"
              size="small"
              class="border-0 text-16"
              type="info"
              >发送</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
// import io from 'socket.io/client-dist/socket.io.js'
// const io = require('socket.io/client-dist/socket.io.js')
// const socket = io('http://10.13.156.112:3000')
// socket.on('news', function (data) {
//   console.log(data)
//   socket.emit('my other event', { my: 'data' })
// })
export default {
  name: 'home',
  data() {
    return {
      message: '',
    }
  },
  async created() {
    await this.$nextTick()
    const vanFieldControl = document.querySelector('.van-field__control')
    vanFieldControl.style = ''
    console.log(window.socket, 'window.socket')
    this.init()
  },
  methods: {
    init() {
      //接收服务端的信息
      window.socket.on('news', data => {
        console.log(data)
      })

      this.receiveMessage()
    },
    receiveMessage() {
      window.socket.on('receiveMessage', data => {
        console.log(data, 'receiveMessage')
        // 判断消息是否是自己发送的
        if (data.username === this.username) {
          console.log('自己发送的')
          console.log(this.$refs.chatMessageBox)
          // 自己发送的消息
          const child = document.createElement('div')
          // ['flex', 'py-8','w-10/12','self-end']
          // child.classList.add('flex py-8 w-10/12 self-end')
          child.setAttribute('class', 'flex py-8 w-10/12 self-end')
          child.innerHTML = `
            <div class="mr-8 flex-1">
              <div class="text-14 text-black-f65 text-right">小明小花</div>
              <div
                class="text-18 bg-white mt-4 pr-4 pl-6 py-6 rounded-2 relative break-all shadow-sm"
              >
                <van-icon
                  name="play"
                  class="absolute text-12 -right-8 top-6 text-white"
                ></van-icon>
                ${data.msg}
              </div>
            </div>
            <div class="">
              <img
                class="w-40 h-40 rounded-4"
                src="//storage.360buyimg.com/activity-static/jxd/both-year/h5-bg.png"
                alt=""
              />
            </div>
          `
          this.$refs.chatMessageBox.appendChild(child)
          /* this.$refs.chatMessageBox.appendChild(`
            <div class="flex py-8 w-10/12 self-end">
              <div class="mr-8">
                <div class="text-14 text-black-f65 text-right">小明小花</div>
                <div
                  class="text-18 bg-white mt-4 pr-4 pl-6 py-6 rounded-2 relative break-all shadow-sm"
                >
                  <van-icon
                    name="play"
                    class="absolute text-12 -right-8 top-6 text-white"
                  />
                  ${data.msg}
                </div>
              </div>
              <div class="">
                <img
                  class="w-40 h-40 rounded-4"
                  src="//storage.360buyimg.com/activity-static/jxd/both-year/h5-bg.png"
                  alt=""
                />
              </div>
            </div>
          `) */
        } else {
          console.log('别人的')
          this.$refs.chatMessageBox.appendChild(`
            <div class="flex py-8 w-10/12">
              <div class="">
                <img
                  class="w-40 h-40 rounded-4"
                  src="//storage.360buyimg.com/activity-static/jxd/both-year/h5-bg.png"
                  alt=""
                />
              </div>
              <div class="ml-8">
                <div class="text-14 text-black-f65">小明小花</div>
                <div
                  class="text-18 bg-white mt-4 pl-4 pr-6 py-6 rounded-2 relative break-all shadow-sm"
                >
                  <van-icon
                    name="play"
                    class="absolute text-12 transform rotate-180 -left-8 top-6 text-white"
                  />
                  ${data.msg}
                </div>
              </div>
            </div>
          `)
        }
        console.log('下面')
        this.$refs.chatMessageBox.lastElementChild.scrollIntoView(false)
      })
    },
    sendMessage() {
      if (this.message) {
        // 发送给socket服务器
        const message = this.message
        this.message = ''
        window.socket.emit('chatMessage', {
          // username: username,
          // avatar: avatar,
          msg: message,
        })
      }
    },
    onClickRight() {
      console.log('按钮')
    },
    // 获取焦点
    textareaFocus() {
      this.setTextarea()
    },
    // 失去焦点
    textareaBlur() {
      this.setTextarea()
    },
    // 变化
    async textareaInput() {
      await this.$nextTick()
      this.$refs.chatMessageBox.lastElementChild.scrollIntoView(false)

      if (this.message === '') {
        this.setTextarea()
      }
    },
    // 主要用于控制textarea文本框高度
    async setTextarea() {
      await this.$nextTick()
      const vanFieldControl = document.querySelector('.van-field__control')
      vanFieldControl.style = ''
    },
  },
}
</script>
<style lang="less" scoped>
.chat,
.chat-message-box,
.chat-footer,
/deep/ .van-cell,
/deep/ .van-nav-bar--fixed {
  // background: rgb(253, 253, 253);
  background: rgba(240, 240, 240);
}
.chat-footer {
  min-height: 46px;
}
/deep/ .van-cell-group {
  box-shadow: 4px 0 2px rgba(0, 0, 0, 0.15);
}
/deep/ .van-nav-bar__title {
  font-size: 22px;
}
/deep/ .van-nav-bar {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
/deep/ .van-nav-bar--fixed {
  max-width: 375px;
  left: 50%;
  transform: translateX(-50%);
}
/deep/ .van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after,
.van-hairline--bottom::after {
  border-width: 0;
}
/deep/ .van-field__control {
  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15),
    inset 1px 1px 2px rgba(0, 0, 0, 0.15);
  padding: 0 4px;
  min-height: 26px;
  max-height: 80px;
  height: 26px;
}
/deep/ .van-field__left-icon {
  display: flex;
  align-items: center;
}
</style>
