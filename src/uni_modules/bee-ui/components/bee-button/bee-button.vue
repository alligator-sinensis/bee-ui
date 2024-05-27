<template>
  <button class="bee-button" :class="getClass" hover-class="is-active">
    <view class="bee-button__content">
      <bee-icon
        v-if="icon && iconPosition === 'left'"
        custom-class="bee-button__icon left"
        :name="icon"
      />
      <view v-if="!!slots.default" class="bee-button__text">
        <slot></slot>
      </view>
      <bee-icon
        v-if="icon && iconPosition === 'right'"
        custom-class="bee-button__icon right"
        :name="icon"
      />
    </view>
  </button>
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
import { computed, useSlots } from "vue"
import { type ButtonProps, buttonPropDefaults } from "./button"

const props = withDefaults(defineProps<ButtonProps>(), buttonPropDefaults)

const slots = useSlots()

const namespace = "bee-button"

const getClass = computed(() => {
  const res = [
    `${namespace}--${props.type}`,
    `${namespace}--${props.size}`,
    {
      "is-plain": props.plain,
      "is-round": props.round,
      "is-circle": props.circle,
      "is-square": props.square,
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
