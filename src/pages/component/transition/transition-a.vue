<template>
  <bee-doc-demo-block title="渐变">
    <button size="mini" @click="show = !show">Toggle Fade</button>
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

  &.bee-enter-active,
  &.bee-leave-active {
    transition: opacity 0.5s ease;
  }

  &.bee-enter-from,
  &.bee-leave-to {
    opacity: 0;
  }
}
</style>
