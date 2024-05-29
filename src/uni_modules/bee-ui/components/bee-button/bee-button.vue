<template>
  <button
    class="bee-button"
    :class="getClass"
    hover-class="is-active"
    :style="{ background }"
    @click="onClick"
  >
    <view class="bee-button__content">
      <bee-loading v-if="loading" color="inherit" size="inherit" />
      <bee-icon
        v-if="icon && !loading && iconPosition === 'left'"
        custom-class="bee-button__icon"
        :name="icon"
      />
      <view v-if="hasContentText" class="bee-button__text">
        <slot></slot>
      </view>
      <bee-icon
        v-if="icon && !loading && iconPosition === 'right'"
        custom-class="bee-button__icon"
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
      "is-disabled": props.disabled,
      "is-block": props.block,
    },
  ]
  return res
})

const hasContentText = computed(() => !!slots.default)

const onClick = () => {
  const { to, replace } = props
  if (to) {
    if (replace) {
      uni.redirectTo({
        url: to,
      })
    } else {
      uni.navigateTo({
        url: to,
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "./index";
</style>
