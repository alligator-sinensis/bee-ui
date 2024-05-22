import type { ThemeType, ComponentSize } from "../../constants"

export type ButtonProps = {
  size?: ComponentSize
  type?: ThemeType
  plain?: boolean // 朴素按钮
  round?: boolean // 圆角按钮
  circle?: boolean // 圆形按钮
  loading?: boolean
  disabled?: boolean
  to?: string
  replace?: boolean
}

export const buttonPropDefaults: ButtonProps = {
  size: "default",
  plain: false,
  round: false,
  circle: false,
  loading: false,
  disabled: false,
  to: "",
  replace: false,
}
