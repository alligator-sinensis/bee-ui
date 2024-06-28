<template>
  <view>
    <input v-model="state.currentDisplayValue" @input="onInput" />

    <pre>{{ state }}</pre>
    <pre>{{ { modelValue } }}</pre>
  </view>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, reactive } from "vue"
import isNumber from "is-number"
import { computedAsync } from "@vueuse/core"

const props = withDefaults(
  defineProps<{
    modelValue?: number
  }>(),
  {},
)
const emit = defineEmits(["update:modelValue"])

const state = reactive({
  currentDisplayValue: props.modelValue,
  oldDisplayValue: "",
})

watch(
  () => props.modelValue,
  (newValue) => {
    console.log("watch-modelValue", newValue, typeof newValue, "设置currentDisplayValue")
    state.currentDisplayValue = modelValueToDisplayValue()
  },
  //   {
  //     immediate: true,
  //   },
)

watch(
  () => state.currentDisplayValue,
  async (newValue, oldValue) => {
    console.log("watch-displayValue", newValue, typeof newValue, "更新modelValue")

    state.oldDisplayValue = oldValue

    await nextTick()
    const { currentDisplayValue, oldDisplayValue } = state
    if (
      !isNumber(currentDisplayValue) &&
      !["", "-", "+", ".", "+.", "-."].includes(currentDisplayValue)
    ) {
      state.currentDisplayValue = oldDisplayValue
    }

    emit("update:modelValue", displayValueToModelValue())
  },
  {
    immediate: true,
  },
)

const onInput = async (event) => {
  //   const { value } = event.detail
  //   await nextTick()
  //   const { currentDisplayValue, oldDisplayValue } = state
  //   if (
  //     !isNumber(currentDisplayValue) &&
  //     !["", "-", "+", ".", "+.", "-."].includes(currentDisplayValue)
  //   ) {
  //     state.currentDisplayValue = oldDisplayValue
  //   }
  //   emit("update:modelValue", displayValueToModelValue())
}

function modelValueToDisplayValue() {
  if (isNumber(props.modelValue)) {
    return String(props.modelValue)
  }
  return ""
}

function displayValueToModelValue() {
  return Number(state.currentDisplayValue)
}
</script>

<style scoped lang="scss">
input {
  margin: 10px;
  padding: 10px;
  background-color: #f0f0f0;
}
</style>
