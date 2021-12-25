<template>
  <div class="flex justify-center items-center h-screen bg-black-f4">
    <van-form @submit="onSubmit" class="w-10/12 shadow-md bg-white rounded-6">
      <van-field
        class="rounded-6 text-20"
        v-model="username"
        name="username"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请输入昵称' }]"
      />
      <van-cell-group :border="false" title="请上传头像">
        <van-field
          name="uploader"
          :rules="[{ required: true, message: '请选择头像' }]"
        >
          <template #input>
            <van-uploader
              :max-count="1"
              :max-size="2000 * 1024"
              @oversize="onOversize"
              v-model="uploader"
            />
          </template>
        </van-field>
      </van-cell-group>
      <div class="m-16">
        <van-button round block type="info" class="text-20" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'login',

  data() {
    return {
      username: '',
      uploader: [],
      chatUserInfo: {
        username: '',
        avatar: '',
      },
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      this.loginError()
      this.loginSuccess()
    },
    onSubmit(values) {
      this.chatUserInfo = {
        username: values.username,
        avatar: values.uploader[0].content,
      }
      window.socket.emit('login', this.chatUserInfo)
    },
    onOversize(file) {
      console.log(file)
      this.$toast.fail('文件大小不能超过 2M')
    },
    loginError() {
      window.socket.on('loginError', () => {
        this.$toast.fail({
          message: '昵称已被使用，请更换昵称',
          duration: 3000,
        })
      })
    },
    loginSuccess() {
      window.socket.on('loginSuccess', () => {
        window.localStorage.setItem(
          'chatUserInfo',
          JSON.stringify(this.chatUserInfo),
        )
        window.chat_user_id = true
        this.$toast({
          type: 'success',
          message: '登录成功',
          duration: 3000,
          onOpened: () => {
            this.$router.replace('/')
          },
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .van-field__error-message {
  font-size: 18px;
}
</style>
