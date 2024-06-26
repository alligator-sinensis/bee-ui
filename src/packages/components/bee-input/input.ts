import type { ComponentSize } from "../../constants"

export type InputProps = {
  modelValue?: string
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
}

export const inputPropDefaults: InputProps = {
  maxlength: 140,
  clearable: false,
  size: "middle",
  password: false,
  showPassword: false,
  showWordLimit: false,
  disabled: false,
  readonly: false,
  clearTrigger: "focus",
}
