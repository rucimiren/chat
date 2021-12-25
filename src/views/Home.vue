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
      <div class="chat-message-box-your" style="display: none">
        <!-- <div class="chat-message-box-your"> -->
        <div class="">
          <img
            class="w-40 h-40 rounded-4"
            src="//storage.360buyimg.com/activity-static/jxd/both-year/h5-bg.png"
            alt=""
          />
        </div>
        <div class="ml-8">
          <div class="text-14 text-black-f65">小明小花小明小花</div>
          <div
            class="text-18 inline-block bg-white mt-4 pl-4 pr-8 py-6 rounded-2 relative break-all shadow-sm min-h-32"
          >
            <van-icon
              name="play"
              class="absolute text-12 transform rotate-180 -left-8 top-6 text-white"
            />
            <!-- 小明小花小明小明小花小明小明小花小明小明小花小明 -->
            ni
          </div>
        </div>
      </div>
      <!-- your message end -->
      <!-- user message start -->
      <div class="chat-message-box-user" style="display: none">
        <!-- <div class="chat-message-box-user" style=""> -->
        <div class="mr-8 flex-1 text-right">
          <div class="text-14 text-black-f65">小明小花小明小花</div>
          <div
            class="inline-block text-18 bg-white mt-4 text-left pr-4 pl-8 py-6 rounded-2 relative break-all shadow-sm min-h-32"
          >
            <van-icon
              name="play"
              class="absolute text-12 -right-8 top-6 text-white"
            />
            <!-- 小明小花小明小小小明小花小明小小小明小花小明小 ni -->
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
      <!-- login and logout message start -->
      <div>
        <span class="text-16 block py-4 text-center text-gray-7"
          >user已上线群聊</span
        >
      </div>
      <!-- login and logout message end -->
    </div>

    <div class="chat-footer">
      <van-cell-group>
        <van-field>
          <template #left-icon>
            <van-icon name="smile-o" class="text-26 text-black-f85 -mt-3" />
          </template>
          <template #right-icon v-if="!message">
            <van-icon name="add-o" class="text-24 text-black-f85" />
          </template>
          <template #button v-else>
            <van-button
              @click="sendMessage"
              size="small"
              class="border-0 text-16"
              type="info"
              >发送</van-button
            >
          </template>
          <template #input>
            <textarea v-model="message" ref="textarea"></textarea>
          </template>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import autosize from 'autosize'
export default {
  name: 'home',
  data() {
    return {
      message: '',
      chatUserInfo: {
        username: '',
        avatar: '',
      },
    }
  },
  async created() {
    await this.$nextTick()
    this.init()
    autosize(this.$refs.textarea)
  },
  methods: {
    init() {
      this.getChatUserInfo()
      this.receiveMessage()
    },
    receiveMessage() {
      window.socket.on('receiveMessage', async data => {
        await this.$nextTick()
        data.message = data.message.replace(/\n/g, '<br/>')
        console.log(data)
        // 判断消息是否是自己发送的
        if (data.username === this.chatUserInfo.username) {
          // 自己发送的消息
          const child = document.createElement('div')
          child.setAttribute('class', 'chat-message-box-user')
          child.innerHTML = `
            <div class="mr-8 flex-1 text-right">
              <div class="text-14 text-black-f65 text-right">${data.username}</div>
              <div
                class="text-18 inline-block text-left bg-white mt-4 pr-4 pl-8 py-6 rounded-2 relative break-all shadow-sm min-h-32"
              >
                <i class="absolute text-12 -right-8 top-6 text-white van-icon van-icon-play"></i>
                ${data.message}
              </div>
            </div>
            <div class="">
              <img
                class="w-40 h-40 rounded-4"
                src=${data.avatar}
                alt=""
              />
            </div>
          `
          this.$refs.chatMessageBox.appendChild(child)
        } else {
          // 别人发送的消息
          const child = document.createElement('div')
          child.setAttribute('class', 'chat-message-box-your')
          child.innerHTML = `
            <div class="">
              <img
                class="w-40 h-40 rounded-4"
                src=${data.avatar}
                alt=""
              />
            </div>
            <div class="ml-8">
              <div class="text-14 text-black-f65">${data.username}</div>
              <div
                class="text-18 bg-white mt-4 pl-4 pr-8 py-6 rounded-2 relative break-all shadow-sm min-h-32"
              >
                <i class="absolute inline-block text-12 transform rotate-180 -left-8 top-6 text-white van-icon van-icon-play"></i>
                ${data.message}
              </div>
            </div>
          `
          this.$refs.chatMessageBox.appendChild(child)
        }
        this.$refs.chatMessageBox.lastElementChild.scrollIntoView(false)
      })
    },
    sendMessage() {
      if (this.message) {
        // 发送给socket服务器
        const message = this.message
        this.message = ''
        console.log(window.socket)
        window.socket.emit('chatMessage', {
          ...this.chatUserInfo,
          message,
        })
      }
      // autosize.js api 更新 textarea 高度  不管哪种都要写上 this.$refs.textarea.value = ''
      this.$refs.textarea.value = ''
      autosize.update(this.$refs.textarea)
      // 原生js事件触发 更新 textarea 高度
      // const inputEvent = new Event('input')
      // this.$refs.textarea.dispatchEvent(inputEvent)
    },
    onClickRight() {
      console.log('按钮')
    },
    getChatUserInfo() {
      const chatUserInfo = window.localStorage.getItem('chatUserInfo')
      this.chatUserInfo = JSON.parse(chatUserInfo)
    },
  },
}
</script>
<style>
.min-h-32 {
  min-height: 32px;
}
.chat-message-box-user {
  display: flex;
  padding: 8px 0;
  align-self: end;
  max-width: 83.3333%;
}
.chat-message-box-your {
  display: flex;
  padding: 8px 0;
  max-width: 83.3333%;
}
</style>
<style lang="less" scoped>
.chat,
.chat-message-box,
.chat-footer,
/deep/ .van-cell,
/deep/ .van-nav-bar--fixed {
  background: rgba(240, 240, 240);
}
.chat-footer,
/deep/ .van-cell-group,
/deep/ .van-cell {
  min-height: 56px;
  align-items: center;
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
/deep/ .van-field__control textarea {
  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15),
    inset 1px 1px 2px rgba(0, 0, 0, 0.15);
  padding: 0 4px;
  min-height: 34px;
  max-height: 80px;
  width: 100%;
  height: 26px;
  resize: none;
  font-size: 20px;
  padding-top: 4px;
}
/deep/ .van-field__left-icon {
  display: flex;
  align-items: center;
}
</style>
