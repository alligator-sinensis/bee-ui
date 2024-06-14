<template>
  <view>
    <input v-model="modelValue" style="background-color: #f0f0f0" @input="onInput" />

    <pre>{{ { modelValue, value } }}</pre>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue"
import IsNumber from "is-number"

const props = withDefaults(
  defineProps<{
    modelValue?: number | string
  }>(),
  {},
)

const emit = defineEmits(["update:modelValue"])

// const value = ref<string>("")

const modelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit("update:modelValue", val)
  },
})

// const onInput = () => {
//   if (value.value === "-") {
//     value.value = ""
//     return
//   }
//   if (!IsNumber(value.value)) {
//     nextTick(() => {
//       const parseFloatValue = parseFloat(value.value)
//       value.value = isNaN(parseFloatValue) ? "" : String(parseFloatValue)
//     })
//   }
// }
</script>

<style scoped lang="scss"></style>
