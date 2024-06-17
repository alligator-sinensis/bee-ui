<template>
  <view>
    <input
      :model-value="displayValue"
      style="background-color: #f0f0f0"
      type="number"
      @input="onInput"
    />

    <pre>{{ { modelValue, displayValue } }}</pre>
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

const displayValue = ref<string>("")

const onInput = async () => {
  console.log("onInput", displayValue.value)
  // await setdisplayValue(displayValue.value)
}

const formatdisplayValue = async () => {
  const value = displayValue.value
  if (value === "-") {
    displayValue.value = ""
    return
  }
  if (!IsNumber(value)) {
    await nextTick()
    const parseFloatValue = parseFloat(value)
    displayValue.value = isNaN(parseFloatValue) ? "" : String(parseFloatValue)
    return
  }
  displayValue.value = String(value)
}

// const setModelValue = () => {
//   const value = displayValue.value
//   if (value === "") {
//     emit("update:modelValue", null)
//     return
//   }
//   if (value === "-") {
//     emit("update:modelValue", null)
//     return
//   }
//   emit("update:modelValue", Number(value))
// }

watch(
  () => displayValue.value,
  async () => {
    console.log("watch=>displayValue.value", displayValue.value)
    // setModelValue(displayValue.value)
    await formatdisplayValue()
    emit("update:modelValue", displayValue.value === "" ? null : displayValue.value)
  },
)

watch(
  () => props.modelValue,
  async (value: any) => {
    console.log("watch=>props.modelValue", props.modelValue)
    // await setdisplayValue(props.modelValue)
    // displayValue.value = String(props.modelValue)
    if ([null, undefined, NaN].includes(value)) {
      displayValue.value = ""
    } else {
      displayValue.value = String(value)
    }
  },
  {
    immediate: true,
  },
)

// modelValue 和 displayValue

// 初始化：读取modelValue，解析设置displayValue，再更新modelValue

// 后期监听modelValue，解析设置displayValue，再更新modelValue
// onInput事件，解析设置displayValue，再更新modelValue
</script>

<style scoped lang="scss"></style>
