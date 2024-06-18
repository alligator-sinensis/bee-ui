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
    emptyValue: 5.5,
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
    displayValue.value = setVerifyValue()
    const emitValue = displayValue.value === "" ? null : parseFloat(displayValue.value)
    // console.log("emitValue - watchModelValue", emitValue)
    emit("update:modelValue", emitValue)
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
  if (!["", "-", "+", ".", "+.", "-."].includes(_displayValue) && !isNumber(_displayValue)) {
    displayValue.value = oldDisplayValue.value
  }
  const emitValue = isNumber(displayValue.value) ? parseFloat(displayValue.value) : null
  // console.log("emitValue - onInput", emitValue)
  emit("update:modelValue", emitValue)
  await nextTick()
  resumeWatchModelValue()
}

// function verifyValueByDisplayValue(value: string) {
//   const parseFloatValue = parseFloat(value)
//   return isNaN(parseFloatValue) ? (value.startsWith("-") ? "-" : "") : String(parseFloatValue)
// }

function onBlur() {
  displayValue.value = setVerifyValue()
}

function setVerifyValue() {
  const { min, max, emptyValue, precision } = props
  let res: any = displayValue.value
  if (res === "") {
    if (isNumber(emptyValue)) {
      res = String(emptyValue)
    } else {
      return res
    }
  }
  res = Number(res)
  if (res > max) {
    res = max
  } else if (res < min) {
    res = min
  }
  res = precision ? res.toFixed(precision) : String(res)
  return res
}

// function customParseFloat(str = "") {
//   for (var i = str.length; i > 0; i--) {
//     const val = str.substring(0, i)
//     if (isNumber(val)) {
//       return val
//     }
//   }
//   return ""
// }
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
    // oldDisplayValue.value = typeof oldValue === "undefined" ? "" : oldValue
    oldDisplayValue.value = oldValue
  },
  // {
  //   immediate: true,
  // },
)
</script>

<style scoped lang="scss">
input {
  padding: 10px;
  border: 1px solid var(--bee-border-color);
}
</style>
