<template>
  <view class="bee-input" :class="[`bee-button--${props.size}`]" :style="getStyle">
    <view v-if="prefixIcon" class="bee-input__icon bee-input__prefix-icon">
      <bee-icon :name="prefixIcon" :prefix="prefixIconPrefix" />
    </view>
    <!-- <view class="bee-input__prefix">prefix</view> -->
    <input
      v-model="modelValue"
      :inputmode="inputmode"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :type="type"
    />
    <!-- <view class="suffix">suffix</view> -->
    <view v-if="suffixIcon" class="bee-input__icon bee-input__suffix-icon">
      <bee-icon :name="suffixIcon" :prefix="suffixIconPrefix" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes, type InputTypeHTMLAttribute } from "vue"
import { componentSizeMap, type ComponentSize } from "../../constants"

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    maxlength?: string | number
    placeholder?: string
    clearable?: boolean
    size?: ComponentSize
    prefixIcon?: string
    prefixIconPrefix?: string
    suffixIcon?: string
    suffixIconPrefix?: string

    // uniapp其他
    type?: InputTypeHTMLAttribute
    inputmode?: HTMLAttributes["inputmode"]
  }>(),
  {
    modelValue: "",
    maxlength: 140,
    clearable: false,
    size: "middle",
  },
)

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void
}>()

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

// const slots = defineSlots<{
//   ["prefix-icon"](): any
//   ["suffix-icon"](): any
// }>()
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
  border: 1px solid var(--bee-border-color);

  input {
    flex: 1;
    height: 100%;
    min-height: 0;
    background-color: #fff;
  }

  &--large {
    font-size: 10px;
  }

  &--middle {
    font-size: 10px;
  }

  &--small {
    font-size: 10px;
  }

  &--mini {
    font-size: 10px;
  }

  &__icon {
    display: flex;
    align-items: center;
    height: 100%;
    color: var(--bee-cell-title-color);
    background-color: var(--bee-text-color-secondary);

    &-prefix {
      margin-right: var(--bee-padding-xs);
      font-size: var(--bee-cell-title-font-size);
    }

    &-suffix {
      margin-left: var(--bee-padding-xs);
      font-size: var(--bee-cell-value-font-size);
    }
  }
}
</style>
