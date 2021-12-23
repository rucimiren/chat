<template>
  <div class="home">
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
    <div v-for="v in 100" :key="v">{{ v }}</div>
    <div class="fixed bottom-0 left-0 h-46 w-full bg-primary"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    onClickRight() {
      console.log('按钮')
    },
  },
}
</script>
<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 54px 0;
}
</style>
