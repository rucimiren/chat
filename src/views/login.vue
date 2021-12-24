<template>
  <div class="flex justify-center items-center h-screen">
    <van-form @submit="onSubmit" class="w-10/12 shadow-md">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" class="text-20" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import io from 'socket.io'
export default {
  name: 'login',

  data() {
    return {
      username: '',
      socket: null,
    }
  },

  mounted() {},

  methods: {
    init() {
      this.socket = io('http://localhost:3000')
    },
    onSubmit(values) {
      console.log('submit', values)
      this.socket.emit('login', { username: this.username })
    },
  },
}
</script>

<style lang="less" scoped></style>
