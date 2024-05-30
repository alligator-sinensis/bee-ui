<template>
  <view class="bee-doc-demo-section">
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: "shared",
  },
}
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    backgroundColor?: string
  }>(),
  {
    backgroundColor: "#fff",
  },
)
</script>

<style scoped lang="scss">
.bee-doc-demo-section {
  position: relative;
  min-height: 100vh;
  padding-bottom: 40rpx;
  background-color: v-bind(backgroundColor);
}
</style>
