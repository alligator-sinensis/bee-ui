<template>
  <view>
    <input v-model="inputNumberValue" style="background-color: #f0f0f0" @input="onInput" />

    <pre>{{ { modelValue, inputNumberValue } }}</pre>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue"
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
  parseValue(inputNumberValue.value)
}

const parseValue = (val) => {
  console.log("parseValue", val)
  if (val === "-") {
    inputNumberValue.value = ""
    return
  }
  if (!IsNumber(val)) {
    nextTick(() => {
      const parseFloatValue = parseFloat(val)
      inputNumberValue.value = isNaN(parseFloatValue) ? "" : String(parseFloatValue)
    })
    return
  }
  inputNumberValue.value = String(val)
}

watch(
  () => props.modelValue,
  () => {
    console.log("watch=>props.modelValue", props.modelValue)
    parseValue(props.modelValue)
  },
  {
    immediate: true,
  },
)

watch(
  () => inputNumberValue.value,
  () => {
    console.log("watch=>inputNumberValue.value", inputNumberValue.value)
  },
)
</script>

<style scoped lang="scss"></style>
