<template>
  <button class="bee-button" :class="getClass">bee-button</button>
  <pre>{{ props }}</pre>
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

// vant 50 44 32 24
// wot     44 36 28
// uview   50 40 30 22
// el 40 32 24

const props = withDefaults(defineProps<ButtonProps>(), buttonPropDefaults)

const namespace = "bee-button"

const getClass = computed(() => {
  const res = [
    `${namespace}--${props.type}`,
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
