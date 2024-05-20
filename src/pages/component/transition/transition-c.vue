<template>
  <bee-doc-demo-block title="缩放">
    <button size="mini" @click="show = !show">Toggle Scale + Fade</button>
    <bee-transition :show="show">Hello!</bee-transition>
  </bee-doc-demo-block>
</template>

<script setup lang="ts">
import { ref } from "vue"

const show = ref(false)
</script>

<style scoped lang="scss">
:deep(.bee-transition) {
  position: relative;
  width: 120rpx;
  color: #fff;
  line-height: 50rpx;
  text-align: center;
  background-color: orangered;

  &.bee-enter-active {
    transition: all 0.3s ease-out;
  }

  &.bee-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  &.bee-enter-from,
  &.bee-leave-to {
    transform: scale(0);
  }
}
</style>
