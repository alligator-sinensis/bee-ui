<template>
  <view>
    <input v-model="displayValue" @blur="onBlur" @input="onInput" />
    <pre>{{ { modelValue, displayValue } }}</pre>
  </view>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue"
import isNumber from "is-number"
import { watchPausable } from "@vueuse/core"

const props = withDefaults(
  defineProps<{
    modelValue?: number
    min?: number
    max?: number
    step?: number
    precision?: number
    emptyValue?: number
  }>(),
  {
    inputNumber: false,
    min: -Infinity,
    max: Infinity,
    step: 1,
  },
)
const emit = defineEmits(["update:modelValue"])

const displayValue = ref("")

const { pause: PauseWatchModelValue, resume: resumeWatchModelValue } = watchPausable(
  () => props.modelValue,
  async (value) => {
    console.log("watch => modelValue", value)
    displayValue.value = isNumber(value) ? String(value) : ""
    emit("update:modelValue", !isNumber(displayValue.value) ? null : Number(displayValue.value))
  },
  {
    immediate: true,
  },
)

const onInput = async (event) => {
  const { value } = event.detail
  PauseWatchModelValue()
  await setVerifyValueByDisplayValue(value)
  emit("update:modelValue", !isNumber(displayValue.value) ? null : displayValue.value)
  await nextTick()
  resumeWatchModelValue()
}

async function setVerifyValueByDisplayValue(value: string) {
  // console.log("setVerifyValueByDisplayValue", value)
  if (isNumber(value)) {
    displayValue.value = value
    return
  }
  const parseFloatValue = parseFloat(value)
  await nextTick()
  displayValue.value = isNaN(parseFloatValue)
    ? value.startsWith("-")
      ? "-"
      : ""
    : String(parseFloatValue)
}

const onBlur = (event) => {
  let value = event.detail.value as string
  const { min, max, emptyValue, precision } = props
  console.log("onBlur", value)
  if (value === "") {
    if (isNumber(emptyValue)) {
      value = String(emptyValue)
    } else {
      return 1
    }
  }
  let newVal = Number(value)
  console.log(newVal)
  if (newVal > max) {
    newVal = max
  } else if (newVal < min) {
    newVal = min
  }
  if (precision) {
    newVal = newVal.toFixed(precision)
  }
  console.log(newVal)
  displayValue.value = String(newVal)
}
</script>

<style scoped lang="scss">
input {
  padding: 10px;
  border: 1px solid var(--bee-border-color);
}
</style>
