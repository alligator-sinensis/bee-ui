<template>
  <bee-doc-demo-block title="为过渡效果命名">
    <button size="mini" @click="show = !show">Toggle Fade</button>
    <bee-transition name="fade" :show="show">Hello!</bee-transition>
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

const show = ref(false)
</script>

<style scoped lang="scss">
:deep() {
  .bee-transition {
    position: relative;
    width: 120rpx;
    color: #fff;
    line-height: 50rpx;
    text-align: center;
    background-color: orangered;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
