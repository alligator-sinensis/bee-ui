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
    // min: -Infinity,
    // max: Infinity,
    step: 1,
    emptyValue: 1,
    precision: 5,
    min: -10,
    max: 10,
  },
)
const emit = defineEmits(["update:modelValue"])

const displayValue = ref("")

const { pause: PauseWatchModelValue, resume: resumeWatchModelValue } = watchPausable(
  () => props.modelValue,
  async (value) => {
    // console.log("watch => modelValue", value)
    displayValue.value = isNumber(value) ? String(value) : ""
    // onBlur(displayValue.value)
    emit("update:modelValue", displayValue.value === "" ? null : Number(displayValue.value))
  },
  {
    immediate: true,
  },
)

const onInput = async () => {
  PauseWatchModelValue()
  await nextTick()
  const _displayValue = displayValue.value
  /**
   *  输入      输出
   *  "-1y"    "-1"
   *  "-y"     "-"
   *  "-"      "-"
   *  "--"     "-"
   *  "000"    "000"
   *  "0.0"    "0.0"
   *  "-0.0"   "-0.0"  不太对
   */
  const parseFloatValue = parseFloat(_displayValue)
  displayValue.value = isNumber(_displayValue)
    ? _displayValue
    : isNaN(parseFloatValue)
      ? "-"
      : String(parseFloatValue)

  emit("update:modelValue", displayValue.value === "" ? null : displayValue.value)
  await nextTick()
  resumeWatchModelValue()
}

// function verifyValueByDisplayValue(value: string) {
//   const parseFloatValue = parseFloat(value)
//   return isNaN(parseFloatValue) ? (value.startsWith("-") ? "-" : "") : String(parseFloatValue)
// }

function onBlur(event) {
  // let value = event.detail.value as string
  // let value = displayValue.value
  // const { min, max, emptyValue, precision } = props
  // if (value === "") {
  //   if (isNumber(emptyValue)) {
  //     value = String(emptyValue)
  //   } else {
  //     return
  //   }
  // }
  // let numberValue = Number(value)
  // if (numberValue > max) {
  //   numberValue = max
  // } else if (numberValue < min) {
  //   numberValue = min
  // }
  // displayValue.value = precision ? numberValue.toFixed(precision) : String(numberValue)
}

function setVerifyValue() {}
</script>

<style scoped lang="scss">
input {
  padding: 10px;
  border: 1px solid var(--bee-border-color);
}
</style>
