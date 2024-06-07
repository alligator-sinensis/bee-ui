<template>
  <bee-doc-demo-block title="CSS 的 transition">
    <button size="mini" @click="show = !show">Toggle Slide + Fade</button>
    <bee-transition name="slide-fade" :show="show">Hello!</bee-transition>
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
import BeeTransition from "@/packages/components/bee-transition/bee-transition.vue"

const show = ref(false)
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
