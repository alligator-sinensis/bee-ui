<template>
  <bee-doc-demo-block title="CSS 的 animation">
    <button size="mini" @click="show = !show">Toggle Scale</button>
    <bee-transition name="bounce" :show="show">Hello!</bee-transition>
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
    margin-top: 20rpx;
    color: #fff;
    line-height: 50rpx;
    text-align: center;
    background-color: orangered;
  }

  .bounce-enter-active {
    animation: bounce 0.5s;
  }

  .bounce-leave-active {
    animation: bounce 0.8s reverse forwards;
  }

  @keyframes bounce {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.25);
    }

    100% {
      transform: scale(1);
    }
  }
}
</style>
