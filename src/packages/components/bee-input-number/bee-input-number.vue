<template>
  <view>
    <button @click="increase">+</button>
    <button @click="decrease">-</button>
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
    step: 0.03,
    emptyValue: 5.2,
    precision: 5,
    min: -10,
    max: 10,
  },
)
const emit = defineEmits(["update:modelValue"])

const displayValue = ref("")
const oldDisplayValue = ref()

watch(
  () => displayValue.value,
  (newValue, oldValue) => {
    oldDisplayValue.value = oldValue
  },
)

const { pause: PauseWatchModelValue, resume: resumeWatchModelValue } = watchPausable(
  () => props.modelValue,
  async (value) => {
    console.log("watch => modelValue", value, typeof value)
    displayValue.value = isNumber(value) ? String(parseFloat(String(value))) : ""
    displayValue.value = getVerifyValue()
    const emitValue = displayValue.value === "" ? null : parseFloat(displayValue.value)
    emit("update:modelValue", emitValue)
  },
  {
    immediate: true,
  },
)

const onInput = async () => {
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
  await emitModelValue()
}

async function onBlur() {
  displayValue.value = getVerifyValue()
  await emitModelValue()
}

function getVerifyValue() {
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

// 增加
const increase = async () => {
  const currentNumber = displayValue.value === "" ? 0 : Number(displayValue.value)
  const stepNumber = isNumber(props.step) ? Number(props.step) : 1
  displayValue.value = String(currentNumber + stepNumber)
  displayValue.value = getVerifyValue()
  await emitModelValue()
}

// 减少
const decrease = async () => {
  const currentNumber = displayValue.value === "" ? 0 : Number(displayValue.value)
  const stepNumber = isNumber(props.step) ? Number(props.step) : 1
  displayValue.value = String(currentNumber - stepNumber)
  displayValue.value = getVerifyValue()
  await emitModelValue()
}

/**
 * 处理update:modelValue
 * update之前先暂停modelValue侦听器，update完成后再恢复modelValue侦听器。
 */
const emitModelValue = async () => {
  PauseWatchModelValue()
  await nextTick()

  const emitValue = isNumber(displayValue.value) ? parseFloat(displayValue.value) : null
  emit("update:modelValue", emitValue)

  await nextTick()
  resumeWatchModelValue()
}
</script>

<style scoped lang="scss">
input {
  padding: 10px;
  border: 1px solid var(--bee-border-color);
}
</style>
