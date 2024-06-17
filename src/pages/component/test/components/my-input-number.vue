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

const displayValue = ref(String(props.modelValue))

const onInput = async (event) => {
  const { value } = event.detail
  // 设置成 v-model 就不需要这一步了
  // displayValue.value = value
  const verifyValue = getVerifyValue(value)
  console.log({ verifyValue, displayValue: displayValue.value })
  if (verifyValue !== displayValue.value) {
    await nextTick()
    displayValue.value = verifyValue
  }
}

const getVerifyValue = (value: string, update = false) => {
  if (value === "-") {
    return value
  }
  if (!isNumber(value)) {
    const parseFloatValue = parseFloat(value)
    return isNaN(parseFloatValue) ? "" : String(parseFloatValue)
  }
  return value
}
</script>

<style scoped lang="scss">
input {
  padding: 10px;
  background-color: #f0f0f0;
}
</style>
