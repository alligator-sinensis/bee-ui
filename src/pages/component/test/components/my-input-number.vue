<template>
  <view>
    <input v-model="displayValue" @input="onInput" />

    <pre>{{ { modelValue, displayValue } }}</pre>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from "vue"
import isNumber from "is-number"
import { isNil } from "lodash-es"

const props = withDefaults(
  defineProps<{
    modelValue?: number
  }>(),
  {},
)
const emit = defineEmits(["update:modelValue"])

const displayValue = ref("")

const isPauseWatchModelValue = ref(false)

const onInput = async (event) => {
  const { value } = event.detail
  console.log("onInput", value)
  isPauseWatchModelValue.value = true
  await setVerifyValue(value)
  emitModelValue()
  await nextTick()
  isPauseWatchModelValue.value = false

  //   // 设置成 v-model 就不需要这一步了
  //   // displayValue.value = value
  //   const verifyValue = getVerifyValue(value)
  //   console.log({ verifyValue, displayValue: displayValue.value })
  //   if (verifyValue !== displayValue.value) {
  //     await nextTick()
  //     displayValue.value = verifyValue
  //   }
}

const setVerifyValue = async (value: string) => {
  console.log("setVerifyValue", value)
  if (value === "-") {
    displayValue.value = value
    return
  }
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

const setVerifyValueByModelValue = async (value) => {
  console.log("setVerifyValueByModelValue", value)
  const newValue = isNil(value) ? "" : String(value)
  if (isNumber(value)) {
    displayValue.value = newValue
    return
  } else {
    displayValue.value = ""
  }
}

const emitModelValue = () => {
  const value = displayValue.value
  emit("update:modelValue", ["", "-"].includes(value) ? null : value)
}

/*
  监听 modelValue
  '-1w' => 格式化 => '-1' emit(-1)
  '-w' => 格式化 => '' emit(null)
*/
watch(
  () => props.modelValue,
  async (newValue) => {
    if (isPauseWatchModelValue.value) {
      return
    }
    console.log("watch => modelValue", newValue)
    console.log({ displayValue: displayValue.value })
    // if (newValue === null && displayValue.value === "-") {
    //   return
    // }
    await setVerifyValueByModelValue(newValue)
    // emitModelValue()
    emit("update:modelValue", displayValue.value === "" ? null : Number(displayValue.value))
  },
  {
    immediate: true,
  },
)

/*
  监听 displayValue
  '-1w' => 格式化 => '-1'  emit(-1)
  '-w' => 格式化 => '-' emit(null)
*/
// watch(
//   displayValue,
//   async (value) => {
//     console.log("watch => displayValue", value)
//     await setVerifyValue(value)
//     // console.log("setVerifyValue-end", displayValue.value)
//     emitModelValue()
//   },
//   // {
//   //   immediate: true,
//   // },
// )
</script>

<style scoped lang="scss">
input {
  padding: 10px;
  background-color: #f0f0f0;
}
</style>
