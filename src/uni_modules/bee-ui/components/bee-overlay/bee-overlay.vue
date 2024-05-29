<template>
  <bee-doc-demo-block title="为过渡效果命名">
    <button size="mini" @click="show = !show">Toggle Fade</button>
    <bee-transition :show="show">Hello!</bee-transition>
  </bee-doc-demo-block>
</template>

<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
  },
}
</script>

<script setup lang="ts">
import { ref } from "vue"

const show = ref(true)
</script>

<style scoped lang="scss">
:deep() {
  .bee-transition {
    position: relative;
    width: 120rpx;
    margin-top: 20rpx;
    color: #fff;
    line-height: 50rpx;
    text-align: center;
    background-color: orangered;
  }

  .bee-enter-active,
  .bee-leave-active {
    transition: opacity 0.5s ease;
  }

  .bee-enter-from,
  .bee-leave-to {
    opacity: 0;
  }
}
</style>
