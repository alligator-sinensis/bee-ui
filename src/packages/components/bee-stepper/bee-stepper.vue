<template>
  <view>bee-stepper</view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: number | string | null
    min?: number
    max?: number
    step?: number
    precision?: number
    emptyValue?: number
    stepper?: boolean
    size?: Exclude<ComponentSize, "mini">
    disabled?: boolean
    beforeChange?: (value: any) => Promise<void>
  }>(),
  {
    min: -Infinity,
    max: Infinity,
    stepper: true,
    size: "middle",
    disabled: false,
    // step: 0.03,
    emptyValue: 5.2,
    precision: 5,
    // min: -10,
    // max: 100,
  },
)
</script>

<style scoped lang="scss"></style>
