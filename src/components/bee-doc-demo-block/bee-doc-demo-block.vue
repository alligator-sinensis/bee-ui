<template>
  <view class="bee-doc-demo-block">
    <view class="bee-doc-demo-block__title">{{ title }}</view>
    <view class="bee-doc-demo-block__content">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: "",
  },
)
</script>

<style scoped lang="scss">
.bee-doc-demo-block {
  &__title {
    padding: 32rpx 16rpx;
    color: #999;
  }

  &__content {
    margin: 0 32rpx;
    padding: 32rpx;
    border-radius: 16rpx;
    box-shadow:
      0 6rpx 24rpx rgb(0 0 0 / 7%),
      0 2rpx 8rpx rgb(0 0 0 / 7%);
  }
}
</style>
