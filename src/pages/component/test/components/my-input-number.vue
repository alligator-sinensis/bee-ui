<template>
  <view>
    <input v-model="inputNumberValue" style="background-color: #f0f0f0" @input="onInput" />

    <pre>{{ { modelValue, inputNumberValue } }}</pre>
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

const inputNumberValue = ref<string>("")

// const modelValue = computed({
//   get: () => {
//     return props.modelValue
//   },
//   set: (val) => {
//     emit("update:modelValue", val)
//   },
// })

const onInput = async () => {
  await setInputNumberValue(inputNumberValue.value)
  setModelValue()
}

const setInputNumberValue = async (val) => {
  console.log("parseValue", val)
  if (val === "-") {
    inputNumberValue.value = ""
    return
  }
  if (!IsNumber(val)) {
    await nextTick()
    const parseFloatValue = parseFloat(val)
    inputNumberValue.value = isNaN(parseFloatValue) ? "" : String(parseFloatValue)
    return
  }
  inputNumberValue.value = String(val)
}

const setModelValue = () => {
  const value = inputNumberValue.value
  if (value === "") {
    emit("update:modelValue", null)
    return
  }
  if (value === "-") {
    emit("update:modelValue", null)
    return
  }
  emit("update:modelValue", Number(value))
}

// watch(
//   () => inputNumberValue.value,
//   () => {
//     console.log("watch=>inputNumberValue.value", inputNumberValue.value)
//     setModelValue(inputNumberValue.value)
//   },
// )

watch(
  () => props.modelValue,
  async () => {
    console.log("watch=>props.modelValue", props.modelValue)
    await setInputNumberValue(props.modelValue)
    setModelValue()
  },
  {
    immediate: true,
  },
)

// modelValue 和 inputNumberValue

// 初始化：读取modelValue，解析设置inputNumberValue，再更新modelValue

// 后期监听modelValue，解析设置inputNumberValue，再更新modelValue
// onInput事件，解析设置inputNumberValue，再更新modelValue
</script>

<style scoped lang="scss"></style>
