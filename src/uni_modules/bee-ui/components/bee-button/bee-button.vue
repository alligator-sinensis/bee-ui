<template>
  <button class="bee-button" :class="getClass">
    <view class="bee-button__content">
      <view>图标</view>
      <view>
        <slot></slot>
      </view>
    </view>
  </button>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from "vue"
import { type ButtonProps, buttonPropDefaults } from "./button"

const props = withDefaults(defineProps<ButtonProps>(), buttonPropDefaults)

const namespace = "bee-button"

const getClass = computed(() => {
  const res = [
    `${namespace}--${props.type}`,
    `${namespace}--${props.size}`,
    {
      "is-plain": props.plain,
      "is-round": props.round,
      "is-circle": props.circle,
      "is-loading": props.loading,
      "is-disabled": props.disabled,
    },
  ]
  return res
})
</script>

<style scoped lang="scss">
@import "./index";
</style>
