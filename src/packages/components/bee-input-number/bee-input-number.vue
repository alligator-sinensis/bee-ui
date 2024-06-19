<template>
  <!-- <view>
    
    <input v-model="displayValue" @blur="onBlur" @input="onInput" />
  
  </view> -->
  <pre>{{ { modelValue, displayValue, oldDisplayValue } }}</pre>
  <bee-button @click="increase">+</bee-button>
  <bee-input v-model="displayValue" v-bind="$attrs" @blur="onBlur" @input="onInput">
    <template #prefix>
      <view class="prefix">
        <slot name="prefix"></slot>
      </view>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </bee-input>
  <bee-button @click="decrease">-</bee-button>
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
    // emptyValue: 5.2,
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
  // input事件时暂停modelValue侦听器
  PauseWatchModelValue()
  // 执行nextTick()，否则uniapp的input事件中立即修改值会不生效
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
  console.log(getVerifyValue())

  emitModelValue()
  // update:modelValue后，也需要nextTick下，再恢复modelValue侦听器，否则依然会触发modelValue侦听器
  await nextTick()
  resumeWatchModelValue()
}

async function onBlur() {
  PauseWatchModelValue()
  displayValue.value = getVerifyValue()
  emitModelValue()
  await nextTick()
  resumeWatchModelValue()
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
  PauseWatchModelValue()
  const currentNumber = displayValue.value === "" ? 0 : Number(displayValue.value)
  const stepNumber = isNumber(props.step) ? Number(props.step) : 1
  displayValue.value = String(currentNumber + stepNumber)
  displayValue.value = getVerifyValue()
  emitModelValue()
  await nextTick()
  resumeWatchModelValue()
}

// 减少
const decrease = async () => {
  PauseWatchModelValue()
  const currentNumber = displayValue.value === "" ? 0 : Number(displayValue.value)
  const stepNumber = isNumber(props.step) ? Number(props.step) : 1
  displayValue.value = String(currentNumber - stepNumber)
  displayValue.value = getVerifyValue()
  emitModelValue()
  await nextTick()
  resumeWatchModelValue()
}

const emitModelValue = async () => {
  const { min, max } = props
  let emitValue = isNumber(displayValue.value) ? parseFloat(displayValue.value) : null
  if (emitValue !== null) {
    if (emitValue > max) {
      emitValue = max
    } else if (emitValue < min) {
      emitValue = min
    }
  }
  console.log("emitModelValue", emitValue)
  emit("update:modelValue", emitValue)
}
</script>

<style scoped lang="scss">
input {
  padding: 10px;
  border: 1px solid var(--bee-border-color);
}
</style>
