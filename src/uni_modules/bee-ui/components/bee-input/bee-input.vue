<template>
  <view
    class="bee-input"
    :class="[`bee-input--${props.size}`, { 'is-disabled': disabled }]"
    :style="getStyle"
  >
    <view v-if="prefixIcon" class="bee-input__left">
      <bee-icon class="bee-input__icon" :name="prefixIcon" :prefix="prefixIconPrefix" />
    </view>
    <view v-if="!!slots.prefix" class="bee-input__left">
      <slot name="prefix"></slot>
    </view>
    <input
      v-model="modelValue"
      :disabled="disabled || readonly"
      :inputmode="inputmode"
      :maxlength="maxlength"
      :password="showPassword ? !passwordEnableStatus : password"
      :placeholder="placeholder"
      :type="type"
      @blur="onBlur"
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
      <bee-icon class="bee-input__icon" name="close-circle-line" @click="modelValue = ''" />
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
import { computed, ref, useSlots, type HTMLAttributes, type InputTypeHTMLAttribute } from "vue"
import { componentSizeMap, type ComponentSize } from "../../constants"
import { sleep } from "radash"

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    maxlength?: string | number
    placeholder?: string
    clearable?: boolean
    size?: Exclude<ComponentSize, "mini">
    prefixIcon?: string
    prefixIconPrefix?: string
    suffixIcon?: string
    suffixIconPrefix?: string
    password?: boolean
    showPassword?: boolean
    showWordLimit?: boolean
    disabled?: boolean
    readonly?: boolean
    clearTrigger?: "always" | "focus"

    // uniapp其他
    type?: InputTypeHTMLAttribute
    inputmode?: HTMLAttributes["inputmode"]
  }>(),
  {
    modelValue: "",
    maxlength: 140,
    clearable: false,
    size: "middle",
    password: false,
    showPassword: false,
    showWordLimit: false,
    disabled: false,
    readonly: false,
    clearTrigger: "focus",
  },
)

const emit = defineEmits(["update:modelValue", "focus", "blur", "input", "confirm"])
const passwordEnableStatus = ref(false)
const isFocus = ref(false)

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
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

const slots = useSlots()
</script>

<style scoped lang="scss">
.bee-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: var(--bee-input-height);
  line-height: 1;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid var(--bee-border-color);
  border-radius: var(--bee-input-border-radius);

  &.is-disabled {
    background-color: var(--bee-disabled-bg-color);
  }

  input {
    flex: 1;
    height: 100%;
    min-height: 0;
    color: var(--bee-input-text-color);
    font-size: inherit;

    .input-placeholder {
      color: var(--bee-text-color-placeholder);
    }
  }

  &--large {
    padding: 0 14px;
    font-size: 16px;
  }

  &--middle {
    padding: 0 11px;
    font-size: 14px;
  }

  &--small {
    padding: 0 8px;
    font-size: 10px;
  }

  &__left,
  &__right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--bee-text-color-placeholder);
  }

  &__left {
    margin-right: var(--bee-padding-xs);
  }

  &__right {
    margin-left: var(--bee-padding-xs);
  }
}
</style>
