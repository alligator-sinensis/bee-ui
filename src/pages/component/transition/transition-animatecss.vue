<template>
  <bee-doc-demo-block title="集成 Animate.css">
    <button size="mini" @click="show = !show">Toggle</button>
    <bee-transition
      enter-active-class="animate__animated animate__tada"
      leave-active-class="animate__animated animate__bounceOutRight"
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
import "animate.css"

const show = ref(false)
</script>

<style scoped lang="scss">
.bee-transition {
  --animate-duration: 1s;
  --animate-delay: 1s;
  --animate-repeat: 1;

  position: relative;
  width: 120rpx;
  margin-top: 20rpx;
  color: #fff;
  line-height: 50rpx;
  text-align: center;
  background-color: orangered;
}
</style>
