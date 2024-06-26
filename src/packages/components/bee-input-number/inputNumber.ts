import type { InputProps } from "../bee-input/input"

export type InputNumberProps = {
  modelValue?: number | string | null
  min?: number
  max?: number
  precision?: number
  defaultValueIfEmpty?: number
  beforeChange?: (value: any) => Promise<void>
} & Pick<
  InputProps,
  | "disabled"
  | "readonly"
  | "clearTrigger"
  | "placeholder"
  | "clearable"
  | "size"
  | "prefixIcon"
  | "prefixIconPrefix"
  | "suffixIcon"
  | "suffixIconPrefix"
>

export const inputNumberPropDefaults: InputNumberProps = {
  min: -Infinity,
  max: Infinity,
}
