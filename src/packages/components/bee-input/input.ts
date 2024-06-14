import type { ComponentSize } from "../../constants"

export type InputProps<T extends boolean> = {
  modelValue?: T extends true ? number : string
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
  type?: string
  inputmode?: string
  // input-number
  inputNumber?: T
  min?: number
  max?: number
  step?: number
  precision?: number
}

export const inputPropDefaults: InputProps<false> = {
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
  inputNumber: false,
  min: -Infinity,
  max: Infinity,
  step: 1,
}
