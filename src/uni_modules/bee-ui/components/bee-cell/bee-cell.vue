<template>
  <view class="bee-cell">
    <bee-icon class="bee-cell__icon bee-cell__icon-left" name="store-2-line" />
    <view class="bee-cell__title">
      <text>
        <slot>{{ title }}</slot>
      </text>
      <view class="bee-cell__label"> bee-cell__label </view>
    </view>
    <view class="bee-cell__value">
      <text>
        <slot name="value">{{ value }}</slot>
      </text>
    </view>
    <bee-icon
      class="bee-cell__icon bee-cell__icon-right bee-cell__icon-right-arrow"
      name="arrow-right-s-line"
    />
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    value?: string
    icon?: string
    iconPrefix?: string
    to?: string
    replace?: boolean
    clickable?: boolean
    showArrow?: boolean
    arrowDirection?: "left" | "right" | "up" | "down"
  }>(),
  {
    title: "",
    value: "",
    icon: "",
    replace: false,
    clickable: false,
    showArrow: false,
  },
)
</script>

<style scoped lang="scss">
.bee-cell {
  position: relative;
  display: flex;
  padding: var(--bee-cell-vertical-padding) var(--bee-cell-horizontal-padding);
  line-height: var(--bee-cell-line-height);
  background-color: var(--bee-cell-background-color);

  &__title {
    flex: 1;
    color: var(--bee-cell-title-color);
    font-size: var(--bee-cell-title-font-size);
  }

  &__label {
    margin-top: var(--bee-padding-xs);
    color: var(--bee-cell-label-color);
    font-size: var(--bee-cell-label-font-size);
    line-height: var(--bee-cell-label-line-height);
  }

  &__value {
    position: relative;
    flex: 1;
    overflow: hidden;
    color: var(--bee-cell-value-color);
    font-size: var(--bee-cell-value-font-size);
    text-align: right;
    vertical-align: middle;
    word-wrap: break-word;
  }

  &__icon {
    height: var(--bee-cell-line-height);
    color: var(--bee-cell-icon-color);
    font-size: var(--bee-cell-icon-size);
    line-height: var(--bee-cell-line-height);

    &-left {
      margin-right: var(--bee-padding-xs);
    }

    &-right {
      margin-left: var(--bee-padding-xs);

      &-arrow {
        font-size: var(--bee-cell-icon-right-arrow-size);
      }
    }
  }
}
</style>
