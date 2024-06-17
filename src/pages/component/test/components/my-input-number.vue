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
import { watchPausable } from "@vueuse/core"

const props = withDefaults(
  defineProps<{
    modelValue?: number
  }>(),
  {},
)
const emit = defineEmits(["update:modelValue"])

const displayValue = ref("")

const { pause: PauseWatchModelValue, resume: resumeWatchModelValue } = watchPausable(
  () => props.modelValue,
  async (value) => {
    console.log("watch => modelValue", value)
    displayValue.value = isNumber(value) ? String(value) : ""
    emit("update:modelValue", displayValue.value === "" ? null : Number(displayValue.value))
  },
  {
    immediate: true,
  },
)

const onInput = async (event) => {
  const { value } = event.detail
  PauseWatchModelValue()
  await setVerifyValueByDisplayValue(value)
  emitModelValue()
  await nextTick()
  resumeWatchModelValue()
}

async function setVerifyValueByDisplayValue(value: string) {
  console.log("setVerifyValueByDisplayValue", value)
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

const emitModelValue = () => {
  const value = displayValue.value
  emit("update:modelValue", ["", "-"].includes(value) ? null : value)
}
</script>

<style scoped lang="scss">
input {
  padding: 10px;
  background-color: #f0f0f0;
}
</style>
