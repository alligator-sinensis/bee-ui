<template>
  <bee-input
    v-model="displayValue"
    class="bee-input-number"
    v-bind="$attrs"
    :disabled="disabled"
    @blur="onBlur"
    @focus="onFocus"
    @input="onInput"
  >
    <template #prefix>
      <view class="prefix">
        <slot name="prefix"></slot>
      </view>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </bee-input>
  <pre>{{ { modelValue, displayValue } }}</pre>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue"
import isNumber from "is-number"
import { watchPausable } from "@vueuse/core"

const props = withDefaults(
  defineProps<{
    modelValue?: number | string | null
    min?: number
    max?: number
    step?: number
    precision?: number
    emptyValue?: number
    stepper?: boolean
    disabled?: boolean
    beforeChange?: (value: any) => Promise<void>
  }>(),
  {
    min: -Infinity,
    max: Infinity,
    stepper: true,
    size: "middle",
    disabled: false,
    // step: 0.03,
    // emptyValue: 5.2,
    precision: 2,
    // min: -10,
    // max: 100,
  },
)

const emit = defineEmits(["update:modelValue", "change", "blur", "focus"])

const displayValue = ref("")
const oldDisplayValue = ref()
const focusDisplayValue = ref()

watch(
  () => displayValue.value,
  (newValue, oldValue) => {
    oldDisplayValue.value = oldValue
  },
)

const { pause: PauseWatchModelValue, resume: resumeWatchModelValue } = watchPausable(
  () => props.modelValue,
  async (value) => {
    // "-.1" => "-0.1"
    let toDisplayValue = isNumber(value) ? String(parseFloat(String(value))) : ""
    if (toDisplayValue === displayValue.value) {
      return
    }
    console.log("watch => modelValue", value, typeof value)
    // "-0.1"
    toDisplayValue = getVerifyValue(toDisplayValue)
    displayValue.value = toDisplayValue
    // -0.1
    const emitValue = displayValue.value === "" ? null : parseFloat(displayValue.value)
    emit("update:modelValue", emitValue)
  },
  {
    immediate: true,
  },
)

const setValue = async (newValue: string, oldValue: string) => {
  PauseWatchModelValue()
  const { beforeChange } = props
  const verifyNewValue = getVerifyValue(newValue)
  // console.log({
  //   newValue,
  //   oldValue,
  //   verifyNewValue,
  // })
  const emitModelValue = displayValueToModelValue(verifyNewValue)
  const oldModelValue = displayValueToModelValue(oldValue)
  try {
    if (beforeChange && verifyNewValue !== oldValue) {
      await beforeChange(emitModelValue)
    }
    displayValue.value = verifyNewValue
    emit("update:modelValue", emitModelValue)
    if (emitModelValue !== oldModelValue) emit("change", emitModelValue, oldModelValue)
  } catch (error) {
    displayValue.value = oldValue
    emit("update:modelValue", oldModelValue)
  }

  await nextTick()
  resumeWatchModelValue()
}

/**
 * onInput
 */
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
  // 输入不正确的数字回退
  if (!isNumber(_displayValue) && !["", "-", "+", ".", "+.", "-."].includes(_displayValue)) {
    displayValue.value = oldDisplayValue.value
  }

  let emitModelValue = displayValueToModelValue(displayValue.value)
  if (emitModelValue !== null) emitModelValue = getVerifyExtremes(emitModelValue)
  emit("update:modelValue", emitModelValue)

  // update:modelValue后，也需要nextTick下，再恢复modelValue侦听器，否则依然会触发modelValue侦听器
  await nextTick()
  resumeWatchModelValue()
}

async function onBlur(event) {
  emit("blur", event)
  await setValue(displayValue.value, focusDisplayValue.value)
}

async function onFocus(event) {
  emit("focus", event)
  focusDisplayValue.value = displayValue.value
}

/**
 * getVerifyExtremes
 * 获取值保证在范围区间内
 */
function getVerifyExtremes(value: number) {
  const { min, max } = props
  let res = value
  if (res > max) {
    res = max
  } else if (res < min) {
    res = min
  }
  return res
}

/**
 * 验证 displayValue
 * 设置控制、范围区间、精度
 */
function getVerifyValue(value: string) {
  const { emptyValue, precision } = props
  let res = value
  if (!isNumber(res)) {
    if (isNumber(emptyValue)) {
      res = String(emptyValue)
    } else {
      return res
    }
  }
  const NumberRes = getVerifyExtremes(Number(res))
  const stringRes = precision ? NumberRes.toFixed(precision) : String(NumberRes)
  return stringRes
}

/**
 * displayValueToModelValue
 * 是数字返回number，非数字返回null，
 */
function displayValueToModelValue(value) {
  if (!isNumber(value)) {
    return null
  }
  return parseFloat(value)
}
</script>

<style scoped lang="scss"></style>
