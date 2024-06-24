<template>
  <view
    class="bee-input-number"
    :class="[
      `bee-input-number--${props.size}`,
      { 'is-disabled': disabled },
      { 'is-stepper': stepper },
    ]"
    :style="getStyle"
  >
    <view
      v-if="stepper"
      class="bee-input-number__stepper bee-input-number__stepper-increase"
      @click="decrease"
    >
      <bee-icon name="subtract-line" />
    </view>

    <bee-input
      v-model="displayValue"
      v-bind="$attrs"
      :disabled="disabled"
      :size="size"
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

    <view
      v-if="stepper"
      class="bee-input-number__stepper bee-input-number__stepper-decrease"
      @click="increase"
    >
      <bee-icon name="add-line" />
    </view>
  </view>
  <pre>{{ { modelValue, displayValue } }}</pre>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue"
import isNumber from "is-number"
import { watchPausable } from "@vueuse/core"
import { componentSizeMap, type ComponentSize } from "../../constants"

const props = withDefaults(
  defineProps<{
    modelValue?: number | string | null
    min?: number
    max?: number
    step?: number
    precision?: number
    emptyValue?: number
    stepper?: boolean
    size?: Exclude<ComponentSize, "mini">
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
    emptyValue: 5.2,
    precision: 5,
    // min: -10,
    // max: 100,
  },
)
const emit = defineEmits(["update:modelValue"])

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

const getStyle = computed(() => {
  const { size } = props
  const res = {
    "--bee-input-number-height": `${componentSizeMap[size]}px`,
  }
  return res
})

const setValue = async (newValue: string, oldValue: string) => {
  PauseWatchModelValue()
  const { beforeChange } = props
  const verifyNewValue = getVerifyValue(newValue)
  const emitModelValue = getEmitModelValue()
  const beforeChangeSuccessEmitModelValue = getEmitModelValue({
    displayValue: verifyNewValue,
  })
  console.log({
    newValue,
    oldValue,
    verifyNewValue,
    emitModelValue,
    beforeChangeSuccessEmitModelValue,
  })
  if (beforeChange && verifyNewValue !== oldValue) {
    console.log({ beforeChangeSuccessEmitModelValue })
    await beforeChange(beforeChangeSuccessEmitModelValue)
      .then(() => {
        displayValue.value = verifyNewValue
        emit("update:modelValue", beforeChangeSuccessEmitModelValue)
      })
      .catch(() => {
        displayValue.value = oldValue
        emit("update:modelValue", emitModelValue)
      })
  } else {
    displayValue.value = verifyNewValue
    emit("update:modelValue", emitModelValue)
  }

  // emitModelValue()
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

  let emitModelValue = displayValueToModelValue()
  if (emitModelValue !== null) emitModelValue = getVerifyExtremes(emitModelValue)
  doEmitModelValue(emitModelValue)

  // update:modelValue后，也需要nextTick下，再恢复modelValue侦听器，否则依然会触发modelValue侦听器
  await nextTick()
  resumeWatchModelValue()
}

async function onBlur() {
  // const { beforeChange } = props
  // PauseWatchModelValue()
  // const verifyValue = getVerifyValue()
  // if (beforeChange && focusDisplayValue.value !== displayValue.value) {
  //   await beforeChange(displayValue.value)
  //     .then(() => {
  //       displayValue.value = verifyValue
  //     })
  //     .catch(() => {
  //       displayValue.value = focusDisplayValue.value
  //     })
  // } else {
  //   displayValue.value = verifyValue
  // }
  // emitModelValue()
  // await nextTick()
  // resumeWatchModelValue()
  await setValue(displayValue.value, focusDisplayValue.value)

  // await nextTick()
  // resumeWatchModelValue()
}

async function onFocus() {
  focusDisplayValue.value = displayValue.value
}

// 增加
const increase = async () => {
  const oldValue = displayValue.value
  const currentNumber = displayValue.value === "" ? 0 : Number(displayValue.value)
  const stepNumber = isNumber(props.step) ? Number(props.step) : 1
  const newValue = String(currentNumber + stepNumber)
  await setValue(newValue, oldValue)
}

// 减少
const decrease = async () => {
  // PauseWatchModelValue()
  // const currentNumber = displayValue.value === "" ? 0 : Number(displayValue.value)
  // const stepNumber = isNumber(props.step) ? Number(props.step) : 1
  // displayValue.value = String(currentNumber - stepNumber)
  // displayValue.value = getVerifyValue()
  // doEmitModelValue()
  // await nextTick()
  // resumeWatchModelValue()
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
 */
function getVerifyValue(value?: string) {
  const { emptyValue, precision } = props
  let res = typeof value === "undefined" ? displayValue.value : value
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
 * getEmitModelValue
 * 任意数字返回number，非任意数字返回null，
 */
const getEmitModelValue = (_value?: string) => {
  const value = typeof _value === "undefined" ? displayValue.value : _value
  if (!isNumber(value)) {
    return null
  }
  return parseFloat(value)
}

const doEmitModelValue = (value) => {
  if (value === props.modelValue) return
  emit("update:modelValue", value)
}

/**
 * displayValueToModelValue
 * 任意数字返回number，非任意数字返回null，
 */
function displayValueToModelValue(_value?: string) {
  const _displayValue = typeof _value === "undefined" ? displayValue.value : _value
  if (!isNumber(_displayValue)) {
    return null
  }
  return parseFloat(_displayValue)
}

// function modelValueToDisplayValue() {
//   const { modelValue } = props
//   const res = isNumber(modelValue) ? String(parseFloat(String(modelValue))) : ""
//   return res
// }

// function displayValueToModelValue(value?: string) {
//   const { emptyValue, precision } = props
//   let stringRes = value === undefined ? displayValue.value : value
//   if (!isNumber(res)) {
//     if (isNumber(emptyValue)) {
//       res = String(emptyValue)
//     } else {
//       return res
//     }
//   }
//   const NumberRes = getVerifyExtremes(Number(res))
//   const stringRes = precision ? NumberRes.toFixed(precision) : String(NumberRes)
//   return stringRes
// }
</script>

<style scoped lang="scss">
.bee-input-number {
  position: relative;
  display: inline-flex;
  vertical-align: middle;

  .bee-input {
    flex: 1;
    overflow: hidden;
  }

  &__stepper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--bee-input-number-height);
    height: var(--bee-input-number-height);
    color: var(--bee-stepper-icon-color);
    font-size: 1.5em;
    background-color: var(--bee-stepper-background-color);
    border-radius: var(--bee-stepper-radius);
  }

  &--large {
    font-size: 16px;
  }

  &--middle {
    font-size: 14px;
  }

  &--small {
    font-size: 10px;
  }

  &.is-disabled {
    .bee-input-number__stepper {
      color: var(--bee-stepper-disabled-icon-color);
      background-color: var(--bee-stepper-disabled-background-color);
    }
  }

  &.is-stepper {
    gap: 2px;
    text-align: center;

    .bee-input {
      width: 132px;
      padding: 0;
      background-color: var(--bee-stepper-background-color);
      border: none;
    }
  }
}
</style>
