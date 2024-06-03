<template>
  <view class="bee-cell">
    <view class="bee-cell__title">title</view>
    <view class="bee-cell__value">value</view>
    <a-icon class="bell-cell__right-icon" />
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    value?: string
  }>(),
  {
    title: "",
    value: "",
  },
)
</script>

<style scoped lang="scss">
.bee-cell {
  position: relative;
  display: flex;
  padding: var(--bee-cell-vertical-padding) var(--bee-cell-horizontal-padding);
  overflow: hidden;
  color: var(--bee-cell-text-color);
  font-size: var(--bee-cell-font-size);
  line-height: var(--bee-cell-line-height);
  background: var(--bee-cell-background);
}
</style>
