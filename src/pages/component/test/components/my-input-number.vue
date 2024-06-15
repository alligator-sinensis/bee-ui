<template>
  <view>
    <input v-model="inputNumberValue" style="background-color: #f0f0f0" @input="onInput" />

    <pre>{{ { modelValue, inputNumberValue } }}</pre>
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

const inputNumberValue = ref<string>("")

// const modelValue = computed({
//   get: () => {
//     return props.modelValue
//   },
//   set: (val) => {
//     emit("update:modelValue", val)
//   },
// })

const onInput = () => {
  if (inputNumberValue.value === "-") {
    inputNumberValue.value = ""
    return
  }
  if (!IsNumber(inputNumberValue.value)) {
    nextTick(() => {
      const parseFloatValue = parseFloat(inputNumberValue.value)
      inputNumberValue.value = isNaN(parseFloatValue) ? "" : String(parseFloatValue)
    })
  }
}
</script>

<style scoped lang="scss"></style>
