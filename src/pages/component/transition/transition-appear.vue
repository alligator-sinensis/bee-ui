<template>
  <bee-doc-demo-block title="出现时过渡">
    <button size="mini" @click="show = !show">Toggle Rotate</button>
    <bee-transition appear :show="show">Hello!</bee-transition>
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
.bee-transition {
  position: relative;
  width: 120rpx;
  margin-top: 20rpx;
  color: #fff;
  line-height: 50rpx;
  text-align: center;
  background-color: orangered;
}

.bee-enter-active {
  transition: all 0.3s ease-out;
}

.bee-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.bee-enter-from,
.bee-leave-to {
  transform: rotate(180deg);
  opacity: 0;
}
</style>
