<template>
  <div class="chat w-full h-screen overflow-hidden pt-46 flex flex-col">
    <van-nav-bar
      :title="title"
      @click-right="navBarRight"
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
      class="chat-message-box flex-1 overflow-auto px-10 flex flex-col"
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
          <!-- <div
            class="text-18 inline-block bg-white mt-4 pl-4 pr-8 py-6 rounded-2 relative break-all shadow-sm min-h-32"
          >
            <van-icon
              name="play"
              class="absolute text-12 transform rotate-180 -left-8 top-6 text-white"
            />
            小明小花小明小明小花小明小明小花小明小明小花小明
          </div> -->
          <div class="inline-block mt-4 rounded-2 shadow-sm">
            <img
              class="block max-w-full"
              src="//storage.360buyimg.com/activity-static/jxd/both-year/h5-groud-bg.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- your message end -->
      <!-- user message start -->
      <div class="chat-message-box-user" style="display: none">
        <!-- <div class="chat-message-box-user"> -->
        <div class="mr-8 flex-1 text-right">
          <div class="text-14 text-black-f65">小明小花小明小花</div>
          <!-- <div
            class="inline-block text-18 bg-white mt-4 text-left pr-4 pl-8 py-6 rounded-2 relative break-all shadow-sm min-h-32"
          >
            <van-icon
              name="play"
              class="absolute text-12 -right-8 top-6 text-white"
            />
            小明小花小明小小小明
          </div> -->
          <div class="inline-block mt-4 rounded-2 shadow-sm">
            <img
              class="block max-w-full"
              src="//storage.360buyimg.com/activity-static/jxd/both-year/68.png"
              alt=""
            />
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
      <div style="display: none">
        <!-- <div> -->
        <span class="text-16 px-40 block py-4 text-center text-gray-7"
          >user已上线群聊</span
        >
      </div>
      <!-- login and logout message end -->
    </div>

    <div class="chat-footer">
      <van-cell-group>
        <van-field>
          <template #left-icon>
            <van-icon
              @click="emojiShowhandle"
              name="smile-o"
              class="text-26 text-black-f85 -mt-3"
            />
          </template>
          <template #right-icon v-if="!message">
            <!-- <van-icon name="add-o" class="text-24 text-black-f85" /> -->
            <van-uploader
              :max-count="1"
              :max-size="2000 * 1024"
              @oversize="onOversize"
              :after-read="afterRead"
              class=""
            >
              <van-icon name="add-o" class="text-24 text-black-f85" />
            </van-uploader>
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
      <!-- van-slide-up -->
      <transition name="van-fade">
        <div class="h-199" v-if="emojiShow">
          <VEmojiPicker
            v-if="emojiShow"
            class="w-full h-full"
            :showSearch="false"
            :dark="false"
            @select="selectEmoji"
            :emojisByRow="6"
            :emojiSize="24"
            :showCategories="true"
            :limitFrequently="30"
            :continuousList="false"
          />
        </div>
      </transition>
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
      userlist: [],
      // uploader: [],
      emojiShow: false,
    }
  },
  computed: {
    title() {
      return `聊天室(${this.userlist.length})`
    },
  },

  async created() {
    await this.$nextTick()
    this.init()
    autosize(this.$refs.textarea)
  },
  async activated() {
    await this.$nextTick()
    this.getChatUserInfo()
  },
  methods: {
    emojiShowhandle() {
      this.emojiShow = !this.emojiShow
    },
    selectEmoji(emoji) {
      const textarea = this.$refs.textarea
      const message = this.message
      let cursurPosition = -1
      if (textarea.selectionStart || textarea.selectionStart === 0) {
        //非IE浏览器
        cursurPosition = textarea.selectionStart
      } else {
        //IE
        var range = document.selection.createRange()
        range.moveStart('character', -textarea.value.length)
        cursurPosition = range.text.length
      }
      // console.log(cursurPosition)
      if (cursurPosition > -1) {
        this.message =
          message.slice(0, cursurPosition) +
          `${emoji.data}` +
          message.slice(cursurPosition)
      } else {
        this.message += emoji.data
      }
      textarea.focus()
      // textarea.setSelectionRange(cursurPosition, cursurPosition)
    },
    init() {
      this.getChatUserInfo()
      this.receiveMessage()
      this.receiveImage()
      this.addUser()
      this.delUser()
      this.getUserList()
      this.userlistChange()
    },
    // 监听聊天信息
    receiveMessage() {
      window.socket.on('receiveMessage', async data => {
        await this.$nextTick()
        data.message = data.message.replace(/\n/g, '<br/>')
        const child = document.createElement('div')
        if (data.username === this.chatUserInfo.username) {
          // 自己发送的消息
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
        } else {
          // 别人发送的消息
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
        }
        this.chatMessageBoxAppend(child)
      })
    },
    // 监听聊天图片
    receiveImage() {
      window.socket.on('receiveImage', async data => {
        await this.$nextTick()
        const child = document.createElement('div')
        if (data.username === this.chatUserInfo.username) {
          // 自己发送的消息
          child.setAttribute('class', 'chat-message-box-user')
          child.innerHTML = `
            <div class="mr-8 flex-1 text-right">
              <div class="text-14 text-black-f65 text-right">${data.username}</div>
              <div class="inline-block mt-4 rounded-2 shadow-sm">
                <img
                  class="block max-w-full"
                  src=${data.dataUrl}
                  alt=""
                />
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
        } else {
          // 别人发送的消息
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
              <div class="inline-block mt-4 rounded-2 shadow-sm">
                <img
                  class="block max-w-full"
                  src=${data.dataUrl}
                  alt=""
                />
              </div>
            </div>
          `
        }
        this.chatMessageBoxAppend(child)
      })
    },
    // 监听用户上线
    addUser() {
      window.socket.on('addUser', async data => {
        await this.$nextTick()
        if (data.username !== this.chatUserInfo.username) {
          const child = document.createElement('div')
          child.innerHTML = `
            <span class="text-16 px-40 block py-4 text-center text-gray-7"
              >${data.username}已上线群聊</span
            >
          `
          this.chatMessageBoxAppend(child)
        }
      })
    },
    // 监听用户下线
    delUser() {
      window.socket.on('delUser', async data => {
        await this.$nextTick()
        if (data.username !== this.chatUserInfo.username) {
          const child = document.createElement('div')
          child.innerHTML = `
            <span class="text-16 px-40 block py-4 text-center text-gray-7"
              >${data.username}已退出群聊</span
            >
          `
          this.chatMessageBoxAppend(child)
        }
      })
    },
    getUserList() {
      window.socket.emit('getUserList')
    },
    userlistChange() {
      window.socket.on('userListChange', data => (this.userlist = data))
    },
    // 添加消息并滚动到底部
    chatMessageBoxAppend(child) {
      this.$refs.chatMessageBox.appendChild(child)
      this.$refs.chatMessageBox.lastElementChild.scrollIntoView(false)
    },
    // 发送按钮
    sendMessage() {
      if (this.message) {
        // 发送给socket服务器
        const message = this.message
        this.message = ''
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
      this.emojiShow = false
    },
    navBarRight() {
      this.$router.push('/userList')
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      window.socket.emit('sendImage', {
        ...this.chatUserInfo,
        dataUrl: file.content,
      })
    },
    onOversize(file) {
      console.log(file)
      this.$toast.fail('文件大小不能超过 2M')
    },
    // 获取用户信息
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
  align-self: flex-end;
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
/deep/ .van-cell {
  overflow: visible;
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
/deep/ .van-field__left-icon,
/deep/ .van-field__right-icon {
  display: flex;
  align-items: center;
}

/deep/ .emoji-picker {
  display: inline !important;
  border: none !important;
}
/deep/ #Categories {
  height: 42px;
}
/deep/ .container-emoji {
  height: 157px !important;
}
</style>
