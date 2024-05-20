<template>
  <view class="bee-doc-demo-section">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { uni } from "@dcloudio/uni-h5"

withDefaults(
  defineProps<{
    backgroundColor?: string
  }>(),
  {
    backgroundColor: "#fff",
  },
)

console.log(uni.getSystemInfoSync())
</script>

<style scoped lang="scss">
.bee-doc-demo-section {
  position: relative;
  min-height: 100vh;
  background-color: v-bind(backgroundColor);
}
</style>
