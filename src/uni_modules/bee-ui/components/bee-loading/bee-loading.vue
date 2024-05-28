<template>
  <view
    style="
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
    "
  >
    <BeeLoadingDot v-if="type === 'dot'" />
    <BeeLoadingBar v-if="type === 'bar'" />
    <BeeLoadingClock v-if="type === 'clock'" />
    <BeeLoadingSpinner v-if="type === 'spinner'" />
    <BeeLoadingCircular1 v-if="type === 'circular-1'" />
    <BeeLoadingCircular2 v-if="type === 'circular-2'" />
    <BeeLoadingFlipping1 v-if="type === 'flipping-1'" />
    <BeeLoadingFlipping2 v-if="type === 'flipping-2'" />
    <view style="margin-left: 10px"> 提示 </view>
  </view>
</template>

<script setup lang="ts">
import BeeLoadingDot from "./components/bee-loading-dot.vue"
import BeeLoadingBar from "./components/bee-loading-bar.vue"
import BeeLoadingSpinner from "./components/bee-loading-spinner.vue"
import BeeLoadingClock from "./components/bee-loading-clock.vue"
import BeeLoadingCircular1 from "./components/bee-loading-circular-1.vue"
import BeeLoadingCircular2 from "./components/bee-loading-circular-2.vue"
import BeeLoadingFlipping1 from "./components/bee-loading-flipping-1.vue"
import BeeLoadingFlipping2 from "./components/bee-loading-flipping-2.vue"

const props = withDefaults(
  defineProps<{
    color?: string
    size?: string
    type?:
      | "dot"
      | "bar"
      | "clock"
      | "spinner"
      | "circular-1"
      | "circular-2"
      | "flipping-1"
      | "flipping-2"
  }>(),
  {
    color: "var(--bee-loading-spinner-color)",
    size: "var(--bee-loading-spinner-size)",
    type: "spinner",
  },
)
</script>

<style lang="scss">
:deep() {
  .bee-loading {
    color: v-bind(color);
    font-size: v-bind(size);
    vertical-align: middle;
  }
}
</style>
