<template>
  <div class="h-screen overflow-auto bg-black-f4 text-20 pt-46">
    <van-nav-bar
      title="修改昵称"
      fixed
      border
      safe-area-inset-top
    ></van-nav-bar>

    <div class="my-10">
      <van-image
        class="w-100 h-100 rounded-4 overflow-hidden block mx-auto"
        fit="cover"
        :src="chatUserInfo.avatar"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        class="text-20"
        v-model="username"
        label="昵称"
        placeholder="请输入昵称"
        name="username"
        :rules="[
          { required: true, message: '请输入昵称' },
          { validator, message: '与现有昵称一致' },
        ]"
      />

      <div class="mt-12">
        <van-button
          class="text-20"
          size="large"
          type="info"
          native-type="submit"
          :loading="submitLoading"
          loading-type="spinner"
          loading-text="修改中..."
          >确认修改</van-button
        >
      </div>
    </van-form>
    <div class="mt-12">
      <van-button
        class="text-20 text-black-f65"
        to="/userList"
        size="large"
        type="default"
        >返回上一级</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'modifyName',

  data() {
    return {
      chatUserInfo: {
        username: '',
        avatar: '',
      },
      username: '',
      submitLoading: false,
    }
  },

  created() {
    this.init()
  },

  activated() {
    this.getChatUserInfo()
  },

  methods: {
    validator(val) {
      return val !== this.chatUserInfo.username
    },
    init() {
      this.modifyNameSuccess()
    },
    // 获取用户信息
    getChatUserInfo() {
      const chatUserInfo = window.localStorage.getItem('chatUserInfo')
      this.chatUserInfo = JSON.parse(chatUserInfo)
      this.username = this.chatUserInfo.username
    },
    onSubmit(values) {
      this.submitLoading = true
      window.socket.emit('modifyName', {
        ...this.chatUserInfo,
        usernameNew: values.username,
      })
    },
    modifyNameSuccess() {
      window.socket.on('modifyNameSuccess', data => {
        this.submitLoading = false
        this.$toast('修改昵称成功')
        window.localStorage.setItem('chatUserInfo', JSON.stringify(data))
      })
    },
  },
}
</script>

<style lang="less" scoped>
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
</style>
