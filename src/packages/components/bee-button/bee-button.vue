<template>
  <button
    class="bee-button"
    :class="getClass"
    :disabled="disabled"
    hover-class="is-active"
    :style="getStyle"
    @click="onClick"
  >
    <view class="bee-button__content">
      <bee-loading v-if="getLoading" color="inherit" size="var(--bee-button-icon-font-size)" />
      <bee-icon
        v-if="icon && !getLoading && iconPosition === 'left'"
        class="bee-button__icon"
        :name="icon"
        :prefix="iconPrefix"
      />
      <view v-if="hasContentText" class="bee-button__text">
        <slot></slot>
      </view>
      <bee-icon
        v-if="icon && !getLoading && iconPosition === 'right'"
        class="bee-button__icon"
        :name="icon"
        :prefix="iconPrefix"
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
import { computed, ref, useSlots } from "vue"
import { type ButtonProps, buttonPropDefaults } from "./button"
import { componentSizeMap } from "../../constants"

const props = withDefaults(defineProps<ButtonProps>(), buttonPropDefaults)

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void
}>()

const slots = useSlots()

const getClass = computed(() => {
  const res = [
    `bee-button--${props.type}`,
    `bee-button--${props.size}`,
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

const getStyle = computed(() => {
  const { background, plain, size } = props
  const res = {
    "--bee-button-height": `${componentSizeMap[size]}px`,
  }
  if (background) {
    if (plain) {
      res["--bee-button-color"] = background
      res["--bee-button-border-color"] = background
    } else {
      res["background"] = background
      res["border"] = "none"
      res["--bee-button-color"] = "var(--bee-color-white)"
    }
  }
  return res
})

const getLoading = computed(() => {
  return props.loading || clickLoading.value
})

const hasContentText = computed(() => !!slots.default)

const clickLoading = ref(false)

const onClick = async (event: MouseEvent) => {
  emit("click", event)
  const { to, replace, click } = props
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
  if (click) {
    try {
      clickLoading.value = true
      await click(event)
    } finally {
      clickLoading.value = false
    }
  }
}
</script>

<style scoped lang="scss">
@import "./index";
</style>
