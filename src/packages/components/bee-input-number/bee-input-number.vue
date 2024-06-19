<template>
  <view class="bee-input-number" :style="getStyle">
    <view class="bee-input-number__stepper bee-input-number__stepper-increase" @click="decrease">
      -
    </view>

    <bee-input v-model="displayValue" v-bind="$attrs" :size="size" @blur="onBlur" @input="onInput">
      <template #prefix>
        <view class="prefix">
          <slot name="prefix"></slot>
        </view>
      </template>
      <template #suffix>
        <slot name="suffix"></slot>
      </template>
    </bee-input>

    <view class="bee-input-number__stepper bee-input-number__stepper-decrease" @click="increase">
      +
    </view>
  </view>
  <!-- <pre>{{ { modelValue, displayValue, oldDisplayValue } }}</pre> -->
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue"
import isNumber from "is-number"
import { watchPausable } from "@vueuse/core"
import { componentSizeMap, type ComponentSize } from "../../constants"

const props = withDefaults(
  defineProps<{
    modelValue?: number
    min?: number
    max?: number
    step?: number
    precision?: number
    emptyValue?: number
    stepper?: boolean
    size?: Exclude<ComponentSize, "mini">
  }>(),
  {
    min: -Infinity,
    max: Infinity,
    Stepper: false,
    size: "middle",
    // step: 0.03,
    // emptyValue: 5.2,
    // precision: 5,
    // min: -10,
    // max: 100,
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
    // console.log("watch => modelValue", value, typeof value)
    displayValue.value = isNumber(value) ? String(parseFloat(String(value))) : ""
    displayValue.value = getVerifyValue()
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
    "--bee-input-height": `${componentSizeMap[size]}px`,
  }
  return res
})

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
  emitModelValue(true)
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

function getVerifyExtremes(value: number) {
  const { min, max } = props
  let res = Number(value)
  if (res > max) {
    res = max
  } else if (res < min) {
    res = min
  }
  return res
}

function getVerifyValue() {
  const { emptyValue, precision } = props
  let res: any = displayValue.value
  if (res === "") {
    if (isNumber(emptyValue)) {
      res = String(emptyValue)
    } else {
      return res
    }
  }
  res = getVerifyExtremes(res)
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

const emitModelValue = async (verifyExtremes = false) => {
  if (!isNumber(displayValue.value)) {
    emit("update:modelValue", null)
    return
  }
  let emitValue = parseFloat(displayValue.value)
  if (verifyExtremes) {
    emitValue = getVerifyExtremes(emitValue)
  }
  emit("update:modelValue", emitValue)
}
</script>

<style scoped lang="scss">
.bee-input-number {
  position: relative;
  display: inline-flex;

  .bee-input-number__stepper {
    height: 100%;
    background-color: #f2f3f5;
  }
}
</style>
