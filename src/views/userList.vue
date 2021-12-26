<template>
  <div class="h-screen overflow-auto bg-black-f4 text-20">
    <div class="flex bg-white pt-6 flex-wrap">
      <div
        v-for="v in userlist"
        :key="v.username"
        class="flex flex-col w-1/5 justify-center pb-6 items-center"
      >
        <van-image class="w-60 h-60 rounded-6" fit="cover" :src="v.avatar" />
        <span
          class="text-12 text-center mt-4 text-black-f45 w-60 overflow-hidden overflow-ellipsis whitespace-nowrap"
          >{{ v.username }}</span
        >
      </div>
      <div class="w-1/5 flex justify-center">
        <div
          class="w-60 h-60 border-2 border-dotted border-black-f45 text-24 text-center flex items-center"
          @click="copyShare"
        >
          点击分享
        </div>
      </div>
    </div>
    <div class="mt-16">
      <van-button class="text-20" to="/" round size="large" type="info"
        >返回聊天</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'userlist',

  data() {
    return {
      userlist: [],
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      this.getUserList()
      this.userlistChange()
    },
    getUserList() {
      window.socket.emit('getUserList')
    },
    userlistChange() {
      window.socket.on('userListChange', data => (this.userlist = data))
    },
    async copyShare() {
      try {
        await this.$copyText('聊天链接')
        this.$toast.success({
          message: '复制成功，请分享此群聊',
          duration: 3000,
        })
      } catch (err) {
        this.$toast.success('复制失败，请重试')
        console.log(err)
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
