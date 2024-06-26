<template>
  <view
    class="bee-stepper"
    :class="[`bee-stepper--${props.size}`, { 'is-disabled': disabled }]"
    :style="getStyle"
  >
    <view class="bee-stepper__button bee-stepper__button-increase" @click="clickControls(false)">
      <bee-icon name="subtract-line" />
    </view>

    <bee-input-number
      ref="refInputNumber"
      v-model="modelValue"
      :before-change="beforeChange"
      :default-value-if-empty="defaultValueIfEmpty"
      :disabled="disabled"
      :max="max"
      :min="min"
      :precision="precision"
      :readonly="readonly"
      :size="size"
      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"
    />

    <view class="bee-stepper__button bee-stepper__button-decrease" @click="clickControls(true)">
      <bee-icon name="add-line" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { componentSizeMap } from "../../constants"
import { type StepperProps, stepperPropsPropDefaults } from "./stepper"
import { getDimensions } from "../../utils"
import isNumber from "is-number"

const props = withDefaults(defineProps<StepperProps>(), stepperPropsPropDefaults)

const emit = defineEmits(["update:modelValue", "blur", "change", "focus"])

const refInputNumber = ref()

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
    "--bee-stepper-height": getDimensions(componentSizeMap[size]),
  }
  return res
})

const clickControls = (direction) => {
  const currentNumber = isNumber(modelValue.value) ? Number(modelValue.value) : 0
  const stepNumber = isNumber(props.step) ? Number(props.step) : 1
  const newValue = direction ? currentNumber + stepNumber : currentNumber - stepNumber
  refInputNumber.value.setValue(String(newValue))
}

const onBlur = (event) => {
  emit("blur", event)
}
const onChange = (newValue, oldValue) => {
  emit("change", newValue, oldValue)
}
const onFocus = (event) => {
  emit("focus", event)
}
</script>

<style scoped lang="scss">
.bee-stepper {
  display: inline-flex;

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--bee-stepper-height);
    height: var(--bee-stepper-height);
    color: var(--bee-stepper-icon-color);
    font-size: 1.5em;
    background-color: var(--bee-stepper-background-color);
    border-radius: var(--bee-stepper-radius);
  }

  .bee-input-number {
    flex: 1;
    padding: 0;
    text-align: center;
    background-color: var(--bee-stepper-background-color);
    border: none;
  }

  &--large {
    .bee-input-number {
      width: var(--bee-stepper-input-large-width);
      margin: 0 2px;
    }
  }

  &--middle {
    .bee-input-number {
      width: var(--bee-stepper-input-middle-width);
      margin: 0 2px;
    }
  }

  &--small {
    .bee-input-number {
      width: var(--bee-stepper-input-small-width);
      margin: 0 2px;
    }
  }

  &.is-disabled {
    --bee-stepper-background-color: var(--bee-stepper-disabled-background-color);

    .bee-stepper__button {
      color: var(--bee-stepper-disabled-icon-color);
    }

    // --bee-stepper-disabled-icon-color
  }
}
</style>
