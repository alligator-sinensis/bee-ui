<template>
  <view
    class="bee-input"
    :class="[`bee-input--${props.size}`, { 'is-disabled': disabled }]"
    :style="getStyle"
    @click="onClick"
  >
    <view v-if="prefixIcon" class="bee-input__left">
      <bee-icon class="bee-input__icon" :name="prefixIcon" :prefix="prefixIconPrefix" />
    </view>
    <view v-if="!!slots.prefix" class="bee-input__left">
      <slot name="prefix"></slot>
    </view>
    <!-- v-model="modelValue" -->
    <input
      v-model="modelValue"
      :disabled="disabled || readonly"
      :inputmode="inputmode as any"
      :maxlength="maxlength"
      :password="showPassword ? !passwordEnableStatus : password"
      :placeholder="placeholder"
      :type="type"
      @blur="onBlur"
      @click="onClickInput"
      @confirm="onConfirm"
      @focus="onFocus"
      @input="onInput"
    />
    <view v-if="!!slots.suffix" class="bee-input__right">
      <slot name="suffix"></slot>
    </view>
    <view v-if="suffixIcon" class="bee-input__right">
      <bee-icon class="bee-input__icon" :name="suffixIcon" :prefix="suffixIconPrefix" />
    </view>
    <view v-if="showClearable" class="bee-input__right">
      <bee-icon class="bee-input__icon" name="close-circle-line" @click="handleClear" />
    </view>
    <view v-if="showPassword" class="bee-input__right">
      <bee-icon
        v-if="passwordEnableStatus"
        class="bee-input__icon"
        name="eye-line"
        @click="passwordEnableStatus = !passwordEnableStatus"
      />
      <bee-icon
        v-else
        class="bee-input__icon"
        name="eye-off-line"
        @click="passwordEnableStatus = !passwordEnableStatus"
      />
    </view>
    <view v-if="showWordLimit" class="bee-input__right bee-input__count"
      >{{ getModelValueLength }} / {{ maxlength }}</view
    >
  </view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: "shared",
  },
}
</script>
<script setup lang="ts">
import { computed, ref, useSlots } from "vue"
import { componentSizeMap } from "../../constants"
import { type InputProps, inputPropDefaults } from "./input"
import { sleep } from "radash"

const props = withDefaults(defineProps<InputProps>(), inputPropDefaults)

const emit = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "input",
  "confirm",
  "click",
  "clickInput",
  "clear",
])

const slots = useSlots()

const passwordEnableStatus = ref(false)
const isFocus = ref(false)

const modelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit("update:modelValue", val)
  },
})

const getStyle = computed(() => {
  const { size } = props
  const res = {
    "--bee-input-height": `${componentSizeMap[size]}px`,
  }
  return res
})

const getModelValueLength = computed(() => {
  if (modelValue.value === null || modelValue.value === undefined) {
    return 0
  }
  return String(modelValue.value).length
})

const showClearable = computed(() => {
  const { clearTrigger, clearable } = props
  if (!clearable) return false
  if (clearTrigger === "always") {
    return getModelValueLength.value > 0
  } else if (clearTrigger === "focus") {
    return isFocus.value && getModelValueLength.value > 0
  }
  return false
})

const handleClear = () => {
  modelValue.value = ""
  emit("clear")
}

const onFocus = (event) => {
  emit("focus", event)
  isFocus.value = true
}
const onBlur = async (event) => {
  emit("blur", event)
  await sleep(0)
  isFocus.value = false
}
const onConfirm = (event) => {
  emit("confirm", event)
}
const onInput = (event) => {
  emit("input", event)
}
const onClick = (event) => {
  emit("click", event)
}
const onClickInput = (event) => {
  emit("clickInput", event)
}
</script>

<style scoped lang="scss">
@import "./index";
</style>
