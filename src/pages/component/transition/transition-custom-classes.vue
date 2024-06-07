<template>
  <bee-doc-demo-block title="自定义过渡 class">
    <button size="mini" @click="show = !show">Toggle</button>
    <bee-transition
      enter-active-class="custom-enter-active"
      enter-from-class="custom-enter-from"
      enter-to-class="custom-enter-to"
      leave-active-class="custom-leave-active"
      leave-from-class="custom-leave-from"
      leave-to-class="custom-leave-to"
      :show="show"
      >Hello!</bee-transition
    >
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

.custom-enter-from,
.custom-leave-to {
  transform: translate3d(100px, -100px, 0) rotate(-180deg);
}

.custom-enter-active,
.custom-leave-active {
  transition: all 0.3s ease-out;
}
</style>
