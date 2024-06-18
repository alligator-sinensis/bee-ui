<template>
  <view>
    <input v-model="displayValue" @blur="onBlur" @input="onInput" />
    <pre>{{ { modelValue, displayValue } }}</pre>
  </view>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue"
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
const oldDisplayValue = ref()

const { pause: PauseWatchModelValue, resume: resumeWatchModelValue } = watchPausable(
  () => props.modelValue,
  async (value) => {
    // console.log("watch => modelValue", value)
    displayValue.value = isNumber(value) ? String(parseFloat(String(value))) : ""
    emit("update:modelValue", displayValue.value === "" ? null : parseFloat(displayValue.value))
  },
  {
    immediate: true,
  },
)

const onInput = async () => {
  PauseWatchModelValue()
  await nextTick()
  /**
   *  输入      输出
   *  "1w"     "1"
   *  "-1y"    "-1"
   *  "-y"     "-"
   *  "-"      "-"
   *  "--"     "-"
   *  "000"    "000"
   *  "0.0"    "0.0"
   *  "-0.0"   "-0.0"
   *  "."      "."
   *  "+."     "+."
   *  "-."     "-."
   */
  const _displayValue = displayValue.value
  // const parseDisplayValue = customParseFloat(_displayValue)
  if (!["", "-", "+", ".", "+.", "-."].includes(_displayValue) && !isNumber(_displayValue)) {
    console.log(2, oldDisplayValue.value)
    displayValue.value = oldDisplayValue.value
  }

  // console.log({ _displayValue, parseDisplayValue })
  // if (_displayValue.startsWith("-")) {
  //   displayValue.value = parseDisplayValue ? parseDisplayValue : "-"
  // } else {
  //   displayValue.value = parseDisplayValue
  // }

  // if (displayValue.value !== "") {
  // displayValue.value = isNumber(_displayValue)
  //   ? _displayValue
  //   : _displayValue.startsWith("-") && parseDisplayValue === null
  //     ? "-"
  //     : parseDisplayValue
  // displayValue.value = isNumber(_displayValue)
  //   ? _displayValue
  //   : _displayValue.startsWith("-")
  //     ? ""
  //     : ""
  // }

  // emit("update:modelValue", displayValue.value === "" ? null : parseFloat(displayValue.value))
  emit("update:modelValue", isNumber(displayValue.value) ? parseFloat(displayValue.value) : null)
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

function customParseFloat(str = "") {
  for (var i = str.length; i > 0; i--) {
    const val = str.substring(0, i)
    if (isNumber(val)) {
      return val
    }
  }
  return ""
}
// console.log(customParseFloat())
// console.log(customParseFloat(""))
// console.log(customParseFloat("0.00."))
// console.log(customParseFloat("0.00"))
// console.log(customParseFloat("-0"))
// console.log(customParseFloat("-"))

console.log(isNumber("."))

watch(
  () => displayValue.value,
  (newValue, oldValue) => {
    oldDisplayValue.value = typeof oldValue === "undefined" ? "" : oldValue
  },
  {
    immediate: true,
  },
)
</script>

<style scoped lang="scss">
input {
  padding: 10px;
  border: 1px solid var(--bee-border-color);
}
</style>
