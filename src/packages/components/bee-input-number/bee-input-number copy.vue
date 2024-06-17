<template>
  <bee-input v-bind="$attrs">
    <template #prefix>
      <view class="prefix">
        <slot name="prefix"></slot>
      </view>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </bee-input>
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
import { computed } from "vue"

const props = withDefaults(
  defineProps<{
    modelValue?: number
  }>(),
  {},
)

const emit = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "input",
  "confirm",
  "click",
  "clickInput",
])
const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
})

function processModelDirective(el, binding) {
  if (binding.modifiers.number) {
    el.addEventListener("input", (event) => {
      const value = event.target.value
      const numberValue = parseFloat(value)
      if (!isNaN(numberValue)) {
        binding.value = numberValue
      } else {
        binding.value = value
      }
    })
  }
}
</script>

<style scoped lang="scss"></style>
