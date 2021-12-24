<template>
  <div class="w-full h-screen overflow-hidden py-46">
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
    <div class="w-full h-full overflow-auto text-30 px-10">
      <div v-for="v in 100" :key="v">{{ v }}</div>
    </div>

    <div class="chat-max-width fixed bottom-0 w-full">
      <van-cell-group>
        <van-field
          autosize
          v-model="message"
          right-icon="warning-o"
          type="textarea"
          @focus="textareaFocus"
          @blur="textareaBlur"
          @input="textareaInput"
        >
          <template #left-icon>
            <van-icon name="smile-o" class="text-24 text-black-f85" />
          </template>
          <template #right-icon>
            <van-icon name="add-o" class="text-24 text-black-f85" />
          </template>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
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
  },
  methods: {
    onClickRight() {
      console.log('按钮')
    },
    textareaFocus() {
      this.setTextarea()
    },
    textareaBlur() {
      this.setTextarea()
    },
    textareaInput() {
      if (this.message === '') {
        this.setTextarea()
      }
    },
    async setTextarea() {
      await this.$nextTick()
      const vanFieldControl = document.querySelector('.van-field__control')
      vanFieldControl.style = ''
    },
  },
}
</script>
<style lang="less" scoped>
.chat-max-width {
  min-height: 46px;
}
/deep/ .van-nav-bar__title {
  font-size: 22px;
}
.chat-max-width,
/deep/ .van-nav-bar--fixed {
  max-width: 375px;
  left: 50%;
  transform: translateX(-50%);
}
/deep/ .van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-bottom-width: 0;
}
.chat-max-width,
/deep/ .van-cell {
  // background: #fafafa;
  background: rgb(253, 253, 253);
}
/deep/ .van-field__control {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
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
